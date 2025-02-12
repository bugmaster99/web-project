import Image from "next/image";
import parse from "html-react-parser";
import classes from "./Feature.module.css";
const Feature = (props) => {
  const { title, imagePath, width, height } = props;
  return (
    <section className={classes.feature}>
      <div className={classes.iconCon}>
        <Image
          classes={classes.featureIcon}
          src={imagePath}
          alt={title}
          width={width}
          height={height}
          // layout={"fixed"}
        />
      </div>
      <h4 className={classes.title}>{parse(title)}</h4>
    </section>
  );
};

export default Feature;
