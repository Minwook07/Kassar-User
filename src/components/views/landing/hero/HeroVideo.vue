<template>
    <div class="product-hero rounded-3 hero-video py-2 px-3 shadow-sm">
        <div class="title d-flex align-items-center">
            <p class="m-0 pe-1 fw-semibold">វីដេអូ</p> <i class="bi bi-collection-play-fill fs-5 text-primary"></i>
        </div>
        <div class="hero-video-wrapper">
            <swiper :loop="allVideos.videoArr.length > 2" :modules="[Pagination, Autoplay]" :grab-cursor="true"
                :pagination="{ clickable: true }" :autoplay="{ delay: 4500, disableOnInteraction: false }"
                direction="vertical">

                <swiper-slide v-for="video in allVideos.videoArr" :key="video.id">
                    <div class="d-flex" @click="goToVideoDetail(video.id)">
                        <RouterLink class="video w-50 rounded-3 overflow-hidden" to="">
                            <img :src="video.thumbnail" alt="">
                            <span class="view-count text-white fw-semibold">{{ video.created_since
                                }}</span>
                        </RouterLink>
                        <div class="detail w-50 ps-3">
                            <div class="user_info d-flex align-items-center">
                                <img :src="video.shop.image" alt="" class="rounded-circle me-1">
                                <p class="username m-0 fw-bold ps-1">{{ video.shop.name }}</p>
                            </div>
                            <div class="caption pt-2">
                                <p class="ps-1 fw-semibold video-desc pe-3">{{ video.description }}
                                </p>
                            </div>
                            <div class="price">
                                <p class="text-secondary fw-bolder fs-4" v-if="video.product">
                                    {{ video.product?.price?.discounted_price }} រៀល / <span class="fs-5">{{
                                        video.product?.product_units?.name }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';
import { Autoplay, Pagination } from 'swiper/modules';
import { useAllVideos } from '@/stores/views/videoFeed_store';

const allVideos = useAllVideos();
const router = useRouter()

onMounted(() => {
    allVideos.onloadVideoFilter();

})

function goToVideoDetail(id) {
    router.push({ name: 'video', params: { id } });
}
</script>