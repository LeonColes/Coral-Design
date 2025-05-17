<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 定义组件属性
defineProps({
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 标题是否居中
   */
  titleCenter: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示底部边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * 背景颜色
   */
  backgroundColor: {
    type: String,
    default: '#FF7E6A',
  },
  /**
   * 文字颜色
   */
  titleColor: {
    type: String,
    default: 'white',
  },
  /**
   * 是否固定在顶部
   */
  fixed: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否需要填充
   */
  showBlock: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示返回按钮
   */
  showBack: {
    type: Boolean,
    default: true,
  },
})

// 事件
const emits = defineEmits(['back-click'])

// 状态变量
const statusBarHeight = ref(0)
const contentHeight = ref(0)
const navBarHeight = ref(0)

/**
 * 获取导航栏高度（包括状态栏）
 * 根据不同平台动态计算导航栏高度
 */
function getNavBarHeight() {
  // 获取窗口信息
  const { statusBarHeight: sysStatusBarHeight, windowWidth } = uni.getWindowInfo()
  // 设置状态栏高度
  statusBarHeight.value = sysStatusBarHeight

  // #ifdef MP-WEIXIN
  // 微信小程序环境 - 使用胶囊按钮位置计算导航栏高度
  try {
    const { top, height } = uni.getMenuButtonBoundingClientRect()
    contentHeight.value = height
    // 计算导航栏高度：状态栏 + 内容区
    navBarHeight.value = (top - sysStatusBarHeight) * 2 + height + sysStatusBarHeight
  }
  catch {
    // 获取失败时使用动态计算的方式
    contentHeight.value = Math.round(windowWidth * 0.09)
    navBarHeight.value = sysStatusBarHeight + Math.round(windowWidth * 0.11)
  }
  // #endif

  // #ifdef H5
  // H5环境使用固定高度计算
  contentHeight.value = 44
  navBarHeight.value = sysStatusBarHeight + contentHeight.value
  // #endif

  // #ifndef MP-WEIXIN || H5
  // 其他环境 - 根据屏幕比例计算
  contentHeight.value = Math.round(windowWidth * 0.09)
  navBarHeight.value = sysStatusBarHeight + Math.round(windowWidth * 0.09)
  // #endif
}

/**
 * 返回按钮点击事件
 */
function handleBackClick() {
  emits('back-click')
}

// 对外暴露方法
defineExpose({
  /**
   * 刷新系统信息 - 适用于需要重新计算导航栏高度的场景
   */
  getNavBarHeight,
})

// 组件挂载时初始化导航栏高度
onMounted(() => {
  getNavBarHeight()
})
</script>

<template>
  <!-- 导航栏 -->
  <view
    class="navbar"
    :style="{
      height: `${navBarHeight}px`,
      backgroundColor,
      position: fixed ? 'fixed' : 'static',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      borderBottom: border ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
    }"
  >
    <!-- 状态栏 -->
    <view v-if="statusBarHeight > 0" class="status-bar" :style="{ height: `${statusBarHeight}px`, backgroundColor }" />

    <!-- 导航栏内容 -->
    <view class="navbar-content" :style="{ height: `${contentHeight}px` }">
      <!-- 左侧区域 -->
      <view class="navbar-left">
        <slot name="left">
          <view v-if="showBack" class="back-button" @click="handleBackClick">
            <view class="back-icon" :style="{ borderColor: titleColor }" />
            <text class="back-text" :style="{ color: titleColor }">
              返回
            </text>
          </view>
        </slot>
      </view>

      <!-- 中间区域（标题） -->
      <view
        class="navbar-title"
        :class="{ 'navbar-title--center': titleCenter }"
        :style="{ color: titleColor }"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </view>

      <!-- 右侧区域 -->
      <view class="navbar-right">
        <slot name="right" />
      </view>
    </view>
  </view>

  <!-- 填充占位，用于fixed定位时补充空间 -->
  <view v-if="showBlock" :style="{ height: `${navBarHeight}px` }" />
</template>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.status-bar {
  width: 100%;
}

.navbar-content {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}

.navbar-left {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  z-index: 1;
}

.back-button {
  display: flex;
  align-items: center;
  height: 100%;
}

.back-icon {
  width: 12px;
  height: 12px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  margin-right: 4px;
}

.back-text {
  font-size: 14px;
}

.navbar-title {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 16px;
  position: absolute;
  left: 0;
  right: 0;
  justify-content: flex-start;
}

.navbar-title--center {
  justify-content: center;
  text-align: center;
}

.navbar-right {
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 16px;
  z-index: 1;
}
</style>
