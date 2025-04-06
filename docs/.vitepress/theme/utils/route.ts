//Vitepress 一般是按照文件夹生成文档和目录。
//不按目录生成则json里有parent_uuid字段。

// 按目录存放文档需设置：
//语雀/飞书 在配置文件中配置deploy.local.catalog=true，即可按照语雀/飞书目录生成文档。
//Notion/FlowUs 在Notion写作平台配置项中配置write.notion.catalog=true 在部署平台配置项中配置deploy.local.catalog=true
//如果想自定义字段，不使用默认的catalog字段，则需要设置write.notion.catalog

/**
 * 针对 Notion 的数据结构设计的：
 * 只支持两级目录，适合扁平化的文档组织
 * 针对 Notion 的数据结构设计的：- 使用 properties 对象来获取文章属性- 按照 catalog 属性进行分类- 生成扁平的两级目录结构（目录 + 文章）
 * 只支持两级目录，适合扁平化的文档组织
 */
const genNotionRoute = (catalog: any[], pathname: string) => {
  let route = [];
  let directory = {};
  catalog.forEach((item) => {
    const dir = directory[item.properties.catalog];
    if (dir?.items?.length) {
      // 暂时忽略
      if (item.properties.urlname !== "fe8ywmt999gon12w") {
        dir.items.push({
          text: item.properties.title,
          link: `${pathname}/${item.properties.urlname}`,
        });
      }
    } else {
      directory[item.properties.catalog] = {
        text: item.properties.catalog,
        collapsed: false,
        items: [
          {
            text: item.properties.title,
            link: `${pathname}/${item.properties.urlname}`,
          },
        ],
      };
      route.push(directory[item.properties.catalog]);
    }
  });

  return route;
  // // 获取结构目录
  // const catalogs = docs.map(item => item.properties).sort((a, b) => {
  //   const itema = a.catalog.split('-')[0]
  //   const itemb = b.catalog.split('-')[0]
  // })
};

/** 新方法：json中没有parent_uuid，
 * 针对语雀/飞书的数据结构设计的：
 * 使用递归方式处理多级目录
 * 保留递归方法但适配飞书的数据结构：使用 catalog[0].title 来判断父子关系 使用 properties.urlname 作为文档链接
 * 支持无限级目录，适合树状的文档组织
 */
function genYuqueRoute2(arr, pathname) {
  console.log("\n\n========== 调用语雀/飞书的数据结构 ==========\n\n");
  function loop(parentTitle = "") {
    return arr.reduce((acc, cur) => {
      // 打印当前处理的数据结构
      console.log("当前文档:", JSON.stringify(cur, null, 2));

      // 获取当前文档的目录路径
      const currentCatalog = cur.catalog?.[0]?.title || "";
      console.log("当前目录:", currentCatalog, "父目录:", parentTitle);

      // 修改判断逻辑
      if (!cur.catalog || cur.catalog.length === 0) {
        // 这是一级文档
        if (parentTitle === "") {
          route = {
            text: cur.properties.title,
            link: `${pathname}/${cur.properties.urlname}`,
          };
          acc.push(route);
        }
      } else {
        // 这是二级文档
        const dirTitle = cur.catalog[0].title;
        if (!acc.find((item) => item.text === dirTitle)) {
          acc.push({
            text: dirTitle,
            collapsed: false,
            items: [],
          });
        }

        // 找到对应的目录，添加文档
        const dir = acc.find((item) => item.text === dirTitle);
        if (dir) {
          dir.items.push({
            text: cur.properties.title,
            link: `${pathname}/${cur.properties.urlname}`,
          });
        }
      }

      return acc;
    }, []);
  }

  const result = loop("");
  console.log("生成的导航结构:", JSON.stringify(result, null, 2));
  return result;
}

/** 新方法2：利用cluade3.5生成的，feishu.json中没有parent_uuid，使用 catalog 数组来构建目录结构：
 * 针对语雀/飞书的数据结构设计的：
 * 使用递归方式处理多级目录
 * 保留递归方法但适配飞书的数据结构：使用 catalog[0].title 来判断父子关系 使用 properties.urlname 作为文档链接
 * 支持无限级目录，适合树状的文档组织
 */
function genYuqueRoute3(arr, pathname) {
  console.log("\n\n========== 调用飞书多级目录结构 ==========\n\n");

  if (!arr || !Array.isArray(arr)) {
    console.warn("输入数据无效");
    return [];
  }

  function processDocuments(docs) {
    const result = [];
    const directoryMap = new Map();

    docs.forEach((doc) => {
      if (!doc || !doc.properties || !doc.properties.title) {
        return;
      }

      // 处理文档链接路径
      const linkPath = doc.relativePath
        .replace(/\\/g, "/") // 替换反斜杠为正斜杠
        .replace(/\.md$/, "") // 移除.md后缀
        .replace(/^\//, ""); // 移除开头的斜杠

      // 处理一级文档（没有目录的文档）
      if (
        !doc.catalog ||
        !Array.isArray(doc.catalog) ||
        doc.catalog.length === 0
      ) {
        result.push({
          text: doc.properties.title,
          link: `${pathname}/${linkPath}`,
        });
      } else {
        // 处理二级或多级文档
        const parentTitle = doc.catalog[0].title;
        if (!directoryMap.has(parentTitle)) {
          directoryMap.set(parentTitle, {
            text: parentTitle,
            collapsed: false,
            items: [],
          });
        }

        const dir = directoryMap.get(parentTitle);
        // 如果是三级目录
        if (doc.catalog.length > 1) {
          const subDirTitle = doc.catalog[1].title;
          let subDir = dir.items.find((item) => item.text === subDirTitle);
          if (!subDir) {
            subDir = {
              text: subDirTitle,
              collapsed: false,
              items: [],
            };
            dir.items.push(subDir);
          }
          subDir.items.push({
            text: doc.properties.title,
            link: `${pathname}/${linkPath}`,
          });
        } else {
          // 二级目录文档
          dir.items.push({
            text: doc.properties.title,
            link: `${pathname}/${linkPath}`,
          });
        }
      }
    });

    // 将所有目录组添加到结果中
    directoryMap.forEach((dir) => {
      result.push(dir);
    });

    return result;
  }

  return processDocuments(arr);
}

/** 老方法：json中有parent_uuid
 * 针对语雀/飞书的数据结构设计的：
 * 使用递归方式处理多级目录
 * 通过 parent_uuid 和 uuid 建立父子关系 可以生成多级嵌套的目录结构
 * 支持无限级目录，适合树状的文档组织
 */
function genYuqueRoute(arr, pathname) {
  console.log("\n\n========== 调用语雀/飞书的数据结构 ==========\n\n");
  function loop(parId) {
    return arr.reduce((acc, cur) => {
      console.log("父节点：" + cur.parent_uuid);
      if (cur.parent_uuid === parId) {
        // const parent = arr.find(item => item.uuid === parId)
        // cur.path = (parent?.path || '') + '/' + cur.title
        cur.path = "/" + cur.slug;
        cur.items = loop(cur.uuid);
        let route;
        if (cur.items.length) {
          route = {
            text: cur.title,
            collapsed: false,
            items: cur.items,
          };
          acc.push(route);
        } else {
          if (cur.type === "DOC") {
            route = {
              text: cur.title,
              link: `${pathname}${cur.path}`,
            };
            acc.push(route);
          }
        }
      }
      return acc;
    }, []);
  }
  return loop("");

  //改方法：
  // 构建目录树
  // const directories = arr.reduce((acc, cur) => {
  //   if (cur.catalog && cur.catalog.length > 0) {
  //     // 这是二级文档
  //     const dirTitle = cur.catalog[0].title;
  //     if (!acc[dirTitle]) {
  //       acc[dirTitle] = {
  //         text: dirTitle,
  //         collapsed: false,
  //         items: []
  //       };
  //     }
  //     acc[dirTitle].items.push({
  //       text: cur.title,
  //       link: `${pathname}/${cur.doc_id}`
  //     });
  //   } else {
  //     // 这是一级文档
  //     acc[cur.title] = {
  //       text: cur.title,
  //       link: `${pathname}/${cur.doc_id}`
  //     };
  //   }
  //   return acc;
  // }, {});

  // return Object.values(directories);
}

/**
 * 生成语雀导航
 * @param pathname
 */
export const genYuqueSideBar = (pathname: string) => {
  const cache = safeRequire("../../../yuque/elog.cache.yuque-token.json");
  const { catalog } = cache;
  return genYuqueRoute(catalog, pathname);
};

/**
 * 生成飞书导航
 * @param pathname
 */
export const genFeiShuSideBar = (pathname: string) => {
  console.log("开始生成FeiShu侧边栏，尝试读取缓存文件...");
  const vvpath = "../../../feishu/elog.cache.feishu.json";
  console.log(`尝试读取文件: ${vvpath}`);
  const absolutePath = resolve(__dirname, vvpath);
  console.log("当前文件目录:", __dirname);
  console.log("缓存文件绝对路径:", absolutePath);
  console.log("文件是否存在:", existsSync(absolutePath));

  const cache = require("../../../feishu/elog.cache.feishu.json");
  const { docs } = cache;

  if (!cache || !cache.catalog || cache.catalog.length === 0) {
    console.warn("警告: 缓存为空或不包含目录信息");
    return [];
  }

  //如果是按照目录生成的文档
  return genYuqueRoute3(docs, pathname);
};

/**
 * 生成飞书知识库导航
 * @param pathname
 */
export const genFeiShuwikiSideBar = (pathname: string) => {
  console.log("开始生成FeiShuwiki侧边栏，尝试读取缓存文件...");

  const vvpath = "../../../feishu-wiki/elog.cache.feishu-wiki.json";
  console.log(`尝试读取文件: ${vvpath}`);
  const absolutePath = resolve(__dirname, vvpath);
  console.log("当前文件目录:", __dirname);
  console.log("缓存文件绝对路径:", absolutePath);
  console.log("文件是否存在:", existsSync(absolutePath));

  const cache = require("../../../feishu-wiki/elog.cache.feishu-wiki.json");
  const { docs } = cache;

  // console.log("开始生成notion侧边栏，尝试读取缓存文件..."+catalog);

  if (!cache || !cache.catalog || cache.catalog.length === 0) {
    console.warn("警告: 缓存为空或不包含目录信息");
    return [];
  }

  return genYuqueRoute3(docs, pathname);
};

/**
 * 生成notion导航
 * @param pathname
 */
export const genNotionSideBar = (pathname: string) => {
  console.log("开始生成notion侧边栏，尝试读取缓存文件...");

  // 直接使用相对路径，不使用path模块

  //const cachePath = '../../../notion/elog.cache.notion.json';
  //直接写明路径，不能用const path 动态require
  const cache = require("../../../notion/elog.cache.notion.json");
  const { catalog } = cache;

  // console.log("开始生成notion侧边栏，尝试读取缓存文件..."+catalog[0][0]);

  if (!cache || !cache.catalog || cache.catalog.length === 0) {
    console.warn("警告: 缓存为空或不包含目录信息");
    return [];
  }

  return genNotionRoute(catalog, pathname);
};

/**
 * 生成flowus导航
 * @param pathname
 */
export const genFlowUsSideBar = (pathname: string) => {
  const cache = safeRequire("../elog.cache.flowus.json");
  const { catalog } = cache;
  return genNotionRoute(catalog, pathname);
};

// 添加类型定义
interface SidebarItem {
  text: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

import { existsSync } from "fs";
import { resolve } from "path";
/**
 * 安全地加载JSON文件
 * @param path 文件路径
 * @param defaultValue 默认值
 */
//  require 在 Node.js 中只能访问项目目录内的文件，不能访问项目根目录以外的文件
function safeRequire(path: string) {
  console.log(`尝试读取文件: ${path}`);
  const absolutePath = resolve(__dirname, path);
  console.log("当前文件目录:", __dirname);
  console.log("缓存文件绝对路径:", absolutePath);
  console.log("文件是否存在:", existsSync(absolutePath));

  try {
    if (existsSync(absolutePath)) {
      const cache = require(absolutePath);
      console.log("读取catalog结果:", cache);
      const { catalog } = cache;
      if (!cache || !cache.catalog || cache.catalog.length === 0) {
        console.warn("警告: 缓存为空或不包含目录信息");
        return [];
      }
      console.log("读取catalog结果:", catalog);
      return catalog;
    }
    return [];
  } catch (error) {
    console.warn(`无法加载文件: ${path}`, error);
    return [];
  }
}

// import { readFileSync } from 'fs'
// function safeRequire(path: string, defaultValue: any = { catalog: [] }) {
//   try {
//     if (existsSync(path)) {
//       const content = readFileSync(path, 'utf-8')
//       return JSON.parse(content)
//     }
//     return defaultValue
//   } catch (error) {
//     console.warn(`无法加载文件: ${path}`, error)
//     return defaultValue
//   }
// }
