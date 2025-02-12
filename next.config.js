// const ContentSecurityPolicy = `default-src 'self' 'unsafe-inline' https://fonts.googleapis.com/css2;frame-src 'self' https://www.youtube.com/ https://maps.google.com/ https://www.google.com/;img-src 'self' 'sha256-4/2nIlfwIVTJ1+JcNQ6LkeVWzNS148LKAJeL5yofdN4=' data: https://devops.virohan.com;script-src 'self' 'unsafe-eval' https://www.googletagmanager.com 'sha256-sd4wCD7kjvX6DrPiL7dqWHP4+H/tFCSbjAOAzpIBVQE=';font-src 'self' https://fonts.gstatic.com/s/mulish/v11/1Ptvg83HX_SGhgqk0gotYKNnBcif.woff2 https://fonts.gstatic.com/s/mulish/v11/1Ptvg83HX_SGhgqk2wotYKNnBcif.woff2 https://fonts.gstatic.com/s/mulish/v11/1Ptvg83HX_SGhgqk0AotYKNnBcif.woff2 https://fonts.gstatic.com/s/mulish/v11/1Ptvg83HX_SGhgqk0QotYKNnBcif.woff2 https://fonts.gstatic.com/s/mulish/v11/1Ptvg83HX_SGhgqk3wotYKNnBQ.woff2 data:;
// `;
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "ALLOW-FROM https://www.dpgitm.ac.in",
  },
  {
    key: "Permissions-Policy",
    value: "",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  // },
];
module.exports = {
  reactStrictMode: true,
  // basePath: "/delhi-eok/centre-1",
  // assetPrefix: "https://devops.virohan.com/rustomjee/",
  // assetPrefix: "/delhi-kalkaji/centre-1/",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/not-found",
  //       basePath: false,
  //       permanent: false,
  //     },
  //   ];
  // },
  images: {
    domains: ["media-cms.virohan.com", "www.facebook.com"],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.svg$/i,
  //       issuer: /\.[jt]sx?$/,
  //       use: ["@svgr/webpack"],
  //     },
  //   ],
  // },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // async rewrites() {
  //   let host = "https://admission.virohan.com/";
  //   let ep = "https://dev-ops.virohan.com/graphql"; // production

  //   if (process.env.APP_ENV === "local") {
  //     ep = "http://localhost:1337/graphql";
  //     host = "http://localhost:3000/";
  //   } else if (process.env.APP_ENV === "testing") {
  //     host = "https://admission-dev.virohan.com/";
  //   } else if (process.env.APP_ENV === "prod") {
  //     host = "https://admission.virohan.com/";
  //   } else {
  //     host = "https://admission.virohan.com/";
  //   }

  //   const client = new ApolloClient({
  //     uri: ep,
  //     cache: new InMemoryCache(),
  //   });

  //   let landingPageList = [];

  //   let gqlFilters = "";
  //   if (
  //     host === "http://localhost:3000/" ||
  //     host === "https://admission-dev.virohan.com/"
  //   ) {
  //     gqlFilters = `pagination: { limit: -1 } publicationState: PREVIEW  filters: {publishedAt: {eq: null}}`;
  //   } else {
  //     gqlFilters = `pagination: { limit: -1 }`;
  //   }
  //   let proxyServers;
  //   try {
  //     const response = await client.query({
  //       query: gql`
  //       query {
  //         landingPages(${gqlFilters}) {
  //           data {
  //             attributes {
  //               hero {
  //                 centers {
  //                   data {
  //                     attributes {
  //                       centerUri
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //       `,
  //     });
  //     landingPageList = response.data.landingPages.data;
  //     proxyServers = landingPageList.map((landingPage) => {
  //       return {
  //         source:
  //           landingPage.attributes.hero.centers.data[0].attributes.centerUri,
  //         destination: "/",
  //       };
  //     });
  //   } catch (err) {
  //     proxyServers = [
  //       {
  //         source: "/paramedical-courses/pan-india-1",
  //         destination: "/",
  //       },
  //       {
  //         source: "/course/bba-in-hospital-management",
  //         destination: "/",
  //       },
  //       {
  //         source: "/course/master-of-hospital-administration",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/bhilai-sspu",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/raipur-kalinga-university",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/bangalore/kanakpura-road-jyothi-group",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/bangalore/electronic-city-NTTF",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/mumbai/dahisar-rustomjee",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/mumbai/thane-rustomjee",
  //         destination: "/",
  //       },

  //       {
  //         source: "/paramedical-courses/gujarat/ahmedabad-iiiem",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/gujarat/surat-iiiem",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/gujarat/vadodara-iiiem",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/delhi-ncr/kalkaji",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/delhi-ncr/east-of-kailash",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/delhi-ncr/faridabad",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/delhi-ncr/meerut",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/delhi-ncr/gurugram/dpgitm",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/nagpur",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/raipur",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/mumbai",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/bangalore",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/gujarat",
  //         destination: "/",
  //       },
  //       {
  //         source: "/paramedical-courses/delhi-ncr",
  //         destination: "/",
  //       },
  //     ];
  //   }

  //   return proxyServers;
  // },
};
