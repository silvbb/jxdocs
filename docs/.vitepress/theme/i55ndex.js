import DefaultTheme from "vitepress/theme";
import Layout from "../theme/layouts/FeishuLayout/feishu-layout.vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/css/style.css";
import "./styles/css/other.scss";
import "./styles/css/code.css";
import "./styles/css/my_style.css";
import { customConfigProvider } from "./configProvider";

export default theme = {
  Layout: customConfigProvider(Layout),
  enhanceApp({ app }) {},
};

// 添加这行代码，在浏览器控制台中显示日志
console.log("主题文件加载完成");
