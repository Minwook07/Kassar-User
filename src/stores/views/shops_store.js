import { defineStore } from "pinia";
import axios from "axios";

export const useShopStore = defineStore('views/shops_store', {
    state: () => ({
        selected_id: 0,
        shops: null,
        products: [],
        
        follow: {
            is_following: false
        },
        count_follows: {
            total: 0
        },

        loading: false,
        followLoading: false,
        
        error: null
    }),

    actions: {
        async onloadShop(id) {
            if (!id) {
                this.error = "Shop ID is required";
                return false;
            }

            this.loading = true;
            this.error = null;
            this.selected_id = id;

            try {
                const res = await axios.get(`/api/shops/${id}`);
                
                if (res.data.result) {
                    this.shops = res.data.data;
                    this.products = res.data.data.products || [];
                    return true;
                }
                
                throw new Error(res.data.message || "Failed to load shop");
            } catch (error) {
                console.error('Failed to load shop:', error);
                this.error = error.response?.data?.message || error.message || "Failed to load shop";
            } finally {
                this.loading = false;
            }
        },

        async getCountFollower(id) {
            if (!id) {
                console.error("Shop ID is required");
                return false;
            }

            try {
                const res = await axios.get(`/api/shops/${id}/followers`);
                
                if (res.data.result) {
                    this.count_follows.total = res.data.paginate?.total || 0;
                    return true;
                }
                
                return false;
            } catch (error) {
                console.error('Failed to get follower count:', error);
                this.error = error.response?.data?.message || error.message;
                return false;
            }
        },

        async toggleFollow(id) {
            if (!id) {
                console.error("Shop ID is required");
                return false;
            }

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            
            if (!token) {
                console.error("Authentication token is required");
                return false;
            }

            this.followLoading = true;
            this.error = null;

            try {
                const res = await axios.post(
                    `/api/shops/${id}/toggle-follow`, 
                    null, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                
                if (res.data.result) {
                    this.follow = res.data.data;
                    
                    await this.getCountFollower(id);
                    
                    return true;
                }
                
                throw new Error(res.data.message || "Failed to toggle follow");
            } catch (error) {
                console.error('Failed to toggle follow:', error);
                this.error = error.response?.data?.message || error.message || "Failed to toggle follow";
                return false;
            } finally {
                this.followLoading = false;
            }
        },

        async checkFollowStatus(id) {
            if (!id) return false;

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            
            if (!token) return false;

            try {
                const res = await axios.get(`/api/shops/${id}/follow-status`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (res.data.result) {
                    this.follow = res.data.data;
                    return true;
                }
                
                return false;
            } catch (error) {
                console.error('Failed to check follow status:', error);
                return false;
            }
        },

        clearShopData() {
            this.shops = null;
            this.products = [];
            this.follow = { is_following: false };
            this.count_follows = { total: 0 };
            this.error = null;
        },

        resetStore() {
            this.selected_id = 0;
            this.clearShopData();
            this.loading = false;
            this.followLoading = false;
        }
    }
});