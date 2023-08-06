"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [isVerfied, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasToken, setHasToken] = useState(false);

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
        } else {
          router.push("/login");
        }
      }
    };

    verifyToken();
  }, []);
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <div className="w-full border-b flex justify-center p-2">
            <Image
              src="mail.svg"
              alt="Email Verified"
              width={150}
              height={100}
            />
          </div>
          <h1 className="mb-8 mt-8 text-3xl text-center">Email Verified</h1>
          <Link
            className="w-full flex justify-center justify-self-center items-center text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
            href="/login"
          >
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
