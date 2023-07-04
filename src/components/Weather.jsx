import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { locality } from "../states/latAndLon";
const Weather = () => {
  const detail = useRecoilValue(userdetail);
  const [popup, setPopUp] = useState(false);
  const [popupMessage, setPopUpMessage] = useState("");
  const [wtr, setwtr] = useState([]);
  const [hour, setHour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const lty = useRecoilValue(locality);
  useEffect(() => {
    console.log({ lty });
    setLoading(true);
    const fun = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = "8611baa95180437492f54121230505";

            await axios
              .get(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`
              )
              .then((response) => {
                setResult(response.data);
                console.log({ response });
              })
              .catch((error) => {
                console.log(error);
              });
          },
          (error) => {
            console.log(error);
          }
        );

        // Update state variables
        setwtr(result);
        setHour(result.forecast.forecastday[0].hour);
        setLoading(false);
        setHour(result.data.forecast?.forecastday[0].hour);
        console.log({ hour });

        setwtr(result.data);
        setHour(result.data.forecast?.forecastday[0].hour);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    };
    fun();
  }, [detail.city, hour, lty, result]);
  return (
    <>
      {console.log({ wtr })}

      {loading ? (
        <div className="h-[100vh] grid place-items-center  ">
          <div>Loading...</div>
        </div>
      ) : (
        <div
          onClick={() => {
            setPopUp(false);
          }}
          className="max-w-[70em]  relative mx-auto  min-h-[100vh] p-4 flex flex-col"
        >
          {/* {popup ? (
            <div className=" fixed top-0 right-0 grid place-items-center opacity-70 h-[100vh] w-[100vw] bg-gray-800 ">
              <div className="  opacity-100 text-center ">
                <div className="">
                  <h1 className=" text-6xl  text-white">Alert</h1>
                  <p className="text-white">{popupMessage}</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
          {console.log({ wtr })}
          <div className="text-center pt-16 backgroundurl text-white">
            <p className="text-xl sm:text-2xl font-bold pb-2">
              {wtr?.location?.localtime}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold pb-2">
              {wtr?.location?.name}, {wtr?.location?.country}
            </h1>
            <div className="flex justify-center sm:justify-between items-center px-2 sm:px-10 py-4">
              <img
                src={wtr?.current?.condition?.icon}
                alt={wtr?.current?.condition?.text}
                className="w-12 sm:w-auto"
              />
              <span className="text-3xl sm:text-4xl font-bold pb-2">
                {wtr?.current?.temp_c} deg C
              </span>
              <div className="flex flex-col font-semibold text-sm sm:text-base">
                <span>Humidity {wtr?.current?.humidity}</span>
                <span>Wind MPH {wtr?.current?.wind_mph}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap font-semibold justify-center text-center text-sm">
            <div className="p-2">
              <span>
                Max Temp {wtr?.forecast?.forecastday[0]?.day.maxtemp_c}
              </span>
            </div>
            <div className="p-2">
              <span>
                Min Temp {wtr?.forecast?.forecastday[0]?.day.mintemp_c}
              </span>
            </div>
            <div className="p-2">
              <span>
                Sunrise {wtr?.forecast?.forecastday[0]?.astro.sunrise}
              </span>
            </div>
            <div className="p-2">
              <span>Sunset {wtr?.forecast?.forecastday[0]?.astro.sunset}</span>
            </div>
          </div>

          <h1 className="md:text-2xl font-bold  ">Hourly Forecast</h1>
          <div className="divider before:bg-gray-800 after:bg-slate-800 "></div>
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide  -mx-4">
            {hour.map((item, i) => (
              <div key={i} className="flex-none px-4">
                <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg p-6 text-center">
                  <h1 className="text-sm font-semibold">{item.time}</h1>
                  <div className="my-4">
                    <img
                      src={item.condition.icon}
                      alt="img"
                      className="mx-auto w-12 h-12"
                    />
                  </div>
                  <h1 className="text-lg font-semibold">{item?.temp_c}°C</h1>
                  <span>{item?.condition.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
