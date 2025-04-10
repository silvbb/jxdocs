import DefaultTheme from "vitepress/theme";
import MyLayout from "../theme/layouts/MyLayout/MyLayout.vue";
import AIwebLayout from "../theme/layouts/AIwebLayout/aiweb-layout.vue";

import FeishuLayout from "../theme/layouts/FeishuLayout/feishu-layout.vue";
import RainbowAnimationSwitcher from "./components/unocss/RainbowAnimationSwitcher.vue";
import UnoCSSLayout from "../theme/layouts/UnoCSSLayout.vue";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";

import giscusTalk from "vitepress-plugin-comment-with-giscus";
import { inBrowser, useData, useRoute } from "vitepress";
import mediumZoom from "medium-zoom";
import { nextTick, watch, ref, computed, provide } from "vue";

import "@shikijs/vitepress-twoslash/style.css";
import "./styles/css/zoom.css";
// 确保CSS加载顺序正确，将关键样式提前
import "./styles/rainbow.css";
import "./styles/vars.css";
import "./styles/overrides.css";
// 确保UnoCSS和图标CSS在其他样式之后加载
import "uno.css";
import "virtual:group-icons.css";
// import "./styles/production-fix.css";

// import '@iconify/css'
//  import 'group-icons.css'

// import './styles/custom.css';
// import "./styles/css/style.css";
// import "./styles/css/other.scss";
// import "./styles/css/code.css";
// import "./styles/css/my_style.css";
// import "./styles/site.scss";

import { customConfigProvider, useCurrentRainbowKey } from "./configProvider";

import { Theme } from "vitepress";

import { h } from "vue";
import siteList from "./components/site/siteList.vue";
import siteFooter from "./components/site/siteFooter.vue";
let homePageStyle: HTMLStyleElement | undefined;
/*
 *   index.js 只负责处理布局和主题功能的扩展
 */
console.log("index.js开始加载主题配置");

// 为AIwebLayout也应用customConfigProvider
// const wrappedAIwebLayout = customConfigProvider(AIwebLayout);
const wrappedFeishuLayout = customConfigProvider(FeishuLayout);
const wrappedUnocssLayout = customConfigProvider(UnoCSSLayout);
// const wrappedMyLayout = customConfigProvider(MyLayout);

export default {
  extends: DefaultTheme,
  // 使用一个函数来返回布局组件
  //Layout:customConfigProvider(FeishuLayout),
  // 自定义布局配置
  Layout: () => {
    //自定义class标签 pageClass: site-layout 默认是：layoutClass: site-page
    const props: { class?: string } = {};
    const { frontmatter } = useData();

    // 如果 frontmatter 指定了 layout: feishu
    if (frontmatter.value?.layout === "feishu") {
      return h(wrappedFeishuLayout);
    }

    /* 添加自定义 class */
    // if (frontmatter.value?.sitelayoutClass) {
    //   props.class = frontmatter.value.sitelayoutClass;
    //   return h(DefaultTheme.Layout, props, {
    //     // 自定义文档底部
    //     "doc-after": () => h(siteFooter),
    //   });
    // }

    // 否则使用默认布局
    return h(wrappedUnocssLayout);
  },

  /**
   * Vue 应用的初始化和组件渲染的顺序：
        1. 首先，VitePress 会创建 Vue 应用实例
        2. 然后调用 enhanceApp 来增强应用（注册组件、插件等）
        3. 最后才会渲染 Layout 组件
   */
  enhanceApp({ app, router }) {
    console.log("VitePress应用增强开始");
    app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
    app.use(TwoslashFloatingVue, {
      // clickToShow: true,// 设置为 true 表示需要点击才会显示类型信息
    });

    if (typeof window === "undefined") return;

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === "/"),
      { immediate: true },
    );

    // 使用全局 mixin 在组件挂载后执行逻辑
    app.mixin({
      mounted() {
        // 只在根组件执行一次
        if (this.$root === this) {
          try {
            console.log("测试2 全局 mixin 当前路径为：" + location.pathname);
          } catch (e) {
            console.error("初始化失败:", e);
          }
        }
      },
    });

    console.log("VitePress应用增强完成");
  },
  setup() {
    // 获取前言和路由
    const { frontmatter } = useData();
    const route = useRoute();
    watch(
      () => route.path,
      () =>
        nextTick(() => {
          if (inBrowser) {
            const content = document.querySelector("#VPContent");
            if (content) {
              // 添加判断，确保content存在
              let images = content.querySelectorAll("img");
              if (images.length > 0) {
                console.log(`找到 ${images.length} 张图片，添加缩放效果`);
                images.forEach((image) => {
                  image.classList.add("zoom-image");
                });
                // 创建新的zoom实例
                mediumZoom(".zoom-image", {
                  margin: 24,
                  background: "rgba(0,0,0,0.6)",
                  scrollOffset: 40,
                });
              } else {
                console.log("当前页面没有找到图片");
              }
            } else {
              console.log("未找到 #VPContent 元素");
            }
          }
        }),
      { immediate: true },
    ); // 评论组件 - https://giscus.app/
    giscusTalk(
      {
        repo: "silvbb/jxdocs-talk",
        repoId: "R_kgDOOXZbRw",
        category: "General", // 默认: `General`
        categoryId: "DIC_kwDOOXZbR84Co-R3",
        mapping: "pathname", // 默认: `pathname`
        inputPosition: "top", // 默认: `top`
        lang: "zh-CN", // 默认: `zh-CN`
        lightTheme: "light", // 默认: `light`
        darkTheme: "transparent_dark", // 默认: `transparent_dark`
        // ...
      },
      {
        frontmatter,
        route,
      },
      // 是否全部页面启动评论区。
      // 默认为 true，表示启用，此参数可忽略；
      // 如果为 false，表示不启用。
      // 可以在页面使用 `comment: true` 前言单独启用
      true,
    );
    if (inBrowser) {
      if (import.meta.env.MODE === "production") {
        import("aegis-web-sdk").then(({ default: Aegis }) => {
          new Aegis({
            id: "8legRCovo1V8QOQrYm",
            reportApiSpeed: true,
            reportAssetSpeed: true,
            spa: true,
            hostUrl: "https://rumt-zh.com",
          });
        });
      }
    }
  },
} satisfies Theme;

//as Theme;
// export default theme;
// 添加这行代码，在浏览器控制台中显示日志

//检测用户的浏览器类型，并在 HTML 根元素（ <html> ）上添加对应的 CSS 类名
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
  if (value) {
    if (homePageStyle) return;

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
