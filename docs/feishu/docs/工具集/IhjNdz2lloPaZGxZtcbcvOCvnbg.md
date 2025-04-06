---
title: Trae操作
urlname: IhjNdz2lloPaZGxZtcbcvOCvnbg
date: '2025-03-28 11:17:03'
updated: '2025-03-28 11:58:00'
---
## 1，指定 Python 解释器
在 VSCode (Trae) 中指定 Python 解释器的步骤：
1. 按 Ctrl + Shift + P 打开命令面板

1. 输入 Python: Select Interpreter 或者中文 Python: 选择解释器

1. 在下拉列表中你会看到：
	- 全局安装的 Python 版本
		- 虚拟环境中的 Python 版本
		- 可以点击 + Enter interpreter path 手动添加 Python 路径
	
对于 WSL 环境中的 Python：
- 会显示类似 Python 3.13.0 (WSL) 的选项

- 或者手动输入路径： \\wsl$\Ubuntu\usr\bin\python3.13

选择后，VSCode 的状态栏左下角会显示当前使用的 Python 版本。这个设置会保存在工作区或用户设置中。
## 2，使用vscode插件
https://marketplace.visualstudio.com/
```undefined
模板： 
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${itemName.fieldA}/vsextensions/${itemName.fieldB}/${version}/vspackage 
 
示例： 
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/denoland/vsextensions/vscode-deno/3.43.3/vspackage 
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/ms-vscode-remote/vsextensions/remote-wsl/0.88.5/vspackage 
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
```
