import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";

const OutletLayout = () => {
  const navigate = useNavigate();
  const setUserDetail = useSetRecoilState(userdetail);
  const detail = useRecoilValue(userdetail);
  const [auth, setauth] = useState(false);
  useEffect(() => {
    const fun = async () => {
      try {
        const token = localStorage.getItem("myToken");
        const result = await axios.post("https://disa2.onrender.com/valid", {
          token,
        });
        setUserDetail(result.data.user);
        if (result.data.success) {
          setauth(true);
        } else {
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fun();
  }, [setUserDetail, navigate]);
  console.log(detail);

  if (auth === true) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
};

export default OutletLayout;
