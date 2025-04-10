#!/usr/bin/env node

/**
 * fast-build.js
 * WSL下为解决mnt访问慢而创建的快速构建脚本
 * 这个脚本结合了 fast-build.sh 和 build-with-log.js 的功能，
 * 用于在 WSL 本地文件系统中快速构建项目，并记录构建日志。
 *
 * 主要功能：
 * 1. 将项目文件复制到 WSL 本地文件系统中进行构建
 * 2. 利用已缓存的 node_modules 和其他目录
 * 3. 记录构建过程和时间
 * 4. 将构建结果复制回 Windows 文件系统
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// 配置
const config = {
  // WSL 本地文件系统中的临时构建目录
  wslBuildDir: "/home/jwisdom/temp_build",
  // WSL 缓存目录（与 wsl-cache.sh 保持一致）
  wslCacheDir: "/home/jwisdom/wsl_cache/jxdocs",
  // 日志目录
  logDir: path.join(projectRoot, "logs"),
  // 构建命令
  buildCommand: "vitepress build docs --debug",
  // 排除的目录和文件
  excludeDirs: ["node_modules", ".git", "dist", ".vite_cache", "logs", "cache"],
  // 需要链接的缓存目录
  cacheDirs: ["node_modules", ".vite_cache", "cache"],
};

// 确保日志目录存在
if (!fs.existsSync(config.logDir)) {
  console.log(`📁 创建日志目录: ${config.logDir}`);
  fs.mkdirSync(config.logDir, { recursive: true });
}

// 生成日志文件名
const timestamp = new Date().toISOString().replace(/:/g, "-");
const logFile = path.join(config.logDir, `fast-build-${timestamp}.log`);

/**
 * 记录日志
 * @param {string} message 日志消息
 * @param {boolean} consoleOutput 是否同时输出到控制台
 */
function log(message, consoleOutput = true) {
  const timePrefix = `[${new Date().toISOString()}] `;
  fs.appendFileSync(logFile, timePrefix + message + "\n");
  if (consoleOutput) {
    console.log(message);
  }
}

/**
 * 执行命令并记录输出
 * @param {string} command 要执行的命令
 * @param {string} workDir 工作目录
 * @param {string} description 命令描述
 */
function execCommand(command, workDir, description) {
  log(`🚀 ${description}: ${command}`);
  const startTime = Date.now();

  try {
    const output = execSync(command, {
      cwd: workDir,
      encoding: "utf8",
      stdio: "pipe",
    });

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log(`✅ ${description}完成，耗时: ${duration}秒`);
    log(`📝 命令输出:\n${output}`, false); // 只写入日志，不输出到控制台
    return true;
  } catch (error) {
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log(`❌ ${description}失败，耗时: ${duration}秒`);
    log(`📝 错误信息:\n${error.stdout?.toString() || error.message}`, false);
    return false;
  }
}

/**
 * 检查目录是否存在
 * @param {string} dir 目录路径
 * @returns {boolean} 是否存在
 */
function dirExists(dir) {
  try {
    return (
      execSync(`test -d "${dir}" && echo "true" || echo "false"`, {
        encoding: "utf8",
      }).trim() === "true"
    );
  } catch (error) {
    return false;
  }
}

// 主函数
async function main() {
  const startTime = Date.now();
  log(`🏁 开始快速构建流程，时间: ${new Date().toISOString()}`);

  // 1. 创建临时构建目录
  log(`📁 创建临时构建目录: ${config.wslBuildDir}`);
  execSync(`mkdir -p ${config.wslBuildDir}`);

  // 2. 复制项目文件到 WSL 本地文件系统
  const excludeParams = config.excludeDirs
    .map((dir) => `--exclude=${dir}`)
    .join(" ");
  const rsyncCommand = `rsync -av ${excludeParams} ${projectRoot}/ ${config.wslBuildDir}/`;

  if (
    !execCommand(rsyncCommand, projectRoot, "复制项目文件到 WSL 本地文件系统")
  ) {
    log("❌ 构建过程中断，无法复制项目文件");
    return;
  }

  // 3. 检查并链接已缓存的目录
  log("🔍 检查并链接已缓存的目录");

  // 确保缓存目录存在
  if (!dirExists(config.wslCacheDir)) {
    log(`⚠️ 缓存目录 ${config.wslCacheDir} 不存在，将创建它`);
    execSync(`mkdir -p ${config.wslCacheDir}`);
  }

  // 为每个缓存目录创建符号链接
  for (const dir of config.cacheDirs) {
    const cachePath = `${config.wslCacheDir}/${dir}`;
    const targetPath = `${config.wslBuildDir}/${dir}`;

    // 检查缓存目录是否存在
    if (dirExists(cachePath)) {
      log(`🔗 链接缓存目录: ${dir}`);
      // 如果目标已存在，先删除
      execSync(`rm -rf "${targetPath}" 2>/dev/null || true`);
      // 创建符号链接
      execSync(`ln -s "${cachePath}" "${targetPath}"`);
    } else {
      log(`⚠️ 缓存目录 ${dir} 不存在，将跳过链接`);

      // 对于 node_modules，如果不存在缓存，我们需要创建目录并安装依赖
      if (dir === "node_modules") {
        log("📦 node_modules 缓存不存在，将创建目录并安装依赖");
        execSync(`mkdir -p "${cachePath}"`);

        // 在临时目录中创建符号链接
        execSync(`ln -s "${cachePath}" "${targetPath}"`);

        // 安装依赖到缓存目录
        if (
          !execCommand("npm install", config.wslBuildDir, "安装依赖到缓存目录")
        ) {
          log("⚠️ 依赖安装可能有问题，但继续构建过程");
        }
      }
    }
  }

  // 4. 在 WSL 本地文件系统中构建
  if (!execCommand(config.buildCommand, config.wslBuildDir, "执行构建")) {
    log("❌ 构建失败");
    return;
  }

  // 5. 复制构建结果回 Windows 文件系统
  const distDir = path.join(projectRoot, "dist");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const copyBackCommand = `rsync -av ${config.wslBuildDir}/docs/.vitepress/dist/ ${distDir}/`;
  if (
    !execCommand(
      copyBackCommand,
      projectRoot,
      "复制构建结果回 Windows 文件系统",
    )
  ) {
    log("❌ 无法复制构建结果");
    return;
  }

  // 6. 清理临时目录中的符号链接（保留缓存）
  log("🧹 清理临时目录中的符号链接");
  for (const dir of config.cacheDirs) {
    const targetPath = `${config.wslBuildDir}/${dir}`;
    execSync(`rm -f "${targetPath}" 2>/dev/null || true`);
  }

  // 计算总耗时
  const endTime = Date.now();
  const totalDuration = ((endTime - startTime) / 1000).toFixed(2);

  log(`🎉 快速构建完成！总耗时: ${totalDuration}秒`);
  log(`📊 构建日志已保存到: ${logFile}`);
  // 添加提示信息
  log(`\n📌 如需预览构建结果，请运行: pnpm docs:preview`);
  log(`   然后访问: http://localhost:4173`);
}

// 执行主函数
main().catch((error) => {
  log(`❌ 发生未捕获的错误: ${error.message}`);
  process.exit(1);
});
