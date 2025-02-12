import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Navigation from "./Navigation/Navigation";
import Container from "../Layout/Container/Container";
import { Bars, Logo, Times as Cross } from "../Icons/Icons";

import classes from "./Header.module.css";

import FocusNameInputContext from "../../store/focusNameInputContext";
import { getApiEndPointsResolver } from "../../utils/apiEndpointsResolver";

const Header = (props) => {
  const router = useRouter();
  const ctx = useContext(FocusNameInputContext);
  const [whatsappLink, setWhatsappLink] = useState("");

  const [navigation, setNavigation] = useState(false);
  const toggleNavigation = (segment) => {
    if (segment === "#campuses") {
      props.onNavigationItemClick(segment);
    }
    setNavigation((prevState) => {
      return !prevState;
    });
    // navigator.vibrate(22.5);
  };

  const bookDemoHandler = (segment) => {
    const currentPath = router.asPath;
    if (currentPath.includes("#")) {
      const pathWithoutHash = currentPath.split("#")[0];
      router.push(pathWithoutHash + segment);
    } else {
      router.push(router.asPath + segment);
    }
    setNavigation((prevState) => {
      return false;
    });
    ctx.setNameInputFocus(true);
    // navigator.vibrate(22.5);
  };

  const generateWhatsappLink = (shortUrl = "") => {
    const phone = "+91 7858911911";
    let msg =
      "Hello! I landed on your ad and I'm interested in the Virohan courses. I would appreciate some information or assistance regarding the same. Looking forward to connecting further and discussing it with you. Thank you!";
    if (shortUrl) {
      msg += `\n\nFor more information visit\n# ${shortUrl}`;
    }
    const encodedMsg = encodeURIComponent(msg.replace("\\", "\\\\"));
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
    setWhatsappLink(url);
  };

  useEffect(() => {
    const getLeadSource = async () => {
      try {
        // const sourceId = router.query?.source_id;
        const origin =
          typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";
        const fullUrl = origin + router.asPath;

        // if (!sourceId) {
        //   generateWhatsappLink();
        //   return;
        // }

        const ep = getApiEndPointsResolver(props.env).GET_LEAD_SOURCE;
        const response = await fetch(ep, {
          method: "POST",
          headers: {
            "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
          },
          body: JSON.stringify({ data: { url: btoa(fullUrl) } }),
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        if (data?.data) {
          const shortUrl = data?.data;
          generateWhatsappLink(shortUrl ?? "");
        }
      } catch (error) {
        console.log("Failed to get lead source: ", error);
      }
    };
    getLeadSource();
  }, []);

  return (
    <Container>
      <header className={classes.header}>
        <div className={classes.hamburgerLogoCon}>
          {!navigation && (
            <div className={classes.hamburger} onClick={toggleNavigation}>
              <Bars />
            </div>
          )}

          {navigation && (
            <div className={classes.hamburger} onClick={toggleNavigation}>
              <Cross />
            </div>
          )}
          <div className={classes.logo}>
            <Image
              className={classes.logoImg}
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/logo.svg`}
              width={164}
              height={49}
              alt="logo"
              layout="responsive"
              priority={true}
            />
          </div>
        </div>

        <div className={classes.actions}>
          <div className={navigation ? "showMenu" : "isShowMenu"}>
            <Navigation
              itemHandler={toggleNavigation}
              showCourses={props.showCourses}
              showFeatures={props.showFeatures}
              showJourney={props.showJourney}
              showCampuses={props.showCampuses}
              showTestimonials={props.showTestimonials}
            />
          </div>

          <div className={classes.actionButtons}>
            <span
              className={`btnSolid ${classes.bookDemo}`}
              onClick={() => bookDemoHandler("#demo")}
            >
              {props.cta}
            </span>

            {props.uri !== "/paramedical-courses-mp" && (
              <a
                className={classes.whatsappBtn}
                target="_blank"
                rel="noopener noreferrer"
                href={whatsappLink}
                title="Share on whatsapp"
              >
                Talk to Us
              </a>
            )}
          </div>
        </div>
      </header>
    </Container>
  );
};

export default Header;
