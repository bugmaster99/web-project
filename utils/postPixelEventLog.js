import { getApiEndPointsResolver } from "./apiEndpointsResolver";

const postPixelEventLog = async ({
  env,
  mobileNumber,
  pixel,
  event,
  pageUrl,
}) => {
  // const ep = "https://api-website.virohan.com/pixelLog";
  const ep = getApiEndPointsResolver(env).PIXEL_LOG;
  const payLoad = {
    mobileNumber: mobileNumber,
    pixel: pixel,
    event: event,
    pageUrl: pageUrl,
  };
  try {
    const response = await fetch(ep, {
      method: "POST",
      headers: {
        "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
      },
      body: JSON.stringify(payLoad),
    });

    const data = await response.json();

    if (data.status) {
    }
  } catch (error) {
    console.log(error);
  }
};

export default postPixelEventLog;
