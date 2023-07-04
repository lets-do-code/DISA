import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";

const OrgProfile = () => {
  const details = useRecoilValue(userdetail);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fun = async () => {
      try {
        const result = await axios.post(
          "https://disa2.onrender.com/getorgprofile",
          details
        );
        setData(result.data.data);
        console.log(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, [details]);
  return (
    <div className="mt-[4.5em] bg-cyan-900  min-h-[100vh]   text-white md:mt-[4em]">
      <section class=" ">
        <div class="w-full  px-4 mx-auto ">
          <div class="relative flex flex-col min-w-0 break-words   w-full mb-6  rounded-lg mt-16">
            <div class="px-6 ">
              <div class="flex flex-wrap justify-center">
                <img
                  alt="Harsh"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPZdSAocQ5LaWK0E_P3wvGiEvqFhrnL6vmeg&usqp=CAU"
                  class="shadow-xl rounded-full h-[200px] align-middle border-none object-cover  w-[200px]  "
                />
                <div class="w-full px-4 text-center mt-7">
                  <h1 className="text-2xl font-semibold">{details.name}</h1>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3 class="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {details.email}
                </h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {details.city}, {details.state}
                </div>
              </div>
            </div>
            <div className=" py-10">
              <h1 className="text-xl p-2">Your Post</h1>
              {data.post?.map((item, i) => {
                return (
                  <>
                    <div className="bg-cyan-950 p-2">
                      <div className="">
                        <h1 className="text-2xl font-semibold">{item.title}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center h-full">
                          <img src={item.img} alt="err" className="h-[8em]" />
                          <img src={item.QRcode} alt="err" />
                        </div>
                        <p>Desc {item.desc}</p>
                        <span>{item.UPIID}</span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrgProfile;
