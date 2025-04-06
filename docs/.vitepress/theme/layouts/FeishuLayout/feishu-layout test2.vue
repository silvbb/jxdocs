<script setup lang="ts">
import { onMounted, ref } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import ArticleList from "../../components/feishu/ArticleList.vue";
import CategoryNav from "../../components/feishu/CategoryNav.vue";

console.log("飞书布局：开始加载");

const { Layout } = DefaultTheme;
const router = useRouter();
const isLoading = ref(true);
const showCategoryNav = ref(true);

onMounted(() => {
  console.log("飞书布局：已挂载");
  console.log("当前路径:", router.route.path);
  isLoading.value = false;
});
</script>

<template>
  <Layout>
    <!-- 尝试不同的插槽位置 -->
    <template #home-hero-before>
      <!-- 您的内容 -->
    </template>

    <template #doc-before>
      <!-- 您的内容 -->
    </template>

    <template #aside-outline-before>
      <!-- 您的内容 -->
    </template>

    <template #layout-top>
      <!-- 这个插槽通常在页面最顶部 -->
      <div style="background: #f0f0f0; padding: 20px">
        <h2>顶部内容测试</h2>
        <CategoryNav />
        <ArticleList />
      </div>
    </template>

    <template #nav-bar-content-before>
      <!-- 导航栏之前的内容 -->
    </template>

    <template #page-top>
      <!-- 页面顶部内容 -->
      <div style="padding: 20px; max-width: 1200px; margin: 0 auto">
        <CategoryNav />
        <ArticleList />
      </div>
    </template>
  </Layout>
</template>
