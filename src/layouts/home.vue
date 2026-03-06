<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import ConfigProvider from "@/components/ConfigProvider.vue";
</script>

<template>
  <ConfigProvider>
    <view class="h-full bg-background text-center text-foreground">
      <slot></slot>
      <AppFooter />
      <view class="mx-auto mt-5 text-center text-sm text-foreground opacity-25">
        [Home Layout]
      </view>
    </view>
  </ConfigProvider>
</template>
