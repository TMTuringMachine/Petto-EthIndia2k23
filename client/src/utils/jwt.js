import axios from "./axios";
import axiosInstance from "./axios";
// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  return true;
};

const setSession = (accessToken) => {
  if (accessToken) {
    console.log(accessToken, "here is the token");
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = accessToken;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
