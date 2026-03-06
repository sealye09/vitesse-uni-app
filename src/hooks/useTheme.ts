import { computed, nextTick, ref } from "vue";

import { getSystemTheme, toCssVars } from "@/utils";

import themeConfig from "../theme.json";

export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "app-theme";

const currentTheme = ref<ThemeMode>("light");

export function useTheme() {
  const theme = computed(() => themeConfig[currentTheme.value]);
  const isDark = computed(() => currentTheme.value === "dark");

  // 设置导航栏颜色
  const setNavigationBar = () => {
    uni.setNavigationBarColor({
      frontColor: theme.value["nav-front-color"],
      backgroundColor: theme.value["nav-bg-color"],
    });
  };

  // 设置 TabBar 样式
  const setTabBar = () => {
    uni.setTabBarStyle({
      color: theme.value["tab-color"],
      selectedColor: theme.value["tab-selected-color"],
      backgroundColor: theme.value["tab-bg-color"],
      borderStyle: theme.value["tab-border-style"],
    });
  };

  const setTheme = (mode: ThemeMode) => {
    currentTheme.value = mode;
    uni.setStorageSync(THEME_STORAGE_KEY, mode);
  };

  const setBackgroundColor = () => {
    // #ifndef H5
    uni.setBackgroundTextStyle({
      textStyle: theme.value.backgroundTextStyle,
    });
    // #endif

    // #ifdef H5
    // #endif
  };

  const toggleTheme = () => {
    setTheme(currentTheme.value === "light" ? "dark" : "light");
  };

  const initTheme = () => {
    const savedTheme = uni.getStorageSync(THEME_STORAGE_KEY);

    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      currentTheme.value = savedTheme;
    } else {
      // 没有本地存储，获取系统主题
      currentTheme.value = getSystemTheme();
    }

    nextTick(() => {
      setNavigationBar();
      setTabBar();
      setBackgroundColor();
    });
  };

  const cssVars = computed((): Record<string, string> => {
    return toCssVars(theme.value);
  });

  return {
    currentTheme,
    theme,
    isDark,
    cssVars,
    setTheme,
    toggleTheme,
    initTheme,
    setNavigationBar,
    setTabBar,
    setBackgroundColor,
  };
}
