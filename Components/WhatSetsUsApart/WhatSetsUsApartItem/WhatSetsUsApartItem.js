import Image from "next/image";
import { Fragment } from "react";
import classes from "./WhatSetsUsApartItem.module.css";

const WhatSetsUsApartItem = (props) => {
  const { imagePath, title, description, width, height } = props;
  return (
    <Fragment>
      <div className={classes.item}>
        <div className={classes.imageCon}>
          <Image
            className={classes.img}
            src={imagePath}
            alt={title}
            width={width}
            height={height}
          />
        </div>
        <div className={classes.about}>
          <h4 className={classes.title}>{title}</h4>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default WhatSetsUsApartItem;
