<script setup lang="ts">
import { useCount } from "@/hooks/useCount";

const { count, inc, dec } = useCount();
</script>

<template>
  <view
    class="mt-8 w-full max-w-[280px] overflow-hidden rounded-lg border border-border bg-card"
  >
    <view class="border-b border-border px-4 py-3">
      <text class="text-sm font-medium text-muted-foreground">Counter</text>
    </view>

    <view class="flex items-center justify-between p-4">
      <!-- 使用 view 模拟减少按钮 -->
      <view
        class="flex size-10 cursor-pointer items-center justify-center rounded-md border border-border bg-card text-foreground active:bg-muted active:ring"
        @click="dec()"
      >
        <view class="i-ph-minus" />
      </view>

      <view class="flex items-center justify-center">
        <text class="text-3xl font-semibold tabular-nums text-foreground">
          {{ count }}
        </text>
      </view>

      <!-- 使用 view 模拟增加按钮 -->
      <view
        class="flex size-10 cursor-pointer items-center justify-center rounded-md border border-border bg-card text-foreground active:bg-muted active:ring"
        @click="inc()"
      >
        <view class="i-ph-plus" />
      </view>
    </view>
  </view>
</template>
