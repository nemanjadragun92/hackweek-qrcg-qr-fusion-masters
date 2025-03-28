<template>
  <Html
    :style="{
      '--bg-color': 'black',
      '--text-color': 'white',
      '--ui-bg-color': isDarkMode ? 'black' : 'white',
    }"
  >
    <Body :class="isDarkMode ? 'bg-black text-white' : 'bg-white text-black'" />
  </Html>
  <div class="h-svh w-screen flex">
    <UiSidebarLeft />
    <UiContent v-if="!reloading" :key="`${reloading}`" />
    <UiSidebarRight />
  </div>
</template>

<script lang="ts" setup>
const { isDarkMode, reloading } = useConfig();
</script>

<style>
body {
  overflow: hidden;
}

:root {
  --bg-color: white;
  --text-color: black;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate 2s linear infinite;
  transform-origin: center;
}

.wrapper * {
  transition: all 500ms;
}

#content * {
  transition: all 500ms;
}
</style>
