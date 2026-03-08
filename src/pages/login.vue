<script setup lang="ts">
import { ref } from "vue";

import { toHomePage } from "@/api";
import { UserService } from "@/api/services/user";

defineOptions({
  name: "LoginPage",
});

definePage({
  style: {
    navigationBarTitleText: "登录",
  },
});

const username = ref("admin");
const password = ref("123456");
const loading = ref(false);

// 登录
async function handleLogin() {
  if (!username.value || !password.value) {
    uni.showToast({ title: "请输入用户名和密码", icon: "none" });
    return;
  }

  loading.value = true;
  try {
    const res = await UserService.login({
      username: username.value,
      password: password.value,
    });

    if (res.data?.token) {
      uni.showToast({ title: "登录成功", icon: "success" });

      // 延迟跳转首页
      setTimeout(() => {
        toHomePage();
      }, 500);
    }
  } catch (error) {
    console.error("登录失败:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <view class="flex min-h-screen flex-col bg-background px-4 py-8">
    <!-- 标题 -->
    <view class="mb-10 text-center">
      <text class="text-2xl font-bold">欢迎回来</text>
      <view class="mt-2 text-gray-500">登录您的账户</view>
    </view>

    <!-- 表单 -->
    <view class="flex flex-col gap-4">
      <!-- 用户名 -->
      <view class="rounded-lg bg-white px-4 py-3">
        <input
          v-model="username"
          class="w-full"
          placeholder="请输入用户名"
          type="text"
        />
      </view>

      <!-- 密码 -->
      <view class="rounded-lg bg-white px-4 py-3">
        <input
          v-model="password"
          class="w-full"
          password
          placeholder="请输入密码"
        />
      </view>

      <!-- 登录按钮 -->
      <button
        class="mt-4 rounded-lg bg-primary py-3 text-white"
        :loading="loading"
        @click="handleLogin"
      >
        {{ loading ? "登录中..." : "登录" }}
      </button>

      <!-- 提示 -->
      <view class="mt-4 text-center text-sm text-gray-400">
        测试账号: admin / 123456
      </view>
    </view>
  </view>
</template>

<style scoped>
.bg-primary {
  background-color: #007aff;
}
.text-primary {
  color: #007aff;
}
</style>
