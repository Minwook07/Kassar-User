import axios from "axios";
import { defineStore } from "pinia";

export const useOrderProductStore = defineStore('views/orderProducts_store', {
    state: () => ({
        orders: [],
        order: null,
        loading: false,
        error: null,
        token: localStorage.getItem('token') || sessionStorage.getItem('token')
    }),
    actions: {
        async onLoadOrderHistory() {
            try {
                const res = await axios.get('api/orders-history', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.orders = res.data.data;
            }
            catch (err) {
                this.error = err.response?.data?.message;
                throw err;
            }
        },

        async createOrder(payload) {
            this.loading = true;
            this.error = null;
            try {
                const res = await axios.post('/api/orders/checkout', payload);
                if (res.data.result) {
                    this.order = res.data.data;
                    return this.order;
                } else {
                    this.error = res.data.message;
                    return null;
                }
            } catch (err) {
                this.error = err.message || 'Something went wrong';
                return null;
            } finally {
                this.loading = false;
            }
        },

        clearOrder() {
            this.order = null;
            this.error = null;
        }
    }
})