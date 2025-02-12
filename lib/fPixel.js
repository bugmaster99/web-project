export const urlsToBeTrackedByPixel = [
  "/paramedical-courses",
  // "/paramedical-courses/south-region?source_id=4&cid=62",
  // "/paramedical-courses/north-region?source_id=4&cid=58",
  "/paramedical-courses/south-region",
  "/paramedical-courses/north-region",
];

export const FB_PIXEL_ID_1 = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_1;
export const FB_PIXEL_ID_2 = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_2;

export const pageview = () => {
  if (window && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  if (window && window.fbq) {
    window.fbq("track", name, options);
  }
};
