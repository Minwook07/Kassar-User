<template>
    <div class="container-fluid">
        <div class="hero-banner row mt-4">
            <div class="col-2 rounded-3 p-0 overflow-hidden category-side d-none d-xl-block">
                <div class="text-center category-title">
                    <p class="fw-bold fs-5 text-white py-2 m-0">ប្រភេទផលិតផល</p>
                </div>
                <ul class="category-list list-unstyled">
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">ត្រី</RouterLink>
                    </li>
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">បន្លែ</RouterLink>
                    </li>
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">ផ្លែឈើ</RouterLink>
                    </li>
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">អង្ករ</RouterLink>
                    </li>
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">គ្រឿងទេស</RouterLink>
                    </li>
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">អាហារគ្រៀម</RouterLink>
                    </li>
                    <li class="category-item">
                        <RouterLink class="nav-link category-link" to="/allproducts">អាហារសម្រន</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="col-xl-10 row product-hero-section p-0">
                <div class="col-6 p-0 ps-4 d-flex flex-wrap">
                    <div class="w-100 product-hero pb-2">
                        <div class="rounded-3 h-100 overflow-hidden">
                            <div id="heroCarouselAds" class="carousel carousel-fade slide h-100" data-bs-ride="carousel"
                                data-bs-touch="true">
                                <div class="carousel-indicators ">
                                    <button type="button" data-bs-target="#heroCarouselAds" data-bs-slide-to="0"
                                        class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#heroCarouselAds" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#" data-bs-slide-to="2heroCarouselAds"
                                        aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner ">
                                    <div class="carousel-item active">
                                        <img src="@/assets/images/hero_banner/hero1.jpg" alt="...">
                                    </div>
                                    <div class="carousel-item ">
                                        <img src="@/assets/images/hero_banner/hero2.jpg" alt="...">
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
                    <div class="w-100 product-hero pt-3">
                        <div class="h-100 rounded-3 hero-video py-2 px-3">
                            <div class="title d-flex align-items-center">
                                <p class="m-0 pe-1 fw-semibold">វីដេអូ</p> <i class="bi bi-collection-play-fill fs-5 text-primary"></i>
                            </div>
                            <div class="hero-video-wrapper">
                                <swiper 
                                :modules="[Pagination, Autoplay]" 
                                :grab-cursor="true" 
                                :loop="true" 
                                :pagination="{
                                    clickable: true,
                                }" 
                                class="mySwiper" 
                                :autoplay="{
                                    delay: 4500,
                                    disableOnInteraction: false,
                                }" 
                                :direction="'vertical'">
                                    <swiper-slide>
                                        <div class="d-flex">
                                            <RouterLink class="video w-50 rounded-3 overflow-hidden" to="">
                                                <img src="@/assets/images/products/product-1.jpg" alt="">
                                                <span class="view-count text-white fw-semibold">10.7k views</span>
                                            </RouterLink>
                                            <div class="detail w-50 ps-3">
                                                <div class="user_info d-flex align-items-center">
                                                    <img src="@/assets/images/user_pf_sample.jpg" alt="">
                                                    <p class="username m-0 fw-bold ps-1">Thy Farm Store</p>
                                                </div>
                                                <div class="caption pt-2">
                                                    <p class="ps-1 fw-semibold ">សាច់គោងៀត
                                                        ផលិតផលខេត្តកំពង់ចាម
                                                        ធានាអនាម័យ
                                                        ១០០%</p>
                                                </div>
                                                <div class="price">
                                                    <p class="text-secondary fw-bolder fs-4">$10.99 / <span
                                                            class="fs-5">Kg</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide>
                                        <div class="d-flex">
                                            <RouterLink class="video w-50 rounded-3 overflow-hidden " to="">
                                                <img src="@/assets/images/products/product-2.jpg" alt="">
                                                <span class="view-count text-white fw-semibold">10.7k views</span>
                                            </RouterLink>
                                            <div class="detail w-50 ps-3">
                                                <div class="user_info d-flex align-items-center">
                                                    <img src="@/assets/images/user_pf_sample.jpg" alt="">
                                                    <p class="username m-0 fw-bold ps-1">Thy Farm Store</p>
                                                </div>
                                                <div class="caption pt-2">
                                                    <p class="ps-1 fw-semibold ">សាច់គោងៀត
                                                        ផលិតផលខេត្តកំពង់ចាម
                                                        ធានាអនាម័យ
                                                        ១០០%</p>
                                                </div>
                                                <div class="price">
                                                    <p class="text-secondary fw-bolder fs-4">$10.99 / <span
                                                            class="fs-5">Kg</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6  p-0 ps-4 d-flex flex-wrap">
                    <div class="w-100 product-hero pb-2">
                        <div class="hero-product h-100 rounded-3 py-2 px-3">
                            <div class="top-selling">
                                <div class="title d-flex align-items-center">
                                    <p class="m-0 fw-semibold text-secondary">ផលិតផលលក់ដាច់ប្រចាំខែ</p>
                                    <span class="badge rounded-2 text-bg-success ms-1">TOP SELLING</span>
                                </div>
                                <div class="products-wrapper row">
                                    <RouterLink class="product p-2 col-4 col-xl-3 " to="/detailproduct">
                                        <img src="@/assets/images/products/product-1.jpg" alt="">
                                        <div
                                            class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                            <p class="m-0">សាច់គោងៀត</p>
                                            <span>$10.99</span>
                                        </div>
                                    </RouterLink>
                                    <RouterLink class="product p-2 col-4 col-xl-3" to="/detailproduct">
                                        <img src="@/assets/images/products/product-2.jpg" alt="">
                                        <div
                                            class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                            <p class="m-0">សាច់គោងៀត</p>
                                            <span>$10.99</span>
                                        </div>
                                    </RouterLink>
                                    <RouterLink class="product p-2 col-4 col-xl-3" to="/detailproduct">
                                        <img src="@/assets/images/products/product-3.jpg" alt="">
                                        <div
                                            class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                            <p class="m-0">សាច់គោងៀត</p>
                                            <span>$10.99</span>
                                        </div>
                                    </RouterLink>
                                    <RouterLink class="product p-2 col-3 d-none d-xl-block" to="/detailproduct">
                                        <img src="@/assets/images/products/product-4.jpg" alt="">
                                        <div
                                            class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                            <p class="m-0">សាច់គោងៀត</p>
                                            <span>$10.99</span>
                                        </div>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hero-discount  w-100 product-hero d-flex  pt-3">
                        <RouterLink class="product w-50 me-4 rounded-3 py-2 px-3" to="/detailproduct">
                            <div class="title w-100 d-flex align-items-center justify-content-start mb-2">
                                <p class="m-0 fw-semibold text-secondary">បញ្ចុះតម្លៃ</p>
                                <span class="badge rounded-2 ms-1">DISCOUNT</span>
                            </div>
                            <img src="@/assets/images/products/product-5.png" alt="">
                            <div class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                <p class="m-0">អង្ករផ្កាម្លិះ</p>
                                <span>$9.99</span>
                            </div>
                        </RouterLink>
                        <RouterLink class="product w-50 rounded-3 py-2 px-3" to="detailproduct">
                            <div class="title w-100 d-flex align-items-center justify-content-start mb-2">
                                <p class="m-0 fw-semibold text-secondary">បញ្ចុះតម្លៃ</p>
                                <span class="badge rounded-2 ms-1">DISCOUNT</span>
                            </div>
                            <img src="@/assets/images/products/product-6.png" alt="">
                            <div class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                                <p class="m-0">អង្ករផ្កាម្លិះ</p>
                                <span>$9.99</span>
                            </div>
                        </RouterLink>
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
</script>