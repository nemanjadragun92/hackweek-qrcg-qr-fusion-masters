import { getRandomColorFromArray, onCheckValidUrl } from "~/utils/general.util";

const containerEl = ref<HTMLElement | null>(null);
const url = ref<string>("https://bitly.com");
const image = ref<string>("https://cdn.worldvectorlogo.com/logos/bitly.svg");
const urlDebounced = refDebounced(url, 500);

export default function useCode() {
  const {
    isDarkMode,
    isAnimationEnabled,
    animation,
    selectedTheme,
    isRandomColorEnabled,
    selectedColors,
  } = useConfig();

  const beforeInitConfig = () => {
    themeStarsInit();
    themeEarthInit();
  };

  const onInit = async () => {
    if (!containerEl.value) return;
    beforeInitConfig();
    await nextTick();
    const backgroundColor = isDarkMode.value ? "#000000" : "#ffffff";
    const svgElement = containerEl.value?.firstChild as SVGSVGElement;
    const bg = svgElement?.querySelector('rect[width="2000"]');
    bg?.setAttribute("fill", hexToRgba(backgroundColor, 0.75));
    const childNodes = Array.from(
      svgElement?.firstChild?.nextSibling?.childNodes ?? [],
    );
    const filteredNodes = childNodes?.slice(2) || [];
    const squares = svgElement?.querySelectorAll("#Ebene_1") ?? [];

    for (const node of filteredNodes) {
      const rect = node as Element;
      if (["rect", "polygon"].includes(rect.nodeName)) {
        if (isAnimationEnabled.value && animation.value.mode === "ease-in") {
          await promiseTimeout(animation.value.speed);
        }

        if (isRandomColorEnabled.value) {
          rect.setAttribute?.("fill", getRandomColor(backgroundColor));
        } else {
          rect.setAttribute?.(
            "fill",
            getRandomColorFromArray(selectedColors.value),
          );
        }
        // rect.classList?.add?.("size-9"); // TODO: Add size to config
        // rect.classList?.add?.("fill-red-500"); // TODO: Add solid color to config
        switch (selectedTheme.value) {
          case ETheme.stars:
            themeStarsGenerateStars(rect, backgroundColor);
            break;
          case ETheme.earth:
            themeEarthGenerateGlobe(rect);
            break;
        }
      }
    }

    squares.forEach((rect: Element) => {
      const paths: HTMLCollectionOf<SVGPathElement> =
        rect.getElementsByTagName("path");
      Array.from(paths).forEach((path) => {
        if (isRandomColorEnabled.value) {
          path.setAttribute("fill", getRandomColor(backgroundColor));
        } else {
          path.setAttribute(
            "fill",
            getRandomColorFromArray(selectedColors.value),
          );
        }
      });
      const polygons: HTMLCollectionOf<SVGPolygonElement> =
        rect.getElementsByTagName("polygon");
      Array.from(polygons).forEach((polygon) => {
        if (isRandomColorEnabled.value) {
          polygon.setAttribute("fill", getRandomColor(backgroundColor));
        } else {
          polygon.setAttribute(
            "fill",
            getRandomColorFromArray(selectedColors.value),
          );
        }
      });
    });
  };

  const returnValidUrl = computed(() => {
    return onCheckValidUrl(url.value) ? url.value : null;
  });

  onMounted(async () => {
    await onInit();
  });

  return { containerEl, url, returnValidUrl, image, urlDebounced, onInit };
}
