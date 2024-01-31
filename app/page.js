"use client";
import { useContext } from "react";
import { centralData } from "./context";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

export default function Home() {
  const { showSignIn, showSignUp } = useContext(centralData);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1260px] p-5">
        {showSignIn && <SignIn />}
        {showSignUp && <SignUp />}
      </div>
    </div>
  );
}
