---
title: 微信小程序
urlname: OdcbdQOpio8hm4x7WphcQCJZnOb
date: '2025-03-26 22:30:52'
updated: '2025-03-26 22:38:49'
---
## 1，微信小程序结构：
```plaintext
f:\project_space\card-mini\
├── miniprogram/               # 小程序源码目录
│   ├── pages/                # 页面文件夹
│   │   ├── index/           # 首页
│   │   │   ├── index.js     # 页面逻辑
│   │   │   ├── index.json   # 页面配置
│   │   │   ├── index.wxml   # 页面结构
│   │   │   └── index.wxss   # 页面样式
│   ├── components/          # 自定义组件
│   ├── images/             # 图片资源
│   ├── utils/              # 工具类文件
│   ├── app.js             # 小程序入口文件
│   ├── app.json           # 小程序全局配置
│   └── app.wxss           # 小程序全局样式
│
├── cloudfunctions/          # 云函数目录
│   ├── quickstartFunctions/  # 云函数
│   │   ├── index.js        # 云函数入口文件
│   │   └── package.json    # 云函数配置文件
│
├── project.config.json     # 项目配置文件
└── project.private.config.json  # 私有配置文件
```
project.config.json 项目的主配置文件 会提交到代码仓库
- 项目的主配置文件

- 会提交到代码仓库

- 包含团队共享的配置，如：

- 小程序 appid

- 项目基础配置

- 云函数根目录

- 编译配置

- 基础库版本

project.private.config.json 
- 个人私有配置文件

- 不建议提交到代码仓库（建议加入 .gitignore）

- 包含开发者个人的配置，如：

- 本地调试配置

- 个人开发时的页面配置

- 热重载设置

- 自定义编译条件

- 等个性化设置

## 2，微信小程序页面的基本结构
![image](/feishu/asset/images/RSF8bWEG1oIt8Ax9egmcGoc5njh.png)
1. index.js - 页面的逻辑层文件：
	- 处理页面的业务逻辑
		- 数据处理
		- 事件处理函数
	
1. index.json - 页面的配置文件：
	- 配置页面标题
		- 引入组件
		- 页面其他配置项
	
1. index.wxml - 页面的结构文件（相当于 HTML）：
	- 页面的布局结构
		- 组件使用
		- 数据绑定
	
1. index.wxss - 页面的样式文件（相当于 CSS）：
	- 页面的样式定义
		- 组件样式自定义
	
这四个文件缺一不可，是微信小程序的标准页面结构。
## 3，miniprogram_npm
miniprogram_npm 是微信小程序中用于存放 npm 包构建产物的目录。

在 `package.json` 中 `dependencies` 字段里注册的依赖，会在每次构建运行的时候，被打包工具打包成小程序可以接受的格式，然后输出到 `project.config.json` 里注册的 `miniprogramNpmDistDir` 目录的 `miniprogram_npm` 中去

当我们在小程序中使用 npm 包时，需要通过构建将这些包转换成小程序可以识别和使用的模块，这个过程会将 node_modules 中的依赖构建到 miniprogram_npm 目录下。

这样做的原因是：

1) 小程序不能直接使用 node_modules 中的包；

2) 需要将包中的代码转换为符合小程序规范的代码；

3) 优化包体积，只构建实际使用到的代码。



构建miniprogram_npm的一般步骤是：

1. 在小程序项目根目录执行npm install安装依赖包；

2. 在微信开发者工具中，点击顶部菜单栏的'工具' -> '构建npm'；

3. 构建完成后会在项目目录下生成miniprogram_npm目录，其中包含了转换后的npm包代码。

这个过程会将node_modules中的依赖包转换为小程序可用的模块，并进行代码优化和体积压缩。


