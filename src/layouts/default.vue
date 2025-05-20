<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <slot />
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
</template>

<style>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
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
}

.footer-logo {
  margin-bottom: var(--spacing-2);
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
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

@media (min-width: 768px) {
  .content-container {
    padding: var(--spacing-6);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-text {
    text-align: right;
  }
}
</style>
