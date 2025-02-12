import { Fragment, useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Container from "../Components/Layout/Container/Container";
import Seo from "../Components/Seo/Seo";
import Features from "../Components/Features/Features";
import Header from "../Components/Header/Header";
import Hero from "../Components/Hero/Hero";
import Courses from "../Components/Courses/Courses";
import WhatSetsUsApart from "../Components/WhatSetsUsApart/WhatSetsUsApart";
import Journey from "../Components/Journey/Journey";
import Footer from "../Components/Footer/Footer";

import WhyStudentsLoveUs from "../Components/WhyStudentsLoveUs/WhyStudentsLoveUs";
import { getHomepageData } from "../data/homepage.data";
import { FocusNameInputContextProvider } from "../store/focusNameInputContext";
import getCentres from "../utils/getCentres";
import getCentresLocation from "../utils/getCentersLoaction";
import dynamic from "next/dynamic";
import { GET_LANDING_PAGE_DATA } from "../utils/queries";
import { getLandingPageStaticData } from "../utils/getLandingPageStaticData";
import { setWhatsappTrueSource } from "../utils/setWhatsappTrueSource";

function HomePage(props) {
  // const { centresLocationList, uri, landingPageData, env } = props;

  // const seoData =
  //   landingPageData?.hero?.center?.data?.attributes?.seoInformation;

  // header options starts
  // const showCourses = landingPageData?.courses?.showCourses;
  // const showFeatures = landingPageData?.whatSetsUsApart?.showWhatSetsUsApart;
  // const showJourney = landingPageData?.journey?.showJourney;
  // const showCampuses = landingPageData?.campuses?.showCampuses;
  // const showTestimonials =
  //   landingPageData?.watchUsYourself?.showWatchUsYourself;
  // header options ends

  // const hero = landingPageData?.hero;
  const hero = {
    __typename: "ComponentLpHeroLpHero",
    title:
      '<p style="text-align:center;"><strong>#1 Bachelor\'s Degree</strong><br><strong>in Medical Field</strong></p>',
    description:
      '<p style="text-align:center;">Starting Salary upto <strong>50K</strong></p><p style="text-align:center;"><strong>98%</strong> Placement Rate</p><p style="text-align:center;"><strong>18-24 months</strong> Internship</p><p style="text-align:center;"><strong>20+ campuses</strong> across India</p>',
    imgDesktop: {
      __typename: "UploadFileEntityResponse",
      data: {
        __typename: "UploadFileEntity",
        attributes: {
          __typename: "UploadFile",
          url: "https://media-cms.virohan.com/staging/Untitled_1_3f76f436c9.jpg",
        },
      },
    },
    imgMobile: {
      __typename: "UploadFileEntityResponse",
      data: {
        __typename: "UploadFileEntity",
        attributes: {
          __typename: "UploadFile",
          url: "https://media-cms.virohan.com/staging/virtual_com_backgrounds_red_6ef74db94f.jpg",
        },
      },
    },
    showHero: true,
    courses: {
      __typename: "CourseRelationResponseCollection",
      data: [
        {
          __typename: "CourseEntity",
          attributes: {
            __typename: "Course",
            name: "4 Year B.Sc. Hons. Degree",
          },
        },
        {
          __typename: "CourseEntity",
          attributes: {
            __typename: "Course",
            name: "3 Year B.Sc. Degree",
          },
        },
        {
          __typename: "CourseEntity",
          attributes: {
            __typename: "Course",
            name: "3 Year Bachelor's Degree",
          },
        },
      ],
    },
    center: {
      __typename: "CenterEntityResponse",
      data: {
        __typename: "CenterEntity",
        attributes: {
          __typename: "Center",
          centerUri: "/",
          centerName: "Main LP",
          seoInformation: {
            __typename: "ComponentSeoInformationSeoInformation",
            title:
              "Check the Best Paramedical Course with Virohan in Healthcare",
            description:
              '"Virohan offers India\'s best paramedical course, professional training in Healthcare with the vision to empower youth to achieve their dream career."',
          },
          centerList: [
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Delhi (Chhatarpur) - Lingaya's LDIMS",
              centerId: 85,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Delhi (Dwarka) - SSIM",
              centerId: 92,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Delhi (Sheikh Sarai) - APCT",
              centerId: 94,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Faridabad (Sec 5)",
              centerId: 14,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Faridabad - Lingaya's Vidyapeeth University",
              centerId: 91,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Gurugram - Apeejay Stya University",
              centerId: 99,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Gurugram - DPGITM",
              centerId: 72,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Ghaziabad - HRIT University",
              centerId: 97,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Ghaziabad - TBI KIET",
              centerId: 93,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Jaipur - Suresh Gyan Vihar University",
              centerId: 101,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Lucknow - SRM University",
              centerId: 83,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Mumbai (Dahisar) - Rustomjee",
              centerId: 54,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Mumbai (Sion) - GNVS",
              centerId: 96,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Mumbai (Thane) - Rustomjee",
              centerId: 57,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Mumbai (Worli) - Sasmira's Institute",
              centerId: 90,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Nagpur (Trimurtee Nagar)",
              centerId: 16,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Roorkee - COER University",
              centerId: 82,
            },
            {
              __typename: "ComponentLpCentersLpCenters",
              centerName: "Varanasi - Ashoka Institute",
              centerId: 89,
            },
          ],
        },
      },
    },
    landingPageType: {
      __typename: "LandingPageTypeEntityResponse",
      data: {
        __typename: "LandingPageTypeEntity",
        attributes: {
          __typename: "LandingPageType",
          type: "Offline",
        },
      },
    },
    formLevel: 2,
    firstFormTitle: "FREE Career Counselling",
    firstFormDescription: " ",
    secondFormTitle: "Calling you in next 2 minutes",
    secondFormDescription:
      "Until then, help us with some more details to guide you better",
  };
  // const isFacebookAnalyticsActive = landingPageData?.facebookAnalytics;
  // const features = landingPageData?.speciality;
  // const courses = landingPageData?.courses;
  // const whatSetsUsApart = landingPageData?.whatSetsUsApart;
  // const journey = landingPageData?.journey;
  // const watchUsYourself = landingPageData?.watchUsYourself;
  // const campuses = landingPageData?.campuses;
  // const whyStudentsLoveUs = landingPageData?.whyStudentsLoveUs;

  const ctaText = "Book Now";
  // const hero = getHomepageData(uri).hero;
  // const features = getHomepageData(uri).features;
  // const courses = getHomepageData(uri).courses;
  // const whatSetsUsApart = getHomepageData(uri).whatSetsUsApart;
  // const studentJourney = getHomepageData(uri).studentJourney;
  // const watchUsYourself = getHomepageData(uri).watchUsYourself;
  // const whyStudentsLoveUs = getHomepageData(uri).whyStudentsLoveUs;
  const [scrollPos, setScrollPos] = useState(0);
  const [loadHeavyComponents, setLoadHeavyComponents] = useState(false);
  const WatchUsYourself = dynamic(() =>
    import("../Components/WatchUsYourself/WatchUsYourself")
  );

  const Campuses = dynamic(() => import("../Components/Campuses/Campuses"));

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 300) {
        if (!loadHeavyComponents) {
          setScrollPos(window.scrollY);
          setLoadHeavyComponents(true);
        }
      }
    };
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadHeavyComponents]);

  const itemClickHandler = (segment) => {
    setScrollPos(300);
    setLoadHeavyComponents(true);
  };

  return (
    <Fragment>
      <FocusNameInputContextProvider>
        <Container>
          {/* <Seo seoData={seoData} /> */}
          {/* <Header
            env={env}
            onNavigationItemClick={itemClickHandler}
            cta={ctaText}
            showCourses={showCourses}
            showFeatures={showFeatures}
            showJourney={showJourney}
            showCampuses={showCampuses}
            showTestimonials={showTestimonials}
            uri={uri}
          /> */}
          <main>
            {true && (
              <Hero
                env={"prod"}
                hero={hero}
                cta={ctaText}
                url={"/"}
                isFacebookAnalyticsActive={false}
              />
            )}
            {/* {features?.showSpeciality && <Features features={features} />}
            {showCourses && <Courses courses={courses} />}
            {whatSetsUsApart?.showWhatSetsUsApart && (
              <WhatSetsUsApart whatSetsUsApart={whatSetsUsApart} />
            )}
            {showJourney && <Journey journey={journey} />}
            {watchUsYourself?.showWatchUsYourself &&
              // uri !== "/course/bba-in-hospital-management" &&
              // uri !== "/course/master-of-hospital-administration" &&
              loadHeavyComponents &&
              scrollPos >= 300 && (
                <WatchUsYourself watchUsYourself={watchUsYourself} />
              )}

            <div id="campuses">
              {campuses?.showCampuses &&
                loadHeavyComponents &&
                scrollPos >= 300 && (
                  <Campuses
                    apiCentres={centresLocationList}
                    campuses={campuses}
                  />
                )}
            </div>

            {showTestimonials && (
              <WhyStudentsLoveUs whyStudentsLoveUs={whyStudentsLoveUs} />
            )} */}
          </main>
          <Footer />
        </Container>
      </FocusNameInputContextProvider>
    </Fragment>
  );
}

// export async function getStaticProps(context) {
//   const centers = await getCenters();
//   const newCentres = await getCentresNew();
//   return {
//     props: {
//       centers,
//       newCentres,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// }

// export async function getServerSideProps(context) {
//   let uri;
//   if (context.req.url.includes("?")) {
//     uri = context.req.url.split("?")[0];
//   } else {
//     uri = context.req.url;
//   }

//   const host = context.req.headers.host;

//   // const selectedCentreData = await getCentres(uri);
//   const centresLocationList = await getCentresLocation(
//     process.env.APP_ENV,
//     host,
//     uri
//   );

//   const protocol =
//     context.req.headers["x-forwarded-proto"] || context.req.connection.encrypted
//       ? "https"
//       : "http";

//   const pageUrl = protocol + "://" + host + "/blog" + context.resolvedUrl;
//   // const fullPageUrl = protocol + "://" + host + context.req.url;

//   let ep = "https://web-cms.virohan.com/graphql";

//   if (process.env.APP_ENV === "local") {
//     ep = "http://localhost:1337/graphql";
//   } else if (process.env.APP_ENV === "dev") {
//     ep = "https://dev-web-cms.virohan.com/graphql";
//   } else {
//     ep = "https://web-cms.virohan.com/graphql";
//   }

//   const client = new ApolloClient({
//     uri: ep,
//     cache: new InMemoryCache(),
//   });

//   let landingPageData;
//   try {
//     const response = await client.query({
//       query: gql`
//         ${GET_LANDING_PAGE_DATA(host, uri)}
//       `,
//     });
//     landingPageData = response?.data;

//     if (
//       landingPageData?.landingPages?.data instanceof Array &&
//       landingPageData?.landingPages?.data?.length === 0
//     ) {
//       return {
//         notFound: true,
//       };
//     }
//   } catch (err) {
//     console.log("ERR: ", err);
//     landingPageData = await getLandingPageStaticData(host, process.env.APP_ENV);
//     if (!landingPageData) {
//       return {
//         notFound: true,
//       };
//     }
//   }

//   // const shortUrl = await setWhatsappTrueSource(process.env.APP_ENV, host, fullPageUrl);

//   return {
//     props: {
//       // selectedCentreData,
//       env: process.env.APP_ENV,
//       centresLocationList,
//       uri,
//       pageUrl,
//       landingPageData: landingPageData?.landingPages?.data?.[0]?.attributes,
//     },
//   };
// }
export default HomePage;
