import { getApiEndPointsResolver } from "./apiEndpointsResolver";

const getCentresLocation = async (env, host, url) => {
  try {
    const ep = getApiEndPointsResolver(env).GET_CENTRES;
    const response = await fetch(ep, {
      method: "GET",
      headers: {
        origin: host, // https://admission.virohan.com
        "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
      },
    });
    const data = await response.json();
    const centersLoacation = data;

    if (url === "/course/bba-in-hospital-management") {
      const eleIndex = centersLoacation.findIndex(
        (center) =>
          center.name === "Phagwara - GNA University" && center.id === 81 // enter center name i.e added in api
      );

      let firstEle = centersLoacation[0];
      centersLoacation[0] = centersLoacation[eleIndex];
      centersLoacation[eleIndex] = firstEle;
      return centersLoacation;
    } else if (url === "/course/master-of-hospital-administration") {
      const eleIndex = centersLoacation.findIndex(
        (center) =>
          center.name ===
            "Bhilai - Shri Shankaracharya Professional University" &&
          center.id === 80 // enter center name i.e added in api
      );

      let firstEle = centersLoacation[0];
      centersLoacation[0] = centersLoacation[eleIndex];
      centersLoacation[eleIndex] = firstEle;
      return centersLoacation;
    }
    return centersLoacation;
  } catch (error) {
    return [
      {
        id: 26,
        name: "no data",
        latitude: "0",
        longitude: "0",
      },
    ];
  }
};

export default getCentresLocation;
