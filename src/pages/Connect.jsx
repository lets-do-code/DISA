import React, { useState } from "react";
import ChatBody from "../components/ChatBody";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
const Connect = () => {
  const [message, setmessage] = useState("");
  const messageRef = collection(db, "messages");
  const detail = useRecoilValue(userdetail);
  console.log({ detail });
  const room = detail.city + detail.state;
  console.log({ room });
  const submitHandler = () => {
    if (message === "") return;
    addDoc(messageRef, {
      text: message,
      createat: serverTimestamp(),
      fromid: detail._id,
      fromname: detail.name,
      room: room,
    });
    setmessage("");
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      submitHandler();
    }
  }
  console.log({ detail });
  return (
    <div className="w-full bg-gray-400  h-full flex  flex-col  justify-between">
      <ChatBody />
      <div className="bg-gray-500 flex  fixed w-full bottom-0">
        <input
          type="text"
          placeholder="Type here..."
          className="input w-full max-full rounded-none"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setmessage(e.target.value)}
        />
        <div
          className="flex space-x-4 items-center px-6 bg-green-400 cursor-pointer"
          onClick={submitHandler}
        >
          <div
            className="btn bg-white text-black rounded-full"
            onClick={() => {
              const msg = `Latitude : ${detail.latitude} longitude:${detail.longitude}`;
              setmessage(msg);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
          <svg
            className="btn btn-primary  "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Connect;
