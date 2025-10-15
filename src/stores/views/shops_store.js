import { defineStore } from "pinia";
import axios from "axios";
export const useShopStore = defineStore('views/shops_store', {
    state: () => ({
        selected_id: 0,
        shops: null,
        products: []
    }),
    actions: {
        async onloadShop(id) {
            try {
                const res = await axios.get(`/api/shops/${id}`)
                if (res.data.result) {
                    this.shops = res.data.data;
                    this.products = res.data.data.products;
                }
            }
            catch (error) {
                console.error('Failed to load shop:', error);
            }
        },
    }
})