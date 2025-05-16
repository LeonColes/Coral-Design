import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // HBuilderX 必须针对要使用的 Collections 做异步导入
      // collections: {
      //   carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      // },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      // 珊瑚色系
      coral: {
        50: 'var(--coral-50)',
        100: 'var(--coral-100)',
        500: 'var(--coral-500)',
        700: 'var(--coral-700)',
        900: 'var(--coral-900)',
      },
      // 青绿色系
      teal: {
        50: 'var(--teal-50)',
        100: 'var(--teal-100)',
        500: 'var(--teal-500)',
        700: 'var(--teal-700)',
        900: 'var(--teal-900)',
      },
      // 其他颜色...
    },
    fontSize: {
      'xs': 'var(--font-size-xs)',
      'sm': 'var(--font-size-sm)',
      'base': 'var(--font-size-base)',
      'lg': 'var(--font-size-lg)',
      'xl': 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
      '5xl': 'var(--font-size-5xl)',
    },
    // 其他主题配置...
  },

  // 添加快捷方式
  shortcuts: {
    // 标题
    'h1': 'text-4xl font-bold leading-tight',
    'h2': 'text-3xl font-bold leading-tight',
    'h3': 'text-2xl font-medium leading-tight',
    'h4': 'text-xl font-medium leading-normal',
    'h5': 'text-lg font-medium leading-normal',
    'h6': 'text-base font-medium leading-normal',

    // 按钮
    'btn': 'px-4 py-2 rounded-md transition-all duration-200',
    'btn-primary': 'bg-coral-500 text-white hover:bg-coral-700',
    'btn-secondary': 'bg-teal-500 text-white hover:bg-teal-700',

    // 卡片
    'card': 'bg-white rounded-lg shadow p-4',
    // 更多快捷方式...
  },
})
