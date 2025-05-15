<script setup lang="ts">
import handlePath from '../utils/handlePath'

defineProps({
  text: {
    type: String,
    default: 'Button',
  },
  icon: {
    type: String,
    default: '',
  },
  endIcon: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'disabled'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <view
    class="coral-button"
    :class="[`coral-button--${disabled ? 'disabled' : type}`]"
    :disabled="disabled"
  >
    <img
      v-if="icon"
      class="coral-icon"
      :src="handlePath(icon)"
      alt="icon"
    >
    <text class="coral-text">
      {{ text }}
    </text>
    <img
      v-if="endIcon"
      class="coral-icon"
      :src="handlePath(endIcon)"
      alt="end-icon"
    >
  </view>
</template>

<style scoped>
.coral-button {
  display: flex;
  min-width: 62px;
  width: 100%;
  height: 24px;
  padding: 3px 7px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;
  gap: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.coral-button--primary {
  background: #FF7E6A;
  color: #FFFFFF;
}
.coral-button--primary:hover {
  background: #E55C48;
}

.coral-button--secondary {
  background: #3ECDC4;
  color: #FFFFFF;
}
.coral-button--secondary:hover {
  background: #35A39B;
}

.coral-button--outline {
  background: transparent;
  border: 1px solid #FF7E6A;
  color: #FF7E6A;
}
.coral-button--outline:hover {
  background: #FFD6D0;
}

.coral-button--disabled {
  background: #E0E0E0;
  color: #9E9E9E;
  cursor: not-allowed;
}

.coral-icon {
  width: 15px;
  height: 15px;
}

.coral-text {
  font-size: 12px;
  font-weight: 500;
  color: inherit;
}
</style>
