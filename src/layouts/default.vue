<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { ref } from 'vue'

const year = new Date().getFullYear()
const themeStore = useThemeStore()

// 切换主题
function toggleTheme() {
  if (themeStore.isDark.value) {
    themeStore.setTheme('light')
  }
  else {
    themeStore.setTheme('dark')
  }
}

// 导航菜单
const navItems = [
  { label: '首页', path: '/pages/index/index' },
  { label: '组件', path: '/pages/components/index' },
  { label: '文档', path: '/pages/docs/index' },
  { label: '资源', path: '/pages/resources/index' },
]

// 移动端菜单控制
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

// 导航
function jumoToPath(path: string) {
  uni.navigateTo({ url: path })
  isMenuOpen.value = false
}
</script>

<template>
  <view class="layout-container">
    <!-- 头部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="logo" @click="jumoToPath('/pages/index/index')">
          <image
            class="logo-image"
            src="@/static/logo.svg"
            mode="scaleToFill"
          />
          <text class="logo-text">
            Coral Design
          </text>
        </view>

        <!-- 桌面端导航 -->
        <view class="nav-desktop">
          <view
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-item"
            @click="jumoToPath(item.path)"
          >
            {{ item.label }}
          </view>
        </view>

        <!-- 主题切换按钮 -->
        <view class="nav-actions">
          <view class="theme-toggle" @tap="toggleTheme">
            <view class="toggle-icon">
              <view v-if="themeStore.isDark.value" class="moon-icon" />
              <view v-else class="sun-icon" />
            </view>
          </view>

          <!-- 移动端菜单按钮 -->
          <view class="menu-toggle" @click="toggleMenu">
            <view class="menu-icon" :class="{ active: isMenuOpen }">
              <view class="menu-line" />
              <view class="menu-line" />
              <view class="menu-line" />
            </view>
          </view>
        </view>
      </view>

      <!-- 移动端菜单 -->
      <view v-if="isMenuOpen" class="mobile-menu">
        <view
          v-for="(item, index) in navItems"
          :key="index"
          class="mobile-nav-item"
          @click="jumoToPath(item.path)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>

    <!-- 内容容器 -->
    <view class="content-container">
      <slot />
    </view>

    <!-- 页脚 -->
    <view class="footer">
      <view class="footer-content">
        <view class="footer-logo">
          <text class="logo-text">
            Coral Design
          </text>
        </view>
        <view class="footer-text">
          <view class="footer-copyright">
            © {{ year }} Coral Design System
          </view>
          <view class="footer-links">
            <text class="footer-link">
              文档
            </text>
            <text class="footer-link">
              组件
            </text>
            <text class="footer-link">
              指南
            </text>
            <text class="footer-link">
              关于我们
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-page);
}

/* 头部导航栏样式 */
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
  z-index: 100;
  border-bottom: 1px solid var(--border-base);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-image {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.nav-desktop {
  display: none;
}

.nav-item {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  margin: 0 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: var(--bg-hover);
  color: var(--primary);
}

.nav-actions {
  display: flex;
  align-items: center;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 8px;
  background-color: var(--bg-hover);
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

.menu-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-icon {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-line {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all 0.3s ease;
}

.menu-icon.active .menu-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-icon.active .menu-line:nth-child(2) {
  opacity: 0;
}

.menu-icon.active .menu-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu {
  background-color: var(--bg-card);
  padding: 16px;
  border-top: 1px solid var(--border-base);
}

.mobile-nav-item {
  padding: 12px 16px;
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
}

.mobile-nav-item:hover {
  background-color: var(--bg-hover);
  color: var(--primary);
}

.content-container {
  flex: 1;
  width: 100%;
}

/* 页脚样式 */
.footer {
  width: 100%;
  padding: var(--spacing-6) var(--spacing-4);
  background-color: var(--bg-card);
  border-top: 1px solid var(--divider);
  margin-top: var(--spacing-8);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  margin-bottom: var(--spacing-2);
}

.footer-text {
  text-align: center;
}

.footer-copyright {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
}

.footer-link {
  font-size: var(--font-size-sm);
  color: var(--primary);
  cursor: pointer;
}

.footer-link:hover {
  text-decoration: underline;
}

/* 响应式调整 */
@media (min-width: 768px) {
  .header-content {
    padding: 16px 32px;
  }

  .nav-desktop {
    display: flex;
    align-items: center;
  }

  .menu-toggle {
    display: none;
  }

  .mobile-menu {
    display: none;
  }

  .content-container {
    padding: 0;
    max-width: 100%;
    margin: 0 auto;
  }

  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer-text {
    text-align: right;
  }
}
</style>
