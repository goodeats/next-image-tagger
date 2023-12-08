export const isValidImageUrl = (url: string): boolean => {
  // Regular expression for URL validation
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp))$/i;

  return urlPattern.test(url);
};
