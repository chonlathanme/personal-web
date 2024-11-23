import React, { useEffect } from "react";
import usePageStore from "../stores/pageStore";
import { Image } from "lucide-react";

const PagePromotion = () => {
  const getPromotion = usePageStore((state) => state.getPromotion);
  const promotions = usePageStore((state) => state.promotions);

  useEffect(() => {
    getPromotion();
  }, [getPromotion]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-500 my-10">Promotions</h1>
      <div className="grid grid-cols-3 gap-10 my-10">
        {promotions.slice(0, 3).map((promotion) => (
          <div
            key={promotion.id}
            className="card bg-base-100 w-full shadow-xl flex flex-col items-center w-auto min-w-48"
          >
            <figure>
              {Array.isArray(promotion.images) &&
              promotion.images.length > 0 &&
              promotion.images[0]?.secure_url ? (
                <img
                  src={promotion.images[0].secure_url}
                  alt={promotion.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <Image style={{ width: "64px", height: "64px" }} />
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{promotion.details}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagePromotion;
