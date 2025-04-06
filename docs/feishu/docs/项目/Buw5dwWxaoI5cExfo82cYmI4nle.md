---
title: 天猫精灵开放平台
urlname: Buw5dwWxaoI5cExfo82cYmI4nle
date: '2025-04-01 20:41:04'
updated: '2025-04-02 15:38:05'
---
[https://iap.aligenie.com/home](https://iap.aligenie.com/home?spm=a2c6h.12873639.article-detail.15.5d844decw9AZ2W)
## 1，搭建并部署了自有的Web Service服务器。
```yaml
https://dha.jwisdom.fun/genie2
```
认证文件后，建议您根据平台提供的检测方法验证后再进行配置。具体操作如下。

获取您配置的 Webhook URL，取出URL中域名和端口号(如果有)，然后拼接上"aligenie/认证文件名.txt "访问这个路径，以返回的结果(认证文件的内容)作为依据，判断认证是否成功。

例如：
1. 下载到的认证文件是 7d3ed3e756db3968eeb6edb36e2582c2.txt；

1. 为意图配置的 Webhook URL 为 https://webhook-service.com/** ；

那么我们将访问 
```yaml
https://dha.jwisdom.fun/aligenie/7d3ed3e756db3968eeb6edb36e2582c2.txt
```
1. 将获取到的结果做校验，校验通过 Webhook URL 才能配置成功。

您可以手动访问认证文件的链接，看能否正确获取到认证文件的内容，即可确认认证文件是否配置成功。

若提示无效URL，说明URL格式不正确、无法访问或访问被拒绝。

若提示未正确获取到文件，说明在指定目录下没有认证文件或文件内容不正确。

当意图配置的Webhook URL是https链接时，如果服务器SSL证书无效，也会无法正确获取到文件。



PS: 每个 **技能 **只会生成一个认证文件，若开发者服务器上已经存放该文件，则无需再次下载认证文件；下载到的认证文件请不要修改文件名称和文件内容，以免认证失败。
