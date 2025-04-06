---
title: 编程必学
urlname: TqlUd2VXoouuvNxjTFJcInAYnsd
date: '2025-03-21 13:11:44'
updated: '2025-04-05 11:01:09'
---
## 一，编程语言
## 1，前端
![image](/feishu/asset/images/REQ7bMAsKoaCxGxi4UmcW9ARnxM.png)
## 2，后端
![image](/feishu/asset/images/PQz6bqBeeojLZSxzRJecTLisnhc.png)
## 3，全栈
![image](/feishu/asset/images/KIX3bD3U1oudONxcPgjck472nqh.png)
## 4，其他
![image](/feishu/asset/images/Cus3bxN0Ho377Bx5fzxcKcWfn9S.png)
![image](/feishu/asset/images/RcwobHsUioEC0kxJGaace6IZnWh.png)
![image](/feishu/asset/images/DRD2b69ARoXiLpxQZPPcLPTsnyo.png)
![image](/feishu/asset/images/LVUmbjK60oWhONxDjAOcU1UfnPq.png)
![image](/feishu/asset/images/CrUUbjOvIoWHlNxMMa6c2YrDnXc.png)
Gradio是一个Python库，用于快速创建机器学习模型的Web界面。它允许开发者轻松构建交互式的演示界面，可以通过浏览器访问和测试模型。在开发过程中，Gradio特别适合用于快速原型设计、模型演示和分享，以及创建简单的API接口。它支持多种输入类型（如文本、图像、音频等）和输出类型，使得机器学习模型的展示和测试变得更加直观和便捷。
## 二,
## 三，vue和node区别
Vue和Node.js是两个不同用途的技术：

Vue是前端框架，用于构建用户界面，提供了响应式数据绑定、组件化开发等特性；

Node.js是服务器端JavaScript运行环境，用于构建后端服务，提供了文件系统、网络通信等服务器端功能。

Vue主要运行在浏览器中处理用户交互，而Node.js运行在服务器上处理后端业务逻辑和数据存储。



Vue和Node.js的融合通常有两种方式：

1. 前后端分离模式，Vue负责前端界面，Node.js提供API接口服务，两者通过HTTP通信；

2. 同构应用模式，Vue和Node.js运行在同一个项目中，实现服务端渲染(SSR)。前后端分离更适合大型应用，维护性好；同构应用则能提供更好的首屏加载性能和SEO支持。

选择哪种方式主要取决于项目需求、团队技术栈和性能要求。
## 四，后端node框架
FastAPI 是一个现代、快速（高性能）的 Python Web 框架，用于构建 API 接口.Node.js 的类似框架是：



Express.js
- 最流行的 Node.js Web 框架

- 简单易用，生态丰富

- 中间件系统灵活

```javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});
```
NestJS
- 类似 Angular 的架构
- 支持 TypeScript
- 内置依赖注入
- 模块化设计
```typescript
@Controller('api')
export class UsersController {
  @Get()
  findAll() {
    return { users: [] };
  }
}
```
Fastify
- 高性能框架

- 低内存占用

- 支持 TypeScript

- 类似 FastAPI 的开发体验



Koa.js
- Express 团队开发

- 更现代的中间件系统

- 更好的异步支持

