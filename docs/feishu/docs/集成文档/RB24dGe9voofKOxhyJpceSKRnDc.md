---
title: Github操作
urlname: RB24dGe9voofKOxhyJpceSKRnDc
date: '2025-03-27 15:32:06'
updated: '2025-04-04 23:11:14'
---
https://docs.github.com/zh

https://git-scm.com/book/zh/v2
## 1，初始化建立github项目
```undefined
$ git config --global user.name "silvbb"
$ git config --global user.email 1064041207@qq.com
$ git config --global push.default simple
$ git init
```
此设置是 Git 命令 push 的默认模式为 `simple`，当我们执行 `git push` 没有指定分支时，自动使用当前分支，而不是报错。

github会提醒你：Git 提示你正在使用 "master" 作为初始分支名称，并建议你可以考虑配置默认分支名称或重命名当前分支。现在很多项目都使用 "main"、"trunk" 或 "development" 作为默认分支名称，而不是 "master"。

如果你想更改默认分支名称，可以使用以下命令：
```power
# 设置全局默认分支名称
git config --global init.defaultBranch main

# 或者重命名当前分支
git branch -m main
```
1、对 Git 进行初始化：
```power
cd ~/Code/Laravel
git init
```
2、将项目所有文件纳入到 Git 中：
```power
git add -A 
或者：
# 添加所有文件到暂存区
git add .
```
我们可以通过在 .gitignore 文件中进行设置，来选择忽略掉一些我们不想纳入到 Git 版本管理中的文件（如缓存文件）。因此上面描述的『所有文件』指的是没在 .gitignore 中被忽略的文件。

3、检查 Git 状态：
```power
git status #上面命令将会向你输出存放在 Git 暂存区的文件，这意味着这些文件还未真正提交到 Git 中
```
4、保留改动并提交：
```power
git commit -m "初始化 Laravel 项目" #上面这行命令会将暂存区的文件都提交到 Git，-m 选项后面带的参数表示本次提交的简单描述。
```
5、查看历史提交记录
```power
git log
commit 4d8896a697674861adec7e2ba8b7804412c0678d
Author: Summer <summer@learnku.com>
Date:   Wed Sep 7 07:54:11 2016 +0800

    Initial commit
```
从输出信息中可以很清晰的看到每次提交的作者、日期、描述等信息。注意看这里的 `Author` 项的内容就是我们上面设置的用户信息。 按 `q` 可退出查看。
## 2，上传代码
git commit -m "初始化 Laravel 项目"只是在你的本地Git仓库中创建了一个提交记录，这时候你的代码还没有上传到GitHub或任何其他远程仓库。
```power
# 如果需要连接到远程仓库
git remote add origin <远程仓库URL>
git push -u origin master  # 或 main，取决于你的分支名称

git remote add origin https://github.com/silvbb/laravel-test.git
git push -u origin master
```
## 3，设置了 SSH 密钥，
## 将 SSH Key 添加到 ssh-agent 中：
```power
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```
回到 **主机中** 打印出公钥 `id_rsa.pub` 文件里的内容，并把输出的内容复制到剪贴板里：
```power
> cat ~/.ssh/id_rsa.pub
```
使用SSH git push
```power
git remote set-url origin git@github.com:silvbb/laravel-test.git
如果是私有仓库，确保你已经正确配置了 GitHub 身份验证：
git config --global credential.helper store
git push -u origin master
```
## 3，恢复被删除文件
```power
git checkout -f #git checkout -f 的作用是将在暂存区的更改文件进行强制撤销。
```
### 4，后续操作
```power
git add .
git commit -m "你的提交信息"
git push
```
## 5，新建分支
```power
git checkout master #将当前分支切换到 master 分支上
git checkout -b static-pages
```
## 6，fork
fork 了一个仓库（比如 weapp-vite/weapp-vite）到您自己的 GitHub 账号后：
1. origin - 默认指向您 fork 后的仓库（例如：您的用户名/weapp-vite）

1. upstream - 通常被设置为指向原始仓库（weapp-vite/weapp-vite）

```power
git fetch origin #拉取最新的远程分支状态 ：
git reset --hard origin/main #重置本地分支到远程分支状态

同步上游仓库的最新更改 ：
git remote add upstream https://github.com/weapp-vite/weapp-vite.git
git fetch upstream
git merge upstream/main
git push origin main
```
## 自动更新fork项目
Dependabot
```power
mkdir -p f:\project_space\weapp-vite\.github\dependabot.yml
```
编辑 dependabot.yml 文件，添加以下内容：
```undefined
version: 2
updates:
  # 更新 npm 依赖
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    versioning-strategy: auto
    
  # 如果您有子包，也可以为它们配置
  - package-ecosystem: "npm"
    directory: "/packages/weapp-vite"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    
  # 更新 GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```
提交并推送配置文件到 GitHub：
```power
cd f:\project_space\weapp-vite
git add .github/dependabot.yml
git commit -m "chore: add dependabot configuration"
git push origin main
```
## 配置说明
- package-ecosystem : 指定依赖类型，如 npm、docker、github-actions 等

- directory : 指定 package.json 文件所在的目录

- schedule.interval : 检查更新的频率，可以是 daily、weekly 或 monthly

- open-pull-requests-limit : 限制 Dependabot 可以同时打开的 PR 数量

- versioning-strategy : 控制 Dependabot 如何更新版本号

## 高级配置选项
您还可以添加以下高级配置：
1. 忽略某些依赖：

```yaml
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    ignore:
      - dependency-name: "lodash"
      - dependency-name: "express"
        versions: ["4.x", "5.x"]
```
1. 为特定依赖分配审阅者：

```yaml
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    assignees:
      - "您的GitHub用户名"
    reviewers:
      - "团队成员用户名"
```
配置完成后，Dependabot 将根据您的设置自动检查依赖更新并创建 PR。
## 7，克隆子模块
要完整克隆包含子模块的仓库，你需要：
1. 先克隆主仓库：

```bash
git clone <主仓库地址> .
```
1. 然后初始化并更新子模块：

```bash
git submodule init
git submodule update
```
或者在克隆时直接使用 --recursive 参数一次性完成：
```bash
git clone --recursive <主仓库地址> .
```
如果仓库已经克隆但没有子模块，可以执行：
```bash
git submodule update --init --recursive
```
## 
