import DefaultTheme from "vitepress/theme";
import MyLayout from "../theme/layouts/MyLayout/MyLayout.vue";
import FeishuLayout from "../theme/layouts/FeishuLayout/feishu-layout.vue";
import AIwebLayout from "../theme/layouts/AIwebLayout/aiweb-layout.vue";

import RainbowAnimationSwitcher from "./components/unocss/RainbowAnimationSwitcher.vue";
import UnoCSSLayout from "../theme/layouts/UnoCSSLayout.vue";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import "./styles/rainbow.css";
import "./styles/overrides.css";
import "uno.css";
import "virtual:group-icons.css";
// import '@iconify/css'
//  import 'group-icons.css'

import "./styles/vars.css";
import "@shikijs/vitepress-twoslash/style.css";
// import './styles/custom.css';
// import "./styles/css/style.css";
// import "./styles/css/other.scss";
// import "./styles/css/code.css";
// import "./styles/css/my_style.css";
// import "./styles/site.scss";

import { customConfigProvider } from "./configProvider";
import { useRoute, useData } from "vitepress";
import { Theme } from "vitepress";
import { watch, ref, computed } from "vue";
import { h } from "vue";
import siteList from "./components/site/siteList.vue";
import siteFooter from "./components/site/siteFooter.vue";

/*
 *   index.js 只负责处理布局和主题功能的扩展
 */
console.log("index.js开始加载主题配置");

// 为AIwebLayout也应用customConfigProvider
// const wrappedAIwebLayout = customConfigProvider(AIwebLayout);
const wrappedFeishuLayout = customConfigProvider(FeishuLayout);
// const wrappedMyLayout = customConfigProvider(MyLayout);

let homePageStyle: HTMLStyleElement | undefined;

export default {
  extends: DefaultTheme,
  // 使用一个函数来返回布局组件
  //Layout:customConfigProvider(FeishuLayout),
  // 自定义布局配置
  Layout: () => {
    //自定义class标签  pageClass: site-layout 默认是：layoutClass: site-page
    const props: { class?: string } = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    // 如果 frontmatter 指定了 layout: feishu
    if (frontmatter.value?.layout === "feishu") {
      return h(wrappedFeishuLayout);
    }

    /* 添加自定义 class */
    if (frontmatter.value?.sitelayoutClass) {
      props.class = frontmatter.value.sitelayoutClass;
      return h(DefaultTheme.Layout, props, {
        // 自定义文档底部
        "doc-after": () => h(siteFooter),
      });
    }
    //return h(customConfigProvider(FeishuLayout))
    return h(UnoCSSLayout);
  },

  enhanceApp({ app, router }) {
    console.log("VitePress应用增强开始");
    app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
    app.use(TwoslashFloatingVue, {
      // clickToShow: true,// 设置为 true 表示需要点击才会显示类型信息
    });

    if (typeof window === "undefined") return;

    console.log("当前路径为：" + location.pathname);
    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === "/"),
      { immediate: true },
    );

    console.log("VitePress应用增强完成");
  },
} satisfies Theme;
//as Theme;
// export default theme;
// 添加这行代码，在浏览器控制台中显示日志

if (typeof window !== "undefined") {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase();
  if (browser.includes("chrome"))
    document.documentElement.classList.add("browser-chrome");
  else if (browser.includes("firefox"))
    document.documentElement.classList.add("browser-firefox");
  else if (browser.includes("safari"))
    document.documentElement.classList.add("browser-safari");
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  console.log("updateHomePageStyle:", value, location.pathname, homePageStyle);
  //只在首页（ location.pathname === '/' ）时启用
  if (value) {
    if (homePageStyle) return;

    /**  让整个页面背景颜色产生彩虹渐变效果
     *  1. :root - 选择文档的根元素（在 HTML 中就是 <html> 元素）
        2. animation: rainbow 12s linear infinite; 分解为：
          - rainbow : 动画名称，对应 rainbow.css 中定义的关键帧动画
          - 12s : 动画持续时间为 12 秒
          - linear : 动画的时间函数，线性变化（匀速）
          - infinite : 动画无限循环播放
          这个动画会在根元素上应用彩虹效果，使整个页面背景产生渐变色变化，每12秒完成一次循环，并且会永久持续下去。
     *
     */
    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}

console.log("主题文件加载完成");
