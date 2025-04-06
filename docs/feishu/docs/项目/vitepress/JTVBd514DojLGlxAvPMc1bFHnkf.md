---
title: vitepress
urlname: JTVBd514DojLGlxAvPMc1bFHnkf
date: '2025-03-18 12:39:09'
updated: '2025-04-06 20:52:38'
---
# vitepress
官方文档：
## 1，VitePress 的加载和执行顺序
当你运行 VitePress 时，以下是大致的执行顺序：
1. VitePress 核心启动

1. VitePress 开始扫描项目结构和侧边栏相关文件

1. 在处理侧边栏时，它会读取和执行相关的生成函数（如 genFeiShuSideBar ）

1. 然后才完整加载和执行 config.mts 文件


## 2，VitePress 里的Markdown 解析器处理
Markdown 解析器对代码块的处理确实有些复杂。当解析器遇到代码块（用 ``` 包围的内容）时，它通常应该只是将其视为纯文本，而不去执行或解析其中的代码。



但在 VitePress 中，情况变得更复杂了，主要有以下几个原因：
1. 特殊指令解析 ：VitePress 扩展了 Markdown 语法，添加了一些特殊指令，如 <!--@include:--> 用于包含其他文件内容。解析器会尝试处理这些指令，即使它们在代码块中。

1. 导入语句处理 ：当代码块中包含类似 import 或 require 的语句时，VitePress 可能会错误地将其解释为实际的模块导入，而不是代码示例。

1. 代码转换器 ：VitePress 使用了代码转换器（如 Twoslash）来增强代码块的展示。这些转换器需要解析代码块内容，有时会导致意外的行为。

解决这个问题的方法是修改 Markdown 配置，让解析器知道代码块中的内容应该被视为纯文本，而不是执行指令。我们可以在 fence 规则中添加特殊处理：

VitePress中Markdown文件的解析过程:
```plaintext
VitePress对Markdown文件的解析是一个多阶段的过程，主要包括以下步骤：

## 1. 文件加载
当访问一个页面时，VitePress首先加载对应的Markdown文件。

## 2. Frontmatter解析
解析器首先处理文件顶部的YAML格式的frontmatter部分（被 --- 包围的区域），提取元数据如标题、日期等。
---
title: markdown拓展
date: '2025-03-25 01:23:01'
---

## 3. Markdown转HTML
使用markdown-it及其插件将Markdown内容转换为HTML：
1. 标记化(Tokenization) : 将Markdown文本分解为标记(tokens)
2. 语法分析 : 识别各种Markdown语法元素(标题、段落、列表、代码块等)
3. 转换处理 : 将标记转换为HTML元素

## 4. 特殊指令处理
处理VitePress特有的扩展语法：
- 容器指令 ( ::: info )
- 代码块增强 ( [!code hl] )
- 文件包含 ( <!--@include:--> )
- 代码导入 ( <<< @/filepath )
- Twoslash处理 : 对TypeScript代码块进行类型分析和增强

md.renderer.rules.fence 就是处理代码块 tokens 的规则，即用三个反引号包围的多行代码块,它会在 tokens 已经生成之后，但在最终渲染为 HTML 之前被调用。
如果你想处理其他类型的 Markdown 元素，需要修改对应的渲染规则。例如：
- md.renderer.rules.paragraph_open 和 md.renderer.rules.paragraph_close 处理段落
- md.renderer.rules.heading_open 和 md.renderer.rules.heading_close 处理标题
- md.renderer.rules.code_inline 处理行内代码,如 `code`
- md.renderer.rules.html_block 处理 HTML 块
- md.renderer.rules.html_inline 处理行内 HTML

codeTransformers 主要用于处理代码块的语法高亮和特殊功能(如 Twoslash 类型提示），而不是用于处理整个 Markdown 文档中的特殊指令。

## 5. Vue组件解析
处理Markdown中嵌入的Vue组件和模板语法：

{{ $frontmatter.title }}
<CustomComponent />


## 6. 代码高亮
使用Shiki或Prism对代码块进行语法高亮处理。

## 7. 链接处理
处理内部链接、外部链接，应用特殊属性如 target="_blank" 。

## 8. 最终渲染
将处理后的HTML与Vue组件结合，生成最终的页面内容。

## 9. 客户端激活(Hydration)
在浏览器中，Vue接管页面，使交互性组件生效。

在这个过程中，Twoslash是一个特殊的处理器，它专门用于增强TypeScript代码块，提供类型提示和代码分析功能，就像你在示例中看到的那样。
```
## 3,VitePress 特殊指令
VitePress 扩展了多种 Markdown 语法和特殊指令，让文档更加丰富和功能强大。

以下是 VitePress 支持的主要特殊指令：
```markdown
### 1. 文件包含指令
这个指令可以将其他 Markdown 文件的内容包含到当前文件中。
<!--@include: ./path/to/file.md-->

还可以指定行范围：
<!--@include: ./path/to/file.md{3,10}-->  <!-- 包含第3行到第10行 -->
<!--@include: ./path/to/file.md{3,}-->    <!-- 包含第3行到文件结尾 -->

### 2. 代码块导入
可以直接导入代码文件，
<<< @/filepath
还可以指定行号和语言：
<<< @/filepath{highlightLines}
<<< @/filepath{highlightLines} [language]

### 3. 代码块高亮和焦点
```js{1,3-5}
// 高亮第1行和第3-5行
```js [!code focus]
// 聚焦这一行
```js [!code hl]
// 高亮这一行

### 4. 容器指令
::: info
信息容器
:::

::: tip
提示容器
:::

::: warning
警告容器
:::

::: danger
危险容器
:::

::: details
可折叠的详情容器
:::

### 5. 代码组
::: code-group
```js [文件名1]
// 代码1

// 代码2


### 6. 自定义容器标题


```markdown
::: info 自定义标题
这里是内容
:::
 ```

### 7. frontmatter 变量引用
{{ $frontmatter.title }}

### 8. 链接属性增强
[链接文本](链接地址){target="_blank" rel="noopener"}

### 9. 数学公式支持 (通过插件)
$$ 
f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi
$$

### 10. 任务列表
```markdown
- [x] 已完成任务
- [ ] 未完成任务
 ```
```
## 4，markdown-it 
markdown-it 的 md.core.ruler 包含多种规则，这些规则按顺序执行，用于处理 Markdown 文本的解析过程。以下是主要的核心规则：


1. normalize - 标准化输入文本，处理行结束符等

1. block - 解析块级元素（如段落、标题、列表等）

1. inline - 解析行内元素（如粗体、斜体、链接等）

1. linkify - 将纯文本 URL 转换为链接

1. replacements - 处理排版替换（如引号、破折号等）

1. smartquotes - 处理智能引号

1. references - 处理引用定义

1. abbr - 处理缩写

1. footnote_tail - 处理脚注尾部

1. footnote_ref - 处理脚注引用

```plaintext
md.core.ruler.before("normalize", ...) 添加了一个自定义规则，这意味着您的规则会在 normalize 规则之前执行，这是处理文本的最早阶段之一

md.renderer.rules.fence = (...args) => {
```
## 5，自定义plugins
debugPlugin() 有颜色的log

markdownPreprocessPlugin() 提前处理一些含有特殊代码的代码块（比如:<!--@include <<<）
## 2，持续集成
### 自动化流程
![image](/feishu/asset/images/Gwl6bAFIgoqonYxTi5NcUGcfnOk.png)
### 语雀示例
语雀 + webhooks + serverless api + GitHub Actions + Github Pages 持续集成
![image](/feishu/asset/images/UWOzbRUFnoxcCVxXV2qcmhHFnbc.png)
### 语雀 webhooks
在语雀知识库 - 更多设置 - 消息推送中可配置语雀webhooks，填写一个支持POST请求的APi链接即可（这里以serverless api为例）。当文档更新时，语雀会调用这个API进行推送

> 令人遗憾的是，语雀将 webhooks 收费了  
> 未开通会员的语雀小伙伴可直接手动调用API触发Github Actions进行自动化构建&部署  
> ⚠️ 知识库配置了「自动发布」功能后，文档的 更新/发布 操作暂不会发送 webhooks
![image](/feishu/asset/images/D697b9tGco05mYxuCx6cV0xTnxe.png)
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
### Notion示例
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
![image](/feishu/asset/images/LCTbbRG2roNNdxxYsJIcS8ymnJg.png)
#### 第二步：收到Notion消息后发送自定义Http请求
将调用Github Actions的 serverless api 填入即可
![image](/feishu/asset/images/EdbgbWFMuoo3B3xPCyecb5ccnub.png)
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

