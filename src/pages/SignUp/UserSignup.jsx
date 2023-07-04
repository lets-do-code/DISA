import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [location, setLocation] = useState({});
  const [data, setData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  console.log(data);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      }
  }, []);
  const getLocation = async () => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`;
    try {
      const result = await axios.get(url);
      setLocation({
        ...location,
        city: result.data.city,
        countryCode: result.data.countryCode,
        country: result.data.countryName,
        state: result.data.principalSubdivision,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const tc = {
    termsAndConditions: [
      "Prohibition on Fake Messages: You are strictly prohibited from sharing any fake message about a disaster on our platform. This includes, but is not limited to, messages about natural disasters, accidents, terrorist attacks, or any other type of emergency situation.",
      "Legal Consequences: Any individual found guilty of sharing fake messages about a disaster will be subject to strict legal action. This includes, but is not limited to, a minimum of 10 years in jail or a fine of Rs. 1 crore or both.",
      "Compliance with Applicable Laws: You must comply with all applicable laws and regulations in connection with your use of our platform. You may not use our platform for any illegal purposes.",
      "Reporting Fake Messages: If you come across any fake message about a disaster on our platform, please report it immediately to the authorities. We encourage all our users to be responsible and act in the interest of public safety.",
      "Indemnification: You agree to indemnify and hold harmless our company, its affiliates, officers, directors, employees, and agents from any and all claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from your violation of these terms and conditions.",
      "Termination: We reserve the right to terminate your access to our platform if we find that you have violated these terms and conditions.",
    ],
  };
  const submitHandler = async () => {
    const d = {
      ...location,
      ...data,
    };
    console.log(d);
    try {
      const result = await axios.post("https://disa2.onrender.com/usersignup", d);
      localStorage.setItem("myToken", result.data.token);
      if (result.data.success) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid place-items-center h-full">
      <h1 className=" text-2xl md:text-5xl">User Signup</h1>
      <div className="w-full mx-auto max-w-lg">
        <div className="flex flex-col border-b-2">
          <label> User Name</label>
          <input
            type="text"
            placeholder="Username "
            className="input w-full "
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col border-b-2">
          <label> email</label>
          <input
            type="text"
            placeholder="email"
            className="input w-full "
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col border-b-2">
          <label> Password</label>
          <input
            type="text"
            placeholder="password"
            className="input w-full "
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col border-b-2">
          <label> Phone No</label>
          <input
            type="number"
            placeholder="Phone Number"
            className="input w-full "
            onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
          />
        </div>
        <div className="flex flex-col border-b-2">
          <label> Country</label>
          <input
            value={location?.country || ""}
            type="text"
            placeholder="country"
            className="input w-full "
            readOnly
          />
        </div>
        <div className="flex flex-col border-b-2">
          <label> State</label>
          <input
            value={location?.state || ""}
            type="text"
            placeholder="State"
            className="input w-full "
            readOnly
          />
        </div>
        <div className="flex flex-col border-b-2">
          <label> City</label>
          <input
            value={location?.city || ""}
            type="text"
            placeholder="city"
            className="input w-full "
            readOnly
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="my-modal"
            className="underline cursor-pointer p-2 text-black"
          >
            <input
              onClick={() => setIsChecked(!isChecked)}
              type="checkbox"
              name=""
              id=""
              className="p-2"
              required
            />
            I agree to this terms and conditions
          </label>
        </div>

        <input
          type="checkbox"
          required={true}
          id="my-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <p className="py-4">
              <h1 className="font-semibold text-2xl">Terms and Conditions</h1>
              <>
                {tc.termsAndConditions.map((item, i) => {
                  return <li>{item}</li>;
                })}
              </>
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Ok
              </label>
            </div>
          </div>
        </div>
        <button className="btn" onClick={getLocation}>
          get Location
        </button>
        <button
          className="btn btn-primary"
          disabled={location.city ? false : true}
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserSignup;
