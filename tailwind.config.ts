import type { Config } from "tailwindcss";

import {
  dynamicIconsPlugin,
  getIconCollections,
  iconsPlugin,
} from "@egoist/tailwindcss-icons";
import { isMp } from "@uni-helper/uni-env";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import cssMacro from "weapp-tailwindcss/css-macro";

import { getLocalCollections } from "./build/icon";

/**
 * 从 theme.json 读取主题变量并生成 tailwindcss colors 配置
 * 生成格式: { "bg-active": "var(--bg-active)", ... }
 */
function getThemeColors() {
  const themePath = resolve(__dirname, "src/theme.json");
  const themeData = JSON.parse(readFileSync(themePath, "utf-8"));

  // 合并 light 和 dark 主题的所有键
  const keys = new Set([
    ...Object.keys(themeData.light || {}),
    ...Object.keys(themeData.dark || {}),
  ]);

  const colors: Record<string, string> = {};
  for (const key of keys) {
    colors[key] = `var(--${key})`;
  }

  return colors;
}

const themeColors = getThemeColors();

const config: Config = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: themeColors,
    },
  },
  // https://tw.icebreaker.top/docs/quick-start/uni-app-css-macro
  plugins: [
    cssMacro({
      variantsMap: {
        wx: "MP-WEIXIN",
        "-wx": {
          value: "MP-WEIXIN",
          negative: true,
        },
      },
    }),
    iconsPlugin({
      collections: {
        ...getIconCollections(["ph"]),
        custom: getLocalCollections("./src/icons/custom", "custom"),
      },
    }),
    dynamicIconsPlugin(),
  ],
  corePlugins: {
    // 小程序去使用 h5 的 preflight 和响应式 container 没有意义
    preflight: !isMp,
    container: !isMp,
  },
};

export default config;
