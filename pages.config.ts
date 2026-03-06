import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

import { tabbarList } from "./src/tabbar";

export default defineUniPages({
  globalStyle: {
    navigationBarTitleText: "Vitesse-Uni",
    navigationBarBackgroundColor: "@nav-bg-color",
    navigationBarTextStyle: "@nav-txt-style",

    backgroundTextStyle: "@backgroundTextStyle",
  },
  tabBar: {
    backgroundColor: "@tab-bg-color",
    borderStyle: "@tab-border-style",
    color: "@tab-color",
    selectedColor: "@tab-selected-color",
    list: tabbarList,
  },
});
