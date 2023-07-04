import React, { useState, useEffect } from "react";

const NewsCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=natural%20disaster&apiKey=1b0d2195d8134a09aa26439430426e02"
      );
      const data = await response.json();
      console.log(data);
      const filteredArticles = data.articles.filter((article) => {
        const keywords = [
          "earthquake",
          "floods",
          "hurricane",
          "violence",
          "cyclone",
          "storm",
          "coldwave",
          "heatwave",
          "lightning",
          "Tsunamis",
        ];
        const title = article.title.toLowerCase();
        for (const keyword of keywords) {
          if (title.includes(keyword)) {
            return true;
          }
        }
        return false;
      });
      setArticles(filteredArticles.slice(0, 3));
      console.log(filteredArticles);
    };
    fetchNews();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80%] mx-auto">
      {articles.map((article) => (
        <div className="bg-white rounded-lg shadow-md" key={article.url}>
          <a href={article.url} target="_blank" rel="noreferrer">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full  object-cover"
              style={{ height: "200px" }}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm mb-2">{article.description}</p>
              <span className="text-xs">{article.publishedAt}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
