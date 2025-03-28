export const promiseTimeout = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandomColor = (_backgroundColor: string): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  const backgroundColor = getBlackOrWhite(_backgroundColor);
  // console.log("backgroundColor", { _backgroundColor, backgroundColor });
  // Ensure sufficient contrast with the background color
  if (backgroundColor === "white") {
    // Ensure the color is dark enough to contrast with a white background
    while (isLightColor(color)) {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
  } else if (backgroundColor === "black") {
    // Ensure the color is light enough to contrast with a black background
    while (!isLightColor(color)) {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
  }

  return color;
};

const isLightColor = (color: string): boolean => {
  // Convert hex color to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is light (brightness > 128), false otherwise
  return brightness > 128;
};

const getBlackOrWhite = (color: string): string => {
  const hexToRgb = (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1]! + hex[1]!, 16);
      g = parseInt(hex[2]! + hex[2]!, 16);
      b = parseInt(hex[3]! + hex[3]!, 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1]! + hex[2]!, 16);
      g = parseInt(hex[3]! + hex[4]!, 16);
      b = parseInt(hex[5]! + hex[6]!, 16);
    }
    return { r, g, b };
  };

  const rgbToObj = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    return result
      ? {
          r: parseInt(result[0]),
          g: parseInt(result[1]!),
          b: parseInt(result[2]!),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const isLightColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  let rgbColor;
  if (color.startsWith("#")) {
    rgbColor = hexToRgb(color);
  } else if (color.startsWith("rgb")) {
    rgbColor = rgbToObj(color);
  } else {
    throw new Error("Unsupported color format");
  }

  return isLightColor(rgbColor) ? "white" : "black";
};

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getRandomColorFromArray = (colors: string[]): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as string;
};
