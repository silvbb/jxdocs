---
title: 'Monorepo 和Multirepo '
urlname: CEu6dOxikovcCuxROj7ccIpanub
date: '2025-04-04 14:11:26'
updated: '2025-04-04 23:56:47'
---
## 1，Monorepo（单一代码库）
Monorepo（单一代码库）是一种项目管理策略，它将多个相关项目的代码存储在同一个代码仓库中，而不是将每个项目分散到不同的代码仓库中。



## Monorepo 的主要特点

1. 统一的代码库 ：所有项目代码存放在一个仓库中

2. 共享依赖 ：多个项目可以共享相同的依赖，减少重复安装

3. 统一版本控制 ：所有项目使用相同的版本控制流程

4. 简化依赖管理 ：项目间的依赖关系更加清晰和直接

5. 原子提交 ：可以在一次提交中同时更改多个项目



## Monorepo 与 Multirepo 的区别

- Monorepo ：一个仓库包含多个项目

- Multirepo ：每个项目有自己独立的仓库



## Monorepo 工具

在 JavaScript/TypeScript 生态系统中，常用的 Monorepo 工具包括：

- Lerna ：最早的 JS Monorepo 管理工具之一

- Nx ：提供更多构建优化和依赖图分析

- Turborepo ：专注于构建缓存和任务编排

- pnpm workspaces ：利用 pnpm 的高效依赖管理

- Yarn workspaces ：Yarn 提供的工作区功能



## weapp-vite 中的 Monorepo

在 weapp-vite 项目中，使用了 pnpm workspaces 来管理 Monorepo。这就是为什么需要先执行 pnpm build 来构建所有相互依赖的包，然后才能运行具体的应用。



## Monorepo 的优缺点

### 优点

- 代码共享更容易

- 依赖管理更简单

- 原子提交和测试

- 统一的构建和发布流程

### 缺点

- 仓库体积可能变得很大

- CI/CD 配置可能更复杂

- 权限管理可能更困难

Monorepo 适合于紧密相关的项目集合，特别是当这些项目需要频繁共享代码和资源时。
## 2，build
对于普通的单包 Vite 项目（即不是 monorepo 结构的项目），通常只需要执行：
```bash
pnpm install
pnpm dev  # 开发模式
```
或者
```bash
pnpm install
pnpm build  # 生产构建
```
但是对于 weapp-vite 这样的 monorepo 项目（包含多个相互依赖的包），由于各个子包之间存在依赖关系，所以需要先构建核心包，然后才能运行依赖这些核心包的应用。这就是为什么需要执行：
```bash
pnpm install  # 安装所有依赖
pnpm build    # 构建所有子包
```
然后才能运行具体的应用。



这是 monorepo 项目的特点，而不是 Vite 项目的普遍要求。如果你创建一个普通的 Vite 项目（比如使用 npm create vite@latest 创建的项目），通常不需要这样的两步操作。

在 weapp-vite 这样的 monorepo（单一代码库多包）项目中， pnpm install 和 pnpm build 是两个不同的步骤，各自有不同的作用：



pnpm install 主要做的是：
- 安装项目所有依赖包

- 解析依赖关系

- 创建 node_modules 目录结构

而 pnpm build 则是：
- 编译源代码

- 构建各个子包

- 生成可以被其他包引用的产物

在 weapp-vite 这样的项目中，各个子包之间可能存在相互依赖关系。例如， apps/vite-native 可能依赖于 packages/weapp-vite 包。如果不先运行 pnpm build ，那么当你尝试运行某个应用时，它可能找不到所需的编译后的依赖包。

简单来说：
- install 是获取外部依赖

- build 是构建内部依赖

这就是为什么在运行具体应用前，需要先执行这两个命令的原因。这确保了所有依赖都已正确安装和构建，应用才能正常运行。
## 3，monorepo 项目
### 1. 初始化项目
首先创建一个新的目录并初始化：
```bash
mkdir my-moorepo
cd my-monorepo
pnpm init
```
### 2. 安装必要的工具
```bash
pnpm add -D turbo @icebreakers/monorepo typescript
```
### 3. 创建 pnpm 工作区配置
创建 pnpm-workspace.yaml 文件：
```yaml
packages:
  - packages/*
  - apps/*
  - '!**/test/**'
```
### 4. 配置 Turborepo
创建 turbo.json 文件：
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```
### 5. 更新 package.json
修改 package.json 添加必要的脚本：
```json
{
  "name": "my-monorepo",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "packageManager": "pnpm@10.6.5",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "script:init": "monorepo init",
    "script:sync": "monorepo sync",
    "script:clean": "monorepo clean"
  }
}
```
### 6. 创建基本目录结构
```bash
mkdir packages
mkdir apps
```
### 7. 初始化 monorepo 结构
```bash
pnpm script:init
```
### 8. 添加子包
在 packages 目录下创建子包：
```bash
cd packages
mkdir my-package
cd my-package
pnpm init
```
编辑 packages/my-package/package.json ：
```json
{
  "name": "my-package",
  "version": "0.0.1",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --watch",
    "lint": "eslint ."
  }
}
```
### 9. 同步工作区
这个命令通过 @icebreakers/monorepo 包提供的 sync 功能执行以下操作：
1. 同步工作区配置 ：确保 pnpm-workspace.yaml 文件中的配置与实际目录结构匹配

1. 更新依赖关系 ：检查并更新各个子包之间的依赖关系，确保版本一致性

1. 同步脚本命令 ：可能会同步各个子包中的通用脚本命令

1. 更新引用路径 ：确保项目内部的引用路径正确

```plaintext
cd ../..
pnpm script:sync
```
### 10. 安装依赖
```bash
pnpm install
```
这样就创建了一个基本的 monorepo 项目结构，你可以根据需要添加更多的子包和应用。
