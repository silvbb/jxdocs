<template>
  <component :is="layout" />
</template>

<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
// 修改导入路径，直接使用 DefaultTheme 的 Layout
import DefaultTheme from "vitepress/theme";

console.log("开始选择自定义布局");

const { frontmatter, theme } = useData();
const layout = computed(() => {
  console.log("开始选择自定义布局:" + frontmatter.value.layout);
  if (
    frontmatter.value.layout &&
    theme.value.layouts &&
    theme.value.layouts[frontmatter.value.layout]
  ) {
    console.log("开始选择自定义布局:" + frontmatter.value.layout);
    return theme.value.layouts[frontmatter.value.layout];
  }
  // 使用 DefaultTheme.Layout 作为默认布局
  return DefaultTheme.Layout;
});
</script>
