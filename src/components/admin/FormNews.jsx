import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import usePageStore from "../../stores/pageStore";
import { toast } from "react-toastify";
import { createNews, deleteNews } from "../../api/PageApi";
import TextareaAutosize from "react-textarea-autosize";
import { Image } from "lucide-react";
import UploadFile from "../admin/UploadFile";

const FormNews = () => {
  const token = useUserStore((state) => state.token);
  const [input, setInput] = useState({
    details: "",
    images: [],
  });
  const news = usePageStore((state) => state.news);
  const getNews = usePageStore((state) => state.getNews);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!input.details.trim()) {
      toast.error("Please enter details");
      return;
    }
    try {
      const result = await createNews(token, input);
      console.log(result);
      toast.success(`News created`);
      getNews();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  const hdlDelete = async (id) => {
    try {
      const result = await deleteNews(token, id);
      toast.success(`News deleted`);
      getNews();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">News Management</h1>
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
          Add news
        </button>
      </form>
      <hr />
      <ul>
        {news.map((item) => (
          <li
            key={item.id}
            className="my-2 bg-white p-2 px-4 rounded-lg flex flex-row justify-between items-center shadow"
          >
            {Array.isArray(item.images) &&
            item.images.length > 0 &&
            item.images[0].url ? (
              <img
                src={item.images[0].url}
                alt={item.images[0].public_id}
                className="w-16 h-16 object-cover"
              />
            ) : (
              <Image style={{ width: "64px", height: "64px" }} />
            )}
            <span>{item.details}</span>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => hdlDelete(item.id)}
                className="btn btn-error btn-sm ml-2 hover:scale-105 hover:bg-red-600"
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

export default FormNews;
