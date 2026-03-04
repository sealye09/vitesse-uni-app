<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
function go() {
  if (name.value) {
    uni.navigateTo({
      url: `/pages/hi?name=${name.value}`,
    });
  }
}
</script>

<template>
  <view>
    <view
      bg="transparent"
      class="auto active:none m-auto m-t-5 mt-5 box-border box-border w-250px w-250px w-full w-full border border-gray-200 rounded rounded border-solid bg-transparent p-x-4 p-y-2 px-4 py-2 text-center text-center outline-none outline-none dark:border-gray-700 active:outline-none"
    >
      <input
        v-model="name"
        autocomplete="off"
        class="mr-0 w-full"
        placeholder="What's your name?"
        type="text"
      />
    </view>
    <view>
      <button
        class="m-auto m-auto m-t-3 w-120rpx rounded bg-teal-600 px-4 py-1 text-sm text-white"
        :disabled="!name"
        hover-class="bg-teal-700"
        @click="go"
      >
        GO
      </button>
    </view>
  </view>
</template>
