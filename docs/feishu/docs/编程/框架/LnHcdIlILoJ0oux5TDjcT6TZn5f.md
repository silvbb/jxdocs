---
title: Laravel PHP Web 开发框架
urlname: LnHcdIlILoJ0oux5TDjcT6TZn5f
date: '2025-04-02 11:34:29'
updated: '2025-04-04 22:04:14'
---
官方文档：https://learnku.com/docs/laravel/10.x/installation/14835#2e0902

Laravel 的标准目录结构如下：
```plaintext
/项目根目录
├── app                     # 应用核心代码
│   ├── Console            # 命令行命令
│   ├── Exceptions         # 异常处理
│   ├── Http               # HTTP 层
│   │   ├── Controllers    # 控制器
│   │   ├── Middleware     # 中间件
│   │   └── Requests       # 表单请求
│   ├── Models             # 数据模型
│   └── Providers          # 服务提供者
├── bootstrap               # 框架启动文件
├── config                  # 配置文件
├── database                # 数据库相关
│   ├── factories          # 模型工厂
│   ├── migrations         # 数据库迁移
│   └── seeders            # 数据填充
├── public                  # 公共访问目录（网站根目录）
│   └── index.php          # 入口文件
├── resources               # 资源文件
│   ├── css                # CSS 文件
│   ├── js                 # JavaScript 文件
│   ├── lang               # 语言文件
│   └── views              # 视图文件
├── routes                  # 路由定义
│   ├── api.php            # API 路由
│   ├── channels.php       # 广播频道
│   ├── console.php        # 控制台路由
│   └── web.php            # Web 路由
├── storage                 # 存储目录
│   ├── app                # 应用存储
│   ├── framework          # 框架存储
│   └── logs               # 日志文件
├── tests                   # 测试代码
├── vendor                  # Composer 依赖
├── .env                    # 环境配置
├── .env.example            # 环境配置示例
├── artisan                 # Artisan 命令行工具
├── composer.json           # Composer 配置
└── package.json            # NPM 配置
```
Laravel 框架提供的两种不同的开发环境解决方案。
## 1，开发环境
### 1.1，集成环境
Laravel Sail（它依赖于 Docker）：

Laravel Sail 是一个轻量级的命令行界面，用于与 Docker 交互。它提供了一个简单的开发环境，不需要在本地安装 PHP、Composer、MySQL 等软件。Sail 使用 Docker 容器来运行应用程序。
```yaml
curl -s https://laravel.build/example-app | bash

选择安装：
# 选择 Sail 服务
curl -s "https://laravel.build/example-app?with=mysql,redis" | bash

# 安装默认的 Devcontainer:
curl -s "https://laravel.build/example-app?with=mysql,redis&devcontainer" | bash
```
Homestead 是一个预配置好的 Vagrant 虚拟机，它提供了一个完整的 PHP 开发环境。Homestead 包含了 Nginx、PHP、MySQL、PostgreSQL、Redis 等开发工具，适合那些不想在本地机器上直接安装这些软件的开发者。
### 主要区别
1. 技术基础 ：Sail 基于 Docker，Homestead 基于 Vagrant/VirtualBox

1. 资源占用 ：Sail 通常比 Homestead 占用更少的系统资源

1. 配置复杂度 ：Sail 配置更简单，Homestead 配置更复杂但更全面

1. 适用场景 ：Sail 适合单项目开发，Homestead 适合多项目开发

### 1.2，Composer集成
```yaml
# 安装 PHP 及常用扩展
sudo apt install php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath

必装的有：
sudo apt install php-xml php-curl php-mbstring php-zip php-mysql php-bcmath

# 安装 Composer
sudo apt update
sudo apt install composer

composer create-project laravel/laravel example-app

#进入项目目录并启动 Laravel 的开发服务器：
cd example-app
php artisan serve
```
[Artisan](https://learnku.com/docs/laravel/6.x/artisan) 是 Laravel 提供的 CLI（命令行接口），它提供了非常多实用的命令来帮助我们开发 Laravel 应用。
```power
php artisan key:generate        生成 App Key
php artisan make:controller        生成控制器
php artisan make:model        生成模型
php artisan make:policy        生成授权策略
php artisan make:seeder        生成 Seeder 文件
php artisan migrate        执行迁移
php artisan migrate:rollback        回滚迁移
php artisan migrate:refresh        重置数据库
php artisan db:seed        填充数据库
```
## 2, 网络
Windows 下hosts文件建立 主机里直接访问虚拟机站点，必须通过绑定 `hosts` 来实现
```power
192.168.56.58   homestead.test
```
站点配置（可以在Homestead.yaml配置也可以直接nginx里配置）

Laravel 应用的 Nginx 站点 Web Root 配置，默认就是在根目录下的 `public` 目录。
```power
sites:
    - map: homestead.test
      to: /home/vagrant/Code/Laravel/public
```
nginx里配置

查看nginx配置：sudo cat /etc/nginx/sites-available/homestead.test
```power
server {
    listen 80;
    listen 443 ssl http2;
    server_name .homestead.test;
    root "/home/vagrant/code/Laravel/public";
```
## 3，数据库
SQLite 
```yaml
#创建一个空的 SQLite 数据库文件。
touch database/database.sqlite

#安装php-sqlite3拓展
php -v
#安装对应的sqllist
sudo apt-get update
sudo apt-get install php8.1-sqlite3

#数据库迁移
php artisan migrate
```
Mysql

Postgres
## 4，log 
```yaml
tail -f storage/logs/laravel.log
```
## 5，Laravel 全栈框架

## 6，Laravel API 后端




启动：
```yaml
php artisan serve --host=0.0.0.0 --port=8000
```
查看所有route：
```yaml
php artisan route:list

#强制清除 Laravel 缓存 ：
php artisan route:clear
php artisan config:clear
php artisan view:clear
php artisan cache:clear
```

## 项目：动画小天才
[https://tm.jwisdom.fun/aligenie/](http://936521bc.vaiwan.com/aligenie/14c27feb915d73d39a09f471c9ae6e7e.txt?spm=a2c6h.12873639.article-detail.19.5d844decSCu7Hb&file=14c27feb915d73d39a09f471c9ae6e7e.txt)7d3ed3e756db3968eeb6edb36e2582c2.txt

[https://tm.jwisdom.fun/](http://936521bc.vaiwan.com/aligenie/14c27feb915d73d39a09f471c9ae6e7e.txt?spm=a2c6h.12873639.article-detail.19.5d844decSCu7Hb&file=14c27feb915d73d39a09f471c9ae6e7e.txt)api/teach/tmall/animate-master
```yaml
# 修改 Nginx 配置，阻止直接访问认证文件路径
location /aligenie/ {
    try_files = /index.php?$query_string;
}
```
##### 测试 GET 请求
curl -X GET http://localhost:8000/aligenie/7d3ed3e756db3968eeb6edb36e2582c2.txt
##### 测试 POST 请求
curl -X POST http://localhost:8000/aligenie/7d3ed3e756db3968eeb6edb36e2582c2.txt

curl -X POST http://tm.jwisdom.fun/aligenie/7d3ed3e756db3968eeb6edb36e2582c2.txt



可以curl -v -X POST

-v (--verbose) ：显示详细通信过程

-X (--request) ：指定 HTTP 请求方法


#### 使用在线 API 测试工具（需替换为实际 URL）
curl -X POST https://tm.jwisdom.fun/aligenie/7d3ed3e756db3968eeb6edb36e2582c2.txt \

  -H "Content-Type: application/json" \

  -d '{"test":"payload"}'

查看日志
```yaml
tail -f /mnt/f/project_space/aligenie-skill-demo-main/storage/logs/laravel.log
sudo tail -f /var/log/nginx/access.log

#检查 PHP-FPM 错误日志
sudo tail -f /var/log/php8.1-fpm.log
```
我传递给天猫精灵平台的是：https://tm.jwisdom.fun/api/teach/tmall/animate-master，我希望他再调用这个的时候跟我发给你的链接里写的一样：https://aligenie.com/doc/20255408/xnfxi5，调用api的时候进行如果收到POST调用：，返回我的认证text：Jfc4Z4Ur15JwUBuvUQD5wg7Nu8+l+HscqYlfofbyJdaHPtdGgFbQHfXfKp6jflL6
