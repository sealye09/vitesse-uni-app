<script setup lang="ts">
import { onMounted, ref } from "vue";

import { alova } from "@/api/request";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos = ref<Todo[]>([]);
const loading = ref(false);
const error = ref("");

// 获取 todo 列表
async function fetchTodos() {
  loading.value = true;
  error.value = "";
  try {
    const res = await alova
      .Post<Todo[], { _limit: number }>("/todos", {
        _limit: 10,
      })
      .send();
    todos.value = res.slice(0, 10);
  } catch (e: any) {
    error.value = e.message || "获取失败";
  } finally {
    loading.value = false;
  }
}

// 切换完成状态
function toggleTodo(todo: Todo) {
  todo.completed = !todo.completed;
}

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <h1 class="mb-4 text-2xl font-bold">Todo List</h1>

    <div v-if="loading" class="py-8 text-center text-gray-500">加载中...</div>

    <div v-else-if="error" class="py-8 text-center text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center rounded-lg bg-white p-4 shadow-sm"
        @click="toggleTodo(todo)"
      >
        <div
          class="mr-3 flex size-6 items-center justify-center rounded-full border-2"
          :class="
            todo.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
          "
        >
          <span v-if="todo.completed" class="text-sm text-white">✓</span>
        </div>
        <span :class="todo.completed ? 'line-through text-gray-400' : ''">
          {{ todo.title }}
        </span>
      </div>
    </div>
  </div>
</template>
