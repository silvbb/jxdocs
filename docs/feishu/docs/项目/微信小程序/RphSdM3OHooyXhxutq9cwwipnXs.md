---
title: 微信开发者工具
urlname: RphSdM3OHooyXhxutq9cwwipnXs
date: '2025-04-04 14:17:09'
updated: '2025-04-05 01:50:29'
---
## 1，微信小程序文件结构
```undefined
miniprogram/
├── app.js                 // 小程序逻辑
├── app.json               // 小程序公共配置
├── app.wxss               // 小程序公共样式表
├── project.config.json    // 项目配置文件
├── sitemap.json           // 小程序索引配置
│
├── pages/                 // 页面文件夹
│   ├── index/             // 首页
│   │   ├── index.js       // 页面逻辑
│   │   ├── index.json     // 页面配置
│   │   ├── index.wxml     // 页面结构
│   │   └── index.wxss     // 页面样式表
│   │
│   └── logs/              // 日志页面
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
│
├── components/            // 自定义组件
│   └── custom/
│       ├── custom.js
│       ├── custom.json
│       ├── custom.wxml
│       └── custom.wxss
│
├── utils/                 // 工具函数
│   └── util.js
│
└── assets/                // 静态资源
    └── images/
```
## 
