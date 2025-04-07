---
title: 微信weapp-vite
urlname: E5HAdchwaoz7VJx6He7cCpPonIc
date: '2025-03-26 10:20:32'
updated: '2025-04-07 01:09:38'
---
# 微信开发者工具
中文文档：https://vite.icebreaker.top/guide/

`weapp-vite` 是一个 `vite` 的微信小程序版本的封装，你可以利用它开箱即用的进行小程序开发

它支持绝大部分 `vite` 的配置和插件系统，同时对小程序的架构做了一些特殊的优化，比如分包场景等等。

它能够开箱即用的支持 `ts` / `postcss` / `sass` / `less` / `tailwindcss` 等等，还能使用众多 `vite` 插件

目录结构：
```undefined
1. apps/ - 示例应用和模板
   - vite-native/ - 原生微信小程序示例
   - vite-native-skyline/ - Skyline 渲染引擎示例
   - vite-native-ts/ - TypeScript 版本示例
   - vite-native-ts-skyline/ - TypeScript + Skyline 示例
   - weapp-vite-template/ - 基础模板
   - weapp-vite-tailwindcss-tdesign-template/ - TDesign UI 组件库模板
   - weapp-wechat-zhihu/ - 知乎微信小程序示例
   - ast/ - AST 解析示例
   - playground/ - 测试环境
2. packages/ - 核心包 
   - weapp-vite/ - 主要构建工具
   - plugin-vue/ - Vue 插件
   - create-weapp-vite/ - 项目创建工具
3. @weapp-core/ - 核心功能模块  
   - init/ - 初始化工具
   - logger/ - 日志工具
   - schematics/ - 模板生成工具
   - shared/ - 共享工具和类型
4. website/ - 文档网站

## 配置文件
- package.json - 根目录包配置
- turbo.json - Turborepo 配置
- pnpm-workspace.yaml - pnpm 工作区配置
- tsconfig.json - TypeScript 配置
## 其他目录
- .github/ - GitHub 相关配置
- scripts/ - 构建和维护脚本
```
## 1，安装
初始化 pnpm script:init

创建基础目录结构 ：
- 创建 apps 目录（用于存放示例应用）

- 创建 packages 目录（用于存放核心包）

- 创建 @weapp-core 目录（用于存放核心功能模块）

初始化子包 ：
- 为每个子包创建基本的 package.json 文件

- 设置正确的依赖关系和版本号

配置工作区 ：
- 更新 pnpm-workspace.yaml 文件

- 确保所有子包被正确识别为工作区的一部分

生成示例应用 ：
- 在 apps 目录下创建各种示例小程序应用

- 包括原生、TypeScript、Skyline 等不同类型的示例

设置构建配置 ：
- 为每个包创建 tsup.config.ts 或其他构建配置文件

- 确保构建命令能正确工作



脚手架 pnpm create weapp-vite@latest
```undefined
my-weapp-project/
├── src/                    # 源代码目录
│   ├── pages/              # 页面目录
│   │   └── index/          # 首页
│   │       ├── index.wxml  # 页面模板
│   │       ├── index.js    # 页面逻辑
│   │       ├── index.json  # 页面配置
│   │       └── index.wxss  # 页面样式
│   ├── app.js              # 应用逻辑
│   ├── app.json            # 应用配置
│   ├── app.wxss            # 应用样式
│   └── sitemap.json        # 小程序索引配置
├── public/                 # 静态资源目录
├── vite.config.js          # Vite 配置文件
├── project.config.json     # 微信开发者工具项目配置
├── package.json            # 项目依赖和脚本
└── README.md               # 项目说明文档
```
```bash
pnpm i

pnpm dev
pnpm dev -o # 打开微信开发者工具
pnpm open # 开发者工具预览

# 执行初始化命令
npx weapp-vite init
pnpm i

#生成组件命令
pnpm g [filename]
```
## 2，构建
pnpm build 命令生成内容

根据您的 package.json 文件， pnpm build 命令会执行 turbo run build --filter=!./apps/* ，这个命令会构建除了 apps 目录以外的所有包。具体会生成以下内容：

核心包构建产物
1. @weapp-core 目录下的包 ：
	- init 包：生成 dist 目录，包含编译后的 JavaScript 文件
		- logger 包：生成 dist 目录，包含日志工具的编译产物
		- schematics 包：生成 dist 目录，包含模板生成工具的编译产物
	
1. packages 目录下的包 ：
	- weapp-vite：生成 dist 目录，包含主要构建工具的编译产物
		- plugin-vue：生成 Vue 插件的编译产物
		- create-weapp-vite：生成项目创建工具的编译产物
		- 其他工具包的编译产物
	
1. website 目录 ：
	- 生成文档网站的构建产物（除非使用 build:lib 命令排除）
	
构建产物的主要内容
- JavaScript 文件 ：TypeScript 代码编译后的 .js 文件

- 类型声明文件 ：.d.ts 文件，提供类型定义

- Source Map 文件 ：.js.map 文件，用于调试

- 打包后的资源文件 ：可能包含 CSS、图片等

- 元数据文件 ：package.json 等配置文件的复制或修改版本

这些构建产物使得其他包可以引用这些核心包，特别是应用目录下的示例项目可以使用 workspace 引用这些构建好的包。


### 自动构建微信 `npm`
在项目启动时，`weapp-vite` 会自动构建 `npm` 依赖，无需再手动点击微信开发者工具中的 

构建 `npm ，weapp-vite` 中内置了 `2` 种 `npm` 自动构建的策略与 `1` 种手动构建的策略:

1：`weapp-vite` 自动构建 `miniprogram_npm`

在 `package.json` 中 `dependencies` 字段里注册的依赖，会在每次构建运行的时候，被打包工具打包成小程序可以接受的格式，然后输出到 `project.config.json` 里注册的 `miniprogramNpmDistDir` 目录的 `miniprogram_npm` 中去

2：自动内联代码到对应的 `js` 产物中

没有在 `package.json` 中 `dependencies` 字段里注册的依赖，比如注册在 `devDependencies` 里的依赖，或者 `monorepo` 里更高层级的依赖，在代码里引入了之后，会被自动转化成内联代码，整个放入你的 `js` 产物中
```typescript
## 核心构建流程
1. 入口方法 build() ：
   - 这是整个构建过程的入口
   - 首先检查缓存是否过期
   - 获取 packNpmRelationList 配置（从 project.config.json 中读取）
   - 为每个包关系执行构建
2. 依赖处理 buildPackage() ： 
   - 处理单个依赖包
   - 区分两种类型的包：
     - 有 "miniprogram" 字段的包（直接复制）
     - 普通 npm 包（使用 tsup 构建）
   - 递归处理依赖的依赖
## 关键实现细节
1. 依赖分析 ：
   
   - 从 package.json 的 dependencies 字段读取依赖
   - 使用 getPackageInfo 获取依赖包的详细信息
   - 递归处理依赖的依赖
2. 构建方式 ：
   
   - 对于标准小程序组件（有 miniprogram 字段）：使用 copyBuild() 直接复制
   - 对于普通 npm 包：使用 bundleBuild() 通过 tsup 打包
3. 缓存机制 ：
   
   - 使用 dependenciesCacheHash 计算依赖的哈希值
   - 通过 shouldSkipBuild() 判断是否需要重新构建
   - 避免重复构建相同的依赖
4. 输出路径处理 ：
   
   - 从 project.config.json 中读取 miniprogramNpmDistDir 配置
   - 构建到指定目录下的 miniprogram_npm 子目录
## 间接依赖处理
对于 dayjs 和 tinycolor2 这样的间接依赖，它们会在以下情况被构建：

1. 当它们是直接依赖的依赖项时（在 buildPackage() 方法中递归处理）
2. 当代码中直接引用它们，而它们是其他包的依赖时
这就解释了为什么即使没有在 package.json 中显式声明，这些包也会出现在 miniprogram_npm 目录中。

## 总结

```
## 手动构建
执行命令 `weapp-vite npm` , 会调用 `微信开发者工具` -> `工具` -> 构建 `npm` 的功能，来手动构建 `miniprogram_npm`。

这相当于你在 `微信开发者工具` 里手动点了一遍 `工具` -> 构建 `npm` 功能。

> `weapp-vite npm` 别名 `weapp-vite build:npm` / `weapp-vite build-npm`



为什么要构建小程序的npm：

微信开发者工具提供的"构建 npm"功能与 weapp-vite 项目中的 pnpm build 命令是两个不同的概念，它们的作用不同。微信开发者工具中的"构建 npm"功能主要是用来处理小程序项目中使用的 npm 包，将它们转换为小程序可以使用的形式。这个功能主要解决的是小程序环境中使用 npm 包的问题。

而 weapp-vite 项目中的 pnpm build 命令是用来构建 monorepo 项目中各个子包之间的依赖关系，确保所有内部依赖都被正确编译和链接。

如果你不运行 pnpm build ，直接在微信开发者工具中使用"构建 npm"功能，可能会遇到以下问题：
1. 内部依赖包可能没有被正确编译，导致引用失败

1. TypeScript 代码可能没有被转换为 JavaScript

1. 各个子包之间的依赖关系可能没有被正确解析

所以，对于 weapp-vite 这样的 monorepo 项目，建议先执行 pnpm build 命令构建内部依赖，然后再在微信开发者工具中使用"构建 npm"功能处理外部 npm 包。
```power
npx weapp-vite npm
如果您是在项目目录中，可以使用相对路径：
node ./node_modules/.bin/weapp-vite npm
您可以将 weapp-vite 安装为全局包：
pnpm add -g weapp-vite
如果您是在 monorepo 中的某个子项目中，可能需要使用项目特定的脚本：
pnpm weapp-vite npm
检查 package.json 中是否有相关的脚本命令
pnpm run dev
```

### 最佳实践 
根目录的 pnpm install 会
- 安装所有共享依赖

- 设置 workspace 链接，使子项目能够引用内部包

- 构建内部依赖包（如 weapp-vite 核心包）

子目录安装的作用 ：
- vite-native 目录下的 pnpm install 会安装该应用特有的依赖

- 处理该应用的 postinstall 脚本（如 weapp-tw patch ）

```power
# 先在根目录安装并构建
cd f:\project_space\weapp-vite
pnpm install
pnpm build

# 然后在子项目目录安装（如果需要）
cd f:\project_space\weapp-vite\apps\vite-native
pnpm install

如果有冲突或者安装错误，清理并重新安装依赖：
pnpm script:clean
pnpm build:pkgs #构建核心包：
```
#### pnpm script:clean 
命令实际上是执行 monorepo clean 命令，这是由 @icebreakers/monorepo 包提供的功能。根据项目配置，这个命令会清理以下内容：
1. 所有子包中的 node_modules 目录

1. 构建产物目录，通常包括：

- dist 目录

- lib 目录

- .vite 缓存目录

1. 临时文件，如 .DS_Store 、 *.log 等

1. 测试覆盖率报告目录 coverage

这个命令主要用于以下场景：
- 解决依赖冲突问题

- 在切换分支前清理环境

- 在遇到奇怪的构建问题时进行"完全重置"

- 释放磁盘空间

#### pnpm build:pkgs 和 pnpm build 的区别
- pnpm build 构建除了 apps 目录以外的所有包

- pnpm build:pkgs 只构建 packages 和 @weapp-core 目录下的包

- build 适合完整构建项目（除应用外）

- build:pkgs 适合只构建核心包，不包括文档网站等


## 3，turbo
turbo.json 是 Turborepo 工具的配置文件 Turborepo 是由 Vercel 公司开发的一个高性能构建系统，专为 JavaScript 和 TypeScript monorepo 项目设计。它最初是由 Jared Palmer 创建的独立项目，后来被 Vercel 收购。

turbo.json 是 Turborepo 的配置文件，用于管理 monorepo 项目中的构建和任务执行。在 weapp-vite 项目中，它主要用于优化构建流程、缓存构建结果和定义任务依赖关系。
```yaml
.turbo/
├── turbo-build.log       # 构建日志
├── turbo-dev.log         # 开发模式日志
└── cache/                # 缓存文件
    └── [hash].json       # 缓存元数据
```
## 主要功能
1. 定义管道 (pipeline) ：指定各种任务（如构建、测试、lint）的执行顺序和依赖关系

1. 缓存配置 ：确定哪些任务输出可以被缓存，提高重复构建的速度

1. 并行执行 ：允许没有依赖关系的任务并行运行，提高构建效率

## weapp-vite 中的应用
在 weapp-vite 项目中， turbo.json 可能包含以下配置：
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "lib/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
```
这个配置表示：
- build 任务依赖于其他包的 build 任务完成

- test 任务依赖于当前包的 build 任务完成

- dev 任务不会被缓存，因为它是开发环境

- 构建输出会保存在 dist 和 lib 目录中

通过这种配置，当你运行 pnpm build 时，Turborepo 会自动处理包之间的依赖关系，并且只重新构建发生变化的包，大大提高了构建效率。



这个项目使用了多种构建工具的组合，主要包括：
1. Turborepo (turbo) ：作为 monorepo 的任务编排工具，负责协调各个包的构建、测试等任务。从根目录的 package.json 中可以看到大量使用了 turbo run 命令。

1. tsup ：作为实际的 TypeScript 构建工具，用于将 TypeScript 代码编译为 JavaScript。这是一个基于 esbuild 的高性能构建工具，适合库的打包。

1. unbuild ：某些包可能使用了 unbuild 作为构建工具，它提供了更多的配置选项。

项目的构建流程大致是：
- Turborepo 负责调度和并行执行各个包的构建任务

- 各个包内部使用 tsup 或 unbuild 进行实际的代码编译和打包

- TypeScript 编译器 (tsc) 主要用于类型检查，而不是实际的代码生成

从 tsconfig.json 的配置来看，项目使用了现代的 ESM 模块系统和打包工具，这与 tsup 的定位相符。
## 3，添加微信小程序的类型声明（type definitions）
有以下几个重要原因：
1. 类型提示和智能补全
	- 在开发时可以获得微信小程序 API 的智能提示
		- 编辑器能够自动补全方法名、参数等
		- 可以看到函数参数的类型说明和返回值类型
	
1. 类型检查和错误预防
	- TypeScript 编译器能够在编译时检查微信小程序 API 的使用是否正确
		- 避免常见的类型错误，如参数类型不匹配
		- 提前发现潜在问题，减少运行时错误
	
1. 代码质量保证
	- 确保使用正确的微信小程序接口和组件
		- 提供更好的代码可维护性
		- 方便团队协作开发
	
例如，当你使用微信小程序的 API 时：
```typescript
// 有类型声明时，可以获得完整的类型提示
wx.request({
  url: 'xxx',
  success: (res) => {
    // res 的类型会被正确推断
    const data = res.data;
  }
});
```
这就是为什么在 tsconfig.json 中添加了 miniprogram-api-typings 的类型声明。它能让你的开发体验更好，代码更可靠。

4，Skyline 是微信小程序的新一代渲染引擎
- 性能提升

- 采用自研渲染引擎，大幅提升渲染性能

- 优化页面切换和动画效果的流畅度

- 减少内存占用

- 新特性支持

- 支持更多现代化的 CSS 特性

- 提供更好的动画性能

- 支持 3D 变换效果

- 开发体验改进

- 提供更准确的错误提示

- 支持更多调试功能

- 更好的性能分析工具

- 兼容性说明

- 仅支持 64 位 Windows 系统

- 需要较新版本的微信开发者工具

- 部分旧的 WXML 语法可能需要调

## 4，生成脚手架
### 生成目录+组件 
weapp-vite g [outDir] 
### 生成 page 或者 app 类型模板
你想生成 `page` 类型的，可以执行 `pnpm g [outDir] --page`(`--page` 可以简写为 `-p`)

你想生成 `app` 类型的，可以执行 `pnpm g [outDir] --app`(`--app` 可以简写为 `-a`)
## 5，生态集成
### Tailwindcss 集成 自动集成
### Vue-mini 集成
Vue Mini 是一个基于 Vue 3 的小程序框架，它简单，强大，高性能。

你可以使用 Vue 3 的响应式数据 + 组合式 API 开发小程序。

文档地址: [https://vuemini.org/](https://vuemini.org/)
### tdesign-miniprogram 集成
TDesign 微信小程序组件库。

文档地址:https://tdesign.tencent.com/miniprogram/getting-started
### Vant Weapp 集成
[官方文档](https://vant-ui.github.io/vant-weapp/#/home)

轻量、可靠的小程序 UI 组件库



Vant Weapp和TDesign都是优秀的小程序UI组件库，它们的主要区别在于：

1. Vant Weapp由有赞团队开发，组件数量更多，社区更活跃，文档更完善，但体积相对较大；

2. TDesign由腾讯开发，设计规范更严格，组件体积更小，性能更好，但组件数量相对较少；

3. 在使用体验上，Vant Weapp的API设计更简单直观，而TDesign的组件更注重可定制性；

4. Vant Weapp更适合快速开发和功能丰富的项目，TDesign更适合对性能和设计规范要求较高的项目。
### miniprogram-computed 集成
miniprogram-computed是微信小程序的一个扩展库，用于实现类似Vue中computed计算属性的功能。它可以根据现有数据派生出新的数据，当依赖的数据发生变化时，计算属性会自动更新。这在处理复杂的数据转换和状态管理时特别有用，可以让代码更简洁、更易维护。
## 核心示例应用
#### 基础示例
1. vite-native
	- 基础的原生微信小程序示例
		- 使用 JavaScript 开发
		- 集成了 Tailwind CSS、Lodash、Dayjs 等工具库
		- 包含 worker 示例
	
1. vite-native-skyline
	- 使用 Skyline 渲染引擎的微信小程序示例
		- Skyline 是微信小程序的新一代渲染引擎，提供更好的性能
	
1. vite-native-ts
	- TypeScript 版本的微信小程序示例
		- 提供类型安全的开发体验
		- 使用 glass-easel 组件框架
	
1. vite-native-ts-skyline
	- 结合 TypeScript 和 Skyline 渲染引擎的示例
		- 同时支持类型安全和高性能渲染
	
#### 模板项目
1. weapp-vite-template
	- 基础的 weapp-vite 项目模板
		- 提供快速开始开发的基础结构
	
1. weapp-vite-tailwindcss-template
	- 集成 Tailwind CSS 的项目模板
		- 用于快速开发带有现代 CSS 框架的小程序
	
1. weapp-vite-tailwindcss-tdesign-template
	- 集成腾讯 TDesign UI 组件库的模板
		- 同时支持 Tailwind CSS
	
1. weapp-vite-tailwindcss-vant-template
	- 集成有赞 Vant UI 组件库的模板
		- 同时支持 Tailwind CSS
	
#### 其他示例
1. weapp-wechat-zhihu
	- 知乎微信小程序版示例
		- 展示了如何构建复杂的社交类小程序
	
1. ast
	- 展示 AST (抽象语法树) 解析和处理的示例
		- 用于理解 weapp-vite 的代码转换机制
	
1. playground
	- 简单的测试环境
		- 用于快速验证功能和概念
	
