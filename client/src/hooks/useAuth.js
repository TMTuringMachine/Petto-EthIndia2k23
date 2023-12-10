import { useCallback } from "react";

import { loginSuccess, logoutSuccess, initialize } from "../redux/slices/auth";
import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import { setSession, isValidToken } from "../utils/jwt";
import axiosInstance from "../utils/axios";

import { useNavigate } from "react-router";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const login = useCallback(async (userData) => {
    const response = await axiosInstance.post("/login", userData);
    console.log(response, "i am login response");
    if (!response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: "error" });
      return;
    } else {
      const { token, userLogin } = response.data;
      setSession(token);
      dispatch(loginSuccess({ ...userLogin }));
      console.log(userLogin, "he he he");
      if (userLogin.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch(logoutSuccess());
    navigate("/login");
  }, []);

  const registerAdmin = useCallback(async (adminData) => {
    const response = await axiosInstance.post("/signup", adminData);
    console.log(response, "admin respose");
    if (response.statusText != "OK") {
      console.log(response.data);
      enqueueSnackbar(response.data, { variant: "error" });
      return false;
    } else {
      console.log(response);
      enqueueSnackbar(response.data, { variant: "success" });
      navigate("/login");

      return true;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (isValidToken(accessToken)) {
      setSession(accessToken);
      const response = await axiosInstance.get("/jwtVerify");
      if (response) {
        const { user } = response.data;
        console.log(user, "this is the user broooo");
        delete user?.password;
        dispatch(
          initialize({
            user,
            isLoggedIn: true,
          }),
        );
      } else {
        dispatch(
          initialize({
            user: null,
            isLoggedIn: false,
          }),
        );
      }
    } else {
      dispatch(
        initialize({
          user: null,
          isLoggedIn: false,
        }),
      );
    }
  });

  const deleteAdmin = useCallback(async (id) => {
    const response = await axiosInstance.delete(`/admin/${id}`);
    if (response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: "success" });
    } else {
      enqueueSnackbar("Error deleting admin!", { variant: "error" });
    }
  }, []);

  const updateUserMetamaskAddress = useCallback(async (id, address) => {
    const data = {
      userid: id,
      address: address,
    };
    const res = await axiosInstance.post("/updateMetamaskAddress", data);
    console.log(res, "this is the update metamask response ");
    return res;
  }, []);

  return {
    login,
    logout,
    registerAdmin,
    initializeAuth,
    deleteAdmin,
    isLoggedIn,
    user,
    updateUserMetamaskAddress,
  };
};

export default useAuth;
