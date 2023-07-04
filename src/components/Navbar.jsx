import React, { useState } from "react";
import MobTabList from "./MobTabList";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import logo from "../assests/weather.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleSignOut =()=>{
    localStorage.removeItem('myToken');
    window.location.href = '/';
  }
  const details = useRecoilValue(userdetail);
  return (
    <nav className="bg-gray-900 z-30 fixed top-0 border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full">
      <div className="max-w-screen-xl flex relative flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap text-white"
            title="Disaster Information System for Assistance"
          >
            DISA
          </span>
        </Link>
        <button
          onClick={() => setToggle(!toggle)}
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex  items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6  "
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 text-white  md:p-0 mt-4 border  border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link to="/feed ">
              <li className="bg-gray-900">Feed</li>
            </Link>
            <Link to="/connect">
              <li className="bg-gray-900">Connect</li>
            </Link>
            <Link to="/nearby">
              <li className="bg-gray-900">Near By</li>
            </Link>
            <Link to="/friend">
              <li className="bg-gray-900">Friends</li>
            </Link>
            {details.claim === "user" ? (
              <>
                <Link to="/donate">
                  <li className="bg-gray-900">Donate</li>
                </Link>
                <Link to="/help">
                  <li className="bg-gray-900">Help</li>
                </Link>
                <li className="bg-gray-900"><a href="https://sachet.ndma.gov.in/">Alerts</a></li>
                <li>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu  bg-gray-900  shadow   w-52"
                    >
                      <li>
                        <Link to="/userprofile">Profile</Link>
                      </li>
                      
                      <li>
                        <Link to="/donationdetail">Donation detail</Link>
                      </li>
                      <li>
                        <Link onClick={handleSignOut}>Sign out</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <Link to="/orgpost">
                  <li className="bg-gray-900">Post</li>
                </Link>
                <Link to="/resources">
                  <li className="bg-gray-900">Resources</li>
                </Link>
                <li>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu  bg-gray-900  shadow   w-52"
                    >
                      <li>
                        <Link to="/orgprofile">Profile</Link>
                      </li>
                      {/* <li>
                        <Link to="/donati">Donation detail</Link>
                      </li> */}
                      <li>
                        <Link onClick={handleSignOut}>Sign out</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className={`md:hidden ${toggle ? "" : "hidden"}`}>
        <MobTabList setToggle={setToggle} toggle={toggle} />
      </div>
    </nav>
  );
};

export default Navbar;
