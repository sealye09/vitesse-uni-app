<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import ConfigProvider from "@/components/ConfigProvider.vue";
</script>

<template>
  <ConfigProvider>
    <view
      class="min-h-screen text-center"
      :style="{ backgroundColor: 'var(--bg-base)' }"
    >
      <slot></slot>

      <AppFooter />
      <view
        class="mx-auto mt-5 text-center text-sm opacity-25"
        :style="{ color: 'var(--text-secondary)' }"
      >
        [Home Layout]
      </view>
    </view>
  </ConfigProvider>
</template>
