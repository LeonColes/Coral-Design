<script setup lang="ts">
import { provide, ref, watch } from 'vue'

// 定义组件属性
interface CheckboxGroupProps {
  modelValue: any[]
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  max?: number
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  direction: 'horizontal',
  disabled: false,
  max: Infinity,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', val: any[]): void
  (e: 'change', val: any[]): void
}>()

// 创建内部值引用
const checkboxGroupValue = ref<any[]>(props.modelValue || [])

// 监听模型值变化
watch(() => props.modelValue, (val) => {
  checkboxGroupValue.value = val || []
})

// 提供给子组件的上下文
provide('checkboxGroup', {
  name: 'checkboxGroup',
  modelValue: checkboxGroupValue,
  disabled: props.disabled,
  max: props.max,
  // 子组件Checkbox调用此方法更新值
  changeEvent: (val: any) => {
    if (!props.modelValue)
      return

    const index = checkboxGroupValue.value.indexOf(val)
    const newValue = [...checkboxGroupValue.value]

    // 如果不在数组中且没有超过最大数量限制，则添加
    if (index === -1) {
      if (newValue.length < props.max) {
        newValue.push(val)
      }
      else {
        // 如果超过最大限制，可以提示用户
        uni.showToast({
          title: `最多只能选择${props.max}项`,
          icon: 'none',
        })
        return
      }
    }
    else {
      // 如果已存在，则移除
      newValue.splice(index, 1)
    }

    checkboxGroupValue.value = newValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  },
})
</script>

<template>
  <view class="c-checkbox-group" :class="[`c-checkbox-group--${direction}`]">
    <slot />
  </view>
</template>

<style>
.c-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.c-checkbox-group--horizontal {
  flex-direction: row;
}

.c-checkbox-group--vertical {
  flex-direction: column;
}

.c-checkbox-group--vertical .c-checkbox {
  margin-bottom: var(--spacing-3);
  margin-right: 0;
}

.c-checkbox-group--vertical .c-checkbox:last-child {
  margin-bottom: 0;
}
</style>
