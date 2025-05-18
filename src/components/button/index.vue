<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../icon/index.vue'

/**
 * 按钮尺寸
 */
type ButtonSize = 'mini' | 'small' | 'medium' | 'large'

/**
 * 按钮类型
 */
type ButtonType = 'primary' | 'success' | 'warning' | 'danger'

/**
 * 按钮形状
 */
type ButtonShape = 'square' | 'round' | 'circle'

/**
 * 按钮变体
 */
type ButtonVariant = 'outlined' | 'text' | 'elevated'

// 定义组件属性
const props = defineProps({
  /**
   * 按钮类型
   */
  type: {
    type: String as () => ButtonType,
    default: 'primary',
  },

  /**
   * 按钮尺寸
   */
  size: {
    type: String as () => ButtonSize,
    default: 'medium',
  },

  /**
   * 按钮形状
   */
  shape: {
    type: String as () => ButtonShape,
    default: 'round',
  },

  /**
   * 按钮变体
   */
  variant: {
    type: String as () => ButtonVariant,
    default: undefined, // 不设置变体时为默认填充样式
  },

  /**
   * 是否为加载状态
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否禁用按钮
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 图标名称
   */
  icon: {
    type: String,
    default: '',
    description: '图标名称，对应static/icons目录下的图标文件名',
  },

  /**
   * 自定义图标路径
   */
  iconSrc: {
    type: String,
    default: '',
    description: '自定义图标路径，优先级高于icon',
  },

  /**
   * 图标位置
   */
  iconPosition: {
    type: String as () => 'left' | 'right',
    default: 'left',
  },

  /**
   * 图标与文本的间距
   */
  iconGap: {
    type: [String, Number],
    default: '',
    description: '图标与文本之间的间距，可以是任何CSS单位，数字默认为rpx',
  },

  /**
   * 自定义类名
   */
  customClass: {
    type: String,
    default: '',
  },

  /**
   * 是否为块级元素
   */
  block: {
    type: Boolean,
    default: false,
  },

  /**
   * 图标颜色
   */
  iconColor: {
    type: String,
    default: '',
    description: '图标颜色，不设置时跟随按钮文字颜色',
  },
})

// 定义事件
const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

// 计算按钮类名
const buttonClass = computed(() => {
  const { type, size, shape, variant, disabled, loading, block, customClass } = props

  const classes = [
    'coral-button',
    `coral-button--${type}`,
    `coral-button--${size}`,
    `coral-button--${shape}`,
  ]

  // 只有当变体被明确指定时，才添加变体类
  if (variant) {
    classes.push(`coral-button--${variant}`)
  }

  // 添加状态类
  if (disabled) {
    classes.push('coral-button--disabled')
  }

  if (loading) {
    classes.push('coral-button--loading')
  }

  if (block) {
    classes.push('coral-button--block')
  }

  // 添加自定义类名
  if (customClass) {
    classes.push(customClass)
  }

  return classes
})

// 计算图标样式
const iconStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.iconGap) {
    const gap = typeof props.iconGap === 'number' || !Number.isNaN(Number(props.iconGap))
      ? `${Number(props.iconGap) * 2}rpx`
      : props.iconGap

    if (props.iconPosition === 'left') {
      styles.marginRight = gap
    }
    else {
      styles.marginLeft = gap
    }
  }

  // 为圆形按钮的图标添加特殊处理
  if (props.shape === 'circle') {
    styles.margin = '0'
    styles.display = 'flex'
    styles.alignItems = 'center'
    styles.justifyContent = 'center'
    styles.width = '100%'
    styles.height = '100%'
  }

  return styles
})

// 处理点击事件
function handleClick(event: Event) {
  if (props.disabled || props.loading) {
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <view
    :class="buttonClass"
    @click="handleClick"
  >
    <!-- 加载图标 -->
    <view v-if="loading" class="coral-button__loading">
      <view class="coral-button__loading-spinner" />
    </view>

    <!-- 左侧图标 -->
    <view
      v-if="(icon || iconSrc) && iconPosition === 'left' && !loading"
      class="coral-button__icon coral-button__icon--left"
      :style="iconStyle"
    >
      <Icon :name="icon" :src="iconSrc" :size="size" :color="iconColor" />
    </view>

    <!-- 按钮内容 -->
    <view v-if="$slots.default || shape !== 'circle'" class="coral-button__content">
      <slot />
    </view>

    <!-- 右侧图标 -->
    <view
      v-if="(icon || iconSrc) && iconPosition === 'right' && !loading"
      class="coral-button__icon coral-button__icon--right"
      :style="iconStyle"
    >
      <Icon :name="icon" :src="iconSrc" :size="size" :color="iconColor" />
    </view>
  </view>
</template>

<style>
.coral-button {
  /* 基础样式 */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
  overflow: hidden;
  font-weight: 500;
  box-sizing: border-box;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  /* 为触摸设备优化点击体验 */
  touch-action: manipulation;
  line-height: 1;
}

/* 尺寸样式 */
.coral-button--mini {
  height: 52rpx; /* 26px → 52rpx */
  font-size: 24rpx; /* 12px → 24rpx */
  border-radius: 8rpx; /* 4px → 8rpx */
  padding: var(--golden-ratio-padding-mini-v) var(--golden-ratio-padding-mini-h); /* 黄金分割比例约 1:1.618 */
}

.coral-button--small {
  height: 64rpx; /* 32px → 64rpx */
  font-size: 28rpx; /* 14px → 28rpx */
  border-radius: 12rpx; /* 6px → 12rpx */
  padding: var(--golden-ratio-padding-small-v) var(--golden-ratio-padding-small-h); /* 黄金分割比例约 1:1.618 */
}

.coral-button--medium {
  height: 80rpx; /* 40px → 80rpx */
  font-size: 32rpx; /* 16px → 32rpx */
  border-radius: 16rpx; /* 8px → 16rpx */
  padding: var(--golden-ratio-padding-medium-v) var(--golden-ratio-padding-medium-h); /* 黄金分割比例约 1:1.618 */
}

.coral-button--large {
  height: 96rpx; /* 48px → 96rpx */
  font-size: 36rpx; /* 18px → 36rpx */
  border-radius: 20rpx; /* 10px → 20rpx */
  padding: var(--golden-ratio-padding-large-v) var(--golden-ratio-padding-large-h); /* 黄金分割比例约 1:1.618 */
}

/* 形状变量 */
.coral-button--square {
  border-radius: 0;
}

.coral-button--circle {
  border-radius: 50%;
  padding: 0;
  aspect-ratio: 1 / 1;
  width: auto;
  overflow: hidden;
}

/* 圆形按钮的尺寸 */
.coral-button--circle.coral-button--mini {
  width: 52rpx;
}

.coral-button--circle.coral-button--small {
  width: 64rpx;
}

.coral-button--circle.coral-button--medium {
  width: 80rpx;
}

.coral-button--circle.coral-button--large {
  width: 96rpx;
}

/* 类型和变体组合 */
/* Primary 类型 - 默认填充样式 */
.coral-button--primary {
  background-color: var(--coral-500, #FF7E6A);
  color: white;
}

.coral-button--primary.coral-button--outlined {
  background-color: transparent;
  color: var(--coral-500, #FF7E6A);
  border: 2rpx solid var(--coral-500, #FF7E6A); /* 1px → 2rpx */
}

.coral-button--primary.coral-button--text {
  background-color: transparent;
  color: var(--coral-500, #FF7E6A);
}

.coral-button--primary.coral-button--elevated {
  background-color: var(--coral-500, #FF7E6A);
  color: white;
  box-shadow: 0 8rpx 24rpx rgba(255, 126, 106, 0.4), 0 4rpx 8rpx rgba(255, 126, 106, 0.3); /* 4px → 8rpx, 12px → 24rpx, 2px → 4rpx, 4px → 8rpx */
  transform: translateY(-2rpx); /* -1px → -2rpx */
}

/* Success 类型 - 默认填充样式 */
.coral-button--success {
  background-color: var(--success, #4CAF50);
  color: white;
}

.coral-button--success.coral-button--outlined {
  background-color: transparent;
  color: var(--success, #4CAF50);
  border: 2rpx solid var(--success, #4CAF50); /* 1px → 2rpx */
}

.coral-button--success.coral-button--text {
  background-color: transparent;
  color: var(--success, #4CAF50);
}

.coral-button--success.coral-button--elevated {
  background-color: var(--success, #4CAF50);
  color: white;
  box-shadow: 0 8rpx 24rpx rgba(76, 175, 80, 0.4), 0 4rpx 8rpx rgba(76, 175, 80, 0.3); /* 4px → 8rpx, 12px → 24rpx, 2px → 4rpx, 4px → 8rpx */
  transform: translateY(-2rpx); /* -1px → -2rpx */
}

/* Warning 类型 - 默认填充样式 */
.coral-button--warning {
  background-color: var(--warning, #FF9800);
  color: white;
}

.coral-button--warning.coral-button--outlined {
  background-color: transparent;
  color: var(--warning, #FF9800);
  border: 2rpx solid var(--warning, #FF9800); /* 1px → 2rpx */
}

.coral-button--warning.coral-button--text {
  background-color: transparent;
  color: var(--warning, #FF9800);
}

.coral-button--warning.coral-button--elevated {
  background-color: var(--warning, #FF9800);
  color: white;
  box-shadow: 0 8rpx 24rpx rgba(255, 152, 0, 0.4), 0 4rpx 8rpx rgba(255, 152, 0, 0.3); /* 4px → 8rpx, 12px → 24rpx, 2px → 4rpx, 4px → 8rpx */
  transform: translateY(-2rpx); /* -1px → -2rpx */
}

/* Danger 类型 - 默认填充样式 */
.coral-button--danger {
  background-color: var(--error, #F44336);
  color: white;
}

.coral-button--danger.coral-button--outlined {
  background-color: transparent;
  color: var(--error, #F44336);
  border: 2rpx solid var(--error, #F44336); /* 1px → 2rpx */
}

.coral-button--danger.coral-button--text {
  background-color: transparent;
  color: var(--error, #F44336);
}

.coral-button--danger.coral-button--elevated {
  background-color: var(--error, #F44336);
  color: white;
  box-shadow: 0 8rpx 24rpx rgba(244, 67, 54, 0.4), 0 4rpx 8rpx rgba(244, 67, 54, 0.3); /* 4px → 8rpx, 12px → 24rpx, 2px → 4rpx, 4px → 8rpx */
  transform: translateY(-2rpx); /* -1px → -2rpx */
}

/* 状态样式 */
.coral-button--disabled {
  opacity: 0.5 !important;
  pointer-events: none !important;
}

.coral-button--loading {
  pointer-events: none;
}

.coral-button--block {
  display: flex;
  width: 100%;
}

/* 按钮内部元素 */
.coral-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.coral-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.coral-button__icon--left {
  margin-right: 12rpx; /* 6px → 12rpx */
}

.coral-button__icon--right {
  margin-left: 12rpx; /* 6px → 12rpx */
}

/* 加载动画 */
.coral-button__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx; /* 6px → 12rpx */
}

.coral-button__loading-spinner {
  width: 32rpx; /* 16px → 32rpx */
  height: 32rpx; /* 16px → 32rpx */
  border: 4rpx solid rgba(255, 255, 255, 0.3); /* 2px → 4rpx */
  border-top: 4rpx solid currentColor; /* 2px → 4rpx */
  border-radius: 50%;
  animation: button-spin 0.8s linear infinite;
}

@keyframes button-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 按钮交互效果 */
.coral-button:not(.coral-button--disabled):not(.coral-button--loading):active {
  opacity: 0.8;
  transform: translateY(2rpx); /* 1px → 2rpx */
}

/* 触摸屏交互 */
@media (hover: hover) {
  .coral-button:not(.coral-button--disabled):not(.coral-button--loading):hover {
    opacity: 0.9;
  }
}
</style>
