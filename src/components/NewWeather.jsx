import axios from "axios";
import React, { useEffect, useState } from "react";

const NewWeather = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fun = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = "7b435c423ba098619008a00c5319dcf0";
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        setList(result.data.list);
        console.log(result);
      });
    };
    fun();
  }, []);
  return (
    <>
      <div className="flex  overflow-y-scroll">
        <div></div>
        <div className="flex flex-nowrap">
          {list.map((item, i) => {
            return <div>{i}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default NewWeather;
