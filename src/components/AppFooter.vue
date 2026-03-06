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
  <view class="mt-auto flex flex-col items-center pb-6 pt-8">
    <view class="mb-6 h-px w-full max-w-[280px] bg-border" />

    <view class="flex items-center gap-6">
      <!-- 使用 view 模拟首页按钮 -->
      <view
        class="flex cursor-pointer flex-col items-center gap-1.5 active:opacity-70"
        @click="goHome"
      >
        <view class="i-ph-house text-lg text-muted-foreground" />
        <text class="text-xs text-muted-foreground">Home</text>
      </view>

      <!-- 使用 view 模拟 GitHub 按钮 -->
      <view
        class="flex cursor-pointer flex-col items-center gap-1.5 active:opacity-70"
        @click="handleClickGithub"
      >
        <view class="i-ph-github-logo text-lg text-muted-foreground" />
        <text class="text-xs text-muted-foreground">GitHub</text>
      </view>

      <!-- 主题切换按钮 -->
      <view
        class="flex cursor-pointer flex-col items-center gap-1.5 active:opacity-70"
        @click="switchTheme"
      >
        <view
          class="text-lg text-muted-foreground"
          :class="isDark ? 'i-ph-moon' : 'i-ph-sun'"
        />
        <text class="text-xs text-muted-foreground">
          {{ isDark ? "Light" : "Dark" }}
        </text>
      </view>
    </view>
  </view>
</template>
