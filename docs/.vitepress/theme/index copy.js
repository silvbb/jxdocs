import DefaultTheme from "vitepress/theme";
import FeishuLayout from "../theme/layouts/FeishuLayout/feishu-layout.vue";
import MyDefaultLayout from "../theme/layouts/DefaultLayout.vue";

import AIwebLayout from "../theme/layouts/AIwebLayout/aiweb-layout.vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/css/style.css";
import "./styles/css/other.scss";
import "./styles/css/code.css";
import "./styles/css/my_style.css";
import { customConfigProvider } from "./configProvider";

console.log("开始加载主题配置");

// 为AIwebLayout也应用customConfigProvider
const wrappedAIwebLayout = customConfigProvider(AIwebLayout);
const wrappedFeishuLayout = customConfigProvider(FeishuLayout);

console.log("主题配置：开始注册布局组件");
const theme = {
  Layout: customConfigProvider(FeishuLayout),
  // layouts: {
  //   // 修改布局组件的注册方式，确保正确挂载
  //   aiweb:wrappedAIwebLayout,
  //   feishu:wrappedLayout
  //   // aiweb: () => {
  //   //   console.log("AIweb布局组件被调用");
  //   //   return wrappedAIwebLayout;
  //   // }
  // },
  enhanceApp({ app }) {
    console.log("VitePress应用增强开始");
    console.log("VitePress应用增强完成");
  },
};
export default theme;
// 添加这行代码，在浏览器控制台中显示日志
console.log("主题文件加载完成");
