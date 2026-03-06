<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "InputEntry",
  options: {
    styleIsolation: "shared",
  },
});

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
  <view class="mt-8 w-full max-w-[280px]">
    <view
      class="rounded-md border border-border bg-card px-3 py-2.5 transition-colors focus-within:border-primary"
    >
      <input
        v-model="name"
        autocomplete="off"
        class="bg-transparent text-sm text-foreground outline-none"
        placeholder="What's your name?"
        type="text"
      />
    </view>

    <!-- 使用 view 模拟 button -->
    <view
      class="mt-4 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
      :class="
        name
          ? 'bg-primary text-primary-foreground active:bg-primary/90'
          : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
      "
      @click="go"
    >
      <text>Continue</text>
    </view>
  </view>
</template>
