import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useProductStore = create((set) => ({

    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await axios.get("http://localhost:4000/product")
            set({
                products: data.products,
                loading: false
            });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Error fetching products",
                loading: false
            });
        }
    }
}))

export default useProductStore;