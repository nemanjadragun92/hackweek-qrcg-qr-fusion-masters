export const appendMissingDots = (
  container: Element | undefined,
  size: number,
  startPoint = 200,
  endPoint = 1736,
  fakeDotColor = "rgba(255,255,255,1)",
) => {
  if (!container) return;
  const missingDots = 10000;

  let x = startPoint;
  let y = startPoint;
  for (let i = 0; i < missingDots; i++) {
    const fakeDot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    fakeDot.setAttribute("x", `${x}`);
    fakeDot.setAttribute("y", `${y}`);
    fakeDot.setAttribute("width", `${size}`);
    fakeDot.setAttribute("height", `${size}`);
    fakeDot.setAttribute("fill", fakeDotColor);
    fakeDot.classList.add("readonly", "size-9");
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
