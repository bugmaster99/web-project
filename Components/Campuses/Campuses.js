import { useState, useEffect } from "react";
import classes from "./Campuses.module.css";

const Campuses = (props) => {
  const { apiCentres, campuses } = props;
  const [centerLatitude, setCenterLatitude] = useState(
    apiCentres?.[0]?.latitude
  );
  const [centerLongitude, setCenterLongitude] = useState(
    apiCentres?.[0]?.longitude
  );

  const centerInputChangeHandler = (event) => {
    let selectedCenter = event.target.value;
    let selectedCenterData = apiCentres?.filter(
      (center) => center.name.toLowerCase() === selectedCenter
    );
    setCenterLatitude(selectedCenterData[0]?.latitude);
    setCenterLongitude(selectedCenterData[0]?.longitude);
  };
  return (
    <section className={classes.campuses}>
      <div className={classes.campusesData}>
        <h2 className={classes.title}>{campuses?.title}</h2>
        <p className={classes.description}>{campuses.description}</p>

        <div className={classes.formControlCon}>
          <select
            className={`${classes.formControl} ${classes.centres}`}
            name="centres"
            id="centres"
            onChange={centerInputChangeHandler}
          >
            {/* {basePath !== "/" && <option value={centre}>{centre}</option>} */}
            {/* {basePath === "/" && */}
            {apiCentres?.map((centerData) => {
              return (
                <option
                  key={centerData.id}
                  value={centerData.name.toLowerCase()}
                >
                  {centerData.name}
                </option>
              );
            })}
            {/* } */}
          </select>
        </div>

        <div>
          <iframe
            className={classes.reviewMap}
            height="522"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${centerLatitude},${centerLongitude}&hl=es;z=14&amp&output=embed`}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Campuses;
