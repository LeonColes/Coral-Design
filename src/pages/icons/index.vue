<script setup lang="ts">
import Icon from '@/components/icon/index.vue'
import NavBar from '@/components/navbar/index.vue'
import { computed, ref, watch } from 'vue'

// 图标尺寸类型
type IconSize = 'mini' | 'small' | 'medium' | 'large'

// 可用的预设颜色
type PresetColor = 'primary' | 'success' | 'warning' | 'danger' | 'black' | 'white' | ''

// 返回组件页面函数
function goBack() {
  uni.navigateBack()
}

// 图标尺寸列表
const iconSizes: IconSize[] = ['mini', 'small', 'medium', 'large']

// 图标颜色列表
const iconColors: PresetColor[] = ['primary', 'success', 'warning', 'danger', 'black', 'white']

// 设置当前选中的图标和属性
const selectedIcon = ref('info.svg')
const selectedSize = ref<IconSize>('medium')
const selectedColor = ref<PresetColor>('primary')
const customWidth = ref('')
const customHeight = ref('')
const customColor = ref('')

// 内置图标列表
const iconList = ref([
  'info.svg',
  'home.svg',
  'arrow-left.svg',
  'arrow-right.svg',
  'plus.svg',
  'minus.svg',
  'check.svg',
  'close.svg',
])

// 预览区控制
const showPreview = ref(true)

function togglePreview() {
  showPreview.value = !showPreview.value
}

// 预览时是否使用自定义宽高
const useCustomSize = ref(false)

function toggleCustomSize(e: { detail: { value: boolean } }) {
  useCustomSize.value = !e.detail.value
}

// 更新自定义颜色
function updateCustomColor() {
  if (customColor.value) {
    selectedColor.value = customColor.value as PresetColor
  }
}

// 示例代码
const codeExample = computed(() => {
  let code = '<Icon'

  // 添加name属性
  code += `\n  name="${selectedIcon.value}"`

  // 添加size属性（如果不使用自定义尺寸）
  if (!useCustomSize.value) {
    code += `\n  size="${selectedSize.value}"`
  }

  // 添加自定义宽高（如果使用）
  if (useCustomSize.value && customWidth.value) {
    code += `\n  width="${customWidth.value}"`
  }
  if (useCustomSize.value && customHeight.value) {
    code += `\n  height="${customHeight.value}"`
  }

  // 添加颜色属性
  if (selectedColor.value) {
    code += `\n  color="${selectedColor.value}"`
  }

  code += '\n/>'
  return code
})

// 监听选项变化
watch([selectedIcon, selectedSize, customWidth, customHeight, selectedColor, useCustomSize], () => {
  // 自动更新代码示例由computed属性处理
})
</script>

<template>
  <view class="icon-page">
    <!-- 导航栏 -->
    <NavBar
      title="图标组件"
      :title-center="true"
      :show-back="true"
      @back-click="goBack"
    />

    <!-- 主内容区 -->
    <view class="page-content">
      <!-- 页面标题 -->
      <view class="page-header">
        <text class="page-title-main">
          图标 Icon
        </text>
        <text class="page-description">
          图标是用户界面中常用的视觉元素，提供直观的操作提示和功能表达
        </text>
      </view>

      <!-- 固定预览区域 -->
      <view class="sticky-preview preview-container">
        <view class="preview-header">
          <text class="preview-title">
            图标预览
          </text>
          <view class="preview-toggle" @click="togglePreview">
            {{ showPreview ? '隐藏' : '显示' }}
          </view>
        </view>

        <view v-if="showPreview" class="preview-content">
          <view class="preview-icon-wrapper">
            <Icon
              :name="selectedIcon"
              :size="!useCustomSize ? selectedSize : undefined"
              :width="useCustomSize ? customWidth : undefined"
              :height="useCustomSize ? customHeight : undefined"
              :color="selectedColor"
            />
          </view>

          <view class="preview-code">
            <text class="code-title">
              代码示例:
            </text>
            <view class="code-block">
              <text class="code-content">
                {{ codeExample }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 配置区域 -->
      <view class="config-section">
        <view class="section-title">
          配置选项
        </view>

        <!-- 图标选择 -->
        <view class="config-panel">
          <view class="panel-title">
            图标选择
          </view>
          <view class="icon-grid">
            <view
              v-for="icon in iconList"
              :key="icon"
              class="icon-grid-item"
              :class="{ active: selectedIcon === icon }"
              @click="selectedIcon = icon"
            >
              <Icon :name="icon" size="small" color="primary" />
              <text class="icon-name">
                {{ icon.replace('.svg', '') }}
              </text>
            </view>
          </view>
        </view>

        <!-- 尺寸设置 -->
        <view class="config-panel">
          <view class="panel-title">
            尺寸设置
          </view>
          <view class="size-toggle">
            <text>使用预设尺寸</text>
            <switch
              :checked="!useCustomSize"
              color="#FF7E6A"
              @change="toggleCustomSize"
            />
          </view>

          <view v-if="!useCustomSize" class="option-group">
            <view
              v-for="size in iconSizes"
              :key="size"
              class="option-item"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </view>
          </view>

          <view v-else class="custom-size-inputs">
            <view class="input-group">
              <text>宽度:</text>
              <input
                v-model="customWidth"
                type="number"
                placeholder="例如: 48"
              >
            </view>
            <view class="input-group">
              <text>高度:</text>
              <input
                v-model="customHeight"
                type="number"
                placeholder="例如: 48"
              >
            </view>
          </view>
        </view>

        <!-- 颜色设置 -->
        <view class="config-panel">
          <view class="panel-title">
            颜色设置
          </view>
          <view class="color-grid">
            <view
              v-for="color in iconColors"
              :key="color"
              class="color-item"
              :class="[`color-${color}`, { active: selectedColor === color }]"
              @click="selectedColor = color"
            >
              {{ color }}
            </view>
            <view class="color-item color-custom">
              <text>自定义颜色:</text>
              <input
                v-model="customColor"
                placeholder="#FF0000"
                @input="updateCustomColor"
              >
            </view>
          </view>
        </view>
      </view>

      <!-- 使用示例区域 -->
      <view class="examples-section">
        <view class="section-title">
          使用示例
        </view>

        <!-- 基础用法 -->
        <view class="example-panel">
          <view class="panel-title">
            基础用法
          </view>
          <view class="example-desc">
            图标组件支持使用内置图标或自定义图标路径
          </view>

          <view class="example-display">
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="primary" />
              <text class="example-label">
                info
              </text>
            </view>
            <view class="example-item">
              <Icon name="home.svg" size="medium" color="primary" />
              <text class="example-label">
                home
              </text>
            </view>
            <view class="example-item">
              <Icon name="check.svg" size="medium" color="primary" />
              <text class="example-label">
                check
              </text>
            </view>
            <view class="example-item">
              <Icon name="close.svg" size="medium" color="primary" />
              <text class="example-label">
                close
              </text>
            </view>
          </view>

          <view class="example-code">
            <text class="code-block">
              &lt;Icon name="info.svg" size="medium" color="primary" /&gt;
              &lt;Icon name="home.svg" size="medium" color="primary" /&gt;
            </text>
          </view>
        </view>

        <!-- 不同尺寸 -->
        <view class="example-panel">
          <view class="panel-title">
            不同尺寸
          </view>
          <view class="example-desc">
            图标支持多种预设尺寸
          </view>

          <view class="example-display">
            <view class="example-item">
              <Icon name="info.svg" size="mini" color="primary" />
              <text class="example-label">
                mini
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="small" color="primary" />
              <text class="example-label">
                small
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="primary" />
              <text class="example-label">
                medium
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="large" color="primary" />
              <text class="example-label">
                large
              </text>
            </view>
          </view>

          <view class="example-code">
            <text class="code-block">
              &lt;Icon name="info.svg" size="mini" color="primary" /&gt;
              &lt;Icon name="info.svg" size="small" color="primary" /&gt;
              &lt;Icon name="info.svg" size="medium" color="primary" /&gt;
              &lt;Icon name="info.svg" size="large" color="primary" /&gt;
            </text>
          </view>
        </view>

        <!-- 不同颜色 -->
        <view class="example-panel">
          <view class="panel-title">
            不同颜色
          </view>
          <view class="example-desc">
            图标支持预设颜色和自定义颜色
          </view>

          <view class="example-display">
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="primary" />
              <text class="example-label">
                primary
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="success" />
              <text class="example-label">
                success
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="warning" />
              <text class="example-label">
                warning
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="danger" />
              <text class="example-label">
                danger
              </text>
            </view>
          </view>

          <view class="example-code">
            <text class="code-block">
              &lt;Icon name="info.svg" size="medium" color="primary" /&gt;
              &lt;Icon name="info.svg" size="medium" color="success" /&gt;
              &lt;Icon name="info.svg" size="medium" color="warning" /&gt;
              &lt;Icon name="info.svg" size="medium" color="danger" /&gt;
            </text>
          </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="example-panel">
          <view class="panel-title">
            自定义颜色
          </view>
          <view class="example-desc">
            可以使用任意有效的CSS颜色值
          </view>

          <view class="example-display">
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="#8A2BE2" />
              <text class="example-label">
                #8A2BE2
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="#FF1493" />
              <text class="example-label">
                #FF1493
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="#00CED1" />
              <text class="example-label">
                #00CED1
              </text>
            </view>
            <view class="example-item">
              <Icon name="info.svg" size="medium" color="#32CD32" />
              <text class="example-label">
                #32CD32
              </text>
            </view>
          </view>

          <view class="example-code">
            <text class="code-block">
              &lt;Icon name="info.svg" size="medium" color="#8A2BE2" /&gt;
              &lt;Icon name="info.svg" size="medium" color="#FF1493" /&gt;
            </text>
          </view>
        </view>
      </view>

      <!-- API文档 -->
      <view class="api-section">
        <view class="section-title">
          API参考
        </view>

        <view class="api-table">
          <view class="api-header">
            <text class="api-cell prop-cell">
              属性
            </text>
            <text class="api-cell type-cell">
              类型
            </text>
            <text class="api-cell default-cell">
              默认值
            </text>
            <text class="api-cell desc-cell">
              说明
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              name
            </text>
            <text class="api-cell type-cell">
              String
            </text>
            <text class="api-cell default-cell">
              ''
            </text>
            <text class="api-cell desc-cell">
              内置图标名称，对应static/icons目录下的图标文件名
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              src
            </text>
            <text class="api-cell type-cell">
              String
            </text>
            <text class="api-cell default-cell">
              ''
            </text>
            <text class="api-cell desc-cell">
              自定义图标路径，优先级高于name
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              size
            </text>
            <text class="api-cell type-cell">
              String
            </text>
            <text class="api-cell default-cell">
              'medium'
            </text>
            <text class="api-cell desc-cell">
              图标大小，可选值: mini, small, medium, large
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              width
            </text>
            <text class="api-cell type-cell">
              String, Number
            </text>
            <text class="api-cell default-cell">
              ''
            </text>
            <text class="api-cell desc-cell">
              自定义宽度，设置后将覆盖size预设值
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              height
            </text>
            <text class="api-cell type-cell">
              String, Number
            </text>
            <text class="api-cell default-cell">
              ''
            </text>
            <text class="api-cell desc-cell">
              自定义高度，设置后将覆盖size预设值
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              color
            </text>
            <text class="api-cell type-cell">
              String
            </text>
            <text class="api-cell default-cell">
              ''
            </text>
            <text class="api-cell desc-cell">
              图标颜色，可以是预设颜色或自定义颜色值
            </text>
          </view>

          <view class="api-row">
            <text class="api-cell prop-cell">
              themeColor
            </text>
            <text class="api-cell type-cell">
              Boolean
            </text>
            <text class="api-cell default-cell">
              false
            </text>
            <text class="api-cell desc-cell">
              是否使用主题颜色（与按钮类型匹配）
            </text>
          </view>
        </view>

        <!-- 尺寸参考 -->
        <view class="size-reference">
          <view class="panel-title">
            尺寸参考
          </view>
          <view class="size-table">
            <view class="size-row">
              <text class="size-name">
                mini:
              </text>
              <text class="size-value">
                36rpx x 36rpx (18px)
              </text>
            </view>
            <view class="size-row">
              <text class="size-name">
                small:
              </text>
              <text class="size-value">
                48rpx x 48rpx (24px)
              </text>
            </view>
            <view class="size-row">
              <text class="size-name">
                medium:
              </text>
              <text class="size-value">
                64rpx x 64rpx (32px)
              </text>
            </view>
            <view class="size-row">
              <text class="size-name">
                large:
              </text>
              <text class="size-value">
                80rpx x 80rpx (40px)
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.icon-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.page-content {
  padding: 20px 16px 40px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title-main {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.page-description {
  font-size: 14px;
  color: #666;
  display: block;
}

/* 固定预览区域 */
.preview-container {
  background-color: white;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.sticky-preview {
  position: sticky;
  top: 20px;
  z-index: 10;
  transition: box-shadow 0.3s;
}

.sticky-preview:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.preview-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.preview-toggle {
  font-size: 14px;
  color: #FF7E6A;
  cursor: pointer;
}

.preview-content {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  min-height: 100px;
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.preview-code {
  width: 100%;
}

.code-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  display: block;
}

.code-block {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: monospace;
  font-size: 14px;
  white-space: pre;
  color: #333;
  overflow-x: auto;
}

/* 配置区域 */
.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: block;
}

.config-section {
  margin-bottom: 40px;
}

.config-panel {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: block;
}

/* 图标选择网格 */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
}

.icon-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-grid-item.active {
  background-color: rgba(255, 126, 106, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(255, 126, 106, 0.2);
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

/* 尺寸设置 */
.size-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.option-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.option-item {
  padding: 8px 16px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.option-item.active {
  background-color: #FF7E6A;
  color: white;
}

.custom-size-inputs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* 颜色选择 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.color-item {
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #eee;
}

.color-item.active {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-primary {
  background-color: rgba(255, 126, 106, 0.1);
  color: #FF7E6A;
}

.color-success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.color-warning {
  background-color: rgba(255, 152, 0, 0.1);
  color: #FF9800;
}

.color-danger {
  background-color: rgba(244, 67, 54, 0.1);
  color: #F44336;
}

.color-black {
  background-color: rgba(0, 0, 0, 0.05);
  color: #000;
}

.color-white {
  background-color: #fff;
  color: #666;
  border: 1px solid #eee;
}

.color-custom {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 12px;
  cursor: default;
}

.color-custom text {
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
  text-align: left;
}

.color-custom input {
  height: 32px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
}

/* 示例区域 */
.examples-section {
  margin-bottom: 40px;
}

.example-panel {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.example-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.example-display {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.example-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.example-label {
  font-size: 12px;
  color: #666;
}

.example-code {
  margin-top: 16px;
  font-size: 14px;
}

/* API文档区域 */
.api-section {
  margin-bottom: 40px;
}

.api-table {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.api-header {
  display: flex;
  background-color: #f5f7fa;
  font-weight: 600;
  border-bottom: 1px solid #ebeef5;
}

.api-row {
  display: flex;
  border-bottom: 1px solid #ebeef5;
}

.api-row:last-child {
  border-bottom: none;
}

.api-cell {
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
}

.prop-cell {
  width: 15%;
  color: #FF7E6A;
  font-weight: 500;
}

.type-cell {
  width: 20%;
  color: #1976D2;
}

.default-cell {
  width: 15%;
  color: #666;
}

.desc-cell {
  flex: 1;
  color: #333;
}

/* 尺寸参考 */
.size-reference {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.size-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.size-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.size-row:last-child {
  border-bottom: none;
}

.size-name {
  width: 80px;
  font-weight: 500;
  color: #333;
}

.size-value {
  color: #666;
}

/* 响应式布局 */
@media (min-width: 768px) {
  .page-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }

  .preview-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .preview-icon-wrapper {
    width: 40%;
    margin-bottom: 0;
    margin-right: 20px;
  }

  .preview-code {
    width: 60%;
  }

  .examples-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .example-panel {
    margin-bottom: 0;
  }
}

@media (max-width: 767px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }

  .color-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "图标组件",
    "navigationStyle": "custom"
  }
}
</route>
