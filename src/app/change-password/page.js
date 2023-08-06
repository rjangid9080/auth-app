"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isVaildToken, setIsVaildToken] = useState(false);

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
          setUser({ ...user, email: response.data.email });
          setIsVaildToken(true);
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
      {isVaildToken && (
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

export default ChangePassword;
