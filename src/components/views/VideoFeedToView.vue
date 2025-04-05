<template>
    <div class="video-feed d-flex overflow-hidden">
        <div class="video-section d-flex justify-content-center position-relative">
            <img v-if="!video" src="/kassar.png" alt="" class="w-100 position-absolute">
            <img v-if="video" :src="video ? video.thumbnail : '/kassar.png'" alt="" class="w-100 position-absolute">
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
                <a href="https://adm.kassar.publicvm.com/upload-video" class="btn-dark go-create-video text-decoration-none
           d-flex align-items-center">
                    <i class="fa-solid fa-plus fs-3 p-2 text-white"></i>
                    <h6 class="m-0 pe-2 text-white">បង្ហោះវីដេអូ</h6>
                </a>
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
            <div class="video-link d-flex align-items-center justify-content-center h-100 ">
                <div class=" h-100 overflow-hidden">
                    <video ref="videoPlayer" class="video-display" autoplay playsinline controls v-if="video"
                        :src="video.video_url"></video>
                </div>
            </div>
        </div>
        <div class="video-detail p-3 position-relative">
            <div class="shop-profile rounded-3 p-3  bg-white">
                <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex">
                        <RouterLink :to="video ? `/viewshop?id=` + video.user.id : ''" class="shop-avatar border">
                            <img v-if="video" :src="video.shop.image" alt="">
                        </RouterLink>
                        <div class="owner-detail ps-2">
                            <RouterLink :to="video ? `/viewshop?id=` + video.user.id : ''"
                                class="name text-decoration-none ">
                                <h5 class="m-0 fw-bold" v-if="video">{{ video.shop.name }}</h5>
                            </RouterLink>
                            <div class="rating d-flex align-items-center mt-1">

                                <!-- <span class="px-2 fw-bold fs-5 text-black-50"></span> -->
                                <h6 class="m-0 fw-bold pe-1 text-black-50" v-if="video">{{ video.created_since }}</h6>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="btn btn-primary">
                        <span class="d-none d-md-inline-block" v-if="video">តាមដាន</span>
                    </div> -->
                </div>
                <div class="shop-post-title mt-3">
                    <p v-if="video">{{ video.description }}</p>
                </div>
            </div>
            <div v-if="video.product" class="product rounded-3 p-3 bg-white mt-3 d-flex align-items-start">
                <div class="thumbnail" v-if="video.product" @click="goToProductDetail(video.product.id)">
                    <img v-if="video.product" :src="video.product.product_thumbnail" alt="" class="object-fit-cover">
                </div>
                <div class="detail ms-3">
                    <h5 class="fw-bold text-semidark" v-if="video.product" @click="goToProductDetail(video.product.id)">
                        {{ video.product.name }}</h5>
                    <p class="m-0" v-if="video.product">1 <span>{{ video.product.product_units.name }} </span></p>
                    <p class="fw-bold fs-3 text-secondary m-0" v-if="video">{{ video.product.price.discounted_price }} ៛
                    </p>
                    <div v-if="video.product" @click="addToCart(video.product.id)" class="btn btn-outline-primary rounded-2 ms-auto"><i
                            class="bi bi-bag-fill me-1"></i>កន្រ្តក</div>
                </div>
                <div class="d-flex flex-column align-content-between">
                    <span class="category-pill ms-auto" v-if="video.product">{{ video.product.category.name }}</span>
                    <div class="d-flex mt-2">
                        <h6 class="m-0 fw-bold pe-1 text-black-50" v-if="video.product">{{ video.product.rating.average }}</h6>
                        <i v-if="video.product" class="fa fa-star text-warning fs-6"></i>
                    </div>
                </div>
            </div>
            <div class="share-action rounded-3 bg-white mt-3 d-flex">
                <input type="text" :value="video ? 'https://usr.kassar.publicvm.com/video?id=' + video.id : ''"
                    id="myInput" class="w-100 ">
                <button class="btn btn-share" @click="copyLink()"><i class="bi bi-share"></i>
                </button>
            </div>
            
            <CommentToView :post_id="video ? video.id : ''" />
        </div>
    </div>
    <ToastView/>
</template>
<script setup>
import { useAllVideos } from '@/stores/views/videoFeed_store.js';
import axios from 'axios';
import { ref, onMounted, watch, watchEffect } from 'vue';
import router from '@/router';
import CommentToView from '@/components/views/CommentToView.vue';
import { useRoute } from 'vue-router';
import { useToastStore } from '@/stores/toast_store';
import ToastView from './ToastView.vue';
const toastStore = useToastStore();

const video = ref(null);
const allVideos = useAllVideos();
const videoPlayer = ref(null);
let lastIndex = ref(0);
const route = useRoute();

onMounted(async () => {
    await allVideos.onloadVideo(); 

    if (allVideos.videoArr && allVideos.videoArr.length > 0) {
        if (route.query.id) {
            updateVideoById(route.query.id);
        } else {
            updateLatestVideo();
        }

        if (!video.value) {
            lastIndex.value = 0;
            video.value = allVideos.videoArr[0];
        }
    }
});



const updateVideoById = (id) => {
    if (!allVideos.videoArr || allVideos.videoArr.length === 0) {
        return;
    }

    const foundVideo = allVideos.videoArr.find(v => v.id == id);
    if (foundVideo) {
        video.value = foundVideo;
        lastIndex.value = allVideos.videoArr.findIndex(v => v.id == id);
    }
};

const updateLatestVideo = () => {
    if (!allVideos.videoArr || allVideos.videoArr.length === 0) {
        return;
    }

    lastIndex.value = allVideos.lastIndexVideoArr ?? (allVideos.videoArr.length - 1);
    
    if (lastIndex.value < 0 || lastIndex.value >= allVideos.videoArr.length) {
        lastIndex.value = 0;
    }

    video.value = allVideos.videoArr[lastIndex.value];
};



// Watch for changes in the route query
watch(() => route.query.id, (newId) => {
    if (newId && allVideos.videoArr && allVideos.videoArr.length > 0) {
        updateVideoById(newId);
    }
});

// Ensure the video updates when video list is available
watchEffect(() => {
    if (allVideos.videoArr && allVideos.videoArr.length > 0) {
        if (route.query.id) {
            updateVideoById(route.query.id);
        } else {
            updateLatestVideo();
        }
    }
});


function prevVideo() {
    if (lastIndex.value > 0) {
        lastIndex.value = lastIndex.value - 1;
        video.value = allVideos.videoArr[lastIndex.value];
    }
    updateQueryId(allVideos.videoArr[lastIndex.value].id); 

}
function nextVideo() {
    if (lastIndex.value < allVideos.videoArr.length - 1) {
        lastIndex.value = lastIndex.value + 1;
    } else {
        lastIndex.value = 0; // Loop back to the first video
    }
    video.value = allVideos.videoArr[lastIndex.value];
    updateQueryId(allVideos.videoArr[lastIndex.value].id); 
}
function updateQueryId(newId) {
  router.push({
    query: {
      ...route.query, 
      id: newId
    }
  });
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
import { useAllProducts } from '@/stores/views/allProduct_store';
const allProduct = useAllProducts();
const addToCart = (id) => {
    allProduct.addToCart(id);
}

</script>