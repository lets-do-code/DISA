import React from "react";

const FeedCard = (item) => {
  console.log(item);
  const { title, description, author, publishedAt, urlToImage, url } =
    item.item;
  console.log(item.item);
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <img
          src={
            urlToImage
              ? urlToImage
              : "https://ichef.bbci.co.uk/images/ic/400x225/p09xtmrn.jpg"
          }
          alt=""
          className="h-full w-full object-cover "
        />
      </div>
      <div className="lg:col-span-2 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal">
        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="text-sm mr-2">
            <p className="text-gray-900 leading-none">
              <bold className="font-bold">Author:</bold> {author}
            </p>
            <p className="text-gray-600">
              <bold className="font-bold">Published At:</bold> {publishedAt}
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={url}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
