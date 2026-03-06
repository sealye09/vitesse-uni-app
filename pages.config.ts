import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

export default defineUniPages({
  globalStyle: {
    navigationBarBackgroundColor: "@nav-bg-color",
    navigationBarTextStyle: "@nav-txt-style",
    navigationBarTitleText: "Vitesse-Uni",
  },
  tabBar: {
    backgroundColor: "@tab-bg-color",
    borderStyle: "@tab-border-style",
    color: "@tab-color",
    selectedColor: "@tab-selected-color",
  },
});
