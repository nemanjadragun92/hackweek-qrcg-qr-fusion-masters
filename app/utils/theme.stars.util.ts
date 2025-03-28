export const themeStarsGenerateStars = (
  rect: Element,
  backgroundColor: string,
) => {
  if (rect.nodeName === "rect") {
    // Get the position and size of the rect
    const x = parseFloat(rect.getAttribute?.("x") || "0");
    const y = parseFloat(rect.getAttribute?.("y") || "0");
    const width = parseFloat(rect.getAttribute?.("width") || "0");
    const height = parseFloat(rect.getAttribute?.("height") || "0");

    // Calculate the center of the rect
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    // Create a star shape centered at the rect's center
    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    const points = [
      [centerX, centerY - 35],
      [centerX + 11, centerY - 15],
      [centerX + 35, centerY - 15],
      [centerX + 16, centerY],
      [centerX + 22, centerY + 22],
      [centerX, centerY + 10],
      [centerX - 22, centerY + 22],
      [centerX - 16, centerY],
      [centerX - 35, centerY - 15],
      [centerX - 11, centerY - 15],
    ]
      .map((point) => point.join(","))
      .join(" ");
    star.setAttribute?.("points", points);
    star.setAttribute?.("fill", getRandomColor(backgroundColor));
    rect.replaceWith?.(star);
  }
};

const themeStarsGenerateStarsBackground = (density: number, amount: number) => {
  const svgContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  svgContainer.setAttribute("width", window.innerWidth.toString());
  svgContainer.setAttribute("height", window.innerHeight.toString());
  svgContainer.style.position = "absolute";
  svgContainer.style.top = "0";
  svgContainer.style.left = "0";
  svgContainer.style.zIndex = "1";
  const element = document.getElementById("content");

  if (!element) return;

  if (!element!.childNodes.length) {
    element!.appendChild(svgContainer);
    for (let i = 0; i < amount; i++) {
      const star = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon",
      );
      const centerX = Math.random() * window.innerWidth;
      const centerY = Math.random() * window.innerHeight;
      const outerRadius = density; // Increase the outer radius
      const innerRadius = outerRadius / 2.5;
      const numPoints = 5;

      const starPoints = Array.from({ length: numPoints * 2 })
        .map((_, i) => {
          const angle = (i * Math.PI) / numPoints;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          return [
            centerX + radius * Math.cos(angle - Math.PI / 2),
            centerY + radius * Math.sin(angle - Math.PI / 2),
          ].join(",");
        })
        .join(" ");

      star.setAttribute("points", starPoints);
      star.classList.add("opacity-75");
      star.setAttribute("fill", getRandomColor("#000000")); // Assuming background color is black

      svgContainer.appendChild(star);
    }
  } else {
    for (const star of element!.querySelectorAll("polygon")) {
      star.setAttribute("fill", getRandomColor("#000000"));
    }
  }
};

const { selectedTheme, selectedThemeConfig } = useConfig();

export const themeStarsInit = () => {
  if (selectedTheme.value === ETheme.stars) {
    let density = selectedThemeConfig.value.density;
    if (density < 1) {
      density = 1;
    } else if (density > 100) {
      density = 100;
    }
    let amount = selectedThemeConfig.value.amount;
    if (amount > 10000) {
      amount = 10000;
    }
    themeStarsGenerateStarsBackground(density, amount);
  }
};
