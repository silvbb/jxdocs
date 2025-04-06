<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick, ref, computed } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import mediumZoom from "medium-zoom";
import CategoryNav from "../../components/feishu/CategoryNav.vue";
import ArticleMeta from "../../components/feishu/ArticleMeta.vue";
import ArticleList from "../../components/feishu/ArticleList.vue";
import ArticleComment from "../../components/feishu/ArticleComment.vue";
import ArticleCopyright from "../../components/feishu/ArticleCopyright.vue";

const { Layout } = DefaultTheme;

const router = useRouter();
const initImagesZoom = () => {
  mediumZoom(".main img", {
    background: "var(--vp-c-bg)",
  });
};

import { data } from "../../posts.data.js"; // 导入文章数据
console.log("飞书知识库：开始布局");
// 准备文章数据
console.log("飞书知识库列表" + ArticleList.length);

// 打印文章数据
console.log("飞书知识库文章数据:", data);

// 确保数据正确导入
// import { data } from "../posts.data.js";
// console.log("posts.data.js 数据：", data)

// 添加响应式数据
// const posts = ref(data)

onMounted(() => {
  nextTick(() => {
    console.log("FeishuLayout 组件已挂载");
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
    initImagesZoom();
  });
});
watch(router.route, () => {
  // 清除上一次的监听
  nextTick(() => {
    initImagesZoom();
  });
});
onUnmounted(() => {});

import { useData } from "vitepress";
const { page } = useData();
// const isFeishuIndex = page.value.relativePath === 'kb/feishu/index.md'
// 如果需要测试，可以这样写
// 修改判断逻辑，精确匹配飞书知识库首页
const isFeishuHomePage = computed(() => {
  return (
    router.route.path === "/feishupage/" || router.route.path === "/feishupage"
  );
});
console.log("飞书知识库：开始布局", "是否首页:", isFeishuHomePage.value);

// 判断是否为飞书知识库的文章页面
const isFeishuArticlePage = computed(() => {
  return (
    router.route.path.startsWith("/feishupage/") && !isFeishuHomePage.value
  );
});
console.log("飞书知识库：开始布局", "是否文章:", isFeishuArticlePage.value);
</script>

<template>
  <Layout>
    <!-- 文章顶部模块 -->
    <template #layout-top>
      <template v-if="isFeishuHomePage">
        <div style="padding: 70px; max-width: 1200px; margin: 0 auto">
          <ClientOnly>
            <CategoryNav />
            <ArticleList />
          </ClientOnly>
        </div>
      </template>
    </template>

    <template #doc-bottom>
      <template v-if="isFeishuHomePage"> </template>
    </template>

    <template #doc-before>
      <template v-if="isFeishuArticlePage">
        <ArticleMeta />
      </template>
    </template>

    <template #doc-footer-before>
      <template v-if="isFeishuArticlePage">
        <ClientOnly>
          <ArticleCopyright />
        </ClientOnly>
      </template>
    </template>
    <!-- 文章尾部 -->
    <template #doc-after>
      <template v-if="isFeishuArticlePage">
        <!-- 其他页面显示评论模块 -->
        <ArticleComment />
      </template>
    </template>
    <template #aside-outline-before> </template>
  </Layout>
</template>
