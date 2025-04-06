import DefaultTheme from "vitepress/theme";
import MyLayout from "../theme/layouts/MyLayout/MyLayout.vue";
import FeishuLayout from "../theme/layouts/FeishuLayout/feishu-layout.vue";
import AIwebLayout from "../theme/layouts/AIwebLayout/aiweb-layout.vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/css/style.css";
import "./styles/css/other.scss";
import "./styles/css/code.css";
import "./styles/css/my_style.css";
import "./styles/site.scss";
import { customConfigProvider } from "./configProvider";
import { useRoute, useData } from "vitepress";
import { Theme } from "vitepress";
import { watch, ref, computed } from "vue";
import { h } from "vue";
import siteList from "./components/site/siteList.vue";
import siteFooter from "./components/site/siteFooter.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 修改导入路径
import Feishu from "./components/feishu.vue";
/*
 *   index.js 只负责处理布局和主题功能的扩展
 */
console.log("index.js开始加载主题配置");

// 为AIwebLayout也应用customConfigProvider
const wrappedAIwebLayout = customConfigProvider(AIwebLayout);
const wrappedFeishuLayout = customConfigProvider(FeishuLayout);
const wrappedMyLayout = customConfigProvider(MyLayout);

export default {
  extends: DefaultTheme,
  // 使用一个函数来返回布局组件
  //Layout:customConfigProvider(FeishuLayout),
  // 自定义布局配置
  Layout: () => {
    //自定义class标签  pageClass: site-layout 默认是：layoutClass: site-page
    const props: { class?: string } = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.sitelayoutClass) {
      props.class = frontmatter.value.sitelayoutClass;
      return h(DefaultTheme.Layout, props, {
        // 自定义文档底部
        "doc-after": () => h(siteFooter),
      });
    }
    return h(customConfigProvider(FeishuLayout));
  },
  // Layout: () => {
  //   const { frontmatter } = useData()
  //   const currentLayout = computed(() => {
  //     switch(frontmatter.value.layout) {
  //       case 'feishu':
  //         return h(DefaultTheme.Layout, {}, {
  //           default: () => h(wrappedFeishuLayout)
  //         })
  //       default:
  //         return h(MyLayout)
  //       // ... 其他 case
  //     }
  //   })
  //   return currentLayout.value
  // },

  // Layout: () => {
  //   const { frontmatter } = useData()
  //   const currentLayout = computed(() => {
  //     console.log("当前布局类型:", frontmatter.value.layout)
  //     switch(frontmatter.value.layout) {
  //       case 'feishu':
  //         return wrappedFeishuLayout
  //       case 'aiweb':
  //         return wrappedAIwebLayout
  //       default:
  //         return MyLayout
  //     }
  //   })
  //   return h(currentLayout.value)
  // },

  // 移除 layouts 配置
  // layouts: {
  //   feishu: FeishuLayout,
  //   aiweb: AIwebLayout,
  //   default: MyLayout
  // },

  enhanceApp({ app, router }) {
    console.log("VitePress应用增强开始");

    /**
     * 添加路由监听
     * 手动触发 index.js 重新加载（不推荐，会导致整个应用重载）
     * 在路由监听中动态切换布局（更好的方案）
     *
     * */

    //方案一：在MyLayout中使用动态组件

    //分页和分类注入
    // 在应用级别提供依赖注入
    // 创建响应式引用
    // const feishucurrentPage = ref(1)
    // const feishucurrentCategory = ref('')
    // const aiwebcurrentPage = ref(1)
    // const aiwebcurrentCategory = ref('')
    // 提供依赖注入
    // app.provide('feishucurrentPage', feishucurrentPage)
    // app.provide('feishucurrentCategory', feishucurrentCategory)
    // app.provide('aiwebcurrentPage', aiwebcurrentPage)
    // app.provide('aiwebcurrentCategory', aiwebcurrentCategory)

    // 方案2️：在路由变化时动态切换布局组件
    // router.onBeforeRouteChange = (to) => {
    // const { frontmatter } = useData()
    // if (frontmatter.value.layout === 'feishu') {
    //   app.component('Layout', FeishuLayout)
    // } else if (frontmatter.value.layout === 'aiweb') {
    //   app.component('Layout', AIwebLayout)
    // }
    // console.log("切换布局成功");
    // }

    /*app.mixin 是 Vue 的一个全局混入（Global Mixin）功能
     * 将一段逻辑注入到所有 Vue 组件中
     * 每个组件实例都会执行这段逻辑
     * 可以在所有组件中共享代码
     */
    // app.mixin({
    //   mounted() {
    //     if (this.$root === this) {
    //       const { frontmatter } = useData()
    //       watch(() => frontmatter.value.layout, () => {
    //         feishucurrentPage.value = 1
    //         feishucurrentCategory.value = ''
    //         aiwebcurrentPage.value = 1
    //         aiwebcurrentCategory.value = ''
    //       })
    //     }
    //   }
    // })

    console.log("VitePress应用增强完成");
  },
} as Theme;
// export default theme;
// 添加这行代码，在浏览器控制台中显示日志
console.log("主题文件加载完成");
