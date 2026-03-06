<script setup lang="ts">
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
  <view class="flex flex-col bg-background px-6 py-8">
    <!-- Profile Card -->
    <view
      class="mb-4 flex items-center gap-4 rounded-lg border border-border bg-card p-4"
    >
      <view
        class="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted"
      >
        <view class="i-ph-user text-2xl text-muted-foreground" />
      </view>
      <view class="flex flex-col">
        <text class="text-base font-medium text-foreground">游客用户</text>
        <text class="mt-0.5 text-sm text-muted-foreground">ID: 8832741</text>
      </view>
    </view>

    <!-- Stats Row -->
    <view
      class="mb-4 flex items-center justify-around rounded-lg border border-border bg-card p-4"
    >
      <view class="flex flex-1 flex-col items-center">
        <text class="text-xl font-semibold text-foreground">12</text>
        <text class="mt-1 text-xs text-muted-foreground">收藏</text>
      </view>
      <view class="h-8 w-px bg-border" />
      <view class="flex flex-1 flex-col items-center">
        <text class="text-xl font-semibold text-foreground">48</text>
        <text class="mt-1 text-xs text-muted-foreground">足迹</text>
      </view>
      <view class="h-8 w-px bg-border" />
      <view class="flex flex-1 flex-col items-center">
        <text class="text-xl font-semibold text-foreground">256</text>
        <text class="mt-1 text-xs text-muted-foreground">积分</text>
      </view>
    </view>

    <!-- Menu Card -->
    <view class="mb-4 overflow-hidden rounded-lg border border-border bg-card">
      <view
        v-for="item in menuItems"
        :key="item.label"
        class="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 active:bg-muted"
        @click="handleMenuClick(item.label)"
      >
        <view
          class="flex size-8 items-center justify-center rounded-md bg-muted"
        >
          <view class="text-base text-muted-foreground" :class="item.icon" />
        </view>
        <text class="flex-1 text-sm text-foreground">
          {{ item.label }}
        </text>
        <view class="i-ph-caret-right text-xs text-muted-foreground" />
      </view>
    </view>
  </view>
</template>
