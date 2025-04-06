---
title: vitepress相关学习注意
urlname: IG2IdTRSfoO08DxnSfLcYjcKn9e
date: '2025-03-18 20:34:27'
updated: '2025-04-06 21:40:42'
---
## 1,onMounted函数
   onMounted(() => {}
- 适用于同步操作

- 不能使用 await

- 如果包含异步操作，需要使用 .then() 链式调用



   onMounted(async () => {}
- 异步加载

- 可以使用 await 关键字

- 适用于需要等待异步操作完成的场景

- 可以按顺序处理多个异步操作


## 2, import 函数注意
import { data as articleData } from '../../article.data.js'

- 这种方式是从模块中具名导入一个名为 data 的导出，并将其重命名为 articleData

- 要求 article.data.js 文件中必须有一个命名导出 data ，比如：
```javascript
javascript
export const data = [...];
```
- import articleData from '../../article.data.js'

- 这种方式是导入模块的默认导出

- 要求 article.data.js 文件中必须有一个默认导出，比如：
```javascript
javascript
export default [...];
```
## 3,VitePress的frontmatter生效机制和流程
主要包括以下几个步骤：
1. 解析阶段 ：
	- VitePress使用markdown-it解析器读取Markdown文件
		- 解析文件顶部的YAML格式frontmatter（位于 --- 之间的内容）
		- 将frontmatter转换为JavaScript对象
	
1. 主题应用阶段 ：
	- 对于 layout: aiweb 这样的配置，VitePress会在主题的layouts目录中查找对应的布局组件
		- 在您的例子中，VitePress会查找 f:\project_space\jxdocs\docs\.vitepress\theme\layouts\aiweb.vue 文件
	
1. 组件渲染阶段 ：
	- 如果找到了aiweb.vue布局组件，VitePress会使用该组件作为页面的根组件
		- 或者VitePress 在主题的 layouts 配置中查找 key 为 aiweb 的布局
		- 如果没有找到，会回退到默认布局（通常是Layout.vue）
		- Markdown内容会作为插槽内容传递给布局组件
	
1. 数据访问 ：
	- 在布局组件中，可以通过 useData() 钩子访问frontmatter数据
		- 例如： const { frontmatter } = useData()
	
对于您的 layout: aiweb 配置，具体流程是：
1. VitePress解析 f:\project_space\jxdocs\docs\aiweb\index.md 文件

1. 识别到 layout: aiweb 配置

1. 查找 f:\project_space\jxdocs\docs\.vitepress\theme\layouts\aiweb.vue 布局组件

1. 如果找到，使用该布局渲染页面；如果没有找到，使用默认布局

1. 在布局组件中，可以通过 useData().frontmatter 访问其他frontmatter属性（如title、description）

如果您想创建自定义布局，需要在 .vitepress/theme/layouts 目录下创建对应的Vue组件文件。
## 4 index.ts 文件是 VitePress 主题的入口文件，
它的加载时机如下：
1. 初始加载：当用户首次访问网站时， index.ts 会被加载并执行一次

1. 热更新：在开发模式下，当你修改了 index.ts 或其依赖的文件时，Vite 的热更新机制会重新加载它

1. 页面导航：使用 VitePress 内置的路由导航（点击链接跳转页面）时，不会重新加载 index.ts ，因为 VitePress 使用的是单页应用架构

1. 页面刷新：当用户手动刷新页面时， index.ts 会重新加载

   所以， index.ts 不会在每次页面导航时重新加载，但会在用户刷新页面时重新加载。这是因为 VitePress 是一个基于 Vue 的单页应用（SPA），页面导航是通过 Vue Router 实现的，不会触发整个应用的重新加载。



如果你想在每次路由变化时执行某些操作，可以考虑在布局组件中使用 Vue Router 的 watch 机制：
```javascript
<script setup>
import { useRouter } from 'vitepress'
import { watch } from 'vue'

const router = useRouter()

// 监听路由变化
watch(
  () => router.route.path,
  (newPath) => {
    console.log('路由变化到:', newPath)
    // 在这里执行你需要的操作
  }
)
</script>
```


这样可以在不重新加载整个应用的情况下，响应路由变化。



布局切换是通过 Vue 的响应式系统和路由来实现的。


## 5，customConfigProvider 
   customConfigProvider 是一个高阶组件（HOC）包装函数，它的主要作用是为布局组件提供一些全局配置和状态管理。这种方式可以让我们统一管理和注入全局配置，而不需要在每个组件中单独设置。
```typescript
Layout: customConfigProvider(Layout),
```

这个函数可能实现了以下功能：
1. 提供全局配置 ：将主题配置、站点信息等全局配置注入到布局组件中
2. 状态管理 ：提供一些共享状态，比如当前分类、当前页码等
3. 响应式数据 ：将一些数据转换为响应式，方便在组件间共享



不一定要在index.ts里，也不一定要传给Layout。在VitePress中，我们可以在任何Vue组件中定义布局组件。但是在index.ts中定义和传给Layout是一种常见的做法，因为这样可以让布局组件在全局范围内生效，便于统一管理。如果你只想在特定页面使用某个布局，可以直接在那个页面的组件中使用布局组件。



我设定了一个自定义布局的组件:layout: feishu,放在哪里合适用customConfigProvider

customConfigProvider是一个全局配置提供者，它可以在任何需要使用全局配置的组件中使用。对于自定义布局组件feishu，你可以在.vitepress/theme/index.ts中使用customConfigProvider包装它，这样可以确保布局组件能够访问到全局配置。但这不是必须的，你也可以直接在需要使用全局配置的组件中单独使用customConfigProvider。

放在feishu-layout.vue可以么

可以放在feishu-layout.vue中，但不建议这样做。因为customConfigProvider是用来提供全局配置的，最好在.vitepress/theme/index.ts中使用它来包装布局组件，这样可以确保全局配置在整个应用中的一致性。


##### customConfigProvider传出的数据是什么


customConfigProvider传出的是一个全局配置对象，主要包含了主题相关的配置信息，比如主题色、布局设置、组件样式等。这些配置可以在被包装的组件中通过inject注入的方式来使用。在VitePress中，这些配置通常包括主题配置（theme）、站点配置（siteData）以及一些自定义的全局配置。

Vue中使用inject注入需要配合provide使用。provide在父组件中提供数据，inject在子组件中接收数据。使用方法是：

1. 在父组件中使用provide('key', value)提供数据 

2. 在子组件中使用inject('key')接收数据。inject可以设置默认值：inject('key', defaultValue)。inject还支持响应式数据，如果provide提供的是ref或reactive对象，子组件注入后数据会保持响应式。
```javascript
export function customConfigProvider(App: Component) {
  return defineComponent({
    name: "ConfigProvider",
    setup(props, { slots }) {
      const defaultPageKey = ref(1);
      provide(currentPageKey, defaultPageKey);
      const currentCategory = ref("");
      provide(currentCategoryKey, currentCategory);
      return () => h(App, null, slots);
    },
  });
}
```
1. customConfigProvider 是一个函数，接收一个 Vue 组件作为参数 App

1. 函数返回一个新的组件定义（通过 defineComponent ），这个新组件：
	- 名称为 "ConfigProvider"
		- 作为一个配置提供者的包装组件
	
1. 在 setup 函数中：
	- defaultPageKey : 创建一个响应式变量，初始值为 1
		- currentCategory : 创建一个响应式变量，初始值为空字符串
		- 使用 provide 注入这两个变量，使得子组件可以通过 inject 访问
	
1. return () => h(App, null, slots) :
	- 使用 Vue 的渲染函数 h 渲染传入的组件
		- 保持原组件的插槽内容
		- 将配置注入到组件树中
	
这个组件的主要用途是：
- 为应用提供全局配置

- 实现页面切换和分类管理的状态共享

- 可以被子组件通过 useCurrentPageKey 和 useCurrentCategoryKey 访问这些共享状态


## 6，index.ts 和 index.js 主要区别在于：


index.ts 是 TypeScript 文件，而 index.js 是 JavaScript 文件。TypeScript 是 JavaScript 的超集，提供了类型系统和其他高级特性。



在 VitePress 项目中：


1. index.ts 包含类型注解和类型检查，可以提供更好的开发体验和错误检测

1. 在构建过程中， index.ts 会被编译成 index.js 然后执行

1. 从功能角度看，它们的作用是相同的 - 都是定义和导出主题配置

在你的项目中，使用的是 index.ts ，这表明你的项目采用了 TypeScript。这也与你的 tsconfig.json 配置一致，其中包含了 docs/.vitepress/theme/index.ts 文件。



如果你想将 TypeScript 文件改为 JavaScript 文件，需要移除类型注解并更新相关配置。但通常不建议这样做，因为 TypeScript 提供了更好的类型安全性和开发体验。


## 7，

## 8,  对象展开运算符 ... 和直接赋值区别
1. 使用展开运算符的方式：

```typescript
themeConfig: {
  ...JxthemeConfig,
}
```
这种写法会创建一个新对象，并将 JxthemeConfig 的属性复制到这个新对象中。这可能会：
- 丢失一些原始对象的引用关系

- 破坏某些响应式属性

- 对于复杂的嵌套对象可能造成浅拷贝问题

1. 直接赋值的方式：

```typescript
themeConfig: JxthemeConfig
```
这种写法直接使用原始配置对象的引用，保持了：
- 完整的对象结构

- 所有的响应式特性

- 正确的类型信息

所以直接赋值的方式更适合这种场景，能确保配置对象完整且正确地被使用。
## 9，动态组件 `<component :is>`
```javascript
<script lang="ts" setup>
  // ... 保持现有的导入 ...
  import AIwebLayout from '../AIwebLayout/aiweb-layout.vue'
  import FeishuLayout from '../FeishuLayout/feishu-layout.vue'

  const { Layout } = DefaultTheme;
  const { page, theme, frontmatter } = useData();
  
  // 计算当前应该使用的布局组件
  const currentComponent = computed(() => {
    switch(frontmatter.value.layout) {
      case 'feishu':
        return FeishuLayout
      case 'aiweb':
        return AIwebLayout
      default:
        return Layout
    }
  })

  // ... 其他代码保持不变 ...
</script>

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
```
## 10，动态导入  () => 
```typescript
const theme = {
  ...DefaultTheme,
  layouts: {
    feishu: () => import('./components/feishu.vue'),  // 使用动态导入
    }
  }
```
## 11，Vue 的全局混入(mixin)功能
在 VitePress 中我们可以通过监听路由变化来实现布局的动态切换，而不是重载 index.js。
```typescript
 //这个监听逻辑注入到每个 Vue 组件中。当页面切换时，所有组件都会执行这个监听，所以会看到多次打印
 app.mixin({
    mounted() {
      const route = useRoute()
      const { frontmatter } = useData()
      
      watch(() => route.path, (newPath) => {
        console.log('路径变化:', newPath)
        console.log('当前布局:', frontmatter.value.layout)
      })
    }
  })
```
1. app.mixin() - 向所有 Vue 组件注入共享的功能

1. mounted() - 在每个组件挂载完成后执行的生命周期钩子

1. 内部逻辑：
	- const route = useRoute() - 获取当前路由信息
		- const { frontmatter } = useData() - 获取当前页面的 frontmatter 数据
		- watch(() => route.path, ...) - 监听路由路径的变化
	
1. 作用：
	- 在每个组件挂载时都会执行这个监听
		- 当路由发生变化时，会打印：
		- 新的路径
			- 当前页面的布局类型
		
简单说，这段代码会在每个页面切换时追踪路由变化和布局信息，主要用于调试目的。它会影响到应用中的所有组件，因为是全局混入。
```javascript
   // 修改路由监听方式
  router.onBeforeRouteChange = (to) => {
    console.log('路由即将改变:', to)
    // 移除这里的 useData 调用
  }

  // 使用 app.mixin 但只监听路由
  app.mixin({
    mounted() {
      const route = useRoute()
      const { frontmatter } = useData()
      
      // 只在根组件进行监听
      if (this.$root === this) {
        watch(() => route.path, (newPath) => {
          console.log('mixin当前布局:', frontmatter.value.layout)
        })
      }
    }
  })
```
## 12，setup 函数是 Vue 3 组合式 API 的核心
setup 函数是 Vue 3 组合式 API 的入口点，有以下几种主要用法：


1. 基础用法：

```javascript
<script setup>
// 直接在 setup 中编写逻辑
const count = ref(0)
const increment = () => count.value++
</script>
```
2. 响应式状态：
```typescript
<script setup>
import { ref, reactive } from 'vue'

// ref 用于基础类型
const count = ref(0)

// reactive 用于对象
const state = reactive({
  name: '张三',
  age: 25
})
</script>
```
3. 计算属性：
```typescript
<script setup>
import { computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
</script>
```
4. 生命周期钩子：
```javascript
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
</script>
```
5. Props 和 Emits：
```javascript
<script setup>
// 定义 props
const props = defineProps({
  title: String,
  count: Number
})

// 定义 emits
const emit = defineEmits(['update', 'delete'])

// 使用 emit
const handleClick = () => {
  emit('update', 'some data')
}
</script>
```
6. 提供/注入
```javascript
<script setup>
import { provide, inject } from 'vue'

// 父组件提供数据
provide('key', value)

// 子组件注入数据
const value = inject('key')
</script>
```
7. 监听器：
```javascript
<script setup>
import { watch, watchEffect } from 'vue'

const count = ref(0)

// 监听特定值
watch(count, (newValue, oldValue) => {
  console.log('count changed:', newValue)
})

// 自动追踪依赖
watchEffect(() => {
  console.log('count is:', count.value)
})
</script>
```
主要特点：
- 更好的 TypeScript 支持
- 更好的运行时性能
- 更好的代码组织
- 更好的逻辑复用
使用建议：
1. 优先使用 `<script setup>`
2. 根据数据类型选择 ref 或 reactive
3. 合理使用生命周期钩子
4. 适当拆分复杂逻辑到组合式函数
## 13 依赖注入的作用域问题
customConfigProvider 虽然是全局定义的函数，但它创建的依赖注入是有作用域的。在 Vue 中，依赖注入遵循"就近原则"，即：
- 依赖注入只能从父组件流向子组件

- 组件只能注入其父级链上存在的数据

在当前的结构中：
```plaintext
MyLayout
  └── FeishuLayout (wrapped by customConfigProvider)
      └── ArticleList (tries to inject values)
```
问题在于：当我们用 customConfigProvider 包装 FeishuLayout 时，注入的值是在 FeishuLayout 内部提供的，而不是在整个应用的根级别。

解决方案有两种：
1. 在根组件（如 App.vue）中提供这些值
2. 在 MyLayout 中直接提供这些值（我们之前采用的方案）
这就是为什么我们建议直接在 MyLayout 中使用 provide ，而不是通过 customConfigProvider 包装组件。这样可以确保所有子组件都能访问到这些值。

那我在index.js里写const wrappedFeishuLayout = customConfigProvider(FeishuLayout);也是注入的FeishuLayout，为什么他可以在ArticleList读取到注入值



这是因为在 index.js 中的注入方式不同。让我解释一下：
1. 在 index.js 中：

```javascript
const wrappedFeishuLayout = customConfigProvider(FeishuLayout);

const theme = {
  ...DefaultTheme,
  layouts: {
    feishu: wrappedFeishuLayout,
    // ...
  }
}
```


这种方式是在应用的根级别注册布局组件，当 VitePress 使用这个布局时， wrappedFeishuLayout 会成为整个页面的根组件之一，因此它提供的值可以被其所有子组件（包括 ArticleList）访问到。


1. 组件层级结构：

```plaintext
App (VitePress root)
  └── wrappedFeishuLayout (提供依赖注入)
      └── FeishuLayout
          └── ArticleList (可以访问注入的值)
```


而在 MyLayout 中直接包装组件的方式会创建这样的结构：


```plaintext
App (VitePress root)
  └── MyLayout
      └── wrappedFeishuLayout (提供依赖注入，但层级太深)
          └── ArticleList
```
所以在 index.js 中注册的方式更适合全局依赖注入的场景。

让我用更简单的方式解释：

在 VitePress 中，布局组件的渲染层级是这样的：
```plaintext
VitePress App (最顶层)
└── layouts 中注册的布局组件
    └── 页面内容和其他组件
```
当我们在 index.js 中这样注册：
```javascript
const wrappedFeishuLayout = customConfigProvider(FeishuLayout);

const theme = {
  layouts: {
    feishu: wrappedFeishuLayout  // 这里直接作为布局注册
  }
}
```
wrappedFeishuLayout 会被直接放在最顶层使用，它提供的依赖注入值可以被其下所有组件访问到。

而如果在 MyLayout 中这样使用：
```javascript
<component :is="wrappedFeishuLayout">
```
这时 wrappedFeishuLayout 是在 MyLayout 内部渲染的，它提供的值只能被它自己的子组件访问，而不是整个应用。

简单来说：
- index.js 中注册的布局组件 = 全局级别

- 组件内部使用的包装组件 = 局部级别

这就是为什么在 index.js 中注册的包装组件可以正常工作。
## 14 vitepress机制  基于Vue 的单页应用（SPA）
 VitePress 是一个基于 Vue 的单页应用（SPA），页面导航是通过 Vue Router 实现的，不会触发整个应用的重新加载。

在vitepress里通过刷新重载进入页面和点开链接切换页面，后端有什么区别。
1. 刷新重载进入页面：
	- 完整的服务器请求
		- 重新执行 index.js
		- 重新初始化整个 VitePress 应用
		- 所有组件重新挂载
		- 重新执行所有依赖注入
		- SSR (服务端渲染) 会重新执行
	
1. 点击链接切换页面：
	- 使用 Vue Router 的客户端路由
		- 不会重新执行 index.js
		- 只更新变化的组件
		- 保持应用状态
		- 不会触发完整的服务器请求
		- 不会重新执行 SSR
	
这就是为什么有些配置（如布局切换）在刷新时正常工作，但在点击链接切换时不生效。因为 index.js 中的配置只在首次加载时执行一次。

这也是为什么我们需要在路由变化时手动处理一些逻辑，比如布局切换和状态重置。



后台控制台打印出来的console.log不同：

在 VitePress 的客户端路由切换过程中，组件的生命周期行为不同：
1. 当通过路由切换进入页面时：
	- 组件实例被复用
		- 不会触发 onMounted 钩子
		- 只会触发 watch 和响应式更新
	
1. 当通过刷新页面进入时：
	- 组件被完全重新创建
		- 会触发 onMounted 钩子
		- 所有生命周期钩子都会执行
	
## 15 `<Suspense>`
`<Suspense>`是 Vue 3 提供的一个内置组件，用于处理异步组件和异步数据加载。它主要用于：
1. 处理异步组件加载

1. 等待异步数据获取

1. 提供加载状态的显示

```xml
<template>
  <Layout>
    <template #doc-top>
      <ClientOnly>
        <Suspense>
          <template #default>
            <!-- 这里放主要内容，可能包含异步操作 -->
            <CategoryNav />
            <ArticleList />
          </template>
          <template #fallback>
            <!-- 这里放加载状态的显示内容 -->
            <div>加载中...</div>
          </template>
        </Suspense>
      </ClientOnly>
    </template>
  </Layout>
</template>
```
如果 CategoryNav 或 ArticleList 组件中有异步操作（比如数据获取），Suspense 会：


1. 显示 fallback 内容，直到异步操作完成

1. 完成后自动切换到实际内容

不过，如果你的组件中没有异步操作，其实可以省略 Suspense，直接使用组件即可。

16 !!ArticleList和ArticleList！分别代表什么意思

在 JavaScript/TypeScript 中：


1. !!ArticleList ：
		- 双感叹号，将值转换为布尔值
		- 用于检查变量是否存在（不是 null 或 undefined）
		- 例如：
		```javascript
		const a = null;
		console.log(!!a);  // false
		
		const b = {};
		console.log(!!b);  // true
		```
1. ArticleList! ：
	- 单感叹号在 TypeScript 中是非空断言操作符
		- 告诉 TypeScript 编译器该值一定不是 null 或 undefined
		- 用于跳过 TypeScript 的空值检查
		- 例如：
		```typescript
		let name: string | undefined;
		console.log(name!.length);  // 告诉 TypeScript 编译器 name 一定有值
		```
所以 console.log("ArticleList 组件状态:", !!ArticleList) 是在检查 ArticleList 组件是否成功导入和存在。


## 16，vue 组件构成
![image](/feishu/asset/images/POQAb21PhozpVMxwtlwcDM0hnqh.png)
从控制台输出来看，一个 Vue 组件通常会包含以下主要部分：


1. __file ：组件文件的路径

1. render ：渲染函数

1. setup ：组件的 setup 函数（Vue 3 组合式 API）

1. name ：组件名称

1. **proto** ：原型对象，包含：
	- constructor ：构造函数
		- hasOwnProperty ：属性检查方法
		- isPrototypeOf ：原型检查方法
		- propertyIsEnumerable ：属性可枚举性检查
		- toLocaleString ：本地化字符串转换
		- toString ：字符串转换
		- valueOf ：值转换
		- **defineGetter** ：定义 getter
		- **defineSetter** ：定义 setter
		- **lookupGetter** ：查找 getter
		- **lookupSetter** ：查找 setter
	
你可以这样查看更详细的信息：


```javascript
console.log("组件详细信息:", {
  文件路径: CategoryNav.__file,
  组件名称: CategoryNav.name,
  Setup函数: CategoryNav.setup,
  渲染函数: CategoryNav.render
})
```
## 17，VitePress 的 Layout 组件有特定的插槽结构
```javascript
  // 延迟检查 DOM
  setTimeout(() => {
    console.log("延迟检查 DOM:", {
      container: document.querySelector('.feishu-container'),
      layout: document.querySelector('.Layout'),
      body: document.body
    })
  }, 100)
  console.log("可用插槽:", slots.value)
  console.log("Layout 插槽检查:", {
    layout: Layout,
    slots: Layout?.slots,
    frontmatter: frontmatter.value
  })
```
## 18，Layout 组件初始化插槽系统。
```javascript
export function customConfigProvider(App: Component) {
  return defineComponent({
    name: "ConfigProvider",
    setup(props, { slots }) {
      const defaultPageKey = ref(1);
      provide(currentPageKey, defaultPageKey);
      const currentCategory = ref("");
      provide(currentCategoryKey, currentCategory);
      return () => h(App, null, slots);
    },
  });
}
```
configProvider.ts 中的 slots 是用于不同的目的   ：

这里的 slots 是用于依赖注入系统的配置提供者：

它主要用于传递 currentPageKey 和 currentCategoryKey 这两个全局状态
- setup(props, { slots }) 中的 slots 是 Vue 组件的默认插槽系统

- return () => h(App, null, slots) 是在渲染包装的应用组件时传递插槽内容

1. 而我们在 Layout 组件中遇到的 slots: undefined 问题是关于 VitePress 主题布局系统的插槽：
	这是特定于 VitePress 的布局系统	- 用于定义页面的不同区域（如页头、页脚、侧边栏等）
		- 与 configProvider 中的通用 Vue 插槽系统是不同的概念
	
所以这两个 slots 是不同的系统：
- configProvider 中的是用于依赖注入和组件通信

- Layout 中的是用于 VitePress 的页面布局结构

我们还需要继续寻找正确初始化 Layout slots 的方法。


## 19，vitepress/theme和vitepress/client
import DefaultTheme from "vitepress/theme";和import { Theme } from 'vitepress/client'有什么区别

这两种导入方式的主要区别在于：
1. import DefaultTheme from "vitepress/theme" ：
	- 直接导入默认主题的完整实现
		- 包含了所有主题相关的组件和配置
		- 适合当你想要扩展或修改默认主题时使用
		- 通过 const { Layout } = DefaultTheme 可以解构出布局组件
	
1. import { Theme } from 'vitepress/client' ：
	- 从客户端运行时导入主题接口
		- 更轻量级，只包含主题的核心功能
		- 适合当你想要创建完全自定义主题时使用
		- 主要用于类型定义和主题配置
	
在当前的场景中，由于我们是在扩展默认主题的布局，使用 import DefaultTheme from "vitepress/theme" 更合适，因为：
1. 我们需要使用默认主题的 Layout 组件

1. 我们想保留默认主题的其他功能

1. 我们只是在现有布局基础上添加自定义内容

所以建议保持当前的导入方式不变。
- vitepress/theme 包含了完整的默认主题实现，包括 Layout 组件

- vitepress/client 主要包含客户端运行时的接口和类型定义


## 20，h 函数创建虚拟 DOM
h 函数是 Vue 的渲染函数，用于创建虚拟 DOM。
```javascript
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter } = useData()
    const currentLayout = computed(() => {
      switch(frontmatter.value.layout) {
        case 'feishu':
          // h 函数的基本语法：h(组件, 属性对象, 子节点/插槽内容)
          return h(DefaultTheme.Layout, {}, {
            // 使用具名插槽
            'doc-before': () => h('div', { class: 'custom-doc-before' }, '顶部内容'),
            // 默认插槽
            default: () => h(wrappedFeishuLayout)
          })
        // ... 其他 case
      }
    })
    return currentLayout.value
  }
}
```
h 函数的三个参数：
1. 第一个参数：要渲染的组件或 HTML 标签

1. 第二个参数：组件的 props 或 HTML 标签的属性

1. 第三个参数：子节点或插槽内容（可以是对象形式来指定具名插槽）

在你的场景中，我们用它来：
1. 包装默认主题布局

1. 在其中渲染自定义布局

1. 保持默认主题的功能

## 21,  防止被markdown解析成代码
     
 最推荐的方法是使用反引号 ` 包裹标签，这样既简单又能确保内容不被解析为 HTML。
## 22，hugo和vitepress区别和优劣
### 主要区别
1. 技术栈
	- Hugo: 基于 Go 语言开发
		- VitePress: 基于 Vue 3 和 Vite 开发
	
1. 构建速度
	- Hugo: 构建速度极快，被称为"世界上最快的网站构建框架"
		- VitePress: 基于 Vite，热更新快，但完整构建速度不如 Hugo
	
1. 生态系统
	- Hugo: 主题丰富，插件生态成熟
		- VitePress: 可以使用 Vue 生态系统，组件化开发更灵活
	
### 优势对比
Hugo 优势：
1. 构建速度极快

1. 不需要安装复杂的依赖

1. 单一可执行文件，部署简单

1. 主题生态丰富

1. 适合大型静态网站

VitePress 优势：
1. 基于 Vue 3，组件化开发

1. 开发体验好，热更新快

1. 可以方便地集成动态功能

1. TypeScript 支持好

1. 适合构建交互性强的文档网站

### 选择建议
1. 如果您需要：
	- 纯静态博客/文档
		- 极快的构建速度
		- 简单的部署方案
		→ 选择 Hugo
1. 如果您需要：
	- 复杂的交互功能
		- Vue 生态系统支持
		- 现代前端开发体验
		→ 选择 VitePress
