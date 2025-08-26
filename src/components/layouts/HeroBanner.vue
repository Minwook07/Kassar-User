<template>
    <div class="container-fluid ">
        <div class="hero-banner row g-3 mt-4 d-flex align-items-stretch">
            <div class="col-2 d-none d-xl-block">
                <div class="rounded-3 overflow-hidden bg-white category-side h-100 shadow-sm" data-aos="fade-left">
                    <div class="text-center category-title">
                        <p class="fw-bold fs-5 text-white py-2 m-0">ប្រភេទផលិតផល</p>
                    </div>
                    <ul class="category-list list-unstyled">
                        <li class="category-item" v-for="category in categoryStore.categories" :key="category.id">
                            <RouterLink class="nav-link category-link" :to="{
                                path: '/allproducts',
                                query: { category_id: category.id }
                                }">{{ category.name }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xl-10 ">
                <div class="row g-3 h-100">
                    <div class="col col-md-6 h-50 " data-aos="fade-up" data-aos-delay="300">
                        <div class="product-hero">
                            <div id="heroCarouselAds"
                                class="carousel carousel-fade slide rounded-3 h-100 overflow-hidden shadow-sm"
                                data-bs-ride="carousel" data-bs-touch="true">
                                <div class="carousel-indicators ">
                                    <button type="button" data-bs-target="#heroCarouselAds" data-bs-slide-to="0"
                                        class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#heroCarouselAds" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#heroCarouselAds" data-bs-slide-to="2"
                                        aria-label="Slide 2"></button>
                                </div>
                                <div class="carousel-inner h-100">
                                    <div class="carousel-item active h-100">
                                        <img src="@/assets/images/hero_banner/hero4.gif" alt="...">
                                    </div>
                                    <div class="carousel-item h-100">
                                        <img src="@/assets/images/hero_banner/hero2.jpg" alt="...">
                                    </div>
                                    <div class="carousel-item h-100">
                                        <img src="@/assets/images/hero_banner/hero3.gif" alt="...">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#heroCarouselAds"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#heroCarouselAds"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-none d-md-block h-50" data-aos="fade-up" data-aos-delay="300">
                        <div class="product-hero hero-product rounded-3 py-2 px-3 shadow-sm">
                            <div class="latest_products">
                                <div class="title d-flex align-items-center">
                                    <p class="m-0 fw-semibold text-secondary">ផលិតផលថ្មីៗ</p>
                                    <span class="badge rounded-2 text-bg-success ms-1">ផលិតផលចុងក្រោយបំផុត</span>
                                </div>
                                <div class="products-wrapper row align-items-center pt-3 ">
                                    <div class="product col-4 col-md-3" v-for="product in allProduct.latestPro.slice(0, 4)"
                                        :key="product.id" @click="goToDetail(product.id)">
                                        <div class="latest_product_img">
                                            <img class="latest_product_img" :src="product.product_thumbnail" alt="">
                                        </div>
                                        <div
                                            class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                            <p class="m-0 name">{{ product.name }}</p>
                                            <span>៛{{ product.price.discounted_price }}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-none d-md-block mt-2 h-50 " data-aos="fade-down" data-aos-delay="500">
                        <div class="product-hero rounded-3 hero-video py-2 px-3 shadow-sm">
                            <div class="title d-flex align-items-center">
                                <p class="m-0 pe-1 fw-semibold">វីដេអូ</p> <i
                                    class="bi bi-collection-play-fill fs-5 text-primary"></i>
                            </div>
                            <div class="hero-video-wrapper">
                                <swiper :modules="[Pagination, Autoplay]" :grab-cursor="true" :loop="true" :pagination="{
                                    clickable: true,
                                }" class="mySwiper" :autoplay="{
                                    delay: 4500,
                                    disableOnInteraction: false,
                                }" :direction="'vertical'">
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
                                                        {{ video.product?.price.discounted_price }} ៛ / <span
                                                            class="fs-5">{{ video.product?.product_units.name }}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-none d-md-block mt-2 h-50" data-aos="fade-down" data-aos-delay="500">
                        <div class="hero-discount product-hero d-flex">
                            <div class="product w-50 rounded-3 shadow-sm py-2 px-3 h-100
                            d-flex flex-column justify-content-between align-items-center "
                                v-for="product in allProduct.discountPro.slice(0,2)" :key="product.id"
                                @click="goToDetail(product.id)">
                                <div class="title w-100 d-flex align-items-center justify-content-start mb-2">
                                    <p class="m-0 fw-semibold text-secondary">បញ្ចុះតម្លៃ</p>
                                    <span class="badge rounded-2 ms-1">ជារៀងរាល់ថ្ងៃ​</span>
                                </div>
                                <div class="discount_product_img">
                                    <img :src="product.product_thumbnail" alt="">
                                </div>
                                <div class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                    <p class="m-0 name">{{ product.name }}</p>
                                    <span>៛{{ product.price.discounted_price }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import 'bootstrap/dist/js/bootstrap.bundle'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import router from '@/router';
import { onMounted } from 'vue';
import { useAllVideos } from '@/stores/views/videoFeed_store';
import { useAllProducts } from '@/stores/views/allProduct_store';
import { useCategoryStore } from '@/stores/views/categories_store';

const allVideos = useAllVideos();
const allProduct = useAllProducts();
const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.GetAllCategories();
    allProduct.onloadLatestProduct(4, 1, 'desc');
    allProduct.onloadDiscountProduct(2, 1, 'asc');
    allVideos.onloadVideoFilter();

})

function goToVideoDetail(id) {
    router.push({ name: 'video', params: { id } });
}

const goToDetail = (id) => {
    router.push({ name: 'detailproduct', query: { id: id } });
    console.log(id);

};
</script>