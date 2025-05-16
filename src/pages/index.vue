<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 导航函数
function jumpToPage(path: string) {
  uni.navigateTo({
    url: `/pages/${path}`,
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
          <button class="action-btn primary" @click="jumpToPage('color')">
            <text>色彩系统</text>
          </button>

          <button class="action-btn secondary" @click="jumpToPage('typography')">
            <text>排版系统</text>
          </button>
        </view>
      </view>
    </view>

    <!-- 设计理念 -->
    <view class="design-philosophy" :class="{ 'animate-in': isAnimationLoaded }">
      <view class="philosophy-container">
        <text class="philosophy-title">
          设计价值
        </text>
        <text class="philosophy-text">
          在复杂中寻找简约，在简约中创造美感
        </text>

        <view class="design-principles">
          <view class="principle">
            <view class="harmony principle-icon" />
            <text class="principle-name">
              和谐
            </text>
          </view>

          <view class="principle">
            <view class="principle-icon balance" />
            <text class="principle-name">
              平衡
            </text>
          </view>

          <view class="principle">
            <view class="principle-icon clarity" />
            <text class="principle-name">
              清晰
            </text>
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
  min-height: 600px;
  max-height: 900px;
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
  padding: 0 40px;
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
  display: flex;
  gap: 24px;
  margin-top: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 36px;
  height: 56px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.action-btn.primary {
  background-color: white;
  color: #E83E65;
  border: none;
}

.action-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.action-btn.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.9);
}

.action-btn.secondary:hover {
  background-color: rgba(255,255,255,0.15);
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

/* 设计理念部分 */
.design-philosophy {
  background-color: #28283E;
  color: white;
  padding: 100px 40px;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
  position: relative;
}

.design-philosophy.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.philosophy-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.philosophy-title {
  display: block;
  font-size: 42px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
}

.philosophy-text {
  display: block;
  font-size: 20px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 80px;
  line-height: 1.6;
}

.design-principles {
  display: flex;
  justify-content: center;
  gap: 80px;
}

.principle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.principle-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.harmony {
  background: linear-gradient(135deg, #FF6D4B, #FF4C70);
}

.balance {
  background: linear-gradient(135deg, #3ECBC6, #00A1B3);
}

.clarity {
  background: linear-gradient(135deg, #60A5FA, #4F46E5);
}

.principle-name {
  font-size: 20px;
  font-weight: 600;
  color: white;
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
    height: 52px;
    font-size: 17px;
  }

  .design-philosophy {
    padding: 80px 30px;
  }

  .philosophy-title {
    font-size: 36px;
  }

  .philosophy-text {
    font-size: 18px;
    margin-bottom: 60px;
  }

  .design-principles {
    gap: 50px;
  }

  .principle-icon {
    width: 60px;
    height: 60px;
  }

  .principle-name {
    font-size: 18px;
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

  .action-area {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    gap: 16px;
  }

  .action-btn {
    width: 100%;
  }

  .design-principles {
    flex-direction: column;
    gap: 40px;
  }

  .philosophy-text {
    margin-bottom: 50px;
  }
}
</style>

<route type="home" lang="json">
{}
</route>
