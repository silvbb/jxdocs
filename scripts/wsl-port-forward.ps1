# WSL 端口转发脚本

# 通过UTF-8 with BOM保存此文件。

# 设置输出编码为 UTF-8
try {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
} catch {
    # 忽略可能的错误
}

# 检查是否以管理员身份运行
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    # 自动请求管理员权限
    Write-Output "此脚本需要管理员权限，正在请求提升权限..."
    Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# 获取 WSL IP 地址
$wslIp = wsl -- ip addr show eth0 | Select-String -Pattern '\s*inet\s+([0-9.]+)' | ForEach-Object { $_.Matches.Groups[1].Value }

Write-Output "WSL IP 地址: $wslIp"

# 重置现有端口转发规则
Write-Output "正在重置现有端口转发规则..."
netsh interface portproxy reset

# 设置新的端口转发规则
$ports = @(4172, 4173)
foreach ($port in $ports) {
    Write-Output "正在设置端口 $port 的转发..."
    netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp
}

# 显示所有端口转发规则
Write-Output "当前端口转发规则:"
netsh interface portproxy show all

Write-Output "端口转发设置完成！现在可以通过 localhost 访问 WSL 中的服务。"
Write-Output "按任意键退出..."
pause