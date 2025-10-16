<template>
    <section class="py-5">
        <div class="container-fluid">
            <div class="seller-pf rounded-4" v-if="shops_store.shops">
                <div class="row">
                    <div class="col-12 col-lg-9">
                        <div class="row gap-4">
                            <div class="col-auto position-relative">
                                <div class="pf-seller-avatar">
                                    <img :src="shops_store.shops.avatar" class="object-fit-cover w-100 h-100" alt="" />
                                </div>
                                <p class="mb-0 bg-primary py-1 px-2 text-white position-absolute verify-status rounded">
                                    បានផ្ទៀងផ្ទាត់
                                </p>
                            </div>
                            <div class="col-12 col-lg-8">
                                <div>
                                    <h2 class="fw-bold mb-3" data-aos="fade-down">
                                        {{ shops_store.shops.shop_name }}
                                    </h2>
                                    <p class="text-paragraph fw-medium mb-4" data-aos="fade-up">
                                        {{ shops_store.shops.comment }}
                                    </p>
                                    <div data-aos="zoom-in-up" class="d-flex align-items-center gap-2">
                                        <p class="mb-0 text-warning fs-3 me-2">
                                            <i class="bi bi-star-fill"></i>
                                        </p>
                                        <p class="mb-0 fw-bold">9.9 (វាយតម្លៃ​ 156ដង)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div
                            class="d-flex align-items-center justify-content-center justify-content-lg-end gap-2 mt-3 mt-md-0">
                            <button v-if="shops_store.shops && shops_store.shops.id"
                                @click="shops_store.toggleFollow(shops_store.selected_id)" data-aos="fade-down"
                                class="btn btn-primary">
                                <i :class="shops_store.follow?.is_following ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                                <span class="d-none d-md-inline-block ms-2">
                                    {{ shops_store.follow.is_following ? "កំពុងតាមដាន" : "តាមដាន" }}
                                </span>
                            </button>
                            <button @click="onShare()" data-aos="fade-up-left" class="btn btn-share bg-white">
                                <i class="bi bi-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <ShareLinkModalToView />
</template>

<script setup>
import { useShopStore } from '@/stores/views/shops_store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ShareLinkModalToView from './ShareLinkModalToView.vue';

const shops_store = useShopStore()
const route = useRoute()

const onShare = () => {
    if (shops_store.mdl_share) {
        shops_store.mdl_share.show();
    } else {
        console.warn("Modal not initialized yet");
    }
}

onMounted(async () => {
    const loaded = await shops_store.onloadShop(route.query.id);
    if (loaded) {
        await shops_store.checkFollowStatus(route.query.id);
    }
});
</script>