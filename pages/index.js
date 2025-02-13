import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./styles.module.css";

const hero = {
  __typename: "ComponentLpHeroLpHero",
  title:
    '<p style="text-align:center;"><strong>#1 Bachelor\'s Degree</strong><br><strong>in Medical Field</strong></p>',
  description:
    '<p style="text-align:center;">Starting Salary upto <strong>50K</strong></p><p style="text-align:center;"><strong>98%</strong> Placement Rate</p><p style="text-align:center;"><strong>18-24 months</strong> Internship</p><p style="text-align:center;"><strong>20+ campuses</strong> across India</p>',
  imgDesktop: {
    __typename: "UploadFileEntityResponse",
    data: {
      __typename: "UploadFileEntity",
      attributes: {
        __typename: "UploadFile",
        url: "https://media-cms.virohan.com/staging/Untitled_1_3f76f436c9.jpg",
      },
    },
  },
  imgMobile: {
    __typename: "UploadFileEntityResponse",
    data: {
      __typename: "UploadFileEntity",
      attributes: {
        __typename: "UploadFile",
        url: "https://media-cms.virohan.com/staging/virtual_com_backgrounds_red_6ef74db94f.jpg",
      },
    },
  },
  showHero: true,
  courses: {
    __typename: "CourseRelationResponseCollection",
    data: [
      {
        __typename: "CourseEntity",
        attributes: {
          __typename: "Course",
          name: "4 Year B.Sc. Hons. Degree",
        },
      },
      {
        __typename: "CourseEntity",
        attributes: {
          __typename: "Course",
          name: "3 Year B.Sc. Degree",
        },
      },
      {
        __typename: "CourseEntity",
        attributes: {
          __typename: "Course",
          name: "3 Year Bachelor's Degree",
        },
      },
    ],
  },
  center: {
    __typename: "CenterEntityResponse",
    data: {
      __typename: "CenterEntity",
      attributes: {
        __typename: "Center",
        centerUri: "/",
        centerName: "Main LP",
        seoInformation: {
          __typename: "ComponentSeoInformationSeoInformation",
          title: "Check the Best Paramedical Course with Virohan in Healthcare",
          description:
            '"Virohan offers India\'s best paramedical course, professional training in Healthcare with the vision to empower youth to achieve their dream career."',
        },
        centerList: [
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Delhi (Chhatarpur) - Lingaya's LDIMS",
            centerId: 85,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Delhi (Dwarka) - SSIM",
            centerId: 92,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Delhi (Sheikh Sarai) - APCT",
            centerId: 94,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Faridabad (Sec 5)",
            centerId: 14,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Faridabad - Lingaya's Vidyapeeth University",
            centerId: 91,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Gurugram - Apeejay Stya University",
            centerId: 99,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Gurugram - DPGITM",
            centerId: 72,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Ghaziabad - HRIT University",
            centerId: 97,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Ghaziabad - TBI KIET",
            centerId: 93,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Jaipur - Suresh Gyan Vihar University",
            centerId: 101,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Lucknow - SRM University",
            centerId: 83,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Mumbai (Dahisar) - Rustomjee",
            centerId: 54,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Mumbai (Sion) - GNVS",
            centerId: 96,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Mumbai (Thane) - Rustomjee",
            centerId: 57,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Mumbai (Worli) - Sasmira's Institute",
            centerId: 90,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Nagpur (Trimurtee Nagar)",
            centerId: 16,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Roorkee - COER University",
            centerId: 82,
          },
          {
            __typename: "ComponentLpCentersLpCenters",
            centerName: "Varanasi - Ashoka Institute",
            centerId: 89,
          },
        ],
      },
    },
  },
  landingPageType: {
    __typename: "LandingPageTypeEntityResponse",
    data: {
      __typename: "LandingPageTypeEntity",
      attributes: {
        __typename: "LandingPageType",
        type: "Offline",
      },
    },
  },
  formLevel: 2,
  firstFormTitle: "FREE Career Counselling",
  firstFormDescription: " ",
  secondFormTitle: "Calling you in next 2 minutes",
  secondFormDescription:
    "Until then, help us with some more details to guide you better",
};

const LeadForm = (props) => {
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const router = useRouter();
  //   const hero = props.hero;
  const [showOtpFormControl, setShowOtpFormControl] = useState(false);
  const [currentForm, setCurrentForm] = useState("LEAD_GENERATION");
  const otpInputRef = useRef(null);
  const [mobileInputIsDisabled, setMobileInputIsDisabled] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [showOtpSentMsg, setShowOtpSentMsg] = useState(false);
  const [stateInput, setStateInput] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [districtInput, setDistrictInput] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [leadSubReqIsLoading, setLeadSubReqIsLoading] = useState(false);
  const [otpIsLoading, setOtpLoading] = useState(false);
  const mobileInputRef = useRef();
  const nameInputRef = useRef();
  const [nameInput, setNameInput] = useState("");
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);
  let nameInputIsInvalid = nameInput.trim() === "";
  let showNameInvalidMsg = nameInputIsInvalid && nameInputIsTouched;

  const nameInputChangeHandler = (event) => {
    let name = event.target.value;
    setNameInput(name);
  };

  const nameInputBlurHandler = () => {
    setNameInputIsTouched(true);
    ctx.setNameInputFocus(false);
  };

  const [mobileInput, setMobileInput] = useState("");
  const [mobileInputIsTouched, setMobileInputIsTouched] = useState(false);
  let mobileInputIsInvalid =
    mobileInput.length != 10 ||
    mobileInput.startsWith("0", 0) ||
    mobileInput.startsWith("1", 0) ||
    mobileInput.startsWith("2", 0) ||
    mobileInput.startsWith("3", 0) ||
    mobileInput.startsWith("4", 0) ||
    mobileInput.startsWith("5", 0);
  const [getOtpBtnIsClicked, setGetOtpBtnIsClicked] = useState(false);
  let showMobileInvalidMsg =
    mobileInputIsInvalid && mobileInputIsTouched && getOtpBtnIsClicked;
  let showVerifyMobileUsingOtpMsg = !getOtpBtnIsClicked && mobileInputIsTouched;

  const mobileInputChangeHandler = (event) => {
    let mobile = event.target.value;
    setMobileInput(mobile);
    setGetOtpBtnIsClicked(true);
    const mobileNumberIsValid = /^[6-9]\d{9}$/.test(mobile);
    if (mobile.length === 10 && mobileNumberIsValid) {
      getOtpHandler(mobile);
    }
  };

  const mobileInputBlurHandler = () => {
    setMobileInputIsTouched(true);
    setGetOtpBtnIsClicked(true);
  };

  const verifyUserOtp = async (otp) => {
    return new Promise((res) => {
      setTimeout(() => {
        setOtpErrorResponse("");
        res(true);
      }, 1000);
    });
  };

  const validateOtp = (otpValue) => {
    if (otpValue.length !== 4) {
      return false;
    } else {
      verifyUserOtp(otpValue)
        .then((data) => {
          setOtpInputIsValid(data);
          return data;
        })
        .catch((err) => console.log("err...", err));
    }
  };

  const otpAttemptsRef = useRef(4);
  const [otp, setOtp] = useState("");
  const [otpErrorResponse, setOtpErrorResponse] = useState("");
  const [otpInputIsTouched, setOtpInputIsTouched] = useState(false);
  const [otpInputIsValid, setOtpInputIsValid] = useState(false);

  const otpInputChangeHandler = (event) => {
    const inputValue = event.target.value;
    setOtpInputIsTouched(true);
    if (inputValue.length <= 4) {
      setOtp(inputValue.replace(/\D/g, ""));
    }
    if (inputValue.length === 4) {
      validateOtp(inputValue);
    }
  };

  const [state, setState] = useState("");
  const [district, setDistrict] = useState(null);
  const [centerId, setCenterId] = useState("");
  const [center, setCenter] = useState("select-center");

  const [centerInputIsTouched, setCenterInputIsTouched] = useState(false);
  const [centerInputIsValid, setCenterInputIsValid] = useState(false);

  const stateData =
    stateInput !== ""
      ? filteredStates.length > 0
        ? filteredStates
        : []
      : stateList;

  const districtData =
    districtInput !== ""
      ? filteredDistricts.length > 0
        ? filteredDistricts
        : []
      : districtList;

  const centerInputChangeHandler = (event) => {
    const seletcedCenter = event.target.value;
    const centerData = hero.center?.data?.attributes?.centerList.filter(
      (center) => center.centerName === seletcedCenter
    );
    const selectedCenterId = centerData[0]?.centerId;

    setCenterInputIsTouched(true);
    if (seletcedCenter !== "select-center") {
      setCenter(seletcedCenter);
      setCenterInputIsValid(true);
      setCenterId(selectedCenterId);
    }
  };

  const [educationQualification, seteducationQualification] = useState(
    "select-education-qualification"
  );
  const [
    educationQualificationInputIsTouched,
    setEducationQualificationInputIsTouched,
  ] = useState(false);
  const [
    educationQualificationInputIsValid,
    setEducationQualificationInputIsValid,
  ] = useState(false);

  const educationQualificationInputChangeHandler = (event) => {
    seteducationQualification(event.target.value);

    if (event.target.value === "select-education-qualification") {
      setEducationQualificationInputIsValid(false);
    } else {
      setEducationQualificationInputIsValid(true);
    }

    setEducationQualificationInputIsTouched(true);
  };

  const [showUnderlineForEditBtn, setShowUnderlineForEditBtn] = useState(false);

  let timerForOtp;
  const onGetOtpResponse = (data) => {
    if (data.status === true) {
      timerForOtp = setInterval(() => {
        setOtpTimer((prevState) => {
          if (prevState > 0) {
            prevState = prevState - 1;
          } else {
            clearInterval(timerForOtp);
          }
          return prevState;
        });
      }, 1000);
    } else {
      setMobileInputIsDisabled(false);
    }
    return data;
  };

  const prepareRequestForOtp = async (otpInput) => {
    console.log({ otpInput });
    setOtpErrorResponse("");
    setOtpInputIsTouched(false);
    setOtp("");

    setShowOtpSentMsg(true);
    setShowOtpFormControl(true);
    setMobileInputIsDisabled(true);
    setOtpSent(true);
  };

  const getOtpHandler = (otpInput) => {
    setMobileInputIsTouched(true);
    setShowOtpSentMsg(false);
    setOtpTimer(30);
    setGetOtpBtnIsClicked(true);
    setShowUnderlineForEditBtn(false);
    setMobileInputIsDisabled(true);
    prepareRequestForOtp(otpInput);
  };

  const sendLeadSubReq = async () => {
    const leadGenerationPostData = {
      name: nameInput,
      mobileNumber: mobileInput,
      otp,
      centre: center,
      educationalQualification: educationQualification,
      state: state,
      // district: district[0].name,
      district: district.name,
      centreId: centerId,
      origin: window.location.href,
    };
    console.log({ leadGenerationPostData });
  };

  const resendOtpHandler = (mobileInput) => {
    if (!mobileInputIsInvalid) {
      getOtpHandler(mobileInput);
    }
  };

  const editHandler = () => {
    setShowOtpSentMsg(false);
    clearTimeout(timerForOtp);
    setMobileInputIsDisabled(false);
    setOtpTimer(0);
    setShowUnderlineForEditBtn(true);
    setShowOtpFormControl(false);
    setOtpSent(false);
    setOtpInputIsTouched(false);
  };

  const proceedBtnHandler = (event) => {
    event.preventDefault();
    setNameInputIsTouched(true);
    setMobileInputIsTouched(true);
    setGetOtpBtnIsClicked(false);
    setCenterInputIsTouched(true);
    setEducationQualificationInputIsTouched(true);
    if (showOtpFormControl) {
      setOtpInputIsTouched(true);
    }

    if (
      !nameInputIsInvalid &&
      !mobileInputIsInvalid &&
      otpInputIsValid &&
      state !== "" &&
      state === stateInput &&
      district &&
      district.name === districtInput &&
      // stateInputIsValid &&
      // districtInputIsValid &&
      centerInputIsValid &&
      educationQualificationInputIsValid
    ) {
      sendLeadSubReq();
    }
  };

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      const input = document.querySelector(
        'input[autocomplete="one-time-code"]'
      );
      if (!input) return;

      navigator.credentials
        .get({ otp: { transport: ["sms"] }, signal: ac.signal })
        .then((otp) => {
          input.value = otp.code;
          alert(`OTP: ${otp.code}`);
          // const otpValue = otp?.code?.replace(/\D/g, "");
          // setOtp(otpValue);
          // validateOtp(otpValue);
          // ac.abort();
        })
        .catch((err) => console.log("OTP Error:", err));
    }
  }, [showOtpFormControl, otpInputIsValid]);

  return (
    <div className={classes.leadFormCon}>
      <div className={classes.leadFormWrapper}>
        {currentForm === "LEAD_GENERATION" && (
          <>
            <p className={classes.formTitle}>Enter Your Details</p>

            <form
              className={classes.leadForm}
              onSubmit={proceedBtnHandler}
              noValidate={true}
            >
              <div className={classes.formGroup}>
                <input
                  ref={nameInputRef}
                  autoComplete="off"
                  className={`${classes.formControl} ${
                    showNameInvalidMsg ? classes.formControlError : ""
                  }`}
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  onChange={nameInputChangeHandler}
                  onBlur={nameInputBlurHandler}
                />
                {showNameInvalidMsg && (
                  <div className={classes.error}>Please Enter Name</div>
                )}
              </div>

              <div className={classes.mobileOtpFormGroupWra}>
                <div className={classes.mobileOtpFormGroup}>
                  <div className={classes.mobileNumberCon}>
                    {!otpInputIsValid && showMobileInvalidMsg && (
                      <div className={classes.error}>
                        Please enter valid Number
                      </div>
                    )}

                    {!otpInputIsValid && showVerifyMobileUsingOtpMsg && (
                      <div className={classes.error}>
                        Please verify number using OTP!
                      </div>
                    )}

                    {!showMobileInvalidMsg &&
                      !showVerifyMobileUsingOtpMsg &&
                      !otpInputIsValid &&
                      showOtpSentMsg && (
                        <div className={classes.msg}>
                          {/* OTP sent to {lastMobile}{" "} */}
                          OTP sent to {mobileInput}{" "}
                          <span
                            className={classes.pencilCon}
                            onClick={editHandler}
                          >
                            <span className={classes.pencilIco}></span>
                            <span
                              className={`${classes.pencilText} ${
                                showUnderlineForEditBtn
                                  ? classes.pencilTextUnderline
                                  : ""
                              }`}
                            >
                              Edit
                            </span>
                          </span>
                        </div>
                      )}
                    <div className={classes.inputBtnGp}>
                      <input
                        ref={mobileInputRef}
                        autoComplete="off"
                        className={`${classes.mobileFormControl} ${
                          otpInputIsValid ? classes.verifiedMobileNumber : ""
                        } ${
                          showMobileInvalidMsg || showVerifyMobileUsingOtpMsg
                            ? classes.formControlError
                            : ""
                        } ${otpSent && classes.removeBorderRight}`}
                        disabled={
                          (mobileInputIsDisabled && !otpInputIsValid) ||
                          otpInputIsValid
                        }
                        type="text"
                        placeholder="Enter 10 digit Mobile Number"
                        pattern="^[6-9]\d{9}$"
                        name="phone"
                        onChange={mobileInputChangeHandler}
                        onBlur={mobileInputBlurHandler}
                      />
                      {otpInputIsValid && (
                        <div className={classes.verifiedCheckMark}></div>
                      )}
                      {!otpInputIsValid && (
                        <Fragment>
                          {!otpIsLoading && otpSent && otpTimer > 0 && (
                            <button
                              className={`${classes.otpBtn} ${classes.resend} ${
                                showMobileInvalidMsg ||
                                showVerifyMobileUsingOtpMsg
                                  ? classes.formControlError
                                  : ""
                              }`}
                              type="button"
                            >
                              <span>Resend in {otpTimer} sec</span>
                            </button>
                          )}

                          {otpSent && otpTimer === 0 && (
                            <button
                              disabled={mobileInputIsInvalid}
                              className={`${classes.resendOtpBtn} ${
                                classes.otpBtn
                              } ${
                                showMobileInvalidMsg ||
                                showVerifyMobileUsingOtpMsg
                                  ? classes.formControlError
                                  : ""
                              }`}
                              type="button"
                              onClick={() => resendOtpHandler(mobileInput)}
                            >
                              {!otpIsLoading && <span>Resend OTP</span>}
                            </button>
                          )}

                          {otpIsLoading && otpSent && otpTimer != 0 && (
                            <button
                              className={`${classes.resendOtpBtn} ${
                                classes.otpBtn
                              } ${
                                showMobileInvalidMsg ||
                                showVerifyMobileUsingOtpMsg
                                  ? classes.formControlError
                                  : ""
                              }`}
                              type="button"
                            >
                              <div className={classes.loading}></div>
                            </button>
                          )}
                        </Fragment>
                      )}
                    </div>
                  </div>

                  {showOtpFormControl && !otpInputIsValid && (
                    <div
                      className={`${
                        classes.otpCon
                      } ${otpInputIsTouched} ${!otpInputIsValid} ${
                        otpInputIsTouched && !otpInputIsValid
                          ? classes.formControlError
                          : ""
                      }`}
                    >
                      <input
                        ref={otpInputRef}
                        className={`${classes.otpFormControl} ${
                          otpInputIsTouched && !otpInputIsValid
                            ? classes.formControlError
                            : ""
                        }`}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        type="text"
                        placeholder="Enter OTP"
                        pattern="/^\d+$/"
                        name="otp"
                        value={otp}
                        onChange={otpInputChangeHandler}
                        // onBlur={otpInputBlurHnadler}
                      />
                    </div>
                  )}
                </div>
                {otpErrorResponse?.length > 0 && (
                  <span className={classes.otpValidText}>
                    {otpErrorResponse}
                  </span>
                )}
              </div>

              <div className={classes.centerCon}>
                {centerInputIsTouched && !centerInputIsValid && (
                  <div className={`${classes.error} ${classes.centerError}`}>
                    Please Select A Campus!
                  </div>
                )}
                <select
                  className={`${classes.formControl} ${classes.centres} ${
                    centerInputIsTouched && !centerInputIsValid
                      ? classes.formControlError
                      : ""
                  }`}
                  name="centres"
                  id="centres"
                  onChange={centerInputChangeHandler}
                >
                  <option
                    className={classes.defaultOption}
                    key="select-center"
                    value="select-center"
                  >
                    Campus interested in?
                  </option>
                  {hero.center?.data?.attributes?.centerList?.map((center) => {
                    return (
                      <option key={center.centerId} value={center.centerName}>
                        {center.centerName}
                      </option>
                    );
                  })}{" "}
                  */
                </select>
              </div>

              <div className={classes.educationQualification}>
                {educationQualificationInputIsTouched &&
                  !educationQualificationInputIsValid && (
                    <div className={`${classes.error} ${classes.centerError}`}>
                      Please Select Education Qualification!
                    </div>
                  )}
                <select
                  className={`${classes.formControl} ${
                    classes.educationQualificationInput
                  } ${
                    educationQualificationInputIsTouched &&
                    !educationQualificationInputIsValid
                      ? classes.formControlError
                      : ""
                  }`}
                  name="educationQualification"
                  id="educationQualification"
                  onChange={educationQualificationInputChangeHandler}
                >
                  <option value="select-education-qualification">
                    Select Education Qualification
                  </option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="12th Pursuing">12th Pursuing</option>
                  <option value="Graduate/PostGraduate">
                    Graduate/PostGraduate
                  </option>
                  <option value="Pursuing Graduation">
                    Pursuing Graduation
                  </option>

                  <option value="Others">Others</option>
                </select>
              </div>
              <button className={classes.submitBtn}>
                {!leadSubReqIsLoading && <span>Book Now</span>}
                {leadSubReqIsLoading && <div className={classes.loading}></div>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
