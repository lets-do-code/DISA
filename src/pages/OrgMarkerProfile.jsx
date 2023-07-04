import { useState, useEffect } from "react";
import axios from "axios";

const OrgMarkerProfile = () => {
  const [organization, setOrganization] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        setOrganization(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?userId=1"
        );
        setPosts(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrganization();
    fetchPosts();
  }, []);

  const org = JSON.parse(localStorage.getItem("markerOrg"));
  console.log(org);
  return (
    <div className="max-w-4xl mx-auto mt-[4em] md:mt-[4.5em]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="px-6 py-4">
          {console.log({ org })}
          <h2 className="text-xl font-bold mb-2">{org.name}</h2>
          <p className="text-gray-700 text-base mb-2">Email: {org.email}</p>
          <p className="text-gray-700 text-base mb-2">
            Location: {org.city}, {org?.state}, {org?.country}
          </p>
        </div>
      </div>
      {org.post.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
        >
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 text-base mb-2">{post.desc}</p>
            <div className="flex justify-between mt-4 ">
              <img
                className="w-1/2 mr-2 rounded-lg object-cover"
                src={post.img}
                alt="err"
              />
              {console.log({ post })}
              <img
                className="w-1/2 ml-2 rounded-lg "
                src={post.QRcode}
                alt="err"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrgMarkerProfile;
