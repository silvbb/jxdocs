import { appendFileSync } from 'fs'
import { join } from 'path'

// 使用更可靠的日志方法
const logFile = join(process.cwd(), 'vitepress-debug.log')

function debugLog(message: string) {
  // 同步写入文件
  appendFileSync(logFile, `${new Date().toISOString()} - ${message}\n`)
  // 使用 setImmediate 确保日志在事件循环中输出
  setImmediate(() => {
    process.stdout.write(`[VitePress] ${message}\n`)
  })
}
import type { Plugin } from 'vite'
// 在关键位置添加日志
debugLog('配置文件开始加载')
// 在文件顶部添加立即执行的日志
console.log('\n========== 开始加载 VitePress 配置文件 ==========\n')
// 在文件最顶部添加
process.stdout.write('\n========== 开始加载 VitePress 配置文件 ==========\n')
// 定义一个强制输出的日志函数
function forceLog(message: string) {
  process.stdout.write(`[VitePress配置] ${message}\n`)
}

import { defineConfig } from "vitepress";
import { genFeiShuSideBar, genFlowUsSideBar, genNotionSideBar, genYuqueSideBar } from "./theme/utils/route";
import { sidebar } from './config/sidebar'
import { FeiShuSVG, FlowUsSVG, NotionSVG, YuQueSVG } from "./theme/utils/assists";
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import mathjax3 from 'markdown-it-mathjax3';
const customElements = ['mjx-container'];
//代码使用 createRequire 创建了一个基于当前模块 URL 的 require 函数，
// 它的路径解析是相对于配置文件的位置，而不是相对于运行时的工作目录。
import { createRequire } from 'module';
import { nav } from "./config/nav";
import { head } from "./config/head";
import { markdown } from "./config/markdown";

import { themeConfig as JxthemeConfig } from './config/theme';

const require = createRequire(import.meta.url);

const links: any[] = []

// 添加状态跟踪变量
let isFirstTransform = true;

// 检查是否启用了调试模式
const isDebug = process.env.DEBUG || process.env.VITEPRESS_LOG;

// 改进的日志函数
// function log(message: string, color = '\x1b[36m') {
//   if (isDebug) {
//     const timestamp = new Date().toLocaleTimeString();
//     process.stdout.write(`${color}[${timestamp}] ${message}\x1b[0m\n`);
//   }
// }
import { debugPlugin } from './plugins/debug-plugin'
/**主题配置已经在 config.mts 中统一管理
 * 分开几个小配置单独文件
 *  侧边栏:sidebar
 *  主题单独配置:JxthemeConfig
 * 
 * */ 

export default defineConfig({
  lang: "zh-Hans",
  title: 'JxBlog',
  description: 'doc for Jxblog',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: head,
  markdown:markdown ,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },vite: {
    plugins: [debugPlugin()],
    logLevel: 'info',
  },
  transformHtml: (_, id, { pageData }) => {
    console.log("\n\n========== 开始加载 VitePress 配置 ==========\n\n");
    // 只在第一次调用时输出日志
    if (isFirstTransform) {
      console.log('开始处理 HTML 文件', '\x1b[36m');
      isFirstTransform = false;
    }

    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated
      })
  },

  buildEnd: ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://elog.1874.cool/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    console.log('\x1b[42m%s\x1b[0m', '========== 构建结束 ==========');
  },
  themeConfig: {
    ...JxthemeConfig,
    search: {
      provider: 'local'
    },
    outline: [2,6],
    nav: nav,
    siteTitle: '铁骑的知识库', // 标题
    sidebar: {
      ...sidebar,
      // 放到config。mts里不执行
      //'/yuque/': genYuqueSideBar('/yuque'),
      //'/yuque-pwd/': genYuqueSideBar('/yuque-pwd'),
      // '/notion/': genNotionSideBar('/notion'),
      //'/flowus/': genFlowUsSideBar('/flowus'),
      //'/feishu/': genFeiShuSideBar('/feishu')
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    socialLinks: [
      { icon: { svg: YuQueSVG }, link: "https://www.yuque.com/1874w/elog-docs" },
      { icon: { svg: NotionSVG }, link: "https://1874.notion.site/0aa9217e5bcc46768bdae424fddcbc28" },
      { icon: { svg: FeiShuSVG }, link: "https://yi0dk0huz70.feishu.cn/drive/folder/Z4AZfkm29l5KWSdsHbncmbbmnvc" },
      { icon: { svg: FlowUsSVG }, link: "https://flowus.cn/1874/share/90398607-98f1-4ff0-873c-7c3ed526a55c" },
      { icon: 'github', link: "https://github.com/LetTTGACO/elog" },
      {
        icon: {
          svg: `<svg width="33" height="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.8 204">
                  <title>ContiNew Admin</title>
                  <path fill="#307AF2" d="M86.7,0l88,51v.2l-16.3,9.4v-.2L86.7,18.9Zm71.8,143.5,16.3,9.4v.2L86.8,204h0l-16.3-9.4,16.3-9.4h0l71.7-41.5v-.2Z"/>
                  <path fill="#12D2AC" d="M16.3,143.5v.2L58,167.8l-16.3,9.4L0,153.1v-.2Z"/>
                  <path fill="#12D2AC" d="M104.1,93,15.9,143.8l-.2-.1V124.9l.2.1L87.7,83.6,104.1,93Z"/>
                  <path fill="#0057FE" d="M88.1,0,.1,51v.2l16.3,9.4v-.2L88.1,18.9Z"/>
                  <path fill="#307AF2" d="M.1,50.9.2,152.6l.2.1,16.3-9.4-.2-.1-.1-82.9L.1,50.9Z"/>
                  <path fill="#0057FE" d="M174.7,50.9l-.1,101.7-.2.1-16.3-9.4.2-.1.1-82.9Z"/>
                  <path fill="#12D2AC" d="M41.7,158.5l16.1,9.4,100.6-58.7V90.4Z"/>
                </svg>`,
        },
        link: "https://admin.continew.top/",
      }
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2022-present'
    },
  },
})

// 在文件顶部添加
// console.log("\n\n========== VitePress 配置成功 ==========\n\n");

