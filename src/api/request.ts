import type { UniappRequestAdapter } from "@alova/adapter-uniapp";
import type { VueHookType } from "alova/vue";

import AdapterUniapp from "@alova/adapter-uniapp";
import { createAlova } from "alova";
import { createServerTokenAuthentication } from "alova/client";

import { env } from "@/config/env";

import type { LoginResponse } from "./methods/user";
import type { ApiResponse } from "./type";

import { transformResponse } from "./config";
import { refreshToken } from "./methods/user";
import { toLoginPage } from "./pages";
import { getToken, removeToken, setRefreshToken, setToken } from "./token";

/**
 * 创建 token 认证策略
 */
const { onAuthRequired, onResponseRefreshToken } =
  createServerTokenAuthentication<VueHookType, UniappRequestAdapter>({
    assignToken: (method) => {
      const Authorization = `Bearer ${getToken()}`;
      method.config.headers.Authorization = Authorization;
    },
    login: (response) => {
      console.log("login inceptors -> ", response);
      const data = (response?.data || {}) as ApiResponse<LoginResponse>;
      const { token, refreshToken } = data.data || {};

      if (token) {
        setToken(token);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
    },
    logout: () => {
      console.log("logout inceptors");
      removeToken();
      toLoginPage();
    },
    // 走 uni.request 的 success
    refreshTokenOnSuccess: {
      isExpired: (response, method) => {
        const data = (response?.data || {}) as ApiResponse<any>;
        const { code } = data || {};
        if (code === 401) {
          console.log("判断 token 过期：success api -->", response, method);
          return true;
        }
        return false;
      },
      // 刷新 token 的处理函数
      handler: async (response, method) => {
        console.log("刷新 token success -->", response, method);
        try {
          const res = await refreshToken();
          const { token, refreshToken: _refreshToken } = res.data;
          if (token) {
            setToken(token);
          } else {
            throw new Error("刷新 token 失败");
          }
          if (_refreshToken) {
            setRefreshToken(_refreshToken);
          } else {
            throw new Error("刷新 token 失败");
          }
        } catch (error) {
          console.error("刷新 token 失败:", error);
          removeToken();
          toLoginPage();
          throw error;
        }
      },
    },
    // 走 uni.request 的 fail
    refreshTokenOnError: {
      isExpired: (error, method) => {
        console.log("判断 token 过期：error api -->", error, method);
        return false;
      },
      // 刷新 token 的处理函数
      handler: async () => {
        removeToken();
        toLoginPage();
      },
    },
  });

// 创建 alova 实例
export const alova = createAlova({
  baseURL: env.VITE_SERVER_URL,
  ...AdapterUniapp(),
  timeout: 10_000,
  cacheFor: {},
  // 拦截器
  beforeRequest: onAuthRequired((method) => {
    const { meta } = method;
    const { showLoading = false } = meta || {};

    if (showLoading) {
      uni.showLoading({ title: "加载中...", mask: true });
    }
  }),

  responded: onResponseRefreshToken({
    onSuccess: (response, method) => {
      const { meta } = method;
      const { showToast = true } = meta || {};

      const { data, statusCode } =
        response as UniNamespace.RequestSuccessCallbackResult;

      if (statusCode < 200 || statusCode >= 300) {
        throw new Error("请求失败");
      }

      if (!data) {
        throw new Error("响应数据为空");
      }

      // 转换为统一格式
      const apiRes = transformResponse(data);

      // 成功时不做处理，直接返回
      if (apiRes.isSuccess) {
        return apiRes;
      }

      // 其他失败情况
      if (showToast) {
        uni.showToast({ title: apiRes.message || "请求失败", icon: "none" });
      }
      throw apiRes;
    },
    onError: (error, method) => {
      const { meta } = method;
      const { showToast = true } = meta || {};

      // 网络错误处理
      let message = "网络错误";
      if (error.message?.includes("timeout")) {
        message = "请求超时";
      } else if (error.message?.includes("Network Error")) {
        message = "网络不可用";
      }

      if (showToast) {
        uni.showToast({ title: message, icon: "none" });
      }

      console.error(error);
      throw error;
    },
    onComplete: (method) => {
      const { meta } = method;
      const { showLoading } = meta || {};
      if (showLoading) {
        uni.hideLoading();
      }
    },
  }),
});
