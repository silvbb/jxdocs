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
        // 定义缩放动画
        // 这个动画会产生一个"呼吸"效果：在原始大小和一半大小之间循环变化，每次变化用时2秒
        custom:
          "{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}",
      },
      durations: {
        // 动画持续时间
        custom: "2s",
      },
      timingFns: {
        // 动画缓动函数
        custom: "cubic-bezier(0.4,0,.6,1)",
      },
      properties: {
        // 动画属性
        custom: { "transform-origin": "center" },
      },
      counts: {
        // 动画循环次数
        custom: "infinite",
      },
    },
  },
  presets: [
    presetWind3(), // Tailwind v3 预设
    presetAttributify(), // 属性化模式支持
    presetIcons(), // 图标支持

    // presetIcons({
    //   scale: 1.2,
    //   collections: {
    //     carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
    //     //logos: () => import('@iconify-json/logos/icons.json').then(i => i.default)
    //   }
    // }),
  ],
  transformers: [transformerDirectives()],
});
