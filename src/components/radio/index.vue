<script setup lang="ts">
import { computed, inject } from 'vue'

// 定义组件属性
interface RadioProps {
  modelValue?: string | number | boolean
  value: string | number | boolean
  label?: string
  disabled?: boolean
  name?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  label: '',
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean): void
  (e: 'change', val: string | number | boolean): void
}>()

// 注入RadioGroup上下文
const radioGroup: any = inject('radioGroup', null)

// 判断是否处于RadioGroup中
const isGroup = computed(() => radioGroup !== null)

// 计算是否禁用（自身禁用或组被禁用）
const isDisabled = computed(() => props.disabled || (isGroup.value && radioGroup.disabled))

// 计算当前选中状态
const currentValue = computed(() => {
  return isGroup.value ? radioGroup.modelValue.value : props.modelValue
})

// 处理选中状态变化
function onChange() {
  if (isDisabled.value)
    return

  if (isGroup.value) {
    // 如果在组内，调用组的更新方法
    radioGroup.changeEvent(props.value)
  }
  else {
    // 否则触发自己的事件
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <view class="c-radio" :class="{ 'c-radio--disabled': isDisabled }">
    <view
      class="c-radio__wrapper"
      :class="{ 'c-radio__wrapper--checked': currentValue === value }"
      @tap="onChange"
    >
      <view class="c-radio__input">
        <view class="c-radio__inner" />
      </view>
      <view v-if="$slots.default || label" class="c-radio__label">
        <slot>{{ label }}</slot>
      </view>
    </view>
  </view>
</template>

<style>
.c-radio {
  display: inline-flex;
  margin-right: var(--spacing-4);
  position: relative;
  cursor: pointer;
}

.c-radio__wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.c-radio__input {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--border-base);
  background-color: var(--bg-card);
  margin-right: var(--spacing-2);
  transition: all var(--transition-fast) ease;
}

.c-radio__inner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background-color: var(--primary);
  transition: all var(--transition-fast) ease;
}

.c-radio__wrapper--checked .c-radio__input {
  border-color: var(--primary);
  background-color: var(--white);
}

.c-radio__wrapper--checked .c-radio__inner {
  transform: translate(-50%, -50%) scale(1);
}

.c-radio__label {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: var(--line-height-base);
}

/* 禁用状态 */
.c-radio--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.c-radio--disabled .c-radio__input {
  border-color: var(--text-disabled);
  background-color: var(--gray-100);
}

.c-radio--disabled .c-radio__label {
  color: var(--text-disabled);
}
</style>
