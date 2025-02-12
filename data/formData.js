export const AGE_LIST = [
  { label: "Select Your Age", value: "age" },
  { label: 16, value: 16 },
  { label: 17, value: 17 },
  { label: 18, value: 18 },
  { label: 19, value: 19 },
  { label: 20, value: 20 },
  { label: 21, value: 21 },
  { label: 22, value: 22 },
  { label: 23, value: 23 },
  { label: 24, value: 24 },
  { label: 25, value: 25 },
  { label: 26, value: 26 },
  { label: 27, value: 27 },
  { label: 28, value: 28 },
  { label: 29, value: 29 },
  { label: 30, value: 30 },
  { label: 31, value: 31 },
  { label: 32, value: 32 },
  { label: 33, value: 33 },
  { label: 34, value: 34 },
  { label: 35, value: 35 },
  { label: "35+", value: "35+" },
];

export const LANGUAGE_LIST = [
  { label: "Select Your Language", value: "not-selected" },
  { label: "English (Preferred)", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Gujrati", value: "Gujrati" },
  { label: "Kannada", value: "Kannada" },
  { label: "Punjabi", value: "Punjabi" },
  { label: "Tamil", value: "Tamil" },
];

export const getCourses = (url) => {
  if (url === "/course/master-of-hospital-administration") {
    return [
      { label: "Course Interested In", value: "not-selected" },
      {
        label: "2 Year MHA Degree (Fees: ₹2,97,000)",
        value: "2 Year MHA Degree (Fees: ₹2,97,000)",
      },
    ];
  } else {
    return [
      { label: "Course Interested In", value: "not-selected" },
      {
        label: "3 Year Degree (Fees: ₹2,97,000)",
        value: "3 Year Degree (Fees: ₹2,97,000)",
      },
      {
        label: "2 Year Advance Diploma (Fees: ₹1,98,000)",
        value: "2 Year Advance Diploma (Fees: ₹1,98,000)",
      },
      {
        label: "1 Year Diploma (Fees: ₹99,000)",
        value: "1 Year Diploma (Fees: ₹99,000)",
      },
    ];
  }
};

export const FAMILY_INCOME_LIST = [
  { label: "What is your family monthly income?", value: "not-selected" },
  {
    label: "Less than ₹20,000 per month",
    value: "Less than ₹20,000 per month",
  },
  { label: "₹20,000-₹50,000 per month", value: "₹20,000-₹50,000 per month" },
  {
    label: "Greater than ₹50,000 per month",
    value: "Greater than ₹50,000 per month",
  },
];

export const FINANCIAL_ASSISTANCE_LIST = [
  { label: "Require Education Loan?", value: "not-selected" },
  {
    label: "Yes",
    value: "Yes",
  },
  { label: "No", value: "No" },
];

export const WILLING_REALLOCATION_LIST = [
  { label: "Willing to relocate", value: "not-selected" },
  {
    label: "Yes",
    value: "Yes",
  },
  { label: "No", value: "No" },
];
