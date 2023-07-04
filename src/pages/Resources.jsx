import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { toast } from "react-toastify";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const details = useRecoilValue(userdetail);
  useEffect(() => {
    const donationRef = collection(db, "donation");
    onSnapshot(donationRef, (snapshot) => {
      const list = [];
      snapshot.forEach((donation) => {
        const d = donation.data();
        if (!d.claimed) {
          list.push({ ...d, fid: donation.id });
        }
      });
      setResources(list);
      console.log(list);
    });
  }, []);

  const claimhandler = async (fid) => {
    const donationRef = doc(db, "donation", fid);
    updateDoc(donationRef, { claimed: true, claimedby: details._id })
      .then(() => {
        toast("Claimed");
      })
      .catch((error) => {
        toast("Something  went wrong");
      });
  };

  return (
    <div className="min-h-[100vh] bg-indigo-900 mt-[4.5em] md:mt-[4em]  text-white">
      <h1 className="text-2xl font-semibold">Resources</h1>
      <div className="w-full  space-y-8">
        {resources.map((item, i) => {
          return (
            <div key={i} className="w-full bg-indigo-950 p-4 ">
              <h1>
                <span className="text-xl font-semibold">Donation Type - </span>
                {item.donationTypes}
              </h1>
              <h1>
                <span className="text-xl font-semibold">Quantity </span>
                {item.quantity}
              </h1>
              <h1>
                <span className="text-xl font-semibold">Local Address - </span>
                {item.localAddress} / {item.city}
              </h1>
              <h1>
                <span className="text-xl font-semibold">Pick Up Time - </span>
                {item.pickUpTime}
              </h1>
              <h1>
                <span className="text-xl font-semibold">Donator Name - </span>
                {item.firstName}
              </h1>
              <div className="space-x-5">
                <span>
                  <span className="text-xl font-semibold">Email - </span>
                  {item.email}
                </span>
                <span>
                  <span className="text-xl font-semibold">Phone No - </span>
                  {item.contactDetail}
                </span>
              </div>
              <p>
                <span className="text-xl font-semibold">Desciptions - </span>

                {item.description}
              </p>
              <p>
                <span className="text-xl font-semibold">Suggestion </span>
                {item.suggestion}
              </p>
              <div className="flex flex-row-reverse">
                <label htmlFor="my-modal-3" className="btn">
                  Claim
                </label>

                <input
                  type="checkbox"
                  id="my-modal-3"
                  className="modal-toggle"
                />
                <div className="modal ">
                  <div className="modal-box relative bg-gray-900">
                    <label
                      htmlFor="my-modal-3"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <h3 className="text-lg font-bold">{item.firstName}</h3>
                    <p className="py-4">{item.donationTypes}</p>
                    <div className="flex flex-row-reverse">
                      <button
                        className="btn"
                        onClick={() => claimhandler(item.fid)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
