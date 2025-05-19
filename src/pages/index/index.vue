<script setup lang="ts">
import NavBar from '@/components/navbar/index.vue'
import { computed, onMounted, ref } from 'vue'

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

// 返回首页函数
function goBack() {
  uni.navigateBack()
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

// 目前的组件列表
const componentList = [
  {
    name: '设计系统',
    items: [
      { title: '颜色 Colors', desc: '系统配色方案', icon: 'colors', status: 'completed', path: 'colors' },
      { title: '排版 Typography', desc: '文本排版样式', icon: 'typography', status: 'completed', path: 'typography' },
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
    <!-- 使用Coral Design的NavBar组件 -->
    <NavBar
      title="组件库"
      :title-center="true"
      :show-back="true"
      @back-click="goBack"
    />

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
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
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
  color: #333;
  display: block;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #FF7E6A, #FF5C7F);
  -webkit-background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 16px;
  color: #666;
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
  color: #333;
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
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
}

.component-card--completed {
  border-left: 3px solid #FF7E6A;
}

.component-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.component-card:active {
  background-color: #f9f9f9;
  transform: scale(0.98);
}

.component-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
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
  color: #333;
  margin-bottom: 4px;
  display: block;
}

.component-desc {
  font-size: 14px;
  color: #666;
  display: block;
}

.component-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  color: #fff;
  white-space: nowrap;
}

.component-status.planning {
  background-color: #FFAB91;
}

.component-status.completed {
  background-color: #FF7E6A;
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
  .content {
    padding: 40px 32px 60px;
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
}
</style>
