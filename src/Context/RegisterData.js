import React, { useState, useContext, createContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
const defaultData = {
  user_id: "",
  nickname: "",
  phone: "",
  year: 0,
  password: "",
  checkPw: "",
  userName: "",
  email: "",
  university: "",
  setUniYear: () => {},
  setUserInfo: () => {},
};

const RegisterContext = createContext(defaultData);

const RegisterProvider = ({ children }) => {
  const history = useHistory();

  const setUniYear = ({ university, year }) => {
    setState((state) => ({ ...state, university, year }));
    console.log("good");
    history.push("/register/info");
  };

  const setUserInfo = ({
    userName,
    user_id,
    password,
    checkPw,
    email,
    nickname,
  }) => {
    setState((state) => ({
      ...state,
      userName,
      user_id,
      password,
      checkPw,
      email,
      nickname,
    }));
  };

  const termState = useMemo(
    () => ({
      ...defaultData,
      setUniYear,
      setUserInfo,
    }),
    [setUniYear, setUserInfo]
  );

  const [state, setState] = useState(termState);
  console.log(state.year);
  return (
    <RegisterContext.Provider value={state}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegisterContext = () => useContext(RegisterContext);

export { useRegisterContext, RegisterProvider };
