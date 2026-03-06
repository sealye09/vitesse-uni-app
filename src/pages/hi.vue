<script lang="ts" setup>
import HiCounter from "@/components/HiCounter.vue";
import { useQueryParams } from "@/hooks/useQueryParams";

defineOptions({
  name: "HiPage",
});

definePage({
  layout: "home",
  style: {
    navigationBarTitleText: "Hi",
  },
});

const { value: name } = useQueryParams("name");
</script>

<template>
  <view class="flex flex-col bg-background">
    <view class="flex flex-1 flex-col items-center px-4 pt-12">
      <view class="mb-6 flex flex-col items-center">
        <text class="text-sm text-muted-foreground">Hello,</text>
        <text class="mt-1 text-2xl font-semibold text-foreground">
          {{ name || "Stranger" }}
        </text>
      </view>

      <HiCounter />
    </view>
  </view>
</template>
