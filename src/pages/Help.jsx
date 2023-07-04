import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { toast } from "react-toastify";
const Help = () => {
  const details = useRecoilValue(userdetail);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: details.email,
    city: details.city,
    subject: "",
    message: "",
  });
  const submitHandler = async () => {
    setLoading(true);
    await axios
      .post("https://disa2.onrender.com/help", {
        city: details.city,
        email: details.email,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Email sent successfully");
          setLoading(false);
        } else {
          toast.error("Something went wrong");
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-[100vh]  w-full mt-[4em] bg-slate-100 grid place-items-center md:mt[4.5em] text-white">
      <div class="mx-auto w-[80%] md:w-[70%]  my-auto  text-white">
        <h1 className="text-black text-3xl font-semibold p-4">Help</h1>
        <div class="  p-6 rounded-lg shadow-lg bg-white">
          <div class="mb-4">
            <label
              for="subject"
              class="block  text-black text-2xl font-semibold mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={input.subject}
              name="subject"
              onChange={(e) => setInput({ ...input, subject: e.target.value })}
              class="w-full px-4 py-2  text-black border-b-2 border-gray-400 focus:outline-none "
              placeholder="Enter subject"
            />
          </div>
          <div class="mb-4">
            <label
              for="message"
              class="block  font-semibold mb-2 text-black text-2xl"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={input.message}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              class="w-full px-4 py-2  scrollbar-hide  text-black border-b-2 border-gray-400 focus:outline-none "
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div class="text-center flex flex-row-reverse">
            <button
              onClick={submitHandler}
              disabled={loading}
              class={`px-4 py-2 ${
                loading ? "bg-gray-500" : "bg-blue-600"
              } bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            >
              {loading ? "Loading" : <h1>Send</h1>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
