---
title: 系统操作常识
urlname: FbxadQCE3oTS3FxbQUwcuH5rnvc
date: '2025-03-28 10:13:26'
updated: '2025-04-02 11:38:41'
---
## 1，Linux/Unix
- 在 Linux/Unix 系统中： ~/homeassistant 指向 /home/用户名/homeassistant

- sudo apt update 是一个用于更新 Ubuntu/Debian 系统软件包列表的命令。它并不会安装任何软件，只是更新系统对可用软件包及其版本的信息

## 2，windows
## 

## 3, PIP
pip 默认使用的服务器是 Python 官方的 PyPI（Python Package Index）仓库，位于：

官方地址 ： https://pypi.org/

镜像地址 ：
1. 阿里云： https://mirrors.aliyun.com/pypi/simple/

1. 清华大学： https://pypi.tuna.tsinghua.edu.cn/simple/

1. 豆瓣： https://pypi.douban.com/simple/

你可以通过以下命令查看当前配置的源：
```bash
pip config list
```
如果要切换到国内镜像源，可以使用：
```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```
升级 pip 的命令如下：
```bash
python -m pip install --upgrade pip
或pip install --upgrade pip
```
注意事项：

- 如果使用虚拟环境，请先激活虚拟环境再执行

- 可能需要管理员权限，可以在命令前加上 sudo （Linux/Mac）或以管理员身份运行命令提示符（Windows）

- 升级后可以通过 pip --version 查看当前版本确认是否成功
```yaml

pip list | grep miservice #查询
pip uninstall -y miservice #删除
pip show miservice  # 查看依赖列表
```
### 安装包两种方法：
pip install git+https://github.com/boto/botocore 这个命令是用来从GitHub仓库直接安装Python的 botocore 库的开发版本。

pip install botocore 安装PyPI上的稳定版
### 显示进度条：
在WSL2（Windows Subsystem for Linux 2）环境下，你可以通过以下方式让pip安装时显示进度条：
1. 使用 --progress-bar 参数 ：

在pip命令后添加 --progress-bar 参数即可显示进度条：
1. 修改pip配置文件 （永久生效）：

在用户目录下创建或编辑 .pip/pip.conf 文件，添加以下内容：
1. 使用 tqdm 库 ：

如果你想要更美观的进度条，可以安装 tqdm 库，然后使用以下命令：
1. 使用 pip 的 -v 参数 ：

虽然这不是进度条，但可以显示更详细的安装过程：

在WSL2下，推荐使用第一种方法，因为它最简单且不需要额外安装任何工具。如果你经常使用pip，第二种方法可以让你每次安装都自动显示进度条。
## 4，requirements.txt 
可以通过以下几种方式生成：
1. 使用 pip freeze 命令（最常用的方法）：

```bash
pip freeze > requirements.txt
```
这个命令会将当前 Python 环境中安装的所有包及其版本写入 requirements.txt 文件。
1. 如果使用虚拟环境，确保先激活虚拟环境：

```bash
# 先激活虚拟环境
.venv\Scripts\activate
# 然后执行
pip freeze > requirements.txt
```
1. 如果只想导出项目实际使用的依赖（推荐方式）：

```bash
pip install pipreqs
pipreqs .
```
pipreqs 会分析你的项目代码，只导出实际使用到的包。

注意事项：
1. pip freeze 会导出所有包，包括间接依赖

1. pipreqs 只导出直接依赖，更清晰

1. 生成后建议检查文件内容，确保版本号正确

1. 对于从 GitHub 安装的包，需要手动添加到文件中

1. 建议使用 >= 符号指定最低版本要求，而不是固定版本

在你的 Home Assistant 项目中，由于有些包是通过 conda 安装的，可能需要手动编辑生成的 requirements.txt 确保所有依赖都正确列出。
## 5，依赖
- 运行时依赖：程序运行时需要的包

- 构建时依赖：构建包时需要的包

setup.py 文件在 Python 包中起到非常重要的作用，它是 Python 包的构建和安装脚本。主要功能包括：
1. 定义包的元数据 ：包括包名、版本号、作者、许可证、描述等信息。

1. 声明依赖关系 ：指定包运行时需要的其他 Python 包（install_requires）和构建时需要的依赖（setup_requires）。

1. 配置包的结构 ：定义哪些文件应该被包含在分发包中。

1. 提供安装指令 ：当用户运行 pip install 命令时，pip 会执行 setup.py 中的指令来安装包。

1. 定义入口点 ：可以定义命令行工具或其他入口点。

典型的"构建时依赖"问题：

  miservice 包的 setup.py 文件可能没有正确声明其构建时依赖（setup_requires），导致在构建过程中找不到 aiohttp 模块。正确的做法应该是在 setup.py 中声明 aiohttp 为构建时依赖，这样在构建环境中就会先安装 aiohttp，然后再进行构建。

这就会导致即使其他manifest.json里写了：
"requirements": [

    "setuptools>=42.0.0",

    "wheel>=0.33.0",

    "build>=0.7.0",

    "aiohttp>=3.11.13",

    "aiofiles>=24.1.0",

    "miservice==2.2.0"

  ],

在构建 miservice 包的过程中，构建环境无法访问已安装的 aiohttp 模块。虽然您已经在系统中安装了 aiohttp ，但在构建过程中，Home Assistant创建了一个隔离的构建环境，这个环境中没有 aiohttp 。aiohttp 即使先安装，也是在一个单独的构建环境中。Python的构建系统（setuptools）默认使用隔离的构建环境
## 6，证书
### 验证当前证书信息

```toml
#在 Windows 上运行以下命令查看现有证书：
openssl s_client -connect jxdocs.jwisdom.fun:443 | openssl x509 -noout -text

#验证 DNS 配置 ：
nslookup jxdocs.jwisdom.fun
或者：dig jxdocs.jwisdom.fun
```

