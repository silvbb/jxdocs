---
title: PHP注意
urlname: LzeOd5JSKo2VNUxlRqQcByeynHb
date: '2025-04-02 12:41:57'
updated: '2025-04-04 20:15:17'
---
https://windows.php.net/index.php
## 1，wsl中安装php
```yaml
#添加 PPA 仓库
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```
安装不同版本的 PHP
```yaml
sudo apt install php8.0 php8.0-cli php8.0-common php8.0-curl php8.0-mbstring php8.0-xml php8.0-zip php8.0-dom php8.0-fpm
sudo apt install php8.1 php8.1-cli php8.1-common php8.1-curl php8.1-mbstring php8.1-xml php8.1-zip php8.1-mysql php8.1-intl php8.1-dom php8.1-fpm
sudo apt install php8.3 php8.3-cli php8.3-common php8.3-curl php8.3-mbstring php8.3-xml php8.3-zip php8.3-dom php8.3-fpm
```
切换 PHP 版本可以使用：
```yaml
sudo update-alternatives --set php /usr/bin/php8.1
php -v
```
## 2，composer
[Composer](https://getcomposer.org/) 是一款跨平台的 PHP 依赖管理工具，其创作灵感来源于 Node.js 的 NPM 与 Ruby 的 Bundler。
```yaml
#更新依赖包到允许的最新版本，并自动更新 composer.lock 文件。
composer update

#清除 Composer 缓存
composer clear-cache
composer install --ignore-platform-reqs
```
国内的 Composer 加速镜像
```power
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```
## 3，logs
```yaml
php artisan serve --host=0.0.0.0 --port=8000 > storage/logs/server.log 2>&1 &
```
2>&1 & 这部分命令包含两个不同的部分：
1. 2>&1 - 这是重定向操作：
	- 2> 表示将标准错误（stderr，文件描述符2）重定向
		- &1 表示重定向到标准输出（stdout，文件描述符1）的当前位置
		- 整体意思是：将错误信息也一并写入到与标准输出相同的位置（即 storage/logs/server.log 文件）
	
1. 最后的 & - 这是进程控制符号：
	- 表示在后台运行该命令
		- 这样命令执行后会立即返回命令提示符，而不会阻塞终端
		- 服务会在后台持续运行
	
所以完整命令的作用是：
- 启动 Laravel 开发服务器

- 监听所有网络接口（0.0.0.0）的 8000 端口

- 将所有输出（包括正常输出和错误信息）都写入到 storage/logs/server.log 文件

- 在后台运行，不阻塞当前终端

这种方式非常适合调试，因为您可以随时查看日志文件来了解服务器的运行状态。
