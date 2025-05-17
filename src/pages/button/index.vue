<script setup lang="ts">
// 引入按钮组件
import CoralButton from '@/components/button/index.vue'
import { computed, onMounted, ref, watch } from 'vue'

// 按钮类型定义
type ButtonType = 'primary' | 'success' | 'warning' | 'danger'
type ButtonSize = 'mini' | 'small' | 'medium' | 'large'
type ButtonShape = 'square' | 'round' | 'circle'

// 使用组件中的原始ButtonVariant类型
type ButtonVariant = 'outlined' | 'text' | 'elevated' | undefined
// 为UI展示定义包含default的变体类型
type DisplayVariant = 'default' | 'outlined' | 'text' | 'elevated'

// 返回组件页面函数
function goBack() {
  uni.navigateBack()
}

// 按钮类型列表
const buttonTypes: ButtonType[] = ['primary', 'success', 'warning', 'danger']

// 按钮尺寸列表
const buttonSizes: ButtonSize[] = ['mini', 'small', 'medium', 'large']

// 按钮形状列表
const buttonShapes: ButtonShape[] = ['square', 'round', 'circle']

// 按钮变体列表 - 使用字符串 'default' 作为展示用途
const buttonVariants: DisplayVariant[] = ['default', 'outlined', 'text', 'elevated']

// 变体显示名称映射
const variantDisplayNames: Record<DisplayVariant, string> = {
  default: '默认',
  outlined: 'outlined',
  text: 'text',
  elevated: 'elevated',
}

// 变体详细描述
const variantDescriptions: Record<DisplayVariant, string> = {
  default: '默认填充样式，使用背景色作为主要视觉元素，适合用于主要操作和重要按钮，具有最强的视觉吸引力',
  outlined: '描边变体，使用边框色作为主要视觉元素，适合用于次要操作，比默认填充样式视觉权重更轻',
  text: '文本变体，没有背景和边框，仅使用文字颜色，适合用于辅助操作，视觉最轻，可用于密集UI布局',
  elevated: '阴影变体，在默认填充样式基础上添加阴影效果，增强层次感，适合在白色或浅色背景上使用，创造漂浮效果',
}

// 设置当前选中的类型、尺寸、形状和变体
const selectedType = ref<ButtonType>('primary')
const selectedSize = ref<ButtonSize>('medium')
const selectedShape = ref<ButtonShape>('round')
const selectedVariant = ref<DisplayVariant>('default')
const isBlock = ref(false)

// 预览区控制
const showPreview = ref(true) // 默认显示预览
// 移除自动隐藏的逻辑
onMounted(() => {
  // 只保留窗口大小变化时的监听，但不自动隐藏预览
  window.addEventListener('resize', () => {
    // 可以在这里添加其他响应式布局调整，但不改变预览显示状态
  })
})

function togglePreview() {
  showPreview.value = !showPreview.value
}

// 获取实际变体值（用于组件属性）
const actualVariant = computed<ButtonVariant>(() => {
  return selectedVariant.value === 'default' ? undefined : selectedVariant.value
})

// 示例代码
const codeExample = ref(`<CoralButton
  type="primary"
  size="medium"
  shape="round"
>
  按钮文本
</CoralButton>`)

// 更新示例代码
function updateCodeExample() {
  const blockAttr = isBlock.value ? '\n  block' : ''
  const variantAttr = selectedVariant.value !== 'default' ? `\n  variant="${selectedVariant.value}"` : ''

  codeExample.value = `<CoralButton
  type="${selectedType.value}"
  size="${selectedSize.value}"
  shape="${selectedShape.value}"${variantAttr}${blockAttr}
>
  按钮文本
</CoralButton>`
}

// 黄金分割比计算说明
const goldenRatioData = {
  mini: { v: 5, h: 8 }, // 5:8 ≈ 1:1.6
  small: { v: 6, h: 10 }, // 6:10 = 3:5 ≈ 1:1.67
  medium: { v: 8, h: 13 }, // 8:13 ≈ 1:1.625 (斐波那契数列相邻数的比值趋近于黄金比)
  large: { v: 10, h: 16 }, // 10:16 = 5:8 ≈ 1:1.6
}

// 监听所有选择变化，更新示例代码
watch([selectedType, selectedSize, selectedShape, selectedVariant, isBlock], () => {
  updateCodeExample()
})
</script>

<template>
  <view class="button-page">
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

    <!-- 页面内容容器 -->
    <view class="page-container">
      <!-- 页面标题 -->
      <view class="page-header">
        <text class="page-title-main">
          按钮 Button
        </text>
        <text class="page-description">
          按钮是用户界面中最常用的交互元素，通过不同的类型、尺寸和变体来适应各种场景
        </text>
      </view>

      <!-- 独立的预览区域 - 移到最顶部，实现吸附效果 -->
      <view class="preview-section" :class="{ 'preview-section--collapsed': !showPreview }">
        <view class="panel-header">
          <text class="panel-title">
            按钮预览
          </text>
          <view class="preview-toggle" @click="togglePreview">
            {{ showPreview ? '隐藏' : '显示' }}
          </view>
        </view>

        <view v-if="showPreview" class="preview-area" :class="{ 'preview-area--block': isBlock }">
          <CoralButton
            :type="selectedType"
            :size="selectedSize"
            :shape="selectedShape"
            :variant="actualVariant"
            :block="isBlock"
          >
            按钮文本
          </CoralButton>
        </view>
      </view>

      <!-- 主要内容区 -->
      <view class="main-content">
        <!-- 左侧：按钮配置面板 -->
        <view class="config-panel">
          <view class="panel-section">
            <text class="panel-title">
              代码示例
            </text>
            <view class="code-block">
              <text class="code-content">
                {{ codeExample }}
              </text>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              类型 Type
            </text>
            <view class="option-group">
              <view
                v-for="type in buttonTypes"
                :key="type"
                class="option-item"
                :class="{ active: selectedType === type }"
                @click="selectedType = type"
              >
                {{ type }}
              </view>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              尺寸 Size
            </text>
            <view class="option-group">
              <view
                v-for="size in buttonSizes"
                :key="size"
                class="option-item"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </view>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              形状 Shape
            </text>
            <view class="option-group">
              <view
                v-for="shape in buttonShapes"
                :key="shape"
                class="option-item"
                :class="{ active: selectedShape === shape }"
                @click="selectedShape = shape"
              >
                {{ shape }}
              </view>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              变体 Variant
            </text>
            <view class="option-group">
              <view
                v-for="variant in buttonVariants"
                :key="variant"
                class="option-item"
                :class="{ active: selectedVariant === variant }"
                @click="selectedVariant = variant"
              >
                {{ variant === 'default' ? '默认' : variant }}
              </view>
            </view>
            <view class="variant-desc">
              {{ variantDescriptions[selectedVariant] }}
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              块级显示 Block
            </text>
            <view class="switch-container">
              <text class="switch-label">
                撑满容器宽度
              </text>
              <view class="switch" :class="{ 'switch--active': isBlock }" @click="isBlock = !isBlock">
                <view class="switch__handle" />
              </view>
            </view>
            <view class="variant-desc">
              <text>Block属性控制按钮是否占满父容器宽度，与按钮的变体无关</text>
            </view>
          </view>
        </view>

        <!-- 右侧：按钮演示区 -->
        <view class="demo-panel">
          <!-- 按钮黄金分割比演示 -->
          <view class="demo-section golden-ratio-section">
            <view class="section-header">
              <text class="section-title">
                黄金比例设计
              </text>
              <text class="section-desc">
                按钮尺寸和内边距遵循黄金分割比(1:1.618)，创造和谐的视觉体验
              </text>
            </view>

            <view class="golden-ratio-grid">
              <view v-for="(size, index) in buttonSizes" :key="index" class="golden-item">
                <text class="size-label">
                  {{ size }}
                </text>
                <view class="golden-display">
                  <CoralButton :size="size" type="primary">
                    按钮
                  </CoralButton>
                  <view class="measure-horizontal">
                    <text class="measure-value">
                      {{ goldenRatioData[size].h }}px
                    </text>
                  </view>
                  <view class="measure-vertical">
                    <text class="measure-value">
                      {{ goldenRatioData[size].v }}px
                    </text>
                  </view>
                </view>
                <text class="ratio-text">
                  {{ goldenRatioData[size].v }}:{{ goldenRatioData[size].h }} ≈ 1:1.618
                </text>
              </view>
            </view>
          </view>

          <!-- 按钮状态演示 -->
          <view class="demo-section">
            <view class="section-header">
              <text class="section-title">
                按钮状态
              </text>
              <text class="section-desc">
                按钮在不同状态下的外观表现
              </text>
            </view>

            <view class="state-grid">
              <view class="state-item">
                <text class="state-label">
                  正常
                </text>
                <CoralButton :type="selectedType" :variant="actualVariant">
                  默认状态
                </CoralButton>
              </view>

              <view class="state-item">
                <text class="state-label">
                  禁用
                </text>
                <CoralButton :type="selectedType" :variant="actualVariant" disabled>
                  禁用状态
                </CoralButton>
              </view>

              <view class="state-item">
                <text class="state-label">
                  加载中
                </text>
                <CoralButton :type="selectedType" :variant="actualVariant" loading>
                  加载状态
                </CoralButton>
              </view>
            </view>
          </view>

          <!-- 类型与变体组合演示 -->
          <view class="demo-section">
            <view class="section-header">
              <text class="section-title">
                类型与变体组合
              </text>
              <text class="section-desc">
                16种组合覆盖所有使用场景
              </text>
            </view>

            <view class="matrix-container">
              <view class="matrix-header">
                <view class="matrix-cell header-cell" />
                <view v-for="variant in buttonVariants" :key="variant" class="matrix-cell header-cell">
                  {{ variantDisplayNames[variant] }}
                </view>
              </view>

              <view v-for="type in buttonTypes" :key="type" class="matrix-row">
                <view class="matrix-cell header-cell">
                  {{ type }}
                </view>
                <view v-for="variant in buttonVariants" :key="`${type}-${variant}`" class="matrix-cell">
                  <CoralButton :type="type" :variant="variant === 'default' ? undefined : variant" size="small">
                    Button
                  </CoralButton>
                </view>
              </view>
            </view>
          </view>

          <!-- Filled vs Elevated 对比区 -->
          <view class="demo-section">
            <view class="section-header">
              <text class="section-title">
                Filled vs Elevated
              </text>
              <text class="section-desc">
                Filled（填充）和Elevated（阴影）按钮的视觉差异对比
              </text>
            </view>

            <view class="compare-container">
              <view class="compare-wrapper">
                <view class="compare-item">
                  <text class="compare-title">
                    Filled
                  </text>
                  <view class="compare-display">
                    <CoralButton type="primary" size="medium">
                      填充按钮
                    </CoralButton>
                  </view>
                  <text class="compare-desc">
                    平面效果，无阴影
                  </text>
                </view>

                <view class="compare-item">
                  <text class="compare-title">
                    Elevated
                  </text>
                  <view class="compare-display elevated-display">
                    <CoralButton type="primary" variant="elevated" size="medium">
                      阴影按钮
                    </CoralButton>
                    <view class="shadow-indicator" />
                  </view>
                  <text class="compare-desc">
                    立体效果，有阴影和微小上浮
                  </text>
                </view>
              </view>

              <view class="compare-note">
                <text>Elevated按钮在Filled基础上添加了明显的阴影效果和轻微上浮（translateY(-1px)），营造出按钮从界面中"悬浮"的视觉效果，适合需要强调的操作。</text>
              </view>
            </view>
          </view>

          <!-- Block vs Non-Block 对比区 -->
          <view class="demo-section">
            <view class="section-header">
              <text class="section-title">
                Block vs Non-Block
              </text>
              <text class="section-desc">
                Block属性控制按钮是否占满父容器宽度
              </text>
            </view>

            <view class="block-compare-container">
              <view class="block-compare-item">
                <text class="compare-title">
                  常规按钮（Non-Block）
                </text>
                <view class="block-demo">
                  <CoralButton type="primary">
                    常规按钮
                  </CoralButton>
                </view>
                <text class="compare-desc">
                  宽度根据内容自适应
                </text>
              </view>

              <view class="block-compare-item">
                <text class="compare-title">
                  块级按钮（Block）
                </text>
                <view class="block-demo">
                  <CoralButton type="primary" block>
                    块级按钮
                  </CoralButton>
                </view>
                <text class="compare-desc">
                  宽度占满父容器
                </text>
              </view>

              <view class="block-compare-note">
                <text>Block属性与按钮的变体无关。无论是默认样式、outlined、text还是elevated变体，都可以设置block属性使按钮宽度占满父容器。</text>
              </view>
            </view>
          </view>

          <!-- 变体对比区 -->
          <view class="demo-section">
            <view class="section-header">
              <text class="section-title">
                变体对比
              </text>
              <text class="section-desc">
                按钮提供了4种视觉变体，每种有不同的视觉权重和适用场景
              </text>
            </view>

            <view class="variants-container">
              <view class="variant-row">
                <text class="variant-name">
                  默认
                </text>
                <view class="variant-demo">
                  <CoralButton type="primary">
                    默认变体
                  </CoralButton>
                </view>
                <text class="variant-desc">
                  填充样式，视觉权重最强，适合主要操作
                </text>
              </view>

              <view class="variant-row">
                <text class="variant-name">
                  Outlined
                </text>
                <view class="variant-demo">
                  <CoralButton type="primary" variant="outlined">
                    描边变体
                  </CoralButton>
                </view>
                <text class="variant-desc">
                  边框样式，视觉权重适中，适合次要操作
                </text>
              </view>

              <view class="variant-row">
                <text class="variant-name">
                  Text
                </text>
                <view class="variant-demo">
                  <CoralButton type="primary" variant="text">
                    文本变体
                  </CoralButton>
                </view>
                <text class="variant-desc">
                  纯文本样式，视觉权重最轻，适合辅助操作
                </text>
              </view>

              <view class="variant-row">
                <text class="variant-name">
                  Elevated
                </text>
                <view class="variant-demo">
                  <CoralButton type="primary" variant="elevated">
                    阴影变体
                  </CoralButton>
                </view>
                <text class="variant-desc">
                  带阴影的填充样式，增强层次感，适合需要强调的场景
                </text>
              </view>
            </view>
          </view>

          <!-- API文档 -->
          <view class="demo-section">
            <view class="section-header">
              <text class="section-title">
                API 参考
              </text>
              <text class="section-desc">
                按钮组件属性说明
              </text>
            </view>

            <view class="api-table">
              <view class="api-row header">
                <text class="api-cell prop">
                  属性
                </text>
                <text class="api-cell type">
                  类型
                </text>
                <text class="api-cell default">
                  默认值
                </text>
                <text class="api-cell desc">
                  说明
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  type
                </text>
                <text class="api-cell type">
                  string
                </text>
                <text class="api-cell default">
                  primary
                </text>
                <text class="api-cell desc">
                  按钮类型，决定按钮的主题色
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  size
                </text>
                <text class="api-cell type">
                  string
                </text>
                <text class="api-cell default">
                  medium
                </text>
                <text class="api-cell desc">
                  按钮尺寸，影响按钮的大小和内边距
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  shape
                </text>
                <text class="api-cell type">
                  string
                </text>
                <text class="api-cell default">
                  round
                </text>
                <text class="api-cell desc">
                  按钮形状，影响按钮的边角半径
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  variant
                </text>
                <text class="api-cell type">
                  string
                </text>
                <text class="api-cell default">
                  undefined
                </text>
                <text class="api-cell desc">
                  按钮变体，影响按钮的视觉样式
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  disabled
                </text>
                <text class="api-cell type">
                  boolean
                </text>
                <text class="api-cell default">
                  false
                </text>
                <text class="api-cell desc">
                  是否禁用按钮，禁用后不可点击
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  loading
                </text>
                <text class="api-cell type">
                  boolean
                </text>
                <text class="api-cell default">
                  false
                </text>
                <text class="api-cell desc">
                  是否显示加载状态
                </text>
              </view>

              <view class="api-row">
                <text class="api-cell prop">
                  block
                </text>
                <text class="api-cell type">
                  boolean
                </text>
                <text class="api-cell default">
                  false
                </text>
                <text class="api-cell desc">
                  是否为块级元素，占满父容器宽度
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
/* 页面基础样式 */
.button-page {
  min-height: 100vh;
  background-color: #f7f9fc;
  font-family: SF Pro Display, Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  padding-top: 44px; /* 导航栏高度 */
  padding-bottom: 40px; /* 增加底部间距 */
  position: relative;
}

/* 导航栏样式 */
.nav-bar {
  height: 44px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; /* 确保导航栏在预览区上方 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.back-button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-icon {
  font-size: 20px;
  color: #333;
}

.page-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

/* 页面容器 */
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 64px; /* 增加底部内边距 */
}

/* 页面标题区 */
.page-header {
  margin-bottom: 0; /* 减少页面标题与预览区的间距 */
  padding-bottom: 16px;
  text-align: center;
}

.page-title-main {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.page-description {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  display: block;
}

/* 主内容区布局 */
.main-content {
  display: flex;
  flex-direction: column; /* 移动端默认上下布局，先显示配置面板 */
  gap: 32px;
}

/* 配置面板 */
.config-panel {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  max-height: none; /* 不限制高度 */
  overflow-y: visible; /* 确保内容可见 */
  position: relative; /* 使用相对定位 */
  margin-bottom: 32px; /* 增加底部间距 */
  /* 定制滚动条 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.1) transparent;
}

.config-panel::-webkit-scrollbar {
  width: 4px;
}

.config-panel::-webkit-scrollbar-track {
  background: transparent;
}

.config-panel::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1);
  border-radius: 20px;
}

.panel-section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.panel-section:last-child {
  border-bottom: none;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: block;
}

/* 预览区 */
.preview-section {
  position: sticky;
  top: 44px; /* 导航栏高度 */
  z-index: 99; /* 确保预览区在其他内容之上，但在导航栏之下 */
  background-color: white;
  padding: 16px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 24px;
  margin-left: -16px;
  margin-right: -16px;
  padding-left: 16px;
  padding-right: 16px;
  transition: padding 0.3s ease;
}

/* 预览关闭时的样式 */
.preview-section--collapsed {
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #fafafa;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-toggle {
  font-size: 14px;
  color: var(--coral-500, #FF7E6A);
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid var(--coral-300, #FFADA0);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.preview-toggle:hover {
  background-color: rgba(255, 126, 106, 0.1);
}

.preview-area {
  background-color: #f7f9fc;
  border: 1px dashed #ddd;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  height: auto;
  overflow: hidden;
}

.preview-area--block {
  background-color: #f0f4f9;
  position: relative;
}

.preview-area--block::before {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  top: 0;
  bottom: 0;
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
  border-right: 1px dashed rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 0;
}

.code-block {
  background-color: #f2f4f8;
  border-radius: 6px;
  padding: 12px;
  font-family: 'SF Mono', 'Courier New', monospace;
  font-size: 13px;
  color: #444;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-content {
  display: block;
  line-height: 1.5;
}

/* 选项组样式 */
.option-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-item {
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #f2f4f8;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-item:hover {
  background-color: #e6eaf0;
}

.option-item.active {
  background-color: var(--coral-500, #FF7E6A);
  color: white;
}

.variant-desc {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-left: 3px solid var(--coral-300, #FFADA0);
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  border-radius: 0 6px 6px 0;
}

/* 演示面板 */
.demo-panel {
  display: flex;
  flex-direction: column;
  gap: 32px; /* 增加演示区域之间的间距 */
  padding-bottom: 40px; /* 确保底部有足够空间 */
}

.demo-section {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 16px; /* 增加间距 */
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.section-desc {
  font-size: 14px;
  color: #666;
  display: block;
}

/* 黄金分割比展示 */
.golden-ratio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.golden-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.size-label {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
}

.golden-display {
  position: relative;
  padding: 40px;
  background-color: #f5f7fa;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.measure-horizontal,
.measure-vertical {
  position: absolute;
  background-color: rgba(255, 126, 106, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.measure-horizontal {
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 60%;
}

.measure-vertical {
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 60%;
}

.measure-value {
  font-size: 12px;
  background-color: rgba(255, 126, 106, 0.9);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.ratio-text {
  margin-top: 12px;
  font-size: 13px;
  color: #666;
}

/* 按钮状态展示 */
.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.state-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.state-label {
  font-size: 14px;
  color: #666;
}

/* 矩阵样式 */
.matrix-container {
  overflow-x: auto;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
}

.matrix-header,
.matrix-row {
  display: flex;
  min-width: 600px; /* 确保在手机上可以水平滚动查看完整内容 */
}

.matrix-header {
  background-color: #f5f7fa;
  position: sticky;
  top: 0;
  z-index: 1;
}

.matrix-cell {
  padding: 12px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.matrix-cell:last-child {
  border-right: none;
}

.matrix-row:last-child .matrix-cell {
  border-bottom: none;
}

.header-cell {
  font-weight: 600;
  background-color: #f5f7fa;
}

/* API表格 */
.api-table {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.api-row {
  display: flex;
  border-bottom: 1px solid #eee;
}

.api-row:last-child {
  border-bottom: none;
}

.api-row.header {
  background-color: #f5f7fa;
  font-weight: 600;
}

.api-cell {
  padding: 12px 16px;
  font-size: 14px;
}

.api-cell.prop {
  width: 15%;
  min-width: 100px;
  color: var(--coral-500, #FF7E6A);
  font-family: 'SF Mono', monospace;
}

.api-cell.type {
  width: 15%;
  min-width: 80px;
  font-family: 'SF Mono', monospace;
  color: var(--teal-700, #35A39B);
}

.api-cell.default {
  width: 15%;
  min-width: 80px;
  font-family: 'SF Mono', monospace;
}

.api-cell.desc {
  flex: 1;
  min-width: 200px;
}

/* Filled vs Elevated对比区样式 */
.compare-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.compare-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}

.compare-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  flex: 1;
}

.compare-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.compare-display {
  background-color: #f5f7fa;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;
}

.elevated-display {
  background: linear-gradient(to bottom, #f5f7fa 50%, #e8ecf1 100%);
}

.shadow-indicator {
  position: absolute;
  bottom: 20px;
  width: 70%;
  height: 10px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%);
  border-radius: 50%;
  z-index: 0;
}

.compare-desc {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.compare-note {
  background-color: #f8f9fa;
  border-left: 3px solid var(--coral-300, #FFADA0);
  padding: 16px;
  border-radius: 0 6px 6px 0;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

/* Block vs Non-Block 对比区样式 */
.block-compare-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.block-compare-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
}

.block-demo {
  background-color: #f7f9fc;
  padding: 24px;
  border-radius: 8px;
  margin: 16px 0;
  border: 1px dashed #ddd;
}

.block-compare-note {
  background-color: #f8f9fa;
  border-left: 3px solid var(--teal-300, #8EEAE3);
  padding: 16px;
  border-radius: 0 6px 6px 0;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-top: 16px;
}

/* 变体对比区样式 */
.variants-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;
}

.variant-row {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
}

.variant-name {
  font-weight: 600;
  min-width: 80px;
  color: #333;
}

.variant-demo {
  flex: 1;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  background-color: #f7f9fc;
  border-radius: 4px;
  padding: 16px;
  margin: 0 16px;
}

.variant-desc {
  font-size: 14px;
  color: #666;
  max-width: 300px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .variant-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .variant-name {
    min-width: auto;
  }

  .variant-demo {
    width: 100%;
    margin: 0;
  }

  .variant-desc {
    max-width: none;
  }

  /* 移动端响应式样式 */
  .golden-ratio-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  .golden-display {
    padding: 30px 20px;
  }

  .state-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }

  .api-row {
    flex-direction: column;
    padding: 16px;
  }

  .api-row.header {
    display: none;
  }

  .api-cell {
    padding: 4px 0;
    width: 100% !important;
  }

  .api-cell.prop::before {
    content: "属性: ";
    color: #666;
    font-weight: normal;
    font-family: inherit;
  }

  .api-cell.type::before {
    content: "类型: ";
    color: #666;
    font-weight: normal;
    font-family: inherit;
  }

  .api-cell.default::before {
    content: "默认值: ";
    color: #666;
    font-weight: normal;
    font-family: inherit;
  }

  .api-cell.desc::before {
    content: "说明: ";
    color: #666;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  .api-table {
    border: none;
    background-color: transparent;
  }

  .api-row {
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 12px;
    background-color: white;
  }

  /* 确保变体说明清晰可见 */
  .variant-desc {
    margin-top: 16px;
    padding: 16px;
    background-color: #f8f9fa;
    border-left: 3px solid var(--coral-300, #FFADA0);
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    border-radius: 0 6px 6px 0;
  }

  /* 优化对比区移动端展示 */
  .compare-wrapper {
    flex-direction: column;
    gap: 24px;
  }

  .compare-item {
    width: 100%;
  }

  .compare-display {
    height: 100px;
  }

  /* 修改配置面板在移动端的样式 */
  .config-panel {
    position: relative;
    margin: 0 0 24px 0; /* 标准边距 */
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .demo-panel {
    padding-bottom: 30px;
  }

  /* 调整演示区域和配置面板之间的间距 */
  .main-content {
    gap: 24px;
  }
}

@media (min-width: 992px) {
  .page-container {
    padding: 32px;
  }

  .main-content {
    flex-direction: row;
  }

  .config-panel {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 20px;
    align-self: flex-start;
    max-height: calc(100vh - 40px); /* 留出顶部和底部空间 */
    overflow-y: auto; /* 桌面端可滚动 */
  }

  .demo-panel {
    flex: 1;
    padding-bottom: 0; /* 桌面端无需额外底部间距 */
  }

  .preview-section {
    margin-left: 0;
    margin-right: 0;
    border-radius: 12px;
    border: 1px solid #eee;
  }

  .page-header {
    margin-bottom: 24px;
  }
}

/* 固定的按钮预览区 */
.fixed-preview {
  display: none;
}

/* Block切换开关样式 */
.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.switch-label {
  font-size: 14px;
  color: #555;
}

.switch {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.switch--active {
  background-color: var(--coral-500, #FF7E6A);
}

.switch__handle {
  position: absolute;
  left: 2px;
  top: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.switch--active .switch__handle {
  transform: translateX(20px);
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "按钮组件",
    "navigationStyle": "custom"
  }
}
</route>
