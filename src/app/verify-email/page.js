"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  useLayoutEffect(() => {
    const verifyToken = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has("token")) {
        const response = await axios.post("/api/users/verify-token", {
          token: urlParams.get("token"),
          type: "VERIFY",
        });

        if (response.status === 200 && response.data.success) {
          setUser({ ...user, email: response.data.email });
          setCanChange(true);
        } else {
          toast.error(response.data.error);
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    };

    verifyToken();
  }, []);
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Email Verified</h1>
          <p>Your Email has been verified.You can login now.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
