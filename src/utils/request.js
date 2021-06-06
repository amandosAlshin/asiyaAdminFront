import axios from "axios";
import store from "@/store";
import { Modal } from "antd";
import { getToken } from "@/utils/auth";
import { logout } from "@/store/actions";

//axios құру
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api server сілтемесі
  timeout: 5000, // request timeout
});

// сұрау
service.interceptors.request.use(
  (config) => {
    if (store.getState().user.token) {
      config.headers.Authorization = `Bearer ${getToken()}`;
      // config.headers.ContentType = 'application/json'
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// жауап
service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("err" + error); // for debug
    const status = error && error.response && error.response.status;
    if (status === 403) {
      Modal.confirm({
        title: "Жүйеден шығу керек?",
        content:
          "Сіз ұзақ уақыт жұмыс істемегендіктен жүйеден шықтыңыз, осы бетте қалу үшін бас тартуға немесе қайтадан кіруге болады",
        okText: "қайта тіркелу",
        cancelText: "бас тарту",
        onOk() {
          let token = store.getState().user.token;
          store.dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
    return Promise.reject(error);
  }
);

export default service;
