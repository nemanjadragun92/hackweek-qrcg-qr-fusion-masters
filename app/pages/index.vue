<template>
  <div class="h-svh w-screen flex">
    <UiSidebarLeft />
    <UiContent v-if="!reloading" :key="`${reloading}`" />
    <UiSidebarRight />
  </div>
</template>

<script lang="ts" setup>
const { reloading } = useConfig();
</script>
