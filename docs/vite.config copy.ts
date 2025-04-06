import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    Components({
      dirs: [".vitepress/theme/components"],
      dts: "./components.d.ts", // 修改为根目录下的位置
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })],
    }),
  ],
  ssr: { noExternal: ["@arco-design/web-vue"] },
  resolve: {
    alias: {
      mermaid: "mermaid/dist/mermaid.esm.mjs",
    },
  },
  logLevel: "info", // 设置日志级别
  build: {
    minify: false, // 开发时关闭压缩以便于调试
    sourcemap: true, // 启用 sourcemap
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
