import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useCartStore = create((set) => ({
    cart: [],
    loading: false,
    error: null,

    fetchCart: async () => {
        set({ loading: true })
        try {
            const { data } = await axios.get("http://localhost:4000/cart")
            set({ cart: data.cart?.items || [], loading: false, error: null })
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "error Fetching Cart"
            })
        }
    },

    addCart: async (productId, quantity, size) => {
        set({ loading: true });

        try {
            const { data } = await axios.post(
                "http://localhost:4000/cart/add",
                {
                    productId,
                    quantity,
                    size: size
                },
                { withCredentials: true }
            );

            set({
                cart: data.cart?.items || [],
                loading: false,
                error: null
            });
            return { success: true, data };

        } catch (err) {
            const message =
                err.response?.data?.message || "Add to cart failed";
            set({
                loading: false,
                error: message
            });

            return { success: false, message };
        }
    },

    removeCart: async (productId, size) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/cart/remove/${productId}/${size}`
            );

            set({
                cart: data.cart?.items ?? [],
                error: null
            });

            return { success: true };

        } catch (err) {
            const message =
                err.response?.data?.message || "Remove failed";

            set({
                error: message
            });

            return { success: false, message };
        }
    },

    updateQuantity: async (productId, quantity, size) => {
        try {
            const { data } = await axios.put(
                "http://localhost:4000/cart/update",
                {
                    productId: String(productId),
                    quantity,
                    size
                },
                { withCredentials: true }
            );

            set({
                cart: data.cart?.items ?? [],
                error: null
            });

            return { success: true };
        } catch (err) {
            const message =
                err.response?.data?.message || "Could not update quantity";

            set({ error: message });

            return { success: false, message };
        }
    }
}))

export default useCartStore