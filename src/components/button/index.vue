<script setup lang="ts">
import { computed } from 'vue'

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
  },

  /**
   * 图标位置
   */
  iconPosition: {
    type: String as () => 'left' | 'right',
    default: 'left',
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
      v-if="icon && iconPosition === 'left' && !loading"
      class="coral-button__icon coral-button__icon--left"
    >
      <!-- 这里可以放置图标组件 -->
      {{ icon }}
    </view>

    <!-- 按钮内容 -->
    <view class="coral-button__content">
      <slot />
    </view>

    <!-- 右侧图标 -->
    <view
      v-if="icon && iconPosition === 'right' && !loading"
      class="coral-button__icon coral-button__icon--right"
    >
      <!-- 这里可以放置图标组件 -->
      {{ icon }}
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
}

/* 尺寸样式 */
.coral-button--mini {
  height: 26px; /* 26px */
  font-size: 12px;
  border-radius: 4px;
  padding: var(--golden-ratio-padding-mini-v) var(--golden-ratio-padding-mini-h); /* 黄金分割比例约 1:1.618 */
}

.coral-button--small {
  height: 32px; /* 32px */
  font-size: 14px;
  border-radius: 6px;
  padding: var(--golden-ratio-padding-small-v) var(--golden-ratio-padding-small-h); /* 黄金分割比例约 1:1.618 */
}

.coral-button--medium {
  height: 40px; /* 40px */
  font-size: 16px;
  border-radius: 8px;
  padding: var(--golden-ratio-padding-medium-v) var(--golden-ratio-padding-medium-h); /* 黄金分割比例约 1:1.618 */
}

.coral-button--large {
  height: 48px; /* 48px */
  font-size: 18px;
  border-radius: 10px;
  padding: var(--golden-ratio-padding-large-v) var(--golden-ratio-padding-large-h); /* 黄金分割比例约 1:1.618 */
}

/* 形状变量 */
.coral-button--square {
  border-radius: 0;
}

.coral-button--circle {
  border-radius: 50%;
  padding: 0;
  /* 圆形按钮一般需要宽高相等，可以通过JS计算 */
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
  border: 1px solid var(--coral-500, #FF7E6A);
}

.coral-button--primary.coral-button--text {
  background-color: transparent;
  color: var(--coral-500, #FF7E6A);
}

.coral-button--primary.coral-button--elevated {
  background-color: var(--coral-500, #FF7E6A);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 126, 106, 0.4), 0 2px 4px rgba(255, 126, 106, 0.3);
  transform: translateY(-1px);
}

/* Success 类型 - 默认填充样式 */
.coral-button--success {
  background-color: var(--success, #4CAF50);
  color: white;
}

.coral-button--success.coral-button--outlined {
  background-color: transparent;
  color: var(--success, #4CAF50);
  border: 1px solid var(--success, #4CAF50);
}

.coral-button--success.coral-button--text {
  background-color: transparent;
  color: var(--success, #4CAF50);
}

.coral-button--success.coral-button--elevated {
  background-color: var(--success, #4CAF50);
  color: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4), 0 2px 4px rgba(76, 175, 80, 0.3);
  transform: translateY(-1px);
}

/* Warning 类型 - 默认填充样式 */
.coral-button--warning {
  background-color: var(--warning, #FF9800);
  color: white;
}

.coral-button--warning.coral-button--outlined {
  background-color: transparent;
  color: var(--warning, #FF9800);
  border: 1px solid var(--warning, #FF9800);
}

.coral-button--warning.coral-button--text {
  background-color: transparent;
  color: var(--warning, #FF9800);
}

.coral-button--warning.coral-button--elevated {
  background-color: var(--warning, #FF9800);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4), 0 2px 4px rgba(255, 152, 0, 0.3);
  transform: translateY(-1px);
}

/* Danger 类型 - 默认填充样式 */
.coral-button--danger {
  background-color: var(--error, #F44336);
  color: white;
}

.coral-button--danger.coral-button--outlined {
  background-color: transparent;
  color: var(--error, #F44336);
  border: 1px solid var(--error, #F44336);
}

.coral-button--danger.coral-button--text {
  background-color: transparent;
  color: var(--error, #F44336);
}

.coral-button--danger.coral-button--elevated {
  background-color: var(--error, #F44336);
  color: white;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4), 0 2px 4px rgba(244, 67, 54, 0.3);
  transform: translateY(-1px);
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.coral-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.coral-button__icon--left {
  margin-right: 6px;
}

.coral-button__icon--right {
  margin-left: 6px;
}

/* 加载动画 */
.coral-button__loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
}

.coral-button__loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
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
  transform: translateY(1px);
}

/* 触摸屏交互 */
@media (hover: hover) {
  .coral-button:not(.coral-button--disabled):not(.coral-button--loading):hover {
    opacity: 0.9;
  }
}
</style>
