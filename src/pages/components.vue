<script setup lang="ts">
// 返回首页函数
function goBack() {
  uni.navigateBack()
}

// 目前的组件列表
const componentList = [
  {
    name: '基础组件',
    items: [
      { title: '按钮 Button', desc: '多样式按钮组件', icon: 'button', status: 'planning' },
      { title: '图标 Icon', desc: '图标集合', icon: 'icon', status: 'planning' },
      { title: '文本 Text', desc: '文本显示组件', icon: 'text', status: 'planning' },
    ],
  },
  {
    name: '表单组件',
    items: [
      { title: '输入框 Input', desc: '接收用户输入', icon: 'input', status: 'planning' },
      { title: '选择器 Select', desc: '下拉选择组件', icon: 'select', status: 'planning' },
      { title: '单选框 Radio', desc: '单选组件', icon: 'radio', status: 'planning' },
    ],
  },
  {
    name: '反馈组件',
    items: [
      { title: '对话框 Dialog', desc: '模态对话框', icon: 'dialog', status: 'planning' },
      { title: '提示 Toast', desc: '轻量级反馈', icon: 'toast', status: 'planning' },
      { title: '加载 Loading', desc: '加载状态', icon: 'loading', status: 'planning' },
    ],
  },
]
</script>

<template>
  <view class="global-reset components-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-button" @click="goBack">
        <text class="back-icon">
          ←
        </text>
      </view>
      <text class="page-title">
        组件库
      </text>
    </view>

    <!-- 页面内容 -->
    <view class="content">
      <view class="header">
        <text class="title">
          组件总览
        </text>
        <text class="subtitle">
          快速构建应用的基础组件
        </text>
      </view>

      <!-- 组件列表 -->
      <view class="component-list">
        <view v-for="(category, categoryIndex) in componentList" :key="categoryIndex" class="category">
          <text class="category-name">
            {{ category.name }}
          </text>

          <view class="components">
            <view
              v-for="(component, componentIndex) in category.items"
              :key="componentIndex"
              class="component-card"
            >
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
.global-reset {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.components-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.nav-bar {
  height: 44px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  display: block;
}

/* 组件列表样式 */
.component-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category {
  margin-bottom: 8px;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.components {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.component-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.component-card:active {
  background-color: #f9f9f9;
  transform: scale(0.98);
}

.component-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component-info {
  flex: 1;
}

.component-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  display: block;
}

.component-desc {
  font-size: 13px;
  color: #666;
  display: block;
}

.component-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  color: #fff;
}

.component-status.planning {
  background-color: #FFAB91;
}

.component-status.completed {
  background-color: #81C784;
}

/* 响应式调整 */
@media (min-width: 768px) {
  .content {
    padding: 30px;
    max-width: 900px;
    margin: 0 auto;
  }

  .components {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "组件库",
    "navigationStyle": "custom"
  }
}
</route>
