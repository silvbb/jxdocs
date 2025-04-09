import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "通往AGI之路",
    link: "https://www.waytoagi.com/zh",
    activeMatch: "/AGC",
  },
  {
    text: "与智能体对话",
    items: [
      {
        text: "JWisdom",
        link: "/jx/jwisdom/index",
        activeMatch: "/jx/jwisdom/",
      },
      {
        text: "WiseAgent",
        link: "https://www.coze.cn/home",
        activeMatch: "/jx/wiseagent/",
      },
      {
        text: "MyClaude",
        link: "https://www.claude.com/",
        activeMatch: "/jx/tools/",
      },
      {
        text: "JxFlow",
        link: "https://www.runninghub.cn/",
        activeMatch: "/jx/solutions/",
      },
    ],
    activeMatch: "/jx",
  },
  {
    text: "我的知识库",
    items: [
      {
        text: "飞书云文档",
        link: "/feishu/index",
        activeMatch: "/feishu/",
      },
      {
        text: "飞书云文档page",
        link: "/feishupage/index",
        activeMatch: "/feishupage/",
      },
      {
        text: "飞书知识库",
        link: "/feishu-wiki/index",
        activeMatch: "/feishu-wiki/",
      },
      {
        text: "Notion知识库",
        link: "/notion/index",
        activeMatch: "/notion/",
      },
      {
        text: "微信知识库",
        link: "/kb/weixin/index",
        activeMatch: "/TextKnowledge/weixin/",
      },
    ],
    activeMatch: "/kb/",
  },
  // {
  //   text: "我的小册",
  //   items: [
  //     {
  //       text: "Java基础快速入门",
  //       link: "/courses/java/index",
  //       activeMatch: "/courses/java/",
  //     },
  //     {
  //       text: "MySQL快速入门",
  //       link: "/courses/mysql/index",
  //       activeMatch: "/courses/mysql/",
  //     },
  //     {
  //       text: "MyBatis快速入门",
  //       link: "/courses/mybatis/index",
  //       activeMatch: "/courses/mybatis/",
  //     },
  //   ],
  //   activeMatch: "/courses/",
  // },
  {
    text: "我的分类",
    items: [
      {
        text: "Bug万象集",
        link: "/categories/issues/index",
        activeMatch: "/categories/issues/",
      },
      {
        text: "碎片记忆",
        link: "/categories/fragments/index",
        activeMatch: "/categories/fragments/",
      },
      {
        text: "工具集",
        link: "/categories/tools/index",
        activeMatch: "/categories/tools/",
      },
      {
        text: "方案春秋志",
        link: "/categories/solutions/index",
        activeMatch: "/categories/solutions/",
      },
      { text: "AI网页秀", link: "/aiweb/index", activeMatch: "/aiweb/" },
      {
        text: "编程广志秀",
        link: "/categories/codeshow/index",
        activeMatch: "/categories/codeshow/",
      },
      { text: "框架组件", link: "/site/framework", activeMatch: "/site/" },
    ],
    activeMatch: "/categories/",
  },
  {
    text: "我的标签",
    link: "/tags",
    activeMatch: "/tags",
  },
  {
    text: "我的归档",
    link: "/archives",
    activeMatch: "/archives",
  },
  {
    text: "关于",
    items: [
      { text: "关于知识库", link: "/about/index", activeMatch: "/about/index" },
      { text: "关于我", link: "/about/me", activeMatch: "/about/me" },
      { text: "资源导航", link: "/site/index", activeMatch: "/site/" },
      {
        component: "RainbowAnimationSwitcher",
        props: {
          text: "Rainbow Animation",
        },
      },
    ],
    activeMatch: "/about/", // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  },
];
