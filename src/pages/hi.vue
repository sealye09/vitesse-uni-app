<script lang="ts" setup>
import HiCounter from "@/components/HiCounter.vue";
import { useQuery } from "@/hooks/useQuery";

definePage({
  layout: "home",
});

const { value: name } = useQuery("name");
</script>

<template>
  <view>{{ name }}</view>

  <HiCounter />
</template>
