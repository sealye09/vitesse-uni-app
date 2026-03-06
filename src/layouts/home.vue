<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import ConfigProvider from "@/components/ConfigProvider.vue";
import { useTheme } from "@/hooks/useTheme";

const { toggleTheme, isDark, setNavigationBar, setTabBar } = useTheme();

const switchTheme = () => {
  toggleTheme();
  // 切换主题后分别设置导航栏和TabBar
  setNavigationBar();
  setTabBar();
};
</script>

<template>
  <ConfigProvider>
    <view
      class="min-h-screen px-10 py-20 text-center"
      :style="{ backgroundColor: 'var(--bg-base)' }"
    >
      <slot></slot>

      <!-- 主题切换按钮 -->
      <view class="mt-8 flex justify-center gap-4">
        <button
          class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          :style="{
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
          }"
          @tap="switchTheme"
        >
          切换主题 ({{ isDark ? "深色" : "浅色" }})
        </button>
      </view>

      <AppFooter />
      <view
        class="mx-auto mt-5 text-center text-sm opacity-25"
        :style="{ color: 'var(--text-secondary)' }"
      >
        [Home Layout]
      </view>
    </view>
  </ConfigProvider>
</template>
