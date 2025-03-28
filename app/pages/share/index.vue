<template>
  <div class="h-svh w-screen flex">
    <UiContent v-if="!reloading" :key="`${reloading}`" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const routeQueryConfig = computed(() => {
  return route.query.config as string;
});
const readSharableLinkConfig = () => {
  if (routeQueryConfig.value) {
    const decoded = atob(routeQueryConfig.value);
    return JSON.parse(decoded);
  }
  return null;
};

const { config, reloading } = useConfig();

onMounted(async () => {
  await nextTick();
  const sharedConfig = readSharableLinkConfig();
  if (sharedConfig) {
    config.value = sharedConfig;
  }
});
</script>
