<script setup lang="ts">
import { useCount } from "@/hooks/useCount";

const { count, inc, dec } = useCount();
</script>

<template>
  <view class="my-3 flex items-center justify-center">
    <view class="btn" @click="dec()">
      <text class="i-ph-minus" />
    </view>
    <view class="w-15 mx-4 inline-block font-mono">
      {{ count }}
    </view>
    <view class="btn" @click="inc()">
      <text class="i-ph-plus" />
    </view>
  </view>
</template>

<style>
.btn {
  @apply w-8 h-8 flex items-center justify-center rounded-full bg-teal-600
    text-white cursor-pointer;
}
</style>
