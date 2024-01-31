"use client";
import { signUpAPI } from "@/app/apis";
import { centralData } from "@/app/context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const SignUp = () => {
  const [formdata, setFormdata] = useState({
    fullname: "",
    password: "",
    username: "",
    accountType: "",
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

  const onchangeHandler = (e) => {
    setFormdata((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    signUpAPI(
      setLoading,
      formdata,
      setToken,
      setUserData,
      setManagersList,
      router
    );
    setFormdata({
      fullname: "",
      password: "",
      username: "",
      accountType: "",
    });
    setShowSignUp(null);
    setShowSignIn(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-10">
      {loading ? (
        <span className="loader mt-24"></span>
      ) : (
        <>
          <h1 className="text-3xl underline">Employee Sign Up</h1>
          <form
            className="flex flex-col w-full md:w-[40%] lg:w-[35%] gap-5 shadow-lg rounded-md p-3"
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <input
              type="text"
              className="w-full rounded-md p-3 border-2 outline-none"
              placeholder="Enter Full Name"
              name="fullname"
              value={formdata.fullname}
              onChange={onchangeHandler}
            />
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
              placeholder=" Enter Password"
              value={formdata.password}
              onChange={onchangeHandler}
            />
            <select
              name="accountType"
              id=""
              className="w-full rounded-md p-3 border-2 outline-none"
              value={formdata.accountType}
              onChange={onchangeHandler}
            >
              <option>Select Account Type</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
            <input
              type="submit"
              value="Sign Up"
              className="w-full rounded-md p-3 border-2 outline-none hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default SignUp;
