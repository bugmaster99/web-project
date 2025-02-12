import { getApiEndPointsResolver } from "./apiEndpointsResolver";

export const setWhatsappTrueSource = async (env, host, pageUrl) => {
  try {
    const ep = getApiEndPointsResolver(env).GET_LEAD_SOURCE;
    const response = await fetch(ep, {
      method: "POST",
      headers: {
        origin: host,
        "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
      },
      body: JSON.stringify({ data: { url: btoa(pageUrl) } }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    if (data?.data) {
      const shortUrl = data?.data;
      return shortUrl;
    }
    return "";
  } catch (error) {
    console.log(`[ERROR] While trying to set whatsapp true source: `, error);
    return null;
  }
};
