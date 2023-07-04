import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import axios from "axios";

const OrgPost = () => {
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
    <div className="mt-[4.5em] md:mt-[4em] bg-purple-800 min-h-[100vh] relative">
      <Link to="/createpost" className="btn right-0 btn-primary  fixed">
        Create new
      </Link>
      <div className="  text-white">
        <h1 className="text-xl p-2">Your Post</h1>
        <div className="space-y-4">
          {data.post?.map((item, i) => {
            return (
              <div className="bg-purple-900 p-2">
                <div className="">
                  <h1 className="text-2xl font-semibold">{item.title}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 place-items-center h-full">
                    <img src={item.img} alt="err" className="h-[8em]" />
                    <img src={item.QRcode} alt="err" />
                  </div>
                  <p>
                    <span className="font-semibold">DESC </span>
                    {item.desc}
                  </p>
                  <span>
                    <span className="font-semibold">UPI Id</span> {item.UPIID}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrgPost;
