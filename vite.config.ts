import Uni from "@uni-helper/plugin-uni";
import UniHelperLayouts from "@uni-helper/vite-plugin-uni-layouts";
import UniHelperManifest from "@uni-helper/vite-plugin-uni-manifest";
import UniHelperPages from "@uni-helper/vite-plugin-uni-pages";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import UniPolyfill from "vite-plugin-uni-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UniHelperManifest(),
    UniHelperPages({
      dts: "types/uni-pages.d.ts",
      subPackages: ["pages-sub"],
    }),
    UniHelperLayouts(),
    Uni(),
    UniPolyfill(),
    UnoCSS(),
  ],
});
