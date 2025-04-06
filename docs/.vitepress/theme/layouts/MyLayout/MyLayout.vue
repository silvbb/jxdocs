<script lang="ts" setup>
import { computed } from "vue";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import md5 from "blueimp-md5";
import Copyright from "./Copyright.vue";
import Comment from "./Comment.vue";
import Footer from "./Footer.vue";

console.log("开始布局：MyLayout");
import { useRouter } from "vitepress";
import { onMounted, onUnmounted, watch, nextTick, ref, provide } from "vue";
const router = useRouter();
const currentLayout = ref("default");
import AIwebLayout from "../AIwebLayout/aiweb-layout.vue";
import FeishuLayout from "../FeishuLayout/feishu-layout.vue";

import {
  customConfigProvider,
  currentPageKey,
  currentCategoryKey,
} from "../../configProvider";
// const wrappedAIwebLayout = customConfigProvider(AIwebLayout);
// const wrappedFeishuLayout = customConfigProvider(FeishuLayout);

// 直接在 MyLayout 中提供这些值，而不是通过包装组件
// const defaultPageKey = ref(1);
// provide(currentPageKey, defaultPageKey);
// const currentCategory = ref("");
// provide(currentCategoryKey, currentCategory);
// const wrappedMyLayout = customConfigProvider(MyLayout);
const { Layout } = DefaultTheme;
const { page, theme, frontmatter } = useData();

// const currentComponent = computed(() => {
//     switch(frontmatter.value.layout) {
//       case 'feishu':
//         return FeishuLayout
//       case 'aiweb':
//         return AIwebLayout
//       case 'home':
//         return DefaultTheme.Layout
//       default:
//         return DefaultTheme.Layout
//     }
//   })

const hasSidebar = computed(() => {
  return (
    frontmatter.value.aside !== false && frontmatter.value.layout !== "home"
  );
});

// 监听路由变化
watch(
  () => router.route.path,
  (newPath) => {
    console.log("MyLayout布局---路由变化到:", newPath);
    console.log("MyLayout布局---当前layout:", frontmatter.value.layout);
    // 在这里执行你需要的操作
    //   if (frontmatter.value.layout === 'feishu') {
    //   currentLayout.value = 'feishu'
    // } else if (frontmatter.value.layout === 'aiweb') {
    //   currentLayout.value = 'aiweb'
    // } else {
    //   currentLayout.value = 'default'
    // }
    // 计算当前应该使用的布局组件
    // const currentComponent = computed(() => {
    //   switch(frontmatter.value.layout) {
    //     case 'feishu':
    //       return FeishuLayout
    //     case 'aiweb':
    //       return AIwebLayout
    //     case 'home':
    //       return DefaultTheme.Layout
    //     default:
    //       return DefaultTheme.Layout
    //   }
    // })

    // 重置页码和分类
    // defaultPageKey.value = 1;
    // currentCategory.value = "";
  },
);

//
// const { page, theme, frontmatter } = useData();
// const hasSidebar = computed(() => {
//   return (
//     frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
//   )
// });
</script>

<template>
  <ClientOnly>
    <Layout>
      <template #doc-footer-before>
        <Copyright
          v-if="
            (frontmatter?.aside ?? true) &&
            (frontmatter?.showArticleMetadata ?? true) &&
            !frontmatter.authorLink
          "
          :key="md5(page.relativePath)"
        />
      </template>
      <template #doc-after>
        <Comment
          v-if="
            (theme.commentConfig?.showComment ?? true) &&
            (frontmatter?.showComment ?? true)
          "
          :commentConfig="theme.commentConfig"
          :key="md5(page.relativePath)"
        />
      </template>
      <template #layout-bottom>
        <Footer
          v-if="
            !hasSidebar &&
            (theme.footerConfig?.showFooter ?? true) &&
            (frontmatter?.showFooter ?? true)
          "
        />
      </template>
    </Layout>
  </ClientOnly>
</template>

<!-- <template>
      <component :is="currentLayout">
        <template #doc-footer-before>
          <slot name="doc-footer-before"></slot>
        </template>
        <template #doc-after>
          <slot name="doc-after"></slot>
        </template>
        <template #layout-bottom>
          <slot name="layout-bottom"></slot>
        </template>
      </component>
    </template> -->

<!-- <template>
  <ClientOnly>
    <Layout>
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
    </Layout>
  </ClientOnly>
</template> -->

<!--
<template>
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
</template>

-->

<style scoped></style>
