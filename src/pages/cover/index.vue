<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 导航函数
function jumpToComponents() {
  uni.navigateTo({
    url: '/pages/index/index',
  })
}

// 动画状态
const isAnimationLoaded = ref(false)

// 组件挂载后启动动画
onMounted(() => {
  setTimeout(() => {
    isAnimationLoaded.value = true
  }, 100)
})
</script>

<template>
  <view class="global-reset home-page">
    <!-- 主视觉区域 -->
    <view class="hero-section">
      <!-- 动态背景 -->
      <view class="bg-gradient" />
      <view class="bg-pattern" />

      <!-- 内容区 -->
      <view class="content-container" :class="{ 'animate-in': isAnimationLoaded }">
        <view class="logo-container">
          <image class="logo" src="/static/logo.svg" mode="aspectFit" />
        </view>

        <view class="text-content">
          <text class="brand-name">
            Coral Design
          </text>
          <text class="tagline">
            现代 • 优雅 • 简约
          </text>
          <text class="description">
            基于珊瑚色彩体系的现代化设计系统
          </text>
        </view>

        <view class="action-area">
          <button class="action-btn" @click="jumpToComponents">
            <text>快速上手</text>
          </button>
        </view>
      </view>
    </view>

    <!-- 设计故事 -->
    <view class="design-story" :class="{ 'animate-in': isAnimationLoaded }">
      <view class="story-container">
        <text class="story-title">
          设计之源
        </text>

        <view class="story-grid">
          <view class="story-card">
            <view class="card-header">
              <text class="card-number">
                01
              </text>
              <text class="card-title">
                黄金比例的和谐
              </text>
            </view>
            <view class="card-divider" />
            <text class="card-content">
              Coral Design
              采用自然界中最和谐的比例关系——黄金分割(1:1.618)作为设计基础。从按钮内边距到页面留白、从元素间距到排版构建，我们确保视觉上的和谐与平衡。这种数学上的精确与美学上的优雅融为一体，创造出直观且悦目的界面。
            </text>
          </view>

          <view class="story-card">
            <view class="card-header">
              <text class="card-number">
                02
              </text>
              <text class="card-title">
                模块化设计哲学
              </text>
            </view>
            <view class="card-divider" />
            <text class="card-content">
              我们崇尚组件的独立性与协同性。每个组件都经过精心设计，既能作为独立元素存在，又能无缝融入整体设计语言。通过变量系统的严格管控，我们确保设计元素在不同场景下保持一致的视觉语言，为用户创造流畅、直观的体验。
            </text>
          </view>

          <view class="story-card">
            <view class="card-header">
              <text class="card-number">
                03
              </text>
              <text class="card-title">
                简约而不简单
              </text>
            </view>
            <view class="card-divider" />
            <text class="card-content">
              我们追求设计的本质——移除多余，保留必要。珊瑚的自然生长过程启发我们在视觉层次、交互反馈、空间利用上达成平衡。每一个细节都服务于功能性与美学的统一，不做无意义的装饰，但也不牺牲情感体验与个性表达。
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="css" scoped>
.global-reset {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
}

/* 主视觉区域 */
.hero-section {
  position: relative;
  height: 90vh;
  min-height: 550px;
  max-height: 800px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景元素 */
.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
      #FF7B5C 0%,
      #FF5C7F 50%,
      #B93D6B 100%);
  z-index: 1;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 2;
}

/* 内容区 */
.content-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  width: 100%;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease, transform 1s ease;
}

.content-container.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

.text-content {
  margin-bottom: 50px;
}

.brand-name {
  display: block;
  font-size: 68px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.tagline {
  display: block;
  font-size: 26px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 20px;
  letter-spacing: 5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.description {
  display: block;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.action-area {
  margin-top: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: 56px;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  background-color: white;
  color: #E83E65;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.action-btn:hover,
.action-btn:active {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

/* 设计故事部分 */
.design-story {
  background-color: white;
  color: var(--gray-900);
  padding: 80px 24px;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
  position: relative;
}

.design-story.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.story-container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.story-title {
  display: block;
  font-size: 42px;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 16px;
  position: relative;
}

.story-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background-color: var(--coral-500);
  margin: 16px auto 40px;
  border-radius: 2px;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
}

.story-card {
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.card-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--coral-500);
  margin-right: 16px;
  display: block;
  min-width: 40px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-900);
}

.card-divider {
  height: 1px;
  background-color: var(--gray-200);
  margin-bottom: 20px;
}

.card-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--gray-700);
}

/* 响应式设计 */
@media (min-width: 768px) {
  .story-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .design-story {
    padding: 100px 40px;
  }
}

@media (min-width: 1024px) {
  .story-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
  }

  .brand-name {
    font-size: 50px;
  }

  .tagline {
    font-size: 22px;
    letter-spacing: 3px;
  }

  .description {
    font-size: 18px;
  }

  .action-btn {
    padding: 0 30px;
    height: 50px;
    font-size: 17px;
  }

  .design-story {
    padding: 60px 20px;
  }

  .story-title {
    font-size: 36px;
  }

  .story-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .brand-name {
    font-size: 40px;
  }

  .tagline {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .description {
    font-size: 16px;
  }

  .story-title {
    font-size: 30px;
  }

  .story-card {
    padding: 16px;
  }
}
</style>

<route lang="json" type="home">
{
  "style": {
    "navigationBarTitleText": "Coral Design"
  }
}
</route>
