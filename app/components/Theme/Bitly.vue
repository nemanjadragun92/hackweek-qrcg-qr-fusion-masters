<template>
  <div class="flex flex-col gap-2 sr-only">Bitly Theme</div>
</template>

<script lang="ts" setup>
const { config } = useConfig();

onMounted(async () => {
  await nextTick();
  config.value.image = "https://cdn.worldvectorlogo.com/logos/bitly.svg";
  config.value.colors.random = false;
  config.value.colors.selected = ["#f0885c", "#ffffff"];
});
</script>
