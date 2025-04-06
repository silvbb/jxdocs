<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="chat-header">
        <h3>与 JWisdom 对话</h3>
      </div>
      <div class="chat-messages" ref="messagesContainer">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            'message',
            msg.type === 'user' ? 'user-message' : 'bot-message',
          ]"
        >
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="输入您的问题..."
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";

const userInput = ref("");
const messages = ref([
  { type: "bot", content: "你好！我是 JWisdom，有什么可以帮助你的吗？" },
]);
const messagesContainer = ref(null);

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // 添加用户消息
  messages.value.push({ type: "user", content: userInput.value });
  const question = userInput.value;
  userInput.value = "";

  // 模拟AI回复
  setTimeout(() => {
    messages.value.push({
      type: "bot",
      content: `我收到了你的问题: "${question}"。这是一个示例回复。`,
    });
  }, 1000);
};

// 滚动到最新消息
watch(
  messages,
  async () => {
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  },
  { deep: true },
);
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.chat-window {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
}

.chat-header {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.chat-messages {
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f9f9f9;
}

.message {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
}

.user-message {
  align-self: flex-end;
  background: var(--vp-c-brand-light);
  color: white;
  border-bottom-right-radius: 0;
}

.bot-message {
  align-self: flex-start;
  background: white;
  color: #333;
  border-bottom-left-radius: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.chat-input {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #eee;
  background-color: white;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.75rem;
  font-size: 1rem;
}

.chat-input button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
}

.chat-input button:hover {
  background: var(--vp-c-brand-dark);
}
</style>
