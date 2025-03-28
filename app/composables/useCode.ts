import { themeStarsInit } from "~/utils/theme.stars.util";

const containerEl = ref<HTMLElement | null>(null);
const url = ref<string>("https://qrapp-legacy.egodit.org");
const urlDebounced = refDebounced(url, 500);

export default function useCode() {
  const { isDarkMode, isAnimationEnabled, animation, selectedTheme } =
    useConfig();

  const beforeInitConfig = () => {
    themeStarsInit();
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
        rect.setAttribute?.("fill", getRandomColor(backgroundColor));
        // rect.classList?.add?.("size-9"); // TODO: Add size to config
        // rect.classList?.add?.("fill-red-500"); // TODO: Add solid color to config
        // TODO: Add rounded to config
        // const width = parseFloat(rect.getAttribute?.("width") || "0");
        // const height = parseFloat(rect.getAttribute?.("height") || "0");
        // const radius = Math.min(width, height) / 2;
        // rect.setAttribute?.("rx", radius.toString());
        // rect.setAttribute?.("ry", radius.toString());

        if (selectedTheme.value === ETheme.stars) {
          themeStarsGenerateStars(rect, backgroundColor);
        }
      }
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

  onMounted(async () => {
    await onInit();
  });

  return { containerEl, url, urlDebounced, onInit };
}
