---
urlname: flowus-test
title: 前后端分离
updated: "2025-01-16 15:08:23"
date: "2024-04-01 08:00:00"
cover: "https://tc-cdn.flowus.cn/cover/photo14?time=1737092700&token=c49fc6d44d57d4599b745ff3159f64999c19dcc4d40d4bf8b4f679a3fd654bc0&role=free"
categories: 技术记录
tags:
  - 爱特
summary: dwdwd
catalog:
  - 示例目录
  - 二级目录
---

## 为什么要前后端分离？

前后端不分离example：（PHP）
![image.png](https://image.1874.cool/elog-docs-images/d56c3afe31330bf656189ae0c837542a.png)

### 不分开会有什么问题？

在传统的 Web 开发模式中，前端页面使用 JSP，而 JSP 代码的开发往往不是完全由后端程序猿来完成的。通常开发流程：前端程序猿完成 HTML 代码 → 交给后端程序猿转为 JSP 再进行开发。

后端如果遇到页面问题，就需要找前端来解决，但是此时前端看到的代码已经不是他之前写的 HTML 了，是混合了一大堆标签的 JSP 代码，而前端又不懂 JSP，场面就非常尴尬。

**后端**：你写的页面有问题啊，不显示数据。

**前端**：不可能，我这边都是好的。

**后端**：你自己来看啊。

**前端**：你写的这是什么玩意？我给你的代码不是这样的。

**后端**：我得把你的代码加到 JSP 里啊。

**前端**：我又不懂 JSP 啊，你再把代码摘出来吧，我帮你看看问题。

**后端**：......

这样就导致开发效率极低，后端需要等待前端的 HTML 代码完成之后，再整合成 JSP，而且出错率较高，遇到 Bug 解决起来也很麻烦，需要双方协同处理，这就给开发带来了很大的问题。

## 怎么解决？

前后端程序猿只需要提前约定好接口文档（参数、数据类型），然后并行开发即可，最后完成前后端集成，遇到问题同步修改即可，真正实现前后端应用的解耦合。

说直白点，前后端分离就是把原来的一个应用，拆分成两个应用：

一个纯前端应用，专门负责数据展示和用户交互。

一个纯后端应用，专门负责提供数据处理接口。

前端 HTML 页面通过 Ajax 调用后端接口进行数据交互。

## 交互数据的格式

主流的交互数据格式：JSON、XML等。

XML由于其可读性差、占用空间大等因素，基本上不在网络传输中使用，但在UI数据的描述，XML 的数据会比 JSON 更符合人类对 UI 布局的描述，所以在UI界面任然使用XML。

## 为什么要使用APIFox？

**Apifox=PostMan+Swagge+Mock+Jmeter**
![image.png](https://image.1874.cool/elog-docs-images/547fe9f200bad269657925c6accbe553.png)

1. 多系统数据不互通
   API设计者、前端开发、后端开发、测试人员大量重复工作。
1. 效率低
   可视化程度低、操作不友好。
1. 无法团队协作
   单机离线使用为主，成员之间无法实时同步数据，无法协作。
1. 学习成本高
   初学者难以入手，需要大量的学习成本、培训成本。
1. 数据一致性困难
   每次变更，都需要不同角色手动去多套系统修改，维护一致性非常困难。时间久了，不一致性越来越严重，最终不可维护。

## 为什么要部署？

不能让每个人电脑上都跑一个后端项目吧，前端还得先配个后端环境？

## 选择认证方式

## Session

![image.png](https://image.1874.cool/elog-docs-images/a60b041a85fd13e185312d57b922a5f4.png)

### Token

Cookie 作为 HTTP 规范，其出现历史久远，因此存在一些历史遗留问题，比如跨域限制等，并且 Cookie 作为 HTTP 规范中的内容，其存在默认存储以及默认发送的行为，存在一定的安全性问题。相较于 Cookie，token 需要自己存储，自己进行发送，不存在跨域限制，因此 Token 更加的灵活，没有 Cookie 那么多的“历史包袱”束缚，在安全性上也能够做更多的优化。

### JWT

![image.png](https://image.1874.cool/elog-docs-images/1f4476016ac15f5b159d3cff134d86d8.png)
![image.png](https://image.1874.cool/elog-docs-images/313b6e410f3b1f4d05137cbefe8799d0.png)

## 跨域问题

![image.png](https://image.1874.cool/elog-docs-images/86717812cd3884f6b284b72e48cd9666.png)
出于浏览器的同源策略限制。同源策略是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

不建议在前端利用什么 JSONP，iframe+domain 等来实现跨域请求，这种本质是绕过了欺骗了浏览器，起不到安全防护的作用。所以我们主要从服务端或者代理入手。
![image.png](https://image.1874.cool/elog-docs-images/db18627d9cb8b6b711cbc67c8dc59dfb.png)

### CORS

### Access-Control-Allow-Origin

**Access-Control-Allow-Origin** 响应标头指定了该响应的资源是否被允许与给定的来源（origin）共享。

Authoration: Token {token}
![image.png](https://image.1874.cool/elog-docs-images/9a88e6c2ff8a01f61faa7b28fc7814d3.png)
![image.png](https://image.1874.cool/elog-docs-images/3378ee5839a95d8cdd2db34654676389.png)

## 预检请求

与简单请求不同，“需预检的请求”要求必须首先使用 `OPTIONS` 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
![image.png](https://image.1874.cool/elog-docs-images/53058e3a0aadf053d24f1428be203859.png)

## 附带身份凭证的请求

CORS 预检请求不能包含凭据。预检请求的响应必须指定 `Access-Control-Allow-Credentials: true` 来表明可以携带凭据进行实际的请求。
![image.png](https://image.1874.cool/elog-docs-images/12757093229734cf0b23f81218e3a19b.png)
![image.png](https://image.1874.cool/elog-docs-images/1b4cf9550672eed3cdefabfa8447045a.png)
请求的标头中携带了 `Cookie` 信息，如果 `Access-Control-Allow-Origin` 的值为“`*`”，请求将会失败。而将 `Access-Control-Allow-Origin` 的值设置为 `https://example.com`，则请求将成功执行。

## 参考

[https://cloud.tencent.com/developer/article/1520380](https://cloud.tencent.com/developer/article/1520380)

[https://www.zhihu.com/question/25636060](https://www.zhihu.com/question/25636060)

[https://juejin.cn/post/7104112605161062437](https://juejin.cn/post/7104112605161062437)

[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

[https://juejin.cn/post/7111349594625146887](https://juejin.cn/post/7111349594625146887)
