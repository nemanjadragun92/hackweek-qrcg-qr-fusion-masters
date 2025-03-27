export default function useCode(containerEl: Ref<HTMLElement | null>) {
  const { isDarkMode, isAnimationEnabled, animation } = useConfig();

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

        // TODO: Add star shape to config
        // if (rect.nodeName === "rect") {
        //   // Get the position and size of the rect
        //   const x = parseFloat(rect.getAttribute?.("x") || "0");
        //   const y = parseFloat(rect.getAttribute?.("y") || "0");
        //   const width = parseFloat(rect.getAttribute?.("width") || "0");
        //   const height = parseFloat(rect.getAttribute?.("height") || "0");
        //
        //   // Calculate the center of the rect
        //   const centerX = x + width / 2;
        //   const centerY = y + height / 2;
        //
        //   // Create a star shape centered at the rect's center
        //   const star = document.createElementNS(
        //     "http://www.w3.org/2000/svg",
        //     "polygon",
        //   );
        //   const points = [
        //     [centerX, centerY - 35],
        //     [centerX + 11, centerY - 15],
        //     [centerX + 35, centerY - 15],
        //     [centerX + 16, centerY],
        //     [centerX + 22, centerY + 22],
        //     [centerX, centerY + 10],
        //     [centerX - 22, centerY + 22],
        //     [centerX - 16, centerY],
        //     [centerX - 35, centerY - 15],
        //     [centerX - 11, centerY - 15],
        //   ]
        //     .map((point) => point.join(","))
        //     .join(" ");
        //   star.setAttribute?.("points", points);
        //   star.setAttribute?.("fill", getRandomColor(backgroundColor));
        //   rect.replaceWith?.(star);
        // }
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

  return { onInit };
}
