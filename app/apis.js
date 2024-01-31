import axios from "@/axios";
import toast from "react-hot-toast";

export const managersListAPI = async (setManagersList) => {
  try {
    const { data } = await axios.get("/managers-list");
    setManagersList(data.payload);
  } catch (error) {
    // console.error(error);
    toast.error(error.response.data.message);
  }
};

export const getUserData = async (token, setUserData, setManagersList) => {
  try {
    const { data } = await axios.post("/user-data", { token });
    setUserData(data.payload);
    if (data.payload.accountType === "Employee") {
      await managersListAPI(setManagersList);
    }
    return data.payload.accountType;
  } catch (error) {
    // console.error(error);
    toast.error(error.response.data.message);
  }
};

export const signUpAPI = async (
  setLoading,
  formdata,
  setToken,
  setUserData,
  setManagersList,
  router
) => {
  const showToast = toast.loading("Loading...");
  try {
    const { data } = await axios.post("/sign-up", formdata);
    const accountType = await getUserData(
      data.payload.token,
      setUserData,
      setManagersList
    );
    localStorage.setItem("token", JSON.stringify(data.payload.token));
    setToken(data.payload.token);
    if (accountType === "Employee") {
      router.push("/employee-dashboard");
    } else {
      router.push("/manager-dashboard");
    }
    setLoading(false);
    toast.dismiss(showToast);
    toast.success(data.message);
  } catch (error) {
    // console.log(error);
    setLoading(false);
    toast.dismiss(showToast);
    toast.error(error.response.data.message);
  }
};

export const signInAPI = async (
  setLoading,
  formdata,
  setToken,
  setUserData,
  setManagersList,
  router
) => {
  const showToast = toast.loading("Loading...");
  try {
    const { data } = await axios.post("/sign-in", formdata);
    const accountType = await getUserData(
      data.payload.token,
      setUserData,
      setManagersList
    );
    localStorage.setItem("token", JSON.stringify(data.payload.token));
    setToken(data.payload.token);
    if (accountType === "Employee") {
      router.push("/employee-dashboard");
    } else {
      router.push("/manager-dashboard");
    }
    setLoading(false);
    toast.dismiss(showToast);
    toast.success(data.message);
  } catch (error) {
    // console.error(error);
    setLoading(false);
    toast.dismiss(showToast);
    toast.error(error.response.data.message);
  }
};

export const alreadyLoggedIn = async (
  setLoading,
  token,
  setUserData,
  setManagersList,
  router
) => {
  const showToast = toast.loading("Loading...");
  try {
    const accountType = await getUserData(token, setUserData, setManagersList);
    if (accountType === "Employee") {
      router.push("/employee-dashboard");
    } else {
      router.push("/manager-dashboard");
    }
    setLoading(false);
    toast.dismiss(showToast);
  } catch (error) {
    // console.log(error);
    setLoading(false);
    toast.dismiss(showToast);
    toast.error(error.response.data.message);
  }
};

export const createTimesheetEntryAPI = async (
  setLoading,
  token,
  formdata,
  setUserData,
  setManagersList,
  router
) => {
  const showToast = toast.loading("Loading...");
  try {
    const { data } = await axios.post("/create-entry", { formdata, token });
    await getUserData(token, setUserData, setManagersList);
    router.push("/employee-dashboard");
    setLoading(false);
    toast.dismiss(showToast);
    toast.success(data.message);
  } catch (error) {
    // console.log(error);
    setLoading(false);
    toast.dismiss(showToast);
    toast.error(error.response.data.message);
    router.push("/employee-dashboard");
  }
};

export const markRatingAPI = async (
  token,
  formdata,
  setUserData,
  setManagersList
) => {
  const showToast = toast.loading("Loading...");
  try {
    const { data } = await axios.post("/mark-rating", { formdata, token });
    await getUserData(token, setUserData, setManagersList);
    toast.dismiss(showToast);
    toast.success(data.message);
  } catch (error) {
    // console.log(error);
    toast.dismiss(showToast);
    toast.error(error.response.data.message);
  }
};

export const logout = async (
  setLoading,
  setToken,
  setUserData,
  setManagersList,
  router
) => {
  localStorage.removeItem("token");
  setToken(null);
  setUserData(null);
  setManagersList(null);
  router.push("/");
  setLoading(false);
  toast.success("Logged out successfully");
};
