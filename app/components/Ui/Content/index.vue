<template>
  <div class="flex items-center justify-center flex-1 relative overflow-hidden">
    <div id="content" class="absolute inset-0 w-full h-full" />
    <div class="size-[400px] relative z-10">
      <div ref="containerEl" class="wrapper size-[400px]" v-html="data" />
      <div
        v-if="image"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img :src="image" alt="" class="size-16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { containerEl, urlDebounced, image, onInit } = useCode();
// https://media.tenor.com/UxQ_m5eDewkAAAAj/discokugel-mirrorball.gif
// const image = "https://i.giphy.com/3gRWfmZMI0Cb2Hoaye.webp";

const { isDarkMode, isCodeTransparentOnLoad, isAnimationEnabled } = useConfig();

let color = isDarkMode.value ? "#FFFFFF" : "#000000";
if (isCodeTransparentOnLoad.value) {
  color = isDarkMode.value ? "#000000" : "#FFFFFF";
}

const { data, status } = await useFetch(
  "https://public-api.qr-code-generator.com/v1/create/free",
  {
    params: {
      image_format: "SVG",
      image_width: 400,
      foreground_color: color,
      frame_color: color,
      frame_name: "no-frame",
      qr_code_logo: "",
      qr_code_pattern: "",
      qr_code_text: urlDebounced,
    },
    transform: (response: Blob) => response.text(),
  },
);

watch(status, async (_status) => {
  if (_status === "success") {
    await onInit();
  }
});

const { pause, resume } = useIntervalFn(
  async () => {
    await onInit();
  },
  500,
  {
    immediate: isAnimationEnabled.value,
  },
);

watch(isAnimationEnabled, (_animationEnabled) => {
  if (_animationEnabled) {
    resume();
  } else {
    pause();
  }
});
</script>
