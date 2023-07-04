import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";

const MobTabList = ({ toggle, setToggle }) => {
  const details = useRecoilValue(userdetail);
  return (
    <div className="absolute top-0 h-[100vh] bg-gray-900 w-full p-4 space-y-8">
      <div className="flex justify-between">
        <div className="text-white px-2 text-3xl">Icon</div>
        <button onClick={() => setToggle(!toggle)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul className="text-white">
        <Link to="/feed">
          <li className="p-2">Feed</li>
        </Link>
        <hr />
        <Link to="/connect">
          <li className="p-2">Connect</li>
        </Link>
        <hr />
        <Link to="/nearby">
          <li className="p-2">Near By</li>
        </Link>
        <hr />
        <Link to="/friends">
          <li className="p-2">Friends</li>
        </Link>
        <hr />

        {details.claim === "user" ? (
          <>
            <Link to="/donate">
              <li className="p-2">Donate</li>
            </Link>
            <Link to="/help">
              <li className="p-2">Help</li>
            </Link>
            <Link to="/userprofile">
              <li className="p-2">Profile</li>
            </Link>
            <Link to="/donationdetail">
              <li className="p-2">Donation detail</li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/orgpost">
              <li className="p-2">Post</li>
            </Link>
            <Link to="/resources">
              <li className="p-2">Resources</li>
            </Link>
            <Link to="/orgprofile">
              <li className="p-2">Profile</li>
            </Link>
          </>
        )}

        <hr />
      </ul>
    </div>
  );
};

export default MobTabList;
