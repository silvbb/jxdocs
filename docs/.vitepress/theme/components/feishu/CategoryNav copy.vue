<script setup lang="ts">
import { computed, watch, inject, watchEffect } from "vue";
import { useData, useRouter } from "vitepress";
import { useBrowserLocation } from "@vueuse/core";
import { data } from "../../posts.data.js";
import { useCurrentCategoryKey, useCurrentPageKey } from "../../configProvider";
import { get_lang_text } from "../../constant"; // 导入分类映射
import { SiteConfig } from "../../site_config";
const { lang } = useData();
const router = useRouter();
const location = useBrowserLocation();

// const pageKey = useCurrentPageKey()!;
// const currentCategory = useCurrentCategoryKey()!;
//在index.js注入的值
const currentCategory = inject("feishucurrentCategory");
const pageKey = inject("feishucurrentPage");

// 直接打印注入的值
console.log("CategoryNav - currentCategory 初始值:", currentCategory);

// 监听值的变化
watchEffect(() => {
  console.log("CategoryNav - currentCategory 当前值:", currentCategory.value);
});

// 在 watch location 之前添加
watch(
  currentCategory,
  (newVal, oldVal) => {
    console.log("CategoryNav - currentCategory 变化:", {
      old: oldVal,
      new: newVal,
    });
  },
  { immediate: true },
);

const categoriesMeta = computed(() => {
  const categoryCounts: Record<string, number> = {};
  for (const post of data) {
    for (const category of post.categories || []) {
      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
      }
      categoryCounts[category]++;
    }
  }

  return SiteConfig.categorys.map((categoryDetail) => {
    return {
      ...categoryDetail,
      text: get_lang_text(`category_${categoryDetail.name}`, lang.value),
      count: categoryCounts[categoryDetail.name] || 0,
    };
  });
  // .filter((category) => category.isHome);
});

const goHome = () => {
  currentCategory.value = "";
  pageKey.value = 1;
  router.go(`${window.location.origin}${router.route.path}`);
};

const goCategory = (category: string) => {
  currentCategory.value = category;
  pageKey.value = 1;
  const { searchParams } = new URL(window.location.href!);
  // 如果当前url的category与点击的category相同,则跳转回第一页
  searchParams.delete("category");
  if (category) searchParams.append("category", String(category));
  searchParams.delete("page");
  searchParams.append("page", "1");
  router.go(
    `${location.value.origin}${router.route.path}?${searchParams.toString()}`,
  );
};

watch(
  location,
  () => {
    if (location.value.href) {
      const { searchParams } = new URL(location.value.href);
      if (searchParams.has("category")) {
        currentCategory.value = searchParams.get("category") || "";
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="px=1 md:px-0 max-w-7xl mx-auto">
    <div h class="w-full px-4 mt-3 ld:h-40">
      <div class="flex items-center justify-between w-full">
        <!-- 遍历  {{ categoriesMeta }} ,展示 isHome 为 true 的分类 -->
        <div class="flex m-auto">
          <a
            @click="goHome()"
            class="relative px-3 py-1 ml-0 mr-0 text-sm text-center hover:cursor-pointer home-nav-title hover:text-rose-400 rounded-xl md:text-base md:ml-1 md:mr-2"
          >
            {{ get_lang_text("category_new", lang)
            }}<i class="hidden ml-3 md:inline-block text-slate-300">/</i>
          </a>
          <a
            v-for="(category, index) of categoriesMeta"
            :key="category.name"
            @click="goCategory(category.name)"
            class="inline-block px-3 py-1 ml-0 mr-0 text-sm text-center hover:cursor-pointer home-nav-title hover:text-rose-400 rounded-xl md:px-3 md:text-base md:ml-1 md:mr-2"
            :class="{
              'text-rose-400': category.name === currentCategory,
            }"
          >
            {{ category.text }}
            <i
              class="hidden ml-3 md:inline-block text-slate-300"
              :class="{ 'md:hidden': index === categoriesMeta.length - 1 }"
              >/</i
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
