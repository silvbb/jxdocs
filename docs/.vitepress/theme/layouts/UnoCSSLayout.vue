<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide, onMounted } from "vue";
import HomePage from "../components/unocss/HomePage.vue";

// UnoCSSLayout.vue - 处理暗色/亮色模式切换的动画效果
const { isDark } = useData();

function enableTransitions() {
  // 检查是否在浏览器环境
  if (typeof document === "undefined") return false;

  return (
    "startViewTransition" in document &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

// 新增：添加一个函数来处理SVG图片
function fixSvgDisplay() {
  if (typeof document === "undefined") return;

  // 等待DOM加载完成
  setTimeout(() => {
    // 查找hero图片
    const heroImage = document.querySelector(".VPHero .image-src");
    if (heroImage) {
      // 添加特定样式，防止动态颜色变化影响SVG
      const style = document.createElement("style");
      style.innerHTML = `
        .VPHero .image-src {
          filter: none !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        .VPHero .image-container {
          position: relative;
          z-index: 10;
        }
      `;
      document.head.appendChild(style);

      console.log("已应用SVG图片修复样式");
    }
  }, 100);
}

// 在组件挂载后执行修复
onMounted(() => {
  fixSvgDisplay();
});

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;

    // 切换主题后再次修复SVG显示
    setTimeout(fixSvgDisplay, 100);
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

    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
      },
    );

    // 动画完成后再次修复SVG显示
    setTimeout(fixSvgDisplay, 350);
  } catch (error) {
    console.error("View Transitions API error:", error);
    isDark.value = !isDark.value;
    setTimeout(fixSvgDisplay, 100);
  }

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
      <ClientOnly>
        <HomePage />
      </ClientOnly>
    </template>
  </DefaultTheme.Layout>
</template>
