<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { computed, provide, toRef } from "vue";

import type { ThemeMode } from "@/hooks/useTheme";

import { useTheme } from "@/hooks/useTheme";

const props = defineProps<{
  theme?: ThemeMode;
}>();

const { currentTheme, theme, isDark, cssVars, initTheme } = useTheme();

// 优先使用 props 传入的主题，否则使用 hook 中的全局主题
const activeTheme = computed(() => props.theme || currentTheme.value);

onLoad(() => {
  initTheme();
});

provide("theme", {
  theme: toRef(() => theme.value),
  isDark,
});
</script>

<template>
  <view :class="activeTheme" :style="cssVars">
    <slot></slot>
  </view>
</template>
