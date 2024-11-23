import axios from "axios";

export const createPromotion = async (token, data) => {
  return await axios.post("http://localhost:8000/page/create-promotion", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPromotions = async () => {
  return await axios.get("http://localhost:8000/page/promotions");
};

export const deletePromotion = async (token, id) => {
  return await axios.delete(
    `http://localhost:8000/page/delete-promotion/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const createNews = async (token, data) => {
  return await axios.post("http://localhost:8000/page/create-news", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getNews = async () => {
  return await axios.get("http://localhost:8000/page/news");
};

export const deleteNews = async (token, id) => {
  return await axios.delete(
    `http://localhost:8000/page/delete-news/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
