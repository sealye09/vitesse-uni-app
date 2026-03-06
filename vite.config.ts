import type { AcceptedPlugin } from "postcss";

import Uni from "@uni-helper/plugin-uni";
import { isApp, isH5 } from "@uni-helper/uni-env";
import UniHelperLayouts from "@uni-helper/vite-plugin-uni-layouts";
import UniHelperManifest from "@uni-helper/vite-plugin-uni-manifest";
import UniHelperPages from "@uni-helper/vite-plugin-uni-pages";
import UniPlatform from "@uni-helper/vite-plugin-uni-platform";
import autoprefixer from "autoprefixer";
import path from "node:path";
import process from "node:process";
import remToRpx from "postcss-rem-to-responsive-pixel";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import ViteRestart from "vite-plugin-restart";
import UniPolyfill from "vite-plugin-uni-polyfill";
import cssMacro from "weapp-tailwindcss/css-macro/postcss";
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite";

const WeappTailwindcssDisabled = isH5 || isApp;

const postcssPlugins: AcceptedPlugin[] = [tailwindcss(), autoprefixer()];

// 可以使用 postcss-pxtransform 来进行 px 转 rpx 的功能
// 详见: https://tw.icebreaker.top/docs/quick-start/css-unit-transform#px-%E8%BD%AC-rpx
postcssPlugins.push(cssMacro);

if (!WeappTailwindcssDisabled) {
  postcssPlugins.push(
    remToRpx({
      rootValue: 32,
      propList: ["*"],
      transformUnit: "rpx",
    }),
  );
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // mode: 区分生产环境还是开发环境
  console.log("command, mode -> ", command, mode);
  // pnpm dev:h5 时得到 => serve development
  // pnpm build:h5 时得到 => build production
  // pnpm dev:mp-weixin 时得到 => build development (注意区别，command为build)
  // pnpm build:mp-weixin 时得到 => build production
  // pnpm dev:app 时得到 => build development (注意区别，command为build)
  // pnpm build:app 时得到 => build production
  // dev 和 build 命令可以分别使用 .env.development 和 .env.production 的环境变量
  const { UNI_PLATFORM } = process.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);

  const env = loadEnv(mode, path.resolve(process.cwd(), "env"));
  console.log("环境变量 env -> ", env);

  return {
    envDir: path.resolve(process.cwd(), "env"),
    plugins: [
      UniHelperManifest(),
      UniHelperPages({
        dts: "types/uni-pages.d.ts",
        subPackages: ["pages-sub"],
      }),
      UniHelperLayouts(),
      UniPlatform(),
      //
      Uni(),
      //
      UniPolyfill(),
      UnifiedViteWeappTailwindcssPlugin({
        disabled: WeappTailwindcssDisabled,
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.ts"],
      }),
    ],
    // 内联 postcss 注册 tailwindcss
    css: {
      postcss: {
        plugins: postcssPlugins,
      },
      // https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    build: {
      target: "es6",
      cssTarget: "chrome61",
    },
    optimizeDeps: {
      exclude: ["vue-demi"],
    },
  };
});
