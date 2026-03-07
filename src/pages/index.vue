<script setup lang="ts">
import { useRequest } from "alova/client";

import { getToken, setRefreshToken, setToken } from "@/api";
import {
  getPrivatePosts,
  getPublicPosts,
  getUserInfo,
  login,
  logout,
  refreshToken,
  testExpireToken,
} from "@/api/methods/user";
import AppLogos from "@/components/AppLogos.vue";
import InputEntry from "@/components/InputEntry.vue";

defineOptions({
  name: "IndexPage",
});

definePage({
  type: "home",
  layout: "home",
  style: {
    enablePullDownRefresh: true,
    navigationBarTitleText: "首页",
  },
});

// 登录
const { send: handleLogin } = useRequest(
  () => login({ username: "admin", password: "12345116" }),
  { immediate: false },
).onSuccess((res) => {
  console.log("登录成功:", res);
  uni.showToast({ title: "登录成功", icon: "success" });
});

// 退出登录
const { send: handleLogout } = useRequest(logout, {
  immediate: false,
}).onSuccess(() => {
  uni.showToast({ title: "已退出登录", icon: "success" });
});

// 获取用户信息
const { send: handleGetUserInfo } = useRequest(getUserInfo, {
  immediate: false,
}).onSuccess((res) => {
  console.log("用户信息:", res);
  uni.showToast({ title: "获取成功", icon: "success" });
});

// 获取公开文章（访客接口）
const { send: handleGetPublicPosts } = useRequest(getPublicPosts, {
  immediate: false,
}).onSuccess(({ data }) => {
  uni.showToast({
    title: `获取到 ${data.data?.length || 0} 篇文章`,
    icon: "success",
  });
});

// 获取私有文章（需要授权）
const { send: handleGetPrivatePosts } = useRequest(getPrivatePosts, {
  immediate: false,
}).onSuccess(({ data: res }) => {
  console.log("私有文章:", res);
  uni.showToast({
    title: `获取到 ${res.data?.length || 0} 篇文章`,
    icon: "success",
  });
});

// 测试 token 过期
const { send: handleTestExpireToken } = useRequest(() => testExpireToken(), {
  immediate: false,
}).onError(() => {
  console.log("Token 过期测试");
  uni.showToast({ title: "Token 已过期", icon: "none" });
});

// 手动刷新 Token
const { send: handleRefreshToken } = useRequest(() => refreshToken(), {
  immediate: false,
}).onSuccess((res) => {
  console.log("刷新 Token 成功:", res);
  setToken(res.data.data.token);
  setRefreshToken(res.data.data.refreshToken);
  uni.showToast({ title: "Token 已刷新", icon: "success" });
});

// 检查 token
function checkToken() {
  const token = getToken();
  console.log("当前 token:", token);
  uni.showToast({ title: token ? "已登录" : "未登录", icon: "none" });
}
</script>

<template>
  <view class="flex flex-col bg-background">
    <view class="flex flex-1 flex-col items-center px-4 pt-8">
      <AppLogos />
      <InputEntry />
    </view>

    <!-- 测试按钮区域 -->
    <view class="p-4">
      <view class="mb-4 text-lg font-bold">API 测试</view>

      <view class="mb-2 text-sm text-gray-500">
        当前状态: {{ getToken() ? "已登录" : "未登录" }}
      </view>

      <view class="grid grid-cols-2 gap-2">
        <button class="btn" @click="handleLogin">登录</button>
        <button class="btn" @click="handleLogout">退出登录</button>
        <button class="btn" @click="handleGetUserInfo">获取用户信息</button>
        <button class="btn" @click="checkToken">检查 Token</button>
        <button class="btn" @click="handleGetPublicPosts">
          公开文章 (访客)
        </button>
        <button class="btn" @click="handleGetPrivatePosts">
          私有文章 (需授权)
        </button>
        <button class="btn" @click="handleTestExpireToken">
          测试 Token 过期
        </button>
        <button class="btn" @click="handleRefreshToken">手动刷新 Token</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.btn {
  background-color: #007aff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}
</style>
