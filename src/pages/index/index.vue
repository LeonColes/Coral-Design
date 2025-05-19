<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { computed, onMounted, ref } from 'vue'

// 初始化主题状态
const themeStore = useThemeStore()

// 定义组件项类型
interface ComponentItem {
  title: string
  desc: string
  icon: string
  status: 'planning' | 'completed'
  path?: string
}

// 跳转到组件详情页
function goToComponent(path: string | undefined, status: string) {
  if (status === 'planning' || !path) {
    uni.showToast({
      title: '该组件正在规划中',
      icon: 'none',
    })
    return
  }

  uni.navigateTo({
    url: `../${path}/index`,
  })
}

// 动画控制
const isAnimationLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isAnimationLoaded.value = true
  }, 100)
})

// 组件图标路径计算
const getIconPath = computed(() => (icon: string) => {
  return `/static/icons/${icon}.png`
})

// 预设主题颜色
const themeColors = [
  '#FF7E6A', // 珊瑚红
  '#4ECDC4', // 青绿色
  '#FF6B00', // 橙色
  '#8A4FFF', // 紫色
  '#FF4F8A', // 粉色
  '#4F8AFF', // 蓝色
]

// 计算当前边框圆角值
const radiusValue = computed(() => {
  const radius = themeStore.settings.value.borderRadius || 'var(--radius-md)'
  if (radius.includes('var(--radius-')) {
    // 从变量映射到滑块值
    switch (radius) {
      case 'var(--radius-none)': return 0
      case 'var(--radius-sm)': return 2
      case 'var(--radius-md)': return 4
      case 'var(--radius-lg)': return 8
      case 'var(--radius-xl)': return 12
      case 'var(--radius-2xl)': return 16
      case 'var(--radius-3xl)': return 20
      default: return 4
    }
  }
  return Number.parseInt(radius)
})

// 处理圆角变化
function onRadiusChange(e: any) {
  const value = e.detail.value
  let radius

  // 映射滑块值到CSS变量
  if (value === 0)
    radius = 'var(--radius-none)'
  else if (value <= 2)
    radius = 'var(--radius-sm)'
  else if (value <= 4)
    radius = 'var(--radius-md)'
  else if (value <= 8)
    radius = 'var(--radius-lg)'
  else if (value <= 12)
    radius = 'var(--radius-xl)'
  else if (value <= 16)
    radius = 'var(--radius-2xl)'
  else radius = 'var(--radius-3xl)'

  themeStore.setBorderRadius(radius)
}

// 切换主题
function toggleTheme() {
  if (themeStore.isDark.value) {
    themeStore.setTheme('light')
  }
  else {
    themeStore.setTheme('dark')
  }
}

// 目前的组件列表
const componentList = [
  {
    name: '设计系统',
    items: [
      { title: '颜色 Colors', desc: '系统配色方案', icon: 'colors', status: 'completed', path: 'colors' },
      { title: '排版 Typography', desc: '文本排版样式', icon: 'typography', status: 'completed', path: 'typography' },
      { title: '主题 Theme', desc: '暗黑模式与自定义主题', icon: 'theme', status: 'completed', path: 'theme' },
    ] as ComponentItem[],
  },
  {
    name: '基础组件',
    items: [
      { title: '按钮 Button', desc: '多样式按钮组件', icon: 'button', status: 'completed', path: 'button' },
      { title: '图标 Icon', desc: '图标集合', icon: 'icon', status: 'completed', path: 'icons' },
      { title: '导航栏 Navbar', desc: '页面顶部导航', icon: 'navbar', status: 'completed', path: 'navbar' },
      { title: '卡片 Card', desc: '内容容器组件', icon: 'card', status: 'completed', path: 'card' },
      { title: '文本 Text', desc: '文本显示组件', icon: 'text', status: 'completed', path: 'text' },
      { title: '表格 Table', desc: '数据表格组件', icon: 'table', status: 'completed', path: 'table' },
    ] as ComponentItem[],
  },
  {
    name: '表单组件',
    items: [
      { title: '输入框 Input', desc: '接收用户输入', icon: 'input', status: 'planning' },
      { title: '选择器 Select', desc: '下拉选择组件', icon: 'select', status: 'planning' },
      { title: '单选框 Radio', desc: '单选组件', icon: 'radio', status: 'completed', path: 'radio' },
      { title: '复选框 Checkbox', desc: '多选组件', icon: 'checkbox', status: 'completed', path: 'checkbox' },
      { title: '开关 Switch', desc: '状态切换', icon: 'switch', status: 'completed', path: 'switch' },
    ] as ComponentItem[],
  },
  {
    name: '反馈组件',
    items: [
      { title: '对话框 Dialog', desc: '模态对话框', icon: 'dialog', status: 'planning' },
      { title: '提示 Toast', desc: '轻量级反馈', icon: 'toast', status: 'planning' },
      { title: '加载 Loading', desc: '加载状态', icon: 'loading', status: 'planning' },
      { title: '通知 Notification', desc: '通知消息', icon: 'notification', status: 'planning' },
    ] as ComponentItem[],
  },
  {
    name: '导航组件',
    items: [
      { title: '标签页 Tabs', desc: '内容分组切换', icon: 'tabs', status: 'planning' },
      { title: '底部导航 TabBar', desc: '应用底部导航', icon: 'tabbar', status: 'planning' },
      { title: '步骤条 Steps', desc: '步骤流程展示', icon: 'steps', status: 'planning' },
    ] as ComponentItem[],
  },
]
</script>

<template>
  <view class="components-page">
    <!-- 页头部分 -->
    <view class="page-header">
      <view class="navbar">
        <view class="logo">
          <text class="logo-text">
            珊瑚设计
          </text>
          <text class="logo-sub">
            Coral Design
          </text>
        </view>

        <!-- 主题切换按钮 -->
        <view class="theme-toggle" @tap="toggleTheme">
          <view class="toggle-icon">
            <view v-if="themeStore.isDark.value" class="moon-icon" />
            <view v-else class="sun-icon" />
          </view>
        </view>
      </view>

      <!-- 主题设置部分 -->
      <view class="theme-section" :class="{ 'animate-in': isAnimationLoaded }">
        <view class="section-title">
          主题设置
        </view>

        <view class="theme-options">
          <view
            class="theme-option"
            :class="{ active: themeStore.settings.value.mode === 'light' }"
            @tap="themeStore.setTheme('light')"
          >
            <view class="theme-preview light-preview" />
            <text>浅色</text>
          </view>

          <view
            class="theme-option"
            :class="{ active: themeStore.settings.value.mode === 'dark' }"
            @tap="themeStore.setTheme('dark')"
          >
            <view class="theme-preview dark-preview" />
            <text>深色</text>
          </view>

          <view
            class="theme-option"
            :class="{ active: themeStore.settings.value.mode === 'system' }"
            @tap="themeStore.setTheme('system')"
          >
            <view class="theme-preview system-preview" />
            <text>跟随系统</text>
          </view>
        </view>

        <view class="theme-customizer">
          <view class="color-picker">
            <text class="picker-label">
              主题色
            </text>
            <view class="color-options">
              <view
                v-for="color in themeColors"
                :key="color"
                class="color-option"
                :style="{ backgroundColor: color }"
                :class="{ active: themeStore.settings.value.primaryColor === color }"
                @tap="themeStore.setPrimaryColor(color)"
              />

              <!-- 自定义颜色选择器 -->
              <view class="color-option custom-color">
                <input
                  :value="themeStore.settings.value.primaryColor"
                  @change="e => themeStore.setPrimaryColor(e.detail.value)"
                >
              </view>
            </view>
          </view>

          <view class="radius-picker">
            <text class="picker-label">
              边框圆角
            </text>
            <slider
              :value="radiusValue"
              :min="0"
              :max="20"
              show-value
              @change="onRadiusChange"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 页面内容 -->
    <view class="content" :class="{ 'animate-in': isAnimationLoaded }">
      <view class="header">
        <text class="title">
          组件总览
        </text>
        <text class="subtitle">
          基于 Coral Design 设计系统打造的精美组件库
        </text>
      </view>

      <!-- 组件列表 -->
      <view class="component-list">
        <view
          v-for="(category, categoryIndex) in componentList"
          :key="categoryIndex"
          class="category"
          :style="{ animationDelay: `${categoryIndex * 0.05}s` }"
        >
          <view class="category-header">
            <text class="category-name">
              {{ category.name }}
            </text>
            <view class="category-line" />
          </view>

          <view class="components">
            <view
              v-for="(component, componentIndex) in category.items"
              :key="componentIndex"
              class="component-card"
              :class="{
                'component-card--completed': component.status === 'completed',
                'component-card--planning': component.status === 'planning',
              }"
              :style="{ animationDelay: `${(categoryIndex * 0.05) + ((componentIndex + 1) * 0.03)}s` }"
              @click="goToComponent(component.path, component.status)"
            >
              <view class="component-main">
                <!-- 组件图标 -->
                <view class="component-icon" :class="component.status">
                  <image
                    class="icon-image"
                    :src="getIconPath(component.icon)"
                    mode="aspectFit"
                  />
                </view>

                <view class="component-content">
                  <view class="component-info">
                    <text class="component-title">
                      {{ component.title }}
                    </text>
                    <text class="component-desc">
                      {{ component.desc }}
                    </text>
                  </view>
                  <view class="component-status" :class="component.status">
                    {{ component.status === 'planning' ? '规划中' : '已完成' }}
                  </view>
                </view>
              </view>

              <!-- 组件预览区域 (仅展示已完成的组件) -->
              <view v-if="component.status === 'completed'" class="component-preview">
                <!-- 按钮组件预览 -->
                <template v-if="component.path === 'button'">
                  <view class="preview-buttons">
                    <view class="preview-button preview-button--primary">
                      主要按钮
                    </view>
                    <view class="preview-button preview-button--default">
                      默认按钮
                    </view>
                  </view>
                </template>

                <!-- 卡片组件预览 -->
                <template v-else-if="component.path === 'card'">
                  <view class="preview-card">
                    <view class="preview-card-header">
                      卡片标题
                    </view>
                    <view class="preview-card-content">
                      卡片内容区域
                    </view>
                    <view class="preview-card-footer">
                      <view class="preview-card-btn">
                        操作按钮
                      </view>
                    </view>
                  </view>
                </template>

                <!-- 表单组件预览 -->
                <template v-else-if="component.path === 'form'">
                  <view class="preview-form">
                    <view class="preview-form-group">
                      <view class="preview-radio" />
                      <view class="preview-checkbox" />
                    </view>
                    <view class="preview-switch-wrapper">
                      <view class="preview-switch" />
                    </view>
                  </view>
                </template>

                <!-- 颜色组件预览 -->
                <template v-else-if="component.path === 'colors'">
                  <view class="preview-colors">
                    <view class="preview-color" style="background-color: var(--primary)" />
                    <view class="preview-color" style="background-color: var(--secondary)" />
                    <view class="preview-color" style="background-color: var(--success)" />
                    <view class="preview-color" style="background-color: var(--warning)" />
                    <view class="preview-color" style="background-color: var(--error)" />
                  </view>
                </template>

                <!-- 图标组件预览 -->
                <template v-else-if="component.path === 'icons'">
                  <view class="preview-icons">
                    <view class="preview-icon" />
                    <view class="preview-icon" />
                    <view class="preview-icon" />
                    <view class="preview-icon" />
                  </view>
                </template>

                <!-- 导航栏组件预览 -->
                <template v-else-if="component.path === 'navbar'">
                  <view class="preview-navbar">
                    <view class="preview-navbar-left" />
                    <view class="preview-navbar-title" />
                    <view class="preview-navbar-right" />
                  </view>
                </template>

                <!-- 排版组件预览 -->
                <template v-else-if="component.path === 'typography'">
                  <view class="preview-typography">
                    <view class="preview-text-lg" />
                    <view class="preview-text-md" />
                    <view class="preview-text-sm" />
                  </view>
                </template>

                <!-- 主题组件预览 -->
                <template v-else-if="component.path === 'theme'">
                  <view class="preview-theme">
                    <view class="preview-theme-light" />
                    <view class="preview-theme-dark" />
                  </view>
                </template>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 页脚 -->
    <view class="footer">
      <view class="footer-content">
        <view class="footer-logo">
          Coral Design
        </view>
        <view class="footer-links">
          <text class="footer-link">
            关于我们
          </text>
          <text class="footer-link">
            开发文档
          </text>
          <text class="footer-link">
            联系方式
          </text>
        </view>
        <view class="footer-copyright">
          © {{ new Date().getFullYear() }} Coral Design. All rights reserved.
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.components-page {
  min-height: 100vh;
  background-color: var(--bg-page);
  display: flex;
  flex-direction: column;
}

/* 页头样式 */
.page-header {
  padding: 24px 16px;
  position: relative;
  background-image: linear-gradient(to right, rgba(255, 126, 106, 0.05), rgba(255, 126, 106, 0.1));
  border-bottom: 1px solid var(--divider);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.logo {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.logo-sub {
  font-size: 14px;
  color: var(--primary);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
}

.toggle-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 126, 106, 0.3);
}

.moon-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: -3px 3px 0 var(--primary);
  transform: rotate(-45deg);
}

/* 主题设置样式 */
.theme-section {
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.theme-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: 15px;
}

.theme-options {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  background-color: var(--bg-card);
  width: 80px;
}

.theme-option.active {
  border-color: var(--primary);
}

.theme-preview {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  margin-bottom: 10px;
}

.light-preview {
  background-color: #fcfcfc;
  border: 1px solid var(--gray-200);
  position: relative;
}

.light-preview::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 10px;
  background-color: #FF7E6A;
  border-radius: 5px;
}

.dark-preview {
  background-color: #181818;
  position: relative;
}

.dark-preview::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 10px;
  background-color: #FF7E6A;
  border-radius: 5px;
}

.system-preview {
  background: linear-gradient(to right, #fcfcfc 0%, #fcfcfc 50%, #181818 50%, #181818 100%);
  position: relative;
}

.system-preview::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 10px;
  background-color: #FF7E6A;
  border-radius: 5px;
}

.theme-customizer {
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 15px;
  box-shadow: var(--shadow-md);
}

.color-picker, .radius-picker {
  margin-bottom: 15px;
}

.picker-label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 500;
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-option.active {
  border-color: var(--text-primary);
}

.custom-color {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
                    linear-gradient(-45deg, #ccc 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #ccc 75%),
                    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}

.custom-color input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.radius-picker slider {
  margin-top: 10px;
}

/* 内容区样式 */
.content {
  flex: 1;
  padding: 24px 16px 48px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.header {
  margin-bottom: 32px;
  animation: fadeIn 0.6s ease forwards;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  display: block;
  margin-bottom: 12px;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  -webkit-background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  display: block;
}

/* 组件列表样式 */
.component-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.category {
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.category-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  padding-right: 12px;
  white-space: nowrap;
}

.category-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 126, 106, 0.3), rgba(255, 126, 106, 0.05));
}

.components {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.component-card {
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-base);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
  transition: all 0.3s ease;
}

.component-card--completed {
  border-left: 3px solid var(--primary);
}

.component-card--planning {
  border-left: 3px solid var(--gray-500);
  opacity: 0.8;
}

.component-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.component-card:active {
  background-color: var(--bg-hover);
  transform: scale(0.98);
}

.component-main {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.component-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 126, 106, 0.1);
  flex-shrink: 0;
}

.component-icon.planning {
  background-color: rgba(255, 169, 145, 0.1);
}

.component-icon.completed {
  background-color: rgba(255, 126, 106, 0.15);
}

.icon-image {
  width: 28px;
  height: 28px;
  opacity: 0.8;
}

.component-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component-info {
  flex: 1;
}

.component-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  display: block;
}

.component-desc {
  font-size: 14px;
  color: var(--text-secondary);
  display: block;
}

.component-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  color: #fff;
  white-space: nowrap;
}

.component-status.planning {
  background-color: var(--gray-500);
}

.component-status.completed {
  background-color: var(--primary);
}

/* 组件预览样式 */
.component-preview {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-base);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 预览 - 按钮 */
.preview-buttons {
  display: flex;
  gap: 8px;
}

.preview-button {
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font-size: 12px;
}

.preview-button--primary {
  background-color: var(--primary);
  color: white;
}

.preview-button--default {
  background-color: var(--bg-card);
  border: 1px solid var(--border-base);
  color: var(--text-primary);
}

/* 预览 - 卡片 */
.preview-card {
  width: 100%;
  border: 1px solid var(--border-base);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.preview-card-header {
  padding: 8px;
  font-size: 12px;
  background-color: var(--bg-hover);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-base);
  font-weight: 500;
}

.preview-card-content {
  padding: 8px;
  font-size: 11px;
  color: var(--text-secondary);
}

.preview-card-footer {
  padding: 8px;
  border-top: 1px solid var(--border-base);
  display: flex;
  justify-content: flex-end;
}

.preview-card-btn {
  font-size: 11px;
  padding: 4px 8px;
  background-color: var(--primary);
  color: white;
  border-radius: var(--radius-sm);
}

/* 预览 - 表单 */
.preview-form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-form-group {
  display: flex;
  gap: 16px;
}

.preview-radio {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--primary);
  position: relative;
}

.preview-radio::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.preview-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: var(--primary);
  position: relative;
}

.preview-checkbox::after {
  content: '';
  width: 8px;
  height: 4px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
}

.preview-switch-wrapper {
  display: flex;
  align-items: center;
}

.preview-switch {
  width: 36px;
  height: 18px;
  border-radius: 10px;
  background-color: var(--primary);
  position: relative;
}

.preview-switch::after {
  content: '';
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  right: 2px;
}

/* 预览 - 颜色 */
.preview-colors {
  display: flex;
  gap: 8px;
}

.preview-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

/* 预览 - 图标 */
.preview-icons {
  display: flex;
  gap: 12px;
}

.preview-icon {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: var(--text-secondary);
}

/* 预览 - 导航栏 */
.preview-navbar {
  width: 100%;
  height: 20px;
  background-color: var(--bg-card);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  justify-content: space-between;
  border: 1px solid var(--border-base);
}

.preview-navbar-left {
  width: 12px;
  height: 8px;
  background-color: var(--text-secondary);
}

.preview-navbar-title {
  width: 60px;
  height: 6px;
  background-color: var(--text-secondary);
}

.preview-navbar-right {
  width: 12px;
  height: 8px;
  background-color: var(--text-secondary);
}

/* 预览 - 排版 */
.preview-typography {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preview-text-lg {
  height: 10px;
  background-color: var(--text-primary);
  width: 80%;
  border-radius: 2px;
}

.preview-text-md {
  height: 8px;
  background-color: var(--text-secondary);
  width: 60%;
  border-radius: 2px;
}

.preview-text-sm {
  height: 6px;
  background-color: var(--text-hint);
  width: 40%;
  border-radius: 2px;
}

/* 预览 - 主题 */
.preview-theme {
  display: flex;
  gap: 8px;
}

.preview-theme-light {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--white);
  border: 1px solid var(--border-base);
}

.preview-theme-dark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #333;
}

/* 页脚 */
.footer {
  background-color: var(--bg-card);
  padding: 24px 16px;
  border-top: 1px solid var(--divider);
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-logo {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-link {
  font-size: 14px;
  color: var(--text-secondary);
}

.footer-copyright {
  font-size: 12px;
  color: var(--text-hint);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (min-width: 768px) {
  .page-header,
  .content,
  .footer-content {
    padding: 40px 32px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer {
    padding: 0;
  }
}

@media (min-width: 992px) {
  .components {
    grid-template-columns: repeat(3, 1fr);
  }

  .component-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .theme-section {
    margin-bottom: 40px;
  }

  .theme-customizer {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .color-picker {
    flex: 1;
    margin-bottom: 0;
  }

  .radius-picker {
    flex: 1;
    margin-bottom: 0;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .title {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
    margin-top: 12px;
  }
}

@media (min-width: 1200px) {
  .page-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar {
    width: 100%;
    max-width: 1200px;
  }

  .theme-options {
    gap: 24px;
  }

  .theme-option {
    width: 100px;
    padding: 15px;
  }

  .theme-preview {
    width: 70px;
    height: 70px;
  }

  .component-list {
    gap: 48px;
  }

  .category-name {
    font-size: 22px;
  }

  .component-preview {
    min-height: 80px;
  }
}

@media (max-width: 600px) {
  .components {
    grid-template-columns: 1fr;
  }

  .component-card {
    padding: 12px;
  }

  .component-icon {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }

  .icon-image {
    width: 24px;
    height: 24px;
  }

  .theme-options {
    justify-content: space-between;
  }

  .theme-option {
    width: 30%;
    padding: 5px;
  }

  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Coral Design"
  }
}
</route>
