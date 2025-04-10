#!/usr/bin/env node

/**
 * 自动设置 WSL 到 Windows 的端口转发
 * JavaScript 脚本，使用 Node.js 运行
 * node setup-port-forward.js
 * 需要在 Windows PowerShell (管理员模式) 中运行
 */

import { execSync } from "child_process";

// 要转发的端口
const PORTS = [4172, 4173];

try {
  // 获取 WSL IP 地址
  const wslIp = execSync(
    `wsl -- ip addr show eth0 | grep "inet\\b" | awk '{print $2}' | cut -d/ -f1`,
    { encoding: "utf8" },
  ).trim();

  console.log(`WSL IP 地址: ${wslIp}`);

  // 清除现有的端口转发规则
  console.log("清除现有的端口转发规则...");
  execSync("netsh interface portproxy reset", { stdio: "inherit" });

  // 设置新的端口转发规则
  for (const port of PORTS) {
    console.log(`设置端口 ${port} 的转发...`);
    execSync(
      `netsh interface portproxy add v4tov4 listenport=${port} listenaddress=0.0.0.0 connectport=${port} connectaddress=${wslIp}`,
      { stdio: "inherit" },
    );
  }

  // 显示所有端口转发规则
  console.log("\n当前端口转发规则:");
  execSync("netsh interface portproxy show all", { stdio: "inherit" });

  console.log(
    "\n端口转发设置完成！现在你可以通过 localhost 访问 WSL 中的服务。",
  );
} catch (error) {
  console.error("设置端口转发时出错:", error.message);
  console.error("请确保在管理员模式下运行 PowerShell。");
  process.exit(1);
}
