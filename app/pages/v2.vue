<template>
  <Html
    :style="{
      '--bg-color': 'black',
      '--text-color': 'white',
    }"
  >
    <Body :class="isDarkMode ? 'bg-black text-white' : 'bg-white text-black'" />
  </Html>
  <div class="h-svh w-screen flex">
    <aside
      class="bg-neutral-50 text-black w-sm p-4 px-8 space-y-4 border-r border-neutral-200"
    >
      <h1 class="font-semibold text-2xl">Fusion Masters</h1>
      <div class="space-y-4">
        <div>
          <label for="url">
            <span class="text-sm font-medium text-gray-700">Text / URL</span>

            <input
              id="url"
              v-model.trim="url"
              type="text"
              class="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
            />
          </label>
        </div>
        <div>
          <div>
            <span class="text-sm font-medium text-gray-700">Dark Mode</span>
            <label
              class="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
            >
              <input
                id="darkMode"
                v-model="config.darkMode"
                type="checkbox"
                class="peer sr-only"
              />

              <span
                class="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            </label>
          </div>
        </div>
        <div>
          <div>
            <span class="text-sm font-medium text-gray-700"
              >Make QR code on initial load transparent</span
            >
            <label
              class="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
            >
              <input
                id="initialTransparentCode"
                v-model="config.initialTransparentCode"
                type="checkbox"
                class="peer sr-only"
              />

              <span
                class="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            </label>
          </div>
        </div>
        <div class="bg-neutral-100 border border-neutral-200 p-4">
          <div class="space-y-4">
            <div>
              <span class="text-sm font-medium text-gray-700"
                >Auto generate new version</span
              >
              <label
                class="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
              >
                <input
                  id="animationEnabled"
                  v-model="config.animation.enabled"
                  type="checkbox"
                  class="peer sr-only"
                />

                <span
                  class="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
              </label>
            </div>
            <template v-if="isActive">
              <div class="space-y-1">
                <div class="text-sm font-medium text-gray-700">Mode</div>
                <span
                  class="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    class="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:relative"
                    :class="{
                      'text-green-500': config.animation.mode === 'instant',
                    }"
                    @click="config.animation.mode = 'instant'"
                  >
                    Instant
                  </button>

                  <button
                    type="button"
                    class="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:relative"
                    :class="{
                      'text-green-500': config.animation.mode === 'ease-in',
                    }"
                    @click="config.animation.mode = 'ease-in'"
                  >
                    Ease In
                  </button>
                </span>
              </div>
              <div v-if="config.animation.mode === 'ease-in'" class="space-y-1">
                <div class="text-sm font-medium text-gray-700">
                  Speed ({{ config.animation.speed }}ms)
                </div>
                <input
                  v-model="config.animation.speed"
                  class="w-full"
                  type="range"
                  step="1"
                  min="1"
                  max="100"
                />
              </div>
            </template>
            <div v-else>
              <button
                type="button"
                class="inline-block w-full rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-500 focus:ring-3 focus:outline-hidden"
                @click="onInit"
              >
                Generate new version
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="flex items-center justify-center flex-1">
      <div class="size-[400px] relative">
        <div ref="containerEl" class="wrapper size-[400px]" v-html="data" />
        <div class="absolute inset-0 flex items-center justify-center">
          <img
            src="https://media.tenor.com/UxQ_m5eDewkAAAAj/discokugel-mirrorball.gif"
            alt=""
            class="size-16"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const containerEl = ref<HTMLElement | null>(null);
const url = ref<string>("https://qrapp-legacy.egodit.org");
const urlDebounced = refDebounced(url, 500);

const { config, isDarkMode, isCodeTransparentOnLoad, isAnimationEnabled } =
  useConfig();

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

const { onInit } = useCode(containerEl);

watch(status, async (_status) => {
  if (_status === "success") {
    await onInit();
  }
});

const { pause, resume, isActive } = useIntervalFn(
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

<style>
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
</style>
