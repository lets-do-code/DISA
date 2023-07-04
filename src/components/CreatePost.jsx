import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import qrcode from "qrcode";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { firebaseConfig, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  firebase.initializeApp(firebaseConfig);
  const details = useRecoilValue(userdetail);
  const [qr, setqr] = useState("");
  const [upi, setUpi] = useState("");
  const [img, setimg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    description: "",
    qrcode: qr,
  });
  const submitHandler = async () => {
    if (img === "") return;
    const imageRef = firebase.storage().ref(`images/${img + v4()}`);
    await imageRef.put(img);
    const url = await imageRef.getDownloadURL();
    const data = {
      ...formData,
      image: url,
      upiId: upi,
      id: details._id,
    };
    const result = await axios.post("https://disa2.onrender.com/createpost", data);
    console.log(result);
    if (result.data.success) {
      toast("Uploaded");
      navigate("/orgpost");
    }
  };

  const genrateQr = async () => {
    const qrCodeData = `upi://pay?pa=${upi}`;
    try {
      const qrCodeImage = await qrcode.toDataURL(qrCodeData);
      setFormData({ ...formData, qrcode: qrCodeImage });
      setqr(qrCodeImage);
    } catch (err) {
      alert("something went wrong");
    }
  };
  return (
    <div className="mt-[4.5em] md:mt-[4em] bg-teal-800 min-h-[100vh] pb-8  space-y-4  text-white flex flex-col items-center  px-3 md:px-10   ">
      <div className="border-b-2 w-full flex items-center">
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input bg-transparent outline-none focus:outline-none w-full  "
        />
      </div>
      <div className=" w-full flex items-center">
        <label>Image</label>
        <input
          type="file"
          onChange={(e) => setimg(e.target.files[0])}
          className="input file-input  bg-transparent outline-none focus:outline-none w-full  "
        />
      </div>
      <div className=" w-full flex items-center border-b-2">
        <label className="">Bio</label>
        <textarea
          cols=""
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows="2"
          className="textarea w-full bg-transparent focus:outline-none"
        ></textarea>
      </div>
      <div className=" w-full flex items-center border-b-2">
        <label className="">Description</label>
        <textarea
          cols=""
          rows="6"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="textarea w-full bg-transparent focus:outline-none"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 w-full">
        <div className="border-b-2 flex items-center ">
          <label>upiId</label>
          <input
            type="text"
            className="input bg-transparent w-full focus:outline-none"
            onChange={(e) => setUpi(e.target.value)}
          />
        </div>
        <div>
          {!qr ? (
            <button className="btn" onClick={genrateQr}>
              GenrateQr Code
            </button>
          ) : (
            <img src={qr} alt="err" />
          )}
        </div>
      </div>
      <div className="w-full">
        <button className="btn btn-primary" onClick={submitHandler}>
          submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
