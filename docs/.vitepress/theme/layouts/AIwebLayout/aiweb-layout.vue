<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick, ref, computed } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import mediumZoom from "medium-zoom";
import AIWebSites from "../../components/aiweb/AIWebSites.vue";
const { Layout } = DefaultTheme;

const router = useRouter();

const initImagesZoom = () => {
  mediumZoom(".main img", {
    background: "var(--vp-c-bg)",
  });
};

console.log("AI网址导航：开始布局");

onMounted(() => {
  console.log("AIwebLayout 组件已挂载");
  nextTick(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    initImagesZoom();
  });
});

watch(router.route, () => {
  nextTick(() => {
    initImagesZoom();
  });
  console.log("AiwebLayout布局---路由变化到:", router.route.path);
  // 在这里执行你需要的操作
});

// 监听路由变化
// watch(
//   () => router.route.path,
//   (newPath) => {
//     console.log('AiwebLayout布局---路由变化到:', newPath)
//     // 在这里执行你需要的操作
//   }
// )

onUnmounted(() => {});

import { useData } from "vitepress";
const { page } = useData();

// 判断是否为AI网址导航页面
const isAIWebPage = computed(() => {
  return router.route.path === "/aiweb/" || router.route.path === "/aiweb";
});
console.log("AI网址导航：开始布局", "是否AI网址页:", isAIWebPage.value);
</script>

<template>
  <Layout>
    <!-- 顶部导航 -->
    <template #nav-bar-title-before>
      <div class="aiweb-nav-title">
        <span class="text-gradient">AI网址导航</span>
      </div>
    </template>

    <!-- 内容区域 -->
    <template #doc-top>
      <template v-if="isAIWebPage">
        <ClientOnly>
          <AIWebSites />
        </ClientOnly>
      </template>
    </template>

    <template #doc-bottom>
      <template v-if="isAIWebPage">
        <!-- 底部内容 -->
      </template>
    </template>

    <template #aside-outline-before>
      <!-- 侧边栏内容 -->
    </template>
  </Layout>
</template>

<style scoped>
.aiweb-nav-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.text-gradient {
  background: linear-gradient(120deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
</style>
