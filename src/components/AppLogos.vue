<script setup lang="ts">
defineOptions({
  name: "AppLogos",
  options: {
    virtualHost: true,
  },
});
</script>

<template>
  <view class="mt-12 flex flex-col items-center">
    <image alt="logo" class="mb-4 size-16" src="/static/logo.svg" />
    <view class="flex flex-col items-center">
      <text class="text-2xl font-semibold tracking-tight text-foreground">
        Vitesse
      </text>
      <view class="my-2 h-px w-8 bg-border" />
      <text class="text-sm text-muted-foreground">uni-app Starter</text>
    </view>
  </view>
</template>
