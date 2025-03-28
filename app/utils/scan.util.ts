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
