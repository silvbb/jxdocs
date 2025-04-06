---
title: PDM
urlname: RjIEdtQMtoyKpkxHfETcmvQBnFw
date: '2025-03-26 13:39:59'
updated: '2025-03-30 21:05:01'
---
中文文档：https://vite.icebreaker.top/guide/
## 1，pdm和pnpm npm npx区别
1. NPM (Node Package Manager)
	- Node.js 的默认包管理器
		- 用于安装和管理依赖包
		- 命令示例： npm install lodash
	
1. NPX
	- NPM 的包执行工具
		- 可以直接执行 npm 包而不需要全局安装
		- 适合一次性使用的命令行工具
		- 命令示例： npx create-react-app my-app
	
1. PNPM (Performant NPM)
	- 更现代的包管理器
		- 使用硬链接节省磁盘空间
		- 安装速度更快
		- 更严格的依赖管理
		- 命令示例： pnpm install
		- 你项目中使用的就是这个：
		```bash
	pnpm install
	pnpm dev
	```
1. PDM (Python Development Master)
	- 主要用于 Python 项目
		- 支持 PEP 582
		- 可以同时管理 Python 和 Node.js 依赖
		- 命令示例： pdm install
	
## 2，安装
PDM 需要安装 Python 3.9+
```yaml
powershell -ExecutionPolicy ByPass -c "irm https://pdm-project.org/install-pdm.py | python -"
#安装程序会将 PDM 安装到用户家目录中 %APPDATA%\Python\Scripts Windows 系统

python3 --version
pip3 --version
pip3 install --user pdm 或者：pip3 install pdm
```
卸载：powershell -ExecutionPolicy ByPass -c "irm https://pdm-project.org/install-pdm.py | python - --remove"
```bash
# 创建一个目录来存储补全脚本。
mkdir $PROFILE\..\Completions
echo @'
Get-ChildItem "$PROFILE\..\Completions\" | ForEach-Object {
    . $_.FullName
}
'@ | Out-File -Append -Encoding utf8 $PROFILE
# 生成脚本
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
pdm completion powershell | Out-File -Encoding utf8 $PROFILE\..\Completions\pdm_completion.ps1
```
## 3，创建项目 pdm init
```bash
mkdir my-project && cd my-project
pdm init
```
pdm init 会生成以下主要文件：
1. pyproject.toml
	- 项目的主要配置文件
		- 包含项目元数据（名称、版本等）
		- 依赖管理配置
		- 构建系统设置
	
1. pdm.lock
	- 依赖版本锁定文件
		- 记录所有包的精确版本
		- 确保开发环境的一致性
	
1. .pdm-python
	- 记录项目使用的 Python 解释器路径
		- 通常是隐藏文件
	
1. .gitignore （如果项目还没有的话）
	- 包含常见的 Python 项目忽略规则
		- 如 **pycache** 、 *.pyc 等
	
## 4，PDM install 
会根据项目中的依赖配置文件（通常是 pyproject.toml 或 pdm.lock ）安装以下内容：
1. 项目依赖
	- 直接依赖：在配置文件中明确声明的包
		- 间接依赖：直接依赖所需要的其他包
		- 开发依赖：仅在开发时需要的包
	
1. 虚拟环境
	- 创建独立的 Python 虚拟环境
		- 安装指定版本的 Python 解释器
		- 配置环境变量
	
1. 锁定文件
	- 生成或更新 pdm.lock 文件
		- 记录所有包的精确版本
		- 确保依赖版本的一致性
	
1. 项目配置
	- 读取并应用 pyproject.toml 中的配置
		- 设置项目的元数据
		- 配置开发工具
		当执行 pdm install 后，还会生成：	      **pypackages**/ 目录
## 5，选择 Python 解释器
使用 `pdm python install --list` 查看所有可用的 Python 版本。

列出当前安装的 Python 解释器：pdm python list

查看当前 PDM 使用的 Python 环境：pdm info

删除已安装的 Python 解释器：pdm python remove 3.9.8

安装一个无 GIL 锁的 Python 解释器：pdm python install 3.13t

pyproject.toml 文件中查看 PDM 的配置信息，包括 Python 路径等。





使用由 `conda` 创建的环境，请注意，在运行 `pdm sync --clean` 或 `pdm remove` 时，PDM 将 _删除_ 未在 `pyproject.toml` 或 `pdm.lock` 中列出的依赖项。这可能会导致破坏性后果。因此，尽量不要在多个项目之间共享环境。
## 6，虚拟环境
  解释器路径将被存储在 `.pdm-python` 文件中，并在后续命令中使用。您还可以稍后使用 [pdm use](https://pdm-project.org/zh-cn/latest/reference/cli/#use)命令更改它。

或者，您可以通过 `PDM_PYTHON`环境变量指定 Python 解释器路径。设置后，保存的 `.pdm-python` 路径将被忽略。
```bash
pdm use E:/ProgramData/Anaconda3/envs/music_env/python.exe
pdm use /home/jwisdom/ha_env/bin/python
```
## 7，从模板创建项目
- `pdm init django` - 从模板 `https://github.com/pdm-project/template-django` 初始化项目

- `pdm init ``https://github.com/frostming/pdm-template-django` - 从 Git URL 初始化项目。可以接受 HTTPS 和 SSH URL。

- `pdm init django@v2` - 检出特定的分支或标签。完整的 Git URL 也支持这样做。

- `pdm init /path/to/template` - 从本地文件系统上的模板目录初始化项目。

- `pdm init minimal` - 使用内置的 "最小" 模板初始化，只生成一个 `pyproject.toml`.

## 8，trae的python环境插件
1. Python 插件

- 提供基础的 Python 语言支持

- 代码高亮显示

- 基本的语法检查

- 调试支持

- 集成终端中的 Python 环境管理

- 代码片段支持

1. Pylance 插件

- 智能代码补全

- 实时语法错误检查

- 类型信息提示

- 函数签名提示

- 代码导航（跳转到定义、查找引用等）

- 代码重构工具

- 性能比 Python 插件自带的语言服务器更好

1. Python Type Checker

- 专注于类型检查功能

- 支持 mypy、pyright 等类型检查器

- 在编写代码时实时显示类型错误

- 帮助发现潜在的类型相关 bug

- 提供类型相关的建议

实际使用中，只需要安装 Python 和 Pylance 这两个插件就够了，因为 Pylance 已经包含了很好的类型检查功能。Python Type Checker 是可选的，如果你特别需要更严格的类型检查才需要安装。
## 9,  配置 PDM
如果没有 requirements.txt，你可以按照以下步骤配置 PDM：
1. 安装 PDM：

```bash
pip install pdm
```
1. 初始化项目：

```bash
cd /home/filiron/.homeassistant
pdm init
```
这会引导你设置：
- Python 版本

- 项目名称

- 版本

- 描述

- 作者等信息

1. 直接添加需要的依赖：

```bash
# 添加主要依赖
pdm add homeassistant

# 添加其他常用依赖
pdm add aiohttp requests PyYAML

# 添加开发依赖
pdm add -d pytest
```
1. 如果你知道项目的核心依赖，可以一次性添加多个：

```bash
pdm add homeassistant aiohttp requests PyYAML
```
1. 让 PDM 自动检测项目依赖：

```bash
pdm init --python ">=3.11"
```
其他有用的命令：
```bash
# 查看当前依赖
pdm list

# 更新所有依赖
pdm update

# 同步项目依赖
pdm sync
```
建议：
1. 先添加核心依赖

1. 运行项目，看缺少什么依赖再添加

1. 使用 pdm.lock 确保依赖版本一致

1. 将 pyproject.toml 和 pdm.lock 加入版本控制

这样可以逐步构建你的依赖管理系统，而不需要事先准备 requirements.txt
## 10,运行项目
有两种方式：
1. 使用 pdm run：

```bash
pdm run python -m homeassistant --open-ui
```
或者
1. 在 pyproject.toml 中添加脚本命令，让运行更简便：

```toml
[tool.pdm.scripts]
start = "python -m homeassistant --open-ui"
```
然后就可以直接使用：
```bash
pdm run start
```
使用 pdm run 的好处是：
1. 确保使用正确的 Python 环境

1. 自动处理依赖路径

1. 保证环境变量的正确设置

1. 避免依赖冲突

建议使用第二种方式，通过配置脚本命令，这样可以：
1. 命令更简短

1. 更容易记忆

1. 可以添加更多自定义命令

## 11，导入依赖
对于包含多个模块的项目

1. pdm scan-deps --no-import

- 用于扫描项目中的依赖关系

- 通过静态分析代码找出导入的包

- 不会实际执行代码

- 只是分析并显示依赖，不会修改 pyproject.toml

- 适合用来查看项目依赖情况

2. pdm update --unconstrained

- 更新项目的依赖包

- 忽略版本约束，安装最新版本

- 会实际修改和安装依赖

- 会更新 pyproject.toml 和 pdm.lock

- 适合用来更新和安装依赖

使用建议：
1. 先用 pdm scan-deps --no-import 检查项目依赖

1. 确认依赖无误后，使用 pdm update --unconstrained 安装依赖

```yaml
# 只安装基本依赖（不包括homeassistant）
pdm update

# 只安装miservice
pdm update miservice

# 只有需要时才安装homeassistant
pdm install -G ha
```
## 12，更换源
```bash
pdm config pypi.url https://mirrors.aliyun.com/pypi/simple/
pdm config pypi.url https://pypi.tuna.tsinghua.edu.cn/simple/
#使用缓存
pdm config cache.enable true
#查看当前配置的 PyPI 源
pdm config pypi.url
#查看所有配置
pdm config
```
## 13，pdm和pip区别
直接使用 pip3 install 通常比PDM快很多。这是因为PDM和pip在依赖解析方面有很大不同：
1. 依赖解析算法 ：PDM使用更复杂的PEP 517/518兼容的依赖解析器，它会尝试找到所有依赖的最佳兼容版本组合。而pip的依赖解析相对简单，通常只是按顺序安装包。

1. 锁文件机制 ：PDM会生成和维护锁文件(pdm.lock)，确保环境的可重现性，这需要额外的计算。

1. 虚拟环境管理 ：PDM会管理自己的虚拟环境，这增加了一些开销。

如果您只关心快速安装几个包，可以考虑以下方案：


1. 对于简单的依赖，直接使用pip：

```bash
pip3 install aiohttp aiofiles miservice
```
2. 如果您仍然想使用PDM但希望加快速度，可以尝试：
```bash
pdm add -G direct aiohttp aiofiles miservice --no-sync
pdm sync -G direct
```
3. 修改pyproject.toml，添加一个专门用于直接依赖的组：
```toml
[tool.pdm.dev-dependencies]
ha = [
    "homeassistant>=2025.3.4",
]
direct = [
    "aiohttp==3.11.13",
    "aiofiles==24.1.0",
    "miservice==2.2.0"
]
```
然后使用：
```bash
pdm sync -G direct
有些包需要使用 --no-isolation 参数来禁用构建隔离：
pdm sync -G direct --no-isolation
```
PDM的优势在于管理复杂项目的依赖关系，确保环境的可重现性。如果您只需要快速安装几个包，pip确实是更直接的选择。
