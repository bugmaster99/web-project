import Feature from "./Feature/Feature";
import classes from "./Features.module.css";
const Features = (props) => {
  const { features } = props;

  return (
    <div className={classes.features}>
      {features?.specialityList?.map((feature) => (
        <Feature
          key={feature.id}
          imagePath={feature?.img?.data?.attributes?.url}
          title={feature.title}
          width={feature?.img?.data?.attributes?.width}
          height={feature?.img?.data?.attributes?.height}
        />
      ))}
    </div>
  );
};

export default Features;
