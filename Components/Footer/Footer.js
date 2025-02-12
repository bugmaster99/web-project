import Link from "next/link";
import classes from "./Footer.module.css";
import {
  Phone,
  Envelope,
  Clock,
  MapMarker,
  Facebook,
  Linkedin,
  YouTube,
} from "../Icons/Icons";
import Image from "next/image";

const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.downloadMyCareer}>
        <div className={classes.downloadContent}>
          <h2 className={classes.downloadTitle}>Download the myCareer App</h2>
          <p className={classes.downloadDescription}>
            The Virohan myCareer app allows you to experience our pedagogy and
            programs free of charge. Designed to help students engage, learn and
            understand concepts in a fun and easy-to-grasp manner. You can also
            apply for any of our programs at any of our pan-India campuses and
            book a free demo and career counseling session.
          </p>
          <div className={classes.stores}>
            <div className={classes.store}>
              {/* <Link href="https://play.google.com/store/apps/details?id=com.virohan.mycareer"> */}
              <a
                href="https://play.google.com/store/apps/details?id=com.virohan.mycareer"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                {/* <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/play-store.png`}
                  width={253}
                  height={98}
                  alt="play store"
                /> */}
              </a>
              {/* </Link> */}
            </div>
            <div className={classes.store}>
              {/* <Link href="https://apps.apple.com/in/app/mycareer/id1501321604"> */}
              <a
                href="https://apps.apple.com/in/app/mycareer/id1501321604"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                {/* <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/app-store.png`}
                  width={197}
                  height={68}
                  alt="app store"
                /> */}
              </a>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className={classes.qrCode}>
          {/* <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/new-qr-code.png`}
            width={298}
            height={298}
            layout="responsive"
            alt="App qr code"
          /> */}
        </div>
      </div>

      <div className={classes.footerWrapper}>
        <div className={classes.leftCon}>
          <div className={classes.aboutCon}>
            <h4 className={classes.title}>About Us</h4>
            <p className={classes.description}>
              At Virohan, we work with a passion to build a generation of
              learners who can grow their skills into a career. We focus on
              providing the best learning opportunities to students to build a
              career in the healthcare industry
            </p>
          </div>

          <div className={classes.exploreCon}>
            <h4 className={classes.title}>Explore</h4>
            <div className={classes.links}>
              <a
                href="https://www.virohan.com/franchise"
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Partners
              </a>

              <a
                href="https://www.virohan.com/contact"
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Contact
              </a>

              <a
                href="https://www.virohan.com/privacy"
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Privacy Policy
              </a>

              <a
                href="https://www.virohan.com/terms-conditions"
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Terms & Conditions
              </a>

              <a
                href="https://www.virohan.com/corporate-governance"
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Corporate Governance
              </a>
            </div>
          </div>

          <div className={classes.courses}>
            <h4 className={classes.title}>Courses</h4>
            <div className={classes.links}>
              <a
                href={
                  "https://www.virohan.com/courses/emergency-medical-technician"
                }
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Emergency Medical Technician
              </a>

              <a
                href={
                  "https://www.virohan.com/courses/medical-laboratory-technician"
                }
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Medical Laboratory Technician
              </a>

              <a
                href={
                  "https://www.virohan.com/courses/operation-theatre-technician"
                }
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Operation Theatre Technician
              </a>

              <a
                href={"https://www.virohan.com/courses/hospital-administration"}
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Hospital Administration
              </a>

              <a
                href={"https://www.virohan.com/courses/radiology-technician"}
                target={"_blank"}
                rel="noopener noreferrer"
                className={classes.link}
              >
                Radiolody Technician
              </a>
            </div>
          </div>

          <div className={classes.contactCon}>
            <div className={classes.admissionCon}>
              <h4 className={classes.title}>Virohan Admissions</h4>
              <ul>
                <li className={classes.listItem}>
                  <a className={classes.link} href="tel:+91-7827061061">
                    <Phone />
                    <span>+91 782 706 1061</span>
                  </a>
                </li>
                <li className={classes.listItem}>
                  <a
                    className={classes.link}
                    href="mailto:admission@virohan.com"
                  >
                    <Envelope />
                    <span>admission@virohan.com</span>
                  </a>
                </li>
                <li className={classes.listItem}>
                  <Clock />
                  <div className={classes.content}>
                    <span>
                      9 AM - 7 PM <br /> All Days (Monday - Sunday)
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className={classes.corporateHeadOffice}>
              <h4 className={classes.title}>Corporate Head Office</h4>
              <ul>
                <li>
                  <a className={classes.link} href="tel:+91-7827276767">
                    <MapMarker />
                    <span>
                      393, Vi-John Tower, WeWork First Floor, Udyog Vihar Phase
                      3, Gurgaon 122016
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={classes.followCon}>
              <div className={classes.follow}>
                <span className={classes.followText}>Follow Us</span>
                <div className={classes.followIcons}>
                  <a
                    target={"_blank"}
                    href="https://www.facebook.com/Virohan/"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </a>
                  <a
                    target={"_blank"}
                    href="https://www.linkedin.com/school/virohan/"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </a>
                  <a
                    target={"_blank"}
                    href="https://www.youtube.com/c/Virohan"
                    rel="noopener noreferrer"
                  >
                    <YouTube />
                  </a>
                  <a
                    target={"_blank"}
                    href="https://www.instagram.com/virohaninstitute/"
                    rel="noopener noreferrer"
                  >
                    {/* <Image
                      style={{ marginTop: "3px !important" }}
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/new-instagram.png`}
                      width={20}
                      height={20}
                      alt={"Virohan Instagram"}
                    /> */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
