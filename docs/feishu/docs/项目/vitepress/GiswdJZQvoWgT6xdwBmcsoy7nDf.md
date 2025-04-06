---
title: vitepressBUG集
urlname: GiswdJZQvoWgT6xdwBmcsoy7nDf
date: '2025-03-18 20:26:48'
updated: '2025-04-05 13:05:43'
---

## 1,

### 2,vitepress 打包遇到windows为undefiend的问题
ddd
### 3,如果你写md表格里面有特殊字符,比如 {}_ \等 需要使用转义符转移,否则会报错

### 4,在 VitePress 项目中，实际运行时的工作目录是在 docs 目录下，
所以相对路径的起点是 f:\project_space\jxdocs\docs 。这就是为什么找不到文件的原因。

require 在 Node.js 中只能访问项目目录内的文件，不能访问项目根目录以外的文件
### 5，VitePress 的配置文件（config.mts）是在构建过程中由 Node.js 直接执行的，而不是在运行时执行。
VitePress 的配置文件是在 Node.js 环境下预加载的，而且 pnpm 会创建一个新的进程来运行 VitePress，

这就导致配置文件中的日志不会显示在主进程的控制台中。
