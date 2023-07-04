import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userdetail } from "../states/userDetail";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify";

const Donate = () => {
  const details = useRecoilValue(userdetail);
  console.log(details);
  const [formData, setFormData] = useState({
    firstName: details.name,
    email: details.email,
    contactDetail: "",
    donationTypes: "",
    quantity: "",
    description: "",
    localAddress: "",
    city: details.city,
    pickUpTime: "",
    suggestion: "",
    sourceid: details._id,
  });
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  console.log(formData);
  const handleSubmit = (event) => {
    // Check if all fields in formData are non-empty
    console.log(formData);
    const allFieldsAreNonEmpty = Object.values(formData).every(
      (value) => value.trim().length > 0
    );

    if (allFieldsAreNonEmpty) {
      addDoc(collection(db, "donation"), {
        ...formData,
      })
        .then((res) => {
          toast.success("Submitted successfully");
          setFormData({
            firstName: details.name,
            email: details.email,
            contactDetail: "",
            donationTypes: "",
            quantity: "",
            description: "",
            localAddress: "",
            city: details.city,
            pickUpTime: "",
            suggestion: "",
            sourceid: details._id,
          });
          console.log(res);
        })
        .catch((err) => console.log(err));
      console.log("Form data:", formData);
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  // const [formData, setFormData] = useState({
  //   name: details.name,
  //   email: details.email,
  //   phone: "",
  //   quantity: "",
  //   donationTypes: "",
  //   description: "",
  //   localAddress: "",
  //   city: details.city,
  //   pickUpTime: "",
  //   sourceId: details._id,
  //   suggestion: "",
  // });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const allFieldsAreNonEmpty = Object.values(formData).every(
  //     (value) => value.trim().length > 0
  //   );
  //   console.log(formData);
  //   if (allFieldsAreNonEmpty) {
  //     const docRef = collection(db, "donation");
  //     console.log({ formData });
  //     addDoc(docRef, {
  //       ...formData,
  //     })
  //       .then((res) => {
  //         alert("successfull");
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     alert("");
  //   }
  // };
  return (
    // <div className="mt-[4em] bg-green-500 h-[120vh]  space-y-4">
    //   <div className="">
    //     <h1 className="text-2xl text-black">User Information</h1>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap">First Name</label>
    //         <input
    //           type="text"
    //           readOnly
    //           value={details.name}
    //           onChange={(e) =>
    //             setFormData({ ...formData, firstName: e.target.value })
    //           }
    //           className="px-4  py-2  w-full bg-transparent  text-black placeholder:text-gray-700 outline-none "
    //         />
    //       </div>
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap">Email</label>
    //         <input
    //           type="text"
    //           value={details.email}
    //           onChange={(e) =>
    //             setFormData({ ...formData, email: e.target.value })
    //           }
    //           className=" px-4 py-2   w-full bg-transparent  text-black placeholder:text-gray-700 outline-none"
    //         />
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap ">Contact Detail</label>
    //         <input
    //           type="Number"
    //           onChange={(e) =>
    //             setFormData({ ...formData, contactDetail: e.target.value })
    //           }
    //           className="px-4 py-2  w-full bg-transparent  text-black placeholder:text-gray-700 outline-none "
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="">
    //     <h1 className="text-2xl text-black">Resources</h1>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap">Donation types</label>
    //         <input
    //           type="text"
    //           onChange={(e) =>
    //             setFormData({ ...formData, donationTypes: e.target.value })
    //           }
    //           required
    //           className="px-4 py-2  w-full bg-transparent  text-black placeholder:text-gray-700 outline-none "
    //         />
    //       </div>
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap">Quantity</label>
    //         <input
    //           type="text"
    //           onChange={(e) =>
    //             setFormData({ ...formData, quantity: e.target.value })
    //           }
    //           required
    //           className="px-4 py-2  w-full bg-transparent  text-black placeholder:text-gray-700 outline-none "
    //         />
    //       </div>
    //     </div>
    //     <div className="flex border-b-2 ">
    //       <label>Desciption</label>
    //       <textarea
    //         className=" outline-none  flex-1 bg-transparent p-2 "
    //         onChange={(e) =>
    //           setFormData({ ...formData, description: e.target.value })
    //         }
    //         rows={3}
    //       ></textarea>
    //     </div>
    //   </div>
    //   <div className="">
    //     <h1 className="text-2xl text-black">Address</h1>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap">Local address</label>
    //         <input
    //           type="text"
    //           onChange={(e) =>
    //             setFormData({ ...formData, localAddress: e.target.value })
    //           }
    //           className="px-4 py-2  w-full bg-transparent  text-black placeholder:text-gray-700 outline-none "
    //         />
    //       </div>
    //       <div className="flex  items-center border-b-2">
    //         <label className="whitespace-nowrap">City</label>
    //         <input
    //           type="text"
    //           readOnly
    //           value={details.city}
    //           onChange={(e) =>
    //             setFormData({ ...formData, city: e.target.value })
    //           }
    //           className="px-4 py-2  w-full bg-transparent  text-black placeholder:text-gray-700 outline-none "
    //         />
    //       </div>
    //     </div>
    //     <div className="flex border-b-2 items-center ">
    //       <label className="whitespace-nowrap">Pick up time</label>
    //       <div class="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
    //       <input
    //         type="date"
    //         onChange={(e) =>
    //           setFormData({ ...formData, pickUpTime: e.target.value })
    //         }
    //         class="bg-transparent   block  pl-10 p-2.5 "
    //         placeholder="Select date"
    //       />
    //     </div>
    //   </div>
    //   <div className="">
    //     <h1 className="text-2xl text-black">Comment</h1>
    //     <div className="grid grid-cols-1  gap-x-8">
    //       <div className="flex border-b-2 ">
    //         <label>Suggestion</label>
    //         <textarea
    //           className=" outline-none w-full  flex-1 bg-transparent p-2 "
    //           rows={3}
    //           onChange={(e) =>
    //             setFormData({ ...formData, suggestion: e.target.value })
    //           }
    //         ></textarea>
    //       </div>
    //     </div>
    //   </div>
    //   <button className="btn rounded-none" onClick={handleSubmit}>
    //     submit
    //   </button>
    // </div>
    <div onSubmit={handleSubmit} className="mt-[4em] md:mt-[4.5em] px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.firstName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="contactDetail"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Resource</h2>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="donationType"
              className="block text-gray-700 font-bold mb-2"
            >
              Donation Type
            </label>
            <select
              id="donationType"
              name="donationTypes"
              value={formData.donationTypes}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select one</option>
              <option value="food">Food</option>
              <option value="cloth">Cloth</option>
              <option value="medicine">Medicine</option>
              <option value="aid">Aid</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="resourceDescription"
              className="block text-gray-700 font-bold mb-2"
            >
              Resource Description
            </label>
            <textarea
              id="resourceDescription"
              name="description"
              value={formData.resourceDescription}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Address</h2>
          <div className="mb-4">
            <label
              htmlFor="localAddress"
              className="block text-gray-700 font-bold mb-2"
            >
              Local Address
            </label>
            <textarea
              id="localAddress"
              name="localAddress"
              value={formData.localAddress}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-bold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Pick Up Time</h2>
          <div className="mb-4">
            <label
              htmlFor="pickUpTime"
              className="block text-gray-700 font-bold mb-2"
            >
              Pick Up Time
            </label>
            <input
              type="datetime-local"
              id="pickUpTime"
              name="pickUpTime"
              value={formData.pickUpTime}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Suggestions</h2>
        <div className="mb-4">
          <textarea
            id="suggestions"
            name="suggestion"
            value={formData.suggestions}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Donate;
