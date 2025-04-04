import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
export const useAllVideos = defineStore('views/videoFeed', {
    state: () => ({
        mdl_term: null,
        videoArr: null,
        lastVideoId: null,
        fiestVideoId: null,
        lastIndexVideoArr: null
    }),
    actions: {
        toggleFav(id) {
            const product = this.products.find(p => p.id === id);
            if (product) {
                product.isFav = !product.isFav;
            }
        },

        onloadVideoFilter(per_page = 8, page = 1) {
            axios.get(`/api/posts?per_page=${per_page}&page=${page}`)
                .then(response => {
                    this.videoArr = response.data.data;
                    console.log(this.videoArr);
                })
        },
        onloadVideo() {
            axios.get(`/api/posts?sdir=asc`)
                .then(response => {
                    this.lastIndexVideoArr = response.data.data.length - 1;
                    this.videoArr = response.data.data;
                    // this.lastVideoId = this.videoArr[0].id;
                    // this.firstVideoId = this.videoArr[this.videoArr.length - 1].id;
                    console.log(this.videoArr);
                    // console.log('last vdo:',this.lastIndexVideoArr);
                })
        },

        onloadVideoFilterId(id) {
            axios.get(`/api/posts/${id}`)
                .then(response => {
                    this.videoArr = response.data.data;
                    // this.lastVideoId = this.videoArr[0].id;
                    // this.firstVideoId = this.videoArr[this.videoArr.length - 1].id;
                    console.log(this.videoArr);
                    // console.log('last vdo:',this.lastIndexVideoArr);
                })
        },

        addToCart(id) {
            const token = localStorage.getItem('token');

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
                    // console.log(response.data);
                })
        },
        addToFavorite(id) {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push({ name: 'login' });
                return;
            }

            const formData = new FormData();
            formData.append('product_id', id);

            axios.post('/api/favorites', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    // console.log(response.data);
                })
        }
    }

})