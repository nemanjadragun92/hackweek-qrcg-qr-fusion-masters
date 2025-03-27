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
                @click="onGenerateNew"
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
// Configuration
type Config = {
  darkMode: boolean;
  initialTransparentCode: boolean;
  animation: {
    enabled: boolean;
    mode: "ease-in" | "instant";
    speed: number;
  };
};

const defaultConfig: Config = {
  darkMode: false,
  initialTransparentCode: false,
  animation: {
    enabled: true,
    mode: "instant",
    speed: 10,
  },
};

const config = useLocalStorage<Config>(
  "config",
  JSON.parse(JSON.stringify(defaultConfig)),
);

// Utils
const promiseTimeout = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let color = config.value.darkMode ? "#FFFFFF" : "#000000";
if (config.value.initialTransparentCode) {
  color = config.value.darkMode ? "#000000" : "#FFFFFF";
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
    await onGenerateNew();
  }
});

onMounted(async () => {
  await onGenerateNew();
});

const { pause, resume, isActive } = useIntervalFn(
  async () => {
    await onGenerateNew();
  },
  500,
  {
    immediate: config.value.animation.enabled,
  },
);

const onGenerateNew = async () => {
  await onInit();
};

const onInit = async () => {
  await nextTick();
  const backgroundColor = isDarkMode.value ? "#000000" : "#ffffff";
  const svgElement = containerEl.value?.firstChild as SVGSVGElement;
  const bg = svgElement?.querySelector('rect[width="2000"]');
  bg?.setAttribute("fill", "transparent");
  const childNodes = Array.from(
    svgElement?.firstChild?.nextSibling?.childNodes ?? [],
  );
  const filteredNodes = childNodes?.slice(2) || [];
  const squares = svgElement?.querySelectorAll("#Ebene_1") ?? [];

  for (const node of filteredNodes) {
    const rect = node as Element;
    if (isAnimationEnabled.value && config.value.animation.mode === "ease-in") {
      await promiseTimeout(config.value.animation.speed);
    }
    rect.setAttribute?.("fill", getRandomColor(backgroundColor));
  }

  squares.forEach((rect: Element) => {
    const paths: HTMLCollectionOf<SVGPathElement> =
      rect.getElementsByTagName("path");
    Array.from(paths).forEach((path) => {
      path.setAttribute("fill", getRandomColor(backgroundColor));
    });
    const polygons: HTMLCollectionOf<SVGPolygonElement> =
      rect.getElementsByTagName("polygon");
    Array.from(polygons).forEach((polygon) => {
      polygon.setAttribute("fill", getRandomColor(backgroundColor));
    });
  });
};

const getRandomColor = (_backgroundColor: string): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  const backgroundColor = getBlackOrWhite(_backgroundColor);
  // console.log("backgroundColor", { _backgroundColor, backgroundColor });
  // Ensure sufficient contrast with the background color
  if (backgroundColor === "white") {
    // Ensure the color is dark enough to contrast with a white background
    while (isLightColor(color)) {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
  } else if (backgroundColor === "black") {
    // Ensure the color is light enough to contrast with a black background
    while (!isLightColor(color)) {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
  }

  return color;
};

const isLightColor = (color: string): boolean => {
  // Convert hex color to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is light (brightness > 128), false otherwise
  return brightness > 128;
};

const getBlackOrWhite = (color: string): string => {
  const hexToRgb = (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1]! + hex[1]!, 16);
      g = parseInt(hex[2]! + hex[2]!, 16);
      b = parseInt(hex[3]! + hex[3]!, 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1]! + hex[2]!, 16);
      g = parseInt(hex[3]! + hex[4]!, 16);
      b = parseInt(hex[5]! + hex[6]!, 16);
    }
    return { r, g, b };
  };

  const rgbToObj = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    return result
      ? {
          r: parseInt(result[0]),
          g: parseInt(result[1]!),
          b: parseInt(result[2]!),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const isLightColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  let rgbColor;
  if (color.startsWith("#")) {
    rgbColor = hexToRgb(color);
  } else if (color.startsWith("rgb")) {
    rgbColor = rgbToObj(color);
  } else {
    throw new Error("Unsupported color format");
  }

  return isLightColor(rgbColor) ? "white" : "black";
};

const isDarkMode = computed(() => config.value.darkMode);

watch(isDarkMode, async (_darkMode) => {
  location.reload();
});

const isAnimationEnabled = computed(() => config.value.animation.enabled);
watch(isAnimationEnabled, (_animationEnabled) => {
  if (_animationEnabled) {
    resume();
  } else {
    pause();
  }
});

const onTransparentCodeChanged = computed(
  () => config.value.initialTransparentCode,
);
watch(onTransparentCodeChanged, async () => {
  location.reload();
});

const onChangeMode = computed(() => config.value.animation.mode);
watch(onChangeMode, async () => {
  location.reload();
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
