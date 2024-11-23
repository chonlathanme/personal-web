import axios from "axios";
import { create } from "zustand";
import { getCategories } from "../api/CategoryApi";

const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,
    getCategory: async () => {
        try {
            const result = await getCategories();
            set({categories: result.data});
        } catch (err) {
            const errMessage = err.response?.data?.error || err.message;
            console.log(errMessage);
        }
    }
}));

export default useCategoryStore