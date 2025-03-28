<template>
  <div class="flex items-center justify-center flex-1 relative overflow-hidden">
    <div id="content" class="absolute inset-0 w-full h-full" />
    <div id="qr_code_wrapper" class="size-[400px] relative z-10 group">
      <!--TOOD: Add for theme.background.util.ts type custom bg to set as well as image-->
      <div
        v-if="selectedTheme === ETheme.background"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          class="size-[400px] bg-transparent flex items-center justify-center"
        >
          <img
            src="https://media.istockphoto.com/id/1266265722/vector/merry-christmas-square-postcard-with-winter-landscape-big-yellow-moon-santa-claus-bag-and.jpg?s=612x612&w=0&k=20&c=dlBt9-oiL-taQ0gH4QTP6eLPaoA79f9jIhgMIsdeb4g="
            alt="BG"
            class="size-[350px] object-cover"
          />
        </div>
      </div>
      <a
        id="qr_code_container"
        ref="containerEl"
        target="_blank"
        :href="returnValidUrl || ''"
        class="wrapper size-[400px] block relative"
        v-html="data"
      />
      <div
        v-if="returnValidUrl"
        class="absolute -top-3 left-0 right-0 justify-center hidden group-hover:flex"
      >
        <div
          class="max-w-xs truncate p-1 text-md font-medium bg-black text-orange-500 border border-orange-500/50"
        >
          {{ returnValidUrl }}
        </div>
      </div>
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
const { containerEl, returnValidUrl, urlDebounced, image, onInit } = useCode();
// https://media.tenor.com/UxQ_m5eDewkAAAAj/discokugel-mirrorball.gif
// const image = "https://i.giphy.com/3gRWfmZMI0Cb2Hoaye.webp";

const {
  isDarkMode,
  isCodeTransparentOnLoad,
  isAnimationEnabled,
  selectedTheme,
} = useConfig();

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
