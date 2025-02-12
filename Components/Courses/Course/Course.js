import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import FocusNameInputContext from "../../../store/focusNameInputContext";
import classes from "./Course.module.css";

const Course = (props) => {
  const router = useRouter();
  const ctx = useContext(FocusNameInputContext);

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

  const { imagePath, title, description } = props;

  return (
    <div className={classes.course}>
      <div className={classes.imageCon}>
        <Image
          src={imagePath}
          width={252}
          height={130}
          alt={title}
          layout={"responsive"}
        />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
      {/* <div className={classes.tags}>
        <div className={classes.tag}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/govt-approved.svg`}
            width={14}
            height={17}
            alt={"Govt Approved Program"}
          />

          <span className={classes.tagText}>Govt. Approved Program</span>
        </div>
        <div className={classes.internshipAndPlacement}>
          <div className={classes.govtAppTag}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/internship-training.svg`}
              width={13}
              height={17}
              alt={"Internship Training"}
            />

            <span className={classes.tagText}>Internship Training</span>
          </div>
          <div className={classes.govtAppTag}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/placement-assistance.svg`}
              width={15}
              height={15}
              alt={"100% Placement Support"}
            />

            <span className={classes.tagText}>100% Placement Support</span>
          </div>
        </div>
      </div> */}

      <span
        className={classes.bookDemo}
        onClick={() => bookDemoHandler("#demo")}
      >
        {props.cta}
      </span>
    </div>
  );
};

export default Course;
