---
title: Create React App
urlname: Z0cTdhNyloxxJ3x8QSdcxfsUnWe
date: '2025-03-28 23:22:29'
updated: '2025-03-28 23:40:26'
---
Create React App (CRA) 是一个官方支持的用于创建单页 React 应用程序的工具。
## 1，创建一个新的React项目
```bash
npx create-react-app my-app
```
## 2，代码结构
使用Create React App创建的项目具有以下典型的代码结构：
```plaintext
my-app/
├── node_modules/          # 项目依赖包
├── public/                # 静态资源文件夹
│   ├── index.html         # 主HTML文件
│   ├── favicon.ico        # 网站图标
│   ├── manifest.json      # PWA配置文件
│   └── robots.txt         # 搜索引擎爬虫配置文件
├── src/                   # 源代码文件夹
│   ├── App.css            # 主组件样式
│   ├── App.js             # 主组件
│   ├── App.test.js        # 主组件测试文件
│   ├── index.css          # 全局样式
│   ├── index.js           # 应用入口文件
│   ├── logo.svg           # React logo
│   ├── reportWebVitals.js # 性能监测工具
│   └── setupTests.js      # 测试配置
├── .gitignore             # Git忽略文件配置
├── package.json           # 项目配置和依赖管理
├── package-lock.json      # 依赖版本锁定文件
└── README.md              # 项目说明文件
```
主要文件说明：
1. public/index.html ：应用的HTML模板文件，React组件会渲染到其中的 <div id="root"></div> 中。

1. src/index.js ：应用的入口文件，负责渲染根组件到DOM中。

1. src/App.js ：默认的主组件，通常从这里开始编写你的React组件。

1. src/App.css ：主组件的样式文件。

1. src/index.css ：全局样式文件。

1. package.json ：包含项目依赖和脚本配置。

1. .gitignore ：指定Git版本控制中需要忽略的文件和文件夹。

这个结构是CRA创建项目时的默认结构，你可以根据项目需求进行调整和扩展。例如，可以创建 components/ 文件夹来存放组件， pages/ 文件夹来存放页面组件等。
## 7，Webpack
无需手动配置 Webpack 就可以开始开发 React 应用。以下是 CRA 处理 Webpack 配置的一些关键点：
1. 开箱即用的配置 ：
	- CRA 提供了合理的默认 Webpack 配置
		- 支持 Babel、ESLint、CSS 处理等常见功能
		- 已经配置好了开发和生产环境的构建
	
1. 隐藏配置 ：
	- Webpack 配置被抽象在 react-scripts 包中
		- 开发者通常不需要直接接触 Webpack 配置
	
1. 自定义配置 ：
	- 如果需要自定义 Webpack 配置，可以通过以下方式：
		a. 使用 react-app-rewired 覆盖配置	b. 运行 npm run eject 暴露所有配置（不可逆操作）
1. 内置功能 ：
	- 支持 CSS Modules
		- 自动处理图片、字体等静态资源
		- 支持代码分割和懒加载
		- 提供开发服务器和热模块替换
	
1. 优化 ：
	- 生产环境自动优化构建
		- 支持 Tree Shaking
		- 自动压缩代码
	

## 8，将React应用打包成Windows程序
Electron：是一个框架，用于使用 Web 技术（HTML、CSS、JavaScript）构建跨平台桌面应用程序

要将React应用打包成Windows程序，可以使用Electron框架。

以下是具体步骤：
1. 安装依赖 ：

在你的React项目目录中运行：
1. 创建主进程文件 ：

在项目根目录下创建 electron.js 文件：
1. 修改package.json ：

```json
{
  // ... existing config ...
  "main": "electron.js",
  "scripts": {
    // ... existing scripts ...
    "electron:start": "electron .",
    "electron:build": "npm run build && electron-builder"
  },
  "build": {
    "appId": "com.example.myapp",
    "productName": "MyApp",
    "win": {
      "target": "nsis"
    }
  }
}
```
1. 运行和打包 ：
	- 开发模式：
		```bash
		npm start & npm run electron:start
		```	- 打包为Windows安装程序：
		```bash
		npm run electron:build
		```	- 安装程序位置 ：
	
1. 安装程序位置 ：

打包完成后，安装程序会生成在 dist 目录下，文件名为 MyApp Setup x.x.x.exe 。

注意：打包前请确保已经运行过 npm run build 来生成生产环境的React应用。打包过程可能会需要一些时间，请耐心等待。
