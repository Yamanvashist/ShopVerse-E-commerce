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
    },

    addProducts: async (formData) => {
        set({ loading: true, error: null })
        try {

            const payload = new FormData(); 
            payload.append("name", formData.name);
            payload.append("description", formData.description);
            payload.append("price", formData.price);
            payload.append("stock", formData.stock);
            payload.append("category", formData.category);
            payload.append("image", formData.image); 

            const res = await axios.post("http://localhost:4000/product",
                payload,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            set({ loading: false })
        } catch (err) {
            set({
                error: err.response?.data?.message || "Error posting product",
                loading: false
            })
        }
    }

}))

export default useProductStore;