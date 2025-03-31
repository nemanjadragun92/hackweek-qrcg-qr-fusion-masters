<template>
  <div class="h-svh w-screen flex">
    <UiContent v-if="!reloading" :key="`${reloading}`" />
  </div>
</template>

<script lang="ts" setup>
const { reloading } = useConfig();
</script>
