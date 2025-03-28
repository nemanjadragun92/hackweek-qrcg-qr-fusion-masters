import jsQR from "jsqr";

export const isQRCodeScannable = async (svgElement: SVGElement) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return resolve(false);

      const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
      resolve(qrCode !== null);
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  });
};

export const isQRCodeWithBackgroundScannable = async (element: HTMLElement) => {
  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(element, {
    logging: false,
  });
  const ctx = canvas.getContext("2d");

  if (!ctx) return false;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

  return qrCode !== null;
};
