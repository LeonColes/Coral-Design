<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
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
    default: 'var(--primary)',
  },
  /**
   * 文字颜色
   */
  titleColor: {
    type: String,
    default: 'var(--white)',
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
})

// 提取属性到本地变量，确保默认值生效
const computedTitle = computed(() => props.title || '')

// 状态变量
const contentHeight = ref(0)
const navBarHeight = ref(0)

// 获取导航栏高度（包括状态栏）
function getNavBarHeight() {
  // 获取窗口信息
  const { statusBarHeight, windowWidth } = uni.getWindowInfo()
  // #ifdef MP-WEIXIN
  // 微信小程序环境 - 使用胶囊按钮位置计算导航栏高度
  try {
    const { top, height } = uni.getMenuButtonBoundingClientRect()
    navBarHeight.value = (top - statusBarHeight) * 2 + height + statusBarHeight
  }
  catch {
    // 获取失败时使用动态计算的方式
    navBarHeight.value = statusBarHeight + Math.round(windowWidth * 0.11)
  }
  // #endif
  // #ifndef H5 || MP-WEIXIN
  // 其他环境 - 根据屏幕比例计算
  navBarHeight.value = statusBarHeight + Math.round(windowWidth * 0.11)
  // #endif
}

// 对外暴露方法
defineExpose({
  // 刷新系统信息 - 用于处理iPhone手机打电话和开热点导致导航栏样式错乱
  getNavBarHeight,
})

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
      backgroundColor: props.backgroundColor,
      position: props.fixed ? 'fixed' : 'static',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      borderBottom: props.border ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
    }"
  >
    <!-- 导航栏内容 -->
    <view class="navbar-content" :style="{ height: `${contentHeight}px` }">
      <!-- 左侧区域 -->
      <view class="navbar-left">
        <slot name="left" />
      </view>

      <!-- 中间区域（标题） -->
      <view
        class="navbar-title"
        :style="{
          color: props.titleColor,
          textAlign: props.titleCenter ? 'center' : 'left',
          justifyContent: props.titleCenter ? 'center' : 'flex-start',
        }"
      >
        <slot name="title">
          {{ computedTitle }}
        </slot>
      </view>

      <!-- 右侧区域 -->
      <view class="navbar-right">
        <slot name="right" />
      </view>
    </view>
  </view>

  <!-- 填充占位 -->
  <view v-if="showBlock" :style="{ height: `${navBarHeight}px` }" />
</template>

<style scoped>
.navbar {
  width: 100%;

}

.navbar-content {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.navbar-left {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  z-index: 1;
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
}

.navbar-right {
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 16px;
  z-index: 1;
}
</style>
