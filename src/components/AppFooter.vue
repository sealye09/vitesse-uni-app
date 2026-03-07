<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme";

defineOptions({
  name: "AppFooter",
  options: {
    virtualHost: true,
  },
});

function handleClickGithub() {
  if (window?.open) {
    window.open("https://github.com/uni-helper/vitesse-uni-app");
  } else {
    uni.showToast({
      icon: "none",
      title: "请使用浏览器打开",
    });
  }
}

function goHome() {
  uni.switchTab({
    url: "/pages/index",
  });
}

const { toggleTheme, isDark, setNavigationBar, setTabBar, setBackgroundColor } =
  useTheme();

const switchTheme = () => {
  toggleTheme();
  // 切换主题后分别设置导航栏和TabBar
  setNavigationBar();
  setTabBar();
  setBackgroundColor();
};
</script>

<template>
  <view class="mt-auto flex flex-col items-center py-6">
    <view class="mb-6 h-px w-full max-w-[280px] bg-border" />

    <view class="flex items-center gap-6">
      <view
        class="flex cursor-pointer flex-col items-center gap-2 p-4"
        @click="goHome"
      >
        <view class="i-ph-house text-2xl text-muted-foreground" />
        <text class="text-xs text-muted-foreground">Home</text>
      </view>

      <view
        class="flex cursor-pointer flex-col items-center gap-2 p-4"
        @click="handleClickGithub"
      >
        <view class="i-ph-github-logo text-2xl text-muted-foreground" />
        <text class="text-xs text-muted-foreground">GitHub</text>
      </view>

      <view
        class="flex cursor-pointer flex-col items-center gap-2 p-4"
        @click="switchTheme"
      >
        <view
          class="text-2xl text-muted-foreground"
          :class="isDark ? 'i-ph-moon' : 'i-ph-sun'"
        />
        <text class="text-xs text-muted-foreground">
          {{ isDark ? "Light" : "Dark" }}
        </text>
      </view>
    </view>
  </view>
</template>
