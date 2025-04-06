<script lang="ts" setup>
import AIwebLayout from "../layouts/AIwebLayout/aiweb-layout.vue";
import FeishuLayout from "../layouts/FeishuLayout/feishu-layout.vue";
import { useData } from "vitepress";
import { onBeforeMount, computed, onMounted, type Component } from "vue"; // 修改这行

const { page, theme, frontmatter } = useData();
console.log("feishu.vue 开始加载");

const currentComponent = computed(() => {
  // 移除类型注解
  switch (frontmatter.value.layout) {
    case "feishu":
      return FeishuLayout;
    case "aiweb":
      return AIwebLayout;
    default:
      return FeishuLayout;
  }
});

onBeforeMount(() => {
  console.log("feishu layout - beforeMount");
  console.log("当前 layout:", frontmatter.value.layout);
});

onMounted(() => {
  console.log("feishuok");
});
</script>

<template>
  <component :is="currentComponent"> </component>
</template>

<!-- <template>
    <ClientOnly>
      <component :is="currentComponent">
        <template #doc-footer-before>
          <Copyright
            v-if="(frontmatter?.aside ?? true) && (frontmatter?.showArticleMetadata ?? true) && !(frontmatter.authorLink)"
            :key="md5(page.relativePath)" />
        </template>
        <template #doc-after>
          <Comment v-if="(theme.commentConfig?.showComment ?? true) && (frontmatter?.showComment ?? true)"
            :commentConfig="theme.commentConfig" :key="md5(page.relativePath)" />
        </template>
        <template #layout-bottom>
          <Footer v-if="!hasSidebar && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" />
        </template>
      </component>
    </ClientOnly>
  </template> -->
