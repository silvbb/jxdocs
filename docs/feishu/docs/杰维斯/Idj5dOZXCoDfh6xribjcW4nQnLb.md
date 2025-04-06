---
title: homeAssis
urlname: Idj5dOZXCoDfh6xribjcW4nQnLb
date: '2025-03-27 15:05:25'
updated: '2025-04-03 00:07:18'
---
Home Assistant（简称 HA）是一个开源的智能家居平台
![image](/feishu/asset/images/ER2CbvdaNo0Rnzx10sHcjzoYn9g.png)

![image](/feishu/asset/images/SMVUbwaaXoIhWPx4VODcbdgHnmh.png)
## 1,Home Assistant 的开发者工具
docker环境：

Home Assistant OS

Home Assistant Supervised

可安装Home Assistant 加载项（Add-ons）官方集成

https://github.com/silvbb/addons



docker，wsl环境：

Home Assistant Core



建议使用官方推荐的 Python 3.11 版本（当前 Home Assistant Core 2024.6 的推荐版本）

pip install homeassistant==2024.6.0

http://127.0.0.1:8123/

jwisdom

123456

查看更详细的日志 hass -v

查看配置文件是否有错误：hass --script check_config
## 2,WSL2 
默认安装位置在 Windows 系统中通常位于：
```plaintext
C:\Users\[用户名]\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu[版本号]\LocalState\
```
查看当前安装的 WSL 分发版

wsl -l -v
![image](/feishu/asset/images/RrL6b5wB4o0urYxxOjOc6c3Nnde.png)
### 在wsl运行Home Assistant
```bash
启动 Ubuntu 
wsl
检查 WSL 状态
wsl --status

和项目代码建立软链接
mv ~/.homeassistant ~/.homeassistant.backup
mkdir -p ~/.homeassistant
ln -s /mnt/f/project_space/.homeassistant/* ~/.homeassistant/

在 WSL 中安装 Python 环境：
sudo apt update
sudo apt install -y python3 python3-pip python3-venv

创建并激活虚拟环境：
python3 -m venv ~/homeassistant
source ~/homeassistant/bin/activate或者conda activate py310
source /mnt/f/project_space/.homeassistant/ha_env/bin/activate

两种虚拟环境：一种python创建的，一种conda创建
python创建的： 
ls ~/.envs/ # 如果环境在此目录
ls ~/*/                # 查看家目录下的所有环境
source ~/home_env/bin/activate
conda创建的：
conda create -n home_env python=3.13
conda activate home_env # 激活环境

查看已有的虚拟环境
conda env list
# 或者
ls ~/.*env/

退出虚拟环境：
deactivate

安装依赖：
sudo apt-get update
sudo apt-get upgrade -y

Install the dependencies:
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev libatlas-base-dev
由于此帐户仅用于运行 Home Assistant Core，因此添加了 -rm 的额外参数以创建系统帐户并创建主目录
sudo useradd -rm homeassistant

安装 Home Assistant
pip3 install homeassistant
启动 Home Assistant：
hass --open-ui
```
sudo chmod +x /home/filiron/.homeassistant/secrets.yaml
## 3，符号链接（symbolic link）
Windows 的 mklink 或 Linux 的 ln -s ）来创建。
```undefined
# 查询是不是符号链接
file 
# 先删除原有的链接
rm -rf ~/.homeassistant
# 创建整个目录的符号链接，而不是目录内容的链接
ln -s /mnt/f/project_space/.homeassistant ~/.homeassistant
ln -s /mnt/f/project_space/.homeassistant /home/homeassistant/.homeassistant
ln -s /mnt/f/project_space/.homeassistant /srv/homeassistant/.homeassistant
sudo -u homeassistant ln -s /mnt/f/project_space/.homeassistant /srv/homeassistant/.homeassistant
```
### 在 WSL 中创建新的符号链接
- WSL 中访问 Windows 文件系统是通过 /mnt/驱动器盘符/ 的方式

- Linux 的符号链接需要使用绝对路径

- 创建符号链接时可能需要 sudo 权限

Windows 创建的 NTFS 符号链接（symbolic link）通常不会被正确识别和解析。

WSL 需要使用 Linux 风格的符号链接。

查看目录下所有的符号链接：ls -la /mnt/f/project_space/.homeassistant/custom_components | grep ^l

ls -la /mnt/f/project_space | grep ^l

ls -la  | grep ^l

批量删除：find /mnt/f/project_space/.homeassistant/custom_components -type l -delete



> 📌 .homeassistan中有好多子模块要建立wsl的符号链接：  
> ln -s /mnt/f/project_space/.homeassistant/modules/ZhiBot/custom_components/zhibot /mnt/f/project_space/.homeassistant/custom_components/zhibot

简单的 bash 循环来批量创建符号链接：
```undefined
for dir in /mnt/f/project_space/.homeassistant/modules/*/custom_components/*; do
    if [ -d "$dir" ]; then
        name=$(basename "$dir")
        echo "创建链接: $name -> $dir"
        read -p "是否创建? (y/n) " confirm
        if [ "$confirm" = "y" ]; then
            ln -sf "$dir" "/mnt/f/project_space/.homeassistant/custom_components/${name}"
        fi
    fi
done
```
## 4，安装系统依赖
  安装python，也可以安装python切换器
```toml
sudo update-alternatives --install /usr/bin/python3 python /usr/bin/python3.11 1
sudo update-alternatives --install /usr/bin/python3 python /usr/bin/python3.12 2
sudo update-alternatives --install /usr/bin/python3 python /usr/bin/python3.13 3
将 Python 3.11 设置为默认值
sudo update-alternatives --set python /usr/bin/python3.11
```
  系统依赖是所有 Python 版本共享的。无论是 Python 3.12 还是 Python 3.13，它们都使用同一套系统级别的库和开发工具。

  当你安装像 libffi-dev 、 libssl-dev 这样的系统包时，它们会被安装到系统的标准位置（如 /usr/lib 、 /usr/include 等），所有的 Python 版本在编译扩展模块时都会查找这些位置。

   这就是为什么你只需要安装一次这些系统依赖，它们就能被你系统上的所有 Python 版本使用。例如，当你在 Python 3.12 或 Python 3.13 的环境中安装需要编译的包（如 pymicro-vad ）时，编译过程都会使用同样的系统库和头文件。

   不过，有些特定于 Python 版本的开发包（如 python3.13-dev ）是需要单独安装的，因为它们包含特定 Python 版本的头文件和库。
```undefined
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.13 python3.13-venv  #安装 Python 3.13 和虚拟环境工具包

#安装 Python 3.13 虚拟环境
python3.13 -m venv /mnt/f/project_space/.homeassistant/ha_env
source /mnt/f/project_space/.homeassistant/ha_env/bin/activate

如果不行，换这个：
python3.13 -m venv ~/.homeassistant/ha_env
source ~/.homeassistant/ha_env/bin/activate
```
   总结来说，像 bluez 、 libffi-dev 、 build-essential 这样的通用系统依赖是所有 Python 版本共享的，而 python3.13-dev 这样的包则是特定于某个 Python 版本的。
```plaintext
sudo apt-get update
sudo apt-get upgrade -y

安装系统依赖项：系统依赖是所有 Python 版本共享的。无论是 Python 3.12 还是 Python 3.13，它们都使用同一套系统级别的库和开发工具。
sudo apt-get install -y python3.13 python3.13-dev python3.13-venv python3-pip bluez libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential libopenjp2-7 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev libatlas-base-dev
```
## 5， 创建帐户
```plaintext
- -r ：创建系统用户（UID在1000以下，通常用于服务账户）
- -m ：自动创建用户的家目录（通常位于 /home/homeassistant ）
sudo useradd -rm homeassistant && echo "homeassistant:13131313" | sudo chpasswd

创建一个用于安装 Home Assistant Core 的目录，并将所有者更改为 homeassistant 帐户。
sudo mkdir /srv/homeassistant

将所有者更改为 homeassistant 帐户
sudo chown homeassistant:homeassistant /srv/homeassistant

# 切换到 homeassistant 用户
sudo -u homeassistant -H -s
- 指定以 homeassistant 用户身份执行
- -H
- 模拟目标用户的完整登录环境
- 会设置 $HOME 等环境变量为目标用户的家目录（如 /home/homeassistant ）
- -s
- 启动交互式shell（默认为 /bin/bash ）
- 相当于以目标用户身份登录终端

cd /srv/homeassistant
创立符号链接，并修改权限。
sudo -u homeassistant ln -s /mnt/f/project_space/.homeassistant /srv/homeassistant/.homeassistant
1. 递归修改所有权
sudo chown -R homeassistant:homeassistant /srv/homeassistant
设置目录权限（推荐方案）
sudo chmod -R u=rwX,g=rX,o= /srv/homeassistant
如果使用符号链接
sudo chown -R homeassistant:homeassistant /mnt/f/project_space/.homeassistant
sudo chmod -R 755 /mnt/f/project_space/.homeassistant
验证权限
sudo -u homeassistant ls -la /srv/homeassistant/.homeassistant
预期输出 ：应显示 homeassistant 用户对所有文件有读写权限
```
创建一个新的管理员用户：
```yaml
cd /mnt/f/project_space/.homeassistant-wsl
hass --script auth --config . add-owner --username newadmin
```
## 6，虚拟环境
Python 虚拟环境（venv）和 Conda 虚拟环境的主要区别：
1. 功能范围：
	- venv：仅管理 Python 包和依赖
		- Conda：可以管理任何语言的包，包括 Python、R、Ruby、Lua、C/C++等
	
1. 包管理：
	- venv：使用 pip 安装包，只能安装 Python 包
		- Conda：使用 conda 命令安装包，可以安装系统级依赖
	
1. Python 版本：
	- venv：使用系统已安装的 Python 创建环境
		- Conda：可以在环境中安装任意版本的 Python
	
1. 使用场景：
	- venv：适合纯 Python 项目
		- Conda：适合数据科学、机器学习等需要多语言支持的项目
	
1. 资源占用：
	- venv：较轻量，占用空间小
		- Conda：较重，安装包多，占用空间大
	
对于 Home Assistant 这样的纯 Python 项目，使用 venv 就足够了，更轻量简单。



**为什么我用python创建的Home Assistant 环境一下子就好了，用conda创建的总有依赖冲突。pip3 install homeassistant和conda install homeassistant有什么区别**
1. 包管理策略：
	- pip：直接安装最新兼容版本的依赖
		- conda：会严格检查所有包之间的依赖关系，包括非 Python 包
	
1. 包源不同：
	- pip：使用 PyPI，Home Assistant 在这里维护官方包
		- conda：使用 Anaconda 源，Home Assistant 包可能不是最新版本或维护不及时
	
1. 依赖解析：
	- pip：相对宽松，只处理 Python 包之间的依赖
		- conda：更严格，会考虑包括系统库在内的所有依赖关系
	
1. 更新频率：
	- pip：Home Assistant 团队主要维护 PyPI 版本
		- conda：第三方维护，更新可能滞后
	
所以对于 Home Assistant：
- 推荐使用 pip install homeassistant

- 这是官方推荐的安装方式

- 能确保获得最新版本和最佳兼容性

如果你一定要用 conda，建议：
1. 创建一个纯净的 conda 环境

1. 在环境中使用 pip 安装 Home Assistant

```bash
# conda创建新环境或者 
conda create -n ha_env python=3.13  
conda activate ha_env              # 激活环境
conda install package_name        # 安装包
conda list                        # 列出已安装的包

# 更新包的依赖
conda env update -f /mnt/f/project_space/.homeassistant/environment.yml
列举环境: conda env list 或者 conda info --envs
删除某个环境 conda remove --name music_env --all
```
```bash
# python创建名为 ha 的虚拟环境 python -m venv f:\project_space\ha_env
python3 -m venv /mnt/f/project_space/.homeassistant/ha_env

#如果安装了 Python 3.13 虚拟环境
python3.13 -m venv ~/.homeassistant/ha_env
python3.13 -m venv /srv/homeassistant/ha_env
python3.13 -m venv ~/ha_env

source ~/ha_env/bin/activate
source ~/.homeassistant/ha_env/bin/activate
source /mnt/f/project_space/.homeassistant/ha_env/bin/activate

pip install --upgrade pip
python3 -m pip install wheel

$ pip3 install homeassistant
pip install -r requirements.txt

deactivate #退出环境
rm -rf /mnt/f/project_space/.homeassistant/ha_env #删除环境
rm -rf ~/.homeassistant/ha_env

```
## 7，安装
```bash
#当使用pip安装包时，如果有现成的wheel文件，pip会直接使用它，否则会下载源码包并编译，这可能需要编译器和相关开发库。
python3 -m pip install wheel


pip3 install homeassistant或者pip install homeassistant==2025.3.4
```
homeassistant-2025.3.4-py3-none-any.whl.metadata
```plaintext
根据 Home Assistant 官网文档，以下是核心包的用途说明：

1. 核心功能 ：
   - aiohttp : 异步HTTP客户端/服务器，用于与设备API通信
   - async-timeout : 异步操作超时控制，确保操作不会无限期挂起
   - Jinja2 : 模板引擎，用于自动化模板和脚本
   - PyYAML : YAML文件解析，用于配置文件读取
   - voluptuous : 数据验证，确保配置数据格式正确
2. 网络通信 ：
   - aiodns : 异步DNS解析，用于设备发现
   - zeroconf : 零配置网络发现，用于自动发现本地设备
   - httpx : 异步HTTP客户端，用于与Web服务通信
3. 设备集成 ：
   - bleak : 蓝牙低能耗设备通信，支持BLE设备
   - broadlink : Broadlink设备控制，支持红外和射频设备
   - pyserial : 串口通信，支持串口设备
4. 数据处理 ：
   - orjson : 高性能JSON处理，用于快速数据解析
   - python-dateutil : 日期时间处理，支持复杂时间计算
5. 安全相关 ：
   - cryptography : 加密功能，用于安全通信
   - PyNaCl : 加密和签名，用于安全认证
   - pyOpenSSL : OpenSSL接口，用于HTTPS通信
6. 多媒体处理 ：
   - av : 音视频处理，支持媒体流
   - mutagen : 音频元数据处理，支持音频文件
   - Pillow : 图像处理，支持图像操作
7. 工具类 ： 
   - psutil : 系统监控，获取系统状态
   - numpy : 数值计算，支持数据分析
   - click : 命令行工具，支持命令行接口
8. 特定功能 ：  
   - gTTS : 文本转语音，支持语音输出
   - xmltodict : XML转字典，支持XML数据处理
   - sqlalchemy : 数据库ORM，支持数据存储
这些包共同构成了 Home Assistant 的核心功能，支持设备集成、数据处理、网络通信等各个方面。建议参考官方文档获取最新信息。
```
## 8，运行
http://localhost:8123/onboarding.html
```yaml
#确保文件所有权：
chown -R $USER:$USER /mnt/f/project_space/.homeassistant

#运行项目：
python -m homeassistant --open-ui
或者 $ hass --open-ui

hass -c /home/homeassistant/.homeassistant --open-ui
hass -c /mnt/f/project_space/.homeassistant --open-ui
hass -c /srv/homeassistant/.homeassistant --open-ui

#杀死所有进程：
pkill -f hass
# 使用更强大的kill命令
sudo pkill -9 -f hass
sudo pkill -9 -f python.*hass
#cmd
taskkill /f /im hass.exe
taskkill /f /im python.exe


# 检查crontab是否有自动启动任务
crontab -l | grep hass
# 检查systemd服务
systemctl list-units | grep -i hass

# 检查 Home Assistant 是否正在运行
ps aux | grep hass

#自定义启动程序
python start_ha.py --open-ui
```
## 9，访问限制
配置打开：
```undefined
homeassistant:
  # ... 其他配置 ...
  external_url: "http://192.168.2.168:8123"  # 替换为你的 Windows 主机 IP
  internal_url: "http://192.168.2.168:8123"  # 替换为你的 Windows 主机 IP
 
 http:
  server_host: 0.0.0.0  # 监听所有网络
  server_port: 8123
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
    - ::1
    - 192.168.0.0/16
  cors_allowed_origins:
    - "*"
```
```yaml
#查端口占用
sudo lsof -i :8123
或者：netstat -ano | findstr 8123
或者：sudo netstat -tulnp | grep 8123

#打开防火墙
netsh advfirewall firewall add rule name="Home Assistant" dir=in action=allow protocol=TCP localport=8123
# 以管理员身份运行PowerShell
New-NetFirewallRule -DisplayName "Home Assistant" -Direction Inbound -Protocol TCP -LocalPort 8123 -Action Allow
# 为80端口添加入站规则
netsh advfirewall firewall add rule name="HTTP" dir=in action=allow protocol=TCP localport=80

# 删除已有的端口转发
netsh interface portproxy delete v4tov4 listenport=8123 listenaddress=0.0.0.0

# 添加新的端口转发
netsh interface portproxy add v4tov4 listenport=8123 listenaddress=0.0.0.0 connectport=8123 connectaddress=localhost

外网访问：
# 查看WSL IP地址
ip addr show eth0
# 以管理员身份运行PowerShell
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8123 connectaddress=172.23.105.85 connectport=8123

检查：
1. 是否有其他服务占用了8123端口：sudo lsof -i :8123
```
```toml
系统服务，请创建服务文件
sudo nano /etc/systemd/system/home-assistant.service
```
## 10，实现外网访问
#### 1. 内网穿透工具
这些工具可以将您的内网服务映射到公网，无需固定IP：

- 花生壳 ：国内比较知名的内网穿透工具，有免费版和付费版

- Frp ：开源的内网穿透工具，需要自己有一台公网服务器

- Ngrok ：国外的内网穿透服务，有免费版

- NATAPP ：国内的内网穿透服务

- ZeroTier ：创建虚拟局域网，可以在任何地方访问内网设备
#### 2. 免费的动态DNS服务
这些服务提供免费的子域名：

- DuckDNS ：完全免费，提供子域名

- No-IP ：提供免费子域名，但需要每30天确认一次

- 花生壳DDNS ：提供免费的动态域名解析服务
#### 3. 使用Home Assistant官方的远程访问服务
- Nabu Casa ：Home Assistant官方的云服务，每月约5美元，提供安全的远程访问
#### 4. 使用现有的公共云服务
- 阿里云、腾讯云等 ：很多云服务提供免费的内网穿透功能

- 路由器自带功能 ：一些高级路由器自带DDNS功能


### 配置Windows到WSL的端口转发
```toml

# 查看WSL的IP地址
wsl hostname -i
127.0.1.1
在 WSL 终端中执行：
ip addr show eth0

# 设置端口转发（假设WSL的IP是172.23.105.85）
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=172.23.105.85
netsh interface portproxy add v4tov4 listenport=8123 listenaddress=0.0.0.0 connectport=8123 connectaddress=172.23.105.85

# 查看当前的端口转发规则
netsh interface portproxy show all
```
### 配置 NGINX 作为 SSL 代理
在 Home Assistant Core 环境下集成 NGINX 作为 SSL 代理是一个很好的选择，可以提供更强大的 SSL 管理和反向代理功能。这样设置后，NGINX 将处理所有 SSL 相关的工作，包括证书管理、HTTPS 加密和安全头设置，而 Home Assistant 只需要处理应用逻辑。这种方式也便于将来添加其他服务到同一域名下的不同路径。
```toml
#安装
sudo apt update
sudo apt install nginx
```
创建 NGINX 配置文件：

在Ubuntu系统上，NGINX的配置文件通常位于以下位置：

1. 主配置文件： /etc/nginx/nginx.conf

2. 站点配置文件： /etc/nginx/sites-available/your-site-config

检查 Nginx 用户权限
```yaml
# 检查 Nginx 用户
ps aux | grep nginx

# 如果需要，修改 Nginx 用户权限
sudo usermod -a -G <homeassistant用户组> nginx
```
#### Nginx配置
需要确保以下几点：

1. 正确处理WebSocket连接

2. 正确传递所有必要的头信息

3. 确保auth回调URL能够正确工作
sudo vim /etc/nginx/sites-available/homeassistant
```undefined
server {
    listen 80;
    server_name ha.jwisdom.fun;
    
    # ok将 HTTP 重定向到 HTTPS 
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ha.jwisdom.fun;
    
    # Let's Encrypt SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/ha.jwisdom.fun/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ha.jwisdom.fun/privkey.pem;
    
    # 优化 SSL 设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # HSTS 设置
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # 其他安全头
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "upgrade-insecure-requests" always;
    
    # 代理设置
    location / {
        proxy_pass http://127.0.0.1:8123;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        
        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name dha.jwisdom.fun;
    
    # ok将 HTTP 重定向到 HTTPS 
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name dha.jwisdom.fun;
    
    # 阿里云 SSL 证书配置
    ssl_certificate /mnt/f/project_space/.homeassistant-docker/ssl/dha.jwisdom.fun_public.crt;
    ssl_certificate_key /mnt/f/project_space/.homeassistant-docker/ssl/dha.jwisdom.fun.key;
    
    # 优化 SSL 设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # HSTS 设置
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # 其他安全头
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "upgrade-insecure-requests" always;
    
    # 代理设置
    location / {
        proxy_pass http://127.0.0.1:8133;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        
        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```
启用配置并重启 NGINX
```toml
sudo ln -s /etc/nginx/sites-available/homeassistant /etc/nginx/sites-enabled/

sudo nginx -t  # 测试配置是否有错误
sudo systemctl restart nginx

关闭nginx
wsl -d Ubuntu-20.04 sudo service nginx stop
```
#### 检查Nginx的错误日志：
```yaml
# 查看Nginx配置文件中的日志路径设置
grep -r "access_log" /etc/nginx/

sudo tail -f /var/log/nginx/error.log

# 查看最新的访问日志
tail -f /var/log/nginx/access.log
# 或者使用grep过滤与天猫精灵相关的请求
grep -i "aligenie" /var/log/nginx/access.log
# 或者使用grep过滤与天猫精灵相关的请求
grep -i "genie2" /var/log/nginx/access.log
```
### 配置端口转发
流程：
- 外部请求通过443端口 → 路由器 → 转发到NGINX服务器的443端口 → NGINX处理SSL → 转发到Home Assistant的8123端口

```power
路由里讲wan口的80和443端口映射到本地192.168.2.168的80和443

# 在 Windows PowerShell (管理员) 中运行 映射到wsl的端口
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=172.23.105.85
netsh interface portproxy add v4tov4 listenport=443 listenaddress=0.0.0.0 connectport=443 connectaddress=172.23.105.85
```
检测状态
```toml
使用 systemctl 命令检查服务状态：
sudo systemctl status nginx
检查 NGINX 进程是否运行：
ps aux | grep nginx
检查 NGINX 是否监听端口：
sudo netstat -tuln | grep -E '80|443'
尝试访问 NGINX 默认页面：
curl http://localhost
查看 NGINX 日志文件：
sudo tail -f /var/log/nginx/error.log

```
## 11，日志
```undefined
logger:
  default: warning
  logs:
    custom_components: debug
    custom_components.china-workday: debug
    # 添加以下配置来关闭小米设备的调试日志
    custom_components.xiaomi_miot: warning
    custom_components.xiaomi_miot.core: warning
    #完全关闭某个组件的日志
    # custom_components.xiaomi_miot: critical
```
```toml
# 查看最近的错误日志
tail -n 100 /home/jwisdom/.homeassistant/home-assistant.log | grep -i error

#查看 HTTP 配置
cat /home/jwisdom/.homeassistant/configuration.yaml | grep -A 10 "http:"
```
12，Supervisor API

40000端口通常是Home Assistant的Supervisor API端口，用于Home Assistant Core与Supervisor之间的通信。如果您看到这个端口相关的消息，可能是因为您的Home Assistant尝试连接到Supervisor，但在WSL环境中可能没有正确配置。
## 13，device_tracker
- mobile_app - 通过Home Assistant手机应用跟踪

- bluetooth - 通过蓝牙跟踪

- fritz - 通过Fritz!Box路由器跟踪

- nmap - 通过网络扫描跟踪

- unifi - 通过UniFi控制器跟踪

- Netgear-Netgear路由器

## 14，ping集成
ping集成创建的是binary_sensor实体，而不是device_tracker实体。因此，我们需要相应地更新person配置中的device_trackers引用。
```undefined
ping:
  - host: 192.168.2.89
    name: babashouji
    count: 2
    scan_interval: 180
  - host: 192.168.1.192
    name: mamashouji
    count: 2
    scan_interval: 180

person:
  - name: 锋
    id: baba
    device_trackers: binary_sensor.babashouji
  - name: 小芝
    id: mama
    device_trackers: binary_sensor.mamashouji
```
## 15,常用插件与应用

HACS (Home Assistant Community Store) ：这是一个第三方的集成管理系统

安装File editor插件 直接编辑Home Assistant的配置文件和其他文件
```yaml
使用 VSCode 远程编辑或直接在 WSL 中编辑文件：
# Home Assistant配置文件编辑快捷命令
alias havim='vim /mnt/f/project_space/.homeassistant-wsl/configuration.yaml'
alias haconf='cd /mnt/f/project_space/.homeassistant-wsl/'
alias hadconf='cd /mnt/f/project_space/.homeassistant-docker/'
```
安装Samba Share插件 Samba Share插件允许您将Home Assistant系统中的文件夹共享到局域网中的其他设备上，便于文件传输和共享。
```yaml
sudo apt update
sudo apt install samba

# Samba服务快捷命令
alias smbconf='sudo vim /etc/samba/smb.conf'
alias smbstart='sudo service smbd start'
alias smbstop='sudo service smbd stop'
alias smbstatus='sudo service smbd status'

sudo vim /etc/samba/smb.conf

[homeassistant]
   path = /mnt/f/project_space/.homeassistant-wsl
   browseable = yes
   read only = no
   guest ok = no
```
安装node-red插件 node-red是一款流程编排工具，可以帮助您构建复杂的智能家居自动化流程。
```yaml
# Node-RED快捷命令
alias nrrun='docker run -it -p 1880:1880 -v /mnt/f/project_space/node-red-data:/data --name mynodered nodered/node-red'
```
## 16，在WSL中使用Let's Encrypt获取SSL证书


Let's Encrypt是一个免费、自动化的证书颁发机构，可以帮助您获取有效的SSL证书。以下是在WSL环境中为您的Home Assistant配置Let's Encrypt证书的步骤：


#### 1. 安装Certbot
首先需要安装Certbot工具和NGINX插件：
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```
#### 2. 确保NGINX配置正确
在申请证书前，确保NGINX配置文件中包含正确的server_name：
```bash
sudo nano /etc/nginx/sites-available/homeassistant
```
确保配置中包含：
```nginx
server {
    listen 80;
    server_name ha.jwisdom.fun;
    
    # 其他配置...
}
```
#### 3. 申请证书
使用Certbot自动申请证书并配置NGINX：
```bash
sudo certbot --nginx -d ha.jwisdom.fun
    

如果在wsl内网环境：使用DNS验证方式获取证书：
sudo certbot certonly --manual --preferred-challenges dns -d ha.jwisdom.fun
Certbot会要求您在DNS服务商处添加一条特定的TXT记录来验证域名所有权。步骤如下：
1. 运行上述命令
2. Certbot会提供一个TXT记录值
3. 登录您的DNS服务商控制面板（如阿里云、腾讯云等）
4. 为 _acme-challenge.ha.jwisdom.fun 添加一条TXT记录，值为Certbot提供的值
```
执行过程中，Certbot会：
- 验证您对域名的所有权

- 获取证书

- 自动修改NGINX配置

- 设置证书自动续期

```toml
生成的证书位置：
Certificate is saved at: /etc/letsencrypt/live/ha.jwisdom.fun/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/ha.jwisdom.fun/privkey.pem
```
手动配置配置文件
sudo vim /etc/nginx/sites-available/homeassistant

这些安全头的作用是：
- HSTS：强制浏览器使用HTTPS连接

- X-Content-Type-Options：防止MIME类型嗅探

- X-Frame-Options：防止网站被嵌入到iframe中，减少点击劫持风险

- X-XSS-Protection：启用浏览器内置的XSS过滤器

```yaml
server {
    listen 443 ssl;
    server_name ha.jwisdom.fun;
    
    ssl_certificate /mnt/f/project_space/.homeassistant-wsl/ssl/let.fullchain.pem;
    ssl_certificate_key /mnt/f/project_space/.homeassistant-wsl/ssl/let.privkey.pem;
    
     # 在这里添加安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # 其他SSL优化设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # 代理设置
    location / {
        proxy_pass http://127.0.0.1:8123;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        
        # WebSocket支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 添加这些头信息
        proxy_buffering off;
        proxy_redirect off;
        
        # 增加超时时间
        proxy_read_timeout 1800s;
        proxy_send_timeout 1800s;
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name dha.jwisdom.fun;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name dha.jwisdom.fun;
    
    ssl_certificate /mnt/f/project_space/.homeassistant-docker/ssl/dha.jwisdom.fun_public.crt;
    ssl_certificate_key /mnt/f/project_space/.homeassistant-docker/ssl/dha.jwisdom.fun.key;
    
     # 在这里添加安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # 其他SSL优化设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # 代理设置
    location / {
        proxy_pass http://127.0.0.1:8133;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        
        # WebSocket支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name dha.jwisdom.fun;
    return 301 https://$host$request_uri;
}
```
#### 4. 检查NGINX配置
证书申请成功后，检查NGINX配置是否正确：
```bash
sudo nginx -t

清空NGINX的错误日志文件
sudo truncate -s 0 /var/log/nginx/error.log

查看log
sudo tail -f /var/log/nginx/error.log
```
如果配置正确，重启NGINX：
```bash
sudo systemctl restart nginx
或者重新加载配置：sudo systemctl reload nginx
```
#### 5. 验证证书
访问您的网站 https://ha.jwisdom.fun 检查证书是否生效。
#### 注意事项
1. 域名必须指向公网IP，且该IP能够访问到您的WSL实例

1. 80和443端口需要开放，用于证书验证和HTTPS访问

1. 如果您在内网环境，需要设置端口转发

1. Let's Encrypt证书有效期为90天，但Certbot会自动设置续期任务

## 17,ipban
在较新版本的Home Assistant中，IP封禁信息不再单独存储在 ip_bans.json 文件中，而是集成到了核心数据库中。

ip_ban_enabled: false  # 禁用 IP 封禁
login_attempts_threshold: 10
1. 直接查询数据库文件：

```bash
# 进入Home Assistant配置目录
cd /mnt/f/project_space/.homeassistant-wsl

# 使用sqlite3工具查询数据库
sqlite3 home-assistant_v2.db "SELECT * FROM ip_bans;"
```
如果您想完全清除所有IP封禁记录，可以尝试：
```bash
sqlite3 home-assistant_v2.db "DELETE FROM ip_bans;"
```
## 18，WebSocket
WebSocket 在 Home Assistant 中用于处理实时事件和状态更新，漏掉这个配置确实会导致连接问题。
- WebSocket 支持 ：Home Assistant 使用 WebSocket 协议实现实时更新和通信。这个配置确保 Nginx 能够正确代理 WebSocket 连接。

- 长连接维护 ：通过设置 proxy_http_version 1.1 和 Connection "upgrade" ，允许连接从 HTTP 升级到 WebSocket 协议。

- 实时数据传输 ：WebSocket 允许服务器向客户端推送数据，使得 Home Assistant 界面能够实时更新状态变化，无需刷新页面。

- 前端功能支持 ：许多 Home Assistant 的前端功能，如实时状态更新、通知、实体状态变化等，都依赖于 WebSocket 连接。

如果没有这段配置，您可能会遇到以下问题：
- Home Assistant 界面无法实时更新

- 需要手动刷新页面才能看到状态变化

- 某些自动化和脚本执行后，界面状态不会立即更新

- 长轮询可能导致性能问题

这段配置对于通过 Nginx 代理访问 Home Assistant 时非常重要，特别是当您使用外部访问或反向代理时。
```undefined
# 可选：为 WebSocket 连接配置
    location /api/websocket {
        proxy_pass http://127.0.0.1:8123/api/websocket;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
```
