export const appendMissingDots = (
  container: Element | undefined,
  size: number,
  startPoint = 200,
  endPoint = 1736,
  fakeDotColor = "rgba(255,255,255,1)",
) => {
  if (!container) return;
  const missingDots = 2500;

  let x = startPoint;
  let y = startPoint;
  for (let i = 0; i < missingDots; i++) {
    const fakeDot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    fakeDot.setAttribute("x", `${x + 12}`);
    fakeDot.setAttribute("y", `${y + 12}`);
    fakeDot.setAttribute("width", `${size}`);
    fakeDot.setAttribute("height", `${size}`);
    fakeDot.setAttribute("fill", fakeDotColor);
    // TODO: In case of error make same size-12
    fakeDot.classList.add("readonly", "size-6");
    x += size;
    if (x > endPoint) {
      x = startPoint;
      y += size;
      if (y > endPoint) {
        break;
      }
    }
    const thirdChild = container.children[1];
    container.insertBefore(fakeDot, thirdChild ? thirdChild.nextSibling : null);
  }
};
