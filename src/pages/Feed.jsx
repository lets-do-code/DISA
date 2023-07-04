import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keywords = [
      "earthquake",
      "floods",
      "hurricane",
      "violence",
      "cyclone",
    ];
    const fetchFeed = async () => {
      try {
        const result = await axios.get(
          "https://newsapi.org/v2/everything?q=natural%20disaster&apiKey=1b0d2195d8134a09aa26439430426e02"
        );
        const articles = result.data.articles.filter((article) => {
          return keywords.some((keyword) =>
            article.title.toLowerCase().includes(keyword.toLowerCase())
          );
        });
        setFeed(articles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="h-full mt-[4.5em] md:mt-[4em] overflow-scroll">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <svg
            className="animate-spin h-8 w-8 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 100-16 8 8 0 000 16zm-8-2.709l-3-2.647A7.962 7.962 0 010 12h4a4.01 4.01 0 003.464 3.97L4 17.291z"
            ></path>
          </svg>
        </div>
      ) : (
        feed.map((item, i) => <FeedCard key={i} item={item} />)
      )}
    </div>
  );
};

export default Feed;
