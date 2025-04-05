import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { useToastStore } from "../toast_store";
export const useAllProducts = defineStore('views/allProduct', {
    state: () => ({
        mdl_term: null,
        productArr: null,
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
                    console.log(this.productArr);
                })
        },

        addToCart(id) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const toastStore = useToastStore();

            if (!token) {
                router.push({ name: 'login' });
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
              router.push({ name: 'login' });
              return;
            }
          
            axios.post(`/api/favorites/toggle?product_id=${id}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            })
              .then(response => {
                if (response.data && response.data.result) {
                  // បង្ហាញ Toast message
                  toastStore.showToast("រក្សាទុកក្នុង Favorites ជោគជ័យ!");
          
                  // Update UI: ប្តូរតម្លៃ is_favorited នៅក្នុង productArr
                  const index = this.productArr.findIndex(product => product.id === id);
                  if (index !== -1) {
                    this.productArr[index].is_favorited = !this.productArr[index].is_favorited;
                  }
                } else {
                  toastStore.showToast("មានបញ្ហា! មិនអាចរក្សាទុកបានទេ។");
                }
              })
              .catch(error => {
                console.error("Add to favorite failed:", error.response?.data || error.message);
                toastStore.showToast("បរាជ័យក្នុងការកំណត់ Favorites។");
              });
          }
          
    }

})