<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import ConfigProvider from "@/components/ConfigProvider.vue";
</script>

<template>
  <ConfigProvider>
    <view
      class="bg-[var(--bg-base)] px-10 py-20 text-center text-[var(--text-primary)]"
    >
      <slot></slot>
      <AppFooter />
      <view
        class="mx-auto mt-5 text-center text-sm text-[var(--text-secondary)] opacity-25"
      >
        [Default Layout]
      </view>
    </view>
  </ConfigProvider>
</template>
