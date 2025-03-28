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
    // bg?.setAttribute("fill", hexToRgba(backgroundColor, 0.75)); // TODO: Previous value
    bg?.setAttribute("fill", hexToRgba(backgroundColor, 0.1)); // TODO: New value once added BG support
    const childNodes = Array.from(
      svgElement?.firstChild?.nextSibling?.childNodes ?? [],
    );
    const svgSquaresElement = svgElement?.querySelectorAll("#Ebene_1");
    const filteredNodes = childNodes?.slice(2) || [];
    const squares = svgElement?.querySelectorAll("#Ebene_1") ?? [];
    for (const node of filteredNodes) {
      const rect = node as Element;
      const className = rect?.getAttribute?.("class") || "";
      if (
        ["rect", "polygon"].includes(rect.nodeName) &&
        !className.includes("readonly")
      ) {
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
        rect.classList?.add?.("size-9"); // TODO: Add size to config and also add to theme.background.ts same check
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

    // TODO: Automatically calculate total amount of dots based on last rect x, y and rect width, height
    // Also add missing dots maybe just for theme.background.util.ts
    const svgContainer = svgElement.children?.[0];
    const width = parseInt(
      svgContainer?.children?.[2]?.getAttribute("width") || "0",
    );
    const startPoint = parseInt(
      svgSquaresElement?.[0]?.getAttribute("x") || "200",
    );
    const endPoint = parseInt(
      svgContainer?.children?.[svgContainer.children.length - 7]?.getAttribute(
        "x",
      ) || "1736",
    );
    appendMissingDots(
      svgContainer,
      width,
      startPoint,
      endPoint,
      "rgba(255,255,255,0.5)",
    );
  };

  const returnValidUrl = computed(() => {
    return onCheckValidUrl(url.value) ? url.value : null;
  });

  onMounted(async () => {
    await onInit();
  });

  return { containerEl, url, returnValidUrl, image, urlDebounced, onInit };
}
