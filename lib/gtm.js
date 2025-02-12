export const pushToDataLayer = (event) => {
  window.dataLayer = window?.dataLayer || [];
  window.dataLayer.push(event);
};
