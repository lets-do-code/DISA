import React from "react";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";

const UserProfile = () => {
  const details = useRecoilValue(userdetail);
  console.log(details);
  return (
    // <div className="mt-[4.5em] md:mt-[4em] h-full bg-purple-800 overflow-hidden">
    //   <div className="max-w-2xl mx-auto bg-purple-700 h-full flex items-center flex-col">
    //     <h1> {details.name}</h1>
    //     <span>{details.email}</span>
    //     <p>
    //       {details.city},{details.state}
    //     </p>
    //     <p>{details.state}</p>
    //   </div>
    // </div>
    <div className="h-full grid place-items-center textureBackground ">
      <div className="flex flex-col justify-center bg-gray-100 max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
        <img
          src="https://source.unsplash.com/150x150/?portrait?3"
          alt=""
          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {details.name}
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-gray-400">
              {details.email}
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
            >
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Email"
              className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
            >
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current"
              >
                <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
