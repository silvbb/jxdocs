<script setup lang="ts">
// HMR: 4 - 修改这个数字强制热更新
// 在文件顶部添加
defineOptions({
  name: "UnoCSSLayout",
});

import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide } from "vue";
import HomePage from "../components/unocss/HomePage.vue";

// UnoCSSLayout.vue - 处理暗色/亮色模式切换的动画效果xx
const { isDark } = useData();

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
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

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
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    },
  );
});
</script>

<template>
  <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  <DefaultTheme.Layout>
    <template #home-features-after>
      <HomePage />
    </template>
  </DefaultTheme.Layout>
</template>
<style></style>
