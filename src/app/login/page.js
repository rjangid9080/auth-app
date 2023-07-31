"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogIn = async () => {
    if (user.email.length > 0 && user.password.length > 0) {
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      if (response.status == 200) {
        router.push("/");
      }
    } else {
      console.log("Please fill all the fields");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Log In</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="w-full flex justify-end">
            <Link
              className="text-blue-500 hover:text-blue-600 text-sm pb-2"
              href="/reset-password"
            >
              Forgot Password ?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
            onClick={onLogIn}
          >
            Login
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
    </div>
  );
};

export default LogIn;
