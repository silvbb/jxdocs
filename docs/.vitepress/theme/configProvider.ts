import {
  Component,
  defineComponent,
  h,
  inject,
  InjectionKey,
  provide,
  Ref,
  ref,
} from "vue";
const currentPageKey: InjectionKey<Ref<number>> = Symbol("currentPage");
const currentCategoryKey: InjectionKey<Ref<string>> = Symbol("currentCategory");

// 添加一些调试日志
console.log("configProvider 开始加载");

// customConfigProvider 函数接收一个组件，并返回一个新的包装组件
export function customConfigProvider(App: Component) {
  console.log(
    "customConfigProvider 被调用，组件:",
    (App as any).name || "未命名组件",
  );
  // 返回一个新的组件，这个组件会在渲染时提供一些配置
  return defineComponent({
    name: "ConfigProvider",
    setup(props, { slots }) {
      console.log("ConfigProvider setup 被执行");
      // 全局配置数据
      // 创建必要的响应式数据
      const category = ref("");
      const page = ref(1);

      // 提供这些数据给子组件
      provide(currentCategoryKey, category);
      provide(currentPageKey, page);

      console.log("ConfigProvider 已提供数据");

      // 渲染原始组件，并传递所有属性和插槽
      return () => h(App, null, slots);
    },
  });
}

export function useCurrentPageKey() {
  console.log("useCurrentPageKey 被调用");
  const key = inject(currentPageKey, ref(1));
  console.log("获取到的 currentPageKey:", key.value);
  return key;
}

export function useCurrentCategoryKey() {
  console.log("useCurrentCategoryKey 被调用");
  const key = inject(currentCategoryKey, ref(""));
  console.log("获取到的 currentCategoryKey:", key.value);
  return key;
}
