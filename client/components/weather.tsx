import Image from "next/image";
import React from "react";

// Funtion to convert Fahrenheit to Celsius

const fahrenhitToCelsius = (fahrenhit) => {
  return ((fahrenhit - 32) * 5) / 9;
};
const mphToKph = (mph) => {
  return mph * 1.60934;
};

const Weather = ({ data }) => {
  console.log(data);

  //  Convert temperature from fahrenhit to celsius
  const temperatureCelsius = fahrenhitToCelsius(data.main.temp).toFixed(0);

  //  Convert "Feels Like" temperature from fahrenhit to celsius
  const feelsLikeCelsius = fahrenhitToCelsius(data.main.feels_like).toFixed(0);

  // Convert wind speed from MPH to km/h
  const windSpeedkph = mphToKph(data.wind.speed).toFixed(0);

  return (
    <div className="relative flex flex-col justify-between max-w-[500px] w-full h[90vh] m-auto  text-white">
      {/* TOP */}
      <div className="relative flex justify-between ">
        <div className="flex flex-col items-center">
          <Image
            className=" "
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="/"
            width={110}
            height={110}
          />
          <p className="text-3xl">{data.weather[0].main}</p>
        </div>
        <p className="text-8xl pt-8">{temperatureCelsius}&#176;C</p>
      </div>
      {/* BOTTOM */}
      <div className="bg-black/50 relative p-8 mt-20 rounded-lg mx-4">
        <p className="text-2xl text-center pb-6">Weather in {data.name}</p>
        <div className="flex justify-between text-center">
          <div>
            <p className="text-2xl font-bold">{feelsLikeCelsius}&#176;C</p>
            <p className="text-xl">Feels Like</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{data.main.humidity}%</p>
            <p className="text-xl">Humidity</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{windSpeedkph} km/h</p>
            <p className="text-xl">Winds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
