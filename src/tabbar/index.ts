import type { TabBarItem } from "@uni-helper/vite-plugin-uni-pages";

export const tabbarList: TabBarItem[] = [
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
];
