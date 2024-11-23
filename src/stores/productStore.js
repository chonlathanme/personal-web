import axios from "axios";
import { create } from "zustand";
import { getProducts } from "../api/ProductApi";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  createProduct: async (data, token) => {
    set({ loading: true, error: null });
    try {
      const result = await axios.post(
        "http://localhost:8000/product/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        products: [...state.products, result.data.created],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  getProduct: async (count) => {
    set({ loading: true, error: null });
    try {
      const result = await getProducts(count);
      set({ products: result.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));


export default useProductStore