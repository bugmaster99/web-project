import React from "react";

import classes from "./OnlineLeadQualificationForm.module.css";
import { getApiEndPointsResolver } from "../../utils/apiEndpointsResolver";

const OnlineLeadQualificationForm = ({ env, setCurrentForm, mobileNumber }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [language, setLanguage] = React.useState("not-selected");

  const [currentOrg, setCurrentOrg] = React.useState("not-entered");

  const [orgToWorkWith, setOrgToWorkWith] = React.useState("not-entered");

  const [enroll, setEnroll] = React.useState("not-selected");

  const languageChangedHandler = (event) => {
    setLanguage(event.target.value);
  };

  const hospitalChangedHandler = (event) => {
    setCurrentOrg(event.target.value);
  };

  const hospitalToWorkWithHandler = (event) => {
    setOrgToWorkWith(event.target.value);
  };

  const enrollChangedHandler = (event) => {
    setEnroll(event.target.value);
  };

  const leadQualificationHandler = async (event) => {
    event.preventDefault();

    const leadQualificationPostJsonData = JSON.stringify({
      language,
      currentOrg,
      orgToWorkWith,
      enroll,
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
      <div className={classes.enroll}>
        <select
          name="enroll"
          id="enroll"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={languageChangedHandler}
        >
          <option value="enroll">What language you are comfortable in?</option>
          <option value="English">English (Preferred)</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
          <option value="Gujrati">Gujrati</option>
          <option value="Kannada">Kannada</option>
          <option value="Punjabi">Punjabi</option>
          <option value="Tamil">Tamil</option>
        </select>
      </div>
      <div className={classes.control}>
        <input
          name="hospital"
          id="hospital"
          form="leadQualificationForm"
          placeholder="Which Hospital/Company are you working with right now?"
          className={`${classes.input}`}
          onChange={hospitalChangedHandler}
        />
      </div>

      <div className={classes.control}>
        <input
          name="hospitalToWorkWith"
          id="hospitalToWorkWith"
          form="leadQualificationForm"
          placeholder="Hospital brand you want to work with?"
          className={`${classes.input}`}
          onChange={hospitalToWorkWithHandler}
        />
      </div>

      <div className={classes.enroll}>
        <select
          name="enroll"
          id="enroll"
          form="leadQualificationForm"
          className={`${classes.dropdown}`}
          onChange={enrollChangedHandler}
        >
          <option value="enroll">When are you looking to enroll</option>
          <option value="Immediately">Immediately</option>
          <option value="2-4 weeks">2-4 weeks</option>
          <option value="4-8 weeks">4-8 weeks</option>
          <option value="Not decided">Not decided</option>
        </select>
      </div>

      <button className={classes.submitBtn}>
        {!isLoading && <span>Submit</span>}
        {isLoading && <div className={classes.loading}></div>}
      </button>
    </form>
  );
};

export default OnlineLeadQualificationForm;
