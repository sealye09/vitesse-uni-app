<script lang="ts" setup>
function handleClickGithub() {
  if (window?.open) {
    window.open("https://github.com/uni-helper/vitesse-uni-app");
  } else {
    uni.showToast({
      icon: "none",
      title: "请使用浏览器打开",
    });
  }
}
</script>

<template>
  <view class="my-12 flex items-center justify-center gap-12">
    <navigator open-type="redirect" url="/pages/index">
      <view class="i-ph-house size-8" />
    </navigator>

    <view class="cursor-pointer" @click="handleClickGithub">
      <view class="i-ph-github-logo size-8" />
    </view>
  </view>
</template>
