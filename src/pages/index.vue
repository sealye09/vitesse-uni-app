<script setup lang="ts">
import AppLogos from "@/components/AppLogos.vue";
import InputEntry from "@/components/InputEntry.vue";

defineOptions({
  name: "IndexPage",
});

definePage({
  type: "home",
  layout: "home",
  style: {
    enablePullDownRefresh: true,
    navigationBarTitleText: "首页",
  },
});
</script>

<template>
  <view class="flex flex-col bg-background">
    <view class="flex flex-1 flex-col items-center px-4 pt-8">
      <AppLogos />
      <InputEntry />
    </view>
  </view>
</template>
