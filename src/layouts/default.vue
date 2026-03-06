<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import ConfigProvider from "@/components/ConfigProvider.vue";
</script>

<template>
  <ConfigProvider>
    <view
      class="min-h-screen bg-[var(--bg-base)] text-center text-[var(--text-primary)]"
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
