import React, { useEffect, useState } from "react";
import Weather from "../components/Weather";
import NewsCard from "../components/NewsCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userdetail } from "../states/userDetail";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import ContactUs from "../components/ContactUs";
import contactImg from "../assests/contactus.png";
import DosAndDonts from "../components/DosAndDonts";
import { locality } from "../states/latAndLon";
import NewWeather from "../components/NewWeather";
import { toast } from "react-toastify";
const Home = () => {
  const details = useRecoilValue(userdetail);
  const setLocality = useSetRecoilState(locality);
  const [sosloading, setSosLoading] = useState(false);
  const sosHandler = async () => {
    setSosLoading(true)
    await axios
      .post("https://disa2.onrender.com/sos", {
        email: details.email,
        city: details.city,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("email sent");
        }
      })
      .catch((err) => console.log(err));
      setSosLoading(false)
  };
  useEffect(() => {
    const testRef = collection(db, "test");
    addDoc(testRef, {
      test: "successfull",
    });
  }, []);
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`;
        await axios
          .get(url)
          .then(async (res) => {
            const locality = res.data.city.replace(/\s/g, "");
            setLocality(locality);
            await axios
              .post("https://disa2.onrender.com/setlatlng", {
                id: details._id,
                claim: details.claim,
                updatedState: res.data.principalSubdivision,
                updatedCity: res.data.city,
                updatedCountry: res.data.countryName,
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      },
      (err) => {
        alert("location is not available");
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [details, setLocality]);
  return (
    <div className="w-full mt-[4.5em] md:mt-[5em] scrollbar-hide absolute">
      <div className="fixed top-4 z-50 right-0 mr-4 p-2 bg-red-700 rounded-full text-white cursor-pointer" onClick={sosHandler}>
      {sosloading ? "..." : "SOS"}
      </div>
      {details.claim === "user" ? <Weather /> : ""}

      <div className="divider text-2xl font-semibold py-4 w-[80%] mx-auto after:bg-gray-800 before:bg-gray-800">
        Top Headlines
      </div>
      <NewsCard />
      <DosAndDonts />
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 ">
        <ContactUs />
        <div className="  hidden md:grid place-items-center">
          <img src={contactImg} className="h-[400px]" alt="err" />
        </div>
      </div>
      <footer className="bg-gray-950 text-center p-3 text-white">
        <h1 className="text-2xl">Design and Maintained by BIT-WISER</h1>
      </footer>
    </div>
  );
};

export default Home;
