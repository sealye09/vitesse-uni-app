import "alova";

// 扩展 alova 的全局元数据配置
declare module "alova" {
  export interface AlovaCustomTypes {
    meta: {
      showToast?: boolean;
      showLoading?: boolean;
      // null 不会携带token
      authRole?: null | "refreshToken" | "login" | "logout";
    };
  }
}
