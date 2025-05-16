<script setup lang="ts">
import { computed } from 'vue'

/**
 * 按钮尺寸
 */
type ButtonSize = 'mini' | 'small' | 'medium' | 'large'

/**
 * 按钮类型
 */
type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

/**
 * 按钮形状
 */
type ButtonShape = 'square' | 'round' | 'circle'

/**
 * 按钮变体
 */
type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated'

// 定义组件属性
const props = defineProps({
  /**
   * 按钮类型
   */
  type: {
    type: String as () => ButtonType,
    default: 'default',
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
    default: 'filled',
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
  (e: 'loadingChange', loading: boolean): void
}>()

// 计算按钮类名
const buttonClass = computed(() => {
  const { type, size, shape, variant, disabled, loading, block, customClass } = props

  return [
    'coral-button',
    `coral-button--${type}`,
    `coral-button--${size}`,
    `coral-button--${shape}`,
    `coral-button--${variant}`,
    {
      'coral-button--disabled': disabled,
      'coral-button--loading': loading,
      'coral-button--block': block,
    },
    customClass,
  ]
})

// 处理点击事件
function handleClick(event: Event) {
  if (props.disabled || props.loading)
    return

  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
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
  </button>
</template>

<style>
.coral-button {
  /* 基础样式 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  font-weight: 500;
}

/* 尺寸变量 */
.coral-button--mini {
  height: 28px;
  font-size: 12px;
  border-radius: 4px;
}

.coral-button--small {
  height: 32px;
  font-size: 13px;
  border-radius: 6px;
}

.coral-button--medium {
  height: 40px;
  font-size: 14px;
  border-radius: 8px;
}

.coral-button--large {
  height: 48px;
  font-size: 16px;
  border-radius: 10px;
}

/* 形状变量 */
.coral-button--square {
  border-radius: 0;
}

.coral-button--round {
  /* 圆角已在尺寸中定义 */
}

.coral-button--circle {
  border-radius: 50%;
  padding: 0;
  /* 圆形按钮一般需要宽高相等，可以通过JS计算 */
}

/* 类型和变体组合 */
/* Default 类型 */
.coral-button--default.coral-button--filled {
  background-color: #f2f3f5;
  color: #333333;
}

.coral-button--default.coral-button--outlined {
  background-color: transparent;
  color: #333333;
  border: 1px solid #e0e0e0;
}

.coral-button--default.coral-button--text {
  background-color: transparent;
  color: #333333;
}

.coral-button--default.coral-button--elevated {
  background-color: #f2f3f5;
  color: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Primary 类型 */
.coral-button--primary.coral-button--filled {
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
  box-shadow: 0 2px 8px rgba(255, 126, 106, 0.2);
}

/* Success 类型 */
.coral-button--success.coral-button--filled {
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
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
}

/* Warning 类型 */
.coral-button--warning.coral-button--filled {
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
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.2);
}

/* Danger 类型 */
.coral-button--danger.coral-button--filled {
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
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.2);
}

/* 状态样式 */
.coral-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.coral-button--loading {
  cursor: default;
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
.coral-button:not(.coral-button--disabled):not(.coral-button--loading):hover {
  opacity: 0.9;
}

.coral-button:not(.coral-button--disabled):not(.coral-button--loading):active {
  opacity: 0.8;
  transform: translateY(1px);
}
</style>
