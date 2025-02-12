import React from "react";
import {
  AGE_LIST,
  FAMILY_INCOME_LIST,
  FINANCIAL_ASSISTANCE_LIST,
  getCourses,
  LANGUAGE_LIST,
  WILLING_REALLOCATION_LIST,
} from "../../data/formData";
import { postFbPixelEvent } from "../../utils/fbPixelEvent";
import {
  postGoogleEvent,
  postSubmitGoogleEvent,
} from "../../utils/googleEvent";

import { pushToDataLayer } from "../../lib/gtm";
import { getApiEndPointsResolver } from "../../utils/apiEndpointsResolver";
import postPixelEventLog from "../../utils/postPixelEventLog";
import classes from "./LeadQualificationForm.module.css";

const LeadQualificationForm = ({
  env,
  setCurrentForm,
  mobileNumber,
  url,
  otp,
  courses,
  isFacebookAnalyticsActive,
}) => {
  // const COURSE_LIST = getCourses(url);
  const COURSE_LIST = courses.data;
  const [isLoading, setIsLoading] = React.useState(false);

  const [age, setAge] = React.useState("not-selected");
  const ageChangedHandler = (event) => {
    setAge(event.target.value);
  };

  const [language, setLanguage] = React.useState("not-selected");
  const languageChangedHandler = (event) => {
    setLanguage(event.target.value);
  };

  const [course, setCourse] = React.useState("not-selected");
  const courseChangedHandler = (event) => {
    setCourse(event.target.value);
  };

  const [familyIncome, setFamilyIncome] = React.useState("not-selected");
  const familyIncomeChangedHandler = (event) => {
    setFamilyIncome(event.target.value);
  };

  const [educationLoan, setEducationLoan] = React.useState("not-selected");
  const educationLoanChangedHandler = (event) => {
    setEducationLoan(event.target.value);
  };

  const [willingReallocation, setWillingReallocation] =
    React.useState("not-selected");
  const willingReallocationChangedHandler = (event) => {
    setWillingReallocation(event.target.value);
  };

  const leadQualificationHandler = async (event) => {
    event.preventDefault();

    const leadQualificationPostJsonData = JSON.stringify({
      age,
      otp,
      language,
      course,
      familyIncome,
      educationLoan,
      willingReallocation,
      mobileNumber,
    });

    setIsLoading(true);

    try {
      const ep = getApiEndPointsResolver(env).LEAD_QUALIFICATION_FORM;
      const response = await fetch(ep, {
        method: "POST",
        headers: {
          "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
        },
        body: leadQualificationPostJsonData,
      });
      const data = await response.json();
      if (response.status === 200 && data?.msg === "success") {
        //Handle the form event in  google analytics.
        postGoogleEvent("Submit_Details_Form_AdmissionPg", "Click");
        postFbPixelEvent("CompleteRegistration", {
          content_ids: ["partner_event_id"],
          eventref: "fb_oea",
          ph: mobileNumber,
        });
        if (isFacebookAnalyticsActive) {
          postPixelEventLog({
            env,
            mobileNumber: mobileNumber,
            pixel: "535889438509261,979130823106518",
            event: "CompleteRegistration",
            pageUrl: window.location.href,
          });
        }
        setCurrentForm("NO_FORM");
      }
    } catch (err) {
      console.log("Api Err: ", err);
    }

    setIsLoading(false);
  };

  return (
    <form
      className={classes.LeadQualificationForm}
      name="leadQualificationForm"
      onSubmit={leadQualificationHandler}
    >
      <div className={classes.control}>
        <select
          name="age"
          id="age"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={ageChangedHandler}
        >
          {AGE_LIST.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.control}>
        <select
          name="language"
          id="language"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={languageChangedHandler}
        >
          {LANGUAGE_LIST.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.control}>
        <select
          name="courses"
          id="courses"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={courseChangedHandler}
        >
          <option
            className={classes.defaultOption}
            key="select-center"
            value="not-selected"
          >
            Course Interested In
          </option>
          {COURSE_LIST.map((item) => (
            <option key={item.attributes.name} value={item.attributes.name}>
              {item.attributes.name}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.control}>
        <select
          name="familyIncome"
          id="familyIncome"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={familyIncomeChangedHandler}
        >
          {FAMILY_INCOME_LIST.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.control}>
        <select
          name="financialAssistance"
          id="financialAssistance"
          form="leadQualificationForm"
          className={`${classes.dropdown} `}
          onChange={educationLoanChangedHandler}
        >
          {FINANCIAL_ASSISTANCE_LIST.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.control}>
        <select
          name="reallocation"
          id="reallocation"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={willingReallocationChangedHandler}
        >
          {WILLING_REALLOCATION_LIST.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <button className={classes.submitBtn}>
        {!isLoading && <span>Submit</span>}
        {isLoading && <div className={classes.loading}></div>}
      </button>
    </form>
  );
};

export default LeadQualificationForm;
