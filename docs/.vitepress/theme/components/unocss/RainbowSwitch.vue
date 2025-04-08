<script setup lang="ts">
import { inject } from "vue";
import { useCurrentRainbowKey } from "../../configProvider";
const isRainbowEnabled = useCurrentRainbowKey();
const toggleRainbow = inject("toggle-rainbow");
</script>

<template>
  <button
    class="VPSwitch rainbow-switch"
    type="button"
    role="switch"
    :aria-checked="isRainbowEnabled"
    @click="toggleRainbow"
  >
    <span class="check" :class="{ checked: isRainbowEnabled }">
      <span class="icon" :class="{ 'rainbow-enabled': isRainbowEnabled }"
        >🌈</span
      >
    </span>
  </button>
</template>

<style scoped>
.rainbow-switch {
  border: 1px solid var(--vp-c-divider);
  border-radius: 11px;
  padding: 2px;
  width: 40px;
  height: 22px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s;
  margin-left: 8px;
}

.rainbow-switch:hover {
  border-color: var(--vp-c-brand);
}
.check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  transition: transform 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check.checked {
  transform: translateX(18px);
}

.icon {
  font-size: 12px;
  filter: grayscale(100%);
  opacity: 0.6;
  transform: translateY(-1px);
}

.icon.rainbow-enabled {
  filter: none;
  opacity: 1;
}
</style>
