---
title: 系统操作-docker
urlname: PE2tdLMGEoRW8bxtSA9cMQU7n9d
date: '2025-04-01 09:59:59'
updated: '2025-04-02 11:32:55'
---
## 1，Docker 与 Docker Compose 的区别
Docker 和 Docker Compose 是容器化技术中的两个重要工具，它们有着不同的用途和特点：


### Docker
Docker 是一个用于开发、发布和运行应用程序的平台。它允许你将应用程序与其依赖项打包到一个标准化单元（容器）中。

主要特点 ：
- 提供容器化环境

- 管理单个容器的生命周期

- 使用 Dockerfile 定义单个容器的构建过程

- 通过命令行直接操作容器

基本命令示例 ：
```bash
docker build -t myapp .
docker run -p 8080:80 myapp
docker stop container_id
```
### Docker Compose
Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。它使用 YAML 文件来配置应用程序的服务、网络和卷。

主要特点 ：
- 管理多个相互关联的容器

- 使用声明式 YAML 配置文件

- 一键启动/停止整个应用栈

- 简化环境变量、网络和卷的配置

- 适合开发、测试和生产环境

基本命令示例 ：
```bash
docker-compose up -d
docker-compose down
docker-compose logs
```

## 主要区别
1. 管理范围 ：
	- Docker：管理单个容器
		- Docker Compose：管理多个相互关联的容器
	
1. 配置方式 ：
	- Docker：使用命令行参数或 Dockerfile
		- Docker Compose：使用 YAML 配置文件
	
1. 使用场景 ：
	- Docker：适合简单应用或单一服务
		- Docker Compose：适合微服务架构或需要多个组件协同工作的应用
	
1. 操作复杂度 ：
	- Docker：需要手动管理容器间的网络、依赖关系
		- Docker Compose：自动处理容器间的网络和依赖关系
	
## 实际应用示例
Docker 单容器示例 ：
```bash
docker run -d -p 80:80 nginx
```
Docker Compose 多容器示例 ：
```yaml
# docker-compose.yml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
  redis:
    image: redis
```
总结来说，Docker 适合管理单个容器，而 Docker Compose 则是用于编排多个容器的工具，使它们能够协同工作。在实际项目中，通常会同时使用这两种工具。
## 2，使用Docker Compose在WSL2中安装Home Assistant的完整方案：
#### 首先创建 docker-compose.yml 文件：
```yaml
services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:2025.3.4
    container_name: homeassistant_test
    restart: unless-stopped
    volumes:
      - /mnt/f/project_space/.homeassistant:/config
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "8133:8123"  # 主机端口:容器端口
    environment:
      - TZ=Asia/Shanghai
    networks:
      - ha_network

networks:
  ha_network:
    driver: bridge
```
driver: bridge 和 network_mode: host 是两种不同的网络模式，主要区别如下：
1. bridge 网络模式 (默认模式)

- 创建独立的网络命名空间

- 容器通过虚拟网桥与主机通信

- 容器有自己独立的IP地址

- 端口需要显式映射到主机(-p 参数)

- 提供网络隔离，容器间默认不互通

1. host 网络模式

- 容器直接使用主机网络栈

- 没有网络隔离，容器使用主机IP

- 不需要端口映射，容器端口直接暴露在主机

- 性能更好(少一层网络虚拟化)

- 安全性较低(容器网络与主机完全共享)

#### 2. 启动服务的命令：
```yaml
sudo docker-compose -f /mnt/f/project_space/.homeassistant/docker-compose.yml up -d

将用户加入docker组（永久解决）
# 创建docker组（如果不存在）
sudo groupadd docker
# 将当前用户加入docker组
sudo usermod -aG docker $USER
# 重启系统使更改生效


# Docker实例日志
docker logs -f homeassistant_test

# 停止Docker实例
docker-compose -f /mnt/f/project_space/.homeassistant/docker-compose.yml down
```
3. 与您现有配置的兼容性说明：

- 会自动使用您现有的 configuration.yaml 配置
- 网络配置中的 172.0.0.0/8 范围仍然有效
- 端口映射与您配置中的 server_port: 8123 保持一致

4. 如果需要SSL证书支持，可以修改volumes部分：
```plaintext
volumes:
  - /mnt/f/project_space/.homeassistant:/config
  - /mnt/f/project_space/.homeassistant/ssl:/ssl
  - /etc/localtime:/etc/localtime:ro
```
1. 管理命令：

- 查看日志： docker-compose logs -f

- 停止服务： docker-compose down

- 更新镜像： docker-compose pull && docker-compose up -d

- 直接清空日志文件

```yaml
sudo sh -c "truncate -s 0 /var/lib/docker/containers/*/*-json.log"

上面不行则运行：docker logs --tail 1 homeassistant_test > /dev/null

docker kill --signal=SIGUSR1 homeassistant_test
```
这种安装方式比直接使用docker run更便于维护和升级，同时保留了您原有的所有配置。
#### 3，自动化开机自启：
```yaml
restart: unless-stopped  # 容器会自动重启
```
```yaml
docker ps  # 查看容器是否在运行
sudo systemctl enable docker  # Linux系统
```
## 3，确认 Python 依赖
查下是否需要安装依赖包pip3 install aiohttp aiofiles miservice


```yaml
docker exec -it homeassistant_test bash
pip3 install <required-package>
```
或者创建单独的build
```undefined
services:
  homeassistant:
    # 使用自定义构建而不是直接使用镜像
    build:
      context: .
      dockerfile: Dockerfile
    container_name: homeassistant_test
```
```yaml
FROM ghcr.io/home-assistant/home-assistant:2025.3.4

# 安装额外的依赖
RUN pip3 install --no-cache-dir aiohttp aiofiles miservice --root-user-action=ignore

# 设置工作目录
WORKDIR /config
```
最后再build一次

docker-compose down

docker-compose up -d --build
## 4，Docker 容器符号链接错误
Docker 容器在处理符号链接时确实存在一些限制和问题，特别是当这些符号链接指向容器外部或者挂载卷之外的路径时。
1. 首先，进入容器内部检查自定义组件目录：

```bash
docker exec -it homeassistant_test bash
```
2. 在容器内部，检查自定义组件目录是否存在：
```plaintext
ls -la /config/custom_components
```
1. 检查每个自定义组件目录的内容：

```bash
ls -la /config/custom_components/zhimi
ls -la /config/custom_components/zhimsg
ls -la /config/custom_components/zhiact
ls -la /config/custom_components/zhilace
ls -la /config/custom_components/zhibot
```
4. 检查每个组件的 manifest.json 文件：
```yaml
cat /config/custom_components/zhimi/manifest.json
```
确认所有组件都已正确加载，可以在 Docker 容器中运行以下命令：
```yaml
docker exec -it homeassistant_test bash -c "ls -la /config/custom_components/"
```
确认 genie2 的 URL 路径是否正确注册：
```yaml
docker exec -it homeassistant_test cat /config/custom_components/zhibot/__init__.py | grep -A 10 "register_view"
```
## 5，docker和wsl集成
### 空间清理
清理未使用的容器、网络、镜像和卷

docker system prune -a

检查 WSL 的磁盘空间：

df -h

WSL 的主要磁盘空间是：这是 WSL 的根文件系统，总容量约 1TB，已使用 13GB，可用空间 944GB，使用率仅 2%。
```plaintext
/dev/sdc                                 1007G   13G  944G   2% /
```
您的 Docker 相关存储位于：
```plaintext
/dev/sdd                                 1007G   27G  929G   3% /mnt/wsl/docker-desktop-data/isocache
```
## 重启
sudo service docker restart
