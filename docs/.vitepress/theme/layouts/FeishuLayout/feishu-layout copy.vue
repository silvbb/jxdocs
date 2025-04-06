<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import ArticleList from "./ArticleList.vue";
import { zh } from "../../config/feishu/zh";
import { shared } from "../../config/feishu/shared";
import { onMounted, ref } from "vue";
import { handleFeishuPage } from "../feishu-config";
import { feishuConfig } from "../feishu-config";

// const { Layout } = DefaultTheme;

// 获取文档列表
const documents = ref([]);

onMounted(async () => {
  console.log("飞书知识库：开始布局");
  // 加载文章列表
  // try {
  //   const response = await fetch('/kb/feishu/sider.json')
  //   const data = await response.json()
  //   documents.value = data
  // } catch (error) {
  //   console.error('加载文件列表失败:', error)
  // }

  // // 调用 handleFeishuPage 处理额外的 UI
  // handleFeishuPage()
});
</script>

<template>
  <Layout :theme-config="feishuConfig">
    <div class="feishu-container">
      <h1>飞书知识库</h1>
      <!-- 显示文档列表 -->
      <div class="article-list">
        <ArticleList :data="documents" />
      </div>
      <slot></slot>
    </div>
  </Layout>
</template>

<style scoped>
.feishu-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px;
}

.article-list {
  margin-top: 24px;
}
</style>
../feishu-config
