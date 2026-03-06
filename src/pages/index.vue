<script setup lang="ts">
import AppLogos from "@/components/AppLogos.vue";
import InputEntry from "@/components/InputEntry.vue";

definePage({
  type: "home",
  layout: "home",
  tabBar: { index: 0, text: "Home" },
  style: {
    navigationBarTitleText: "首页",
  },
});
</script>

<template>
  <view class="flex flex-col bg-bg-base">
    <view class="flex flex-1 flex-col items-center px-4 pt-8">
      <AppLogos />
      <InputEntry />
    </view>
  </view>
</template>
