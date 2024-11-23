import React, { useEffect } from 'react'
import usePageStore from "../stores/pageStore";
import { Image } from "lucide-react";

const PageNews = () => {
    const getNews = usePageStore((state) => state.getNews);
    const news = usePageStore((state) => state.news);

    useEffect(() => {
        getNews();
    }, [getNews]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-500 my-10">News & Activities</h1>
      <div className="grid grid-cols-3 gap-10 my-10">
        {news.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 w-full shadow-xl flex flex-col items-center w-auto min-w-48"
          >
            <figure>
              {Array.isArray(item.images) &&
              item.images.length > 0 &&
              item.images[0]?.secure_url ? (
                <img
                  src={item.images[0].secure_url}
                  alt={item.details}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <Image style={{ width: "64px", height: "64px" }} />
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.details}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PageNews