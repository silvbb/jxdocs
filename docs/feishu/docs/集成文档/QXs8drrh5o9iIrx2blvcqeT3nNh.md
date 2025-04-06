---
title: '虚拟机(Homestead Vagrant) '
urlname: QXs8drrh5o9iIrx2blvcqeT3nNh
date: '2025-04-03 00:15:43'
updated: '2025-04-04 20:54:05'
---

## 1，VirtualBox
VirtualBox 是 Oracle 公司的开源虚拟机软件。VirtualBox 号称是最强的免费虚拟机软件，它不仅功能齐全，而且性能也很优异！VirtualBox 支持大部分流行的系统，如：Mac, Windows, Linux 等。

https://www.virtualbox.org/wiki/Downloads

链接: https://pan.baidu.com/s/15nYWNHuHHYEWoVGwFgTF8Q 提取码: rk4p
## 2，Vagrant 统一开发环境
Vagrant 是一个用于创建和部署虚拟化开发环境的工具，其依赖于 VirtualBox 虚拟机，致力于帮助开发者快速构建一个环境统一的虚拟系统。Vagrant 最强大的地方是在于它在构建虚拟系统时的快捷简便，使开发者可以在短短几分钟内完成一个虚拟系统的删除与构建。

https://developer.hashicorp.com/vagrant/install?product_intent=vagrant

链接: https://pan.baidu.com/s/15nYWNHuHHYEWoVGwFgTF8Q 提取码: rk4p
## 3，homestead
Homestead 包含了两个东西：
- Homestead 管理脚本；

- Homestead Box 虚拟机盒子。

### Homestead 管理脚本
[Homestead](https://github.com/laravel/homestead) 脚本使用 Ruby 和 Shell 脚本编写而成。原理是对 Vagrantfile 文件做定制。

https://portal.cloud.hashicorp.com/vagrant/discover/laravel/homestead
### Homestead Box 虚拟机盒子
homestead.box 虚拟机盒子是提前打包好的 Vagrant Box 虚拟机盒子，里面预装了 Nginx Web 服务器、PHP 7、MySQL、Postgres、Redis、Memcached、Node，以及所有你在使用 Laravel 开发时所需要用到的各种软件。
### 定制版本的虚拟机盒子
1. 下载和导入 Homestead Box 虚拟机盒子；

附：百度盘下载链接: https://pan.baidu.com/s/1LCiwc9ZP9kKdEyMUSabugg 提取码: idk9

此目录下包含两个文件：
- virtualbox.box（教程定制化过的 Homestead 盒子）

- metadata.json（盒子的导入配置文件）

1. 安装 Git ，为下载 Homestead 管理脚本做准备；

1. 使用 Git 下载 Homestead 管理脚本；

定制版有以下优势：
- 从国内 coding.net 网站下载，下载速度会比 [官方](https://github.com/laravel/homestead) 更快；

- 对脚本进行修改，移除了每一次 `provision` 时 `composer self-update` 的卡顿。

- 

添加虚拟机基础镜像（Box）的命令

vagrant box add 命令

1，下载或复制 Box 文件 ：
- 如果指定了远程 URL 或 Vagrant Cloud 上的 Box 名称，Vagrant 会从远程服务器下载 Box 文件

- 如果指定了本地文件路径，Vagrant 会复制该文件

- 验证 Box 完整性 ：

2，检查 Box 文件的完整性，确保下载或复制过程中没有损坏
- 验证 Box 的格式是否符合 Vagrant 的要求

3 添加到 Box 仓库 ：
- 将 Box 添加到 Vagrant 的本地 Box 仓库中

- 在 Windows 系统中，Box 仓库通常位于 C:\Users\用户名\.vagrant.d\boxes 目录

4，创建元数据 ：
- 为 Box 创建元数据，包括名称、版本、提供商等信息

- 这些元数据用于后续的 Box 管理和虚拟机创建

```power
vagrant box add metadata.json
vagrant box list

git clone https://gitee.com/summerblue/homestead.git Homestead
git clone https://github.com/laravel/homestead.git Homestead

cd Homestead
git checkout v13.2.1 #将当前的工作目录切换到标签为 "v13.2.1" 的版本。

init.bat
```
#init.bat生成3个文件 
- Homestead.yaml - 主要配置信息文件，我们可以在此文件中配置 Homestead 的站点和数据库等信息；

- after.sh - 每一次 Homestead 盒子重置后（provision）会调用的 shell 脚本文件；

- aliases - 每一次 Homestead 盒子重置后（provision），会被替换至虚拟机的 ~/.bash_aliases 文件中，aliases 里可以放一些快捷命令的定义。

```power
explorer . #用文件夹打开当前命令行所在目录：
code . ~/Homestead/Homestead.yaml #运行下面命令快速打开 Homestead.yaml 文件
```
```power
ssh-keygen -t rsa -C "1064041207@qq.com"
```
### 运行 Vagrant
完成了 Homestead 的配置，接下来我们要开始启动虚拟机了。



在命令中输入 vagrant，能看到 Vagrant 为我们提供了一些便利的命令行，下面简单介绍一下 Vagrant 常用的一些命令行的使用：

vagrant init        初始化 vagrant

vagrant up        启动 vagrant

vagrant halt        关闭 vagrant

vagrant ssh        通过 SSH 登录 vagrant（需要先启动 vagrant）

vagrant provision        重新应用更改 vagrant 配置

vagrant destroy        删除 vagrant

第一次启动时，Vagrant 会做以下这几件事情：
- 以导入的 Homestead 虚拟机盒子为模板，新建一台虚拟机；

- 并按照 Homestead.yaml 里的配置信息，对这台新建的虚拟机进行配置；配置完成后启动虚拟机。

```power
#其他命令
vagrant status #检查虚拟机是否正在运行：
vagrant ssh-config     #重新初始化 SSH 配置
vagrant ssh -- -v #使用详细模式尝试连接
vagrant reload #尝试重新加载虚拟机
vagrant reload --provision #尝试重新加载虚拟机，并执行所有的配置脚本
```
```undefined
## vagrant reload
vagrant reload 命令会重启虚拟机并重新加载 Vagrantfile 的配置，但不会重新执行配置脚本。这意味着：

- 虚拟机会关闭并重新启动
- 会应用 Vagrantfile 中的新配置（如内存、CPU 设置等）
- 不会重新执行配置脚本（如安装软件、复制文件等）
这个命令适用于您只修改了虚拟机的基本配置（如网络设置、资源分配等）的情况。

## vagrant reload --provision
vagrant reload --provision 命令不仅会重启虚拟机并重新加载配置，还会重新执行所有的配置脚本。这意味着：

- 虚拟机会关闭并重新启动
- 会应用 Vagrantfile 中的新配置
- 会重新执行所有配置脚本，包括：
  - 复制 SSH 密钥
  - 设置共享文件夹
  - 安装软件包
  - 配置服务等
```
# homestead.rb 文件的作用与创建多个虚拟机的配置方法
homestead.rb 文件是 Laravel Homestead 的核心配置脚本，它定义了 Homestead 类，负责根据 Homestead.yaml 或 Homestead.json 文件中的设置来配置 Vagrant 虚拟机。这个文件主要功能包括：
1. 设置虚拟机的基本属性（名称、内存、CPU等）

1. 配置网络设置（IP地址、端口转发等）

1. 设置共享文件夹

1. 配置数据库

1. 设置网站和域名

1. 安装和配置各种功能和服务

## 虚拟机网络
```power
vagrant ssh -c "ip addr show"
```
Homestead 虚拟机有多个网络接口：
- eth1 接口的 IP 是 192.168.56.58

- docker0 接口的 IP 是 172.17.0.1

