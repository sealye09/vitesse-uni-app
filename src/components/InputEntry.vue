<script setup lang="ts">
import { ref } from "vue";

const name = ref("");

function go() {
  if (name.value) {
    uni.navigateTo({
      url: `/pages/hi?name=${name.value}`,
    });
  }
}
</script>

<template>
  <view class="mt-8 w-full max-w-[280px]">
    <view
      class="w-full rounded-md border border-border-base bg-bg-card px-3 py-2.5 transition-colors focus-within:border-color-primary"
    >
      <input
        v-model="name"
        autocomplete="off"
        class="w-full bg-transparent text-sm text-text-primary outline-none"
        placeholder="What's your name?"
        type="text"
      />
    </view>

    <!-- 使用 view 模拟 button -->
    <view
      class="mt-4 w-full cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
      :class="
        name
          ? 'bg-color-primary text-white active:bg-color-primary-active'
          : 'bg-bg-disabled text-text-disabled cursor-not-allowed'
      "
      @click="go"
    >
      <text>Continue</text>
    </view>
  </view>
</template>
