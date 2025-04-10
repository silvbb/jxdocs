<template>
  <div class="chat-component" :style="positionStyle">
    <ClientOnly>
      <ChatDialog />
    </ClientOnly>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  top: {
    type: String,
    default: '-650px'
  },
  right: {
    type: String,
    default: '80px'
  },
  width: {
    type: String,
    default: '450px'
  }
});

const positionStyle = computed(() => ({
  top: props.top,
  right: props.right,
  width: props.width
}));
</script>

<style scoped>
.chat-component {
  position: absolute;
  z-index: 10;
}

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
</style>
