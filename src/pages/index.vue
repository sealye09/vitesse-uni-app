<script setup lang="ts">
import AppLogos from "@/components/AppLogos.vue";
import InputEntry from "@/components/InputEntry.vue";

definePage({
  type: "home",
  layout: "home",
  tabBar: { index: 0, text: "Home" },
  style: {
    navigationBarTitleText: "首页",
  },
});
</script>

<template>
  <AppLogos />
  <InputEntry />
</template>

<style></style>
