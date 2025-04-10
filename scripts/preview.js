#!/usr/bin/env node

import { createServer } from "vitepress";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function main() {
  console.log("启动预览服务器...");

  // 修复：使用字符串参数而不是对象
  const server = await createServer(
    path.join(root, "docs"), // root 参数
    {
      base: "/",
      mode: "production",
    },
  );

  // 绑定到所有网络接口
  await server.listen(4173, "0.0.0.0");

  const info = server.config.logger.info;

  info(`预览服务器正在运行于:`);
  info(`  > 本地地址: http://localhost:4173/`);

  // 显示 WSL IP 地址
  const wslIp = getWslIp();
  if (wslIp) {
    info(`  > WSL 地址: http://${wslIp}:4173/`);
    info(`  > 提示: 如果无法通过 localhost 访问，请尝试使用 WSL IP 地址`);
    info(`  > 或者运行 "pnpm docs:preview:windows" 设置端口转发`);
  }
}

// 获取 WSL IP 地址
function getWslIp() {
  try {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // 跳过内部地址和非 IPv4 地址
        if (net.family === "IPv4" && !net.internal) {
          return net.address;
        }
      }
    }
  } catch (err) {
    console.error("获取 WSL IP 地址失败:", err.message);
  }
  return null;
}

main().catch((err) => {
  console.error("启动预览服务器时出错:", err);
  process.exit(1);
});
