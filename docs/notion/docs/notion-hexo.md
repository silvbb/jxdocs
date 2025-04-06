---
categories: 博客折腾手册
category: 博客折腾手册
tags:
  - elog
  - notion
  - hexo
  - blog
date: "2023-11-08 00:00:00"
catalog: []
urlname: notion-hexo
title: Notion + Hexo + GitHub Actions + Vercel 博客解决方案
summary: ""
sort: ""
updated: "2025-03-17 17:27:00"
---

# 博客工具

- 写作平台：Notion
- 博客平台：[Hexo](https://hexo.io/)
- 博客主题：[Aurora](https://aurora.tridiamond.tech/cn/)
- 部署平台：Vercel

# 环境准备

# 博客搭建指南

## 1. Fork模板仓库

[点击 Fork](https://github.com/elog-x/notion-hexo/fork) 该模板仓库到个人 Github 账号仓库下并 clone 到本地

## 2. 安装依赖

在项目根目录下运行命令安装依赖

```shell
npm install
```

## 3. 新建 Elog 本地调试文件

在项目根目录中复制`.elog.example.env`文件并改名为`.elog.env`，此文件将用于本地同步Notion 文档

## 4. 配置 Notion 关键信息

按照[文档提示](https://elog.1874.cool/notion/gvnxobqogetukays#notion)配置 Notion 并获取 `token` 和 `databaseId`，在本地`.elog.env`中写入

```plain text
NOTION_TOKEN=获取的token
NOTION_DATABASE_ID=获取的databaseId
```

## 5.本地调试

在项目根目录运行同步命令

```shell
npm run sync:local
```

## 6.启动 Hexo

在项目根目录运行hexo启动命令，会自动打开本地博客

```shell
npm run server
```

## 7. 配置 Hexo 博客

根据 [Hexo](https://hexo.io/) 文档和 [Aurora](https://aurora.tridiamond.tech/cn/)主题配置文档，配置你的博客直到你满意为主，你也可以换别的主题，这里不做演示

## 8. 提交代码到 github

本地访问没问题直接提交所有文件到 Github 仓库即可

## 9. 部署到 Vercel

注册 Vercel 账号并绑定 Github，在 Vercel 导入 该项目，Vercel 会自动识别出该 Hexo 项目，不需要改动，直接选择 Deploy 部署。部署完成会有一个 Vercel 临时域名，你也可以绑定自己的域名。

![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a193abac-6219-46ee-9c3f-2ed115516866/4467a32f-6a3d-4c4b-ab8c-ca3e42860df8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4OS7EAU%2F20250317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250317T145937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDa51AJCC45qUzHTN0InnoQ3wH0IVYWYC7MnWnsadzmXgIgauqVn3U3dGmniWqmFb%2BbPj8xy5U9Y%2Fet3AwXD%2BxYGsIq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDDDUZ0UJ7TPnoKm8YircA60AAnVm%2Be9J9zUGAbtyPA%2FJDkNyabu58%2FnqmAydUKOVpS72wYSEqB48k9zVJ%2BdN62h5xxNQpWpYXhZq5qJujzsOIUdvnRJCAN%2BFLvwDEDHJ2R%2FFRmYxVrHytXuDT2IqTyROvOo7HfaogOroKVmhZAzk5Gq%2BRFB1vsjDFBIG76lW7LfSvZbrqJD%2FNVyfEWtGAhwqbAKfy%2Br%2FO4%2FfnZMGeTRcVbgRGDKj%2B1AzvVpbmGFDud7zOkXuNao%2F82wU3Ip5l7WNRDu9F7%2BHNqYkOSZbg%2B%2BWqBUIsAfXsE7M0b%2B4lgshOkKvIPa4BBqKGsINS246AoLDp4uNS%2BCwGg%2FYjAVhwqc5WlZKM0tOnCsh5eXm1lE3IV5OxzeeUTjzUk0HZlWfqHvz0mHmmnKgJlKwqIowWRHl2ESRkSnYfEhi7uso0ZCThsFmEaRCOvVfaOEwO9Lz0FjZhkm45tjifc%2BvPpxObtpVoy6KfVfrAUurxAoDCyGVs9R%2BQisViMwPFNZwNzJ5ev4rDIZomHCJwnz21fwwvWygHKdPI96U1P7pqyLS%2FiPEJLgA6hFiwFV0foZrtZxPefx4au1hVMunsV6F97if77TIlLgruqNkC0eWdzd5cIDiBJt4TFNNxVh%2F3c3GMK3p4L4GOqUBdWxqalyUS7ZU5S6ymwRu5WM6eSq90%2BibpqLyc%2F4cjchxNPZbUaHXhjv13lsDVA1m1jv3cw8aFDi4zIVSLM79wIH973Cp7CSvZ4mzzDHTWlZysruA64m1HdS2tnUGWXCPe%2FAMsWRBl7Jyl4fm0lv7iJ%2FxqkAwz7b3FqzfWYQG2ZSFYWx9a9XQC%2Fnd2I9auDIo%2FWMtiFDbJ7%2B2HxZ42of4oKpJlPcV&X-Amz-Signature=03a40cf405a9d5d6dbcd47d754dd5a7880ca08cd8935b41fc0be14ce72dfdd5b&X-Amz-SignedHeaders=host&x-id=GetObject)

![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a193abac-6219-46ee-9c3f-2ed115516866/3daedef9-b516-40e6-8c80-80bff543d62c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4OS7EAU%2F20250317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250317T145937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDa51AJCC45qUzHTN0InnoQ3wH0IVYWYC7MnWnsadzmXgIgauqVn3U3dGmniWqmFb%2BbPj8xy5U9Y%2Fet3AwXD%2BxYGsIq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDDDUZ0UJ7TPnoKm8YircA60AAnVm%2Be9J9zUGAbtyPA%2FJDkNyabu58%2FnqmAydUKOVpS72wYSEqB48k9zVJ%2BdN62h5xxNQpWpYXhZq5qJujzsOIUdvnRJCAN%2BFLvwDEDHJ2R%2FFRmYxVrHytXuDT2IqTyROvOo7HfaogOroKVmhZAzk5Gq%2BRFB1vsjDFBIG76lW7LfSvZbrqJD%2FNVyfEWtGAhwqbAKfy%2Br%2FO4%2FfnZMGeTRcVbgRGDKj%2B1AzvVpbmGFDud7zOkXuNao%2F82wU3Ip5l7WNRDu9F7%2BHNqYkOSZbg%2B%2BWqBUIsAfXsE7M0b%2B4lgshOkKvIPa4BBqKGsINS246AoLDp4uNS%2BCwGg%2FYjAVhwqc5WlZKM0tOnCsh5eXm1lE3IV5OxzeeUTjzUk0HZlWfqHvz0mHmmnKgJlKwqIowWRHl2ESRkSnYfEhi7uso0ZCThsFmEaRCOvVfaOEwO9Lz0FjZhkm45tjifc%2BvPpxObtpVoy6KfVfrAUurxAoDCyGVs9R%2BQisViMwPFNZwNzJ5ev4rDIZomHCJwnz21fwwvWygHKdPI96U1P7pqyLS%2FiPEJLgA6hFiwFV0foZrtZxPefx4au1hVMunsV6F97if77TIlLgruqNkC0eWdzd5cIDiBJt4TFNNxVh%2F3c3GMK3p4L4GOqUBdWxqalyUS7ZU5S6ymwRu5WM6eSq90%2BibpqLyc%2F4cjchxNPZbUaHXhjv13lsDVA1m1jv3cw8aFDi4zIVSLM79wIH973Cp7CSvZ4mzzDHTWlZysruA64m1HdS2tnUGWXCPe%2FAMsWRBl7Jyl4fm0lv7iJ%2FxqkAwz7b3FqzfWYQG2ZSFYWx9a9XQC%2Fnd2I9auDIo%2FWMtiFDbJ7%2B2HxZ42of4oKpJlPcV&X-Amz-Signature=7308126f6ff99197472a7ba6841d92c224bc7fdd37a6e0169f68c16a443c8383&X-Amz-SignedHeaders=host&x-id=GetObject)

## 10. 配置 Github Actions 权限

在 Github 仓库的设置中找到 `Actions-General`，打开流水线写入权限`Workflow permissions`

    ![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a193abac-6219-46ee-9c3f-2ed115516866/655e63eb-9fca-4856-ad6d-9deb87907f4a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4E5DZFE%2F20250317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250317T145938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAJ5u%2F0pbC%2ByR7hKObQN74K77ziwZfKvYTNO55HHu1%2FmAiEArgX0agwlL%2BsbH7mvtoLhvv%2FhEvw5bFosw7zlxxC7c0cq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDGyBguic7yVZLSCgACrcA%2FDPNpmGq7rs2JpyRRXvZK%2BR63p3KF7o25CEF5Za4PXs36ZBrNKenA8Cqla7rTZr6EgOnvyJsCi4cmwq34x%2B32WlJjq2jPNjl61YBfHycWWAgnjQ3QCX7%2FPaZYKCCZBOUVcpzFet086dZOMseZbo3nomOLJe7CqaO4Xaw2BHtp6DNLN7%2BmZDMSqbqfrrD9tNA4mkGGHDsnm2ayk7lpcG9%2F1P5DqBr86Q2IM0Wk647RkU6EMGhyzjWECxGppZqBJVCj0c7BXBmnicoReGodR5uaQGXLG%2BL5fkC%2B5kYv9QcUeS3O781LiE1ksakLYkNP1uI2rZlvdKLNhmSbm7p7TaBeWYzZMEsf8UnhzxGwVFKmA%2B3qGBvW6lN8xUjmYqy99l4ce4RYRbaKowuW35e%2BuQC6nTJ%2FwzR%2FuhBAzFX%2BOoMyPzLVQxSPhkHo5Qs8xVdB0Am6ASRk%2FzzpB1TPRRGlioLBAAIhkO5bbKffTFpGGJrIFkA7w%2FopJet2hVARM8CXlJQN%2BP%2FJT3N6qmFOQ2yjGQrsvXegpC2FXVYKtVzUSVsNHfwBWzYNDPuIl61JpHigX5tO6TC0VAgS3434EqkUcjdZ8I0Z8Lc4M3VhB51nnaPIoIT99s%2B%2FwPJ8YeaSFRMMnp4L4GOqUBZVkJb6LGhcuNwJBAPI2oiKyv0T5PZQhenzn%2B1zQCKBJiYWGks%2FVW1mSoq3IeCUw5LrtIy%2BlUmNT7lEVw7cmkOpk%2BtgauTaESOQQKKhqBWFKHFXYld2HS4AIPIUzSeJKHhg%2B%2BMIMemYFL5YncJmPlRN3qiAgGqIUxfxdy3od8V7Ong%2F90%2BQZEnJ%2BNX2NK1OQA3RQT5NOlmlyojVJGt07hh59O%2B8Qx&X-Amz-Signature=3f422925b491b2106b7d6427b61b21de6448ecc02bab65b5ec844772f2880e57&X-Amz-SignedHeaders=host&x-id=GetObject)

## 11. 配置环境变量

在本地运行时，用的是`.elog.env`文件中定义的 Notion 账号信息，而在 Github Actions 时，需要提前配置环境变量。

在 Github 仓库的设置中找到 `Secrets  and variables`，新增仓库的环境变量`NOTION_DATABASE_ID`和`NOTION_TOKEN`和`.elog.env`保持一致即可

![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/a193abac-6219-46ee-9c3f-2ed115516866/00308cea-f5bb-4345-bc1d-7fce622ee54a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4OS7EAU%2F20250317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250317T145937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDa51AJCC45qUzHTN0InnoQ3wH0IVYWYC7MnWnsadzmXgIgauqVn3U3dGmniWqmFb%2BbPj8xy5U9Y%2Fet3AwXD%2BxYGsIq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDDDUZ0UJ7TPnoKm8YircA60AAnVm%2Be9J9zUGAbtyPA%2FJDkNyabu58%2FnqmAydUKOVpS72wYSEqB48k9zVJ%2BdN62h5xxNQpWpYXhZq5qJujzsOIUdvnRJCAN%2BFLvwDEDHJ2R%2FFRmYxVrHytXuDT2IqTyROvOo7HfaogOroKVmhZAzk5Gq%2BRFB1vsjDFBIG76lW7LfSvZbrqJD%2FNVyfEWtGAhwqbAKfy%2Br%2FO4%2FfnZMGeTRcVbgRGDKj%2B1AzvVpbmGFDud7zOkXuNao%2F82wU3Ip5l7WNRDu9F7%2BHNqYkOSZbg%2B%2BWqBUIsAfXsE7M0b%2B4lgshOkKvIPa4BBqKGsINS246AoLDp4uNS%2BCwGg%2FYjAVhwqc5WlZKM0tOnCsh5eXm1lE3IV5OxzeeUTjzUk0HZlWfqHvz0mHmmnKgJlKwqIowWRHl2ESRkSnYfEhi7uso0ZCThsFmEaRCOvVfaOEwO9Lz0FjZhkm45tjifc%2BvPpxObtpVoy6KfVfrAUurxAoDCyGVs9R%2BQisViMwPFNZwNzJ5ev4rDIZomHCJwnz21fwwvWygHKdPI96U1P7pqyLS%2FiPEJLgA6hFiwFV0foZrtZxPefx4au1hVMunsV6F97if77TIlLgruqNkC0eWdzd5cIDiBJt4TFNNxVh%2F3c3GMK3p4L4GOqUBdWxqalyUS7ZU5S6ymwRu5WM6eSq90%2BibpqLyc%2F4cjchxNPZbUaHXhjv13lsDVA1m1jv3cw8aFDi4zIVSLM79wIH973Cp7CSvZ4mzzDHTWlZysruA64m1HdS2tnUGWXCPe%2FAMsWRBl7Jyl4fm0lv7iJ%2FxqkAwz7b3FqzfWYQG2ZSFYWx9a9XQC%2Fnd2I9auDIo%2FWMtiFDbJ7%2B2HxZ42of4oKpJlPcV&X-Amz-Signature=4b12550bc0297cc3c476f476e7bad36767c9406ce9a1467cd513412573f0973f&X-Amz-SignedHeaders=host&x-id=GetObject)

## 12. 自动化部署

当在 Notion 中改动文档后，手动/自动触发 Github Actions流水线，会重新从 Notion 增量拉取文档，自动提交代码到 Github 仓库。

Vercel 会实时监测仓库代码，当有新的提交时都会重新部署博客。如此就实现了自动化部署博客。

整个流程的关键点就在于：如何手动/自动触发 Github Actions

在项目.`github/workflows/sync.yaml`中已经配置了外部 API 触发 Github Actions 事件，所以只需要调用 API 触发流水线即可。

### 手动触发

为了方便，这里提供一个部署在 Vercel 的免费公用的[**ServerlessAPI**](https://github.com/elog-x/serverless-api)，只需要配置好 URL 参数并浏览器访问即可触发流水线

```shell
https://serverless-api-elog.vercel.app/api/github?user=xxx&repo=xxx&event_type=deploy&token=xxx
```

### 自动触发

可在 Notion 中结合 Slack 触发，[参考教程](https://elog.1874.cool/notion/vy55q9xwlqlsfrvk)，这里就不做进一步演示了

# 自定义 Elog 配置

如果想自定义 Elog 配置，可访问 [Elog 文档](https://elog.1874.cool/)

# 博客示例

示例仓库：[https://github.com/LetTTGACO/notion-hexo](https://github.com/LetTTGACO/notion-hexo)

博客示例地址：[https://notion-hexo.vercel.app](https://notion-hexo.vercel.app/)
