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
  <div>
    <!-- 直接添加内容，不使用插槽 -->
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto">
      <h1>飞书布局</h1>

      <!-- 调试信息 -->
      <div
        style="
          padding: 10px;
          margin: 10px 0;
          border: 1px dashed #ccc;
          background: #f5f5f5;
        "
      >
        <h3>飞书布局调试</h3>
        <p>当前路径: {{ router.route.path }}</p>
        <p>加载状态: {{ isLoading ? "加载中" : "已加载" }}</p>
        <button
          @click="showCategoryNav = !showCategoryNav"
          style="
            padding: 5px 10px;
            background: #4caf50;
            color: white;
            border: none;
            cursor: pointer;
          "
        >
          {{ showCategoryNav ? "隐藏" : "显示" }} 分类导航
        </button>
      </div>

      <!-- 分类导航 -->
      <div
        v-if="showCategoryNav"
        style="
          border: 2px solid red;
          padding: 15px;
          margin: 15px 0;
          background: white;
        "
      >
        <h2>分类导航测试</h2>
        <p>这里应该显示 CategoryNav 组件</p>
        <CategoryNav />
      </div>

      <!-- 文章列表 -->
      <div
        style="
          border: 2px solid blue;
          padding: 15px;
          margin: 15px 0;
          background: white;
        "
      >
        <h2>文章列表测试</h2>
        <p>这里应该显示 ArticleList 组件</p>
        <ArticleList />
      </div>
    </div>

    <!-- 如果需要，可以在这里添加 Layout 组件 -->
    <!-- <Layout /> -->
  </div>
</template>

<style>
/* 添加一些基本样式 */
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #2c3e50;
  background: #f8f8f8;
}

h1,
h2,
h3 {
  margin-top: 0;
}

button:hover {
  opacity: 0.9;
}
</style>
