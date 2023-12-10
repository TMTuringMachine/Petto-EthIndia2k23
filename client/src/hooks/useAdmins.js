import { useCallback } from "react";
import axios from "../utils/axios";
import { useSnackbar } from "notistack";

const useAdmins = () => {
  const { enqueueSnackbar } = useSnackbar();
  const getAllPendingHosts = useCallback(async () => {
    const res = await axios.get("/getPendingHosts");
    console.log(res, "here");
    return res?.data?.allHosts;
  }, []);

  const approveHost = useCallback(async (data) => {
    const res = await axios.post("/approveHost", data);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(res.data.message, { variant: "success" });
    window.location.reload();
    return;
  }, []);

  const rejectHost = useCallback(async (data) => {
    const res = await axios.post("/rejectHost", data);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(res.data.message, { variant: "success" });
    return;
  }, []);

  return {
    getAllPendingHosts,
    approveHost,
    rejectHost,
  };
};

export default useAdmins;
