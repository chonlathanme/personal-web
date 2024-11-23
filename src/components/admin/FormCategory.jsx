import React from "react";
import { useState, useEffect } from "react";
import {
  createCategory,
  deleteCategory,
} from "../../api/CategoryApi";
import useUserStore from "../../stores/userStore";
import { toast } from "react-toastify";
import useCategoryStore from "../../stores/categoryStore";

const FormCategory = () => {
  const token = useUserStore((state) => state.token);
  const [name, setName] = useState("");
  const categories = useCategoryStore((state) => state.categories);
  const getCategory = useCategoryStore((state) => state.getCategory);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter name");
      return;
    }
    console.log(token, name);
    try {
      const result = await createCategory(token, { name });
      console.log(result);
      toast.success(`Category ${result.data.name} created`);
      getCategory();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  const hdlDelete = async (id) => {
    try {
      const result = await deleteCategory(token, id);
      toast.success(`Category ${result.data.name} deleted`);
      getCategory();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold">Category Management</h1>
      <form
        className="my-4 flex flex-row gap-2 justify-between"
        onSubmit={hdlSubmit}
      >
        <input
          name="name"
          type="text"
          className="input input-bordered bg-transparent w-full"
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <button className="btn bg-orange-500 text-white hover:scale-105 hover:bg-orange-600">Add Category</button>
      </form>
      <hr />
      <ul>
        {categories.map((item) => (
          <li
            key={item.id}
            className="my-2 bg-white p-2 px-4 rounded-lg flex flex-row justify-between items-center shadow"
          >
            {item.name}
            <div className="flex flex-row gap-2">
              <button
                onClick={() => hdlDelete(item.id)}
                className="btn border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-105"
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

export default FormCategory;
