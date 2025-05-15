<script setup lang="ts">
import Button from '@/components/Coral-Button.vue'
</script>

<template>
  <view class="button-page">
    <Button text="主要按钮"></Button>
    <Button text="镂空按钮" type="outline"></Button>
    <Button text="禁用按钮" disabled></Button>
    
    <Button text="次要按钮" type="secondary"></Button>
    <Button text="次要镂空" type="secondary" outline></Button>
    
    <Button text="图标按钮" icon="smile"></Button>
    <Button text="图标按钮" icon="smile" endIcon="smile"></Button>
  </view>
</template>

<style scoped>
.button-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
