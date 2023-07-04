import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [toemail, setToEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactloading, setContactLoading] = useState(false);
  const details = useRecoilValue(userdetail);
  const submitHandler = async () => {
    setContactLoading(true)
    await axios.post("https://disa2.onrender.com/contactus", {
      senderId: details.email,
      receiverId: toemail,
      message: message,
    });
    setName("");
    setToEmail("");
    setMessage("");
    setContactLoading(false)
  };
  return (
    <div className="mx-auto w-[50vw] pl-10  ">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2 ">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={toemail}
          onChange={(e) => setToEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
        ></textarea>
      </div>
      <button
        type="submit"
        onClick={submitHandler}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
      >
      {contactloading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default ContactUs;