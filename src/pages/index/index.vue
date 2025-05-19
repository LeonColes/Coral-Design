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
  return `/static/component-icons/${icon}.png`
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
      { title: '文本 Text', desc: '文本显示组件', icon: 'text', status: 'planning' },
    ] as ComponentItem[],
  },
  {
    name: '表单组件',
    items: [
      { title: '输入框 Input', desc: '接收用户输入', icon: 'input', status: 'planning' },
      { title: '选择器 Select', desc: '下拉选择组件', icon: 'select', status: 'planning' },
      { title: '单选框 Radio', desc: '单选组件', icon: 'radio', status: 'planning' },
      { title: '复选框 Checkbox', desc: '多选组件', icon: 'checkbox', status: 'planning' },
      { title: '开关 Switch', desc: '状态切换', icon: 'switch', status: 'planning' },
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
              :class="{ 'component-card--completed': component.status === 'completed' }"
              :style="{ animationDelay: `${(categoryIndex * 0.05) + ((componentIndex + 1) * 0.03)}s` }"
              @click="goToComponent(component.path, component.status)"
            >
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
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="css">
.components-page {
  min-height: 100vh;
  background-color: var(--bg-page);
  display: flex;
  flex-direction: column;
}

/* 页头样式 */
.page-header {
  padding: 24px 16px;
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
  align-items: center;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
}

.component-card--completed {
  border-left: 3px solid var(--primary);
}

.component-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.component-card:active {
  background-color: var(--bg-hover);
  transform: scale(0.98);
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
  .content {
    padding: 40px 32px;
    max-width: 1200px;
    margin: 0 auto;
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
}
</style>
