---
title: vitepress持续集成
urlname: JTVBd514DojLGlxAvPMc1bFHnkf
date: "2025-03-18 12:39:09"
updated: "2025-03-18 12:40:06"
---

# 持续集成

## 自动化流程

![image](/feishu/asset/images/Gwl6bAFIgoqonYxTi5NcUGcfnOk.png)

## 语雀示例

语雀 + webhooks + serverless api + GitHub Actions + Github Pages 持续集成
![image](/feishu/asset/images/UWOzbRUFnoxcCVxXV2qcmhHFnbc.png)

### 语雀 webhooks

在语雀知识库 - 更多设置 - 消息推送中可配置语雀webhooks，填写一个支持POST请求的APi链接即可（这里以serverless api为例）。当文档更新时，语雀会调用这个API进行推送

> 令人遗憾的是，语雀将 webhooks 收费了  
> 未开通会员的语雀小伙伴可直接手动调用API触发Github Actions进行自动化构建&部署  
> ⚠️ 知识库配置了「自动发布」功能后，文档的 更新/发布 操作暂不会发送 webhooks
> ![image](/feishu/asset/images/D697b9tGco05mYxuCx6cV0xTnxe.png)

### serverless api

为了方便，这里提供一个部署在Vercel的免费公用的[ServerlessAPI](https://github.com/elog-x/serverless-api)

将其填入语雀Webhooks中即可

> 未开通会员的语雀小伙伴可直接手动调用此API触发Github Actions进行自动化构建&部署

javascript

```plaintext
https://serverless-api-elog.vercel.app/api/github?user=xxx&repo=xxx&event_type=xxx&token=xxx
```

### 配置package.json

在自动化流程中不要忘记将@elog/cli安装到package.json

> npm i @elog/cli  
> 或者  
> yarn add @elog/cli  
> 或者  
> pnpm i @elog/cli

json

```plaintext
{        "scripts": {    "build": "vitepress or hexo 或者其他自定义的命令，具体以自己的工具为准", // 构建文档    "elog:init": "elog init",    "sync:local": "elog sync -e .elog.env", // 本地同步时需要从env中取值    "sync": "elog sync", // 进行同步    "clean": "elog clean"  }}
```

### Github Actions

1. 在仓库的`设置-Secrets and variables-Actions-Secrets`中进行配置需要用到的环境变量

1. 在仓库根目录创建`.github/workflows/main.yaml`文件，并按照以下流程配置

yaml

```plaintext
name: Deplo To Github Pageson:  # 允许手动push触发  push:    branches:      - master  # 允许外部仓库事件触发  repository_dispatch:    types:                        # api中的event_type就是这个      - deployjobs:  build:    runs-on: ubuntu-latest    steps:      - name: 检查分支        uses: actions/checkout@master      - name: 安装node环境        uses: actions/setup-node@master        with:          node-version: "16.x"      - name: 安装依赖        run: |          export TZ='Asia/Shanghai'          npm install --prod      - name: 拉取语雀/Notion的文章        env:          # 语雀相关环境变量          YUQUE_TOKEN: ${{ secrets.YUQUE_TOKEN }}          YUQUE_LOGIN: ${{ secrets.YUQUE_LOGIN }}          YUQUE_REPO: ${{ secrets.YUQUE_REPO }}          # Notion相关环境变量          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}          # 图床相关环境变量，以腾讯云COS为例          COS_SECRET_ID: ${{ secrets.COS_SECRET_ID }}          COS_SECRET_KEY: ${{ secrets.COS_SECRET_KEY }}          COS_IMAGE_BUCKET: ${{ secrets.COS_IMAGE_BUCKET }}          COS_IMAGE_REGION: ${{ secrets.COS_IMAGE_REGION }}        run: |          # 对应package.json中的script.sync          npm run sync      - name: 配置Git用户名邮箱        run: |          git config --global user.name "xxxx"          git config --global user.email "xxxx"      - name: 提交yuque拉取的文章到GitHub仓库        run: |          echo `date +"%Y-%m-%d %H:%M:%S"` begin > time.txt          git add .          git commit -m "更新文档" -a      - name: 推送文章到仓库        uses: ad-m/github-push-action@master        with:          # GITHUB_TOKEN为流水线内置变量，无需配置，可直接使用          github_token: ${{ secrets.GITHUB_TOKEN }}      - name: 生成静态文件        run: |          # 对应package.json中的script.build          npm run build      - name: 部署到Github Pages        uses: peaceiris/actions-gh-pages@v3        with:          # github_token和personal_token适用于推送到当前仓库          # 也就是你的Github Pages仓库（xxxx/xxxx.github.io）          # 一般都不直接在Github Pages仓库开发，所以推荐使用deploy_key          # github_token: ${{ secrets.GITHUB_TOKEN }}          # personal_token: ${{ secrets.PERSONAL_TOKEN }}          # deploy_key可以推送到别的仓库, SSH_PRIVATE_KEY 为自己电脑的ssh私钥          deploy_key: ${{ secrets.SSH_PRIVATE_KEY }}          # 具体目录以自己实际情况为准          publish_dir: docs/.vitepress/dist          external_repository: xxxx/xxxx.github.io          publish_branch: master          commit_message: ${{ github.event.head_commit.message }}
```

## Notion示例

Notion + Slack + pipedream + serverless api + GitHub actions + Github Pages 持续集成

### 配置数据表 Slack notifications

设置数据表文档字段被扭转到某个状态时向Slack发送消息

### 注册Slack账号并授权给Notion

当Notion数据表的文档字段被扭转到某个状态时向Slack发送消息，此时Slack收到消息提醒
![image](/feishu/asset/images/LROnbHZ6qooyuExV28KcBwXnn7d.png)

### serverless api

为了方便，这里提供一个部署在Vercel的免费公用的[ServerlessAPI](https://github.com/elog-x/serverless-api)

javascript

```plaintext
https://serverless-api-elog.vercel.app/api/github?user=xxx&repo=xxx&event_type=xxx&token=xxx
```

### 注册pipedream并配置WorkFlow

#### 第一步：选择Channels为Notion应用

> 你也可以在Notion中配置发送消息到某个频道，然后在pipedream选择所选频道的Channel。支持多选Channels
> ![image](/feishu/asset/images/LCTbbRG2roNNdxxYsJIcS8ymnJg.png)

#### 第二步：收到Notion消息后发送自定义Http请求

将调用Github Actions的 serverless api 填入即可
![image](/feishu/asset/images/EdbgbWFMuoo3B3xPCyecb5ccnub.json; charset=utf-8)

### 配置package.json

在自动化流程中不要忘记将@elog/cli安装到package.json

> npm i @elog/cli  
> 或者  
> yarn add @elog/cli  
> 或者  
> pnpm i @elog/cli

json

```plaintext
{        "scripts": {    "build": "vitepress or hexo 或者其他自定义的命令，具体以自己的工具为准", // 构建文档    "elog:init": "elog init",    "sync:local": "elog sync -e .elog.env", // 本地同步时需要从env中取值    "sync": "elog sync", // 进行同步    "clean": "elog clean"  }}
```

### Github Actions

1. 在仓库的`设置-Secrets and variables-Actions-Secrets`中进行配置需要用到的环境变量

1. 在仓库根目录创建`.github/workflows/main.yaml`文件，并按照以下流程配置

yaml

```plaintext
name: Deplo To Github Pageson:  # 允许手动push触发  push:    branches:      - master  # 允许外部仓库事件触发  repository_dispatch:    types:                        # api中的event_type就是这个      - deployjobs:  build:    runs-on: ubuntu-latest    steps:      - name: 检查分支        uses: actions/checkout@master      - name: 安装node环境        uses: actions/setup-node@master        with:          node-version: "16.x"      - name: 安装依赖        run: |          export TZ='Asia/Shanghai'          npm install --prod      - name: 拉取语雀/Notion的文章        env:          # 语雀相关环境变量          YUQUE_TOKEN: ${{ secrets.YUQUE_TOKEN }}          YUQUE_LOGIN: ${{ secrets.YUQUE_LOGIN }}          YUQUE_REPO: ${{ secrets.YUQUE_REPO }}          # Notion相关环境变量          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}          # 图床相关环境变量，以腾讯云COS为例          COS_SECRET_ID: ${{ secrets.COS_SECRET_ID }}          COS_SECRET_KEY: ${{ secrets.COS_SECRET_KEY }}          COS_IMAGE_BUCKET: ${{ secrets.COS_IMAGE_BUCKET }}          COS_IMAGE_REGION: ${{ secrets.COS_IMAGE_REGION }}        run: |          # 对应package.json中的script.sync          npm run sync      - name: 配置Git用户名邮箱        run: |          git config --global user.name "xxxx"          git config --global user.email "xxxx"      - name: 提交yuque拉取的文章到GitHub仓库        run: |          echo `date +"%Y-%m-%d %H:%M:%S"` begin > time.txt          git add .          git commit -m "更新文档" -a      - name: 推送文章到仓库        uses: ad-m/github-push-action@master        with:          # GITHUB_TOKEN为流水线内置变量，无需配置，可直接使用          github_token: ${{ secrets.GITHUB_TOKEN }}      - name: 生成静态文件        run: |          # 对应package.json中的script.build          npm run build      - name: 部署到Github Pages        uses: peaceiris/actions-gh-pages@v3        with:          # github_token和personal_token适用于推送到当前仓库          # 也就是你的Github Pages仓库（xxxx/xxxx.github.io）          # 一般都不直接在Github Pages仓库开发，所以推荐使用deploy_key          # github_token: ${{ secrets.GITHUB_TOKEN }}          # personal_token: ${{ secrets.PERSONAL_TOKEN }}          # deploy_key可以推送到别的仓库, SSH_PRIVATE_KEY 为自己电脑的ssh私钥          deploy_key: ${{ secrets.SSH_PRIVATE_KEY }}          # 具体目录以自己实际情况为准          publish_dir: docs/.vitepress/dist          external_repository: xxxx/xxxx.github.io          publish_branch: master          commit_message: ${{ github.event.head_commit.message }}
```
