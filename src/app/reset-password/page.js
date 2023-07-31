"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsArrowRightShort } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailInputOpen, setIsEmailInputOpen] = useState(true);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onReset = async () => {
    if (validateEmail(user.email)) {
      const response = await axios.post("/api/users/reset-password", {
        email: user.email,
      });
      if (response.status == 200 && response.data.success) {
        setUser({ ...user, email: "" });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } else {
      toast.error("Invalid Email Address");
    }
  };

  const onChangePassword = async () => {
    if (user.password === user.confirmPassword) {
      const response = await axios.post("/api/users/update-password", user);

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } else {
      toast.error("Password and Confirm Password are not same");
    }
  };

  useLayoutEffect(() => {
    const verifyToken = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has("token")) {
        const response = await axios.post("/api/users/verify-token", {
          token: urlParams.get("token"),
          type: "RESET",
        });

        if (response.status === 200 && response.data.success) {
          setIsEmailInputOpen(false);
        } else {
          toast.error(response.data.error);
          setIsEmailInputOpen(true);
        }
      }
    };

    verifyToken();
  }, []);
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={true} />
      {isEmailInputOpen ? (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Reset Password</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button
              type="submit"
              className="w-1/2 flex justify-center items-center text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
              onClick={onReset}
            >
              Continue <BsArrowRightShort />
            </button>
          </div>

          <div className="text-white mt-6">
            You do not have an account?
            <Link
              className="text-blue-500 pl-2 hover:text-blue-600"
              href="/signup"
            >
              Sign Up.
            </Link>
          </div>
        </div>
      ) : (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Change Password</h1>
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              onClick={onChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
