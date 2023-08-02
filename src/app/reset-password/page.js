"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsArrowRightShort } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onReset = async () => {
    if (validateEmail(email)) {
      const response = await axios.post("/api/users/reset-password", {
        email: email,
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

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-1/2 flex justify-center items-center text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
            onClick={onReset}
          >
            Continue <BsArrowRightShort />
          </button>
        </div>

        {/* <div className="text-white mt-6">
          You do not have an account?
          <Link
            className="text-blue-500 pl-2 hover:text-blue-600"
            href="/signup"
          >
            Sign Up.
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ResetPassword;
