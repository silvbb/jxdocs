/**
 * 将乱码日志文件变成正常log文件
 * 已升级为fast-build.js脚本
 */
import fs from "fs";
import iconv from "iconv-lite";
import path from "path";

// 转化日志命令：
// pnpm add iconv-lite
// node scripts/convert-log.js logs/build-full-2025-04-10T12-27-46.log

// 指定要转换的日志文件
const logFile = process.argv[2];
if (!logFile) {
  console.error("请指定要转换的日志文件路径");
  process.exit(1);
}

// 读取日志文件
const content = fs.readFileSync(logFile);

// 尝试不同的编码转换
const encodings = ["gbk", "gb2312", "utf8", "latin1"];
const results = {};

for (const encoding of encodings) {
  try {
    // 从原始编码转换为UTF-8
    const decoded = iconv.decode(content, encoding);
    const newFilePath = `${logFile}.${encoding}.txt`;
    fs.writeFileSync(newFilePath, decoded, "utf8");
    results[encoding] = newFilePath;
    console.log(`已转换为 ${encoding} 编码并保存到: ${newFilePath}`);
  } catch (err) {
    console.error(`转换为 ${encoding} 失败:`, err.message);
  }
}

console.log("\n请检查以下文件，选择正确显示的编码版本:");
Object.entries(results).forEach(([encoding, file]) => {
  console.log(`- ${encoding}: ${file}`);
});
