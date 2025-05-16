<script setup lang="ts">
import { ref, watch } from 'vue'
// 引入按钮组件
import CoralButton from '../components/button/index.vue'

// 按钮类型定义
type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type ButtonSize = 'mini' | 'small' | 'medium' | 'large'
type ButtonShape = 'square' | 'round' | 'circle'
type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated'

// 返回组件页面函数
function goBack() {
  uni.navigateBack()
}

// 按钮类型列表
const buttonTypes: ButtonType[] = ['default', 'primary', 'success', 'warning', 'danger']

// 按钮尺寸列表
const buttonSizes: ButtonSize[] = ['mini', 'small', 'medium', 'large']

// 按钮形状列表
const buttonShapes: ButtonShape[] = ['square', 'round', 'circle']

// 按钮变体列表
const buttonVariants: ButtonVariant[] = ['filled', 'outlined', 'text', 'elevated']

// 设置当前选中的类型、尺寸、形状和变体
const selectedType = ref<ButtonType>('primary')
const selectedSize = ref<ButtonSize>('medium')
const selectedShape = ref<ButtonShape>('round')
const selectedVariant = ref<ButtonVariant>('filled')

// 示例代码
const codeExample = ref(`<CoralButton
  type="primary"
  size="medium"
  shape="round"
  variant="filled"
>
  按钮文本
</CoralButton>`)

// 更新示例代码
function updateCodeExample() {
  codeExample.value = `<CoralButton
  type="${selectedType.value}"
  size="${selectedSize.value}"
  shape="${selectedShape.value}"
  variant="${selectedVariant.value}"
>
  按钮文本
</CoralButton>`
}

// 监听所有选择变化，更新示例代码
watch([selectedType, selectedSize, selectedShape, selectedVariant], () => {
  updateCodeExample()
})
</script>

<template>
  <view class="global-reset button-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-button" @click="goBack">
        <text class="back-icon">
          ←
        </text>
      </view>
      <text class="page-title">
        按钮组件
      </text>
    </view>

    <!-- 页面内容 -->
    <view class="content">
      <view class="header">
        <text class="title">
          按钮 Button
        </text>
        <text class="subtitle">
          提供多种样式、尺寸和状态的按钮组件
        </text>
      </view>

      <!-- 按钮展示区 -->
      <view class="demo-section">
        <view class="demo-preview">
          <CoralButton
            :type="selectedType"
            :size="selectedSize"
            :shape="selectedShape"
            :variant="selectedVariant"
          >
            按钮文本
          </CoralButton>
        </view>

        <view class="code-block">
          <text class="code-title">
            示例代码
          </text>
          <text class="code-content">
            {{ codeExample }}
          </text>
        </view>
      </view>

      <!-- 属性选择区 -->
      <view class="properties-section">
        <view class="property-group">
          <text class="property-title">
            类型 Type
          </text>
          <view class="property-options">
            <view
              v-for="type in buttonTypes"
              :key="type"
              class="property-option"
              :class="{ active: selectedType === type }"
              @click="selectedType = type"
            >
              {{ type }}
            </view>
          </view>
        </view>

        <view class="property-group">
          <text class="property-title">
            尺寸 Size
          </text>
          <view class="property-options">
            <view
              v-for="size in buttonSizes"
              :key="size"
              class="property-option"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </view>
          </view>
        </view>

        <view class="property-group">
          <text class="property-title">
            形状 Shape
          </text>
          <view class="property-options">
            <view
              v-for="shape in buttonShapes"
              :key="shape"
              class="property-option"
              :class="{ active: selectedShape === shape }"
              @click="selectedShape = shape"
            >
              {{ shape }}
            </view>
          </view>
        </view>

        <view class="property-group">
          <text class="property-title">
            变体 Variant
          </text>
          <view class="property-options">
            <view
              v-for="variant in buttonVariants"
              :key="variant"
              class="property-option"
              :class="{ active: selectedVariant === variant }"
              @click="selectedVariant = variant"
            >
              {{ variant }}
            </view>
          </view>
        </view>
      </view>

      <!-- 按钮状态展示 -->
      <view class="states-section">
        <text class="section-title">
          按钮状态
        </text>

        <view class="state-group">
          <view class="state-item">
            <text class="state-label">
              默认
            </text>
            <CoralButton :type="selectedType" :variant="selectedVariant">
              默认按钮
            </CoralButton>
          </view>

          <view class="state-item">
            <text class="state-label">
              禁用
            </text>
            <CoralButton :type="selectedType" :variant="selectedVariant" disabled>
              禁用按钮
            </CoralButton>
          </view>

          <view class="state-item">
            <text class="state-label">
              加载中
            </text>
            <CoralButton :type="selectedType" :variant="selectedVariant" loading>
              加载按钮
            </CoralButton>
          </view>
        </view>
      </view>

      <!-- 按钮类型展示 -->
      <view class="types-section">
        <text class="section-title">
          按钮类型
        </text>

        <view class="types-grid">
          <view v-for="type in buttonTypes" :key="type" class="type-card">
            <text class="type-name">
              {{ type }}
            </text>
            <view class="type-buttons">
              <CoralButton :type="type" variant="filled" size="small">
                填充
              </CoralButton>
              <CoralButton :type="type" variant="outlined" size="small">
                描边
              </CoralButton>
              <CoralButton :type="type" variant="text" size="small">
                文本
              </CoralButton>
              <CoralButton :type="type" variant="elevated" size="small">
                阴影
              </CoralButton>
            </view>
          </view>
        </view>
      </view>

      <!-- API文档 -->
      <view class="api-section">
        <text class="section-title">
          API 说明
        </text>

        <view class="api-table">
          <view class="api-table-header">
            <text class="api-column api-name">
              属性
            </text>
            <text class="api-column api-type">
              类型
            </text>
            <text class="api-column api-default">
              默认值
            </text>
            <text class="api-column api-desc">
              说明
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              type
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              default
            </text>
            <text class="api-column api-desc">
              按钮类型，可选值: default, primary, success, warning, danger
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              size
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              medium
            </text>
            <text class="api-column api-desc">
              按钮尺寸，可选值: mini, small, medium, large
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              shape
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              round
            </text>
            <text class="api-column api-desc">
              按钮形状，可选值: square, round, circle
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              variant
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              filled
            </text>
            <text class="api-column api-desc">
              按钮变体，可选值: filled, outlined, text, elevated
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              disabled
            </text>
            <text class="api-column api-type">
              boolean
            </text>
            <text class="api-column api-default">
              false
            </text>
            <text class="api-column api-desc">
              是否禁用按钮
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              loading
            </text>
            <text class="api-column api-type">
              boolean
            </text>
            <text class="api-column api-default">
              false
            </text>
            <text class="api-column api-desc">
              是否显示加载状态
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              icon
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              ''
            </text>
            <text class="api-column api-desc">
              按钮图标
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              iconPosition
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              left
            </text>
            <text class="api-column api-desc">
              图标位置，可选值: left, right
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              block
            </text>
            <text class="api-column api-type">
              boolean
            </text>
            <text class="api-column api-default">
              false
            </text>
            <text class="api-column api-desc">
              是否为块级元素
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-column api-name">
              customClass
            </text>
            <text class="api-column api-type">
              string
            </text>
            <text class="api-column api-default">
              ''
            </text>
            <text class="api-column api-desc">
              自定义类名
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.button-page {
  min-height: 100vh;
  background-color: var(--gray-50);
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.nav-bar {
  height: 44px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.back-button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 20px;
  color: var(--gray-900);
}

.page-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: var(--gray-900);
}

/* 内容区样式 */
.content {
  flex: 1;
  padding: 20px 16px;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-900);
  display: block;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: var(--gray-700);
  display: block;
}

/* 按钮预览区 */
.demo-section {
  background-color: var(--white);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.demo-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  background-color: var(--gray-50);
  border-radius: 8px;
  margin-bottom: 20px;
}

.code-block {
  background-color: #f8f9fc;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: 8px;
}

.code-content {
  display: block;
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--gray-900);
  white-space: pre-wrap;
  line-height: 1.5;
}

/* 属性选择区 */
.properties-section {
  background-color: var(--white);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.property-group {
  margin-bottom: 20px;
}

.property-group:last-child {
  margin-bottom: 0;
}

.property-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 12px;
}

.property-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.property-option {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  background-color: var(--gray-100);
  color: var(--gray-700);
  cursor: pointer;
  transition: all 0.2s;
}

.property-option.active {
  background-color: var(--coral-500);
  color: white;
}

/* 按钮状态展示 */
.states-section,
.types-section,
.api-section {
  background-color: var(--white);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.section-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 20px;
}

.state-group {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.state-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.state-label {
  font-size: 14px;
  color: var(--gray-700);
}

/* 按钮类型展示 */
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.type-card {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 16px;
}

.type-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 12px;
}

.type-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* API表格 */
.api-table {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  overflow: hidden;
}

.api-table-header {
  display: flex;
  background-color: var(--gray-100);
  padding: 12px 16px;
  font-weight: 600;
  color: var(--gray-900);
}

.api-table-row {
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid var(--gray-200);
}

.api-column {
  line-height: 1.5;
  overflow-wrap: break-word;
  font-size: 14px;
}

.api-name {
  width: 20%;
  color: var(--coral-500);
  font-family: var(--font-family-mono);
  font-weight: 500;
}

.api-type {
  width: 15%;
  color: var(--teal-700);
  font-family: var(--font-family-mono);
}

.api-default {
  width: 15%;
  color: var(--gray-700);
  font-family: var(--font-family-mono);
}

.api-desc {
  width: 50%;
  color: var(--gray-900);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .api-table-header,
  .api-table-row {
    flex-direction: column;
    padding: 12px;
  }

  .api-column {
    width: 100% !important;
    padding: 4px 0;
  }

  .api-name,
  .api-type,
  .api-default {
    font-weight: 600;
  }

  .api-name:before {
    content: "属性: ";
    color: var(--gray-700);
    font-weight: normal;
  }

  .api-type:before {
    content: "类型: ";
    color: var(--gray-700);
    font-weight: normal;
  }

  .api-default:before {
    content: "默认值: ";
    color: var(--gray-700);
    font-weight: normal;
  }

  .api-desc:before {
    content: "说明: ";
    display: block;
    color: var(--gray-700);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .state-group {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
