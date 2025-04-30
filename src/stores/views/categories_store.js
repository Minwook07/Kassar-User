import { defineStore } from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore('views/categories_store.js', {
    state: () => ({
        categories: []
    }),
    actions: {
        GetAllCategories() {
            axios.get("/api/categories")
                .then((res) => {
                    this.categories = res.data.data;
                })
        }
    }
})