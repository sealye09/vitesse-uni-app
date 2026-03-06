<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";

definePage({
  tabBar: { index: 1, text: "Me" },
  style: {
    navigationBarTitleText: "我的",
  },
});

const menuItems = [
  { icon: "i-ph-user", label: "个人资料" },
  { icon: "i-ph-heart", label: "我的收藏" },
  { icon: "i-ph-gear", label: "设置" },
  { icon: "i-ph-question", label: "帮助与反馈" },
];

function handleMenuClick(label: string) {
  uni.showToast({
    icon: "none",
    title: `点击了 ${label}`,
  });
}
</script>

<template>
  <view class="flex flex-col bg-bg-base px-6 py-8">
    <!-- Profile Card -->
    <view
      class="mb-4 flex items-center gap-4 rounded-lg border border-border-base bg-bg-card p-4"
    >
      <view
        class="flex size-14 shrink-0 items-center justify-center rounded-full bg-bg-active"
      >
        <view class="i-ph-user text-2xl text-text-secondary" />
      </view>
      <view class="flex flex-col">
        <text class="text-base font-medium text-text-primary">游客用户</text>
        <text class="mt-0.5 text-sm text-text-tertiary">ID: 8832741</text>
      </view>
    </view>

    <!-- Stats Row -->
    <view
      class="mb-4 flex items-center justify-around rounded-lg border border-border-base bg-bg-card p-4"
    >
      <view class="flex flex-1 flex-col items-center">
        <text class="text-xl font-semibold text-text-primary">12</text>
        <text class="mt-1 text-xs text-text-tertiary">收藏</text>
      </view>
      <view class="h-8 w-px bg-border-base" />
      <view class="flex flex-1 flex-col items-center">
        <text class="text-xl font-semibold text-text-primary">48</text>
        <text class="mt-1 text-xs text-text-tertiary">足迹</text>
      </view>
      <view class="h-8 w-px bg-border-base" />
      <view class="flex flex-1 flex-col items-center">
        <text class="text-xl font-semibold text-text-primary">256</text>
        <text class="mt-1 text-xs text-text-tertiary">积分</text>
      </view>
    </view>

    <!-- Menu Card -->
    <view
      class="mb-4 overflow-hidden rounded-lg border border-border-base bg-bg-card"
    >
      <view
        v-for="item in menuItems"
        :key="item.label"
        class="flex cursor-pointer items-center gap-3 border-b border-border-base px-4 py-3 active:bg-bg-active"
        @click="handleMenuClick(item.label)"
      >
        <view
          class="flex size-8 items-center justify-center rounded-md bg-bg-active"
        >
          <view class="text-base text-text-secondary" :class="item.icon" />
        </view>
        <text class="flex-1 text-sm text-text-primary">
          {{ item.label }}
        </text>
        <view class="i-ph-caret-right text-xs text-text-tertiary" />
      </view>
    </view>
  </view>
</template>
