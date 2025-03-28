<template>
  <div class="flex flex-col gap-2 sr-only">Default Theme</div>
</template>

<script lang="ts" setup>
const { image } = useCode();
const { config } = useConfig();

onMounted(async () => {
  await nextTick();
  image.value = "https://cdn.worldvectorlogo.com/logos/bitly.svg";
  config.value.colors.random = false;
  config.value.colors.selected = ["#f0885c", "#ffffff"];
});
</script>
