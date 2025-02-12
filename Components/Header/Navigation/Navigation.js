import { useRouter } from "next/router";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const { itemHandler } = props;
  const router = useRouter();

  const routeHandler = (segment) => {
    itemHandler(segment);
    const currentPath = router.asPath;
    if (currentPath.includes("#")) {
      const pathWithoutHash = currentPath.split("#")[0];
      router.push(pathWithoutHash + segment);
    } else {
      router.push(router.asPath + segment);
    }
  };

  return (
    <nav className={classes.navigation}>
      <ul className={classes.items}>
        {props.showCourses && (
          <li className={classes.item}>
            <span
              className={classes.link}
              onClick={() => routeHandler("#courses")}
            >
              courses
            </span>
          </li>
        )}
        {props.showFeatures && (
          <li className={classes.item}>
            <span
              className={classes.link}
              onClick={() => routeHandler("#features")}
            >
              features
            </span>
          </li>
        )}
        {props.showJourney && (
          <li className={classes.item}>
            <span
              className={classes.link}
              onClick={() => routeHandler("#journey")}
            >
              journey
            </span>
          </li>
        )}
        {props.showCampuses && (
          <li className={classes.item}>
            <span
              className={classes.link}
              onClick={() => routeHandler("#campuses")}
            >
              campuses
            </span>
          </li>
        )}
        {props.showTestimonials && (
          <li className={classes.item}>
            <span
              className={classes.link}
              onClick={() => routeHandler("#testimonials")}
            >
              testimonials
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
