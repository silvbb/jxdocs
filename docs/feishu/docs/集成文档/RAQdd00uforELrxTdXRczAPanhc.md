---
title: unocss
urlname: RAQdd00uforELrxTdXRczAPanhc
date: "2025-03-21 18:10:48"
updated: "2025-03-21 19:27:21"
---

1，安装核心库

pnpm i unocss @iconify-json/ep @unocss/preset-rem-to-px @unocss/transformer-directives -D

pnpm add -D vitepress-plugin-group-icons @iconify-json/carbon @unocss/preset-icons

pnpm add -D unocss @unocss/preset-wind @unocss/preset-attributify @unocss/preset-icons @unocss/transformer-directives
![image](/feishu/asset/images/LRfRbKeWtoHWPWxAVBYcI5hlnCe.png)
2，配置uno.config.ts

```typescript
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  // ...UnoCSS options
  theme: {
    animation: {
      keyframes: {
        custom:
          "{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}",
      },
      durations: {
        custom: "2s",
      },
      timingFns: {
        custom: "cubic-bezier(0.4,0,.6,1)",
      },
      properties: {
        custom: { "transform-origin": "center" },
      },
      counts: {
        custom: "infinite",
      },
    },
  },
  presets: [presetWind3(), presetIcons(), presetAttributify()],
  transformers: [transformerDirectives()],
});
```

3，
