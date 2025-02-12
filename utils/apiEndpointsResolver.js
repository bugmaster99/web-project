const BASE_URL = "https://api-website.virohan.com";

const TESTING_EPS = Object.freeze({
  GET_STATES: `${BASE_URL}/getStates/v2/testing`,
  SUBMIT_OTP: `${BASE_URL}/submitOTP/testing`,
  GET_OTP: `${BASE_URL}/getotp/testing`,
  SUBMIT_LEAD_FORM: `${BASE_URL}/submitLeadForm/testing`,
  LEAD_QUALIFICATION_FORM: `${BASE_URL}/leadQualificationForm/testing`,
  GET_CENTRES: `${BASE_URL}/getCentres/testing`,
  LANDING_PAGE_CENTRE_URLS: `${BASE_URL}/landingPageCentreUrls/testing`,
  PIXEL_LOG: `${BASE_URL}/pixelLog/testing`,
  GET_LEAD_SOURCE: `${BASE_URL}/getLeadSource/testing`,
});

const DEVELOPMENT_EPS = Object.freeze({
  GET_STATES: `${BASE_URL}/getStates/v2/testing`,
  SUBMIT_OTP: `${BASE_URL}/submitOTP/testing`,
  GET_OTP: `${BASE_URL}/getotp/testing`,
  SUBMIT_LEAD_FORM: `${BASE_URL}/submitLeadForm/testing`,
  LEAD_QUALIFICATION_FORM: `${BASE_URL}/leadQualificationForm/testing`,
  GET_CENTRES: `${BASE_URL}/getCentres/testing`,
  LANDING_PAGE_CENTRE_URLS: `${BASE_URL}/landingPageCentreUrls/testing`,
  PIXEL_LOG: `${BASE_URL}/pixelLog/testing`,
  GET_LEAD_SOURCE: `${BASE_URL}/getLeadSource/testing`,
});

const PRODUCTION_EPS = Object.freeze({
  GET_STATES: `${BASE_URL}/getStates/v2`,
  SUBMIT_OTP: `${BASE_URL}/submitOTP`,
  GET_OTP: `${BASE_URL}/getotp`,
  SUBMIT_LEAD_FORM: `${BASE_URL}/submitLeadForm`,
  LEAD_QUALIFICATION_FORM: `${BASE_URL}/leadQualificationForm`,
  GET_CENTRES: `${BASE_URL}/getCentres`,
  LANDING_PAGE_CENTRE_URLS: `${BASE_URL}/landingPageCentreUrls`,
  PIXEL_LOG: `${BASE_URL}/pixelLog`,
  GET_LEAD_SOURCE: `${BASE_URL}/getLeadSource`,
});

export const getApiEndPointsResolver = (env) => {
  if (env === "local") {
    return TESTING_EPS;
  }
  if (env === "dev") {
    return DEVELOPMENT_EPS;
  }
  if (env === "prod") {
    return PRODUCTION_EPS;
  }
};
