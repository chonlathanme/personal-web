import axios from "axios";

export const createCategory = async (token, data) => {
  return await axios.post("http://localhost:8000/category/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCategories = async () => {
  return await axios.get("http://localhost:8000/category/get-categories");
}

export const deleteCategory = async (token, id) => {
  return await axios.delete(`http://localhost:8000/category/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}