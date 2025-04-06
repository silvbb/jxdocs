<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  ref,
  computed,
  inject,
  onErrorCaptured,
  defineComponent,
  h,
} from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import mediumZoom from "medium-zoom";
import CategoryNav from "../../components/feishu/CategoryNav.vue";
import ArticleMeta from "../../components/feishu/ArticleMeta.vue";
import ArticleList from "../../components/feishu/ArticleList.vue";
import ArticleComment from "../../components/feishu/ArticleComment.vue";
import ArticleCopyright from "../../components/feishu/ArticleCopyright.vue";

// 移除原来的 slots 定义
// 添加新的布局配置
const layoutSlots = {
  "page-top": () => null,
  "page-bottom": () => null,
  "doc-top": () => null,
  "doc-bottom": () => null,
  "doc-footer-before": () => null,
  "sidebar-nav-before": () => null,
  "sidebar-nav-after": () => null,
  "aside-top": () => null,
  "aside-bottom": () => null,
  "aside-outline-before": () => null,
  "aside-outline-after": () => null,
  "aside-ads-before": () => null,
  "aside-ads-after": () => null,
};

// 创建扩展的 Layout 组件
const ExtendedLayout = defineComponent({
  name: "ExtendedLayout",
  setup(props, { slots }) {
    const { Layout } = DefaultTheme;
    return () =>
      h(
        Layout,
        {},
        {
          // 使用渲染函数的第三个参数来定义插槽
          aside: () => slots.aside?.(),
          page: () => slots.page?.(),
          footer: () => slots.footer?.(),
          "page-top": () => slots["page-top"]?.(),
          "page-bottom": () => slots["page-bottom"]?.(),
        },
      );
  },
});

// 使用扩展后的组件替换原来的 Layout
//const Layout = ExtendedLayout

const { Layout } = DefaultTheme;

// 在 Layout 导入后添加
// const slots = computed(() => {
//   return {
//     aside: true,
//     page: true,
//     footer: true,
//     'page-top': true,
//     'page-bottom': true
//   }
// })
console.log("Layout 组件检查:", !!Layout);
// 在 Layout 导入后添加
console.log("Layout 插槽检查:", Layout?.slots);
const router = useRouter();

// 在 script setup 顶部添加
const renderError = ref<Error | null>(null);

onErrorCaptured((err: Error) => {
  console.error("渲染错误:", err);
  renderError.value = err;
  return false;
});

//在index.js注入的值
const currentCategory = inject("feishucurrentCategory");
const pageKey = inject("feishucurrentPage");
console.log("检查 分类 组件:", currentCategory);
console.log("检查 页码 组件:", pageKey);

console.log("FeishuLayout 开始加载");
console.log("检查 CategoryNav 组件:", CategoryNav);
console.log("检查 ArticleList 组件:", ArticleList);

//测试钩子，看是否进入本代码
// 添加 watchEffect 来监测组件状态
import { watchEffect } from "vue";
watchEffect(() => {
  console.log("feishu-layout.vue watchEffect 执行");
});

import { onBeforeMount, onActivated, onDeactivated } from "vue";
onBeforeMount(() => {
  console.log("feishu-layout.vue onBeforeMount");
});

onMounted(() => {
  console.log("feishu-layout.vue onMounted");
});

onActivated(() => {
  console.log("feishu-layout.vue onActivated");
});

onDeactivated(() => {
  console.log("feishu-layout.vue onDeactivated");
});

// 监听路由变化
watch(
  () => router.route.path,
  (newPath) => {
    console.log("进入feishu-layout.vue---路由变化到:", newPath);
    // 在这里执行你需要的操作
  },
);
const { frontmatter } = useData();
// 在这里可以响应布局变化
// watch(() => frontmatter.value.layout, (newLayout) => {
//   console.log('布局切换为:', newLayout)
// })

const initImagesZoom = () => {
  mediumZoom(".main img", {
    background: "var(--vp-c-bg)",
  });
};

console.log("飞书云文档：开始布局");
// 准备文章数据
// console.log("飞书云文档列表"+ArticleList.length)

// 打印文章数据
// console.log("飞书云文档文章数据:", data)

// 确保数据正确导入
// import { data } from "../../posts.data.js"; // 导入文章数据
// console.log("posts.data.js 数据：", data)

// 添加响应式数据
// const posts = ref(data)

// 检查数据导入
const checkInjection = () => {
  console.log("依赖注入检查:", {
    currentCategory: currentCategory?.value,
    pageKey: pageKey?.value,
    hasCategory: currentCategory !== undefined,
    hasPageKey: pageKey !== undefined,
  });
};

// 确保组件已注册
// const components = {
//   CategoryNav,
//   ArticleList
// }

onMounted(() => {
  console.log("FeishuLayout 组件已挂载");
  //检查注入值
  //checkInjection()
  //console.log("检查组件注册:", Object.keys(components))
  if (renderError.value) {
    console.error("挂载时发现错误:", renderError.value);
  }
  //console.log("DOM 结构:", document.querySelector('.feishu-container'))
  // 检查整个文档结构
  //console.log("整个文档结构:", document.body.innerHTML)
  // 延迟检查 DOM
  // setTimeout(() => {
  //   console.log("延迟检查 DOM:", {
  //     container: document.querySelector('.feishu-container'),
  //     layout: document.querySelector('.Layout'),
  //     body: document.body
  //   })
  // }, 100)
  // console.log("可用插槽:", slots.value)
  // console.log("Layout 插槽检查:", {
  //   layout: Layout,
  //   slots: Layout?.slots,
  //   frontmatter: frontmatter.value
  // })
  // console.log("自定义Layout slots 检查:", layoutSlots)

  nextTick(() => {
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
console.log("飞书云文档page：开始布局", "是否首页:", isFeishuHomePage.value);

// 判断是否为飞书知识库的文章页面
const isFeishuArticlePage = computed(() => {
  return (
    router.route.path.startsWith("/feishupage/") && !isFeishuHomePage.value
  );
});
console.log("飞书云文档page：开始布局", "是否文章:", isFeishuArticlePage.value);
</script>

<template>
  <Layout>
    <!-- 文章顶部模块 -->
    <template #doc-top>
      <template>
        <ClientOnly>
          <CategoryNav />
          <ArticleList />
        </ClientOnly>
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

<style scoped>
.feishu-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
}

.nav-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: var(--vp-c-bg-soft);
}

.article-list {
  display: grid;
  /* 修改这里的 grid-template-columns，改为三列布局 */
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 1rem;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .article-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .article-list {
    grid-template-columns: 1fr;
  }
}
</style>
