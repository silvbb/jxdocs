import type { MarkdownOptions } from "vitepress";
import mathjax3 from "markdown-it-mathjax3";
import footnote from "markdown-it-footnote";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import { createFileSystemTypesCache } from "@shikijs/vitepress-twoslash/cache-fs";

//代码使用 createRequire 创建了一个基于当前模块 URL 的 require 函数，
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const markdown: MarkdownOptions = {
  // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  lineNumbers: true, // 启用行号
  container: {
    tipLabel: "提示",
    warningLabel: "警告",
    dangerLabel: "危险",
    infoLabel: "信息",
    detailsLabel: "详细信息",
  },
  toc: { level: [1, 2] }, //只显示一级二级标签
  // 添加 linkify 配置
  linkify: true, // 启用自动链接转换

  codeTransformers: [
    //提供类似 VS Code 的悬停提示,增强代码块的类型提示功能,处理 TypeScript 代码的类型信息
    transformerTwoslash({
      processHoverInfo: (info) => info.replace(/_unocss_core\./g, ""),
      // 添加以下配置增强 Twoslash 功能
      //将 explicitTrigger 设置为 true ，这样 Twoslash 只会在显式标记的代码块上启用，而不是尝试处理所有代码。
      explicitTrigger: true, // 允许在所有 TypeScript 代码块上启用
      typesCache: createFileSystemTypesCache(),
      // 添加 twoslashOptions 配置
      twoslashOptions: {
        compilerOptions: {
          lib: ["es2022", "dom"],
          strict: true,
          moduleResolution: 2, // 使用数字 2 代表 "node" 0 代表 "classic" 1 代表 "node10" 3 代表 "nodenext"
          target: 99, //- 0 代表 "ES3"          - 1 代表 "ES5"          - 2 代表 "ES2015"          - 3 代表 "ES2016"         - 4 代表 "ES2017"          - 5 代表 "ES2018"          - 6 代表 "ES2019"          - 7 代表 "ES2020"          - 8 代表 "ES2021"          - 99 代表 "ESNext"（最新的 ECMAScript 特性）
          jsx: 1, // Add JSX support (1 = React)
          allowJs: true, // Allow JavaScript files
          esModuleInterop: true, // Better module compatibility
        },
      },
      // 添加错误处理
      onTwoslashError: (err, code, lang, options) => {
        console.warn("Twoslash Error:", err);

        // 返回带有错误提示的代码块，而不是空字符串
        return `<div class="language-plaintext"><pre><code>// 文档中有未能识别的代码：${err.message}\n// 请将代码放入正确的代码块中\n${code}</code></pre></div>`;

        //return ""; // 返回空字符串或原始代码
      },
    }),
  ],

  config: (md) => {
    md.use(mathjax3);
    md.use(require("markdown-it-task-lists")); //支持待办事项
    md.use(footnote);
    md.use(groupIconMdPlugin);

    // 添加自定义的错误处理
    // 在更早的阶段拦截特殊指令
    // 添加一个自定义规则，在解析前处理源文本
    md.core.ruler.before(
      "normalize",
      "escape_vitepress_directives",
      function (state) {
        // 更彻底地处理include指令 - 直接替换为无效指令

        return true;
      },
    );

    // 保留原有的 fence 规则处理
    const defaultFence = md.renderer.rules.fence!;
    md.renderer.rules.fence = (...args) => {
      const [tokens, idx, options, env, self] = args;
      const token = tokens[idx];

      try {
        return defaultFence(...args);
      } catch (error) {
        console.error("代码块渲染错误:", error);
        return `<div class="language-error"><pre><code>// 文章中有未能识别的MD组件
    // 错误原因: ${error.message}
    // 请检查代码块语法或文件引用路径</code></pre></div>`;
      }
    };

    // 添加全局错误处理，防止整个页面崩溃
    const originalRender = md.render;
    md.render = function (src, env) {
      try {
        return originalRender.call(this, src, env);
      } catch (error) {
        console.error("Markdown渲染错误:", error, env?.path);
        return `<div class="markdown-error">
          <h2>文章渲染出错</h2>
          <p>文章中有未能识别的MD组件，但您仍然可以浏览其他内容。</p>
          <p>错误原因: ${error.message}</p>
          <p>文件路径: ${env?.path || "未知"}</p>
          <p>建议：请确保所有代码都放在正确的代码块中，并检查文件引用路径是否正确。</p>
        </div>`;
      }
    };

    // md.use(groupIconMdPlugin, {
    //   scale: 1.2,
    //   collections: ['logos', 'vscode-icons', 'carbon']
    // });

    // 添加自定义的代码块处理
    // 修改代码块处理逻辑
    //  // 设置HTML选项，允许在Markdown中使用HTML
    //   md.options.html = true;

    //   // 禁用HTML标签验证
    //   const originalValidateLink = md.validateLink;
    //   md.validateLink = (url) => {
    //     // 对于所有<>形式的内容，直接返回true，不进行验证
    //     if (url.includes('<') && url.includes('>')) {
    //       return true;
    //     }
    //     return originalValidateLink(url);
    //   };

    //   // 重写HTML块处理器，简单地将HTML标签作为文本处理
    //   const originalHtmlBlock = md.renderer.rules.html_block;
    //   md.renderer.rules.html_block = function(tokens, idx, options, env, self) {
    //     // 如果内容包含<>标签，直接返回原始内容
    //     if (tokens[idx].content.match(/<[^>]+>/)) {
    //       return `<div class="html-content">${tokens[idx].content}</div>`;
    //     }
    //     // 添加检查确保originalHtmlBlock存在
    //     return originalHtmlBlock ? originalHtmlBlock(tokens, idx, options, env, self) : '';
    //   };

    // const defaultFence = md.renderer.rules.fence!;
    // md.renderer.rules.fence = (...args) => {
    //   const [tokens, idx] = args;
    //   const token = tokens[idx];

    //   // 处理 undefined 语言标识符
    //   if (token.info === 'undefined') {
    //     // 将 undefined 代码块转换为普通段落
    //     return `<div class="markdown-plain-text">${token.content}</div>`;
    //   }

    //   return defaultFence(...args);
    // };

    // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options);

      // 添加调试信息
      // console.log('处理标题:', tokens[idx].tag, env.path);

      if (tokens[idx].tag === "h1") {
        // console.log('找到h1标题，添加ArticleMetadata组件');
        htmlResult += `\n<ClientOnly><ArticleMetadata v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
        // 修改组件引用方式，确保无条件渲染
        // htmlResult += `\n<ClientOnly><div class="article-metadata-wrapper"><ArticleMetadata :article="$frontmatter" /></div></ClientOnly>`;
      }
      return htmlResult;
    };
  },
};
