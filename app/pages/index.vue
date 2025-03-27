<template>
  <div class="h-svh w-screen flex items-center justify-center">
    <div>
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
      <div class="mt-4 flex flex-col">
        <button type="button" @click="onToggleBgColor">Toggle color</button>
        <button type="button" @click="onGenerateNew">On generate new</button>
        <input
          v-model.trim="keyword"
          class="w-full py-2 border px-4"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const containerEl = ref<HTMLElement | null>(null);
const keyword = ref<string>("https://qrapp-legacy.egodit.org");
const keywordDebounced = refDebounced(keyword, 500);

const { data, status } = await useFetch(
  "https://public-api.qr-code-generator.com/v1/create/free",
  {
    params: {
      image_format: "SVG",
      image_width: 400,
      foreground_color: "#000000",
      frame_color: "#000000",
      frame_name: "no-frame",
      qr_code_logo: "https://i.giphy.com/3o7TKQNdELi4Fx2fAI.webp",
      qr_code_pattern: "",
      qr_code_text: keywordDebounced,
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
  await onInit();
  useIntervalFn(async () => {
    await onInit();
    await nextTick();
  }, 500);
});

const onGenerateNew = async () => {
  await onInit();
};

const onInit = async () => {
  await nextTick();
  let backgroundColor = "black";
  if (containerEl.value) {
    const computedStyle = window.getComputedStyle(window.document.body);
    backgroundColor = computedStyle.backgroundColor;
  }
  const svgElement = containerEl.value?.firstChild as SVGSVGElement;
  const bg = svgElement?.querySelector('rect[width="2000"]');
  bg?.setAttribute("fill", "transparent");
  const childNodes = Array.from(
    svgElement?.firstChild?.nextSibling?.childNodes ?? [],
  );
  const filteredNodes = childNodes?.slice(2) || [];
  const squares = svgElement?.querySelectorAll("#Ebene_1") ?? [];

  filteredNodes.forEach((node: ChildNode) => {
    const rect = node as Element;
    rect.setAttribute?.("fill", getRandomColor(backgroundColor));
  });

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

const onToggleBgColor = async () => {
  const root = document.documentElement;
  const currentBgColor = getComputedStyle(root)
    .getPropertyValue("--bg-color")
    .trim();
  const newBgColor = currentBgColor === "white" ? "black" : "white";
  const newTextColor = newBgColor === "white" ? "black" : "white";
  root.style.setProperty("--bg-color", newBgColor);
  root.style.setProperty("--text-color", newTextColor);
  await nextTick();
  await onGenerateNew();
};
</script>

<style>
:root {
  --bg-color: black;
  --text-color: white;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
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
