<script setup lang="ts"></script>

<template>
  <slot></slot>
</template>

<style lang="scss">
@use "tailwindcss/base";
@use "tailwindcss/components";
@use "tailwindcss/utilities";

uni-app,
uni-page,
uni-page-wrapper,
uni-page-body {
  height: 100%;
}

/*  #ifdef  H5  */
// https://tw.icebreaker.top/docs/issues/toast-svg-bug
svg {
  display: initial;
}
/*  #endif  */
</style>
