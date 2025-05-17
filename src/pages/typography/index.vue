<script lang="ts" setup>
// 无需额外逻辑
</script>

<template>
  <view class="global-reset typography-page">
    <view class="header">
      <text class="h1">
        Coral Design 排版系统
      </text>
      <text class="subtitle">
        基于SF Pro的现代排版规范
      </text>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          标题样式
        </text>
        <text class="section-desc">
          清晰的层级与视觉结构
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-item">
          <view class="showcase-label">
            H1 (40px)
          </view>
          <text class="sample h1">
            大标题 Heading 1
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            H2 (32px)
          </view>
          <text class="sample h2">
            次标题 Heading 2
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            H3 (28px)
          </view>
          <text class="sample h3">
            小标题 Heading 3
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            H4 (24px)
          </view>
          <text class="sample h4">
            段落标题 Heading 4
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            H5 (20px)
          </view>
          <text class="sample h5">
            小段落标题 Heading 5
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            H6 (18px)
          </view>
          <text class="sample h6">
            最小标题 Heading 6
          </text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          文本尺寸
        </text>
        <text class="section-desc">
          不同场景下的文本大小规范
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-item">
          <view class="showcase-label">
            特大文本 (20px)
          </view>
          <text class="text-xl">
            这是一段特大文本示例，适合用于强调或醒目的段落内容。
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            大文本 (18px)
          </view>
          <text class="text-lg">
            这是一段大文本示例，适合用于突出的段落内容。
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            标准文本 (16px)
          </view>
          <text class="text-md">
            这是一段标准文本示例，适合用于正文内容。这是默认的文本大小。
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            小文本 (14px)
          </view>
          <text class="text-sm">
            这是一段小文本示例，适合用于次要信息或辅助文本。
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            微型文本 (12px)
          </view>
          <text class="text-xs">
            这是一段微型文本示例，适合用于说明、注解或极小的辅助信息。
          </text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          字重示例
        </text>
        <text class="section-desc">
          文本强调与层级表达
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-grid">
          <view class="weight-card">
            <text class="text-md font-light">
              Light (300)
            </text>
            <text class="weight-sample font-light">
              轻量字重示例文本
            </text>
          </view>
          <view class="weight-card">
            <text class="text-md font-regular">
              Regular (400)
            </text>
            <text class="weight-sample font-regular">
              常规字重示例文本
            </text>
          </view>
          <view class="weight-card">
            <text class="text-md font-medium">
              Medium (500)
            </text>
            <text class="weight-sample font-medium">
              中等字重示例文本
            </text>
          </view>
          <view class="weight-card">
            <text class="text-md font-semibold">
              Semi-Bold (600)
            </text>
            <text class="weight-sample font-semibold">
              半粗字重示例文本
            </text>
          </view>
          <view class="weight-card">
            <text class="text-md font-bold">
              Bold (700)
            </text>
            <text class="weight-sample font-bold">
              粗体字重示例文本
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          行高示例
        </text>
        <text class="section-desc">
          文本排版的垂直节奏
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-item">
          <view class="showcase-header">
            <text class="showcase-title">
              紧凑行高 (1.25)
            </text>
            <text class="showcase-tag">
              --line-height-tight
            </text>
          </view>
          <text class="text-md leading-tight">
            这是一个使用紧凑行高的段落示例。紧凑行高适合用于标题或空间有限的地方。当文本需要更紧凑的展示时，紧凑行高可以减少垂直空间的使用，使文本更加凝聚。
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-header">
            <text class="showcase-title">
              标准行高 (1.5)
            </text>
            <text class="showcase-tag">
              --line-height-base
            </text>
          </view>
          <text class="text-md leading-base">
            这是一个使用标准行高的段落示例。标准行高适合大多数正文内容，提供了良好的可读性和舒适的阅读体验。这是默认的行高设置，适用于大多数情况下的文本展示。
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-header">
            <text class="showcase-title">
              宽松行高 (1.75)
            </text>
            <text class="showcase-tag">
              --line-height-loose
            </text>
          </view>
          <text class="text-md leading-loose">
            这是一个使用宽松行高的段落示例。宽松行高适合长文本阅读，提供更多的垂直空间，减轻视觉疲劳。当需要提高长文本的可读性时，宽松行高是一个很好的选择。
          </text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          文本变体
        </text>
        <text class="section-desc">
          文本的不同展示形式
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-item">
          <view class="showcase-label">
            大写文本
          </view>
          <text class="text-uppercase text-md">
            这段文本将显示为全大写形式
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            小写文本
          </view>
          <text class="text-lowercase text-md">
            这段文本将显示为全小写形式
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            首字母大写
          </view>
          <text class="text-capitalize text-md">
            这段文本每个单词的首字母将大写
          </text>
        </view>
        <view class="showcase-item">
          <view class="showcase-label">
            截断文本
          </view>
          <text class="truncate text-md" style="max-width: 80%;">
            这段文本过长时将被截断并显示省略号，这段文本过长时将被截断并显示省略号，这段文本过长时将被截断并显示省略号。
          </text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          完整段落示例
        </text>
        <text class="section-desc">
          排版规范的实际应用
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-item full-example">
          <text class="h3">
            珊瑚设计系统
          </text>
          <text class="text-md">
            Coral Design 是一套为现代应用而设计的完整UI系统。它融合了最新的设计趋势和用户体验原则，提供了丰富的组件和样式，帮助开发者快速构建美观、一致且用户友好的应用界面。
          </text>
          <text class="text-md">
            系统基于模块化设计原则，每个组件都经过精心设计，不仅在视觉上保持一致性，而且在功能和交互上也遵循统一的逻辑，使用户在使用过程中感受到流畅和自然。
          </text>
          <text class="h4">
            设计原则
          </text>
          <view class="principle">
            <text class="principle-title">
              简洁：
            </text>
            <text class="principle-desc">
              删除不必要的元素，专注于核心功能和内容。
            </text>
          </view>
          <view class="principle">
            <text class="principle-title">
              一致：
            </text>
            <text class="principle-desc">
              在整个系统中保持视觉和交互的一致性。
            </text>
          </view>
          <view class="principle">
            <text class="principle-title">
              易用：
            </text>
            <text class="principle-desc">
              创建直观的界面，降低学习成本，提高使用效率。
            </text>
          </view>
          <view class="principle">
            <text class="principle-title">
              适应性：
            </text>
            <text class="principle-desc">
              确保界面在不同设备和屏幕尺寸上都能提供良好的体验。
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="h2">
          响应式排版
        </text>
        <text class="section-desc">
          自适应不同屏幕尺寸
        </text>
      </view>
      <view class="typography-showcase">
        <view class="showcase-item">
          <text class="text-md">
            在小屏幕设备上（如手机），标题会自动缩小：
          </text>
          <view class="responsive-demo">
            <view class="demo-screen desktop">
              <view class="demo-label">
                桌面端
              </view>
              <text class="sample h2">
                标题显示为32px
              </text>
            </view>
            <view class="demo-screen mobile">
              <view class="demo-label">
                移动端
              </view>
              <text class="sample h2" style="font-size: 1.75rem;">
                标题缩小为28px
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="css" scoped>
.typography-page {
  padding: var(--spacing-4);
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: var(--spacing-16);
  background-color: var(--bg-page);
  min-height: 100vh;
}

.header {
  margin: var(--spacing-8) 0 var(--spacing-10);
  text-align: center;
}

.header .h1 {
  color: var(--primary);
  font-size: 2.5rem;
  margin-bottom: var(--spacing-3);
}

.header .subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-xl);
  display: block;
}

.section {
  margin-bottom: var(--spacing-12);
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.section-header {
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
}

.section .h2 {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.typography-showcase {
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
}

.showcase-item {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--gray-200);
}

.showcase-item:last-child {
  border-bottom: none;
}

.showcase-item .showcase-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3);
  font-family: var(--font-family-mono);
  display: block;
}

.showcase-item .sample {
  color: var(--primary);
}

.showcase-header {
  margin-bottom: var(--spacing-3);
}

.showcase-header .showcase-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
  display: block;
}

.showcase-header .showcase-tag {
  display: inline-block;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--primary);
  background-color: var(--gray-100);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.showcase-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.weight-card {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  background-color: var(--gray-50);
  min-width: 200px;
  flex: 1;
}

.weight-card .weight-sample {
  display: block;
  font-size: var(--font-size-xl);
  margin-top: var(--spacing-2);
  color: var(--primary);
}

.full-example .h3 {
  margin-bottom: var(--spacing-3);
  color: var(--primary);
}

.full-example .h4 {
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-3);
  color: var(--primary-dark);
}

.full-example .text-md {
  margin-bottom: var(--spacing-3);
  line-height: var(--line-height-base);
}

.full-example .principle {
  display: flex;
  margin-bottom: var(--spacing-2);
}

.full-example .principle-title {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  min-width: 70px;
}

.full-example .principle-desc {
  color: var(--text-secondary);
}

.full-example .principle:last-child {
  margin-bottom: 0;
}

/* 响应式排版演示 */
.responsive-demo {
  display: flex;
  gap: var(--spacing-6);
  margin-top: var(--spacing-4);
}

.responsive-demo .demo-screen {
  background-color: var(--gray-50);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  flex: 1;
}

.responsive-demo .demo-screen.desktop {
  border: 2px solid var(--primary-light);
}

.responsive-demo .demo-screen.mobile {
  border: 2px solid var(--t-500);
  max-width: 240px;
}

.responsive-demo .demo-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-medium);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .showcase-grid {
    flex-direction: column;
  }

  .responsive-demo {
    flex-direction: column;
  }

  .responsive-demo .demo-screen.mobile {
    max-width: 100%;
  }
}
</style>
