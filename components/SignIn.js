"use client";
import { signInAPI } from "@/app/apis";
import { centralData } from "@/app/context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const SignIn = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const {
    loading,
    setLoading,
    setToken,
    setUserData,
    setManagersList,
    setShowSignIn,
    setShowSignUp,
  } = useContext(centralData);

  const signUpHandle = () => {
    setShowSignUp(true);
    setShowSignIn(null);
  };

  const onchangeHandler = (e) => {
    setFormdata((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    signInAPI(
      setLoading,
      formdata,
      setToken,
      setUserData,
      setManagersList,
      router
    );
    setFormdata({
      username: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-10">
      {loading ? (
        <span className="loader mt-24"></span>
      ) : (
        <>
          <h1 className="text-3xl underline">Sign In</h1>
          <form
            className="flex flex-col w-full md:w-[50%] lg:w-[35%] gap-5 shadow-lg rounded-md p-3"
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <input
              type="text"
              className="w-full rounded-md p-3 border-2 outline-none"
              placeholder="Enter Username"
              name="username"
              value={formdata.username}
              onChange={onchangeHandler}
            />
            <input
              type="password"
              name="password"
              className="w-full rounded-md p-3 border-2 outline-none"
              placeholder="Enter Password"
              value={formdata.password}
              onChange={onchangeHandler}
            />

            <input
              type="submit"
              value="Sign In"
              className="w-full rounded-md p-3 border-2 outline-none hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            />

            <button
              type="button"
              onClick={() => signUpHandle(true)}
              className="w-full rounded-md p-3 border-2 outline-none hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            >
              Don't have account? Sign up now
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignIn;
