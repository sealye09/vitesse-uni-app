<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import ConfigProvider from "@/components/ConfigProvider.vue";

defineOptions({
  name: "DefaultLayout",
  options: {
    virtualHost: true,
  },
});
</script>

<template>
  <ConfigProvider>
    <view class="h-full min-h-screen bg-background text-foreground">
      <slot></slot>
      <AppFooter />
      <view class="mx-auto mt-5 text-center text-sm text-foreground opacity-25">
        [Default Layout]
      </view>
    </view>
  </ConfigProvider>
</template>
