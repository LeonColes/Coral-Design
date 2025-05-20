<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { computed, onMounted, ref } from 'vue'

// 初始化主题状态
const themeStore = useThemeStore()

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

// 复制代码到剪贴板
function copyCode() {
  const code = 'npm install coral-design'
  uni.setClipboardData({
    data: code,
    success() {
      uni.showToast({
        title: '安装命令已复制',
        icon: 'success',
      })
    },
  })
}

// 最近更新数据
const recentUpdates = [
  {
    date: '2025-05-20',
    title: '发布 Coral Design v1.0.0',
    desc: '首个稳定版本发布，包含15个常用组件',
  },
  {
    date: '2025-05-15',
    title: '发布暗色模式支持',
    desc: '所有组件均支持暗色模式，提供更好的夜间使用体验',
  },
  {
    date: '2025-05-10',
    title: '新增主题切换功能',
    desc: '支持自定义主题色、边框圆角、阴影等样式',
  },
]

// 特性数据
const features = [
  {
    title: '简洁优雅',
    icon: 'elegant',
    description: '采用极简设计语言，提供优雅、现代的视觉体验',
  },
  {
    title: '响应式设计',
    icon: 'responsive',
    description: '完美适配移动端和桌面端，在各种设备上都能保持良好的显示效果',
  },
  {
    title: '主题定制',
    icon: 'theme',
    description: '支持自定义主题色、边框圆角等样式，满足个性化需求',
  },
  {
    title: '易用性高',
    icon: 'usability',
    description: '组件API设计符合直觉，降低使用门槛，提高开发效率',
  },
]

// 设计原则
const designPrinciples = [
  {
    title: '一致性',
    description: '相似的场景使用相似的解决方案，保持交互和视觉的一致',
  },
  {
    title: '效率优先',
    description: '设计应当减少用户的思考负担，让任务完成更轻松高效',
  },
  {
    title: '可控性',
    description: '用户应当可以自主决定交互方式和结果，增强控制感',
  },
  {
    title: '包容性',
    description: '设计应当考虑不同背景、能力的用户，提供平等的使用体验',
  },
]

// 热门组件
const popularComponents = [
  {
    id: 'button',
    name: 'Button 按钮',
    description: '常用的操作按钮，支持多种状态、尺寸和自定义样式',
    path: 'button',
  },
  {
    id: 'card',
    name: 'Card 卡片',
    description: '内容容器组件，用于信息分组显示，支持多种样式变体',
    path: 'card',
  },
  {
    id: 'switch',
    name: 'Switch 开关',
    description: '表示两种状态间的切换控件，常用于设置面板',
    path: 'switch',
  },
]
</script>

<template>
  <view class="home-container">
    <!-- 英雄区 -->
    <view class="hero-section">
      <view class="hero-content">
        <text class="hero-title" :class="{ 'animation-loaded': isAnimationLoaded }">
          Coral Design
        </text>
        <text class="hero-subtitle" :class="{ 'animation-loaded': isAnimationLoaded }">
          优雅、现代的跨平台组件库
        </text>
        <view class="hero-actions" :class="{ 'animation-loaded': isAnimationLoaded }">
          <view class="hero-button primary" @click="goToComponent('button', 'completed')">
            了解组件
          </view>
          <view class="hero-button secondary" @click="copyCode">
            快速安装
          </view>
        </view>
      </view>
      <view class="hero-wave">
        <view class="wave wave1" />
        <view class="wave wave2" />
        <view class="wave wave3" />
      </view>
    </view>

    <!-- 快速开始 -->
    <view class="section quick-start">
      <view class="section-header">
        <text class="section-title">
          快速开始
        </text>
        <text class="section-subtitle">
          三步完成组件库安装和使用
        </text>
      </view>
      <view class="quick-start-steps">
        <view class="code-block">
          <view class="code-header">
            <text class="code-title">
              安装
            </text>
            <view class="copy-button" @click="copyCode">
              复制
            </view>
          </view>
          <view class="code-content">
            <text class="code-text">
              npm install coral-design
            </text>
          </view>
        </view>
        <view class="code-block">
          <view class="code-header">
            <text class="code-title">
              引入
            </text>
          </view>
          <view class="code-content">
            <text class="code-text">
              import CoralDesign from 'coral-design';\nimport 'coral-design/lib/style.css';
            </text>
          </view>
        </view>
        <view class="code-block">
          <view class="code-header">
            <text class="code-title">
              使用
            </text>
          </view>
          <view class="code-content">
            <text class="code-text">
              &lt;coral-button type="primary"&gt;按钮&lt;/coral-button&gt;
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 热门组件 -->
    <view class="section popular-components">
      <view class="section-header">
        <text class="section-title">
          热门组件
        </text>
        <text class="section-subtitle">
          精心设计的常用组件
        </text>
      </view>
      <view class="components-grid">
        <view
          v-for="(component, index) in popularComponents"
          :key="index"
          class="component-preview-card"
          @click="goToComponent(component.path, 'completed')"
        >
          <view class="component-preview">
            <!-- 这里可以放组件预览图 -->
            <view class="component-icon">
              <image :src="getIconPath(component.id)" mode="aspectFit" />
            </view>
          </view>
          <view class="component-info">
            <text class="component-name">
              {{ component.name }}
            </text>
            <text class="component-description">
              {{ component.description }}
            </text>
          </view>
        </view>
      </view>
      <view class="view-all-container">
        <view class="view-all-button" @click="goToComponent('button', 'completed')">
          查看全部组件
        </view>
      </view>
    </view>

    <!-- 核心特性 -->
    <view class="section features">
      <view class="section-header">
        <text class="section-title">
          核心特性
        </text>
        <text class="section-subtitle">
          为什么选择 Coral Design
        </text>
      </view>
      <view class="features-grid">
        <view v-for="(feature, index) in features" :key="index" class="feature-card">
          <view class="feature-icon">
            <image :src="getIconPath(feature.icon)" mode="aspectFit" />
          </view>
          <text class="feature-title">
            {{ feature.title }}
          </text>
          <text class="feature-description">
            {{ feature.description }}
          </text>
        </view>
      </view>
    </view>

    <!-- 最近更新 -->
    <view class="section recent-updates">
      <view class="section-header">
        <text class="section-title">
          最近更新
        </text>
        <text class="section-subtitle">
          我们一直在进步
        </text>
      </view>
      <view class="timeline">
        <view v-for="(update, index) in recentUpdates" :key="index" class="timeline-item">
          <view class="timeline-dot" />
          <view class="timeline-content">
            <text class="timeline-date">
              {{ update.date }}
            </text>
            <text class="timeline-title">
              {{ update.title }}
            </text>
            <text class="timeline-description">
              {{ update.desc }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 设计原则 -->
    <view class="section design-principles">
      <view class="section-header">
        <text class="section-title">
          设计原则
        </text>
        <text class="section-subtitle">
          指导我们设计的核心理念
        </text>
      </view>
      <view class="principles-grid">
        <view v-for="(principle, index) in designPrinciples" :key="index" class="principle-card">
          <text class="principle-title">
            {{ principle.title }}
          </text>
          <text class="principle-description">
            {{ principle.description }}
          </text>
        </view>
      </view>
    </view>

    <!-- 主题定制 -->
    <view class="section theme-customization">
      <view class="section-header">
        <text class="section-title">
          主题定制
        </text>
        <text class="section-subtitle">
          打造专属于你的设计系统
        </text>
      </view>
      <view class="theme-controls">
        <view class="theme-section">
          <text class="theme-section-title">
            主题模式
          </text>
          <view class="theme-toggle" @tap="toggleTheme">
            <view class="toggle-track" :class="{ 'is-dark': themeStore.isDark.value }">
              <view class="toggle-thumb" />
            </view>
            <text class="toggle-label">
              {{ themeStore.isDark.value ? '暗色模式' : '亮色模式' }}
            </text>
          </view>
        </view>

        <view class="theme-section">
          <text class="theme-section-title">
            主题色
          </text>
          <view class="color-options">
            <view
              v-for="(color, index) in themeColors"
              :key="index"
              class="color-option"
              :style="{ backgroundColor: color }"
              :class="{ active: themeStore.settings.value.primaryColor === color }"
              @tap="themeStore.setPrimaryColor(color)"
            />
          </view>
        </view>

        <view class="theme-section">
          <text class="theme-section-title">
            圆角
          </text>
          <view class="radius-slider">
            <slider
              :value="radiusValue"
              :min="0"
              :max="20"
              :step="1"
              show-value
              @change="onRadiusChange"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.home-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-page);
}

/* 英雄区 */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-light), var(--primary));
  overflow: hidden;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 20px;
  z-index: 10;
  max-width: 800px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.hero-subtitle {
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  max-width: 600px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
}

.animation-loaded {
  opacity: 1;
  transform: translateY(0);
}

.hero-button {
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-button.primary {
  background-color: white;
  color: var(--primary);
}

.hero-button.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat-x;
  background-position: 0 bottom;
  transform-origin: center bottom;
}

  .wave1 {
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" opacity=".25" fill="white"/></svg>');
  animation: wave 25s cubic-bezier(0, 0, 0.2, 1) infinite;
  animation-delay: -3s;
  opacity: 0.4;
  height: 60px;
}

.wave2 {
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" opacity=".25" fill="white"/></svg>');
  animation: wave 20s linear reverse infinite;
  opacity: 0.6;
  height: 60px;
}

.wave3 {
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" opacity=".25" fill="white"/></svg>');
  animation: wave 15s linear infinite;
  animation-delay: -1s;
  opacity: 0.8;
  height: 60px;
}

@keyframes wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.8);
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
}

/* 通用部分样式 */
.section {
  padding: 64px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 30%;
  right: 30%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--primary));
  border-radius: 2px;
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

/* 快速开始部分 */
.quick-start-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.code-block {
  background-color: var(--bg-card);
  border: 1px solid var(--border-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-hover);
  border-bottom: 1px solid var(--border-base);
}

.code-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.copy-button {
  font-size: 12px;
  color: var(--primary);
  padding: 4px 8px;
  background-color: var(--bg-card);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.code-content {
  padding: 16px;
  background-color: var(--bg-card);
  overflow-x: auto;
}

.code-text {
  font-family: monospace;
  font-size: 14px;
  color: var(--text-code);
  white-space: pre;
}

/* 热门组件部分 */
.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.component-preview-card {
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-base);
}

.component-preview-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.component-preview {
  height: 160px;
  background-color: var(--bg-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.component-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-icon image {
  width: 48px;
  height: 48px;
}

.component-info {
  padding: 16px;
}

.component-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.component-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.view-all-button {
  padding: 12px 24px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-base);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 500;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-button:hover {
  background-color: var(--primary-light);
  color: var(--primary);
}

/* 特性部分 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 24px;
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon image {
  width: 48px;
  height: 48px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.feature-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 最近更新 */
.timeline {
  padding: 0 20px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background-color: var(--primary-light);
}

.timeline-item {
  padding-left: 32px;
  position: relative;
  margin-bottom: 32px;
}

.timeline-dot {
  position: absolute;
  left: -8px;
  top: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--primary);
  border: 4px solid var(--bg-page);
}

.timeline-date {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  display: block;
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: block;
}

.timeline-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 设计原则 */
.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.principle-card {
  padding: 32px 24px;
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-base);
}

.principle-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  display: block;
  position: relative;
}

.principle-title::before {
  content: '';
  position: absolute;
  left: -24px;
  top: 8px;
  width: 12px;
  height: 12px;
  background-color: var(--primary);
  border-radius: 50%;
}

.principle-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 主题定制 */
.theme-controls {
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-base);
}

.theme-section {
  margin-bottom: 24px;
}

.theme-section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: block;
}

.theme-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle-track {
  width: 48px;
  height: 24px;
  background-color: var(--bg-hover);
  border-radius: 12px;
  position: relative;
  margin-right: 12px;
  transition: background-color 0.3s ease;
}

.toggle-track.is-dark {
  background-color: var(--primary);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-track.is-dark .toggle-thumb {
  transform: translateX(24px);
}

.toggle-label {
  font-size: 14px;
  color: var(--text-primary);
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.color-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid var(--text-primary);
  border-radius: 50%;
}

.radius-slider {
  padding: 0 8px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .section {
    padding: 48px 16px;
  }

  .section-title {
    font-size: 28px;
  }

  .components-grid,
  .features-grid,
  .principles-grid {
    grid-template-columns: 1fr;
  }

  .theme-controls {
    padding: 24px 16px;
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
