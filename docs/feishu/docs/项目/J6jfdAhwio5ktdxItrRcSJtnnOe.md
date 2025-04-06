---
title: xiaomimusic
urlname: J6jfdAhwio5ktdxItrRcSJtnnOe
date: '2025-03-26 16:43:14'
updated: '2025-03-28 12:51:25'
---
## 1,Uvicorn running on http://['0.0.0.0', '::']:8990是什么意思
这个消息表示 Uvicorn（一个 ASGI web 服务器）正在运行，并且：
- 0.0.0.0 表示服务器监听所有可用的网络接口（而不是仅限于 localhost）

- :: 是 IPv6 的写法，同样表示监听所有接口

- :8990 是监听的端口号

虽然在配置文件中设置了端口 8992，但程序似乎没有正确读取配置

2,
```bash
cd /f/project_space/xiaomusic
bash install_dependencies.sh
pdm run xiaomusic.py --config ./config.json
```
##  2,开发环境运行
- 使用 install_dependencies.sh 下载依赖

- 使用 pdm 安装环境

- 默认监听了端口 8090 , 使用其他端口自行修改。

```bash
cd /f/project_space/xiaomusic
bash install_dependencies.sh
pdm run xiaomusic.py --config "./config.json"
```
```bash
使用 pip 安装 xiaomusic 【0.1.83版本才支持 pip 安装】
pip install xiaomusic
xiaomusic --config ./config.json
```
在 Trae 中按 Ctrl+Shift+P ，输入 "Python: Select Interpreter"，选择 music_env 环境。

重新加载 Trae 窗口（Ctrl+Shift+P，输入 "Reload Window"）
