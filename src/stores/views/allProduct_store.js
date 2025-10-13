import { defineStore } from "pinia";
import axios from "axios";
import { useToastStore } from "../toast_store";

export const useAllProducts = defineStore('views/allProduct', {
    state: () => ({
        mdl_term: null,
        productArr: [],
        latestPro: [],
        discountPro: [],
        products: [],

        // New Arrivals Pagination
        newArrivals: [],
        newArrivalsCurrentPage: 1,
        newArrivalsPerPage: 8,
        newArrivalsTotalPages: 0,
        newArrivalsTotalItems: 0,

        // filters & pagination
        selectedCategory: null,
        search: '',
        itemsPerPage: 8,
        currentPage: 1,
        min_price: 0,
        max_price: 100000,
        range: [0, 100000],

        // loading / totals
        isLoading: false,
        totalProducts: 0,
    }),
    actions: {
        async GetAllProducts() {
            this.isLoading = true;
            let url = `/api/products?size=${this.itemsPerPage}&page=${this.currentPage}`;

            if (this.search) {
                url += `&search=${encodeURIComponent(this.search)}`;
            }
            if (this.selectedCategory) {
                url += `&category_id=${this.selectedCategory}`;
            }
            if (this.range[0] !== undefined && this.range[1] !== undefined) {
                url += `&min_price=${this.range[0]}&max_price=${this.range[1]}`;
            }

            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.totalProducts = res.data.paginate.total;
                this.productArr = res.data.data;
            } catch (e) {
                this.productArr = [];
            } finally {
                setTimeout(() => { this.isLoading = false }, 300);
            }
        },

        // New Arrivals with Pagination
        async onloadNewArrivals(page = 1, size = 8) {
            this.isLoading = true;
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const res = await axios.get(`/api/products-new-arrivals?size=${size}&page=${page}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.result) {
                    this.newArrivals = res.data.data;
                    this.newArrivalsCurrentPage = res.data.paginate.current_page;
                    this.newArrivalsPerPage = res.data.paginate.size;
                    this.newArrivalsTotalPages = res.data.paginate.last_page;
                    this.newArrivalsTotalItems = res.data.paginate.total;
                }
            } catch (error) {
                console.error('Failed to load new arrivals:', error);
                this.newArrivals = [];
            } finally {
                setTimeout(() => { this.isLoading = false }, 300);
            }
        },

        // Go to specific page
        goToNewArrivalsPage(page) {
            if (page >= 1 && page <= this.newArrivalsTotalPages) {
                this.onloadNewArrivals(page, this.newArrivalsPerPage);
            }
        },

        // Next page
        nextNewArrivalsPage() {
            if (this.newArrivalsCurrentPage < this.newArrivalsTotalPages) {
                this.onloadNewArrivals(this.newArrivalsCurrentPage + 1, this.newArrivalsPerPage);
            }
        },

        // Previous page
        prevNewArrivalsPage() {
            if (this.newArrivalsCurrentPage > 1) {
                this.onloadNewArrivals(this.newArrivalsCurrentPage - 1, this.newArrivalsPerPage);
            }
        },

        toggleFav(id) {
            const product = this.products.find(p => p.id === id);
            if (product) {
                product.isFav = !product.isFav;
            }
        },

        onloadProduct(size = 8, page = 1, sdir = 'desc') {
            axios.get(`/api/products?size=${size}&page=${page}&sdir=${sdir}`)
                .then(response => {
                    this.productArr = response.data.data;
                })
        },

        onloadLatestProduct(size, page, sdir = 'desc') {
            axios.get(`/api/products?size=${size}&page=${page}&sdir=${sdir}`)
                .then(response => {
                    this.latestPro = response.data.data;
                })
        },

        onloadDiscountProduct(size, page, sdir = 'desc') {
            axios.get(`/api/products?size=${size}&page=${page}&sdir=${sdir}`)
                .then(response => {
                    this.discountPro = response.data.data.filter(p => p.promotions && p.promotions.length > 0);
                })
        },

        async onLoadBestSellers({ period = 'month', limit = 10, category_id = null } = {}) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('/api/products-best-sellers', {
                    params: { period, limit, category_id },
                });
                if (response.data.result) {
                    this.products = response.data.data;
                }
            } catch (err) {
                this.error = err.response?.data?.message || err.message;
            } finally {
                this.loading = false;
            }
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

            return axios.post('/api/cart', formData, {
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
                    return response.data.result;
                })
        },

        addToFavorite(id) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const toastStore = useToastStore();

            if (!token) {
                toastStore.showToast('សូម​ចូល​គណនី​ជាមុនសិន');
                return;
            }

            return axios.post(`/api/favorites/toggle?product_id=${id}`, null, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => {
                    if (response.data && response.data.result) {
                        // Update in all arrays
                        const updateFavorite = (arr) => {
                            const index = arr.findIndex(product => product.id === id);
                            if (index !== -1) {
                                const currentState = arr[index].is_favorited;
                                arr[index].is_favorited = !currentState;
                                toastStore.showToast(currentState ? "ដកចេញពីបញ្ជីប្រាថ្នាជោគជ័យ" : "ដាក់ចូលបញ្ជីប្រាថ្នាជោគជ័យ");
                            }
                        };

                        updateFavorite(this.productArr);
                        updateFavorite(this.newArrivals);
                        updateFavorite(this.latestPro);
                        updateFavorite(this.discountPro);
                    } else {
                        toastStore.showToast("មានបញ្ហា! មិនអាចរក្សាទុកបានទេ។");
                    }
                    return response.data.result;
                })
        }
    }
});