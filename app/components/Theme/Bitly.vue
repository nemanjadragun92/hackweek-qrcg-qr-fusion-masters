<template>
  <div class="flex flex-col gap-2 sr-only">Bitly Theme</div>
</template>

<script lang="ts" setup>
const { config } = useConfig();

onMounted(async () => {
  await nextTick();
  config.value.image =
    "https://flowmattic.com/wp-content/uploads/2022/02/bitly-logo.png";
  config.value.colors.random = false;
  config.value.colors.codeBackgroundColor = "#000000";
  config.value.colors.selected = ["#f0885c", "#ffffff"];
});
</script>
