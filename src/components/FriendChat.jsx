import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { toast } from "react-toastify";

const FriendChat = () => {
  const param = useParams();
  const detail = useRecoilValue(userdetail);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const connid = param.connid;
  useEffect(() => {
    const friendchatRef = collection(db, "friendchat");
    const querymessages = query(
      friendchatRef,
      where("room", "==", connid),
      orderBy("createat", "asc")
    );
    const unsubscribe = onSnapshot(querymessages, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        messages.push({ ...doc.data(), uniqueId: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [connid]);

  const addMessage = async () => {
    const friendchatRef = collection(db, "friendchat");
    if (newMessage === "") return;
    addDoc(friendchatRef, {
      text: newMessage,
      from: detail._id,
      createat: serverTimestamp(),
      room: connid,
    });
    setNewMessage("");
  };
  console.log(messages);
  const myRef = useRef(true);
  useEffect(() => {
    console.log(messages);
    if (myRef) {
      myRef.current = false;
      return;
    }
    const newm = messages[messages.length - 1];
    if (newm?.from !== detail._id) {
      toast.info("new message");
    }
  }, [messages, detail._id]);
  return (
    <>
      <div className="col-span-3  textureBackground h-full mt-[4em] scrollbar-hide overflow-y-scroll pb-12 pt-2">
        {messages.map((item, i) => (
          <div
            key={i}
            className={`${
              detail._id === item.from ? " chat chat-end " : "chat chat-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                detail._id === item.from
                  ? " bg-white text-black text-xl "
                  : "bg-black text-white text-xl"
              }`}
            >
              {item.text}
            </div>
          </div>
        ))}
        <div className=" w-full flex  fixed bottom-0">
          <input
            type="text"
            placeholder="Type here"
            className="input w-full rounded-none "
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div
            className="flex items-center px-6 bg-green-400 cursor-pointer"
            onClick={addMessage}
          >
            <svg
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
    </>
  );
};

export default FriendChat;
