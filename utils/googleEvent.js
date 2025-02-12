import ReactG4 from "react-ga4";

export const postGoogleEvent = (category, action) => {
  ReactG4.event({
    category: category,
    action: action,
  });
};

export const postSubmitGoogleEvent = (category, action) => {
  ReactG4.event({
    category: category,
    action: action,
    purchase: 1,
  });
};
