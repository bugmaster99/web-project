import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "../Icons/Icons";
import classes from "./SearchList.module.css";

const SearchList = ({
  data,
  value,
  isError,
  setError,
  disabled,
  inputValue,
  placeholder,
  onFocusHandler,
  onChangeInputHandler,
  onItemClickedHandler,
}) => {
  const searchListRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const openOptionsHandler = () => {
    if (!showOptions) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (!showOptions) {
      if (value !== inputValue) {
        setError(true);
      }
    }
  }, [showOptions, value]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      !searchListRef?.current?.contains(event.target) && setShowOptions(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleOnChangeHandler = (e) => {
    setShowOptions(true);
    onChangeInputHandler(e);
  };

  const onInputClickHandler = (e) => {
    setError(false);
    onFocusHandler();
    onChangeInputHandler(e);
  };

  return (
    <div className={classes.searchListCon} ref={searchListRef}>
      <div
        onClick={openOptionsHandler}
        className={`${classes.selectedItem} ${
          isError && classes.searchListError
        }`}>
        <input
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onClick={onInputClickHandler}
          className={classes.searchListInput}
          onChange={(e) => handleOnChangeHandler(e)}
          onFocus={() => {}}
          onBlur={(e) => {
            // if (value !== e.target.value) {
            //   setError(true);
            // }
          }}
        />
        <SearchIcon
          style={{ paddingRight: "7px", position: "absolute", right: 7 }}
        />
      </div>
      {showOptions && data.length > 0 && (
        <div className={classes.optionsCon}>
          {data?.map((option, i) => (
            <div
              className={classes.option}
              key={`${i.toString()}-${option.state ?? option.name}`}
              onClick={() => {
                onItemClickedHandler(option.state ?? option);
                setError(false);
                setShowOptions(false);
              }}>
              {option.state ?? option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchList;
