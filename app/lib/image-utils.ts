export const isValidImageUrl = (url: string): boolean => {
  // Regular expression for URL validation
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp))$/i;

  return urlPattern.test(url);
};

// WARNING: this is dangerous!
// Allowing the user to enter any URL could lead to XSS attacks.
// This is just a demo, so we're going to allow it.
// Leaving more details in the PR for this feature.
// https://nextjs.org/docs/app/api-reference/components/image#loader
export const customLoader = ({ src }: { src: string }) => {
  return src;
};
