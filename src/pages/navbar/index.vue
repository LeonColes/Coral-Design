<script setup lang="ts">
import NavBar from '@/components/navbar/index.vue'
import { onMounted, ref, watch } from 'vue'

// 导航栏属性
const title = ref('导航栏组件')
const titleCenter = ref(true)
const showBack = ref(true)
const showBorder = ref(true)
const backgroundColor = ref('#FF7E6A')
const titleColor = ref('white')
const fixed = ref(true)

// 预览区控制
const showPreview = ref(true)

function togglePreview() {
  showPreview.value = !showPreview.value
}

// 可选的背景颜色
const bgColorOptions = [
  { name: '珊瑚色', value: '#FF7E6A' },
  { name: '白色', value: '#ffffff' },
  { name: '蓝色', value: '#409EFF' },
  { name: '绿色', value: '#67C23A' },
]

// 可选的文字颜色
const textColorOptions = [
  { name: '白色', value: 'white' },
  { name: '黑色', value: 'black' },
  { name: '灰色', value: '#909399' },
]

// 示例代码
const codeExample = ref(`<NavBar
  title="导航栏组件"
  :title-center="true"
  :show-back="true"
  :border="true"
  background-color="#FF7E6A"
  title-color="white"
  :fixed="true"
/>`)

// 更新示例代码
function updateCodeExample() {
  codeExample.value = `<NavBar
  title="${title.value}"
  :title-center="${titleCenter.value}"
  :show-back="${showBack.value}"
  :border="${showBorder.value}"
  background-color="${backgroundColor.value}"
  title-color="${titleColor.value}"
  :fixed="${fixed.value}"
>
  <!-- 可以添加自定义内容 -->
  <!-- <view slot="left">左侧内容</view> -->
  <!-- <view slot="title">自定义标题</view> -->
  <!-- <view slot="right">右侧内容</view> -->
</NavBar>`
}

// 监听所有选择变化，更新示例代码
watch([title, titleCenter, showBack, showBorder, backgroundColor, titleColor, fixed], () => {
  updateCodeExample()
})

// 组件挂载时初始化
onMounted(() => {
  updateCodeExample()
})

// 切换布尔值属性
function toggleProperty(property: 'titleCenter' | 'showBack' | 'showBorder' | 'fixed') {
  switch (property) {
    case 'titleCenter':
      titleCenter.value = !titleCenter.value
      break
    case 'showBack':
      showBack.value = !showBack.value
      break
    case 'showBorder':
      showBorder.value = !showBorder.value
      break
    case 'fixed':
      fixed.value = !fixed.value
      break
  }
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 模拟自定义返回事件 (未使用，添加下划线前缀避免lint警告)
function onBackClick() {
  uni.showToast({
    title: '点击了返回按钮',
    icon: 'none',
  })
}
</script>

<template>
  <view class="navbar-page">
    <!-- 导航栏 -->
    <NavBar
      title="导航栏组件"
      :title-center="true"
      :show-back="true"
      background-color="#FF7E6A"
      title-color="white"
      @back-click="goBack"
    />

    <!-- 页面内容容器 -->
    <view class="page-container">
      <!-- 页面标题 -->
      <view class="page-header">
        <text class="page-title-main">
          导航栏 NavBar
        </text>
        <text class="page-description">
          适用于小程序和App的顶部导航栏组件，能够自动适配不同设备的状态栏、安全区域和小程序胶囊按钮
        </text>
      </view>

      <!-- 预览区域 -->
      <view class="preview-section" :class="{ 'preview-section--collapsed': !showPreview }">
        <view class="panel-header">
          <text class="panel-title">
            导航栏预览
          </text>
          <view class="preview-toggle" @click="togglePreview">
            {{ showPreview ? '隐藏' : '显示' }}
          </view>
        </view>

        <view v-if="showPreview" class="preview-area">
          <view class="navbar-preview-container" :style="{ backgroundColor }">
            <NavBar
              :title="title"
              :title-center="titleCenter"
              :show-back="showBack"
              :border="showBorder"
              :background-color="backgroundColor"
              :title-color="titleColor"
              :fixed="false"
              :show-block="false"
              @back-click="onBackClick"
            />
          </view>
        </view>
      </view>

      <!-- 主要内容区 -->
      <view class="main-content">
        <!-- 左侧：配置面板 -->
        <view class="config-panel">
          <view class="panel-section">
            <text class="panel-title">
              代码示例
            </text>
            <view class="code-block">
              <text class="code-content">
                {{ codeExample }}
              </text>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              基本配置
            </text>

            <view class="config-item">
              <text class="config-label">
                标题
              </text>
              <input v-model="title" class="config-input" placeholder="请输入标题">
            </view>

            <view class="toggle-group">
              <view class="toggle-item">
                <text class="toggle-label">
                  标题居中
                </text>
                <switch
                  :checked="titleCenter"
                  color="#FF7E6A"
                  @change="toggleProperty('titleCenter')"
                />
              </view>

              <view class="toggle-item">
                <text class="toggle-label">
                  显示返回
                </text>
                <switch
                  :checked="showBack"
                  color="#FF7E6A"
                  @change="toggleProperty('showBack')"
                />
              </view>

              <view class="toggle-item">
                <text class="toggle-label">
                  显示边框
                </text>
                <switch
                  :checked="showBorder"
                  color="#FF7E6A"
                  @change="toggleProperty('showBorder')"
                />
              </view>

              <view class="toggle-item">
                <text class="toggle-label">
                  固定定位
                </text>
                <switch
                  :checked="fixed"
                  color="#FF7E6A"
                  @change="toggleProperty('fixed')"
                />
              </view>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              颜色设置
            </text>

            <view class="color-section">
              <text class="section-subtitle">
                背景颜色
              </text>
              <view class="color-grid">
                <view
                  v-for="(color, index) in bgColorOptions"
                  :key="index"
                  class="color-box"
                  :class="{ active: backgroundColor === color.value }"
                  :style="{ backgroundColor: color.value, color: color.value === '#ffffff' ? '#333' : '#fff' }"
                  @click="backgroundColor = color.value"
                >
                  {{ color.name }}
                </view>
              </view>
            </view>

            <view class="color-section">
              <text class="section-subtitle">
                文字颜色
              </text>
              <view class="color-grid">
                <view
                  v-for="(color, index) in textColorOptions"
                  :key="index"
                  class="color-box"
                  :class="{ active: titleColor === color.value }"
                  :style="{
                    backgroundColor: color.value === 'white' ? '#ffffff'
                      : color.value === 'black' ? '#000000' : color.value,
                    color: color.value === 'white' ? '#333' : '#fff',
                  }"
                  @click="titleColor = color.value"
                >
                  {{ color.name }}
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 右侧：API文档 -->
        <view class="api-panel">
          <view class="panel-section">
            <text class="panel-title">
              API 参考
            </text>

            <view class="api-table">
              <view class="api-row header">
                <view class="api-cell prop-cell">
                  属性
                </view>
                <view class="api-cell type-cell">
                  类型
                </view>
                <view class="api-cell default-cell">
                  默认值
                </view>
                <view class="api-cell desc-cell">
                  说明
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  title
                </view>
                <view class="api-cell type-cell">
                  String
                </view>
                <view class="api-cell default-cell">
                  ''
                </view>
                <view class="api-cell desc-cell">
                  标题文字
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  titleCenter
                </view>
                <view class="api-cell type-cell">
                  Boolean
                </view>
                <view class="api-cell default-cell">
                  true
                </view>
                <view class="api-cell desc-cell">
                  标题是否居中
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  border
                </view>
                <view class="api-cell type-cell">
                  Boolean
                </view>
                <view class="api-cell default-cell">
                  true
                </view>
                <view class="api-cell desc-cell">
                  是否显示底部边框
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  backgroundColor
                </view>
                <view class="api-cell type-cell">
                  String
                </view>
                <view class="api-cell default-cell">
                  #FF7E6A
                </view>
                <view class="api-cell desc-cell">
                  背景颜色
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  titleColor
                </view>
                <view class="api-cell type-cell">
                  String
                </view>
                <view class="api-cell default-cell">
                  white
                </view>
                <view class="api-cell desc-cell">
                  文字颜色
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  fixed
                </view>
                <view class="api-cell type-cell">
                  Boolean
                </view>
                <view class="api-cell default-cell">
                  true
                </view>
                <view class="api-cell desc-cell">
                  是否固定在顶部
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  showBlock
                </view>
                <view class="api-cell type-cell">
                  Boolean
                </view>
                <view class="api-cell default-cell">
                  true
                </view>
                <view class="api-cell desc-cell">
                  是否需要填充
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  showBack
                </view>
                <view class="api-cell type-cell">
                  Boolean
                </view>
                <view class="api-cell default-cell">
                  true
                </view>
                <view class="api-cell desc-cell">
                  是否显示返回按钮
                </view>
              </view>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              事件
            </text>

            <view class="api-table">
              <view class="api-row header">
                <view class="api-cell prop-cell">
                  事件名
                </view>
                <view class="api-cell type-cell">
                  返回值
                </view>
                <view class="api-cell desc-cell">
                  说明
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  back-click
                </view>
                <view class="api-cell type-cell">
                  -
                </view>
                <view class="api-cell desc-cell">
                  返回按钮点击事件
                </view>
              </view>
            </view>
          </view>

          <view class="panel-section">
            <text class="panel-title">
              插槽
            </text>

            <view class="api-table">
              <view class="api-row header">
                <view class="api-cell prop-cell">
                  名称
                </view>
                <view class="api-cell desc-cell">
                  说明
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  left
                </view>
                <view class="api-cell desc-cell">
                  自定义左侧内容
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  title
                </view>
                <view class="api-cell desc-cell">
                  自定义标题内容
                </view>
              </view>

              <view class="api-row">
                <view class="api-cell prop-cell">
                  right
                </view>
                <view class="api-cell desc-cell">
                  自定义右侧内容
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 使用示例区域 -->
      <view class="demo-panel">
        <view class="demo-section">
          <view class="section-header">
            <text class="section-title">
              基础用法
            </text>
            <text class="section-desc">
              基本的导航栏用法，显示标题和返回按钮
            </text>
          </view>

          <view class="demo-block">
            <NavBar
              title="标题文字"
              :title-center="true"
              :show-back="true"
              background-color="#FF7E6A"
              title-color="white"
              :fixed="false"
              :show-block="false"
              @back-click="onBackClick"
            />
          </view>
        </view>

        <view class="demo-section">
          <view class="section-header">
            <text class="section-title">
              自定义内容
            </text>
            <text class="section-desc">
              通过插槽可以自定义导航栏的左中右三个部分
            </text>
          </view>

          <view class="demo-block">
            <NavBar
              title="自定义导航栏"
              :title-center="true"
              background-color="#ffffff"
              title-color="#333"
              :fixed="false"
              :show-block="false"
            >
              <template #left>
                <view>
                  <text class="demo-icon">
                    ①
                  </text>
                </view>
              </template>
              <template #right>
                <view>
                  <text class="demo-icon">
                    ②
                  </text>
                  <text class="demo-icon" style="margin-left: 16px;">
                    ③
                  </text>
                </view>
              </template>
            </NavBar>
          </view>

          <view class="code-block" style="margin-top: 16px;">
            <text class="code-content">
              &lt;NavBar title="导航栏"&gt;
              &lt;view slot="left"&gt;
              &lt;view class="custom-left"&gt;
              &lt;text class="icon"&gt;①&lt;/text&gt;
              &lt;/view&gt;
              &lt;/view&gt;

              &lt;view slot="title"&gt;
              &lt;text class="custom-title"&gt;自定义标题&lt;/text&gt;
              &lt;/view&gt;

              &lt;view slot="right"&gt;
              &lt;view class="custom-right"&gt;
              &lt;text class="icon"&gt;②&lt;/text&gt;
              &lt;text class="icon"&gt;③&lt;/text&gt;
              &lt;/view&gt;
              &lt;/view&gt;
              &lt;/NavBar&gt;
            </text>
          </view>

          <view class="slots-doc" style="margin-top: 20px;">
            <text class="slots-title">
              可用插槽
            </text>
            <view class="slots-table">
              <view class="header slots-row">
                <view class="slots-cell name-cell">
                  插槽名称
                </view>
                <view class="slots-cell desc-cell">
                  说明
                </view>
              </view>
              <view class="slots-row">
                <view class="slots-cell name-cell">
                  left
                </view>
                <view class="slots-cell desc-cell">
                  导航栏左侧内容区域，默认显示返回按钮
                </view>
              </view>
              <view class="slots-row">
                <view class="slots-cell name-cell">
                  title
                </view>
                <view class="slots-cell desc-cell">
                  导航栏标题区域，默认显示标题文本
                </view>
              </view>
              <view class="slots-row">
                <view class="slots-cell name-cell">
                  right
                </view>
                <view class="slots-cell desc-cell">
                  导航栏右侧内容区域，默认为空
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="demo-section">
          <view class="section-header">
            <text class="section-title">
              不同颜色
            </text>
            <text class="section-desc">
              导航栏支持多种颜色搭配
            </text>
          </view>

          <view class="navbar-examples">
            <NavBar
              title="珊瑚色导航栏"
              background-color="#FF7E6A"
              title-color="white"
              :fixed="false"
              :show-block="false"
            />

            <NavBar
              title="蓝色导航栏"
              background-color="#409EFF"
              title-color="white"
              :fixed="false"
              :show-block="false"
              style="margin-top: 16px;"
            />

            <NavBar
              title="绿色导航栏"
              background-color="#67C23A"
              title-color="white"
              :fixed="false"
              :show-block="false"
              style="margin-top: 16px;"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="css">
.navbar-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
}

.page-container {
  flex: 1;
  padding: 20px 16px 40px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title-main {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.page-description {
  font-size: 14px;
  color: #666;
  display: block;
}

/* 预览区域 */
.preview-section {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.preview-section--collapsed {
  padding-bottom: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.preview-toggle {
  font-size: 14px;
  color: #FF7E6A;
  cursor: pointer;
}

.preview-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 12px;
}

/* 导航栏预览 */
.navbar-preview-container {
  width: 100%;
  background-color: #FF7E6A;
  border-radius: 8px;
  overflow: hidden;
}

.navbar-preview {
  height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.navbar-preview--border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.navbar-back {
  display: flex;
  align-items: center;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.back-icon {
  width: 12px;
  height: 12px;
  border-top: 2px solid white;
  border-left: 2px solid white;
  transform: rotate(-45deg);
  margin-right: 4px;
}

.back-text {
  font-size: 16px;
  color: white;
}

.navbar-title {
  position: absolute;
  left: 60px;
  right: 60px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar-title--center {
  text-align: center;
}

/* 主内容区 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 配置面板 */
.config-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.panel-section {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.code-block {
  margin-top: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-content {
  font-family: monospace;
  font-size: 14px;
  white-space: pre;
  color: #555;
  line-height: 1.5;
}

/* 配置项 */
.config-item {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-label {
  font-size: 14px;
  color: #666;
}

.config-input {
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
}

/* 开关组 */
.toggle-group {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-label {
  font-size: 14px;
  color: #333;
}

/* 颜色设置 */
.color-section {
  margin-top: 16px;
}

.section-subtitle {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 12px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
}

.color-box {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-box.active {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* API表格 */
.api-panel {
  margin-top: 0;
}

.api-table {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

.api-row {
  display: flex;
  border-bottom: 1px solid #eee;
}

.api-row:last-child {
  border-bottom: none;
}

.api-row.header {
  background-color: #f5f7fa;
  font-weight: 600;
}

.api-cell {
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
}

.prop-cell {
  width: 20%;
  font-weight: 500;
}

.type-cell {
  width: 20%;
  color: #E91E63;
}

.default-cell {
  width: 15%;
  color: #666;
}

.desc-cell {
  flex: 1;
  color: #555;
}

/* 演示区域 */
.demo-panel {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-section {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 4px;
}

.section-desc {
  font-size: 14px;
  color: #666;
}

/* 演示块 */
.demo-block {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.demo-navbar {
  height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.demo-back {
  display: flex;
  align-items: center;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.demo-back-icon {
  width: 12px;
  height: 12px;
  border-top: 2px solid white;
  border-left: 2px solid white;
  transform: rotate(-45deg);
  margin-right: 4px;
}

.demo-back-text {
  font-size: 16px;
  color: white;
}

.demo-title {
  position: absolute;
  left: 60px;
  right: 60px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
}

.demo-title-dark {
  color: #333;
}

.demo-custom-left, .demo-custom-right {
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
}

.demo-custom-left {
  left: 16px;
}

.demo-custom-right {
  right: 16px;
}

.demo-icon {
  font-size: 18px;
  color: #333;
}

.navbar-examples {
  display: flex;
  flex-direction: column;
}

/* 响应式样式 */
@media (min-width: 768px) {
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }

  .main-content {
    flex-direction: row;
  }

  .config-panel {
    flex: 1;
  }

  .api-panel {
    flex: 1;
    margin-top: 0;
  }
}

/* 导航栏示例 */
.navbar-examples {
  display: flex;
  flex-direction: column;
}

.demo-navbar {
  height: 44px;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.demo-title {
  flex: 1;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
}

.demo-title-dark {
  color: #333;
}

.demo-custom-left, .demo-custom-right {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
}

.demo-icon {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* 插槽文档样式 */
.slots-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.slots-table {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

.slots-row {
  display: flex;
  border-bottom: 1px solid #ebeef5;
}

.slots-row:last-child {
  border-bottom: none;
}

.slots-row.header {
  background-color: #f5f7fa;
}

.slots-cell {
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
}

.name-cell {
  width: 30%;
  color: #FF7E6A;
  font-weight: 500;
  border-right: 1px solid #ebeef5;
}

.desc-cell {
  flex: 1;
  color: #606266;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "导航栏组件",
    "navigationStyle": "custom"
  }
}
</route>
