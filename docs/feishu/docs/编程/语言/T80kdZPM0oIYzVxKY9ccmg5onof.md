---
title: Javascript
urlname: T80kdZPM0oIYzVxKY9ccmg5onof
date: '2025-04-05 12:29:31'
updated: '2025-04-06 12:54:11'
---
# 一，JS语法
## 1，解构赋值语法
解构赋值 是 JavaScript 的语言特性，ECMAScript 6 (ES6) 引入的，所有现代 JavaScript 环境都支持，包括 Node.js。
```typescript
const { packageJson: targetJson, rootPath } = packageInfo
```
具体含义是：
1. 从 packageInfo 对象中获取 packageJson 属性，并将其赋值给一个名为 targetJson 的新变量

1. 从 packageInfo 对象中获取 rootPath 属性，并保持原名赋值给一个新变量

这种写法等同于：
```typescript
const targetJson = packageInfo.packageJson;
const rootPath = packageInfo.rootPath;
```
```typescript
function buildPackage({ dep, outDir, heading = '' }) {
  // 函数体
}
```
## 2，Reflect.has
eflect.has 是 JavaScript 中 Reflect API 的一个方法，用于检查一个对象是否拥有某个属性。
```typescript
return Reflect.has(pkg, 'miniprogram') && typeof pkg.miniprogram === 'string'

它的作用是检查 pkg 对象是否有 miniprogram 属性，并且这个属性的值是字符串类型。

这个方法相当于使用 in 运算符，但更加函数式和明确。等价于：
return 'miniprogram' in pkg && typeof pkg.miniprogram === 'string'
```
## 3，path.resolve
path.resolve(outDir, dep) 是 Node.js 中 path 模块的一个方法调用，用于将多个路径片段解析为一个绝对路径。

这行代码的作用是创建一个新的路径，将依赖包放在输出目录下的对应子目录中。
```typescript
如果 outDir 是 f:/project_space/weapp-vite/apps/weapp-wechat-zhihu/dist/miniprogram_npm ，而 dep 是 tdesign-miniprogram ，那么 destOutDir 的值将会是：
f:/project_space/weapp-vite/apps/weapp-wechat-zhihu/dist/miniprogram_npm/tdesign-miniprogram
```
## 4，=> 箭头函数
=> 是 JavaScript/TypeScript 中的箭头函数（Arrow Function）语法

箭头函数是 ES6 引入的一种简洁的函数表达式语法，它允许你用更简短的方式定义函数。
```typescript
isCustomElement: (tag) => customElements.includes(tag)
```
等同于传统的函数表达式写法：
```typescript
isCustomElement: function(tag) {
  return customElements.includes(tag);
}
```
## 5，CommonJS 的 require()
动态导入模块。

ES 模块的 import 是静态的，如果在ES6中需要使用了 ES 模块语法（使用 import 和 export ），则需要createRequire，比如使用：require.resolve；md.use(require("markdown-it-task-lists"));
```undefined
import { createRequire } from "module";

//代码使用 createRequire 创建了一个基于当前模块 URL 的 require 函数，
const require = createRequire(import.meta.url);
```
## 6，日志输出
process.stdout.write() 和 console.log() 的主要区别：
1. 换行符处理 ：
	- console.log() 会自动在输出末尾添加换行符
		- process.stdout.write() 不会自动添加换行符，需要手动添加 \n
	
1. 格式化能力 ：
	- console.log() 支持格式化占位符（如 %s , %d , %j ）和多参数
		- process.stdout.write() 只接受单个字符串参数，不支持格式化
	
1. 底层实现 ：
	- console.log() 实际上是对 process.stdout.write() 的封装，增加了格式化和自动换行功能
		- process.stdout.write() 是更底层的 API，直接写入标准输出流
	
1. 返回值 ：
	- console.log() 返回 undefined
		- process.stdout.write() 返回一个布尔值，表示写入是否成功
	
1. 性能 ：
	- 在需要高性能输出大量日志时， process.stdout.write() 可能略快一些，因为它少了一层封装
	
在你的代码中， forceLog 函数使用 process.stdout.write() 是为了确保日志能够立即输出，不受 Node.js 事件循环的影响，适合用于调试关键流程。
