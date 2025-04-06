---
title: 终端操作常识
urlname: FT9odmswnoxRf9xP8slc9aLTn0d
date: '2025-03-28 13:53:18'
updated: '2025-04-04 13:57:47'
---
## 1，Windows 终端：
1. Command Prompt (cmd.exe)

   - Windows 默认命令行终端

   - 最基础的命令行界面

2. PowerShell

   - 更现代的命令行和脚本环境

   - 支持更复杂的命令和脚本功能

PowerShell (两个版本):Windows PowerShell ( powershell.exe )和PowerShell Core ( pwsh.exe )：
```plaintext
# Windows PowerShell 与 PowerShell Core 的区别
这两个路径指向的是两个不同版本的 PowerShell：

1. %SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe
   - 这是传统的 Windows PowerShell (5.1)
   - 内置于 Windows 系统
   - 基于 .NET Framework
   - 只能在 Windows 上运行
2. C:\Users\10640\AppData\Local\Microsoft\WindowsApps\Microsoft.PowerShell_8wekyb3d8bbwe\pwsh.exe
   - 这是 PowerShell Core (PowerShell 7.x)
   - 通过 Microsoft Store 安装的版本
   - 基于 .NET Core/.NET 5+
   - 跨平台，可在 Windows、macOS 和 Linux 上运行
   - 文件名为 pwsh.exe 而非 powershell.exe
## 主要区别
1. 兼容性 ：
   - PowerShell Core 支持大多数 Windows PowerShell 模块，但有些依赖 Windows 特定功能的模块可能不兼容
2. 性能 ：
   - PowerShell Core 通常性能更好，启动更快
3. 功能 ：
   - PowerShell Core 包含更多现代功能，如并行处理、管道链、错误处理改进等
4. 更新频率 ：
   - PowerShell Core 更新更频繁，而 Windows PowerShell 5.1 已经停止主要功能更新
您目前遇到的 conda 初始化问题可能与您使用的是 PowerShell Core 有关，因为 conda 初始化脚本可能主要针对传统的 Windows PowerShell 设计。
## Trae AI
# Laragon 工具解析
Laragon 是一个用于 Web 开发的便携式、隔离的开发环境，专为 Windows 系统设计。根据提供的链接内容，Laragon 有以下主要特点和优势：

## 主要特点
1. 便携性 ：Laragon 可以在任何地方运行，无需安装，可以放在 USB 驱动器上随身携带。
2. 隔离环境 ：它创建了一个独立的开发环境，不会影响系统的其他部分。
3. 自动配置 ：自动处理虚拟主机配置，简化了开发过程。
4. 轻量级 ：相比其他类似工具，Laragon 更轻量，启动更快。
5. 灵活性 ：支持多种 Web 服务器（Apache、Nginx）和数据库（MySQL、PostgreSQL、MongoDB）。
6. 多项目支持 ：可以同时管理多个项目，并为每个项目提供独立的环境。
## 适用场景
Laragon 特别适合以下场景：

1. PHP 开发者（Laravel、WordPress、Drupal 等）
2. 需要在 Windows 上进行 Web 开发的团队
3. 学习 Web 开发的初学者
4. 需要便携开发环境的开发者
## 与其他工具的比较
相比 XAMPP、WAMP 等类似工具，Laragon 提供了更现代化的功能和更好的用户体验：

- 更快的启动速度
- 更少的资源占用
- 更简单的项目管理
- 更好的可扩展性
Laragon 是一个非常实用的工具，特别适合在 Windows 环境下进行 PHP 和其他 Web 开发工作的开发者使用。它简化了环境配置过程，让开发者可以专注于代码编写而不是环境设置。

## silvbb
复制

删除

https://github.com/gwuhaolin/livego解析下

## Trae AI
# LiveGo 项目解析
LiveGo 是一个使用 Go 语言编写的简单高效的直播服务器。这个项目提供了实时视频流处理的功能，支持多种流媒体协议。

## 主要功能
1. 多协议支持 ：支持 RTMP、HLS、HTTP-FLV 等主流直播协议
2. 跨平台 ：可以在 Windows、Linux、macOS 等多个平台上运行
3. 高性能 ：Go 语言编写，具有较高的并发处理能力
4. 低延迟 ：针对实时直播场景优化，提供低延迟的视频传输
## 技术特点
- 使用纯 Go 语言实现，没有 CGO 依赖
- 采用模块化设计，各个组件可以独立工作
- 支持 RTMP 推流和拉流
- 支持 RTMP 转 HLS
- 支持 RTMP 转 HTTP-FLV
## 应用场景
LiveGo 适用于以下场景：

- 个人或小型直播平台
- 视频会议系统
- 在线教育直播
- 游戏直播
- 活动直播
## 使用方法
项目可以通过简单的命令行参数启动，配置灵活。用户可以根据自己的需求修改配置文件，调整服务器的行为。

这是一个轻量级的直播服务器解决方案，适合那些需要快速搭建直播功能但又不想使用复杂商业解决方案的开发者。对于学习流媒体服务器开发的人来说，这也是一个很好的参考项目。


powershell和pwsh的快捷指令可以通用么

# PowerShell 和 pwsh 命令的通用性
PowerShell (Windows PowerShell) 和 pwsh (PowerShell Core) 的大多数命令是通用的，但也存在一些差异。

## 通用部分
1. 基本命令行语法 ：两者使用相同的语法规则
2. 核心 cmdlet ：如 Get-Process 、 Get-Content 、 Set-Location 等基础命令
3. 管道操作 ： | 管道符号的使用方式相同
4. 变量定义 ： $variable = value 的语法相同
5. 脚本执行 ： .ps1 脚本文件的执行方式基本相同
```


3. Windows Terminal

   - 新一代终端应用

   - 可以集成管理多种终端

   - 支持标签页和分屏
```yaml
Windows Terminal 是一个现代化的终端应用程序，它是一个 容器 或 宿主环境 ，可以运行各种命令行工具，包括：
- PowerShell (传统版和 Core 版)
- 命令提示符 (CMD)
- WSL (Windows Subsystem for Linux)
- Azure Cloud Shell
- 等其他命令行工具
```
Cygwin 是一个在 Windows 上模拟 Linux/Unix 环境的工具集

WSL（Windows Subsystem for Linux）:
## 2，Linux/Unix 终端：
1. Bash (Bourne Again Shell)
	- 最常用的 Unix shell
		- 大多数 Linux 发行版的默认 shell
	
1. Zsh
	- 增强版的 Bash
		- 更好的自动补全和主题支持
	
1. iTerm2 (macOS)
	- macOS 上流行的终端模拟器
		- 功能丰富，支持分屏
	
1. 4tmux 是一个终端复用器（Terminal Multiplexer）

     会话管理
## 3，跨平台终端：
1. Git Bash
	- Windows 上模拟 Unix-like 环境
		- 提供基本的 Unix 命令
	
1. Cmder
	- Windows 上的终端模拟器
		- 支持多种 shell
	
1. Alacritty
	- 跨平台的 GPU 加速终端
		- 性能优秀，配置灵活
				## 终端技巧	### bash快捷指令	1，创建别名(alias)来简化命令	1. 编辑bash配置文件：
		```bash
	vim ~/.bashrc
	```	1. 在文件末尾添加以下内容：
		```bash
	# Home Assistant环境快捷命令
	alias ssa='source ~/ha_env/bin/activate'
	alias harun='hass -c /mnt/f/project_space/.homeassistant-wsl'
	# Docker Compose快捷命令
	alias dharun='docker-compose -f /mnt/f/project_space/.homeassistant-docker/docker-compose.yml up -d'
	alias dhalog='docker-compose -f /mnt/f/project_space/.homeassistant-docker/docker-compose.yml logs -f'
	alias dhadown='docker-compose -f /mnt/f/project_space/.homeassistant-docker/docker-compose.yml down'
	# nginx快捷命令
	alias ng1='sudo nginx -t && sudo systemctl restart nginx'
	alias ngs='source ~/.bashrc'
	alias ngvim='sudo vim /etc/nginx/sites-available/homeassistant'
	```	3. 使更改生效：	```plaintext
	source ~/.bashrc
	```

### PowerShell 常用快捷命令
以下是一些可以添加到 PowerShell 配置文件中的实用快捷命令和别名，可以提高您的工作效率：


#### 文件和目录操作
```power
# 快速导航
function cd.. { Set-Location .. }
function ... { Set-Location ..\.. }
function .... { Set-Location ..\..\.. }

# 列出目录内容
function ll { Get-ChildItem -Force }
function la { Get-ChildItem -Force }
function ls { Get-ChildItem }

# 创建和删除目录
function md { param($dir) New-Item -ItemType Directory -Path $dir }
function rd { param($dir) Remove-Item -Recurse -Force $dir }

# 快速编辑配置文件
function Edit-Profile { notepad $PROFILE }
```
#### 系统管理
```power
# 系统信息
function sysinfo { systeminfo | Select-String "OS", "System" }

# 进程管理
function psg { param($name) Get-Process | Where-Object { $_.Name -like "*$name*" } }
function killp { param($name) Get-Process $name | Stop-Process -Force }

# 网络命令
function ipconfig { ipconfig /all }
function flush-dns { ipconfig /flushdns }
function test-net { param($target) Test-NetConnection $target }
```
#### 开发相关
```power
# Git 快捷命令
function gs { git status }
function ga { param($file) git add $file }
function gc { param($msg) git commit -m $msg }
function gp { git push }
function gl { git pull }

# Docker 快捷命令
function dps { docker ps }
function dimg { docker images }
function dstop { param($container) docker stop $container }
```
#### 实用工具
```power
# 快速查找文件
function ff { param($pattern) Get-ChildItem -Recurse | Where-Object { $_.Name -like "*$pattern*" } }

# 计算文件夹大小
function Get-Size { param($path) Get-ChildItem $path -Recurse | Measure-Object -Property Length -Sum }

# 快速打开应用
function chrome { Start-Process "chrome.exe" }
function edge { Start-Process "msedge.exe" }
function code { param($path=".") Start-Process "code" -ArgumentList $path }
```
#### CodeSandbox 命令
```undefined
# CodeSandbox 快捷命令
function New-Sandbox {
    param(
        [string]$template = "react"
    )
    Write-Host "创建新的 CodeSandbox 项目 (模板: $template)..." -ForegroundColor Cyan
    npx create-codesandbox --template $template
}

function Open-Sandbox {
    param(
        [string]$path = "."
    )
    Write-Host "在 CodeSandbox 中打开当前项目..." -ForegroundColor Cyan
    npx codesandbox $path
}

function Deploy-Sandbox {
    Write-Host "部署项目到 CodeSandbox..." -ForegroundColor Cyan
    npx codesandbox deploy
}

function Login-Sandbox {
    Write-Host "登录到 CodeSandbox..." -ForegroundColor Cyan
    npx codesandbox login
}

function Logout-Sandbox {
    Write-Host "从 CodeSandbox 登出..." -ForegroundColor Cyan
    npx codesandbox logout
}

# 设置别名
Set-Alias -Name csb-new -Value New-Sandbox csb-new - # 创建新的 CodeSandbox 项目
Set-Alias -Name csb-open -Value Open-Sandbox #在 CodeSandbox 中打开当前项目
Set-Alias -Name csb-deploy -Value Deploy-Sandbox #- 部署项目到 CodeSandbox
Set-Alias -Name csb-login -Value Login-Sandbox #登录到 CodeSandbox
Set-Alias -Name csb-logout -Value Logout-Sandbox # 从 CodeSandbox 登出
```
## 如何添加到 PowerShell 配置文件
1. 打开 PowerShell
2. 运行 notepad $PROFILE 打开配置文件
3. 将上述函数复制到文件中
4. 保存文件并重启 PowerShell
您可以根据自己的需求选择和修改这些快捷命令。
### 终端乱码：
使用 PowerShell 并指定输出编码：
```power
Get-ChildItem -Recurse | Select-Object FullName | Out-File -FilePath structure.txt -Encoding utf8
```
或者使用 CMD 命令并重定向到文件时指定编码：
```power
chcp 65001
dir /s /b f:\project_space\weapp-vite > structure.txt
```
