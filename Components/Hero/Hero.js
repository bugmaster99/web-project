import Image from "next/image";
import parse from "html-react-parser";

import useMediaQuery from "../../hooks/useMediaQuery";

import LeadForm from "../LeadForm/LeadForm";

import classes from "./Hero.module.css";
import OnlineLeadForm from "../OnlineLeadForm/OnlineLeadForm";

const Hero = (props) => {
  // const { apiNewCentre, isFacebookAnalyticsActive, hero, cta, url, env } =
  //   props;
  // const isDesktop = useMediaQuery("(min-width: 767px)");

  // let heroImg = hero?.imgMobile?.data?.attributes?.url;
  // let quality = 100;
  // if (!isDesktop) {
  //   heroImg = heroImg;
  //   quality = 100;
  // } else {
  //   heroImg = hero?.imgDesktop?.data?.attributes?.url;
  //   quality = 75;
  // }
  return (
    <section className={classes.hero} id="demo">
      <div className={classes.heroWrapper}>
        {/* <Image
          className={classes.heroImg}
          src={heroImg}
          alt="hero image"
          layout="fill"
          objectPosition={"26% 0%"}
          objectFit="cover"
          priority={true}
          quality={quality}
        /> */}
        <div className={classes.heroContent}>
          <div className={classes.heroAbout}>
            {/* <h1 className={classes.title}>
              Find your{" "}
              <span className={classes.emphasizedText}>
                Dream Career in Healthcare
              </span>{" "}
              at Virohan
            </h1> */}
            <h1 className={classes.title}>{parse(props.hero.title)}</h1>
            <div className={classes.description}>
              {parse(props.hero.description)}
            </div>
          </div>

          <div className={classes.leadForm}>
            {true && (
              <LeadForm
                env={props.env}
                hero={props.hero}
                isFacebookAnalyticsActive={true}
                leadGenFormTitle={"Title"}
                leadGenFormDescription={"Description"}
                cta={"Book now"}
                url={props.ulr}
              />
            )}
            {/* {hero.landingPageType.data.attributes.type.toLowerCase() ===
              "online" && (
              <OnlineLeadForm
                hero={hero}
                env={env}
                leadGenFormTitle={hero.firstFormTitle}
                leadGenFormDescription={hero.firstFormDescription}
                cta={cta}
                url={url}
              />
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
