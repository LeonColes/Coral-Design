<script setup lang="ts">
import { provide, ref, watch } from 'vue'

// 定义组件属性
interface RadioGroupProps {
  modelValue: string | number | boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'horizontal',
  disabled: false,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean): void
  (e: 'change', val: string | number | boolean): void
}>()

// 创建内部值引用
const radioGroupValue = ref(props.modelValue)

// 监听模型值变化
watch(() => props.modelValue, (val) => {
  radioGroupValue.value = val
})

// 监听内部值变化
watch(radioGroupValue, (val) => {
  emit('update:modelValue', val)
  emit('change', val)
})

// 提供给子组件的上下文
provide('radioGroup', {
  name: 'radioGroup',
  modelValue: radioGroupValue,
  disabled: props.disabled,
  // 子组件Radio调用此方法更新值
  changeEvent: (val: string | number | boolean) => {
    radioGroupValue.value = val
    emit('update:modelValue', val)
    emit('change', val)
  },
})
</script>

<template>
  <view class="c-radio-group" :class="[`c-radio-group--${direction}`]">
    <slot />
  </view>
</template>

<style>
.c-radio-group {
  display: flex;
  flex-wrap: wrap;
}

.c-radio-group--horizontal {
  flex-direction: row;
}

.c-radio-group--vertical {
  flex-direction: column;
}

.c-radio-group--vertical .c-radio {
  margin-bottom: var(--spacing-3);
  margin-right: 0;
}

.c-radio-group--vertical .c-radio:last-child {
  margin-bottom: 0;
}
</style>
