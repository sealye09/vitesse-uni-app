import type { ThemeMode } from "@/hooks/useTheme";

/**
 * 将对象的所有键添加 CSS 变量前缀 --
 * @param themeJson - 主题配置对象
 * @returns 带 -- 前缀的 CSS 变量对象
 */
export function toCssVars(
  themeJson: Record<string, unknown>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(themeJson)) {
    if (typeof value === "string") {
      result[`--${key}`] = value;
    }
  }
  return result;
}

/**
 * 将驼峰命名转换为短横线命名
 * @param str - 驼峰格式字符串，如 primaryDark
 * @returns 短横线格式字符串，如 primary-dark
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * 获取系统当前的主题模式
 * @returns 主题模式 'light' | 'dark'
 */
export function getSystemTheme(): ThemeMode {
  let theme: ThemeMode = "light";

  // #ifdef H5
  const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (mediaQuery?.matches) {
    theme = "dark";
  }
  // #endif

  // #ifdef MP-WEIXIN
  try {
    const info = uni.getSystemInfoSync();
    if (info.theme === "dark") {
      theme = "dark";
    }
  } catch {
    console.error("获取系统信息失败");
    theme = "light";
  }
  // #endif

  return theme;
}
