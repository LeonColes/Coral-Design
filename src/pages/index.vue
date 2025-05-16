<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 导航函数
function jumpToComponents() {
  uni.navigateTo({
    url: '/pages/components',
  })
}

// 版权年份
const currentYear = new Date().getFullYear()

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

        <view class="story-content">
          <view class="story-section">
            <view class="story-icon inspiration" />
            <view class="story-text-container">
              <text class="story-section-title">
                灵感之旅
              </text>
              <text class="story-text">
                Coral Design源于对海洋珊瑚礁生态系统的观察与启发。珊瑚礁以其丰富的色彩、精美的结构和平衡的生态系统，成为我们设计语言的核心灵感。
              </text>
            </view>
          </view>

          <view class="story-section">
            <view class="story-icon philosophy" />
            <view class="story-text-container">
              <text class="story-section-title">
                设计哲学
              </text>
              <text class="story-text">
                如同珊瑚礁那样，我们追求系统中各元素的和谐共存。每个组件都是独立的，又能与整体无缝融合，共同构成一个平衡、友好且高效的界面生态系统。
              </text>
            </view>
          </view>

          <view class="story-section">
            <view class="story-icon journey" />
            <view class="story-text-container">
              <text class="story-section-title">
                未来之路
              </text>
              <text class="story-text">
                我们的愿景是创建一个不断进化的设计系统，就像珊瑚礁随着时间生长和适应一样。我们不断探索新的可能性，致力于为用户体验带来更多创新与美感。
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 页脚 -->
    <view class="footer">
      <text class="copyright">
        © {{ currentYear }} Coral Design
      </text>
    </view>
  </view>
</template>

<style lang="css">
.global-reset {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
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
    linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
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
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
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
  text-shadow: 0 3px 12px rgba(0,0,0,0.2);
  margin-bottom: 20px;
}

.tagline {
  display: block;
  font-size: 26px;
  font-weight: 600;
  color: rgba(255,255,255,0.95);
  margin-bottom: 20px;
  letter-spacing: 5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.description {
  display: block;
  font-size: 20px;
  color: rgba(255,255,255,0.9);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0,0,0,0.1);
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.action-btn:hover,
.action-btn:active {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

/* 设计故事部分 */
.design-story {
  background-color: #28283E;
  color: white;
  padding: 60px 0 0 0;
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
  max-width: 900px;
  width: 100%;
  text-align: center;
  padding: 0;
}

.story-title {
  display: block;
  font-size: 42px;
  font-weight: 700;
  color: white;
  margin-bottom: 50px;
}

.story-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.story-section {
  display: flex;
  text-align: left;
  gap: 20px;
}

.story-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.inspiration {
  background: linear-gradient(135deg, #FF6D4B, #FF4C70);
}

.philosophy {
  background: linear-gradient(135deg, #3ECBC6, #00A1B3);
}

.journey {
  background: linear-gradient(135deg, #60A5FA, #4F46E5);
}

.story-text-container {
  flex: 1;
}

.story-section-title {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
}

.story-text {
  display: block;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255,255,255,0.8);
}

/* 页脚 */
.footer {
  background-color: #20202D;
  padding: 24px;
  text-align: center;
  margin-top: auto;
}

.copyright {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

/* 响应式设计 */
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
    padding: 40px 0 0 0;
  }

  .story-title {
    font-size: 36px;
    margin-bottom: 40px;
  }

  .story-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
  }

  .story-section-title {
    font-size: 20px;
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

  .story-content {
    gap: 30px;
  }
}
</style>

<route type="home" lang="json">
{}
</route>
