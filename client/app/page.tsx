"use client";
import Weather from "@/components/weather";
import axios from "axios";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Loader from "../public/Spinner-1s-200px.gif";
import Image from "next/image";
import { toast } from "react-toastify";
import { IoMdPartlySunny } from "react-icons/io";
import Link from "next/link";

// interface WeatherData{
// main:{
//   temperature: number,
//   humadity:number,
//   name:string,
//   wind:number

// }
// }

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.get(url).then((response) => {
        setWeather(response.data);
        // console.log(response.data);
      });
    } catch (error) {
      toast.error("City not found");
    }
    setCity("");
    setLoading(false);
  };

  if (loading) {
    return (
      <div>
        <Image
          className="flex mx-auto mt-40 w-[250px] "
          src={Loader}
          alt="loading..."
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex  bg-white justify-around  p-4">
          <div className="flex items-center ">
            <h1 className="text-2xl font-bold">Weather-App</h1>
            <IoMdPartlySunny size={30} className="ml-1 text-blue-400" />
          </div>
          <div className="flex items-center">
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-500 to-blue-300 text-white mx-2 px-3 py-2 rounded-xl"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-blue-300 text-white mx-2 px-3 py-2 rounded-xl"
            >
              login
            </Link>
          </div>
        </div>
        <div className="bg-cover bg-gradient-to-t from-[#f9bbe8] to-[#87a1cf] h-screen ">
          <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-10 text-white ">
            <form
              onSubmit={fetchWeather}
              className="flex justify-between items-center w-full m-auto p-3  border-2 border-gray-100 text-white rounded-2xl"
            >
              <div>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-gray-300 "
                  type="text"
                  placeholder="Search City..."
                  required
                />
              </div>
              <button>
                <BsSearch size={25} />
              </button>
            </form>
          </div>
          {/* Weather */}
          {weather.main && <Weather data={weather} />}
        </div>
      </div>
    );
  }
}
