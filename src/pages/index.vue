<script setup lang="ts">
function handleClick(path: string) {
  uni.navigateTo({
    url: `/pages/${path}`,
  })
}
</script>

<template>
  <view class="screen">
    <button @click="handleClick('button')">
      Button
    </button>
  </view>
</template>

<style scoped>
.screen {
  width: 700rpx;
  height: 1624rpx;
  /* background: F5F5F5; */
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>

<route type="home" lang="json">
{}
</route>
