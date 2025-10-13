import { defineStore } from "pinia";
import axios from "axios";
export const useTopRatedProduct = defineStore('views/relatedProduct_store', {
    state: () => ({
        selected_id: 0,
        topRated_product: []
    }),
    actions: {
        async onLoadTopRatedProduct(id) {
            try {
                // const res = await axios.get(`/api/products-top-rated`)
                const res = await axios.get(`/api/products?rating=5`)
                if (res.data.result) {
                    this.topRated_product = res.data.data;
                    this.selected_id = id;
                }
            }
            catch (error) {
                console.error('Failed to load shop:', error);
                this.topRated_product = [];
            }
        },
    }
})