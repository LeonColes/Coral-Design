<script setup lang="ts">
import { computed } from 'vue'

// 可用的预设颜色
type PresetColor = 'primary' | 'success' | 'warning' | 'danger' | 'black' | 'white' | ''

const {
  name,
  src,
  size,
  width,
  height,
  color,
  themeColor,
} = defineProps({
  name: {
    type: String,
    default: '',
    description: '内置图标名称，对应static/icons目录下的图标文件名',
  },
  src: {
    type: String,
    default: '',
    description: '自定义图标路径，优先级高于name',
  },
  size: {
    type: String,
    default: 'medium',
    description: '图标大小，可选值: mini, small, medium, large，与按钮尺寸对应',
  },
  width: {
    type: [String, Number],
    default: '',
    description: '自定义宽度，设置后将覆盖size预设值',
  },
  height: {
    type: [String, Number],
    default: '',
    description: '自定义高度，设置后将覆盖size预设值',
  },
  color: {
    type: String as () => PresetColor | string,
    default: '',
    description: '图标颜色，可以是预设颜色或自定义颜色值',
  },
  themeColor: {
    type: Boolean,
    default: false,
    description: '是否使用主题颜色（与按钮类型匹配）',
  },
})

// 计算图标源
const iconSrc = computed(() => {
  if (src) {
    return src
  }
  if (name) {
    // 使用内置图标
    return `/static/icons/${name}.svg`
  }
  return ''
})

// 计算颜色类名
const colorClass = computed(() => {
  if (!color)
    return ''

  // 检查是否是预设颜色
  const presetColors: PresetColor[] = ['primary', 'success', 'warning', 'danger', 'black', 'white']
  if (presetColors.includes(color as PresetColor)) {
    return `icon-color-${color}`
  }

  return ''
})

// 计算自定义大小样式
const customSizeStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (width || height) {
    if (width) {
      const widthValue = typeof width === 'string' && Number.isNaN(Number(width))
        ? width
        : `${Number(width) * 2}rpx`
      styles.width = widthValue
    }

    if (height) {
      const heightValue = typeof height === 'string' && Number.isNaN(Number(height))
        ? height
        : `${Number(height) * 2}rpx`
      styles.height = heightValue
    }
  }

  return styles
})

// 计算图标样式（包括自定义颜色）
const iconStyle = computed(() => {
  const styles: Record<string, string> = {}

  // 如果是自定义颜色（非预设）
  if (color && !colorClass.value) {
    // 尝试使用CSS变量
    if (color.startsWith('var(--') || color.startsWith('--')) {
      styles.color = color.startsWith('var(--') ? color : `var(${color})`
    }
    else {
      styles.color = color
    }
  }

  // 主题跟随
  if (themeColor) {
    styles.color = 'var(--theme-color, currentColor)'
  }

  return styles
})
</script>

<template>
  <view class="coral-icon" :style="iconStyle">
    <div
      v-if="iconSrc"
      :class="[`icon-${size}`, colorClass]"
      class="coral-icon-inner"
      :style="[
        customSizeStyle,
        {
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          backgroundColor: 'currentColor',
        },
      ]"
    />
  </view>
</template>

<style scoped>
.coral-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.coral-icon-inner {
  display: inline-block;
}

.icon-mini {
  width: 36rpx; /* 18px * 2 = 36rpx */
  height: 36rpx;
}
.icon-small {
  width: 48rpx; /* 24px * 2 = 48rpx */
  height: 48rpx;
}
.icon-medium {
  width: 64rpx; /* 32px * 2 = 64rpx */
  height: 64rpx;
}
.icon-large {
  width: 80rpx; /* 40px * 2 = 80rpx */
  height: 80rpx;
}

/* 预设颜色 */
.icon-color-primary {
  color: var(--coral-500, #FF7E6A);
}

.icon-color-success {
  color: var(--success, #4CAF50);
}

.icon-color-warning {
  color: var(--warning, #FF9800);
}

.icon-color-danger {
  color: var(--error, #F44336);
}

.icon-color-black {
  color: #000000;
}

.icon-color-white {
  color: #FFFFFF;
}
</style>
