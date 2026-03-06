<script lang="ts" setup>
import HiCounter from "@/components/HiCounter.vue";
import { useQueryParams } from "@/hooks/useQueryParams";

definePage({
  layout: "home",
  tabBar: { index: 1, text: "Hi" },
  style: {
    navigationBarTitleText: "Hi",
  },
});

const { value: name } = useQueryParams("name");
</script>

<template>
  <view>{{ name }}</view>

  <HiCounter />
</template>
