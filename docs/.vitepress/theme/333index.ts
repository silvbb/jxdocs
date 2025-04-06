import { Theme, useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import FeishuLayout from "../theme/layouts/FeishuLayout/feishu-layout.vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/css/style.css";
import "./styles/css/other.scss";
import "./styles/css/code.css";
import "./styles/css/my_style.css";
import { customConfigProvider } from "./configProvider";
import { h } from "vue";

// 创建一个布局选择器函数
const createLayoutSelector = () => {
  return {
    setup() {
      const { page, frontmatter } = useData();
      console.log("当前layout:" + frontmatter.value.layout);

      return () => {
        // 根据页面路径或frontmatter选择布局
        //page.value.relativePath.startsWith('feishu')
        if (frontmatter.value.layout === "feishu") {
          return h(customConfigProvider(FeishuLayout));
        } else if (frontmatter.value.layout === "aiweb") {
          return h(customConfigProvider(FeishuLayout));
        } else if (frontmatter.value.layout === "home") {
          return h(customConfigProvider(FeishuLayout));
        } else {
          // 默认布局
          return h(DefaultTheme.Layout);
        }
      };
    },
  };
};

export default {
  extends: DefaultTheme,
  Layout: createLayoutSelector(),
  enhanceApp({ app }) {
    // 设置全局语言配置
    // app.config.globalProperties.$lang = 'zh'
  },
} as Theme;
