<script setup lang="ts">
import { ref } from 'vue'

// 返回首页
function navigateBack() {
  uni.navigateBack()
}

// 颜色复制功能
const toastVisible = ref(false)
const toastText = ref('')

function showToast(text: string) {
  toastText.value = text
  toastVisible.value = true

  setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

function getColorValue(varName: string): string {
  // 实际项目中可从CSS变量获取，这里暂用映射
  const colorMap: Record<string, string> = {
    '--coral-0': '#FFEDE9',
    '--coral-100': '#FFD6D0',
    '--coral-200': '#FFBFB5',
    '--coral-300': '#FFADA0',
    '--coral-400': '#FF958A',
    '--coral-500': '#FF7E6A',
    '--coral-600': '#FF6E55',
    '--coral-700': '#E55C48',
    '--coral-800': '#CC3D29',
    '--coral-900': '#A32E1A',

    '--teal-0': '#E0FBF8',
    '--teal-100': '#C9F7F4',
    '--teal-200': '#A6F1ED',
    '--teal-300': '#8EEAE3',
    '--teal-400': '#6EE5DC',
    '--teal-500': '#4ECDC4',
    '--teal-600': '#3DB5AE',
    '--teal-700': '#35A39B',
    '--teal-800': '#218079',
    '--teal-900': '#166661',

    '--white': '#FFFFFF',
    '--gray-50': '#FAFAFA',
    '--gray-100': '#F5F5F5',
    '--gray-200': '#EEEEEE',
    '--gray-300': '#E0E0E0',
    '--gray-400': '#BDBDBD',
    '--gray-500': '#9E9E9E',
    '--gray-600': '#757575',
    '--gray-700': '#616161',
    '--gray-800': '#424242',
    '--gray-900': '#212121',
    '--black': '#333333',

    '--success': '#4CAF50',
    '--info': '#2196F3',
    '--warning': '#FF9800',
    '--error': '#F44336',

    '--primary': '#FF7E6A',
    '--primary-light': '#FFD6D0',
    '--primary-dark': '#E55C48',
    '--secondary': '#4ECDC4',
    '--bg-page': '#FAFAFA',
    '--bg-card': '#FFFFFF',
    '--bg-hover': '#FFEDE9',
    '--text-primary': '#212121',
    '--text-secondary': '#616161',
    '--text-hint': '#9E9E9E',
    '--text-disabled': '#BDBDBD',
    '--border-base': '#E0E0E0',
    '--divider': '#EEEEEE',
  }

  return colorMap[varName] || ''
}

function copyColor(varName: string) {
  // 复制变量名到剪贴板
  uni.setClipboardData({
    data: varName,
    success: () => {
      showToast(`已复制: ${varName}`)
    },
  })
}
</script>

<template>
  <view class="page">
    <view class="page-header">
      <view class="container">
        <view class="page-title">
          <text class="title">
            色彩系统
          </text>
          <text class="subtitle">
            Coral Design 专业、优雅、现代的色彩体系
          </text>
        </view>
      </view>
    </view>

    <view class="container">
      <!-- 系统概览 -->
      <view class="overview-section">
        <view class="overview-grid">
          <view class="overview-card" style="background-color: var(--primary)">
            <text class="overview-name light">
              主色 Primary
            </text>
            <text class="overview-hex light">
              #FF7E6A
            </text>
          </view>
          <view class="overview-card" style="background-color: var(--secondary)">
            <text class="overview-name">
              辅助色 Secondary
            </text>
            <text class="overview-hex">
              #4ECDC4
            </text>
          </view>
          <view class="overview-card" style="background-color: var(--bg-page)">
            <text class="overview-name">
              背景色 Background
            </text>
            <text class="overview-hex">
              #FAFAFA
            </text>
          </view>
          <view class="overview-card" style="background-color: var(--text-primary)">
            <text class="overview-name light">
              文本色 Text
            </text>
            <text class="overview-hex light">
              #212121
            </text>
          </view>
        </view>
      </view>

      <!-- 主色系 -->
      <view class="color-section">
        <view class="section-header">
          <text class="section-title">
            珊瑚色系 Coral
          </text>
          <text class="section-desc">
            品牌主色，传达温暖、热情和活力
          </text>
        </view>

        <view class="color-palette">
          <view
            v-for="i in 10"
            :key="i"
            class="color-item"
            :class="{ 'is-primary': i === 5 }"
            :style="{ backgroundColor: `var(--coral-${(i - 1) * 100})` }"
            @click="copyColor(`--coral-${(i - 1) * 100}`)"
          >
            <view class="color-info" :class="{ 'light-text': i > 5 }">
              <text class="color-info__shade">
                {{ (i - 1) * 100 }}
              </text>
              <view class="color-info__details">
                <text v-if="i === 5" class="color-info__primary-badge">
                  主色调
                </text>
                <text class="color-info__hex">
                  {{ getColorValue(`--coral-${(i - 1) * 100}`) }}
                </text>
                <text class="color-info__var">
                  --coral-{{ (i - 1) * 100 }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 辅助色系 -->
      <view class="color-section">
        <view class="section-header">
          <text class="section-title">
            青绿色系 Teal
          </text>
          <text class="section-desc">
            辅助色，传达平静、专业和信任
          </text>
        </view>

        <view class="color-palette">
          <view
            v-for="i in 10"
            :key="i"
            class="color-item"
            :class="{ 'is-primary': i === 5 }"
            :style="{ backgroundColor: `var(--teal-${(i - 1) * 100})` }"
            @click="copyColor(`--teal-${(i - 1) * 100}`)"
          >
            <view class="color-info" :class="{ 'light-text': i > 7 }">
              <text class="color-info__shade">
                {{ (i - 1) * 100 }}
              </text>
              <view class="color-info__details">
                <text v-if="i === 5" class="color-info__primary-badge">
                  主色调
                </text>
                <text class="color-info__hex">
                  {{ getColorValue(`--teal-${(i - 1) * 100}`) }}
                </text>
                <text class="color-info__var">
                  --teal-{{ (i - 1) * 100 }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 中性色 -->
      <view class="color-section">
        <view class="section-header">
          <text class="section-title">
            中性色系 Neutral
          </text>
          <text class="section-desc">
            用于文本、背景和边框等元素
          </text>
        </view>

        <view class="neutral-palette">
          <view
            v-for="(shade, index) in ['white', 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'black']"
            :key="index"
            class="neutral-item"
            :style="{
              backgroundColor: shade === 'white' || shade === 'black'
                ? `var(--${shade})`
                : `var(--gray-${shade})`,
            }"
            @click="copyColor(shade === 'white' || shade === 'black' ? `--${shade}` : `--gray-${shade}`)"
          >
            <view
              class="neutral-info"
              :class="{
                'light-text': (typeof shade === 'number' && shade >= 600) || shade === 'black',
                'with-border': shade === 'white',
              }"
            >
              <text class="neutral-info__name">
                {{ shade === 'white' ? 'White' : shade === 'black' ? 'Black' : `Gray ${shade}` }}
              </text>
              <text class="neutral-info__hex">
                {{ getColorValue(shade === 'white' || shade === 'black' ? `--${shade}` : `--gray-${shade}`) }}
              </text>
              <text class="neutral-info__var">
                {{ shade === 'white' || shade === 'black' ? `--${shade}` : `--gray-${shade}` }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 功能色 -->
      <view class="color-section">
        <view class="section-header">
          <text class="section-title">
            功能色系 Functional
          </text>
          <text class="section-desc">
            用于表达不同的状态和意义
          </text>
        </view>

        <view class="functional-grid">
          <view
            v-for="(color, name) in { success: '--success', info: '--info', warning: '--warning', error: '--error' }"
            :key="name"
            class="functional-item"
            :style="{ backgroundColor: `var(${color})` }"
            @click="copyColor(color)"
          >
            <view class="functional-info" :class="{ 'light-text': name !== 'warning' }">
              <text class="functional-info__name">
                {{ name.charAt(0).toUpperCase() + name.slice(1) }}
              </text>
              <text class="functional-info__hex">
                {{ getColorValue(color) }}
              </text>
              <text class="functional-info__var">
                {{ color }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 语义化颜色 -->
      <view class="color-section">
        <view class="section-header">
          <text class="section-title">
            语义化颜色 Semantic
          </text>
          <text class="section-desc">
            易于理解和使用的颜色别名
          </text>
        </view>

        <view class="semantic-wrapper">
          <view class="semantic-category">
            <text class="semantic-category__title">
              品牌色
            </text>
            <view class="semantic-grid">
              <view
                v-for="(mapping, name) in {
                  'primary': ['--primary', 'var(--coral-500)'],
                  'primary-light': ['--primary-light', 'var(--coral-100)'],
                  'primary-dark': ['--primary-dark', 'var(--coral-700)'],
                  'secondary': ['--secondary', 'var(--teal-500)'],
                }"
                :key="name"
                class="semantic-item"
                :style="{ backgroundColor: `var(${mapping[0]})` }"
                @click="copyColor(mapping[0])"
              >
                <view class="semantic-info" :class="{ 'light-text': name.includes('dark') || name === 'primary' }">
                  <text class="semantic-info__name">
                    {{ mapping[0] }}
                  </text>
                  <text class="semantic-info__mapping">
                    {{ mapping[1] }}
                  </text>
                </view>
              </view>
            </view>
          </view>

          <view class="semantic-category">
            <text class="semantic-category__title">
              应用色
            </text>
            <view class="semantic-grid">
              <view
                v-for="(mapping, name) in {
                  'bg-page': ['--bg-page', 'var(--gray-50)'],
                  'bg-card': ['--bg-card', 'var(--white)'],
                  'bg-hover': ['--bg-hover', 'var(--coral-50)'],
                }"
                :key="name"
                class="semantic-item"
                :style="{ backgroundColor: `var(${mapping[0]})` }"
                @click="copyColor(mapping[0])"
              >
                <view class="semantic-info">
                  <text class="semantic-info__name">
                    {{ mapping[0] }}
                  </text>
                  <text class="semantic-info__mapping">
                    {{ mapping[1] }}
                  </text>
                </view>
              </view>
            </view>
          </view>

          <view class="semantic-category">
            <text class="semantic-category__title">
              文本色
            </text>
            <view class="semantic-grid">
              <view
                v-for="(mapping, name) in {
                  'text-primary': ['--text-primary', 'var(--gray-900)'],
                  'text-secondary': ['--text-secondary', 'var(--gray-700)'],
                  'text-hint': ['--text-hint', 'var(--gray-500)'],
                  'text-disabled': ['--text-disabled', 'var(--gray-400)'],
                }"
                :key="name"
                class="semantic-item"
                :style="{ backgroundColor: `var(${mapping[0]})` }"
                @click="copyColor(mapping[0])"
              >
                <view class="semantic-info" :class="{ 'light-text': name.includes('primary') || name.includes('secondary') }">
                  <text class="semantic-info__name">
                    {{ mapping[0] }}
                  </text>
                  <text class="semantic-info__mapping">
                    {{ mapping[1] }}
                  </text>
                </view>
              </view>
            </view>
          </view>

          <view class="semantic-category">
            <text class="semantic-category__title">
              边框色
            </text>
            <view class="semantic-grid">
              <view
                v-for="(mapping, name) in {
                  'border-base': ['--border-base', 'var(--gray-300)'],
                  'divider': ['--divider', 'var(--gray-200)'],
                }"
                :key="name"
                class="semantic-item"
                :style="{ backgroundColor: `var(${mapping[0]})` }"
                @click="copyColor(mapping[0])"
              >
                <view class="semantic-info">
                  <text class="semantic-info__name">
                    {{ mapping[0] }}
                  </text>
                  <text class="semantic-info__mapping">
                    {{ mapping[1] }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 使用示例 -->
      <view class="color-section">
        <view class="section-header">
          <text class="section-title">
            使用方法
          </text>
          <text class="section-desc">
            如何在代码中使用颜色系统
          </text>
        </view>

        <view class="code-container">
          <view class="code-block">
            <text class="code-content">
              // CSS 中使用
              .element {
              color: var(--primary);
              background-color: var(--bg-card);
              border: 1px solid var(--border-base);
              }

              // SCSS 中使用
              .button {
              background-color: $primary;
              color: $white;

              &:hover {
              background-color: $primary-dark;
              }
              }
            </text>
          </view>
          <text class="code-tip">
            点击色块可复制变量名
          </text>
        </view>
      </view>
    </view>

    <view class="page-footer">
      <view class="container">
        <view class="back-btn" @click="navigateBack">
          <text class="back-btn__icon">
            ←
          </text>
          <text class="back-btn__text">
            返回首页
          </text>
        </view>
      </view>
    </view>

    <view class="toast" :class="{ 'toast--visible': toastVisible }">
      <text class="toast__text">
        {{ toastText }}
      </text>
    </view>
  </view>
</template>

<style lang="scss">
@use '../design/index.scss' as *;

.page {
  min-height: 100vh;
  background-color: var(--bg-page);
  padding-bottom: 60px;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// 页面头部
.page-header {
  background-color: var(--coral-50);
  padding: 60px 0 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 40px 0 30px;
    margin-bottom: 30px;
  }
}

.page-title {
  .title {
    font-size: 36px;
    font-weight: 700;
    color: var(--coral-700);
    margin-bottom: 8px;
    display: block;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  .subtitle {
    font-size: 16px;
    color: var(--text-secondary);
    display: block;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}

// 颜色概览
.overview-section {
  margin-bottom: 40px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.overview-card {
  height: 120px;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .overview-name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;

    &.light {
      color: white;
    }
  }

  .overview-hex {
    font-size: 14px;
    opacity: 0.9;
    font-family: monospace;

    &.light {
      color: white;
    }
  }
}

// 颜色部分
.color-section {
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
}

.section-header {
  margin-bottom: 24px;

  .section-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
    display: block;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .section-desc {
    font-size: 14px;
    color: var(--text-secondary);
    display: block;
  }
}

// 色板展示
.color-palette {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.color-item {
  aspect-ratio: 1;
  position: relative;
  transition: transform 0.15s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }

  &.is-primary {
    transform: scale(1.05);
    z-index: 1;
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--primary);

    &:hover {
      transform: scale(1.1);
    }
  }
}

.color-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);

  &.light-text {
    color: white;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &__shade {
    font-size: 22px;
    font-weight: 700;
    display: block;
    margin-bottom: 4px;

    @media (max-width: 576px) {
      font-size: 18px;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
  }

  &__primary-badge {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 2px 0;
    margin-bottom: 4px;
  }

  &__hex {
    font-family: monospace;
    font-size: 12px;
    margin-bottom: 2px;
  }

  &__var {
    font-family: monospace;
    font-size: 10px;
    opacity: 0.8;
  }
}

// 中性色
.neutral-palette {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.neutral-item {
  aspect-ratio: 1;
  position: relative;
  transition: transform 0.15s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
}

.neutral-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);

  &.with-border {
    border: 1px solid var(--gray-100);
  }

  &.light-text {
    color: white;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &__name {
    font-size: 14px;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;

    @media (max-width: 576px) {
      font-size: 12px;
    }
  }

  &__hex {
    font-family: monospace;
    font-size: 11px;
    margin-bottom: 2px;

    @media (max-width: 576px) {
      font-size: 10px;
    }
  }

  &__var {
    font-family: monospace;
    font-size: 10px;
    opacity: 0.8;

    @media (max-width: 576px) {
      font-size: 9px;
    }
  }
}

// 功能色
.functional-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.functional-item {
  height: 100px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
}

.functional-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);

  &.light-text {
    color: white;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  &__hex {
    font-family: monospace;
    font-size: 12px;
    margin-bottom: 2px;
  }

  &__var {
    font-family: monospace;
    font-size: 10px;
    opacity: 0.8;
  }
}

// 语义化颜色
.semantic-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.semantic-category {
  &__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
    display: block;
  }
}

.semantic-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.semantic-item {
  height: 80px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
}

.semantic-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);

  &.light-text {
    color: white;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &__name {
    font-size: 14px;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  &__mapping {
    font-family: monospace;
    font-size: 11px;
    opacity: 0.8;
  }
}

// 代码示例
.code-container {
  background-color: var(--white);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.code-block {
  background-color: var(--gray-900);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;

  .code-content {
    font-family: monospace;
    color: var(--white);
    white-space: pre;
    font-size: 14px;
    line-height: 1.5;
  }
}

.code-tip {
  font-size: 12px;
  color: var(--text-hint);
  display: block;
  text-align: center;
}

// 返回按钮
.page-footer {
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--white);
  border-top: 1px solid var(--divider);
  z-index: 10;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  color: var(--text-primary);
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-50);
  }

  &__icon {
    font-size: 18px;
    margin-right: 8px;
  }

  &__text {
    font-size: 14px;
    font-weight: 500;
  }
}

// 复制提示
.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background-color: var(--gray-900);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 14px;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &--visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  &__text {
    font-weight: 500;
  }
}
</style>
