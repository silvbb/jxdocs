<script setup>
import {navigationData} from './data.js';
import {ElBacktop, ElAffix, ElScrollbar, ElLink} from 'element-plus'
import WebLink from './WebLink.vue'

// import {WebLink} from 'vitepress/theme'

const scrollToAnchor = (anchor) => {
  const target = document.querySelector(anchor);
  if (target) {
    const navHeight = document.querySelector('header').offsetHeight; // 获取导航栏的高度
    const offset = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20; // 计算滚动偏移量
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
}

</script>

<template>
  <el-backtop :bottom="100">
    <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
      UP
    </div>
  </el-backtop>
  <div class="page">
    <div class="nav">&nbsp;&nbsp;资源分类导航条：
  
  
          <div class="nav-grid">
            
          <el-link type="primary" v-for="(sites, index) in navigationData" :key="index"
                   @click="scrollToAnchor('#' + sites.title)">{{ sites.title }}
          </el-link>
          <el-link type="primary" href="https://spiderbox.cn/" target="_blank">资源链接来源于《虫盒》</el-link>
          <el-link type="primary" href="http://www.stardream.vip/" target="_blank">资源链接来源于星梦启航</el-link>
          <el-link type="primary" href="#">持续更新中</el-link>
        </div>
    
 
    </div>
    <div>
<!--              <el-link type="primary" href="https://www.qg.net/product/proxyip.html?source=star" target="_blank">-->
<!--          <img style="width: 450px" src="/imgs/ads/green.jpg"/>-->
<!--        </el-link>-->
<!--      <div class="flex-grow justify-center w-100" style="display: flex; justify-content: center; align-items: center;">-->
<!--        <el-link type="primary" href="https://www.qg.net/product/proxyip.html?source=star" target="_blank">-->
<!--          <img style="width: 450px" src="/imgs/ads/green.jpg"/>-->
<!--        </el-link>-->
<!--      </div>-->


      <WebLink :datalist="navigationData"></WebLink>
    </div>
  </div>
</template>

<style scoped>
.nav {
  padding: 0px 5px;
  width: 300px;  /* 调整宽度适应3列 */
  position: fixed;
  left: 0;
  top: 80px;
  z-index: 100;
  max-height: calc(100vh - 80px);  /* 设置最大高度 */
  overflow-y: auto;  /* 启用垂直滚动 */
  background-color: var(--vp-c-bg);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}
/* 自定义滚动条样式 */
.nav::-webkit-scrollbar {
  width: 6px;
}

.nav::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.nav::-webkit-scrollbar-track {
  background-color: transparent;
}
.el-scrollbar {
  overflow: visible !important;
}

/* .el-link {
  margin: 0px 8px;
  padding: 2px 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: black;
  border: 1px rgb(20, 143, 243) solid;
} */

.el-link {
  margin: 5px 0;
  padding: 5px 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: black;
  border: 1px rgb(20, 143, 243) solid;
  display: block;
  width: auto;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
}

.el-link:hover {
  background-color: rgb(20, 143, 243);
  color: white;
  transform: scale(1.05);
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

.page {
  display: flex;
  gap: 20px;  /* 添加左右间距 */
}
/* 添加右侧内容容器的样式 */
.page > div:last-child {
  margin-left: 180px;  /* 为左侧导航留出空间 */
  flex: 1;  /* 占据剩余空间 */
  min-width: 0;  /* 防止内容溢出 */
}
</style>