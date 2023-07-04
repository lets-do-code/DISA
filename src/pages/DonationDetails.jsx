import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const DonationDetails = () => {
  const details = useRecoilValue(userdetail);
  const [donationList, setDonationList] = useState([]);
  useEffect(() => {
    const donationRef = collection(db, "donation");
    const q = query(donationRef, where("sourceid", "==", details._id));
    let list = [];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        list.push({ ...doc.data(), uniqueId: doc.id });
      });
      setDonationList(list);
    });
    return () => unsubscribe();
  }, [details]);
  console.log(donationList);
  return (
    <div className="mt-[4.5em] md:mt-[4em] space-y-6 py-4  h-full">
      {donationList.map((item, i) => {
        return (
          <div className="bg-gray-900 text-white p-6 sm:p-12">
            <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-4">
              <div className="flex flex-col justify-between">
                <div className="text-xs">
                  City:
                  <span className="px-3 text-base font-bold">{item.city}</span>
                </div>
                <div className="text-xs">
                  Pick up date:
                  <span className="px-3 text-base font-bold">
                    {item.pickUpTime}
                  </span>
                </div>
                <div className="text-xs">
                  Local address:
                  <span className="px-3 text-base font-bold">
                    {item.localAddress}
                  </span>
                </div>
                <div className="text-xs">
                  Description:
                  <span className="px-3 text-base font-bold">
                    {item.description}
                  </span>
                </div>
                <div className="text-xs">
                  Donation type:
                  <span className="px-3 text-base font-bold">
                    {item.donationTypes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DonationDetails;
