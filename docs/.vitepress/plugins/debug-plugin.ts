import type { Plugin } from "vite";
import { appendFileSync } from "fs";
import { join } from "path";

// 检查是否启用了调试模式
// const isDebug = process.env.DEBUG || process.env.VITEPRESS_LOG;

// 改进的日志函数
// function log(message: string, color = '\x1b[36m') {
//   if (isDebug) {
//     const timestamp = new Date().toLocaleTimeString();
//     process.stdout.write(`${color}[${timestamp}] ${message}\x1b[0m\n`);
//   }
// }

// 定义一些颜色常量
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m",
};
// 日志文件路径
const logFile = join(process.cwd(), "vitepress-debug.log");

// 创建一个彩色日志函数
function colorLog(message: string, color: string = colors.cyan) {
  console.log(`${color}${message}${colors.reset}`);
}

// 增强版日志函数
export function logger(
  message: string,
  options: {
    color?: string;
    toFile?: boolean;
    prefix?: string;
  } = {},
) {
  const {
    color = colors.cyan,
    toFile = true,
    prefix = "[VitePress]",
  } = options;

  const timestamp = new Date().toISOString();
  const logMessage = `${prefix} ${message}`;

  // 控制台彩色输出
  console.log(`${color}${logMessage}${colors.reset}`);

  // 写入日志文件
  if (toFile) {
    appendFileSync(logFile, `${timestamp} - ${logMessage}\n`);
  }
}

// 它通过 Vite 的插件 API 钩子（如 configResolved 和 transform ）在构建过程的不同阶段输出日志。
export function debugPlugin(): Plugin {
  return {
    name: "vitepress-debug",
    configResolved(config) {
      logger("\n[VitePress] 配置解析完成");
      logger("[VitePress] 工作目录:", process.cwd());
    },
    transform(code, id) {
      if (id.endsWith(".md")) {
        // console.log("[VitePress] 处理文件:", id);
        try {
          // 调试输出，查看文件内容的前100个字符
          // console.log(
          //   `[调试] 文件内容前100字符: ${code.substring(0, 100).replace(/\n/g, "\\n")}`,
          // );

          // 当 VitePress 处理 Markdown 文件时，它会先将 frontmatter 提取出来，然后转换成 JavaScript 对象，
          // 从转换后的代码中提取标题
          const pageDataMatch = code.match(
            /__pageData = JSON\.parse\("(.+?)"\)/,
          );
          if (pageDataMatch) {
            // 解析 JSON 字符串，注意需要处理转义字符
            const jsonStr = pageDataMatch[1].replace(/\\"/g, '"');
            try {
              const pageData = JSON.parse(jsonStr);
              const title = pageData.title || "无标题(从pageData)";
              logger(
                `[VitePress] 处理文件: ${id} | 文章标题(从pageData): ${title}`,
              );
              return null;
            } catch (jsonError) {
              console.log(`[VitePress] JSON解析错误: ${jsonError.message}`);
            }
          }

          // 如果上面的方法失败，尝试直接从字符串中提取标题
          const titleMatch = code.match(/title":\s*"([^"]+)"/);
          if (titleMatch) {
            console.log(
              `[VitePress] 处理文件: ${id} | 文章标题(从字符串提取): ${titleMatch[1]}`,
            );
          } else {
            // 尝试查找第一个标题
            const headingMatch = code.match(/^#\s+(.+)$/m);
            const title = headingMatch ? headingMatch[1] : "无标题";
            console.log(
              `[VitePress] 处理文件: ${id} | 标题(从标题提取): ${title}`,
            );
          }
        } catch (error) {
          logger(
            `[VitePress] 处理文件: ${id} | 无法提取标题: ${error.message}`,
          );
        }
      }
      return null;
    },
  };
}
