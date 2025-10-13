import { defineStore } from "pinia";
import axios from "axios";
export const useRelatedProduct = defineStore('views/relatedProduct_store', {
    state: () => ({
        selected_id: 0,
        related_products: []
    }),
    actions: {
        async onLoadRelatedProduct(id) {
            try {
                const res = await axios.get(`/api/products/${id}`)
                if (res.data.result) {
                    this.related_products = res.data.data.related_products;
                    this.selected_id = id;
                }
            }
            catch (error) {
                console.error('Failed to load shop:', error);
                this.related_products = [];
            }
        },
    }
})