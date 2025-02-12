import { useState } from "react";

const useInput = (data) => {
  const [input, setInput] = useState(data?.value || "");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  let inputIsValid;
  if (data.validationFn) {
    inputIsValid = data.validationFn(input);
  }

  const inputChangeHandler = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    setInputIsTouched(true);
  };

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const setInputIsTouchedForBtnClick = (value) => {
    setInputIsTouched(value);
  };

  return {
    value: input,
    inputIsTouched,
    inputIsValid,
    inputChangeHandler,
    inputBlurHandler,
    setInputIsTouchedForBtnClick,
    resetInput: setInput,
    resetInputIsTouched: setInputIsTouched,
  };
};

export default useInput;
