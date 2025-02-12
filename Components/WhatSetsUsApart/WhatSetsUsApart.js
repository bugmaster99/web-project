import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import classes from "./WhatSetsUsApart.module.css";
import FocusNameInputContext from "../../store/focusNameInputContext";
import WhatSetsUsApartItem from "./WhatSetsUsApartItem/WhatSetsUsApartItem";

const WhatSetsUsApart = (props) => {
  const router = useRouter();
  const ctx = useContext(FocusNameInputContext);
  const { whatSetsUsApart } = props;
  const bookDemoHandler = (segment) => {
    const currentPath = router.asPath;
    if (currentPath.includes("#")) {
      const pathWithoutHash = currentPath.split("#")[0];
      router.push(pathWithoutHash + segment);
    } else {
      router.push(router.asPath + segment);
    }

    ctx.setNameInputFocus(true);
    // navigator.vibrate(22.5);
  };
  return (
    <section className={classes.whatSetsUsApart} id="features">
      <div className={classes.titleImageCon}>
        <h2 className={classes.title}>{whatSetsUsApart?.title}</h2>
        <div className={classes.imgCon}>
          <Image
            className={classes.img}
            src={whatSetsUsApart?.img?.data?.attributes?.url}
            alt={whatSetsUsApart?.title}
            width={whatSetsUsApart?.img?.data?.attributes?.width}
            height={whatSetsUsApart?.img?.data?.attributes?.height}
            objectFit="contain"
            layout="responsive"
          />
        </div>
      </div>

      <div className={classes.pointsCon}>
        {whatSetsUsApart.whatSetsUsApartList.map((point) => (
          <WhatSetsUsApartItem
            key={point?.id}
            imagePath={point?.img?.data?.attributes?.url}
            title={point.title}
            description={point.description}
            width={point?.img?.data?.attributes?.width}
            height={point?.img?.data?.attributes?.height}
          />
        ))}

        <span
          className={classes.bookDemo}
          onClick={() => bookDemoHandler("#demo")}
        >
          {whatSetsUsApart?.ctaText}
        </span>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
