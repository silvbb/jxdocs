---
title: markdown拓展
urlname: Hsa4dD76DoUnTjxLU0JcerKXn3g
date: "2025-03-25 01:23:01"
updated: "2025-03-25 03:46:22"
---

# markdown拓展

https://github.com/markdown-it/markdown-it

## 1，transformerTwoslash

```typescript
// 这是一个带有 Twoslash 功能的代码块
interface User {
  name: string;
  age: number; //[!code hl]
}

const user: User = {
  name: "张三", //[!code focus]
  age: 30,
};
//    ^?
```

```ts twoslash
console.log("hello");

//      ^?
```

## 2，TIP提示

::: info

这是信息

:::

::: tip

这是提醒

:::

::: warning

这是警告

:::

::: danger

这是危险

:::

::: details

这是详细信息

:::

> ⚽ 飞书自带高亮块

## 3，同步

## 4，引用

> ```typescript
>
> ```

&#60;!--@include:../test.md{3,}--&#62; 引用其他文件的第三行

```typescript
<!--@include:../test.md{3,}-->
```

## 5，反转义

- 方法一：使用 HTML 转义字符

&#60;!--@include:../test.md{3,}--&#62; 引用其他文件的第三行

- 方法二:推荐使用反引号 ` 包裹标签，这样既简单又能确保内容不被解析为 HTML。

- 方法三：

::: raw

Wraps in a<div class="vp-raw">{{1+1}}</div>

:::

## 6，链接

::: info

`写法：[链接](../test.md){target="_blank" rel="noreferrer"}`

:::

[链接](../test.md){target="\_blank" rel="noreferrer"}

::: info

`写法：[下载](../test.json){target="_download" download}`

:::

[下载](../test.json){target="\_download" download}

## 7,frontmatter

::: info

`获取写法：{{ $frontmatter.title }}`

:::

{{ $frontmatter.title }}

## 8，表格

| 姓名     | 组别     | 联系方式 |
| -------- | -------- | -------- |
| 收到     | 是的方式 | 单数复数 |
| 是的方式 | 是的方式 | 单数复数 |

## 9，emoji

https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs

:tada: :100:

:star_struck:

10 高亮 聚焦

//[!code hl]

//[!code focus]

//[!code --] or // [!code ++]

//[!code warning] or //[!code error]

## 10，代码导入

`写法:<<< @/filepath`

<<< ../code/01_python.py{1 python}

## 11，代码分组

::: code-group

```html
<h1></h1>
```

```CSS

h1 {}

```

```js

```

:::

::: code-group

<<< ../code/01_python.py{1 python}

<<< ../code/01_code.md{1}

:::

## 12，包含

`<!--@include:../parts/basics.md-->`

::: tip

<!--@include:../code/help.md-->

:::
