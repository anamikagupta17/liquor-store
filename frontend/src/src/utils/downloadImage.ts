import html2canvas from "html2canvas";
import domtoimage from "dom-to-image-more";

export const downloadDOMImage = async (id: string, filename: string) => {
  const element = document.getElementById(id);
  if (!element) return alert("Element not found");

  domtoimage
    .toPng(element, { quality: 1 })
    .then((dataUrl: string) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${filename}.png`;
      link.click();
    })
    .catch((error: any) => {
      console.error("Failed to generate image:", error);
    });
};


export const downloadDOMImageOld = async (id: string, filename: string) => {
  const element = document.getElementById(id);
  if (!element) {
    alert("Element not found");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // high resolution
      useCORS: true,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${filename}.png`;
    link.click();
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
};
