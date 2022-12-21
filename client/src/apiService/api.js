import axios from "axios";
import { API_NOTIFICATIONS, SERVICE_URLs } from "../constants/apiNotifications";
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // console.log(config);
    return config;
  },
  function (error) {
    // console.log("error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // console.log("res", response);
    const res = processResponse(response);
    // console.log("res", res);
    return res;
  },
  function (error) {
    // console.log("error", error);
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    // console.log("res", response.config.data);
    return { isSuccess: true, data: response.config };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log("ERROR IN RESPONSE", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATIONS.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    console.log("ERROR IN REQUEST", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATIONS.requestFailure,
      code: "",
    };
  } else {
    console.log("ERROR IN NETWORK", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATIONS.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLs)) {
  API[key] = (body) => {
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
    });
    // console.log("body", body);
  };
}

export { API };
