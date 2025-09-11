<template>
    <HeroBanner />
    <section class="product-section mt-4">
        <div class="container-fluid">
            <nav class="my-3">
                <div class="nav nav-underline" id="nav-tab" role="tablist">
                    <button class="nav-link fs-5 active" id="nav-home-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                        aria-selected="true">ផលិតផលថ្មីៗ</button>
                    <button class="nav-link fs-5" id="nav-profile-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                        aria-selected="false">ផលិតផលលក់ដាច់</button>

                </div>
            </nav>
            <div class="tab-content shadow-none" id="nav-tabContent">
                <!-- Latest Product -->
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                    tabindex="0">
                    <LatestProducts />
                </div>

                <!-- Most Sell Product -->
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                    tabindex="0">
                    <BestSellProducts />
                </div>
            </div>
            <div class="w-100 d-flex justify-content-center mt-4" v-if="allProduct.products.length > 0">
                <RouterLink to="/allproducts" type="button" class="btn-primary text-decoration-none px-3 py-2 rounded">
                    មើលបន្ថែម</RouterLink>
            </div>
        </div>
    </section>
    <VideoReel />
    <BlogView />
    <ToastView />
</template>

<script setup>
import HeroBanner from './hero/HeroBanner.vue';
import ToastView from '../toast/ToastView.vue';
import BlogView from './BlogView.vue';
import VideoReel from './VideoReel.vue';
import LatestProducts from './LatestProducts.vue';
import BestSellProducts from './BestSellProducts.vue';
import { useAllProducts } from '@/stores/views/allProduct_store';
import { onMounted } from 'vue';

const allProduct = useAllProducts()

onMounted(() => {
    allProduct.onloadProduct()
})
</script>
