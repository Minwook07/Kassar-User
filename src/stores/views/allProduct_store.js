import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { useToastStore } from "../toast_store";
export const useAllProducts = defineStore('views/allProduct', {
    state: () => ({
        mdl_term: null,
        productArr: null,
        latestPro: null,
        discountPro: null,
        products: []
    }),
    actions: {
        toggleFav(id) {
            const product = this.products.find(p => p.id === id);
            if (product) {
                product.isFav = !product.isFav;
            }
        },

        onloadProduct(per_page = 8, page = 1, sdir = 'desc') {
            axios.get(`/api/products?per_page=${per_page}&page=${page}&sdir=${sdir}`)
                .then(response => {
                    this.productArr = response.data.data;
                })
        },
        onloadLatestProduct(per_page, page, sdir = 'desc') {
            axios.get(`/api/products?per_page=${per_page}&page=${page}&sdir=${sdir}`)
                .then(response => {
                    this.latestPro = response.data.data;
                })
        },
        onloadDiscountProduct(per_page, page, sdir = 'desc') {
            axios.get(`/api/products?per_page=${per_page}&page=${page}&sdir=${sdir}`)
                .then(response => {
                    this.discountPro = response.data.data;
                })
        },

        addToCart(id) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const toastStore = useToastStore();

            if (!token) {
                toastStore.showToast('សូមចូល​គណនី​មុន​បន្ថែម​ទំនិញ');
                return;
            }

            const formData = new FormData();
            formData.append('product_id', id);
            formData.append('qty', 1);

            axios.post('/api/cart', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    if (response.data && response.data.result) {
                        toastStore.showToast('ដាក់ចូលកន្ត្រកជោគជ័យ');
                    } else {
                        toastStore.showToast('មានបញ្ហា! មិនអាចដាក់ចូលកន្ត្រកបានទេ');
                    }
                })
        },
        addToFavorite(id) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const toastStore = useToastStore();

            if (!token) {
                toastStore.showToast('សូម​ចូល​គណនី​ជាមុនសិន');
                return;
            }

            axios.post(`/api/favorites/toggle?product_id=${id}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    if (response.data && response.data.result) {
                        const index = this.productArr.findIndex(product => product.id === id);
                        if (index !== -1) {
                            // Determine the message based on the current state
                            const currentState = this.productArr[index].is_favorited;
                            const message = currentState ? "ដកចេញពីបញ្ជីប្រាថ្នាជោគជ័យ" : "ដាក់ចូលបញ្ជីប្រាថ្នាជោគជ័យ";
                            toastStore.showToast(message);

                            // Toggle the state
                            this.productArr[index].is_favorited = !currentState;
                        }
                    } else {
                        toastStore.showToast("មានបញ្ហា! មិនអាចរក្សាទុកបានទេ។");
                    }
                })
        }

    }

})