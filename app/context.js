"use client";
import { useRouter } from "next/navigation";
import { alreadyLoggedIn } from "./apis";
const { createContext, useState, useEffect } = require("react");

export const centralData = createContext(null);
const Context = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(null);
  const [userData, setUserData] = useState(null);
  const [managersList, setManagersList] = useState(null);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoading(true);
      alreadyLoggedIn(
        setLoading,
        JSON.parse(localStorage.getItem("token")),
        setUserData,
        setManagersList,
        router
      );
    }
    setToken(
      localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null
    );
  }, []);

  return (
    <centralData.Provider
      value={{
        loading,
        setLoading,
        token,
        setToken,
        userData,
        setUserData,
        managersList,
        setManagersList,
        showSignIn,
        setShowSignIn,
        showSignUp,
        setShowSignUp,
      }}
    >
      {props.children}
    </centralData.Provider>
  );
};

export default Context;
