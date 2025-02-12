// export const postFbPixelEvent = () => {
//   window.fbq("track", "Purchase", {
//     content_ids: ["partner_event_id"],
//     eventref: "fb_oea", // or set to empty string
//     currency: "INR", // your currency string value goes here
//     num_items: 1, // your number of tickets purchased value goes here
//     value: 1, // your total transaction value goes here
//   });
// };

export const postFbPixelEvent = (name, options = {}) => {
  if (window && window.fbq) {
    window.fbq("track", name, options);
  }
};
