"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async () => {
    //debugger;
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.confirmPassword.length > 0
    ) {
      if (user.password === user.confirmPassword) {
        //perform post request to create a new user
        setIsLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup successful", response.data);
        //when user is created successfully then redirect to login
        if (response.data.success) {
          //toast.success("Account created successfully");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setIsLoading(false);
        }
      } else {
        //add react hot toast
        toast.error("Password and Confirm Password are not same !");
      }
    } else {
      //add else logic
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            disabled={isLoading}
            placeholder="Full Name"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            disabled={isLoading}
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            disabled={isLoading}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            disabled={isLoading}
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            className={`w-full text-center py-3 rounded bg-green-500 text-white ${
              !isLoading && "hover:bg-green-600"
            } focus:outline-none my-1`}
            onClick={signUp}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <Link
              className="pl-1 pr-1 text-blue-500 hover:text-blue-600"
              href="#"
            >
              Terms of Service
            </Link>
            and
            <Link className="pl-1 text-blue-500 hover:text-blue-600" href="#">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="text-white mt-6">
          Already have an account?
          <Link
            className="text-blue-500 pl-2 hover:text-blue-600"
            href="/login"
          >
            Log In.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
