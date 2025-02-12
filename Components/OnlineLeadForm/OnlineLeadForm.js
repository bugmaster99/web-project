import React, {
  Fragment,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

import useHttp from "../../hooks/useHttp";
import useInput from "../../hooks/useInput";
import OnlineLeadQualificationForm from "../OnlineLeadQualificationForm/OnlineLeadQualificationForm";
import classes from "./OnlineLeadForm.module.css";
import FocusNameInputContext from "../../store/focusNameInputContext";
import { useRouter } from "next/router";
import { getApiEndPointsResolver } from "../../utils/apiEndpointsResolver";

const OnlineLeadForm = ({ env, hero }) => {
  const router = useRouter();
  // const { selectedCentreData } = props;
  const [showOtpFormControl, setShowOtpFormControl] = useState(false);
  const [currentForm, setCurrentForm] = useState("LEAD_GENERATION");

  const [mobileInputIsDisabled, setMobileInputIsDisabled] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [showOtpSentMsg, setShowOtpSentMsg] = useState(false);

  const [leadSubReqIsLoading, setLeadSubReqIsLoading] = useState(false);

  const ctx = useContext(FocusNameInputContext);
  const nameIsFocused = ctx.nameInputIsFocused;
  const nameInputRef = useRef();
  if (nameIsFocused) {
    nameInputRef?.current?.focus();
  }

  const mobileInputRef = useRef();

  // 1. Name Form Input & Events
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

  // 2. Mobile Form Input & Events

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

  // const [lastMobile, setLastMobile] = useState("");

  const mobileInputChangeHandler = (event) => {
    let mobile = event.target.value;
    setMobileInput(mobile);
    setGetOtpBtnIsClicked(true);
  };

  const mobileInputBlurHandler = () => {
    setMobileInputIsTouched(true);
    setGetOtpBtnIsClicked(true);
  };

  const verifyUserOtp = async (otp) => {
    const otpData = { mobileNumber: mobileInput, otp };
    try {
      const ep = getApiEndPointsResolver(env).SUBMIT_OTP;
      const response = await fetch(ep, {
        method: "POST",
        body: JSON.stringify(otpData),
        headers: {
          "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
        },
      });
      const data = await response.json();

      if (data?.status) {
        return data.status;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const validateOtp = (otpValue) => {
    if (otpValue.length !== 4) {
      return false;
    } else {
      verifyUserOtp(otpValue).then((data) => {
        setOtpInputIsValid(data);
        return data;
      });
    }
  };

  const [otp, setOtp] = useState("");
  const [otpInputIsTouched, setOtpInputIsTouched] = useState(false);
  const [otpInputIsValid, setOtpInputIsValid] = useState(false);

  const otpInputChangeHandler = (event) => {
    const inputValue = event.target.value;
    setOtp(inputValue);
    setOtpInputIsTouched(true);
    validateOtp(inputValue);
  };

  const otpInputBlurHnadler = (event) => {
    setOtpInputIsTouched(true);
    validateOtp(otp);
  };

  const {
    value: centre,
    inputChangeHandler: centerInputChangeHandler,
    resetInput: resetCenterInput,
  } = useInput({
    value: "Virohan Online Courses",
    validationFn: () => {},
    type: "centre",
  });
  const {
    value: radioBtn,
    inputChangeHandler: radioBtnInputChangeHandler,
    resetInput: resetRadioBtn,
  } = useInput({
    value: true,
    validationFn: () => {},
    type: "radioBtn",
  });

  const {
    isLoading: otpIsLoading,
    error: otpError,
    sendRequest: sendRequestForOtp,
  } = useHttp();

  const [showUnderlineForEditBtn, setShowUnderlineForEditBtn] = useState(false);

  let timerForOtp;
  const onGetOtpResponse = (data) => {
    if (data.status === true) {
      // setLastMobile(mobileInput);
      setShowOtpSentMsg(true);
      setShowOtpFormControl(true);
      setMobileInputIsDisabled(true);
      setOtpSent(true);
      timerForOtp = setInterval(() => {
        setOtpTimer((prevState) => {
          if (prevState > 0) {
            prevState = prevState - 1;
          } else {
            // setShowOtpSentMsg(false);
            // setMobileInputIsDisabled(false);
            clearTimeout(timerForOtp);
          }
          return prevState;
        });
      }, 1000);
    } else {
      setMobileInputIsDisabled(false);
    }
    return data;
  };

  const prepareRequestForOtp = async () => {
    // const otpFormData = new FormData();
    // otpFormData.append("mobileNumber", mobileInput);
    // let url = window.location.host + router.basePath + router.asPath;
    // if (url.includes("?")) {
    //   url = url.split("?")[0];
    // }
    const otpData = { mobileNumber: mobileInput, url: window.location.href };

    if (router.query && Object.keys(router.query).length !== 0) {
      otpData.utm = router.query;
    }

    const ep = getApiEndPointsResolver(env).GET_OTP;
    sendRequestForOtp(
      {
        endPoint: ep,
        method: "POST",
        headers: {
          "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
        },
        body: JSON.stringify(otpData),
      },
      onGetOtpResponse
    );
  };

  const getOtpHandler = () => {
    setMobileInputIsTouched(true);
    setShowOtpSentMsg(false);
    setOtpTimer(30);
    setGetOtpBtnIsClicked(true);
    setShowUnderlineForEditBtn(false);
    setMobileInputIsDisabled(true); // it's placed here because it'll restrict the user from changing the number after get otp click
    // setOtpInputIsTouchedOnSubmit(false);
    // setMobileInputIsTouchedOnSubmit(true);
    if (!mobileInputIsInvalid) {
      prepareRequestForOtp();
    }
  };

  const sendLeadSubReq = async () => {
    const leadGenerationPostData = {
      name: nameInput,
      mobileNumber: mobileInput,
      otp,
      centre,
      // isTwelfthPass: radioBtn,
      isWorkingProfessional: radioBtn,
      origin: window.location.href,
    };

    if (router.query && Object.keys(router.query).length !== 0) {
      leadGenerationPostData.utm = router.query;
    }
    setLeadSubReqIsLoading(true);
    try {
      const ep = getApiEndPointsResolver(env).SUBMIT_LEAD_FORM;
      const response = await fetch(ep, {
        method: "POST",
        headers: {
          "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
        },
        body: JSON.stringify(leadGenerationPostData),
      });
      const data = await response.json();
      if (data.status) {
        if (hero.formLevel === 2) {
          setCurrentForm("LEAD_QUALIFICATION");
        } else if (hero.formLevel === 1) {
          setCurrentForm("NO_FORM");
        }
      }
      setLeadSubReqIsLoading(false);
    } catch (error) {
      console.log(error);
      setLeadSubReqIsLoading(false);
    }
  };

  const resendOtpHandler = () => {
    if (!mobileInputIsInvalid) {
      getOtpHandler();
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
    // resetOtpInputIsTouched(false);
    setOtpInputIsTouched(false);
  };

  const bookDemoBtnHandler = (event) => {
    event.preventDefault();
    setNameInputIsTouched(true);
    setMobileInputIsTouched(true);
    setGetOtpBtnIsClicked(false);

    if (showOtpFormControl) {
      setOtpInputIsTouched(true);
    }

    if (!nameInputIsInvalid && !mobileInputIsInvalid && otpInputIsValid) {
      sendLeadSubReq();
    }
  };

  const submitNewDetailHandler = () => {
    setNameInput("");
    setMobileInput("");
    setShowOtpSentMsg(false);
    setOtpSent(false);
    setMobileInputIsDisabled(false);
    setOtp("");
    setOtpInputIsValid(false);
    setOtpInputIsValid(false);
    resetRadioBtn(true);

    setNameInputIsTouched(false);
    setMobileInputIsTouched(false);
    setShowOtpFormControl(false);
    setCurrentForm("LEAD_GENERATION");
  };

  return (
    <div className={classes.leadFormCon}>
      {currentForm === "LEAD_GENERATION" && (
        <React.Fragment>
          <h4 className={classes.title}>Book a Demo</h4>
          <p className={classes.description}>
            Experience our classrooms for free. Our admission experts will
            answer all your questions!
          </p>
        </React.Fragment>
      )}
      {currentForm === "LEAD_QUALIFICATION" && (
        <React.Fragment>
          <h4 className={classes.title}>A little extra is always best</h4>
          <p className={classes.description}>
            We need some more details to guide you towards the best suitable
            course options
          </p>
        </React.Fragment>
      )}

      <div className={classes.leadFormWrapper}>
        {currentForm === "LEAD_GENERATION" && (
          <React.Fragment>
            <p className={classes.formTitle}>Enter Your Details</p>

            <form
              className={classes.leadForm}
              onSubmit={bookDemoBtnHandler}
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

              <div className={classes.mobileOtpFormGroup}>
                <div className={classes.mobileNumberCon}>
                  {!otpInputIsValid && showMobileInvalidMsg && (
                    <div className={classes.error}>
                      Please enter valid Number
                    </div>
                  )}

                  {!otpInputIsValid && showVerifyMobileUsingOtpMsg && (
                    <div className={classes.error}>
                      Please verify NUMBER using OTP!
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
                      }`}
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
                    {/* {otpInputIsValid && mobileInput === lastMobile && ( */}
                    {otpInputIsValid && (
                      <div className={classes.verifiedCheckMark}></div>
                    )}
                    {!otpInputIsValid && (
                      <Fragment>
                        {!otpSent && (
                          <button
                            className={`${classes.getOtpBtn} ${
                              classes.otpBtn
                            } ${
                              showMobileInvalidMsg ||
                              showVerifyMobileUsingOtpMsg
                                ? classes.formControlError
                                : ""
                            }`}
                            type="button"
                            disabled={mobileInputIsInvalid}
                            onClick={getOtpHandler}
                          >
                            {!otpIsLoading && <span>Get OTP</span>}
                            {otpIsLoading && (
                              <div className={classes.loading}></div>
                            )}
                          </button>
                        )}

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
                            onClick={resendOtpHandler}
                            type="button"
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
                    {otpInputIsTouched && !otpInputIsValid && (
                      <div className={`${classes.error} ${classes.otpError}`}>
                        Invalid OTP!
                      </div>
                    )}
                    <input
                      className={`${classes.otpFormControl} ${
                        otpInputIsTouched && !otpInputIsValid
                          ? classes.formControlError
                          : ""
                      }`}
                      autoComplete="off"
                      type="text"
                      placeholder="Enter OTP"
                      pattern="/^\d+$/"
                      name="otp"
                      onChange={otpInputChangeHandler}
                      onBlur={otpInputBlurHnadler}
                    />
                  </div>
                )}
              </div>
              <div className={classes.otpErrors}></div>
              <select
                className={`${classes.formControl} ${classes.centres}`}
                name="centres"
                id="centres"
                onChange={centerInputChangeHandler}
              >
                <option value="Virohan Online Courses">
                  Virohan Online Courses
                </option>
              </select>

              <div className={`${classes.radioBtnBroup} ${classes.formGroup}`}>
                <span className={classes.radioBtnPreText}>
                  Working professional? *
                </span>
                <div
                  className={classes.options}
                  onChange={radioBtnInputChangeHandler}
                >
                  <div className={classes.option}>
                    <input
                      type={"radio"}
                      id="yes"
                      name="radio"
                      defaultChecked={true}
                      value={true}
                    />
                    <label htmlFor="yes" className={classes.labelYes}>
                      Yes
                    </label>
                  </div>
                  <div className={classes.option}>
                    <input type={"radio"} id="no" name="radio" value={false} />
                    <label htmlFor="no" className={classes.labelNo}>
                      No
                    </label>
                  </div>
                </div>
              </div>

              <button className={classes.submitBtn}>
                {!leadSubReqIsLoading && <span>Book a Demo</span>}
                {leadSubReqIsLoading && <div className={classes.loading}></div>}
                {/* <div className={classes.loading}></div> */}
              </button>
            </form>
          </React.Fragment>
        )}
        {currentForm === "LEAD_QUALIFICATION" && (
          <OnlineLeadQualificationForm
            env={env}
            setCurrentForm={setCurrentForm}
            mobileNumber={mobileInput}
          />
        )}
      </div>

      {currentForm === "NO_FORM" && (
        <div className={classes.successScreen}>
          <div className={classes.chkMrkCon}>
            <div
              className={`${classes.verifiedCheckMark} ${classes.successScrnChkMrk}`}
            ></div>
          </div>
          <div className={classes.successMsg}>
            <p className={`${classes.typography} ${classes.typography1}`}>
              Thanks for submitting your details {nameInput.toUpperCase()}
            </p>
            <p className={`${classes.typography} ${classes.typography2}`}>
              An Admission Counsellor from Virohan will reach out to you soon!
            </p>
            <button
              className={classes.newFormDetailsBtn}
              onClick={submitNewDetailHandler}
            >
              Submit New Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineLeadForm;
