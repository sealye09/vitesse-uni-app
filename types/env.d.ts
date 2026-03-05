/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string;
  /** vite 构建环境 */
  readonly VITE_BUILD_ENV: "development" | "test" | "production" | string;
  readonly NODE_ENV: "development" | "test" | "production" | string;
  /** 后台接口地址 */
  readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
