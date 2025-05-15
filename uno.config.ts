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
      // Primary
      primary: {
        DEFAULT: '#FF7E6A',
        dark: '#E55C48',
        light: '#FFD6D0',
      },

      // Secondary
      secondary: {
        DEFAULT: '#3ECDC4',
        dark: '#35A39B',
        light: '#8EEAE3',
      },

      // Neutral
      neutral: {
        50: '#FFFAF9',  // 页面背景
        100: '#F7F7F7', // 卡片底部背景
        200: '#EEEEEE', // 分割线、边框
        300: '#E0E0E0', // 禁用状态
        400: '#BDBDBD', // 轻微强调
        500: '#9E9E9E', // 提示文本
        600: '#757575', // 次要文本
        700: '#616161', // 次要文本
        800: '#424242', // 标题
        900: '#212121', // 主要文本
      },

      white: '#FFFFFF',
      background: '#FFFAF9',
      surface: '#FFFFFF',
      border: '#EEEEEE',
      disabled: '#E0E0E0',

      // Functional
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FF9800',
      error: '#F44336',

      text: {
        primary: '#212121',
        secondary: '#616161',
        hint: '#9E9E9E',
        disabled: '#9E9E9E',
        light: '#FFFFFF',
      },
      
      fontFamily: {
        sans: '"SF Pro Display", Inder, sans-serif'
      },

      fontSize: {
        xs: '12px',
        sm: '13px',
        base: '15px',
        lg: '17px',
        xl: '20px',
      },

      // 边距尺寸
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },

      // 圆角
      borderRadius: {
        none: '0',
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '100px', // 完全圆形的圆角
      },
    }
  }
})
