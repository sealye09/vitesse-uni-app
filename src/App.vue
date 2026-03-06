<script setup lang="ts"></script>

<template>
  <slot></slot>
</template>

<style lang="scss">
@use "tailwindcss/base";
@use "tailwindcss/components";
@use "tailwindcss/utilities";

/* 全局主题样式 */
page,
uni-page-body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>
