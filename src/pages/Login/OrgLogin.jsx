import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrgLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const submitHandler = async () => {
    console.log(data);
    const result = await axios.post("https://disa2.onrender.com/orglogin", data);
    if (result.data.success) {
      localStorage.setItem("myToken", result.data.token);
      navigate("/");
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className=" w-full sm:w-[30em]  md:w-[40em] lg:w-[50em] flex  space-y-8 flex-col">
        <h1 className="text-5xl font-bold text-center"> Organization Login </h1>

        <div className="card flex-shrink-0 w-full   bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6 ">
              <button className="btn btn-primary" onClick={submitHandler}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgLogin;
