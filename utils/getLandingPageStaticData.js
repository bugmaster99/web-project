export const getLandingPageStaticData = async (host, env) => {
  try {
    const ep =
      env === "prod"
        ? "https://api-website.virohan.com/getStaticWebsiteData"
        : "https://api-website.virohan.com/getStaticWebsiteData/testing";

    const response = await fetch(ep, {
      method: "POST",
      headers: {
        origin: host,
        "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
      },
      body: JSON.stringify({
        filePath: "static/landingPages/landingPageData.json",
      }),
    });

    const data = await response.json();

    if (data?.data) {
      return data.data;
    }
    // return JSON.parse(
    //   await fs.readFile(process.cwd() + "/static/homePageData.json", "utf8")
    // );
  } catch (error) {
    console.log("Error parsing JSON:", error);
    return null;
  }
};
