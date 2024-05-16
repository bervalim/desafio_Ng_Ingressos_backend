export const isValidImageUrl = (url: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};
