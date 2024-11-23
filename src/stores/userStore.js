import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getUser } from "../api/UserApi";

const useUserStore = create(persist((set, get) => ({
    user: null,
    users: [],
    loading: false,
    error: null,
    token: "",
    role: "",
    login: async (input) => {
        localStorage.clear()
        const result = await axios.post("http://localhost:8000/user/login", input)
        set({ user: result.data.user, token: result.data.token, role: result.data.user.role })
        return result.data
    },
    logout: () => {
        set({ user: null, token: "", role: "" })
    },
    getUsers: async () => {
        set({ loading: true, error: null })
        try {
            const result = await getUser()
            set({ users: result.data, loading: false })
        } catch (error) {
            set({ loading: false, error: error.message })
        }
    }
}), {
    name: "state",
    storage: createJSONStorage(() => localStorage),
}))

export default useUserStore