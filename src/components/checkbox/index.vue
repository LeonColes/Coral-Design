<script setup lang="ts">
import { computed, inject } from 'vue'

// 定义组件属性
interface CheckboxProps {
  modelValue?: boolean | any[]
  value?: string | number | boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  label: '',
  indeterminate: false,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean | any[]): void
  (e: 'change', val: boolean | any[]): void
}>()

// 注入CheckboxGroup上下文
const checkboxGroup: any = inject('checkboxGroup', null)

// 判断是否处于CheckboxGroup中
const isGroup = computed(() => checkboxGroup !== null)

// 计算是否禁用（自身禁用或组被禁用）
const isDisabled = computed(() => props.disabled || (isGroup.value && checkboxGroup.disabled))

// 计算当前选中状态
const isChecked = computed(() => {
  if (isGroup.value) {
    return checkboxGroup.modelValue.value.includes(props.value)
  }

  return Array.isArray(props.modelValue)
    ? props.modelValue.includes(props.value)
    : Boolean(props.modelValue)
})

// 处理选中状态变化
function onChange() {
  if (isDisabled.value)
    return

  if (isGroup.value) {
    // 如果在组内，调用组的更新方法
    checkboxGroup.changeEvent(props.value)
  }
  else if (Array.isArray(props.modelValue)) {
    // 如果是数组，则添加或移除value
    const newVal = [...props.modelValue]
    const index = newVal.indexOf(props.value)

    if (index === -1) {
      newVal.push(props.value)
    }
    else {
      newVal.splice(index, 1)
    }

    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
  else {
    // 布尔值，直接取反
    const newVal = !props.modelValue
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
}
</script>

<template>
  <view class="c-checkbox" :class="{ 'c-checkbox--disabled': isDisabled }">
    <view
      class="c-checkbox__wrapper"
      :class="{ 'c-checkbox__wrapper--checked': isChecked }"
      @tap="onChange"
    >
      <view class="c-checkbox__input">
        <view class="c-checkbox__inner">
          <view class="c-checkbox__check" />
        </view>
      </view>
      <view v-if="$slots.default || label" class="c-checkbox__label">
        <slot>{{ label }}</slot>
      </view>
    </view>
  </view>
</template>

<style>
.c-checkbox {
  display: inline-flex;
  margin-right: var(--spacing-4);
  position: relative;
  cursor: pointer;
}

.c-checkbox__wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.c-checkbox__input {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: var(--spacing-2);
}

.c-checkbox__inner {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-base);
  background-color: var(--bg-card);
  transition: all var(--transition-fast) ease;
}

.c-checkbox__check {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 6px;
  border-left: 2px solid var(--white);
  border-bottom: 2px solid var(--white);
  transform: translate(-50%, -60%) rotate(-45deg) scale(0);
  transition: all var(--transition-fast) ease;
}

.c-checkbox__wrapper--checked .c-checkbox__inner {
  border-color: var(--primary);
  background-color: var(--primary);
}

.c-checkbox__wrapper--checked .c-checkbox__check {
  transform: translate(-50%, -60%) rotate(-45deg) scale(1);
}

.c-checkbox__label {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: var(--line-height-base);
}

/* 禁用状态 */
.c-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.c-checkbox--disabled .c-checkbox__inner {
  border-color: var(--text-disabled);
  background-color: var(--gray-100);
}

.c-checkbox--disabled .c-checkbox__label {
  color: var(--text-disabled);
}

/* 半选中状态 */
.c-checkbox__wrapper--indeterminate .c-checkbox__inner {
  border-color: var(--primary);
  background-color: var(--primary);
}

.c-checkbox__wrapper--indeterminate .c-checkbox__check {
  width: 8px;
  height: 2px;
  border-left: 0;
  border-bottom: 2px solid var(--white);
  transform: translate(-50%, -50%) scale(1);
}
</style>
