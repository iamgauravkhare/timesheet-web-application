"use client";
import { logout } from "@/app/apis";
import { centralData } from "@/app/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Navbar = () => {
  const {
    setLoading,
    token,
    setToken,
    userData,
    setUserData,
    setManagersList,
    setShowSignIn,
    setShowSignUp,
  } = useContext(centralData);

  const router = useRouter();

  const signInHandle = () => {
    setShowSignIn(true);
    setShowSignUp(null);
  };

  const signUpHandle = () => {
    setShowSignUp(true);
    setShowSignIn(null);
  };

  const logoutHandler = () => {
    setLoading(true);
    logout(setLoading, setToken, setUserData, setManagersList, router);
  };

  return (
    <div className="flex justify-center shadow-md">
      <nav className="w-full max-w-[1260px] items-center justify-start p-5 flex gap-5 flex-wrap md:gap-10 lg:gap-10 lg:text-xl">
        <div className="bg-black text-white w-[50px] h-[50px] flex items-center justify-center text-4xl p-2 rounded-md">
          <p>Ts</p>
        </div>
        {token ? (
          <>
            {userData && userData.accountType === "Employee" ? (
              <>
                <Link
                  href="/create-timesheet-entry"
                  className="hover:underline transition-all"
                >
                  Create Entry
                </Link>

                <Link
                  href="/employee-dashboard"
                  className="hover:underline transition-all"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/manager-dashboard"
                  className="hover:underline transition-all"
                >
                  Dashboard
                </Link>
              </>
            )}
            <button
              onClick={logoutHandler}
              className="hover:underline transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={signInHandle}
              className="hover:underline transition-all"
            >
              Sign In
            </button>
            <button
              onClick={signUpHandle}
              className="hover:underline transition-all"
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
