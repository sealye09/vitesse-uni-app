<script setup lang="ts">
import AppLogos from "@/components/AppLogos.vue";

definePage({
  tabBar: { index: 1, text: "Me" },
  style: {
    navigationBarTitleText: "我的",
  },
});
</script>

<template>
  <AppLogos />
</template>

<style></style>
