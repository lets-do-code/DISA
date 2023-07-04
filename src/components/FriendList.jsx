import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { Link } from "react-router-dom";

const FriendList = () => {
  const details = useRecoilValue(userdetail);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const q1 = where("fromid", "==", details._id);
    const q2 = where("toid", "==", details._id);
    const combinedQuery = query(collection(db, "friendlist"), or(q1, q2));
    const unsubscribe = onSnapshot(combinedQuery, (snapshot) => {
      const dataList = snapshot.docs.map((doc) => doc.data());
      setFriendList(dataList);
    });

    return () => unsubscribe();
  }, [details._id]);

  return (
    <div className="h-full   p-2 flex flex-col w-full  ">
      {friendList.map((friend) => (
        <Link
          to={`/friend/${friend.connectionid}`}
          key={friend.connectionid}
          className=" block px-2 mb-4"
        >
          <div className=" bg-gray-300 py-3 px-6  ">
            {friend.fromname === details.name ? friend.toname : friend.fromname}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FriendList;
