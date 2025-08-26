import axios from "axios";
import { defineStore } from "pinia";

export const useOrderProductStore = defineStore('views/orderProducts_store', {
    state: () => ({
        orders: [],
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
                this.orders =  res.data.data;
            }            
            catch (err){
                this.error = err.response?.data?.message;
                throw err;
            }
        }
    }
})