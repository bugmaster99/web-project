export const GET_LANDING_PAGE_DATA = (host, uri) => {
  const gqlFilters = `filters: {hero: {center: {centerUri: {eq: "${uri}"}}} }`;
  return `query {
    landingPages(${gqlFilters}) {
      data {
        attributes {
          googleAnalytics,
          facebookAnalytics,
          eskimiAnalytics
          hero {
            title
            description
            imgDesktop {
              data {
                attributes {
                  url
                }
              }
            }
            imgMobile {
              data {
                attributes {
                  url
                }
              }
            }
            showHero
            courses {
              data {
                attributes {
                  
                  name
                }
              }
            }
            center {
              data {
                attributes {
                  centerUri,
                  centerName,
                  seoInformation {
                    title,
                    description
                  }
                  centerList(pagination: {page:1,pageSize:50 }) {
                    centerName,
                    centerId
                  }
                }
              }
            }
            landingPageType {
              data {
                attributes {
                  type
                }
              }
            }
            formLevel
            firstFormTitle
            firstFormDescription
            secondFormTitle
            secondFormDescription
          }
          speciality {
            showSpeciality
            specialityList {
              id
              title
              img {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
          courses {
            showCourses
            title,
            courseList {
              id
              title,
              description,
              img {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              ctaText
            }
          }
          whatSetsUsApart {
            showWhatSetsUsApart
            title,
            img {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            ctaText
            whatSetsUsApartList {
              id,
              title,
              description,
              img {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
          journey {
            showJourney
            title,
            ctaText
            journeyList {
              id
              title,
              description
              img {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
          watchUsYourself {
            showWatchUsYourself
            title,
            watchUsYourselfList {
              id,
              youtubeUrl
            }
          }
          campuses {
            showCampuses
            title,
            description
          }
          whyStudentsLoveUs {
            showWhyStudentsLoveUs,
            title,
            whyStudentsLoveUsList {
              id,
              title,
              description,
              img {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              youtubeUrl
            }
          }
        }
      }
    }
  }`;
};
