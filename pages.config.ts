import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  // pages: [],
  globalStyle: {
    backgroundColor: "@bgColor",
    backgroundColorBottom: "@bgColorBottom",
    backgroundColorTop: "@bgColorTop",
    backgroundTextStyle: "@bgTxtStyle",
    navigationBarBackgroundColor: "#000000",
    navigationBarTextStyle: "@navTxtStyle",
    navigationBarTitleText: "Vitesse-Uni",
    navigationStyle: "custom",
  },
  // tabBar: {
  //   backgroundColor: "@tabBgColor",
  //   borderStyle: "@tabBorderStyle",
  //   color: "@tabFontColor",
  //   selectedColor: "@tabSelectedColor",
  // },
});
