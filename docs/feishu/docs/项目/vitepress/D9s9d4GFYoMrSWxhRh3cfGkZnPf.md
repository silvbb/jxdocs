---
title: JxDocs
urlname: D9s9d4GFYoMrSWxhRh3cfGkZnPf
date: '2025-04-05 22:03:58'
updated: '2025-04-07 10:42:39'
---
# JxDocs
网站：jxdocs.jwisdom.fun
## 1，初始化项目
## 2，运行项目
```typescript
pnpm docs:dev
```
## 3，更新文档
#### 更新飞书文档
```typescript
elog sync -c elog.config.feishu.cjs -e .elog.env  -a elog.cache.feishu.json
```
#### 如何重新全量同步文档
elog 默认为增量更新，只有该文档重新修改过，再次同步时，才会重新拉取该文档。如果想重新全量同步文档。有以下 3 种办法：
1. 运行同步命令时，增加禁用缓存标识：`elog sync --disable-cache`

1. 运行 `elog clean`，Elog 将会自动清除所有文档、本地图片、缓存文件`(elog.cache.json)`

1. `elog.cache.json`为 Elog 增量同步的关键，可手动删除此文件，推荐同时手动删除所有文档、本地图片

#### 如何同步多个知识库/数据表


其他命令：
```plaintext
elog --version #查看当前 Elog 的版本号
elog sync 
--debug #打印更多调试日志
--force #强制同步 只支持文档删除时强制同步，不支持文档改名后删除改名前的文档
--full-cache #缓存文档全部信息 常用于本地调试 使用此参数后，缓存文件的大小大约是原文档的2-10倍！
--disable-cache 禁用缓存进行同步，等同于删除缓存文件进行全量更新
```
