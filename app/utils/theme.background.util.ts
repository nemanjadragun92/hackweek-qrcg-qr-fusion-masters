export const appendMissingDots = (
  container,
  totalDots,
  fakeDotColor = "rgba(255,255,255,1)",
) => {
  if (!container) return;
  const existingDots = container.children.length;

  const missingDots = totalDots - existingDots;
  console.log("missingDots", missingDots);

  let x = 200;
  let y = 200;
  for (let i = 0; i < missingDots; i++) {
    console.log("creating");
    const fakeDot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    if (x >= 712 && x <= 1280 && y >= 200 && y <= 648) {
      fakeDot.setAttribute("x", `${x}`);
      fakeDot.setAttribute("y", `${y}`);
      fakeDot.setAttribute("width", "64");
      fakeDot.setAttribute("height", "64");
      fakeDot.setAttribute("fill", fakeDotColor);
      // fakeDot.classList.add("readonly", "size-9");
      fakeDot.classList.add("readonly");
    }
    if (x >= 200 && y >= 712 && y <= 1288) {
      fakeDot.setAttribute("x", `${x}`);
      fakeDot.setAttribute("y", `${y}`);
      fakeDot.setAttribute("width", "64");
      fakeDot.setAttribute("height", "64");
      fakeDot.setAttribute("fill", fakeDotColor);
      // fakeDot.classList.add("readonly", "size-9");
      fakeDot.classList.add("readonly");
    }

    if (x >= 712 && y >= 1352 && y <= 1736) {
      fakeDot.setAttribute("x", `${x}`);
      fakeDot.setAttribute("y", `${y}`);
      fakeDot.setAttribute("width", "64");
      fakeDot.setAttribute("height", "64");
      fakeDot.setAttribute("fill", fakeDotColor);
      // fakeDot.classList.add("readonly", "size-9");
      fakeDot.classList.add("readonly");
    }
    x += 64;
    if (x > 1736) {
      x = 200;
      y += 64;
      if (y > 1736) {
        break;
      }
    }
    const thirdChild = container.children[1];
    container.insertBefore(fakeDot, thirdChild ? thirdChild.nextSibling : null);
  }
};
