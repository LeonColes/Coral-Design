<script setup lang="ts">
import { ref } from 'vue'

// 导航函数
function jumpToPage(path: string) {
  uni.navigateTo({
    url: `/pages/${path}`,
  })
}

// 外部链接处理函数
function openExternalLink(url: string) {
  // 在小程序中打开网页或复制链接到剪贴板
  // #ifdef MP
  uni.setClipboardData({
    data: url,
    success: () => {
      uni.showToast({
        title: '链接已复制，请在浏览器中打开',
        icon: 'none',
      })
    },
  })
  // #endif

  // 在H5中直接打开新页面
  // #ifdef H5
  window.open(url)
  // #endif
}

// 打开文档
function openDocs() {
  // 在APP中直接打开文档页面
  uni.navigateTo({
    url: '/pages/index',
  })
}

// 定义组件项类型
interface ComponentItem {
  id: string
  title: string
  description: string
  icon: string
  disabled?: boolean
}

// 定义组件分类类型
interface ComponentCategory {
  id: string
  title: string
  description: string
  items: ComponentItem[]
}

// 组件分类
const componentCategories: ComponentCategory[] = [
  {
    id: 'design',
    title: '设计系统',
    description: 'Coral Design设计系统的基础元素',
    items: [
      {
        id: 'color',
        title: '色彩系统',
        description: '查看完整的色彩体系',
        icon: 'primary',
      },
      {
        id: 'typography',
        title: '排版系统',
        description: '基于SF Pro的排版规范',
        icon: 'coral-600',
      },
    ],
  },
  {
    id: 'basic',
    title: '基础组件',
    description: '即将推出的基础UI组件',
    items: [
      {
        id: 'component/button',
        title: 'Button 按钮',
        description: '用于触发操作的按钮',
        icon: 'coral-600',
        disabled: false,
      },
      {
        id: 'icon',
        title: 'Icon 图标',
        description: '语义化的矢量图形',
        icon: 'teal-500',
        disabled: true,
      },
      {
        id: 'divider',
        title: 'Divider 分割线',
        description: '区隔内容的分割线',
        icon: 'gray-400',
        disabled: true,
      },
    ],
  },
  {
    id: 'form',
    title: '表单组件',
    description: '即将推出的表单相关组件',
    items: [
      {
        id: 'input',
        title: 'Input 输入框',
        description: '基础的文本输入框',
        icon: 'coral-600',
        disabled: true,
      },
      {
        id: 'select',
        title: 'Select 选择器',
        description: '下拉选择控件',
        icon: 'teal-500',
        disabled: true,
      },
      {
        id: 'checkbox',
        title: 'Checkbox 复选框',
        description: '多选控件',
        icon: 'teal-500',
        disabled: true,
      },
    ],
  },
]

// 移动端菜单控制
const showMobileMenu = ref(false)
function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<template>
  <view class="home-page">
    <!-- 头部导航 -->
    <view class="header">
      <view class="header-content">
        <view class="logo-container">
          <image class="logo" src="/static/logo.svg" mode="aspectFit" />
          <text class="title">
            Coral Design
          </text>
        </view>

        <!-- 桌面端导航 -->
        <view class="desktop-nav">
          <text class="nav-link" @click="openExternalLink('https://github.com/your-username/coral-design')">
            GitHub
          </text>
          <text class="nav-link" @click="openDocs">
            文档
          </text>
        </view>

        <!-- 移动端菜单按钮 -->
        <view class="mobile-menu-button" @click="toggleMobileMenu">
          <view class="menu-icon" />
        </view>
      </view>

      <!-- 移动端菜单 -->
      <view class="mobile-menu" :class="{ 'mobile-menu--open': showMobileMenu }">
        <text class="mobile-nav-link" @click="openExternalLink('https://github.com/your-username/coral-design')">
          GitHub
        </text>
        <text class="mobile-nav-link" @click="openDocs">
          文档
        </text>
      </view>
    </view>

    <!-- 首页横幅 -->
    <view class="banner">
      <text class="banner-title">
        现代、优雅的设计系统
      </text>
      <text class="banner-desc">
        基于珊瑚主题的UI组件库，帮助开发者快速构建美观、一致的用户界面
      </text>
      <view class="banner-buttons">
        <button class="primary-button" @click="jumpToPage('color')">
          了解色彩系统
        </button>
        <text class="secondary-button" @click="openDocs">
          查看文档
        </text>
      </view>
    </view>

    <!-- 组件分类展示 -->
    <view class="main-content">
      <view v-for="category in componentCategories" :key="category.id" class="component-category">
        <text class="category-title">
          {{ category.title }}
        </text>
        <text class="category-desc">
          {{ category.description }}
        </text>

        <view class="component-grid">
          <view
            v-for="item in category.items"
            :key="item.id"
            class="component-card"
            :class="{ 'component-card--disabled': item.disabled }"
            @click="!item.disabled && jumpToPage(item.id)"
          >
            <view class="card-icon" :style="{ 'background-color': `var(--${item.icon})` }" />
            <text class="card-title">
              {{ item.title }}
            </text>
            <text class="card-desc">
              {{ item.description }}
            </text>
            <text v-if="item.disabled" class="coming-soon-badge">
              即将推出
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 快速开始指南 -->
    <view class="quick-start">
      <text class="section-title">
        快速开始
      </text>
      <text class="section-desc">
        了解如何在您的项目中使用Coral Design
      </text>

      <view class="code-example">
        <view class="code-block">
          # 使用npm安装
          npm install coral-design-ui

          # 使用yarn安装
          yarn add coral-design-ui

          # 使用pnpm安装
          pnpm add coral-design-ui

          # 在项目中引入
          import { createApp } from 'vue'
          import CoralDesign from 'coral-design-ui'
          import 'coral-design-ui/dist/style.css'

          const app = createApp(App)
          app.use(CoralDesign)
          app.mount('#app')
        </view>
      </view>

      <text class="text-button" @click="openDocs">
        查看更多使用指南 →
      </text>
    </view>

    <view class="footer">
      <text class="copyright">
        © {{ new Date().getFullYear() }} Coral Design. All rights reserved.
      </text>
    </view>
  </view>
</template>

<style lang="scss">
@use '../design/index.scss' as *;

// 变量
$mobile-breakpoint: 768px;

// 混合
@mixin mobile {
  @media (max-width: #{$mobile-breakpoint}) {
    @content;
  }
}

// 重置样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// 主页样式
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-page);
}

// 头部导航
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--white);
  box-shadow: var(--shadow-sm);

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-4);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  .logo {
    width: 36px;
    height: 36px;

    @include mobile {
      width: 28px;
      height: 28px;
    }
  }

  .title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);

    @include mobile {
      font-size: var(--font-size-lg);
    }
  }

  .desktop-nav {
    display: flex;
    gap: var(--spacing-6);

    @include mobile {
      display: none;
    }
  }

  .nav-link {
    color: var(--text-primary);
    text-decoration: none;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;

    &:hover {
      color: var(--primary);
    }
  }

  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;

    @include mobile {
      display: block;
    }

    .menu-icon {
      display: block;
      width: 24px;
      height: 2px;
      background-color: var(--text-primary);
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--text-primary);
        left: 0;
      }

      &::before {
        top: -6px;
      }

      &::after {
        bottom: -6px;
      }
    }
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    padding: var(--spacing-4);
    background-color: var(--white);
    border-top: 1px solid var(--divider);

    @include mobile {
      display: none;

      &--open {
        display: flex;
      }
    }
  }

  .mobile-nav-link {
    color: var(--text-primary);
    text-decoration: none;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-3) 0;
    cursor: pointer;

    &:hover {
      color: var(--primary);
    }
  }
}

// 首页横幅
.banner {
  background-color: var(--coral-50);
  padding: var(--spacing-12) var(--spacing-4);
  text-align: center;

  @include mobile {
    padding: var(--spacing-8) var(--spacing-4);
  }

  .banner-title {
    display: block;
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin-bottom: var(--spacing-4);

    @include mobile {
      font-size: var(--font-size-h2);
    }
  }

  .banner-desc {
    display: block;
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto var(--spacing-6);

    @include mobile {
      font-size: var(--font-size-md);
    }
  }

  .banner-buttons {
    display: flex;
    gap: var(--spacing-4);
    justify-content: center;

    @include mobile {
      flex-direction: column;
      gap: var(--spacing-3);
      align-items: center;
    }
  }

  .primary-button {
    background-color: var(--primary);
    color: var(--white);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: var(--primary-dark);
    }
  }

  .secondary-button {
    display: inline-block;
    background-color: var(--white);
    color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: var(--radius-md);
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: var(--coral-50);
    }
  }
}

// 主内容区域
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

// 组件分类
.component-category {
  margin-bottom: var(--spacing-12);

  .category-title {
    display: block;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin-bottom: var(--spacing-2);
  }

  .category-desc {
    display: block;
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-6);
  }
}

// 组件卡片网格
.component-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-4);

  @include mobile {
    grid-template-columns: repeat(1, 1fr);
  }
}

// 组件卡片
.component-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-5);
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  cursor: pointer;

  &:hover:not(.component-card--disabled) {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  &--disabled {
    opacity: 0.7;
    cursor: default;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-3);
  }

  .card-title {
    display: block;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
    margin-bottom: var(--spacing-2);
  }

  .card-desc {
    display: block;
    font-size: var(--font-size-md);
    color: var(--text-secondary);
  }

  .coming-soon-badge {
    position: absolute;
    top: var(--spacing-4);
    right: var(--spacing-4);
    background-color: var(--gray-200);
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-full);
  }
}

// 快速开始指南
.quick-start {
  background-color: var(--gray-50);
  padding: var(--spacing-12) var(--spacing-4);
  text-align: center;

  .section-title {
    display: block;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin-bottom: var(--spacing-2);
  }

  .section-desc {
    display: block;
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-6);
  }

  .code-example {
    max-width: 600px;
    margin: 0 auto var(--spacing-6);
    text-align: left;

    .code-block {
      background-color: var(--gray-900);
      color: var(--white);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      font-family: var(--font-family-mono);
      font-size: var(--font-size-sm);
      white-space: pre;
      overflow-x: auto;
    }
  }

  .text-button {
    color: var(--primary);
    text-decoration: none;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

// 页脚
.footer {
  background-color: var(--white);
  padding: var(--spacing-8) var(--spacing-4);
  text-align: center;
  border-top: 1px solid var(--divider);

  .copyright {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
}
</style>

<route type="home" lang="json">
{}
</route>
