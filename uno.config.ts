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
      'coral': {
        50: 'var(--coral-50)',
        100: 'var(--coral-100)',
        300: 'var(--coral-300)',
        500: 'var(--coral-500)',
        700: 'var(--coral-700)',
        900: 'var(--coral-900)',
      },
      // 青绿色系
      'teal': {
        50: 'var(--teal-50)',
        100: 'var(--teal-100)',
        300: 'var(--teal-300)',
        500: 'var(--teal-500)',
        700: 'var(--teal-700)',
        900: 'var(--teal-900)',
      },
      // 中性色
      'gray': {
        50: 'var(--gray-50)',
        100: 'var(--gray-100)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        500: 'var(--gray-500)',
        700: 'var(--gray-700)',
        900: 'var(--gray-900)',
      },
      // 基础颜色
      'white': 'var(--white)',
      'black': 'var(--black)',
      // 功能色
      'success': 'var(--success)',
      'info': 'var(--info)',
      'warning': 'var(--warning)',
      'error': 'var(--error)',
      // 语义化颜色
      'primary': 'var(--primary)',
      'primary-light': 'var(--primary-light)',
      'primary-dark': 'var(--primary-dark)',
      'primary-darker': 'var(--primary-darker)',
      'secondary': 'var(--secondary)',
      'secondary-light': 'var(--secondary-light)',
      'secondary-dark': 'var(--secondary-dark)',
      'secondary-darker': 'var(--secondary-darker)',
      // 应用色
      'bg-page': 'var(--bg-page)',
      'bg-card': 'var(--bg-card)',
      'bg-hover': 'var(--bg-hover)',
      'text-primary': 'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
      'text-hint': 'var(--text-hint)',
      'text-disabled': 'var(--text-disabled)',
      'border-base': 'var(--border-base)',
      'divider': 'var(--divider)',
    },
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      md: 'var(--font-size-md)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      h1: 'var(--font-size-h1)',
      h2: 'var(--font-size-h2)',
      h3: 'var(--font-size-h3)',
      h4: 'var(--font-size-h4)',
      h5: 'var(--font-size-h5)',
      h6: 'var(--font-size-h6)',
    },
    fontWeight: {
      light: 'var(--font-weight-light)',
      regular: 'var(--font-weight-regular)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
    },
    lineHeight: {
      tight: 'var(--line-height-tight)',
      base: 'var(--line-height-base)',
      loose: 'var(--line-height-loose)',
    },
    spacing: {
      0: 'var(--spacing-0)',
      1: 'var(--spacing-1)',
      2: 'var(--spacing-2)',
      3: 'var(--spacing-3)',
      4: 'var(--spacing-4)',
      5: 'var(--spacing-5)',
      6: 'var(--spacing-6)',
      8: 'var(--spacing-8)',
      10: 'var(--spacing-10)',
      12: 'var(--spacing-12)',
      16: 'var(--spacing-16)',
      20: 'var(--spacing-20)',
      24: 'var(--spacing-24)',
    },
    borderRadius: {
      none: 'var(--radius-none)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      full: 'var(--radius-full)',
    },
    boxShadow: {
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
    },
    // 黄金分割比例相关
    goldenRatio: {
      value: 'var(--golden-ratio)',
      padding: {
        mini: {
          v: 'var(--golden-ratio-padding-mini-v)',
          h: 'var(--golden-ratio-padding-mini-h)',
        },
        small: {
          v: 'var(--golden-ratio-padding-small-v)',
          h: 'var(--golden-ratio-padding-small-h)',
        },
        medium: {
          v: 'var(--golden-ratio-padding-medium-v)',
          h: 'var(--golden-ratio-padding-medium-h)',
        },
        large: {
          v: 'var(--golden-ratio-padding-large-v)',
          h: 'var(--golden-ratio-padding-large-h)',
        },
      },
    },
  },

  // 添加快捷方式
  shortcuts: {
    // 标题
    h1: 'text-h1 font-bold leading-tight',
    h2: 'text-h2 font-bold leading-tight',
    h3: 'text-h3 font-medium leading-tight',
    h4: 'text-h4 font-medium leading-base',
    h5: 'text-h5 font-medium leading-base',
    h6: 'text-h6 font-medium leading-base',

    // 卡片
    card: 'bg-white rounded-lg shadow-sm p-4',
  },
})
