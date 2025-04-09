<script setup lang="ts">
// HMR: 4 - 修改这个数字强制热更新
// 在文件顶部添加
defineOptions({
  name: "UnoCSSLayout",
});

import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import {
  watch,
  onMounted,
  onUnmounted,
  ref,
  nextTick,
  provide,
  computed,
} from "vue";
import HomePage from "../components/unocss/HomePage.vue";
import RainbowSwitch from "../components/unocss/RainbowSwitcher.vue";
// UnoCSSLayout.vue - 处理暗色/亮色模式切换的动画效果xx
const { isDark, frontmatter } = useData();
// 从 frontmatter 读取 RAINBOW_ANIMATION 配置
// const enableRainbowAnimation = computed(
//   () => frontmatter.value?.RAINBOW_ANIMATION !== false,
// );
import { useCurrentRainbowKey } from "../configProvider";
import { useRoute } from "vitepress";
// 获取全局状态
const route = useRoute();
const isRainbowEnabled = useCurrentRainbowKey();
const homePageStyle = ref<HTMLStyleElement | null>(null);

//用于检查浏览器是否支持 View Transitions API 和动画效果。
function enableTransitions() {
  // 检查是否在浏览器环境
  if (typeof document === "undefined") return false;

  return (
    //前面这个:检查浏览器是否支持 View Transitions API,创建页面状态变化时的平滑过渡动画
    //后面这个:检查用户是否允许动画效果  有些用户可能在系统设置中关闭了动画效果 prefers-reduced-motion 是一个媒体查询，用来尊重用户的系统动画设置偏好
    "startViewTransition" in document &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

// 监听路由变化
watch(
  [isRainbowEnabled, () => route.path],
  ([enabled, path], oldValue) => {
    // 只在值真正变化时才执行操作
    if (JSON.stringify([enabled, path]) === JSON.stringify(oldValue)) {
      return;
    }

    // 从 frontmatter 读取 RAINBOW_ANIMATION 配置
    // 方法一：在front设置。通过 frontmatter 的方式获取
    // const frontmatter = router.route.data?.frontmatter || {};
    // const enableRainbowAnimation = frontmatter?.RAINBOW_ANIMATION !== false;
    // 方法二：彩虹按钮 configProvider全局注入获取
    // 提供全局状态
    console.log("4彩虹状态:", enabled, "路径:", path);
    // 只有在首页启用彩虹动画时才应用动态样式
    updateHomePageStyle(enabled && path === "/");
  },
  { immediate: true },
);

// 组件卸载时清理样式
onUnmounted(() => {
  if (homePageStyle.value) {
    homePageStyle.value.remove();
    homePageStyle.value = null;
  }
});

// 在组件挂载后执行修复
onMounted(() => {
  // fixSvgDisplay();
  // 根据配置设置类名
  if (typeof document !== "undefined") {
    if (!isRainbowEnabled.value) {
      document.documentElement.classList.add("disable-rainbow");
    }
  }
});

/**提供一个切换彩虹色彩的功能，并且带有动画效果。
 * 使用 Vue 的 provide API 提供一个名为 "toggle-rainbow" 的函数，这个函数可以被子组件通过 inject 注入使用
 * 这个函数接收一个鼠标事件参数，从中获取点击位置的坐标 (clientX, clientY)
 * 当用户点击切换主题按钮时，会从点击位置开始创建一个圆形动画效果，逐渐扩散到整个页面
 * 动画完成后，会切换 isDark.value 的值，从而实现明暗主题的切换
 * 在 VitePress 的默认主题中，主题切换按钮组件是通过 inject 注入 toggle-appearance 函数来实现主题切换的。
 * 这个函数会被主题切换按钮组件注入并调用，当用户点击切换按钮时触发主题切换动画。
 *  */
provide("toggle-rainbow", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isRainbowEnabled.value = !isRainbowEnabled.value;
    if (!isRainbowEnabled.value) {
      document.documentElement.classList.add("disable-rainbow");
    } else {
      document.documentElement.classList.remove("disable-rainbow");
    }
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  try {
    await document.startViewTransition(async () => {
      isRainbowEnabled.value = !isRainbowEnabled.value;
      if (!isRainbowEnabled.value) {
        document.documentElement.classList.add("disable-rainbow");
      } else {
        document.documentElement.classList.remove("disable-rainbow");
      }
      await nextTick();
    }).ready;

    /** 实现圆形扩散动画效果的核心部分
     * document.documentElement.animate() - 对整个页面（HTML根元素）应用动画
     * 第一个参数:clipPath 是 CSS 属性，用于创建裁剪区域
     *   根据 isRainbowEnabled.value 决定动画方向（展开或收缩）
     *   clipPath 数组包含两个值：
     *   起始值： circle(0px at ${x}px ${y}px) - 从点击位置开始的小圆
     *   结束值： circle(${Math.hypot(...)}px at ${x}px ${y}px) - 扩展到覆盖整个屏幕的大圆
     *第二个参数是动画配置
     *    duration: 300,        // 动画持续时间（毫秒）
     *    easing: "ease-in",    // 动画缓动函数，控制动画速度变化
     *    pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`   指定动画应用到哪个视图过渡伪元素
     */
    document.documentElement.animate(
      { clipPath: isRainbowEnabled.value ? clipPath : clipPath.reverse() },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: `::view-transition-${isRainbowEnabled.value ? "new" : "old"}(root)`,
      },
    );
  } catch (error) {
    console.error("View Transitions API error:", error);
    isRainbowEnabled.value = !isRainbowEnabled.value;
  }
});

/**提供一个切换明暗主题的功能，并且带有动画效果。
 * 使用 Vue 的 provide API 提供一个名为 "toggle-appearance" 的函数，这个函数可以被子组件通过 inject 注入使用
 * 这个函数接收一个鼠标事件参数，从中获取点击位置的坐标 (clientX, clientY)
 * 当用户点击切换主题按钮时，会从点击位置开始创建一个圆形动画效果，逐渐扩散到整个页面
 * 动画完成后，会切换 isDark.value 的值，从而实现明暗主题的切换
 * 在 VitePress 的默认主题中，主题切换按钮组件是通过 inject 注入 toggle-appearance 函数来实现主题切换的。
 * 这个函数会被主题切换按钮组件注入并调用，当用户点击切换按钮时触发主题切换动画。
 *  */

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;

    // 切换主题后再次修复SVG显示
    // setTimeout(fixSvgDisplay, 100);
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  try {
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value;
      await nextTick();
    }).ready;

    /** 实现圆形扩散动画效果的核心部分
     * document.documentElement.animate() - 对整个页面（HTML根元素）应用动画
     * 第一个参数:clipPath 是 CSS 属性，用于创建裁剪区域
     *   根据 isDark.value 决定动画方向（展开或收缩）
     *   clipPath 数组包含两个值：
     *   起始值： circle(0px at ${x}px ${y}px) - 从点击位置开始的小圆
     *   结束值： circle(${Math.hypot(...)}px at ${x}px ${y}px) - 扩展到覆盖整个屏幕的大圆
     *第二个参数是动画配置
     *    duration: 300,        // 动画持续时间（毫秒）
     *    easing: "ease-in",    // 动画缓动函数，控制动画速度变化
     *    pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`   指定动画应用到哪个视图过渡伪元素
     */
    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
      },
    );

    // 动画完成后再次修复SVG显示
    // setTimeout(fixSvgDisplay, 350);
  } catch (error) {
    console.error("View Transitions API error:", error);
    isDark.value = !isDark.value;
    // setTimeout(fixSvgDisplay, 100);
  }

  // await document.startViewTransition(async () => {
  //   isDark.value = !isDark.value;
  //   await nextTick();
  // }).ready;

  // document.documentElement.animate(
  //   { clipPath: isDark.value ? clipPath.reverse() : clipPath },
  //   {
  //     duration: 300,
  //     easing: "ease-in",
  //     pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
  //   },
  // );
});

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  console.log("1开启彩虹模式:", value);

  // 如果状态没有变化，直接返回
  if ((value && homePageStyle.value) || (!value && !homePageStyle.value)) {
    return;
  }

  if (value) {
    if (homePageStyle.value) return;

    /**  让整个页面背景颜色产生彩虹渐变效果：
     *  1. :root - 选择文档的根元素（在 HTML 中就是 <html> 元素）
        2. animation: rainbow 12s linear infinite; 分解为：
          - rainbow : 动画名称，对应 rainbow.css 中定义的关键帧动画
          - 12s : 动画持续时间为 12 秒
          - linear : 动画的时间函数，线性变化（匀速）
          - infinite : 动画无限循环播放
          这个动画会在根元素上应用彩虹效果，使整个页面背景产生渐变色变化，每12秒完成一次循环，并且会永久持续下去。
     *
     */
    homePageStyle.value = document.createElement("style");
    // homePageStyle.value.innerHTML = `
    // :root {
    //   animation: rainbow 12s linear infinite;
    // }

    // /* 确保首页内容可见 */
    // .VPHome .VPHero .container,
    // .VPHome .VPFeatures .container {
    //   opacity: 1 !important;
    //   visibility: visible !important;
    // }
    // /* 确保文字应用彩虹效果 */
    // .VPHero .name,
    // .VPHero .text,
    // .VPHero .tagline {
    //   background-image: -webkit-linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-next));
    //   -webkit-background-clip: text;
    //   background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   transition: all 0.3s ease;
    // }
    // `;
    // document.body.appendChild(homePageStyle.value);

    // 只需要添加一个类名到根元素，其余样式都在 rainbow.css 中定义
    document.documentElement.classList.add("rainbow-enabled");
  } else {
    if (!homePageStyle.value) return;

    // homePageStyle.value.remove();
    // 移除类名
    document.documentElement.classList.remove("rainbow-enabled");
    homePageStyle.value = undefined;
  }
}
</script>

<template>
  <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  <DefaultTheme.Layout>
    <!-- <template #nav-bar-content-after>
      <RainbowSwitcher>
        <i class="i-carbon-sun" />
      </RainbowSwitcher>
    </template> -->
    <template #home-features-after>
      <ClientOnly>
        <HomePage />
      </ClientOnly>
    </template>
  </DefaultTheme.Layout>
</template>
<style></style>
