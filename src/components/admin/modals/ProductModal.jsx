import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import useCategoryStore from "../../../stores/categoryStore";
import { toast } from "react-toastify";
import TextareaAutoSize from "react-textarea-autosize";
import { createProduct } from "../../../api/ProductApi";
import UploadFile from "../UploadFile";
import useProductStore from "../../../stores/productStore";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const ProductModal = () => {
  const token = useUserStore((state) => state.token);
  const categories = useCategoryStore((state) => state.categories);
  const getCategory = useCategoryStore((state) => state.getCategory);
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    images: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const getProduct = useProductStore((state) => state.getProduct);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const hdlChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (name === "categoryId") {
      setSelectedCategory(value);
    }
  };

  const closeModal = () => {
    document.getElementById("product-modal").close();
    setSelectedCategory("");
    setInput(initialState);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createProduct(token, input);
      console.log(result);
      e.target.closest("dialog").close();
      toast.success(`Created product ${input.title}`);
      setInput(initialState);
      setSelectedCategory("");
      getProduct();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      console.log(errMessage);
      toast.error(errMessage);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Product</h1>
      <button
        type="button"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={closeModal}
      >
        <p className="text-black">✕</p>
      </button>
      <form onSubmit={hdlSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            name="title"
            type="text"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-gray-100"
            onChange={hdlChange}
            value={input.title}
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <TextareaAutoSize
            name="description"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-gray-100 resize-none"
            onChange={hdlChange}
            value={input.description}
            placeholder="Enter product description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            name="price"
            type="number"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-gray-100"
            onChange={hdlChange}
            value={input.price}
            placeholder="Enter product price"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Quantity</label>
          <input
            name="quantity"
            type="number"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-gray-100"
            onChange={hdlChange}
            value={input.quantity}
            placeholder="Enter product quantity"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            className="select select-bordered w-full bg-gray-100"
            value={selectedCategory}
            name="categoryId"
            onChange={hdlChange}
          >
            <option value="" disabled>
              Please select category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <UploadFile input={input} setInput={setInput} />
        <button
          type="submit"
          className="btn w-full bg-orange-600 text-white hover:bg-orange-700 transition duration-200 rounded-md py-2 border-none mt-4"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ProductModal;
