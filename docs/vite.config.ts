import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { debugPlugin } from "./.vitepress/plugins/debug-plugin";
import { markdownPreprocessPlugin } from "./.vitepress/plugins/markdown-preprocess";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  //控制依赖预构建的关键部分
  optimizeDeps: {
    //exclude 数组：指定哪些依赖不需要被预构建
    exclude: ["vue"], // 排除Vue优化
    //  exclude: ["vitepress"],
    //include 数组：指定哪些依赖需要被预构建
    // include: [
    //   "vue",
    //   "@arco-design/web-vue",
    //   "@arco-design/web-vue/es/icon",
    //   "@arco-design/web-vue/es/tag/style/css.js",
    //   "blueimp-md5",
    //   "dayjs",
    //   "dayjs/locale/zh-cn",
    //   "dayjs/plugin/relativeTime",
    //   "element-plus",
    // "d3-interpolate",
    // "dayjs",
    // "dayjs/locale/zh-cn",
    // "dayjs/plugin/relativeTime",
    // "blueimp-md5",
    // ], // 添加这行来解决 d3-interpolate 的问题
    // 添加强制重新优化
    // force: true,
    // 使用 esbuild 优化依赖
    // esbuildOptions: {
    //   target: "es2020",
    // },
  },
  server: {
    host: "0.0.0.0", // 绑定到所有网络接口
    port: 4172,
    watch: {
      usePolling: true, // 使用轮询方式监听文件变化
      interval: 1000, // 轮询间隔（毫秒）
      //   // 监听这些文件的变化
      //   ignored: [
      //     "**/node_modules/**",
      //     // 忽略所有文件，除了 .vitepress/theme 目录下的文件
      //     "!**/.vitepress/theme/**",
      //   ],
    },
    hmr: {
      overlay: false,
    },
  },
  // 如果你想启用缓存，可以在这里添加
  cacheDir: ".vite_cache",
  preview: {
    host: "0.0.0.0", // 绑定到所有网络接口
    port: 4173, // 预览服务器端口 (docs:preview)
  },
  logLevel: "info",
  // 如果你想启用缓存，可以在这里添加

  build: {
    // 增加并行处理能力
    minify: "esbuild", //minify: "terser",

    assetsInlineLimit: 0, // 禁用小资源内联，确保所有资源都作为单独的文件
    cssCodeSplit: false, // 禁用CSS代码分割
    rollupOptions: {
      output: {
        manualChunks: undefined, // 禁用手动分块
        // 添加以下配置确保资源正确处理
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    // 减少日志输出
    reportCompressedSize: false,
    commonjsOptions: {
      // include: [/d3-interpolate/, /dayjs/, /blueimp-md5/], // 添加这行来处理 d3-interpolate 的 CommonJS/ESM 兼容性
    },
  },
  plugins: [
    // buildTimePlugin(), // 添加编译时间统计插件
    debugPlugin(),
    markdownPreprocessPlugin(),
    UnoCSS(),
    Components({
      dirs: [".vitepress/theme/components"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      //使用 Arco Design 组件时（如 <a-button> ），不需要手动 import，插件会自动导入对应组件
      resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })],
    }),
    //在index.ts会导入import "virtual:group-icons.css";
    groupIconVitePlugin({
      customIcon: {
        postcss: "vscode-icons:file-type-postcss",
      },
    }),
  ],
  // 确保图片资源被正确处理
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
  ssr: { noExternal: ["@arco-design/web-vue"] },
  resolve: {
    alias: {
      // 图表绘制工具
      mermaid: "mermaid/dist/mermaid.esm.mjs",
    },
  },
});
