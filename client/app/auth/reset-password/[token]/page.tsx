"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

export default function page() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const { token } = useParams();
  console.log(token);

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-password/${token}`,
        { password }
      );
      toast.success("Password reset successfully");
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <form>
      <section className="text-gray-600 body-font relative ">
        <div className="container px-10 md:px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-gray-900">
              Login
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="  flex flex-col justify-center items-center border border-gray-200 rounded-3xl p-5  shadow-lg">
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
                      id="password"
                      name="password"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                <button
                  className="flex mx-auto w-full md:w-[60%] justify-center items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={handleResetPassword}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
