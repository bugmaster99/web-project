import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

import classes from "./Journey.module.css";
import FocusNameInputContext from "../../store/focusNameInputContext";
import { useRouter } from "next/router";

const Journey = ({ journey }) => {
  const router = useRouter();
  const titlesForDesktop = journey?.journeyList?.map((step) => {
    return { id: step.id, title: step.title };
  });

  const descriptionsForDesktop = journey?.journeyList?.map((step) => {
    return { id: step.id, description: step.description };
  });
  const ctx = useContext(FocusNameInputContext);
  const bookeDemohandler = (segment) => {
    const currentPath = router.asPath;
    if (currentPath.includes("#")) {
      const pathWithoutHash = currentPath.split("#")[0];
      router.push(pathWithoutHash + segment);
    } else {
      router.push(router.asPath + segment);
    }
    ctx.setNameInputFocus(true);
  };

  return (
    <section className={classes.journey} id="journey">
      <h2 className={classes.title}>{journey?.title}</h2>
      <div className={classes.journeyCon}>
        {journey?.journeyList.map((step) => (
          <div className={classes.step} key={step?.id}>
            <div className={classes.imgCon}>
              <Image
                className={classes.mainImg}
                src={step?.img?.data?.attributes?.url}
                alt={"Theory"}
                width={step?.img?.data?.attributes?.width}
                height={step?.img?.data?.attributes?.height}
                layout={"responsive"}
              />
              <div className={classes.stripTextMob}>{step?.title}</div>
            </div>
            <div className={classes.learningMob}>{step?.description}</div>
          </div>
        ))}
      </div>

      {/* desktop design */}

      <div className={classes.stripCon}>
        <div className={classes.strip}>
          <Image
            className={classes.redStrip}
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/strip.png`}
            width={600}
            height={50}
            alt={"strip"}
            layout="responsive"
          />
        </div>
        {
          <div className={classes.points}>
            {titlesForDesktop?.map((data) => (
              <div key={data?.id} className={classes.stripText}>
                {data.title}
              </div>
            ))}
          </div>
        }
      </div>

      <div className={classes.learnings}>
        {descriptionsForDesktop?.map((data) => (
          <div key={data?.id} className={classes.learning}>
            {data?.description}
          </div>
        ))}
      </div>

      <span
        className={classes.bookDemo}
        onClick={() => bookeDemohandler("#demo")}
      >
        {journey?.ctaText}
      </span>
    </section>
  );
};

export default Journey;
