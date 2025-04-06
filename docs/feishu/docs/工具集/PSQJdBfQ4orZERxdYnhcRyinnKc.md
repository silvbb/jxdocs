---
title: 系统操作-WSL
urlname: PSQJdBfQ4orZERxdYnhcRyinnKc
date: '2025-03-29 15:18:04'
updated: '2025-04-04 16:24:51'
---
## 1，WSL目录结构
WSL2 (Windows Subsystem for Linux 2) 的目录结构与标准Linux系统类似，但有几个关键点需要注意：
1. 根目录结构 ：与常规Linux发行版相同，主要包含：
	```plaintext
	/
	├── bin    # 基本命令二进制文件
	├── etc    # 系统配置文件
	├── home   # 用户主目录
	├── usr    # 用户程序
	├── var    # 可变数据
	└── ...    # 其他标准目录
	```
在 WSL 中： ~/homeassistant 指向 /home/用户名/homeassistant
```plaintext
echo ~  # 显示 ~ 目录
pwd    # 显示当前目录
wsl -l -v或者wsl --list --running
```
## 2，配置WSL
在 WSL2 中编辑 /etc/wsl.conf

使用 nano 编辑器（推荐）
```yaml
权限范围 ：
- WDAGUtilityAccount ：仅限特定系统服务使用，权限过高且存在安全风险
- Authenticated Users ：包含所有已登录用户（包括WSL用户），权限范围更合理
# 在Windows端执行：
1. 右键点击文件夹 -> 属性 -> 安全 -> 编辑
2. 点击"添加" -> 输入"Authenticated Users" -> 检查名称 -> 确定
3. 勾选"完全控制"权限

   
#确保权限继承 ：
   在Windows中：
1. 右键点击文件夹 -> 属性 -> 安全 -> 高级
2. 勾选"替换子容器和对象的权限项"
3. 点击"应用"

 #应用设置后重启WSL：
   wsl --shutdown
```
```bash
sudo vim /etc/wsl.conf
加入：
[automount]
options = "metadata,umask=022,fmask=11"

- metadata
- 启用 NTFS 元数据支持
- 允许 Linux 系统读取/写入 Windows 文件的权限和所有者信息
- 必需基础参数 ，没有此项其他权限设置可能不生效

- umask=022
- 控制 目录 的默认权限
- 计算方式：777 - 022 = 755
- 效果：目录权限为 drwxr-xr-x
  - 所有者：读+写+执行
  - 组用户：读+执行
  - 其他用户：读+执行
  
- fmask=11
- 控制 文件 的默认权限
- 计算方式：666 - 011 = 655
- 效果：文件权限为 -rw-r--r--
  - 所有者：读+写
  - 组用户：读
  - 其他用户：读
- 特殊说明：末位 1 会移除所有用户的执行权限（Windows 文件默认不应有执行权限）

挂载的默认用户改成homeassistant
options = "metadata,uid=999,gid=999,umask=022,fmask=11"
- uid=1000
- 将挂载的 Windows 文件默认所有者设为 Linux 用户 ID 1000
- 1000 通常是 WSL 中第一个创建的用户（可通过 id -u 查看当前用户 ID）
- gid=1000
- 将挂载的 Windows 文件默认所属组设为 Linux 组 ID 1000
- 1000 通常是第一个用户的主组（可通过 id -g 查看）

options = "metadata,uid=999,gid=999,dmask=000,fmask=000"
- dmask=000 ：目录权限 777 (rwxrwxrwx)
- fmask=000 ：文件权限 666 (rw-rw-rw-)

针对系统用户（UID < 1000）的特殊挂载配置 fmask=111
fmask=111
- 控制 文件 权限掩码
- 计算方式：666 - 111 = 555 → -r-xr-xr-x
- 特殊作用：
  - 移除所有用户的 写权限 （保护系统文件）
  - 保留执行权限（某些系统脚本需要）
### 为什么系统用户需要特殊配置？
1. 安全隔离：防止普通用户修改系统关键文件
2. 权限继承：系统用户创建的文件需要更严格限制
3. WSL 机制：对低 UID 用户会自动加强权限约束

# 验证WSL挂载参数（需显示uid=1000）
cat /proc/mounts | grep /mnt/f
# 预期输出：F: /mnt/f drvfs rw,relatime,uid=1000,gid=1000,... 0 0

# 验证文件继承权限
ls -l /mnt/f/project_space/.homeassistant-wsl/.storage

验证设置
ls -ld /mnt/f/project_space/.homeassistant-wsl  
# 应显示类似：
# drwxrwxrwx 1 homeassistant homeassistant 4096 Jan 1 00:00 /mnt/c/

安装必要工具
sudo apt update && sudo apt install -y attr
查看完整元数据信息
getfattr -d /mnt/f/project_space/.homeassistant-wsl/.storage/auth
# 预期输出应包含：security.selinux="unconfined_u:object_r:ntfs:s0"
```


编辑完成后：
1. 按 Ctrl+O 保存

1. 按 Enter 确认文件名

1. 按 Ctrl+X 退出

修改后需要重启 WSL 生效：
```bash
#外部：
wsl --shutdown
wsl
#内部重启
sudo reboot

wsl --list --verbose 查看启动
```
- 如果禁用自动生成，建议手动确保至少包含：

在 WSL2 的 wsl.conf 配置文件中，可以设置以下几类核心参数：

wsl.conf 配置文件中，可以设置以下几类核心参数：
### 1. 自动挂载配置 ([automount])
```toml
[automount]
enabled = true       # 是否自动挂载Windows驱动器
root = /mnt/         # 挂载根目录
options = "metadata,umask=022,fmask=111"  # 权限设置
mountFsTab = true    # 是否读取/etc/fstab
```
### 2. 网络配置 ([network])
```toml
[network]
generateHosts = true     # 是否自动生成/etc/hosts
generateResolvConf = true  # 是否自动生成/etc/resolv.conf
hostname = mywsl        # 自定义主机名
```
### 3. 启动配置 ([boot])
```toml
[boot]
systemd = true         # 是否启用systemd
command = "service ssh start"  # WSL启动时执行的命令
```
### 4. 用户配置 ([user])
```toml
[user]
default = myuser       # 默认登录用户
```
### 5. 互操作配置 ([interop])
```undefined
[interop]
enabled = true        # 是否允许调用Windows程序
appendWindowsPath = true  # 是否将Windows路径加入$PATH
```
### 6. 内核配置 ([kernel])
```toml
[kernel]
commandLine = "debug"  # 自定义内核启动参数
```
### 完整配置示例：
```undefined
[automount]
options = "metadata,umask=022"

[network]
generateHosts = false

[boot]
systemd = true

[user]
default = ubuntu
```
注意事项：修改后需重启WSL生效；路径权限建议保持 umask=022 避免跨系统访问问题



重置WSL网络

netsh winsock reset

检查后台进程

tasklist | findstr "wsl"

检查WSL版本

wsl --list --verbose

卸载WSL

wsl --unregister Ubuntu

重新安装所需的 Linux 发行版

wsl --install -d Ubuntu
## 3，带有 WSL2 模式的 Docker Desktop
结合了 Docker 和 Windows Subsystem for Linux 2 (WSL2) 的优势。

以下是关键特点：
1. 技术架构 ：
	- 使用 WSL2 作为后端运行环境（替代传统的 Hyper-V 虚拟机）
		- 在轻量级 Linux 内核中运行 Docker 守护进程
	
1. 核心优势 ：
	- 性能提升 ：相比传统 Hyper-V 方案，文件 I/O 性能显著提高
		- 资源效率 ：更少的内存占用，更好的 CPU 利用率
		- 无缝集成 ：可直接在 Windows 终端中使用 docker 命令
	
1. 工作流程 ：
	- 容器实际运行在 WSL2 的 Linux 环境中
		- 通过 Docker Desktop 的 GUI 或 CLI 统一管理
		- 支持挂载 Windows 文件系统的目录到容器中
	
1. 适用场景 ：
	- 在 Windows 上开发 Linux 容器应用
		- 需要同时使用 Windows 工具链和 Linux 环境
		- 追求更高效的开发测试工作流
	
1. 配置要求 ：
	- Windows 10 2004 或更高版本
		- 已启用 WSL2 功能
		- 建议至少 8GB 内存
	
```toml
wsl --install
wsl --set-default-version 2
安装 Docker Desktop
安装过程中确保勾选：
- "Use WSL 2 instead of Hyper-V"（使用 WSL2 而不是 Hyper-V）
- "Install required Windows components for WSL 2"（安装 WSL2 所需的 Windows 组件）
配置 Docker Desktop
进入 Docker Desktop Settings > General：
- 勾选 "Use the WSL 2 based engine"（使用基于 WSL2 的引擎）
进入 Settings > Resources > WSL Integration：
- 启用与您安装的 WSL 发行版的集成（如 Ubuntu）
验证安装
docker --version
docker run hello-world
可选优化
在 Docker Desktop 设置中：
- 调整内存和CPU分配（建议内存至少4GB）
- 启用 Kubernetes（如果需要）
```
## 4，在WSL2环境中通过Docker安装Home Assistant
```toml
1. 确保已安装必要组件
wsl --update
wsl --set-default-version 2
2，创建专用Docker网络（推荐）
docker network create homeassistant
3. 运行Home Assistant容器
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -v /mnt/f/project_space/.homeassistant:/config \
  --network=homeassistant \
  -p 8123:8123 \
  ghcr.io/home-assistant/home-assistant:stable
 4. 验证安装
 docker ps -a | grep homeassistant
 5. 访问Home Assistant
 http://localhost:8123
 
 如果使用SSL证书，需要同步挂载证书目录：
 -v /mnt/f/project_space/.homeassistant/ssl:/ssl
```
