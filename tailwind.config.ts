import type { Config } from "tailwindcss";

import {
  dynamicIconsPlugin,
  getIconCollections,
  iconsPlugin,
} from "@egoist/tailwindcss-icons";
import cssMacro from "weapp-tailwindcss/css-macro";

import { getLocalCollections } from "./build/icon";
import { isMp } from "./platform";

const config: Config = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
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
