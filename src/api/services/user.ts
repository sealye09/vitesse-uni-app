import type { IApiResponse } from "../types";
import type * as IUserService from "./user.types";

import { alova } from "../request";
import { getRefreshToken } from "../token";

export * as IUserService from "./user.types";

/**
 * 用户相关接口
 * @description 用于管理用户信息的接口集合
 */

/**
 * 用户服务
 * @description 提供用户相关的 API 调用方法
 */
export const UserService = {
  /**
   * 用户登录
   * @description 用于获取用户token，需要忽略token验证
   */
  login: (data: IUserService.LoginParams) =>
    alova.Post<IApiResponse<IUserService.LoginResponse>>("/login", data, {
      meta: { authRole: "login" },
    }),

  /**
   * 获取用户信息
   * @description 获取当前登录用户的详细信息
   */
  getUserInfo: () =>
    alova.Get<IApiResponse<IUserService.UserInfo>>("/user/info"),

  /**
   * 更新用户信息
   * @description 更新当前用户的资料信息
   */
  updateUserInfo: (data: Partial<IUserService.UserInfo>) =>
    alova.Put<IApiResponse<IUserService.UserInfo>>("/user/info", data),

  /**
   * 刷新 Token
   * @description 用于刷新即将过期的token
   */
  refreshToken: () =>
    alova.Post<IApiResponse<IUserService.RefreshTokenResponse>>(
      "/auth/refresh",
      {},
      {
        meta: { authRole: "refreshToken" },
        headers: { "x-refresh-token": getRefreshToken() },
      },
    ),

  /**
   * 退出登录
   * @description 清除 token
   */
  logout: () =>
    alova.Post<IApiResponse>("/logout", {}, { meta: { authRole: "logout" } }),

  /**
   * 获取公开文章（访客接口，无需授权）
   */
  getPublicPosts: () =>
    alova.Get<IApiResponse<IUserService.Post[]>>("/public/posts"),

  /**
   * 获取私有文章（需要授权）
   */
  getPrivatePosts: () =>
    alova.Get<IApiResponse<IUserService.Post[]>>("/private/posts"),

  /**
   * 测试 token 过期（模拟接口，返回 401）
   */
  expireToken: () => alova.Get<IApiResponse>("/expire-token"),
};
