import { createContext, useState } from "react";

const FocusNameInputContext = createContext({
  nameInputIsFocused: false,
  setNameInputFocus: () => {},
});

export const FocusNameInputContextProvider = (props) => {
  const [nameInputIsFocused, setNameInputIsFocused] = useState(false);

  const setNameInputFocusHandler = (value) => {
    setNameInputIsFocused(value);
  };
  const context = {
    nameInputIsFocused,
    setNameInputFocus: setNameInputFocusHandler,
  };
  return (
    <FocusNameInputContext.Provider value={context}>
      {props.children}
    </FocusNameInputContext.Provider>
  );
};

export default FocusNameInputContext;
