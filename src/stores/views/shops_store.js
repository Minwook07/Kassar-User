import { defineStore } from "pinia";
import axios from "axios";
export const useShopStore = defineStore('views/shops_store', {
    state: () => ({
        selected_id: 0,
        shops: null
    }),
    actions: {
        async onlaodShop(id) {
            try {
                const res = await axios.get(`/api/shops/${id}`)
                if (res.data.result) {
                    this.shops = res.data.data;
                }
            }
            catch (error) {
                console.error('Failed to load shop:', error);
            }
        },
    }
})