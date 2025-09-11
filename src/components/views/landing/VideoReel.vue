<template>
    <section class="video-section py-5" v-if="allVideos.videoArr.length > 0">
        <div class="container-fluid">
            <div class="w-100 d-flex justify-content-start">
                <p class="m-0 pe-1 text-secondary fw-semibold fs-3">វីដេអូ</p> <i
                    class="bi bi-collection-play fs-3 text-secondary"></i>
            </div>
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-3 video-wrapper" v-for="video in allVideos.videoArr" :key="video.id"
                    @click="goToDetailVideo(video.id)">
                    <RouterLink class="text-decoration-none" to="" data-aos="fade-up" data-aos-delay="100">
                        <div class="video" to="">
                            <img :src="video.thumbnail" alt="">
                            <!-- <span class="view-count fs-6 fw-semibold text-white">11.5K views</span> -->
                            <div class="user_info">
                                <p class="video-desc text-white m-0">{{ video.description }}</p>
                                <div class="d-flex align-items-center mb-2">
                                    <img :src="video.shop?.image" alt="">
                                    <p class="username m-0 ps-1 text-white">{{ video.shop?.name }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">{{video.description}}</p>
                        </div> -->
                    </RouterLink>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-center mt-4">
                <RouterLink to="/video" type="button" class="btn-primary text-decoration-none px-3 py-2 rounded">
                    មើលបន្ថែម</RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAllVideos } from '@/stores/views/videoFeed_store';

const allVideos = useAllVideos();

onMounted(() => {

    allVideos.onloadVideoFilter();
})

function goToDetailVideo(id) {
    router.push({ name: 'video', query: { id: id } });
}
</script>