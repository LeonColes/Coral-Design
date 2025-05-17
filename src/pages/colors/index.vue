<script setup lang="ts">
import { ref } from 'vue'

// 色系定义
const colorSystems = [
  {
    id: 'coral',
    name: '珊瑚色系',
    desc: '品牌主色，传达温暖、热情和活力',
    gradient: 'linear-gradient(135deg, var(--coral-50) 0%, var(--coral-300) 60%, var(--coral-500) 100%)',
    shades: [
      { shade: 50, name: '--coral-50', value: '#FFFAF9', isDark: false },
      { shade: 100, name: '--coral-100', value: '#FFD6D0', isDark: false },
      { shade: 300, name: '--coral-300', value: '#FFADA0', isDark: false },
      { shade: 500, name: '--coral-500', value: '#FF7E6A', isDark: true, isPrimary: true },
      { shade: 700, name: '--coral-700', value: '#E55C48', isDark: true },
      { shade: 900, name: '--coral-900', value: '#CC3D29', isDark: true },
    ],
  },
  {
    id: 'teal',
    name: '青绿色系',
    desc: '辅助色，传达平静、专业和信任',
    gradient: 'linear-gradient(135deg, var(--teal-50) 0%, var(--teal-300) 60%, var(--teal-500) 100%)',
    shades: [
      { shade: 50, name: '--teal-50', value: '#F2FFFD', isDark: false },
      { shade: 100, name: '--teal-100', value: '#C9F7F4', isDark: false },
      { shade: 300, name: '--teal-300', value: '#8EEAE3', isDark: false },
      { shade: 500, name: '--teal-500', value: '#4ECDC4', isDark: true, isPrimary: true },
      { shade: 700, name: '--teal-700', value: '#35A39B', isDark: true },
      { shade: 900, name: '--teal-900', value: '#218079', isDark: true },
    ],
  },
]

// 中性色定义
const neutralColors = [
  { name: '--white', value: '#FFFFFF', shade: '白色', isDark: false, withBorder: true },
  { name: '--gray-50', value: '#FFFAF9', shade: '灰色 50', isDark: false, withBorder: true },
  { name: '--gray-100', value: '#F7F7F7', shade: '灰色 100', isDark: false },
  { name: '--gray-300', value: '#E0E0E0', shade: '灰色 300', isDark: false },
  { name: '--gray-500', value: '#9E9E9E', shade: '灰色 500', isDark: false },
  { name: '--gray-700', value: '#616161', shade: '灰色 700', isDark: true },
  { name: '--gray-900', value: '#212121', shade: '灰色 900', isDark: true },
  { name: '--black', value: '#333333', shade: '黑色', isDark: true },
]

// 功能色定义
const functionalColors = [
  { name: '--success', value: '#4CAF50', dark: true, desc: '成功状态' },
  { name: '--info', value: '#2196F3', dark: true, desc: '信息提示' },
  { name: '--warning', value: '#FF9800', dark: false, desc: '警告提示' },
  { name: '--error', value: '#F44336', dark: true, desc: '错误提示' },
]

// 复制状态
const copiedVariable = ref('')

// 颜色变量复制函数
function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).catch((err) => {
    console.error('无法复制到剪贴板:', err)
  })

  // 更新已复制的状态
  copiedVariable.value = text

  // 2秒后重置状态
  setTimeout(() => {
    copiedVariable.value = ''
  }, 2000)
}

// 当前年份
const currentYear = new Date().getFullYear()
</script>

<template>
  <view class="color-page">
    <!-- 渐变头部 - 移除返回按钮，保留标题区域 -->
    <view class="header">
      <view class="header-container">
        <view class="header-content">
          <text class="title">
            Coral Design 色彩系统
          </text>
          <text class="subtitle">
            温暖而现代的色彩体系，为应用设计提供优雅一致的视觉风格
          </text>
        </view>
      </view>
    </view>

    <view class="container">
      <!-- 概览信息 -->
      <view class="intro-section">
        <view class="intro-text">
          <text class="intro-title">
            色彩系统概览
          </text>
          <text class="intro-desc">
            Coral Design色彩系统采用珊瑚色为主色，青绿色为辅助色，配合中性色及功能色，构建了一套温馨而专业的视觉体验。点击任意色块可复制颜色变量。
          </text>
        </view>
      </view>

      <!-- 主色与辅助色 -->
      <view class="color-systems">
        <view
          v-for="system in colorSystems"
          :key="system.id"
          class="color-system-card"
        >
          <view class="card-header" :style="{ background: system.gradient }">
            <view class="card-header-content">
              <text class="card-title">
                {{ system.name }}
              </text>
              <text class="card-desc">
                {{ system.desc }}
              </text>
            </view>
          </view>

          <view class="colors-container">
            <view class="color-info-row">
              <text class="color-label">
                色阶
              </text>
              <text class="color-label">
                变量名
              </text>
              <text class="color-label">
                颜色值
              </text>
            </view>

            <view
              v-for="color in system.shades"
              :key="color.name"
              class="color-row"
              :class="{
                'dark-row': color.isDark,
                'copied': copiedVariable === color.name,
              }"
              @click="copyToClipboard(color.name)"
            >
              <view class="color-preview" :style="{ backgroundColor: color.value }" />
              <text class="color-shade">
                {{ color.shade }}
              </text>
              <text class="color-var">
                {{ color.name }}
              </text>
              <text class="color-hex">
                {{ color.value }}
              </text>
              <view v-if="copiedVariable === color.name" class="copy-indicator">
                已复制
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 中性色卡片 -->
      <view class="card">
        <view class="card-header-simple">
          <text class="card-title">
            中性色系
          </text>
          <text class="card-desc">
            用于文本、背景、边框等基础元素
          </text>
        </view>

        <view class="colors-container">
          <view class="color-info-row">
            <text class="color-label">
              色阶
            </text>
            <text class="color-label">
              变量名
            </text>
            <text class="color-label">
              颜色值
            </text>
          </view>

          <view
            v-for="color in neutralColors"
            :key="color.name"
            class="color-row"
            :class="{
              'dark-row': color.isDark,
              'copied': copiedVariable === color.name,
            }"
            @click="copyToClipboard(color.name)"
          >
            <view class="color-preview" :style="{ backgroundColor: color.value }" :class="{ 'with-border': color.withBorder }" />
            <text class="color-shade">
              {{ color.shade }}
            </text>
            <text class="color-var">
              {{ color.name }}
            </text>
            <text class="color-hex">
              {{ color.value }}
            </text>
            <view v-if="copiedVariable === color.name" class="copy-indicator">
              已复制
            </view>
          </view>
        </view>
      </view>

      <!-- 功能色卡片 -->
      <view class="card">
        <view class="card-header-simple">
          <text class="card-title">
            功能色系
          </text>
          <text class="card-desc">
            用于表达不同的状态和意义
          </text>
        </view>

        <view class="colors-container">
          <view class="color-info-row">
            <text class="color-label">
              用途
            </text>
            <text class="color-label">
              变量名
            </text>
            <text class="color-label">
              颜色值
            </text>
          </view>

          <view
            v-for="color in functionalColors"
            :key="color.name"
            class="color-row"
            :class="{
              'dark-row': color.dark,
              'copied': copiedVariable === color.name,
            }"
            @click="copyToClipboard(color.name)"
          >
            <view class="color-preview" :style="{ backgroundColor: color.value }" />
            <text class="color-shade">
              {{ color.desc }}
            </text>
            <text class="color-var">
              {{ color.name }}
            </text>
            <text class="color-hex">
              {{ color.value }}
            </text>
            <view v-if="copiedVariable === color.name" class="copy-indicator">
              已复制
            </view>
          </view>
        </view>
      </view>

      <!-- 颜色应用指南 -->
      <view class="card">
        <view class="card-header-simple">
          <text class="card-title">
            色彩应用指南
          </text>
          <text class="card-desc">
            在界面设计中合理使用色彩的建议
          </text>
        </view>

        <view class="usage-grid">
          <view class="usage-item">
            <view class="usage-icon" style="background-color: var(--coral-500)" />
            <view class="usage-content">
              <text class="usage-title">
                品牌主色应用
              </text>
              <text class="usage-desc">
                珊瑚红色应用于主要按钮、重点强调元素、品牌标识等需要引起用户注意的位置
              </text>
            </view>
          </view>

          <view class="usage-item">
            <view class="usage-icon" style="background-color: var(--teal-500)" />
            <view class="usage-content">
              <text class="usage-title">
                辅助色应用
              </text>
              <text class="usage-desc">
                青绿色用于次要按钮、图表、数据可视化等辅助元素，与主色形成和谐对比
              </text>
            </view>
          </view>

          <view class="usage-item">
            <view class="usage-icon" style="background-color: var(--gray-700)" />
            <view class="usage-content">
              <text class="usage-title">
                中性色应用
              </text>
              <text class="usage-desc">
                用于文本、背景、边框等基础元素，为界面提供结构和层次感
              </text>
            </view>
          </view>

          <view class="usage-item">
            <view class="usage-icon" style="background: linear-gradient(135deg, var(--success) 0%, var(--error) 100%)" />
            <view class="usage-content">
              <text class="usage-title">
                功能色应用
              </text>
              <text class="usage-desc">
                仅用于表达特定状态和反馈，如成功、警告、错误等，避免过度使用
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 页脚 -->
    <view class="footer">
      <text class="footer-text">
        Coral Design © {{ currentYear }}
      </text>
    </view>
  </view>
</template>

<style scoped>
/* 基础样式 */
.color-page {
  min-height: 100vh;
  background-color: var(--bg-page);
  position: relative;
  padding-bottom: 80px; /* 为页脚留出空间 */
  font-family: var(--font-family-base);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 头部样式 */
.header {
  background: linear-gradient(135deg, var(--coral-300) 0%, var(--coral-500) 60%, var(--coral-700) 100%);
  padding: 80px 0 100px;
  position: relative;
  overflow: hidden;
  margin-bottom: -60px;
  box-shadow: 0 15px 30px rgba(var(--coral-500-rgb, 255, 126, 106), 0.15);
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 40%);
  mix-blend-mode: overlay;
}

.header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  mix-blend-mode: overlay;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.header-content {
  max-width: 700px;
}

.title {
  font-size: 42px;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 20px;
  line-height: 1.2;
  display: block;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  display: block;
  max-width: 600px;
}

/* 介绍部分 */
.intro-section {
  background-color: var(--white);
  border-radius: 16px;
  padding: 32px;
  margin-top: 60px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
}

.intro-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: block;
}

.intro-desc {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* 色系卡片 */
.color-systems {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 32px 0;
}

.color-system-card {
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
}

.color-system-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12), 0 5px 20px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 32px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.card-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 40%);
  mix-blend-mode: overlay;
  z-index: -1;
}

.card-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));
  z-index: 0;
}

.card-header-content {
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: block;
}

.card-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 新的颜色表格样式 */
.colors-container {
  padding: 16px;
}

.color-info-row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr auto;
  gap: 16px;
  padding: 0 16px 12px;
  border-bottom: 1px solid var(--gray-100);
  margin-bottom: 8px;
}

.color-label {
  font-size: 13px;
  color: var(--text-hint);
  font-weight: 500;
}

.color-row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  align-items: center;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 4px;
}

.color-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
  transform: translateX(2px);
}

.color-row.dark-row {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}

.color-row.dark-row:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.color-row.dark-row .color-var,
.color-row.dark-row .color-shade,
.color-row.dark-row .color-hex {
  color: white;
}

.color-row.copied {
  background-color: rgba(0, 0, 0, 0.05);
}

.color-row.dark-row.copied {
  background-color: rgba(0, 0, 0, 0.95);
}

.color-preview {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.color-preview::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 80%);
  z-index: 1;
}

.color-preview.with-border {
  border: 1px solid var(--gray-200);
}

.color-row:hover .color-preview {
  transform: scale(1.1) rotate(-2deg);
}

.color-shade {
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.color-var {
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.color-hex {
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--text-hint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-indicator {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  background-color: var(--primary);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.dark-row .copy-indicator {
  background-color: rgba(255, 255, 255, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-50%) translateX(10px); }
  to { opacity: 1; transform: translateY(-50%) translateX(0); }
}

/* 卡片样式 */
.card {
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
}

.card-header-simple {
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--gray-100);
}

/* 使用指南样式 */
.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 32px;
}

.usage-item {
  display: flex;
  align-items: flex-start;
  transition: transform 0.2s ease;
}

.usage-item:hover {
  transform: translateY(-3px);
}

.usage-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.usage-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 80%);
  z-index: 1;
}

.usage-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  display: block;
}

.usage-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* 页脚 */
.footer {
  text-align: center;
  padding: 24px 0;
  color: var(--text-hint);
  font-size: 14px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid var(--gray-100);
  background-color: var(--white);
}

/* 响应式样式 */
@media (max-width: 992px) {
  .color-systems {
    grid-template-columns: 1fr;
  }

  .usage-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 60px 0 80px;
  }

  .intro-section {
    margin-top: 40px;
  }

  .title {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .color-info-row,
  .color-row {
    grid-template-columns: 40px 1fr 1fr auto;
    gap: 12px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .color-page {
    padding-bottom: 70px;
  }
}

@media (max-width: 576px) {
  .color-info-row {
    grid-template-columns: 40px 1fr 1fr;
  }

  .color-row {
    grid-template-columns: 40px 1fr 1fr;
    gap: 8px;
  }

  .intro-section {
    padding: 24px;
  }

  .card-header {
    padding: 24px;
  }

  .usage-grid {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .color-info-row {
    display: none;
  }

  .color-row {
    grid-template-columns: 40px 1fr;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .color-preview {
    grid-row: span 2;
  }

  .color-var {
    grid-column: 2;
  }

  .color-hex {
    grid-column: 2;
  }

  .usage-item {
    flex-direction: column;
  }

  .usage-icon {
    margin-bottom: 12px;
    width: 48px;
    height: 48px;
  }

  .usage-title {
    margin-top: 8px;
  }

  .copy-indicator {
    top: unset;
    right: 12px;
    bottom: 12px;
    transform: none;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
  }
}
</style>
