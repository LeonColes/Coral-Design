<script setup lang="ts">
import { computed } from 'vue'

// 定义组件属性
interface TextProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  italic?: boolean
  underline?: boolean
  delete?: boolean
  mark?: boolean
  code?: boolean
  block?: boolean
  ellipsis?: boolean | number
  align?: 'left' | 'center' | 'right' | 'justify'
  spacing?: number | string
  lineHeight?: number | string
  color?: string
  customClass?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  type: 'primary',
  size: 'md',
  weight: 'normal',
  italic: false,
  underline: false,
  delete: false,
  mark: false,
  code: false,
  block: false,
  ellipsis: false,
  align: 'left',
  spacing: '',
  lineHeight: '',
  color: '',
  customClass: '',
})

// 计算文本样式
const textStyle = computed(() => {
  const styles: Record<string, string> = {}

  // 自定义颜色
  if (props.color) {
    styles.color = props.color
  }

  // 字间距
  if (props.spacing) {
    if (typeof props.spacing === 'number') {
      styles.letterSpacing = `${props.spacing}px`
    }
    else {
      styles.letterSpacing = props.spacing
    }
  }

  // 行高
  if (props.lineHeight) {
    if (typeof props.lineHeight === 'number') {
      styles.lineHeight = `${props.lineHeight}`
    }
    else {
      styles.lineHeight = props.lineHeight
    }
  }

  return styles
})

// 计算类名
const textClass = computed(() => {
  const classes = [
    'c-text',
    `c-text--${props.type}`,
    `c-text--${props.size}`,
    `c-text--weight-${props.weight}`,
    `c-text--align-${props.align}`,
  ]

  if (props.italic)
    classes.push('c-text--italic')
  if (props.underline)
    classes.push('c-text--underline')
  if (props.delete)
    classes.push('c-text--delete')
  if (props.mark)
    classes.push('c-text--mark')
  if (props.code)
    classes.push('c-text--code')
  if (props.block)
    classes.push('c-text--block')
  if (props.ellipsis) {
    classes.push('c-text--ellipsis')
    if (typeof props.ellipsis === 'number') {
      classes.push(`c-text--ellipsis-${props.ellipsis}`)
    }
  }
  if (props.customClass)
    classes.push(props.customClass)

  return classes
})
</script>

<template>
  <text
    :class="textClass"
    :style="textStyle"
  >
    <slot />
  </text>
</template>

<style>
/* 基础文本样式 */
.c-text {
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  color: var(--text-primary);
  font-family: var(--font-family-base);
  transition: color 0.2s;
}

/* 类型样式 */
.c-text--primary {
  color: var(--text-primary);
}

.c-text--secondary {
  color: var(--text-secondary);
}

.c-text--success {
  color: var(--success);
}

.c-text--warning {
  color: var(--warning);
}

.c-text--danger {
  color: var(--error);
}

.c-text--info {
  color: var(--coral-400);
}

/* 尺寸样式 */
.c-text--xs {
  font-size: var(--font-size-xs);
}

.c-text--sm {
  font-size: var(--font-size-sm);
}

.c-text--md {
  font-size: var(--font-size-md);
}

.c-text--lg {
  font-size: var(--font-size-lg);
}

.c-text--xl {
  font-size: var(--font-size-xl);
}

.c-text--2xl {
  font-size: var(--font-size-2xl);
}

/* 字重样式 */
.c-text--weight-light {
  font-weight: var(--font-weight-light);
}

.c-text--weight-normal {
  font-weight: var(--font-weight-normal);
}

.c-text--weight-medium {
  font-weight: var(--font-weight-medium);
}

.c-text--weight-semibold {
  font-weight: var(--font-weight-semibold);
}

.c-text--weight-bold {
  font-weight: var(--font-weight-bold);
}

/* 样式变体 */
.c-text--italic {
  font-style: italic;
}

.c-text--underline {
  text-decoration: underline;
}

.c-text--delete {
  text-decoration: line-through;
}

.c-text--mark {
  background-color: var(--yellow-100);
  padding: 0 2px;
  border-radius: 2px;
}

.c-text--code {
  font-family: var(--font-family-mono);
  background-color: var(--bg-hover);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.9em;
}

.c-text--block {
  display: block;
}

/* 对齐方式 */
.c-text--align-left {
  text-align: left;
}

.c-text--align-center {
  text-align: center;
}

.c-text--align-right {
  text-align: right;
}

.c-text--align-justify {
  text-align: justify;
}

/* 文本省略 */
.c-text--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.c-text--ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.c-text--ellipsis-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.c-text--ellipsis-4 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.c-text--ellipsis-5 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  white-space: normal;
}

@media (max-width: 576px) {
  .c-text--2xl {
    font-size: var(--font-size-xl);
  }

  .c-text--xl {
    font-size: var(--font-size-lg);
  }
}
</style>
