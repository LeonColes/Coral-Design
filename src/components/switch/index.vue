<script setup lang="ts">
import { computed } from 'vue'

// 定义组件属性
interface SwitchProps {
  modelValue: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  label?: string
  activeColor?: string
  inactiveColor?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  loading: false,
  size: 'medium',
  label: '',
  activeColor: '',
  inactiveColor: '',
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'change', val: boolean, ev: Event): void
}>()

// 计算自定义样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.activeColor && props.modelValue) {
    style['--switch-active-color'] = props.activeColor
  }

  if (props.inactiveColor && !props.modelValue) {
    style['--switch-inactive-color'] = props.inactiveColor
  }

  return style
})

// 处理切换
function toggle(event: Event) {
  if (props.disabled || props.loading)
    return

  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue, event)
}
</script>

<template>
  <view
    class="c-switch" :class="[
      `c-switch--${size}`,
      { 'c-switch--disabled': disabled },
      { 'c-switch--checked': modelValue },
      { 'c-switch--loading': loading },
    ]" :style="customStyle" @tap="toggle"
  >
    <view class="c-switch__track">
      <view class="c-switch__handle">
        <view v-if="loading" class="c-switch__loading" />
      </view>
    </view>
    <view v-if="label" class="c-switch__label">
      {{ label }}
    </view>
  </view>
</template>

<style>
.c-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.c-switch__track {
  position: relative;
  width: 50px;
  height: 28px;
  border-radius: var(--radius-full);
  background-color: var(--switch-inactive-color, var(--border-base));
  transition: all var(--transition-normal) var(--easing-default);
}

.c-switch__handle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: var(--white);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal) var(--easing-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-switch__label {
  font-size: var(--font-size-md);
  margin-left: var(--spacing-3);
  color: var(--text-secondary);
}

/* 尺寸变体 */
.c-switch--small .c-switch__track {
  width: 40px;
  height: 22px;
}

.c-switch--small .c-switch__handle {
  width: 16px;
  height: 16px;
}

.c-switch--large .c-switch__track {
  width: 60px;
  height: 34px;
}

.c-switch--large .c-switch__handle {
  width: 28px;
  height: 28px;
}

/* 选中状态 */
.c-switch--checked .c-switch__track {
  background-color: var(--switch-active-color, var(--primary));
}

.c-switch--checked .c-switch__handle {
  transform: translateX(22px);
}

.c-switch--checked.c-switch--small .c-switch__handle {
  transform: translateX(18px);
}

.c-switch--checked.c-switch--large .c-switch__handle {
  transform: translateX(26px);
}

/* 禁用状态 */
.c-switch--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 加载状态 */
.c-switch__loading {
  width: 12px;
  height: 12px;
  border: 2px solid var(--primary-light);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: c-switch-loading 0.8s infinite linear;
}

.c-switch--small .c-switch__loading {
  width: 10px;
  height: 10px;
  border-width: 1px;
}

.c-switch--large .c-switch__loading {
  width: 14px;
  height: 14px;
  border-width: 2px;
}

@keyframes c-switch-loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
