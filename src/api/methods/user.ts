import type { ApiResponse } from "../type";

import { alova } from "../request";
import { getRefreshToken } from "../token";

/**
 * 用户相关接口
 * @description 用于管理用户信息的接口集合
 */

// ------------------- 类型定义 -------------------

/** 登录参数 */
export interface LoginParams {
  username: string;
  password: string;
}

/** 登录响应 */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  userInfo: {
    id: number;
    name: string;
    avatar: string;
  };
}

/** 用户信息 */
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

// ------------------- 接口方法 -------------------

/** 公开文章 */
export interface Post {
  id: number;
  title: string;
  content: string;
}

/**
 * 用户登录
 * @description 用于获取用户token，需要忽略token验证
 */
export const login = (data: LoginParams) =>
  alova.Post<ApiResponse<LoginResponse>>("/login", data, {
    meta: { authRole: "login" },
  });

/**
 * 获取用户信息
 * @description 获取当前登录用户的详细信息
 */
export const getUserInfo = () =>
  alova.Get<ApiResponse<UserInfo>>("/user/info", {});

/**
 * 更新用户信息
 * @description 更新当前用户的资料信息
 */
export const updateUserInfo = (data: Partial<UserInfo>) =>
  alova.Put<ApiResponse<UserInfo>>("/user/info", data);

/**
 * 刷新 Token
 * @description 用于刷新即将过期的token
 */
export const refreshToken = () =>
  alova.Post<ApiResponse<{ token: string; refreshToken: string }>>(
    "/auth/refresh",
    {},
    {
      meta: { authRole: "refreshToken" },
      headers: { "x-refresh-token": getRefreshToken() },
    },
  );

/**
 * 退出登录
 * @description 清除 token
 */
export const logout = () =>
  alova.Post<ApiResponse<null>>(
    "/logout",
    {},
    { meta: { authRole: "logout" } },
  );

/**
 * 获取公开文章（访客接口，无需授权）
 */
export const getPublicPosts = () =>
  alova.Get<ApiResponse<Post[]>>("/public/posts", { meta: {} });

/**
 * 获取私有文章（需要授权）
 */
export const getPrivatePosts = () =>
  alova.Get<ApiResponse<Post[]>>("/private/posts", {});

/**
 * 测试 token 过期（模拟接口，返回 401）
 */
export const testExpireToken = () =>
  alova.Get<ApiResponse<null>>("/expire-token", {});
