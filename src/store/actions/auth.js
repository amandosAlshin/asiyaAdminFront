import { setUserToken, resetUser } from "./user";
import { reqLogin, signUp, reqLogout } from "@/api/login";

import { setToken, removeToken } from "@/utils/auth";
export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ email: email.trim(), password: password })
      .then((response) => {
        console.log({ response });
        const { data } = response;
        if (response.status === 200 && data && data.type === 'ok') {
          const token = data.token;
          dispatch(setUserToken(token));
          setToken(token);
          resolve(data);
        } else {
          const msg = data.msg;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const register = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    signUp(values)
      .then((response) => {
        const { data } = response;
        if (data.type === "ok") {
          const token = data.token;
          dispatch(setUserToken(token));
          setToken(token);
          resolve(data);
        } else {
          const msg = data.msg;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((response) => {
        const { data } = response;
        if (data.status === 0) {
          dispatch(resetUser());
          removeToken();
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
