<template>
    <div class="container-fluid ">
        <div class="hero-banner row g-3 mt-4 d-flex align-items-stretch">
            <div class="col-2 d-none d-xl-block">
                <HeroCategories />
            </div>
            <div class="col-xl-10 ">
                <div class="row g-3 h-100">
                    <div class="col col-md-6 h-50 " data-aos="fade-up" data-aos-delay="300">
                        <HeroCarousel />
                    </div>
                    <div class="col-6 d-none d-md-block h-50" data-aos="fade-up" data-aos-delay="300">
                        <HeroLatestProducts />
                    </div>
                    <div class="col-6 d-none d-md-block mt-2 h-50 " data-aos="fade-down" data-aos-delay="500">
                        <HeroVideo />
                    </div>
                    <div class="col-6 d-none d-md-block mt-2 h-50" data-aos="fade-down" data-aos-delay="500">
                        <HeroDiscountProducts />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import 'bootstrap/dist/js/bootstrap.bundle'
import HeroVideo from './HeroVideo.vue';
import HeroCarousel from './HeroCarousel.vue';
import HeroCategories from './HeroCategories.vue';
import HeroDiscountProducts from './HeroDiscountProducts.vue';
import HeroLatestProducts from './HeroLatestProducts.vue';
</script>