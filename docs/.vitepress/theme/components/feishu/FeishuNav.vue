<script setup lang="ts">
import { useData } from "vitepress";
const { site } = useData();
</script>

<template>
  <nav class="nav-bar">
    <div class="nav-bar-inner">
      <div class="nav-bar-title">
        {{ site.title }}
      </div>
      <div class="nav-links">
        <a href="/" class="nav-link">首页</a>
        <a href="/feishupage/" class="nav-link">飞书文档</a>
        <a href="/aiweb/" class="nav-link">AI文档</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-nav-height);
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  z-index: 100;
}

.nav-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-bar-title {
  font-size: 1.3em;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--vp-c-brand);
}
</style>
