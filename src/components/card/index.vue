<script setup lang="ts">
import { computed } from 'vue'

// 定义组件属性
interface CardProps {
  title?: string
  subtitle?: string
  cover?: string
  type?: 'default' | 'primary' | 'plain' | 'outlined'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  full?: boolean
  padding?: string | number
}

const props = withDefaults(defineProps<CardProps>(), {
  type: 'default',
  shadow: 'sm',
  hoverable: false,
  full: false,
  padding: '',
})

// 定义事件
const emit = defineEmits<{
  (e: 'click', event: any): void
}>()

// 卡片内容样式
const contentStyle = computed(() => {
  if (!props.padding)
    return {}

  if (typeof props.padding === 'number') {
    return { padding: `${props.padding}rpx` }
  }

  return { padding: props.padding }
})

// 点击事件处理
function onClick(event: any) {
  emit('click', event)
}
</script>

<template>
  <view
    class="c-card"
    :class="[
      `c-card--${type}`,
      shadow ? `c-card--shadow-${shadow}` : '',
      { 'c-card--full': full },
      { 'c-card--hoverable': hoverable },
    ]"
    @tap="onClick"
  >
    <!-- 卡片头部 -->
    <view v-if="$slots.header || title" class="c-card__header">
      <slot name="header">
        <text class="c-card__title">
          {{ title }}
        </text>
        <text v-if="subtitle" class="c-card__subtitle">
          {{ subtitle }}
        </text>
      </slot>
    </view>

    <!-- 卡片封面图 -->
    <view v-if="$slots.cover || cover" class="c-card__cover">
      <slot name="cover">
        <image v-if="cover" class="c-card__cover-img" :src="cover" mode="aspectFill" />
      </slot>
    </view>

    <!-- 卡片内容 -->
    <view class="c-card__content" :style="contentStyle">
      <slot />
    </view>

    <!-- 卡片底部 -->
    <view v-if="$slots.footer" class="c-card__footer">
      <slot name="footer" />
    </view>

    <!-- 卡片操作区 -->
    <view v-if="$slots.actions" class="c-card__actions">
      <slot name="actions" />
    </view>
  </view>
</template>

<style>
.c-card {
  position: relative;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal) var(--easing-default);
  margin-bottom: var(--spacing-4);
}

/* 卡片类型样式 */
.c-card--default {
  border: 1px solid var(--border-base);
}

.c-card--primary {
  background-color: var(--primary);
  color: var(--white);
}

.c-card--plain {
  background-color: transparent;
}

.c-card--outlined {
  background-color: transparent;
  border: 1px solid var(--border-base);
}

/* 投影样式 */
.c-card--shadow-sm {
  box-shadow: var(--shadow-sm);
}

.c-card--shadow-md {
  box-shadow: var(--shadow-md);
}

.c-card--shadow-lg {
  box-shadow: var(--shadow-lg);
}

.c-card--shadow-xl {
  box-shadow: var(--shadow-xl);
}

/* 悬停效果 */
.c-card--hoverable {
  cursor: pointer;
}

.c-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* 全宽样式 */
.c-card--full {
  border-radius: 0;
  margin-left: -16px;
  margin-right: -16px;
  width: calc(100% + 32px);
}

/* 卡片标题 */
.c-card__header {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--divider);
}

.c-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  display: block;
  margin-bottom: var(--spacing-1);
}

.c-card__subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  display: block;
}

/* 卡片封面 */
.c-card__cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.c-card__cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 卡片内容 */
.c-card__content {
  padding: var(--spacing-4);
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

/* 卡片底部 */
.c-card__footer {
  padding: var(--spacing-3) var(--spacing-4);
  border-top: 1px solid var(--divider);
  font-size: var(--font-size-sm);
}

/* 卡片操作区 */
.c-card__actions {
  display: flex;
  padding: var(--spacing-2) var(--spacing-4);
  border-top: 1px solid var(--divider);
  justify-content: flex-end;
}
</style>
