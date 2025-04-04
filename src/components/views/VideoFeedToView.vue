<template>
    <div class="video-feed d-flex overflow-hidden">
        <div class="video-section d-flex justify-content-center position-relative">
            <img v-if="!video" src="/kassar.png" alt="" class="w-100 position-absolute">
            <img v-if="video" :src="video?video.thumbnail:'/kassar.png'" alt="" class="w-100 position-absolute" >
            <div
                class="top-bar p-3 w-100 d-flex  align-items-center justify-content-between position-absolute top-0 start-0">
                <RouterLink to="/allproducts" class="btn-dark text-decoration-none
           d-flex align-items-center">
                    <img src="/kassar.png" alt="" style="width: 40px;">
                    <h6 class="m-0 px-2 text-white">ទំព័រផលិតផល</h6>
                </RouterLink>
                <form class="d-flex search-input-wrapper align-items-center">
                    <input class="form-control me-2" type="search" placeholder="ស្វែងរកផលិតផល" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">ស្វែងរក</button>
                </form>
                <RouterLink to="/allproducts" class="btn-dark text-decoration-none
           d-flex align-items-center">
                    <i class="fa-solid fa-plus fs-3 p-2 text-white"></i>
                    <h6 class="m-0 pe-2 text-white">បង្ហោះវីដេអូ</h6>
                </RouterLink>
            </div>
            <div class="sidebar p-3 h-100 position-absolute top-0 end-0 d-flex align-items-center">
                <div class="switch-button-wrapper d-flex flex-column">
                    <button class="btn-dark rounded-circle border-0" @click="nextVideo">
                        <i class="text-white fs-5 fa-solid fa-chevron-up"></i>
                    </button>
                    <button class="btn-dark rounded-circle border-0" @click="prevVideo">
                        <i class="text-white fs-5 fa-solid fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="video-link d-flex align-items-center justify-content-center h-100 bg-danger">
                <div class="bg-accent h-100 overflow-hidden">
                    <video ref="videoPlayer" class="video-display" autoplay playsinline controls v-if="video"
                        :src="video.video_url"></video>
                </div>
            </div>
        </div>
        <div class="video-detail p-3">
            <div class="shop-profile rounded-3 p-3  bg-white">
                <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex">
                        <RouterLink :to="video?`/viewshop?id=`+video.shop.id:''" class="shop-avatar border">
                            <img v-if="video" :src="video.shop.image" alt="">
                        </RouterLink>
                        <div class="owner-detail ps-2">
                            <RouterLink :to="video?`/viewshop?id=`+video.shop.id:''" class="name text-decoration-none ">
                                <h5 class="m-0 fw-bold" v-if="video">{{ video.shop.name }}</h5>
                            </RouterLink>
                            <div class="rating d-flex align-items-center mt-1">

                                <span class="px-2 fw-bold fs-5 text-black-50"> · </span>
                                <h6 class="m-0 fw-bold pe-1 text-black-50" v-if="video">{{video.created_since}}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="btn btn-primary">
                        <span class="d-none d-md-inline-block" v-if="video">តាមដាន</span>
                    </div>
                </div>
                <div class="shop-post-title mt-3">
                    <p v-if="video">{{video.description}}</p>
                </div>
            </div>
            <div class="product rounded-3 p-3 bg-white mt-3 d-flex align-items-start">
                <div class="thumbnail" v-if="video" @click="goToProductDetail(video.product.id)">
                    <img v-if="video" :src="video.product.product_thumbnail" alt="">
                </div>
                <div class="detail ms-3">
                    <h5 class="fw-bold text-semidark" v-if="video" @click="goToProductDetail(video.product.id)">{{video.product.name}}</h5>
                    <p class="m-0" v-if="video">1 <span>{{video.product.product_units.name}} </span></p>
                    <p class="fw-bold fs-3 text-secondary m-0" v-if="video">{{video.product.price.discounted_price}} ៛</p>
                    <router-link to="" class="btn btn-outline-primary rounded-2 ms-auto"><i
                            class="bi bi-bag-fill me-1"></i>កន្រ្តក</router-link>
                </div>
                <div class="d-flex flex-column align-content-between">
                    <span class="category-pill ms-auto" v-if="video">{{video.product.category.name}}</span>
                    <div class="d-flex mt-2">
                        <h6 class="m-0 fw-bold pe-1 text-black-50" v-if="video">{{video.product.rating.average}}</h6> <i class="fa fa-star text-warning fs-6"></i>
                    </div>
                </div>
            </div>
            <div class="share-action rounded-3 bg-white mt-3 d-flex">
                <input type="text" :value="video?'https://kassar-usr.chandalen.dev/product?id='+video.id:''" id="myInput" class="w-100 ">
                <button class="btn btn-share" @click="copyLink()"><i class="bi bi-share"></i>
                </button>
            </div>
            <div class="comment-section rounded-3 p-3 bg-white mt-3">
                <p class="m-0 fw-bold fs-5">មតិ (<span>11</span>)</p>
                <hr class="my-1">
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAllVideos } from '@/stores/views/videoFeed_store.js';
import axios from 'axios';
import { ref, onMounted, watch, nextTick } from 'vue';
import router from '@/router';

const video = ref(null);
const allVideos = useAllVideos();
const videoPlayer = ref(null);
let lastIndex = ref(0);
onMounted(async () => {
    await allVideos.onloadVideo(); 
    if (allVideos.videoArr) {
        updateLatestVideo();
    }
});

const updateLatestVideo = () => {
    lastIndex.value = allVideos.lastIndexVideoArr;
    // console.log('Last Index:', lastIndex.value); 

    if (lastIndex !== undefined) {
        video.value = allVideos.videoArr[lastIndex.value];
        // console.log('Latest Video:', video.value);
    }
};
// Watch for changes in video array in case it's updated later
watch(() => allVideos.videoArr, updateLatestVideo, { deep: true });

function nextVideo() {
    if (lastIndex.value > 0) {
        lastIndex.value = lastIndex.value - 1;
        video.value = allVideos.videoArr[lastIndex.value];
    }
    // console.log('Lastest Idex2',lastIndex.value);
}
function prevVideo() {
    if (lastIndex.value < allVideos.videoArr.length - 1) {
        lastIndex.value = lastIndex.value + 1;
        video.value = allVideos.videoArr[lastIndex.value];
    }
    // console.log(lastIndex.value);
}

function goToProductDetail($id) {
    router.push(`/product?id=${$id}`);
}
function copyLink() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

}


</script>