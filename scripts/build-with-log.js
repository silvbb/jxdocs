/**
 * build 的创建log日志
 * 已升级为fast-build.js脚本
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径（跨平台兼容）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const logsDir = path.join(rootDir, "logs");

// 确保日志目录存在
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 创建带时间戳的日志文件名（跨平台兼容）
const timestamp = new Date().toISOString().replace(/:/g, "-");
const logFile = path.join(logsDir, `build-full-${timestamp}.log`);

// 重要：使用带BOM的UTF-8编码创建文件，这有助于Windows正确识别UTF-8编码
const BOM = Buffer.from([0xef, 0xbb, 0xbf]);
fs.writeFileSync(logFile, BOM);
const logStream = fs.createWriteStream(logFile, {
  flags: "a", // 追加模式
  encoding: "utf8",
});

console.log(`开始构建，日志将保存到: ${logFile}`);

// 根据平台选择正确的命令和参数
const isWindows = process.platform === "win32";
const command = isWindows ? "npx.cmd" : "npx";
const args = ["vitepress", "build", "docs", "--debug"];

// 设置环境变量以确保正确的字符编码
const env = { ...process.env };
if (isWindows) {
  env.CHCP = "65001"; // 设置Windows命令行为UTF-8编码
}

// 运行构建命令
const buildProcess = spawn(command, args, {
  cwd: rootDir,
  stdio: ["inherit", "pipe", "pipe"], // 继承标准输入，但捕获标准输出和错误
  shell: isWindows, // Windows 上使用 shell，Linux 上不需要
  env: env,
});

// 捕获标准输出
buildProcess.stdout.on("data", (data) => {
  const output = data.toString("utf8"); // 明确指定UTF-8编码
  process.stdout.write(output); // 显示在控制台
  logStream.write(output); // 写入日志文件
});

// 捕获标准错误
buildProcess.stderr.on("data", (data) => {
  const output = data.toString("utf8"); // 明确指定UTF-8编码
  process.stderr.write(output); // 显示在控制台
  logStream.write(output); // 写入日志文件
});

// 处理命令结束
buildProcess.on("close", (code) => {
  const endMessage = `\n构建进程退出，退出码: ${code}\n构建时间: ${new Date().toISOString()}\n`;
  logStream.end(endMessage);
  console.log(`\n构建完成，日志已保存到: ${logFile}`);
});

// 处理可能的错误
buildProcess.on("error", (err) => {
  const errorMessage = `\n启动构建进程时出错: ${err.message}\n`;
  logStream.write(errorMessage);
  logStream.end();
  console.error(errorMessage);
});

// 处理脚本被终止的情况
process.on("SIGINT", () => {
  const interruptMessage = "\n构建被用户中断\n";
  logStream.write(interruptMessage);
  logStream.end();
  console.log(interruptMessage);
  process.exit(0);
});
