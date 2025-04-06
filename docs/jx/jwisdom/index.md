---
layout: home

title: 与JWisdom的智能体对话
titleTemplate: 技术知识库，全面AI时代即将来临!

hero:
  name: 与JWisdom的智能体对话
  text: 杰出 & 多维 & 智能体
  tagline: 全面AI时代即将来临!
  image:
    src: /logo-learn.png
    alt: 铁骑的知识库
  actions:
    - theme: brand
      text: 快速开始
      link: /notion/start
    - theme: alt
      text: GitHub
      link: https://github.com/silvbb
features:
  - icon:
      src: /img/svg/focus.svg
    title: 杰出
    details: "杰出不是偶然，而是智能与创新的必然交汇。"
  - icon:
      src: /img/svg/insight.svg
    title: 多维度
    details: "多维度思考是智能体最珍贵的礼物，它让我们超越了算法的局限。"
  - icon:
      src: /img/svg/knowledge.svg
    title: 智能体
    details: "智能体不只是回应命令，更是预见需求。"
---

<!-- 在这里添加对话框组件 -->
<div class="chat-section">
<ClientOnly>
  <ChatDialog />
</ClientOnly>
</div>

<!-- <style>
.chat-section {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
</style> -->
<style>
.chat-section {
  position: absolute;
  top: -650px;  /* 调整垂直位置 */
  right: 80px; /* 调整水平位置 */
  width: 450px;
  z-index: 10;
}

/* 修改对话框内部消息区域的高度 */
/* .chat-window .chat-messages {
  height: 300px; 
} 
*/

/* GitHub 主题风格美化 */
:deep(.chat-window) {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e4e8;
  background: #ffffff;
}

:deep(.chat-header) {
  background: #0969da;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e4e8;
}

:deep(.chat-header h3) {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: white;
}

:deep(.chat-messages) {
  padding: 16px;
  background: #f6f8fa;
  height: 320px;
}

:deep(.message) {
  padding: 10px 14px;
  margin-bottom: 12px;
  border-radius: 6px;
  max-width: 85%;
  line-height: 1.5;
  font-size: 14px;
}

:deep(.user-message) {
  background: #0969da;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}

:deep(.bot-message) {
  background: #ffffff;
  color: #24292e;
  align-self: flex-start;
  border-bottom-left-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e4e8;
}

:deep(.chat-input) {
  padding: 12px;
  background: #ffffff;
  border-top: 1px solid #e1e4e8;
}

:deep(.chat-input input) {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d0d7de;
  background: #f6f8fa;
  color: #24292e;
  font-size: 14px;
  width: 100%;
}

:deep(.chat-input input:focus) {
  outline: none;
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
}

:deep(.chat-input button) {
  background: #2da44e;
  color: white;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  margin-left: 8px;
  transition: background-color 0.2s;
  border: 1px solid rgba(27, 31, 36, 0.15);
}

:deep(.chat-input button:hover) {
  background: #2c974b;
}

/* 暗色模式适配 */
.dark :deep(.chat-window) {
  background: #0d1117;
  border-color: #30363d;
}

.dark :deep(.chat-header) {
  background: #1f6feb;
  border-color: #30363d;
}

.dark :deep(.chat-messages) {
  background: #161b22;
}

.dark :deep(.bot-message) {
  background: #0d1117;
  color: #c9d1d9;
  border-color: #30363d;
}

.dark :deep(.chat-input) {
  background: #0d1117;
  border-color: #30363d;
}

.dark :deep(.chat-input input) {
  background: #0d1117;
  border-color: #30363d;
  color: #c9d1d9;
}

.dark :deep(.chat-input input:focus) {
  border-color: #1f6feb;
  box-shadow: 0 0 0 3px rgba(56, 139, 253, 0.3);
}


/* 隐藏原来的 logo */
.VPHero .image-container {
  display: none;
}
</style>
