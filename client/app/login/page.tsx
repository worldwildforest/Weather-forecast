"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const changeHandeler = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserData({ ...userData, [name]: value });
    console.log(name, value);
  };
  const submitHandeler = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/login", userData);
      toast.success("User Logged In successfully");
      router.push("/");
      console.log("Data submitted");
    } catch (error: any) {
      toast.error(error.response.data.msg);
      console.log("Error", error.response.data.msg);
    }
  };

  return (
    <>
      <form onSubmit={submitHandeler}>
        <section className="text-gray-600 body-font relative ">
          <div className="container px-10 md:px-5 py-16 mx-auto ">
            {/* <div className="flex flex-col text-center w-full mb-8">
              <h1 className="sm:text-3xl text-2xl font-medium title-font  text-gray-900">
                Login
              </h1>
            </div> */}
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="  flex flex-col justify-center items-center border border-gray-200 rounded-3xl p-5  shadow-lg">
                <h1 className="sm:text-3xl text-2xl font-bold  p-5  text-gray-900">
                  Login
                </h1>
                <div className="p-2 w-full md:w-[60%]">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={changeHandeler}
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="p-2 w-full md:w-[60%]">
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={changeHandeler}
                        id="password"
                        name="password"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      {showPassword ? (
                        <IoMdEye
                          className="absolute top-3 right-2"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <IoMdEyeOff
                          className="absolute top-3 right-2"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-2 mt-2 w-full">
                  <button className="flex mx-auto w-full md:w-[60%] justify-center items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Login
                  </button>
                </div>

                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center flex justify-between">
                  <p>
                    Don't have an account?
                    <Link href="/register" className="text-indigo-500">
                      Sign up
                    </Link>
                  </p>
                  <Link href="/forgot-password" className="text-indigo-500">
                    Forgot Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
