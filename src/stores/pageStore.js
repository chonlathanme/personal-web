import axios from "axios";
import { create } from "zustand";
import { getPromotions, getNews } from "../api/PageApi";

const usePageStore = create((set) => ({
    promotions: [],
    news: [],
    loading: false,
    error: null,
    getPromotion: async () => {
        set({ loading: true, error: null });
        try {
            const result = await getPromotions();
            set({promotions: result.data, loading: false});
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },
    getNews: async () => {
        set({ loading: true, error: null });
        try {
            const result = await getNews();
            set({news: result.data, loading: false});
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    }
}));

export default usePageStore