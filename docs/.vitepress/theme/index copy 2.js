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
import { customConfigProvider } from "./configProvider";
import { useRoute, useData } from "vitepress";
import { watch, ref } from "vue";
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

const theme = {
  ...DefaultTheme,
  // Layout:MyLayout,
  layouts: {
    // 修改布局组件的注册方式，确保正确挂载
    // aiweb:AIwebLayout,
    // feishu:FeishuLayout,
    // 如果需要默认布局，可以添加
    // default: wrappedFeishuLayout
    feishu: FeishuLayout,
    aiweb: AIwebLayout,
    default: MyLayout,
    // feishu: () => import('./components/feishu.vue'),  // 使用动态导入

    // aiweb: () => {
    //   console.log("AIweb布局组件被调用");
    //   return wrappedAIwebLayout;
    // }
  },
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
    const feishucurrentPage = ref(1);
    const feishucurrentCategory = ref("");
    const aiwebcurrentPage = ref(1);
    const aiwebcurrentCategory = ref("");
    // 提供依赖注入
    app.provide("feishucurrentPage", feishucurrentPage);
    app.provide("feishucurrentCategory", feishucurrentCategory);
    app.provide("aiwebcurrentPage", aiwebcurrentPage);
    app.provide("aiwebcurrentCategory", aiwebcurrentCategory);

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
    app.mixin({
      mounted() {
        if (this.$root === this) {
          const { frontmatter } = useData();

          // 处理布局变化
          const handleLayoutChange = (layout) => {
            console.log("切换布局:", layout);
            if (layout === "feishu") {
              app.component("Layout", FeishuLayout);
            } else if (layout === "aiweb") {
              app.component("Layout", AIwebLayout);
            } else {
              app.component("Layout", DefaultTheme.Layout);
            }
            // 重置状态
            feishucurrentPage.value = 1;
            feishucurrentCategory.value = "";
            aiwebcurrentPage.value = 1;
            aiwebcurrentCategory.value = "";
          };

          // 初始化时处理一次
          handleLayoutChange(frontmatter.value.layout);

          // 监听后续变化
          watch(() => frontmatter.value.layout, handleLayoutChange);
        }
      },
    });
    // 使用 app.mixin 但只监听路由
    // app.mixin({
    //   mounted() {
    //     const route = useRoute()
    //     const { frontmatter } = useData()

    //     // 只在根组件进行监听
    //     if (this.$root === this) {
    //       watch(() => route.path, (newPath) => {
    //         console.log('mixin当前布局:', frontmatter.value.layout)
    //       })
    //     }
    //   }
    // })

    //这个监听逻辑注入到每个 Vue 组件中。当页面切换时，所有组件都会执行这个监听，所以会看到多次打印。
    // app.mixin({
    //   mounted() {
    //     const route = useRoute()
    //     const { frontmatter } = useData()

    //     watch(() => route.path, (newPath) => {
    //       console.log('路径变化:', newPath)
    //       console.log('当前布局:', frontmatter.value.layout)
    //     })
    //   }
    // })

    console.log("VitePress应用增强完成");
  },
};
export default theme;
// 添加这行代码，在浏览器控制台中显示日志
console.log("主题文件加载完成");
