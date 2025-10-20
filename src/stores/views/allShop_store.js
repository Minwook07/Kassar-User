import { defineStore } from 'pinia'
import axios from 'axios'

export const useAllShopStore = defineStore('views/allshop', {
    state: () => ({
        shops: [],
        shop_detail: null,
        loading: false,
        error: null,
        totalShop: 0,
        pagination: {},
    }),
    getters: {
        totalPages: (state) => state.pagination.last_page,
        currentPage: (state) => state.pagination.current_page,
    },
    actions: {
        async getShopLoad(page = 1, size = 15, scol = 'id', sdir = 'desc') {
            this.loading = true
            this.error = null
            try {
                const res = await axios.get(`/api/shops?page=${page}&size=${size}&scol=${scol}&sdir=${sdir}`)
                if (res.data.result) {
                    this.shops = res.data.data
                    this.pagination = res.data.paginate
                }
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
        async getShopDetail(id) {
            this.loading = true
            this.error = null
            try {
                const res = await axios.get(`/api/shops/${id}`)
                if (res.data.result) {
                    this.shop_detail = res.data.data
                }
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        }
    },
})
