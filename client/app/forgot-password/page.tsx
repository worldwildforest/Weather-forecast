"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/forget-password`,
        { email }
      );
      toast.success("token sent to your email to reset your password");
    } catch (error:any) {
        toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <form>
        <section className="text-gray-600 body-font relative ">
          <div className="container px-10 md:px-5 py-24 mx-auto ">
            <div className="flex flex-col text-center w-full mb-8">
              <h1 className="sm:text-3xl text-2xl font-medium title-font  text-gray-900">
                Forget Password
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="  flex flex-col justify-center items-center border border-gray-100 rounded-3xl p-5  shadow-lg">
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
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-2 mt-2 w-full">
                  <button
                    className="flex mx-auto w-full md:w-[60%] justify-center items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={handleForgetPassword}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default page;
