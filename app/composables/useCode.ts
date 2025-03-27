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
      if (isAnimationEnabled.value && animation.value.mode === "ease-in") {
        await promiseTimeout(animation.value.speed);
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

  onMounted(async () => {
    await onInit();
  });

  return { onInit };
}
