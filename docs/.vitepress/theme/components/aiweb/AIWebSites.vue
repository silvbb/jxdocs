<script setup lang="ts">
//测试钩子，看是否进入本代码
// 添加 watchEffect 来监测组件状态
import { computed, watch, inject, nextTick } from "vue";
import { watchEffect } from "vue";
watchEffect(() => {
  console.log("ArticleList watchEffect 执行");
});

import { onBeforeMount, onActivated, onDeactivated } from "vue";
onBeforeMount(() => {
  console.log("ArticleList onBeforeMount");
});

onMounted(() => {
  console.log("ArticleList onMounted");
});

onActivated(() => {
  console.log("ArticleList onActivated");
});

onDeactivated(() => {
  console.log("ArticleList onDeactivated");
});

// 使用 nextTick 确保在 DOM 更新后执行
nextTick(() => {
  console.log("ArticleList DOM 已更新");
});

import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";

interface WebSite {
  name: string;
  url: string;
  category: string;
}

interface CategoryData {
  category: string;
  sites: WebSite[];
}

const categories = ref<CategoryData[]>([]);
const isLoading = ref(true);
const errorMessage = ref("");

// 从Excel文件读取数据
const readExcelFile = async (file: File) => {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as any[];

    // 第一行是大类标题
    const categoryTitles = jsonData[0] as string[];
    const categoryData: CategoryData[] = [];

    // 为每个大类创建一个分类对象
    for (let i = 0; i < categoryTitles.length; i++) {
      if (categoryTitles[i]) {
        categoryData.push({
          category: categoryTitles[i],
          sites: [],
        });
      }
    }

    // 从第二行开始处理网站数据
    for (let row = 1; row < jsonData.length; row++) {
      const rowData = jsonData[row];

      // 遍历每一列，将网站添加到对应的分类中
      for (let col = 0; col < categoryTitles.length; col++) {
        if (rowData[col * 2] && rowData[col * 2 + 1]) {
          const categoryIndex = categoryData.findIndex(
            (c) => c.category === categoryTitles[col],
          );
          if (categoryIndex !== -1) {
            categoryData[categoryIndex].sites.push({
              name: rowData[col * 2],
              url: rowData[col * 2 + 1],
              category: categoryTitles[col],
            });
          }
        }
      }
    }

    categories.value = categoryData;
    isLoading.value = false;
  } catch (error) {
    console.error("解析Excel文件出错:", error);
    errorMessage.value = "解析Excel文件出错，请检查文件格式";
    isLoading.value = false;
  }
};

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    isLoading.value = true;
    errorMessage.value = "";
    readExcelFile(input.files[0]);
  }
};

// 打开外部链接
const openUrl = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  window.open(url, "_blank");
};
</script>

<template>
  <div class="ai-websites-container">
    <div class="upload-section">
      <input
        type="file"
        accept=".xlsx,.xls"
        @change="handleFileUpload"
        id="excel-upload"
        class="hidden"
      />
      <label for="excel-upload" class="upload-button"> 上传Excel文件 </label>
      <p class="text-sm text-gray-500 mt-2">
        支持.xlsx和.xls格式，第一行为分类标题
      </p>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>正在加载数据...</p>
    </div>

    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-else-if="categories.length === 0" class="empty-state">
      <p>请上传Excel文件以显示AI网址导航</p>
    </div>

    <div v-else class="categories-container">
      <div
        v-for="category in categories"
        :key="category.category"
        class="category-card"
      >
        <h3 class="category-title">{{ category.category }}</h3>
        <div class="sites-grid">
          <div
            v-for="site in category.sites"
            :key="site.name"
            class="site-item"
            @click="openUrl(site.url)"
          >
            <div class="site-content">
              <div class="site-name">{{ site.name }}</div>
              <div class="site-url">{{ site.url }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-websites-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.upload-section {
  margin-bottom: 30px;
  text-align: center;
}

.hidden {
  display: none;
}

.upload-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #2563eb;
}

.loading-state,
.empty-state,
.error-message {
  text-align: center;
  padding: 40px 0;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-left-color: #3b82f6;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.categories-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.category-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.category-title {
  padding: 15px;
  background-color: #f3f4f6;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

.sites-grid {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}

.site-item {
  padding: 10px;
  border-radius: 6px;
  background-color: #f9fafb;
  cursor: pointer;
  transition: background-color 0.2s;
}

.site-item:hover {
  background-color: #e5e7eb;
}

.site-content {
  display: flex;
  flex-direction: column;
}

.site-name {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.site-url {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 暗黑模式适配 */
:global(.dark) .category-card {
  background-color: #1f2937;
}

:global(.dark) .category-title {
  background-color: #111827;
  color: #f9fafb;
  border-bottom-color: #374151;
}

:global(.dark) .site-item {
  background-color: #374151;
}

:global(.dark) .site-item:hover {
  background-color: #4b5563;
}

:global(.dark) .site-name {
  color: #f9fafb;
}

:global(.dark) .site-url {
  color: #9ca3af;
}
</style>
