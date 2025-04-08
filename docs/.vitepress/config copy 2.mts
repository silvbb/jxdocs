// 在文件顶部添加立即执行的日志
console.log(
  "\x1b[42m%s\x1b[0m",
  "\n========== console: 开始加载 VitePress 配置文件 ==========",
);

import { defineConfig } from "vitepress";
import { head } from "./config/head";
import { markdown } from "./config/markdown";
import { themeConfig as JxthemeConfig } from "./config/theme";

import UnoCSS from "unocss/vite";

import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
const customElements = ["mjx-container"];

// 它的路径解析是相对于配置文件的位置，而不是相对于运行时的工作目录。

const links: any[] = [];

// 添加状态跟踪变量
let isFirstTransform = true;

import { debugPlugin } from "./plugins/debug-plugin";
import { markdownPreprocessPlugin } from "./plugins/markdown-preprocess";

// 确保在所有环境中使用一致的 base 路径
const base = "/"; // 本地开发和生产环境都使用根路径

/** 整个站点的配置defineConfig
 *  分开几个小配置单独文件：
 *  主题配置:JxthemeConfig 其中包含路由 侧边栏 导航栏 页脚等UI元素
 *  head  HTML头部标签
 *  markdown  Markdown解析配置
 *
 * */
export default defineConfig({
  lang: "zh-Hans",
  title: "铁骑的知识库",
  description: "docs for Jxblog",
  appearance: "dark", // 设置默认为暗黑模式
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: base, // 使用统一的 base 路径
  head: head,
  markdown: markdown,
  vue: {
    template: {
      compilerOptions: {
        //当 Vue 在模板中遇到 <mjx-container> 标签时，它会将其视为普通的 HTML 自定义元素，而不是尝试将其解析为 Vue 组件
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
  vite: {
    //通过 Vite 的插件 API 钩子（如 configResolved 和 transform ）在构建过程的不同阶段输出日志。
    plugins: [debugPlugin(), UnoCSS(), markdownPreprocessPlugin()],
    logLevel: "info",
    build: {
      assetsInlineLimit: 0, // 禁用小资源内联，确保所有资源都作为单独的文件
    },
  },
  transformHtml: (_, id, { pageData }) => {
    console.log("\n\n========== 开始 transformHtml ==========\n\n");
    // 只在第一次调用时输出日志
    if (isFirstTransform) {
      console.log("开始处理 HTML 文件", "\x1b[36m");
      isFirstTransform = false;
    }

    //生成网站的 sitemap.xml,Sitemap 是一个XML文件，它列出了网站上的所有页面，帮助搜索引擎更好地索引你的网站内容。
    if (!/[\\/]404\.html$/.test(id))
      //是否是 404 页面,如果不是 404 页面，则将该页面的信息添加到 links 数组中
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"), //页面的相对路径
        lastmod: pageData.lastUpdated, //页面的最后更新时间
      });
  },

  buildEnd: ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: "https://elog.1874.cool/" });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    console.log("\x1b[42m%s\x1b[0m", "========== 构建结束 ==========");
  },
  themeConfig: JxthemeConfig,
});

// 在文件底部添加
// console.log(
//   "\x1b[42m%s\x1b[0m",
//   "\n\n========== VitePress 配置成功 ==========\n\n",
// );
