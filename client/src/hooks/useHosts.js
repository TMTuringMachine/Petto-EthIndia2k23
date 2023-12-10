import { useCallback } from "react";
import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axios";

import { useNavigate } from "react-router";

const useHosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const getSingleHost = async (id) => {
    try {
      const res = await axiosInstance.get(`/getHost/${id}`);
      console.log(res.data);
      return res.data.currentHost;
    } catch (e) {
      console.log(e);
    }
  };
  const sendRequest = async (formData) => {
    try {
      const body = JSON.stringify(formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.post("/sendRequest", body, config);
      console.log(res.data);
      enqueueSnackbar("Request send successfully!", { variant: "success" });
      navigate("/home");
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Some Error Occured", { variant: "error" });
    }
  };
  const hostVerify = async (formData) => {
    try {
      const body = JSON.stringify(formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.post("/createHost", body, config);
      console.log(res);
      enqueueSnackbar("Your Profile has been sent successfully!", {
        variant: "success",
      });
      navigate("/home");
    } catch (e) {
      console.log(e);
      enqueueSnackbar("some error occurred!", { variant: "error" });
    }
  };

  const getAllHosts = useCallback(async () => {
    const res = await axiosInstance.get("/getAllHosts");
    console.log(res, "in the get all hosts section!");
    if (!res.data.ok) {
      return;
    }
    return res.data.hosts;
  }, []);

  const getAllRequestsToHost = useCallback(async () => {
    const res = await axiosInstance.get("/request/getAllRequestsToHost");
    console.log(res, "these are my requests!");
    if (!res.data.ok) return;

    return res.data.data;
  });

  const approveUserRequest = useCallback(async (data) => {
    const res = await axiosInstance.post("/request/acceptRequest", data);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(res.data.message, { variant: "success" });
    window.location.reload();
  });

  const rejectUserRequest = useCallback(async (data) => {
    const res = await axiosInstance.post("request/rejectRequest", data);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(res.data.message, { variant: "success" });
  });
  const getNearbyHosts = async (latitude, longitude) => {
    try {
      const res = await axiosInstance.get(
        `/getHostsNearMe/${latitude}/${longitude}`
      );
      console.log(res.data.result);
      return res.data.result;
    } catch (e) {
      console.log(e);
    }
  };
  return {
    getSingleHost,
    sendRequest,
    hostVerify,
    getAllHosts,
    getAllRequestsToHost,
    approveUserRequest,
    rejectUserRequest,
    getNearbyHosts,
  };
};
export default useHosts;
