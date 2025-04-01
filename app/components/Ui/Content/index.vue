<template>
  <div class="flex items-center justify-center flex-1 relative overflow-hidden">
    <div id="content" class="absolute inset-0 w-full h-full" />
    <div id="qr_code_wrapper" class="size-[400px] relative z-10 group">
      <!--TOOD: Add for theme.background.util.ts type custom bg to set as well as image-->
      <div
        v-if="selectedTheme === ETheme.background"
        class="fixed inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          v-if="selectedThemeConfig.backgroundImage"
          class="flex items-center justify-center"
          :style="{
            backgroundColor:
              selectedThemeConfig.backgroundColor || 'transparent',
          }"
        >
          <img
            :src="selectedThemeConfig.backgroundImage"
            alt="BG"
            class="relative"
            :style="{
              width: `${selectedThemeConfig.backgroundSize}px`,
              height: `${selectedThemeConfig.backgroundSize}px`,
              top: `${selectedThemeConfig.backgroundPositionY}px`,
              left: `${selectedThemeConfig.backgroundPositionX}px`,
              objectFit: selectedThemeConfig.backgroundFit,
            }"
          />
        </div>
      </div>
      <a
        id="qr_code_container"
        ref="containerEl"
        target="_blank"
        :href="returnValidUrl || ''"
        class="wrapper size-[400px] block relative rounded-2xl overflow-hidden"
        v-html="data"
      />
      <div
        v-if="config.colors.codeBackgroundGradientEnabled"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          class="size-full absolute inset-0 z-10 rounded-2xl"
          :class="{
            predefinedGradient: config.colors.codeBackgroundGradientPredefined,
            animateGradient: config.colors.codeBackgroundGradientAnimate,
          }"
          :style="{
            backgroundImage: config.colors.codeBackgroundGradientPredefined
              ? undefined
              : `linear-gradient(${config.colors.codeBackgroundGradientDegree}deg, ${config.colors.codeBackgroundGradientPalette?.join(', ')})`,
            mixBlendMode: 'screen',
          }"
        />
      </div>
      <div
        v-if="config.image"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img :src="config.image" alt="" class="size-16 z-20" />
      </div>
      <!--Theme Background START-->
      <div
        v-if="selectedTheme === ETheme.animations"
        class="absolute inset-0 flex items-center justify-center pointer-events-none border rounded-2xl"
        :style="{
          borderColor: selectedThemeConfig.borderColor,
          borderWidth: `${selectedThemeConfig.borderWidth}px`,
        }"
      >
        <div
          :key="selectedThemeConfig.text"
          class="absolute left-0 right-0 text-center"
          :style="{
            fontSize: `${selectedThemeConfig.fontSize}px`,
            bottom: `${selectedThemeConfig.topOffset}px`,
            color: selectedThemeConfig.textColor,
            fontWeight: selectedThemeConfig.fontWeight,
          }"
        >
          <span ref="animatedText" />
        </div>
      </div>
      <!--Theme Background END-->
      <div
        v-if="returnValidUrl"
        class="absolute pointer-events-none inset-0 items-center justify-center hidden group-hover:flex z-30"
      >
        <div
          class="max-w-xs truncate px-2 py-1 text-md font-semibold bg-neutral-50 text-(--color-action-color) border-2 eounded-sm border-(--color-action-color)"
        >
          {{ returnValidUrl }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { containerEl, returnValidUrl, urlDebounced, onInit } = useCode();

const {
  config,
  isDarkMode,
  isCodeTransparentOnLoad,
  isAnimationEnabled,
  selectedTheme,
  selectedThemeConfig,
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

const animatedText = ref(null);
if (selectedTheme.value === ETheme.animations) {
  useAnimations(animatedText);
}
</script>

<style>
.animateGradient {
  background-size: 360% 360%;
  animation: gradient-animation 2s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.predefinedGradient {
  background:
    radial-gradient(
      100% 100% at var(--4-x-position) var(--4-y-position),
      #3cc2dd 0%,
      transparent
    ),
    radial-gradient(
      100% 100% at var(--5-x-position) var(--5-y-position),
      #00faa7 0%,
      transparent
    ),
    #1b253b;
  animation-name: main;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  transition-timing-function: ease-in;
}
@property --4-x-position {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 20%;
}
@property --4-y-position {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 80%;
}
@property --5-x-position {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 80%;
}
@property --5-y-position {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 20%;
}
:root {
  --4-x-position: 20%;
  --4-y-position: 80%;
  --5-x-position: 80%;
  --5-y-position: 20%;
}
@keyframes main {
  25% {
    --4-x-position: 15%;
    --4-y-position: 15%;
    --5-x-position: 85%;
    --5-y-position: 80%;
  }
  50% {
    --4-x-position: 80%;
    --4-y-position: 15%;
    --5-x-position: 15%;
    --5-y-position: 85%;
  }
}
</style>
