import React, { useState, useContext, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { loginUser, sendEmail, updateUser, logoutUser } from '../Api/UserApi';
const defaultList = {
  logined: false,
  user: {
    username: '',
    password: '',
    last_name: '',
    nickname: '',
    university: '',
    year: 2019,
    phone: '',
    email: '',
    is_verified: false,
    last_login: '',
    date_joined: '',
    token: '',
  },
  logoutCookie: () => {},
  login: () => {},
  logout: () => {},
  isLogined: () => {},
  updateUserInfo: () => {},
  emailAuth: () => {},
};

const LoginContext = createContext(defaultList);

const LoginProvider = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['waverytime']);
  const history = useHistory();

  const loginCookie = (info) => {
    setState((state) => ({ ...state, user: info }));
    setCookie('waverytime', info, { path: '/' });
  };

  const logoutCookie = () => {
    removeCookie('waverytime');
  };

  const isLogined = () => {
    return cookie['waverytime'] !== undefined;
  };

  const login = ({ username, password }) => {
    loginUser({ username, password })
      .then(({ data }) => {
        setState((state) => ({ ...state, info: true }));
        loginCookie(data);
        history.push('/');
      })
      .catch((err) => {
        console.clear();
        alert('아이디나 비밀번호를 제대로 입력해주세요');
      });
  };
  const logout = () => {
    logoutCookie();
    logoutUser(state.user.token).then(() => history.push('/'));
  };

  const updateUserInfo = (body, token) => {
    updateUser(body, token)
      .then(({ data }) => {
        setCookie('waverytime', data, { path: '/' });
        setState((state) => ({
          ...state,
          user: data,
        }));
        alert('변경이 완료되었습니다.');
        history.push('/my');
      })
      .catch((err) => {
        alert('이미 존재하는 이메일입니다.');
        console.log(err.reponse);
      });
  };

  const emailAuth = (token) => {
    sendEmail(token)
      .then((_) => {
        setCookie('waverytime', { ...cookie['waverytime'], is_verified: true }, { path: '/' });
        setState((state) => ({
          ...state,
          user: { ...state.user, is_verified: true },
        }));
        alert('이메일이 발송되었습니다. 이메일의 링크를 클릭하십시오.');
      })
      .catch((err) => console.log(err.response));
  };

  const termState = {
    ...defaultList,
    login,
    logoutCookie,
    isLogined,
    logout,
    updateUserInfo,
    emailAuth,
  };

  useEffect(() => {
    const user = cookie['waverytime'];
    if (user) {
      setState((state) => ({ ...state, user }));
    }
  }, []);

  const [state, setState] = useState(termState);

  return <LoginContext.Provider value={state}>{children}</LoginContext.Provider>;
};

const useLoginContext = () => useContext(LoginContext);

export { useLoginContext, LoginProvider };
