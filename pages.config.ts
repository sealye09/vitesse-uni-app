import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

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
    list: [
      {
        // index is required
        index: 0,
        text: "Home",
        pagePath: "pages/index",
        iconPath: "static/tabbar/home.png",
        selectedIconPath: "static/tabbar/home-active.png",
      },
      {
        index: 1,
        text: "Me",
        pagePath: "pages/me",
        iconPath: "static/tabbar/me.png",
        selectedIconPath: "static/tabbar/me-active.png",
      },
    ],
  },
});
