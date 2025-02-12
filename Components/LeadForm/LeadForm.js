import parse from "html-react-parser";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/router";
import useHttp from "../../hooks/useHttp";
import FocusNameInputContext from "../../store/focusNameInputContext";
import LeadQualificationForm from "../LeadQualificationForm/LeadQualificationForm";
import classes from "./LeadForm.module.css";
// import { STATE_DISTRICT_LIST } from "../../data/stateDistrictList.data";
import { pushToDataLayer } from "../../lib/gtm";
import { getApiEndPointsResolver } from "../../utils/apiEndpointsResolver";
import { postFbPixelEvent } from "../../utils/fbPixelEvent";
import {
  postGoogleEvent,
  postSubmitGoogleEvent,
} from "../../utils/googleEvent";
import postPixelEventLog from "../../utils/postPixelEventLog";
import SearchList from "../SearchList/SearchList";
// import { LocationIcon } from "../Icons/Icons";
// import { pinCodes } from "../../utils/pinCodes";

const LeadForm = (props) => {
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const router = useRouter();
  const hero = props.hero;
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

  // const [latitudeData, setLatitudeData] = useState("");
  // const [longitudeData, setLongitudeData] = useState("");
  // const [pinCodeInput, setPinCodeInput] = useState("");
  // const [pinCodeInputIsValid, setPinCodeInputIsValid] = useState(false);
  // const [pinCodeInputIsTouched, setPinCodeInputIsTouched] = useState(false);
  // const [pinCodeLoading, setPinCodeLoading] = useState(false);
  // const [isPinCodeMatch, setIsPinCodeMatch] = useState(false);

  // const checkPinCode = (pinCodeInput) => {
  //   const pinCodeExists = pinCodes.includes(+pinCodeInput);

  //   if (pinCodeExists) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const [coordinate, setCoordinate] = useState({})

  // const pinCodeInputChangeHandler = (event) => {
  //   const value = event.target.value;

  //   setPinCodeInput(value);
  //   const isPinCodeValid = /^[1-9]\d{5}$/.test(value);
  //   if (isPinCodeValid) {
  //     setPinCodeInputIsValid(true);
  //   } else {
  //     setPinCodeInputIsValid(false);
  //   }
  // };

  // const pinCodeInputBlurHandler = () => {
  //   setPinCodeInputIsTouched(true);
  // };

  // const getLocationHandler = (e) => {
  //   setPinCodeLoading(true);
  //   e.preventDefault();
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         async (position) => {
  //           const { latitude, longitude } = position.coords;
  //           const coordinates = { latitude, longitude };
  //           resolve(coordinates);
  //           console.log(latitude, longitude);
  //           const response = await fetch(
  //             ` https://api-website.virohan.com/location`,
  //             {
  //               method: "POST",
  //               body: JSON.stringify({ latitude, longitude }),
  //             }
  //           );
  //           const data = await response.json();
  //           if (data.statusCode === 200) {
  //             setPinCodeLoading(false);
  //             const isPinCodeValid = /^[1-9]\d{5}$/.test(data.data.pincode);
  //             if (isPinCodeValid) {
  //               setPinCodeInputIsValid(true);
  //             } else {
  //               setPinCodeInputIsValid(false);
  //             }
  //             setPinCodeInput(data.data.pincode);
  //             setLatitudeData(latitude);
  //             setLongitudeData(longitude);
  //           }
  //         },
  //         (error) => {
  //           reject(error);
  //           setPinCodeLoading(false);
  //         }
  //       );
  //     } else {
  //       reject(new Error("Geolocation is not supported by this browser."));
  //     }
  //   });
  // };

  const ctx = useContext(FocusNameInputContext);
  const nameIsFocused = ctx.nameInputIsFocused;
  const nameInputRef = useRef();
  if (nameIsFocused) {
    nameInputRef?.current?.focus();
  }

  const mobileInputRef = useRef();

  useEffect(() => {
    const getStateWiseDistrictList = async () => {
      try {
        // const ep = "https://api-website.virohan.com/getStates/v2";
        const ep = getApiEndPointsResolver(props.env).GET_STATES;
        const response = await fetch(ep, {
          method: "GET",
          headers: {
            "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
          },
        });
        let data = [];
        if (response.ok) {
          data = await response.json();
          if (data.status === "success") {
            setStateList(data.data);
          }
        }
      } catch (error) {}
    };

    getStateWiseDistrictList();
  }, []);

  useEffect(() => {
    if ("OTPCredential" in window) {
      console.log("inside otp creds api");
      const input = document.querySelector(
        'input[autocomplete="one-time-code"]'
      );
      if (!input) return;
      console.log("otp auto fill input: ", input);
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp?.code) {
            const otpValue = otp?.code?.replace(/\D/g, "");
            setOtp(otpValue);
            validateOtp(otpValue);
            ac.abort();
          }
        })
        .catch((err) => {
          console.log("Web OTP API Error:", err);
          ac.abort();
        });
    }
  }, []);

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
    const otpData = { mobileNumber: mobileInput, otp };
    try {
      const ep = getApiEndPointsResolver(props.env).SUBMIT_OTP;
      const response = await fetch(ep, {
        method: "POST",
        headers: {
          "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
        },
        body: JSON.stringify(otpData),
      });
      const data = await response.json();

      if (data?.status) {
        otpAttemptsRef.current = 4;
        setOtpErrorResponse("");
        return data.status;
      } else {
        otpAttemptsRef.current =
          otpAttemptsRef.current > 0 ? otpAttemptsRef.current - 1 : 0;
        setOtpErrorResponse(data?.msg || "Invalid OTP");

        if (otpAttemptsRef.current === 0) {
          setOtpTimer(0);
          clearInterval(timerId);
        }
        return false;
      }
    } catch (error) {
      // setOtpErrorResponse("Invalid OTP");
      return false;
    }
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

  const otpInputBlurHnadler = (event) => {
    setOtpInputIsTouched(true);
    validateOtp(otp);
  };

  // const [state, setState] = useState("select-state");
  const [state, setState] = useState("");
  const [stateInputIsTouched, setStateInputIsTouched] = useState(false);
  const [stateInputIsValid, setStateInputIsValid] = useState(false);

  const stateChangeHandler = (state) => {
    setState(state);
    setStateInput(state);
    const selectedState = stateList.find((item) => item.state === state);
    setDistrictList(selectedState.districts);
  };

  const districtChangeHandler = (district) => {
    setDistrict(district);
    setDistrictInput(district.name);
  };

  const stateInputChangeHandler = (event) => {
    stateList.filter((item) => {
      if (item.state === event.target.value) {
        return setDistrictList(item.districts);
      }
    });

    setState(event.target.value);
    if (event.target.value !== "select-state") {
      setStateInputIsValid(true);
      setDistrictInputIsDisabled(false);
      setDistrictInputIsValid(false);
    } else {
      setStateInputIsValid(false);
      setDistrictInputIsDisabled(true);
      setDistrict("select-district");
      setDistrictList([]);
    }
  };

  // const [district, setDistrict] = useState("select-district");
  const [district, setDistrict] = useState(null);
  const [districtInputIsTouched, setDistrictInputIsTouched] = useState(false);
  const [districtInputIsValid, setDistrictInputIsValid] = useState(false);
  const [districtInputIsDisabled, setDistrictInputIsDisabled] = useState(true);
  const [centerId, setCenterId] = useState("");

  const districtInputChangeHandler = (event) => {
    if (event.target.value !== "select-district") {
      setDistrictInputIsValid(true);

      const districtData = districtList.filter(
        (district) => district.name === event.target.value
      );
      setDistrict(districtData);
    } else {
      setDistrictInputIsValid(false);
    }
  };

  const [center, setCenter] = useState("select-center");

  const [centerInputIsTouched, setCenterInputIsTouched] = useState(false);
  const [centerInputIsValid, setCenterInputIsValid] = useState(false);

  const stateData =
    stateInput !== ""
      ? filteredStates.length > 0
        ? filteredStates
        : []
      : stateList;

  // const stateData = filteredStates.length > 0 ? filteredStates : stateList;

  const districtData =
    districtInput !== ""
      ? filteredDistricts.length > 0
        ? filteredDistricts
        : []
      : districtList;

  // const districtData = filteredDistricts.length > 0 ? filteredDistricts : districtList;

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

  const onStateFocused = () => {
    setStateInputIsTouched(false);
    setStateError(false);
  };

  const onDistrictFocused = () => {
    setDistrictInputIsTouched(false);
    setDistrictError(false);
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

  const onChangeStateInputHandler = (e) => {
    const { value } = e.target;
    setStateInput(value);
    const filteredstates = stateList.filter((state) =>
      state.state.toLowerCase().includes(value.toLowerCase())
    );
    if (!filteredstates.length) {
      setState("");
    }
    setFilteredStates(filteredstates);
  };

  const onChangeDistrictInputHandler = (e) => {
    const { value } = e.target;
    // setDistrict(prevstate => ({ ...prevstate, name: e.target.value }))
    setDistrictInput(value);
    const filtereddistricts = districtList.filter((district) =>
      district.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDistricts(filtereddistricts);
  };

  const {
    isLoading: otpIsLoading,
    error: otpError,
    sendRequest: sendRequestForOtp,
  } = useHttp();

  const [showUnderlineForEditBtn, setShowUnderlineForEditBtn] = useState(false);

  const [isStateFoundError, setStateFoundError] = useState(false);
  const [isDistrictFoundError, setDistrictFoundError] = useState(false);

  const setStateError = (value) => {
    setStateFoundError(value);
  };

  const setDistrictError = (value) => {
    setDistrictFoundError(value);
  };

  let timerForOtp;
  const onGetOtpResponse = (data) => {
    if (data.status === true) {
      // setShowOtpSentMsg(true);
      // setShowOtpFormControl(true);
      // setMobileInputIsDisabled(true);
      // setOtpSent(true);

      timerForOtp = setInterval(() => {
        setOtpTimer((prevState) => {
          if (prevState > 0) {
            prevState = prevState - 1;
          } else {
            // setShowOtpSentMsg(false);
            // setMobileInputIsDisabled(false);
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
    const otpFormData = new FormData();
    otpFormData.append("mobileNumber", otpInput);

    const otpData = {
      mobileNumber: otpInput,
      url: window.location.href,
      name: nameInput,
      center: center === "select-center" ? "" : center,
      educationalQualification:
        educationQualification === "select-education-qualification"
          ? ""
          : educationQualification,
      state: state,
      district: district?.name ?? "",
      centreId: centerId,
    };

    if (router.query && Object.keys(router.query).length !== 0) {
      otpData.utm = router.query;
    }

    setOtpErrorResponse("");
    setOtpInputIsTouched(false);
    setOtp("");
    otpAttemptsRef.current = 4;

    // being optimistic
    setShowOtpSentMsg(true);
    setShowOtpFormControl(true);
    setMobileInputIsDisabled(true);
    setOtpSent(true);
    otpInputRef.current?.focus();

    const ep = getApiEndPointsResolver(props.env).GET_OTP;
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

  const getOtpHandler = (otpInput) => {
    setMobileInputIsTouched(true);
    setShowOtpSentMsg(false);
    setOtpTimer(30);
    setGetOtpBtnIsClicked(true);
    setShowUnderlineForEditBtn(false);
    setMobileInputIsDisabled(true); // it's placed here because it'll restrict hte user from changing the number after get otp click
    // setOtpInputIsTouchedOnSubmit(false);
    // setMobileInputIsTouchedOnSubmit(true);
    // getOtpFbPixelEvent(mobileInput);

    if (props?.isFacebookAnalyticsActive) {
      postFbPixelEvent("Lead", {
        Mobile_No: otpInput,
        ph: otpInput,
      });
      postPixelEventLog({
        env: props.env,
        mobileNumber: otpInput,
        pixel: "535889438509261,979130823106518",
        event: "Lead",
        pageUrl: window.location.href,
      });
    }
    // if (!mobileInputIsInvalid) {
    prepareRequestForOtp(otpInput);
    // }
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

    if (router.query && Object.keys(router.query).length !== 0) {
      leadGenerationPostData.utm = router.query;
    }

    setLeadSubReqIsLoading(true);
    try {
      if (district?.sendFbPixelEvent) {
        postSubmitGoogleEvent("Google_Purchase", "Click");
        pushToDataLayer({
          event: "event",
          category: "Google Purchase",
          action: "Click",
          // label: 'Button Label',
        });
      }

      const ep = getApiEndPointsResolver(props.env).SUBMIT_LEAD_FORM;
      const response = await fetch(ep, {
        method: "POST",
        headers: {
          "x-api-key": "glO7twA4VA8o1swxwbwFMdhX4O5TYA",
        },
        body: JSON.stringify(leadGenerationPostData),
      });
      const data = await response.json();

      if (data.status) {
        // Handle the form event in  google analytics.

        window?.gtag("event", "conversion", {
          send_to: "AW-556042846/ZSk5CN3p25kaEN6UkokC",
        });

        postGoogleEvent("Submit_BookADemo_Form_AdmissionPg", "Click");

        if (props?.isFacebookAnalyticsActive) {
          postFbPixelEvent("InitiateCheckout", {
            // content_ids: [{ centerId: centerId }],
            eventref: "fb_oea",
            ph: mobileInput,
          });
          postPixelEventLog({
            env: props.env,
            mobileNumber: mobileInput,
            pixel: "535889438509261,979130823106518",
            event: "InitiateCheckout",
            pageUrl: window.location.href,
          });
          //district[0].sendFbPixelEvent
          if (district.sendFbPixelEvent) {
            postFbPixelEvent("Purchase", {
              content_ids: ["partner_event_id"],
              eventref: "fb_oea",
              currency: "INR",
              num_items: 1,
              value: 1,
              ph: mobileInput,
            });
            postPixelEventLog({
              env: props.env,
              mobileNumber: mobileInput,
              pixel: "535889438509261,979130823106518",
              event: "Purchase",
              pageUrl: window.location.href,
            });
          }
        }

        // const isMatch = checkPinCode(pinCodeInput);

        // if (isMatch) {
        //   postFbPixelEvent("Purchase", {
        //     content_ids: ["partner_event_id"],
        //     eventref: "fb_oea",
        //     currency: "INR",
        //     num_items: 1,
        //     value: 1,
        //   });
        // }

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
    // resetOtpInputIsTouched(false);
    setOtpInputIsTouched(false);
  };

  const proceedBtnHandler = (event) => {
    event.preventDefault();
    setNameInputIsTouched(true);
    setMobileInputIsTouched(true);
    setGetOtpBtnIsClicked(false);
    setStateInputIsTouched(true);
    setDistrictInputIsTouched(true);
    setCenterInputIsTouched(true);
    setEducationQualificationInputIsTouched(true);
    // setPinCodeInputIsTouched(true);
    if (showOtpFormControl) {
      setOtpInputIsTouched(true);
    }

    // const isPinCodeValid = /^[1-9]\d{5}$/.test(pinCodeInput);

    // if (isPinCodeValid) {
    //   setPinCodeInputIsValid(true);
    // } else {
    //   setPinCodeInputIsValid(false);
    // }

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

  const submitNewDetailHandler = () => {
    setNameInput("");
    setMobileInput("");
    setStateInput("");
    setState("");
    setDistrict(null);
    setDistrictInput("");
    setShowOtpSentMsg(false);
    setOtpSent(false);
    setMobileInputIsDisabled(false);
    setOtp("");
    setOtpInputIsValid(false);
    setStateInputIsValid(false);
    setDistrictInputIsValid(false);
    setCenterInputIsValid(false);
    setEducationQualificationInputIsValid(false);
    // resetRadioBtn(true);

    setNameInputIsTouched(false);
    setMobileInputIsTouched(false);
    setOtpInputIsTouched(false);
    setStateInputIsTouched(false);
    setDistrictInputIsTouched(false);
    setCenterInputIsTouched(false);
    setEducationQualificationInputIsTouched(false);
    setShowOtpFormControl(false);
    setCurrentForm("LEAD_GENERATION");
  };

  const stateTouchError = stateInputIsTouched && state === "";
  const districtTouchError = districtInputIsTouched && district === null;

  useEffect(() => {
    // if (state === "") {
    if (stateInput !== state) {
      setState("");
      setDistrict(null);
      setDistrictInput("");
      setDistrictList([]);
    }
    if (districtInput === "") {
      setDistrict(null);
    }
  }, [state, stateInput, districtInput]);

  // console.log("isDistrictFoundError", isDistrictFoundError);

  return (
    <div className={classes.leadFormCon}>
      {currentForm === "LEAD_GENERATION" && (
        <React.Fragment>
          <h4 className={classes.title}>{hero.firstFormTitle}</h4>
          <p className={classes.description}>
            {parse(hero.firstFormDescription)}
          </p>
        </React.Fragment>
      )}
      {currentForm === "LEAD_QUALIFICATION" && (
        <React.Fragment>
          <h4 className={classes.title}>{hero.secondFormTitle}</h4>
          <p className={classes.description}>{hero.secondFormDescription}</p>
        </React.Fragment>
      )}

      <div className={classes.leadFormWrapper}>
        {currentForm === "LEAD_GENERATION" && (
          <React.Fragment>
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
                      {/* {otpInputIsValid && mobileInput === lastMobile && ( */}
                      {otpInputIsValid && (
                        <div className={classes.verifiedCheckMark}></div>
                      )}
                      {!otpInputIsValid && (
                        <Fragment>
                          {/* {!otpSent && (
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
                          )} */}

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
                      {/* {otpInputIsTouched && !otpInputIsValid && (
                        <div className={`${classes.error} ${classes.otpError}`}>
                          Invalid OTP!
                        </div>
                      )} */}
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

              <div className={classes.locationFormGroup}>
                <div className={classes.state}>
                  {/* {stateInputIsTouched && !stateInputIsValid && (
                    <div className={`${classes.error} ${classes.centerError}`}>
                      Please Select State!
                    </div>
                  )} */}
                  {!isStateFoundError &&
                    !(stateInput !== "" && filteredStates.length === 0) &&
                    stateInputIsTouched &&
                    state === "" && (
                      <div
                        className={`${classes.error} ${classes.centerError}`}
                      >
                        Please Select State!
                      </div>
                    )}
                  {((stateInput !== "" && filteredStates.length === 0) ||
                    isStateFoundError) && (
                    <div className={`${classes.error} ${classes.centerError}`}>
                      No state selected
                    </div>
                  )}
                  <SearchList
                    data={stateData}
                    value={state}
                    disabled={false}
                    inputValue={stateInput}
                    setError={setStateError}
                    placeholder={"Select State"}
                    onFocusHandler={onStateFocused}
                    onItemClickedHandler={stateChangeHandler}
                    onChangeInputHandler={onChangeStateInputHandler}
                    isError={
                      stateTouchError ||
                      (stateInput !== "" && filteredStates.length === 0) ||
                      isStateFoundError
                    }
                  />
                </div>

                <div className={classes.district}>
                  {/* {districtInputIsTouched && !districtInputIsValid && (
                    <div className={`${classes.error} ${classes.centerError}`}>
                      Please Select District!
                    </div>
                  )} */}
                  {!isDistrictFoundError &&
                    !(districtInput !== "" && filteredDistricts.length === 0) &&
                    districtInputIsTouched &&
                    !district && (
                      <div
                        className={`${classes.error} ${classes.districtError}`}
                      >
                        Please Select District!
                      </div>
                    )}
                  {((districtInput !== "" && filteredDistricts.length === 0) ||
                    isDistrictFoundError) && (
                    <div
                      className={`${classes.error} ${classes.districtError}`}
                    >
                      No district found
                    </div>
                  )}
                  <SearchList
                    data={districtData}
                    value={district?.name ?? ""}
                    disabled={state === "" || state !== stateInput}
                    setError={setDistrictError}
                    inputValue={districtInput}
                    placeholder={"Select District"}
                    onFocusHandler={onDistrictFocused}
                    onItemClickedHandler={districtChangeHandler}
                    onChangeInputHandler={onChangeDistrictInputHandler}
                    isError={
                      districtTouchError ||
                      (districtInput !== "" &&
                        filteredDistricts.length === 0) ||
                      isDistrictFoundError
                    }
                  />
                </div>
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
                  {/* {selectedCentreData.centres?.map((centre) => {
                    return (
                      <option key={centre.centreId} value={centre.centreName}>
                        {centre.centreName}
                      </option>
                    );
                  })} */}
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

              {/* PINCODE */}

              {/* <div className={classes.pinCodeFormGroup}>
                <div className={classes.pinCodeCon}>
                  {!pinCodeInputIsValid && pinCodeInputIsTouched && (
                    <div className={classes.error}>
                      Please enter valid pincode
                    </div>
                  )}
                  <div className={classes.inputBtnGp}>
                    <input
                      className={`${classes.pinCodeFormControl}  ${
                        pinCodeInputIsTouched && !pinCodeInputIsValid
                          ? classes.formControlError
                          : ""
                      }`}
                      type="text"
                      placeholder="Enter Pincode"
                      pattern="^[1-9]\d{5}$"
                      name="phone"
                      value={pinCodeInput}
                      maxLength={6}
                      onChange={pinCodeInputChangeHandler}
                      onBlur={pinCodeInputBlurHandler}
                    />

                    <Fragment>
                      <button
                        className={`${classes.getPinCode} ${
                          classes.pinCodeBtn
                        } ${
                          showMobileInvalidMsg || showVerifyMobileUsingOtpMsg
                            ? classes.formControlError
                            : ""
                        }`}
                        type="button"
                        onClick={getLocationHandler}>
                        {pinCodeLoading ? (
                          <div className={classes.loading}></div>
                        ) : (
                          <>
                            Auto Detect
                            <span className={classes.locationIcon}>
                              <LocationIcon />
                            </span>
                          </>
                        )}
                      </button>
                    </Fragment>
                  </div>
                </div>
              </div> */}

              <button className={classes.submitBtn}>
                {!leadSubReqIsLoading && <span>{props.cta}</span>}
                {leadSubReqIsLoading && <div className={classes.loading}></div>}
              </button>
            </form>
          </React.Fragment>
        )}
        {currentForm === "LEAD_QUALIFICATION" && (
          <LeadQualificationForm
            env={props.env}
            otp={otp}
            setCurrentForm={setCurrentForm}
            mobileNumber={mobileInput}
            url={props.url}
            courses={hero.courses}
            isFacebookAnalyticsActive={props?.isFacebookAnalyticsActive}
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

export default LeadForm;
