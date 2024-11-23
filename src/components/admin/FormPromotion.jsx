import React, { useState, useEffect } from "react";
import { createPromotion, deletePromotion } from "../../api/PageApi";
import useUserStore from "../../stores/userStore";
import { toast } from "react-toastify";
import usePageStore from "../../stores/pageStore";
import UploadFile from "../admin/UploadFile";
import TextareaAutosize from "react-textarea-autosize";
import { Image } from "lucide-react";

const FormPromotion = () => {
  const token = useUserStore((state) => state.token);
  const [input, setInput] = useState({
    details: "",
    images: [],
  });
  const promotions = usePageStore((state) => state.promotions) || []; // Ensure it's an array
  const getPromotion = usePageStore((state) => state.getPromotion);

  useEffect(() => {
    getPromotion();
  }, [getPromotion]);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!input.details.trim()) {
      toast.error("Please enter details");
      return;
    }
    try {
      const result = await createPromotion(token, input);
      console.log(result);
      toast.success(`Promotion created`);
      getPromotion();
      setInput({ details: "", images: [] }); // Clear input after submission
      console.log(input);
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  const hdlDelete = async (id) => {
    try {
      await deletePromotion(token, id);
      toast.success(`Promotion deleted`);
      getPromotion();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  console.log(promotions);

  return (
    <div>
      <h1 className="text-2xl font-bold">Promotions Management</h1>
      <form
        className="my-4 flex flex-row gap-2 justify-between"
        onSubmit={hdlSubmit}
      >
        <TextareaAutosize
          name="details"
          type="text"
          className="input input-bordered bg-transparent w-full resize-none p-3"
          onChange={(e) =>
            setInput((prv) => ({ ...prv, details: e.target.value }))
          }
          placeholder="Enter details"
          value={input.details} // Control the value of the textarea
        />
        <UploadFile input={input} setInput={setInput} />
        <button className="btn bg-orange-500 text-white hover:scale-105 hover:bg-orange-600">
          Add promotion
        </button>
      </form>
      <hr />
      <ul>
        {promotions.map((promotion) => (
          <li
            key={promotion.id} // Ensure the key is unique
            className="my-2 bg-white p-2 px-4 rounded-lg flex flex-row justify-between items-center shadow"
          >
            {Array.isArray(promotion.images) &&
            promotion.images.length > 0 &&
            promotion.images[0]?.secure_url ? (
              <img
                src={promotion.images[0].secure_url}
                alt={promotion.title}
                className="w-16 h-16 object-cover"
              />
            ) : (
              <Image style={{ width: "64px", height: "64px" }} />
            )}
            <span>{promotion.details}</span>
            <div className="flex flex-row gap-2">
              <button
                className="btn btn-error btn-sm ml-2 hover:scale-105 hover:bg-red-600"
                onClick={() => hdlDelete(promotion.id)} // Ensure you're using the correct id
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormPromotion;
