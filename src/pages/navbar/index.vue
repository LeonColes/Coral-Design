<script setup lang="ts">
import CoralNavBar from '@/components/navbar/index.vue'
import { ref } from 'vue'

// 标题状态
const title = ref('导航栏组件')

// 标题是否居中
const titleCenter = ref(true)
function toggleTitleCenter() {
  titleCenter.value = !titleCenter.value
}

// 是否显示返回按钮
const showBack = ref(true)
function toggleShowBack() {
  showBack.value = !showBack.value
}

// 是否显示下边框
const showBorder = ref(true)
function toggleShowBorder() {
  showBorder.value = !showBorder.value
}

// 导航栏背景色
const backgroundColor = ref('#ffffff')
const bgColors = [
  { name: '白色', value: '#ffffff' },
  { name: '珊瑚色', value: '#FF7E6A' },
  { name: '蓝色', value: '#409EFF' },
  { name: '绿色', value: '#67C23A' },
]

// 标题颜色
const titleColor = ref('#333333')
const textColors = [
  { name: '黑色', value: '#333333' },
  { name: '白色', value: '#ffffff' },
  { name: '灰色', value: '#909399' },
]

// 自定义返回事件
function onBackClick() {
  uni.showToast({
    title: '点击了返回按钮',
    icon: 'none',
  })
}

// 返回上级页面
function returnBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="navbar-page">
    <!-- 使用自定义导航栏组件 -->
    <CoralNavBar
      :title="title"
      :title-center="titleCenter"
      :show-back="showBack"
      :border="showBorder"

      fixed
      @back-click="onBackClick"
    >
      <!-- 自定义右侧内容 -->
      <template #left>
        <view class="custom-left" @click="returnBack">
          <text class="left-text">
            返回
          </text>
        </view>
      </template>
    </CoralNavBar>

    <!-- 页面内容 -->
    <view class="page-content">
      <view class="section-title">
        导航栏组件 NavBar
      </view>
      <view class="section-desc">
        适用于小程序和App的顶部导航栏组件，能够自动适配不同设备的状态栏、安全区域和小程序胶囊按钮
      </view>

      <!-- 配置区 -->
      <view class="config-panel">
        <view class="config-item">
          <text class="config-label">
            标题
          </text>
          <input v-model="title" class="config-input" placeholder="请输入标题">
        </view>

        <view class="config-item">
          <text class="config-label">
            标题居中
          </text>
          <view class="switch" :class="{ 'switch--active': titleCenter }" @click="toggleTitleCenter">
            <view class="switch__handle" />
          </view>
        </view>

        <view class="config-item">
          <text class="config-label">
            显示返回按钮
          </text>
          <view class="switch" :class="{ 'switch--active': showBack }" @click="toggleShowBack">
            <view class="switch__handle" />
          </view>
        </view>

        <view class="config-item">
          <text class="config-label">
            显示下边框
          </text>
          <view class="switch" :class="{ 'switch--active': showBorder }" @click="toggleShowBorder">
            <view class="switch__handle" />
          </view>
        </view>

        <view class="config-item column">
          <text class="config-label">
            背景色
          </text>
          <view class="color-selector">
            <view
              v-for="(color, index) in bgColors"
              :key="index"
              class="color-item"
              :class="{ active: backgroundColor === color.value }"
              :style="{ backgroundColor: color.value }"
              @click="backgroundColor = color.value"
            >
              <text class="color-name" :style="{ color: color.value === '#ffffff' ? '#333' : '#fff' }">
                {{ color.name }}
              </text>
            </view>
          </view>
        </view>

        <view class="config-item column">
          <text class="config-label">
            文字颜色
          </text>
          <view class="color-selector">
            <view
              v-for="(color, index) in textColors"
              :key="index"
              class="color-item"
              :class="{ active: titleColor === color.value }"
              :style="{ backgroundColor: color.value }"
              @click="titleColor = color.value"
            >
              <text class="color-name" :style="{ color: color.value === '#ffffff' ? '#333' : '#fff' }">
                {{ color.name }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- API说明 -->
      <view class="api-section">
        <view class="section-title">
          API 说明
        </view>

        <view class="api-table">
          <view class="api-table-header">
            <text class="api-cell prop">
              属性
            </text>
            <text class="api-cell type">
              类型
            </text>
            <text class="api-cell default">
              默认值
            </text>
            <text class="api-cell desc">
              说明
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              title
            </text>
            <text class="api-cell type">
              String
            </text>
            <text class="api-cell default">
              ''
            </text>
            <text class="api-cell desc">
              标题文字
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              showBack
            </text>
            <text class="api-cell type">
              Boolean
            </text>
            <text class="api-cell default">
              true
            </text>
            <text class="api-cell desc">
              是否显示返回按钮
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              titleCenter
            </text>
            <text class="api-cell type">
              Boolean
            </text>
            <text class="api-cell default">
              true
            </text>
            <text class="api-cell desc">
              标题是否居中显示
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              backgroundColor
            </text>
            <text class="api-cell type">
              String
            </text>
            <text class="api-cell default">
              #ffffff
            </text>
            <text class="api-cell desc">
              导航栏背景颜色
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              titleColor
            </text>
            <text class="api-cell type">
              String
            </text>
            <text class="api-cell default">
              #333333
            </text>
            <text class="api-cell desc">
              标题文字颜色
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              fixed
            </text>
            <text class="api-cell type">
              Boolean
            </text>
            <text class="api-cell default">
              true
            </text>
            <text class="api-cell desc">
              是否固定在顶部
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              border
            </text>
            <text class="api-cell type">
              Boolean
            </text>
            <text class="api-cell default">
              true
            </text>
            <text class="api-cell desc">
              是否显示下边框
            </text>
          </view>
        </view>

        <!-- 插槽说明 -->
        <view class="section-title">
          插槽 Slots
        </view>
        <view class="api-table">
          <view class="api-table-header">
            <text class="api-cell prop">
              名称
            </text>
            <text class="api-cell desc-full">
              说明
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              left
            </text>
            <text class="api-cell desc-full">
              自定义左侧内容，默认显示返回按钮
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              center
            </text>
            <text class="api-cell desc-full">
              自定义中间内容，默认显示标题
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              right
            </text>
            <text class="api-cell desc-full">
              自定义右侧内容
            </text>
          </view>
        </view>

        <!-- 事件说明 -->
        <view class="section-title">
          事件 Events
        </view>
        <view class="api-table">
          <view class="api-table-header">
            <text class="api-cell prop">
              事件名
            </text>
            <text class="api-cell desc-full">
              说明
            </text>
          </view>

          <view class="api-table-row">
            <text class="api-cell prop">
              backClick
            </text>
            <text class="api-cell desc-full">
              点击返回按钮时触发
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.navbar-page {
  background-color: #f7f9fc;
  min-height: 100vh;
}

.page-content {
  padding: 24px 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.section-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 24px;
}

.config-panel {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.config-item.column {
  flex-direction: column;
  align-items: flex-start;
}

.config-item:last-child {
  border-bottom: none;
}

.config-label {
  font-size: 15px;
  color: #333;
}

.config-input {
  width: 200px;
  height: 36px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
}

.switch {
  width: 52px;
  height: 28px;
  background-color: #eee;
  border-radius: 14px;
  position: relative;
  transition: background-color 0.3s;
}

.switch--active {
  background-color: #FF7E6A;
}

.switch__handle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 2px;
  top: 2px;
  transition: transform 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.switch--active .switch__handle {
  transform: translateX(24px);
}

.color-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.color-item {
  width: 80px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.color-item.active {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-item.active::after {
  content: "";
  position: absolute;
  right: -4px;
  top: -4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #FF7E6A;
}

.color-name {
  font-size: 12px;
}

.api-section {
  margin-top: 24px;
}

.api-table {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.api-table-header {
  display: flex;
  background-color: #f5f7fa;
  font-weight: 500;
}

.api-table-row {
  display: flex;
  border-top: 1px solid #eee;
}

.api-cell {
  padding: 12px;
  font-size: 14px;
  line-height: 1.4;
}

.api-cell.prop {
  width: 22%;
  color: #FF7E6A;
  font-family: monospace;
}

.api-cell.type {
  width: 18%;
  color: #1989fa;
}

.api-cell.default {
  width: 20%;
  font-family: monospace;
}

.api-cell.desc {
  flex: 1;
}

.api-cell.desc-full {
  flex: 1;
}

.custom-right {
  padding: 0 12px;
}

.right-text {
  color: #FF7E6A;
  font-size: 14px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
