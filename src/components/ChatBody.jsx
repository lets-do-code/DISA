import React, { useEffect, useState } from "react";
import { userdetail } from "../states/userDetail";
import { useRecoilValue } from "recoil";
import { db } from "../firebase";
import ScrollToBottom from "react-scroll-to-bottom";
import "./ContactUs.css";
import {
  addDoc,
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const ChatBody = () => {
  const detail = useRecoilValue(userdetail);
  const [messages, setMessages] = useState([]);
  const [friendlist, setFriendlist] = useState([]);
  useEffect(() => {
    const room = detail.city + detail.state;
    const messageRef = collection(db, "messages");
    const querymessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createat", "asc")
    );
    const unsubscribe = onSnapshot(querymessages, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), uniqueId: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [detail]);

  useEffect(() => {
    const q1 = where("fromid", "==", detail._id);
    const q2 = where("toid", "==", detail._id);
    const combinedQuery = query(collection(db, "friendlist"), or(q1, q2));
    const unsubscribe = onSnapshot(combinedQuery, (snapshot) => {
      const dataList = snapshot.docs.map((doc) => doc.data());
      setFriendlist(dataList);
    });

    return () => unsubscribe();
  }, [detail._id]);
  console.log({ friendlist });

  const friendlistRef = collection(db, "friendlist");
  const addfriend = async (to, fromname) => {
    let connectionid;
    if (to > detail._id) {
      connectionid = to + detail._id;
    } else {
      connectionid = detail._id + to;
    }

    const unsubscribe = onSnapshot(
      query(friendlistRef, where("connectionid", "==", connectionid)),
      (snapshot) => {
        console.log(snapshot);
        if (snapshot.empty) {
          addDoc(friendlistRef, {
            fromid: detail._id,
            fromname: detail.name,
            toid: to,
            toname: fromname,
            connectionid: connectionid,
          });
          toast.success(" friend added successfully");
        } else {
          toast.error("Already Friend");
        }
        unsubscribe();
      }
    );
  };

  console.log(messages);
  return (
    <div className="overflow-hidden  scrollbar-hide mt-[4.5em] w-full md:mt-[4em] mb-12">
      <ScrollToBottom className="h-full  ">
        {messages.map((item, i) => (
          <div
            key={i}
            className={`flex ${
              item.fromid === detail._id ? "flex-row-reverse" : "flex-row"
            }  `}
          >
            <div
              className={`${
                item.fromid === detail._id
                  ? "chat chat-end "
                  : "chat chat-start"
              }  w-full sm:w-3/4 md:w-1/2 lg:w-1/3`}
            >
              <div className="chat-header">{item.fromname}</div>
              <div
                className={`chat-bubble relative ${
                  item.fromid === detail._id
                    ? "chat-bubble-primary "
                    : "chat-bubble-secondary"
                }`}
              >
                <div
                  className={`absolute -top-2 rounded-full -right-2 ${
                    item.fromid === detail._id ? "hidden" : ""
                  }  cursor-pointer bg-gray-800`}
                  onClick={() => addfriend(item.fromid, item.fromname)}
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
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </div>
                {item.text}
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default ChatBody;
