export const themeEarthGenerateGlobe = (rect: Element) => {
  const width = parseFloat(rect.getAttribute?.("width") || "0");
  const height = parseFloat(rect.getAttribute?.("height") || "0");
  const radius = Math.min(width, height) / 2;
  rect.setAttribute?.("rx", radius.toString());
  rect.setAttribute?.("ry", radius.toString());
};

const themeEarthGeneratePlanetsBackground = (
  density: number,
  amount: number,
) => {
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
      const planet = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      const centerX = Math.random() * window.innerWidth;
      const centerY = Math.random() * window.innerHeight;
      const radius = Math.random() * density; // Random radius based on density

      planet.setAttribute("cx", centerX.toString());
      planet.setAttribute("cy", centerY.toString());
      planet.setAttribute("r", radius.toString());
      planet.classList.add("opacity-75");
      planet.setAttribute("fill", getRandomColor("#000000")); // Assuming background color is black

      svgContainer.appendChild(planet);
    }
  } else {
    for (const planet of element!.querySelectorAll("circle")) {
      planet.setAttribute("fill", getRandomColor("#000000"));
    }
  }
};

const { selectedTheme, selectedThemeConfig } = useConfig();

export const themeEarthInit = () => {
  if (selectedTheme.value === ETheme.earth) {
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
    themeEarthGeneratePlanetsBackground(density, amount);
  }
};
