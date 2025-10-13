import { defineStore } from "pinia";
import axios from "axios";
import { useToastStore } from "../toast_store";
export const useWishListStore = defineStore('views/wishlist_store', {
    state: () => ({
        FavProducts: [],
        CountFav: 0,
    }),
    actions: {
        async onLoadWishList() {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                if (!token) {
                    console.log('No token found');
                    return;
                }

                const res = await axios.get(`/api/favorites`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.result) {
                    this.FavProducts = res.data.data.data || [];
                    this.CountFav = res.data.favorite_count || 0;
                }
            }
            catch (error) {
                console.error('Failed to load favorites:', error);
                this.FavProducts = [];
            }
        },

        async clearWishlist() {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const toastStore = useToastStore();

            if (!token) {
                console.log('No token found');
                return;
            }

            const res = await axios.delete(`/api/favorites-clear`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.result) {
                toastStore.showToast('ដកចេញទាំអស់ពីបញ្ជីប្រាថ្នាជោគជ័យ');
                this.FavProducts = [];
                this.CountFav = 0;
            }
        },

        async RemoveFav(favId) {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const toastStore = useToastStore();
                if (!token) return console.log("No token found");

                const res = await axios.delete(`/api/favorites/${favId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.result) {
                    toastStore.showToast('ដកចេញពីបញ្ជីប្រាថ្នាជោគជ័យ');
                    await this.onLoadWishList();
                }
            } catch (error) {
                console.error("Failed to remove favorite:", error);
            }
        },
    }
})