import { getApiEndPointsResolver } from "./apiEndpointsResolver";

const getCentres = async (env, url) => {
  try {
    const ep = getApiEndPointsResolver(env).LANDING_PAGE_CENTRE_URLS;
    const response = await fetch(ep, {
      method: "GET",
      headers: {
        "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
      },
    });
    const data = await response.json();
    const centers = data;

    const selectedCentreData = centers.filter((centre) => {
      if (url === "/" || url === "/paramedical-courses/pan-india-1") {
        if (centre.centreUri === "/paramedical-courses") {
          return centre;
        }
      } else {
        if (centre.centreUri === url) {
          return centre;
        }
      }
    });

    if (url === "/paramedical-courses/pan-india-1") {
      selectedCentreData[0].title = "";
      selectedCentreData[0].description = "";
      selectedCentreData[0].centres = selectedCentreData[0].centres.filter(
        (centreData) => {
          if (
            centreData.centreName === "Delhi - Kalkaji" ||
            centreData.centreName === "Faridabad" ||
            centreData.centreName === "Gurugram - DPGITM" ||
            centreData.centreName === "Nagpur" ||
            centreData.centreName === "Mumbai (Dahisar)" ||
            centreData.centreName === "Bangalore (Electronic city)" ||
            centreData.centreName === "Raipur"
          ) {
            return centreData;
          }
        }
      );
      return selectedCentreData[0];
    }
    return selectedCentreData[0];
  } catch (error) {
    return JSON.stringify([
      {
        title: "no data",
        description: "no data",
        centreUri: "no data",
        centres: [],
      },
    ]);
  }
};

export default getCentres;
