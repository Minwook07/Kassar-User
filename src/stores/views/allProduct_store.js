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
        products: [
            { id: 1, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 6', price: 100, img: new URL('@/assets/images/5.avif', import.meta.url).href, isFav: true },
            { id: 2, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 2', price: 200, img: new URL('@/assets/images/2.avif', import.meta.url).href, isFav: true },
            { id: 3, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 3', price: 300, img: new URL('@/assets/images/3.avif', import.meta.url).href, isFav: false },
            { id: 4, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 4', price: 400, img: new URL('@/assets/images/4.avif', import.meta.url).href, isFav: false },
            { id: 5, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 1', price: 100, img: new URL('@/assets/images/5.avif', import.meta.url).href, isFav: false },
            { id: 6, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 2', price: 200, img: new URL('@/assets/images/2.avif', import.meta.url).href, isFav: false },
            { id: 7, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 3', price: 300, img: new URL('@/assets/images/3.avif', import.meta.url).href, isFav: false },
            { id: 8, name: 'ក្រូចខ្វិចបាត់ដំបងពូនី 4', price: 400, img: new URL('@/assets/images/4.avif', import.meta.url).href, isFav: false },
        ]
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

            toastStore.showToast('សូមចូល​គណនី​មុន​បន្ថែម​ទំនិញ');
            setTimeout(() => {
                router.push({ name: 'login' });
            }, 2000);
            return;

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
                setTimeout(() => {
                    router.push({ name: 'login' });
                }, 2000);
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
                            const message = currentState ? "ដកចេញរួចរាល់" : "ដាក់ចូលរួចរាល់";
                            toastStore.showToast(message);

                            // Toggle the state
                            this.productArr[index].is_favorited = !currentState;
                        }
                    } else {
                        toastStore.showToast("មានបញ្ហា! មិនអាចរក្សាទុកបានទេ។");
                    }
                })
                .catch(error => {
                    toastStore.showToast("បរាជ័យក្នុងការកំណត់ Favorites។");
                });
        }

    }

})