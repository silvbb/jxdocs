---
#sitelayoutClass: site-layout

layoutClass: site-page
---

框架组合：
<SiteList v-for="model in siteData" :key="model.title" :title="model.title" :data="model.items" />

<script setup>
// 网址导航页面的数据
import siteData from "./data/page.js";
</script>
