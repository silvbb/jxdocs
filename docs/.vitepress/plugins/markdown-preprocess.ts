import type { Plugin } from "vite";

/**
 * Markdown 预处理插件
 * 在 VitePress 处理 Markdown 文件之前拦截并修改特殊指令
 */
export function markdownPreprocessPlugin(): Plugin {
  return {
    name: "vitepress-preprocess-markdown",
    enforce: "pre",
    transform(code: string, id: string) {
      if (id.endsWith(".md")) {
        console.log(`特殊处理Markdown文件: ${id}`);

        // 处理特殊指令
        code = code.replace(
          /<!--\s*@include:([^>]+?)-->/g,
          "<!-- @include-disabled:$1 -->",
        );
        code = code.replace(/<<<\s+([^\n]+)/g, "&lt;&lt;&lt; $1-disabled");
        code = code.replace(/:::/g, "::");
        code = code.replace(/\{\{\s*\$frontmatter/g, "{{ frontmatter");
        code = code.replace(/\[!code\s+/g, "[code ");

        return code;
      }
      return undefined;
    },
  };
}
