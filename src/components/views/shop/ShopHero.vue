<template>
    <section class="py-5">
        <div class="container-fluid">
            <div class="seller-pf row d-flex justify-content-between rounded-4" v-if="shops_store.shops">
                <div class="row col-10 col-md-8 gap-5">
                    <div data-aos="fade-up-right"
                        class="col-12 col-lg-6 pf-seller-main d-flex justify-content-center align-content-center bg-secondary-subtle rounded-4 position-relative">
                        <img :src="shops_store.shops.avatar" alt="" class="pf-seller-avatar" />
                        <p class="mb-0 bg-primary py-1 px-2 text-white position-absolute verify-status rounded">
                            បានផ្ទៀងផ្ទាត់
                        </p>
                    </div>
                    <div class="col-12 col-lg-6">
                        <h2 class="fw-bold mb-3" data-aos="fade-down">
                            {{ shops_store.shops.shop_name }}
                        </h2>
                        <p class="text-paragraph fw-medium mb-4" data-aos="fade-up">
                            {{ shops_store.shops.comment }}
                        </p>
                        <div data-aos="zoom-in-up" class="d-flex align-items-center gap 3">
                            <p class="mb-0 text-warning fs-3 me-2">
                                <i class="bi bi-star-fill"></i>
                            </p>
                            <p class="mb-0 fw-bold">9.9 (វាយតម្លៃ​ 156ដង)</p>
                        </div>
                    </div>
                </div>
                <div class="col-2 col-md-4 text-right d-flex justify-content-end px-0">
                    <div>
                        <button v-if="shops_store.shops && shops_store.shops.id"
                            @click="shops_store.toggleFollow(shops_store.selected_id)" data-aos="fade-down"
                            class="btn btn-primary me-0 me-md-3 mb-3 mb-md-0">
                            <i :class="shops_store.follow?.is_following ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                            <span class="d-none d-md-inline-block ms-2">{{
                                shops_store.follow?.is_following ? "កំពុងតាមដាន" : "តាមដាន"
                                }}</span>
                        </button>
                        <button @click="onShare()" data-aos="fade-up-left" class="btn btn-share bg-white">
                            <i class="bi bi-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useShopStore } from '@/stores/views/shops_store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const shops_store = useShopStore()
const route = useRoute()

onMounted(() => {
    shops_store.onloadShop(route.query.id);
})
</script>