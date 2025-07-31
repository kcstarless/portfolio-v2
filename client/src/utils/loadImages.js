export const preloadImages = async (imageUrls, onProgress = () => {}) => {
  const loadImage = (url, index) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        onProgress(index, url, "loaded");
        resolve(url);
      };

      img.onerror = (err) => {
        console.warn(`Image failed to load: ${url}`);
        onProgress(index, url, "error");
        resolve(url); // don't block everything for one failed image
      };
    });

  await Promise.all(imageUrls.map((url, i) => loadImage(url, i)));
};