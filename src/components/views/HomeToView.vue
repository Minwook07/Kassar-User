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
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                    tabindex="0">
                    <div class="row">
                        <div class="col-6 col-md-4 col-lg-3 mb-3 h-100" v-for="product in allProduct.productArr"
                            :key="product.id">
                            <div class="bg-white card card-product border-0 rounded position-relative"
                                data-aos="fade-up" data-aos-delay="100">
                                <div class="card-img p-3">
                                    <img :src="product.product_thumbnail"
                                        class="mycard-img-top rounded-top object-fit-cover" alt="" />
                                </div>
                                <div class="p-3 card-body pb-0" @click="goToDetail(product.id)">
                                    <div class="d-flex justify-content-between">
                                        <p class="text-primary mb-1">{{ product.category.name }}</p>
                                        <p class="mb-1">
                                            <span class="text-warning me-2"><i class="bi bi-star-fill"></i></span>{{
                                                product.rating.average }}
                                        </p>
                                    </div>
                                    <h4 class="fw-bold product_name">{{ product.name }}</h4>
                                    <p class="product-desc">{{ product.description }}</p>

                                </div>
                                <div class="card-footer bg-transparent border-0 pt-0">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p v-if="!(product.price.discount_rate == 0)"
                                                class="text-decoration-line-through text-paragraph m-0">
                                                {{ product.price.original }} ៛</p>
                                            <h6 class="text-primary m-0 fw-bold">
                                                {{ product.price.discounted_price }} ៛ / {{ product.product_units.name
                                                }}
                                            </h6>
                                        </div>
                                        <p @click="addToCart(product.id)" class="btn btn-primary rounded-pill"><i
                                                class="bi bi-bag-fill me-1"></i>កន្ត្រក</p>
                                    </div>
                                </div>
                                <div v-if="!(product.promotions.length == 0)"
                                    class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3">
                                    <p class="mb-0 px-3 text-white">{{ product.promotions.discount_rate }}%</p>
                                </div>

                                <div class="position-absolute border border-dark-subtle bg-white top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                                    @click="OnSavefav(product.id)">
                                    <p class="mb-0 mt-1 text-danger fw-bold">
                                        <i :class="product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                    tabindex="0">
                    <div class="row">
                        <div class="col-6 col-md-4 col-lg-3 mb-3" v-for="product in allProduct.productArr"
                            :key="product.id">
                            <div class="bg-white card card-product border-0 rounded position-relative"
                                data-aos="fade-up" data-aos-delay="100">
                                <div class="card-img p-3">
                                    <img :src="product.product_thumbnail"
                                        class="mycard-img-top rounded-top object-fit-cover" alt="" />
                                </div>
                                <div class="p-3 card-body pb-0" @click="goToDetail(product.id)">
                                    <div class="d-flex justify-content-between">
                                        <p class="text-primary mb-1">{{ product.category.name }}</p>
                                        <p class="mb-1">
                                            <span class="text-warning me-2"><i class="bi bi-star-fill"></i></span>{{
                                                product.rating.average }}
                                        </p>
                                    </div>
                                    <h4 class="fw-bold product_name">{{ product.name }}</h4>
                                    <p class="product-desc">{{ product.description }}</p>

                                </div>
                                <div class="card-footer bg-transparent border-0 pt-0">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p v-if="!(product.price.discount_rate == 0)"
                                                class="text-decoration-line-through text-paragraph m-0">
                                                {{ product.price.original }} ៛</p>
                                            <h6 class="text-primary m-0 fw-bold">
                                                {{ product.price.discounted_price }} ៛ / {{ product.product_units.name
                                                }}
                                            </h6>
                                        </div>
                                        <p @click="addToCart(product.id)" class="btn btn-primary rounded-pill"><i
                                                class="bi bi-bag-fill me-1"></i>កន្ត្រក</p>
                                    </div>
                                </div>
                                <div v-if="!(product.promotions.length == 0)"
                                    class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3">
                                    <p class="mb-0 px-3 text-white">{{ product.promotions.discount_rate }}%</p>
                                </div>

                                <div class="position-absolute border border-dark-subtle bg-white top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                                    @click="OnSavefav(product.id)">
                                    <p class="mb-0 mt-1 text-danger fw-bold">
                                        <i :class="allProduct.isFav
                                            ? 'bi bi-heart-fill'
                                            : 'bi bi-heart'
                                            "></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="w-100 d-flex justify-content-center mt-4">
                <RouterLink to="/allproducts" type="button" class="btn-primary text-decoration-none px-3 py-2 rounded">
                    មើលបន្ថែម</RouterLink>
            </div>
        </div>
    </section>
    <section class="video-section">
        <div class="container-fluid">
            <div class="w-100 d-flex justify-content-start">
                <p class="m-0 pe-1 text-secondary fw-semibold fs-3">វីដេអូ</p> <i
                    class="bi bi-collection-play fs-3 text-secondary"></i>
            </div>
            <div class="row pe-3">
                <div class="col-6 col-lg-3 video-wrapper" v-for="video in allVideos.videoArr" :key="video.id"
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

    <section class="blog-section mt-5 py-5">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-md-6 d-flex image-wrapper justify-content-center justify-content-lg-stretch">
                    <div class="left d-none d-lg-block">
                        <img class="w-50" src="@/assets/images/agriculture-img/agri1.jpg" alt="">
                    </div>
                    <div class="right">
                        <img class="w-100" src="@/assets/images/agriculture-img/agri4.jpg" alt="">
                        <img class="w-50" src="@/assets/images/agriculture-img/agri3.jpg" alt="">
                    </div>
                </div>
                <div class="col-md-6 p-0 px-lg-5 d-flex flex-column align-items-center align-items-md-start">
                    <h1 class="fw-bold text-primary">ទីផ្សារនៃផលិតផលកសិកម្មធម្មជាតិ</h1>
                    <p class="fw-semibold fs-4">
                        បន្លែត្រីនិងសាច់ព្រមទាំងគ្រឿងទេសគ្រប់មុខសុទ្ធតែជាផលិតផលកសិម្មរបស់ប្រជាកសិករខ្មែរ</p>
                    <div
                        class="w-100 bg-primary p-3 rounded-4 d-flex flex-md-wrap blog-badge d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                            <img src="@/assets/images/icons-img/like.png" alt="">
                            <p>ងាយស្រួលប្រើប្រាស់</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <img src="@/assets/images/icons-img/insurance.png" alt="">
                            <p>សុវត្ថិភាពខ្ពស់</p>
                        </div>
                        <div class="d-flex align-items-center ">
                            <img src="@/assets/images/icons-img/mustard-greens.png" alt="">
                            <p>ផលិតផលខ្មែរ100%</p>
                        </div>
                    </div>
                    <ul class="list-unstyled mt-3">
                        <li class="d-flex align-items-center">
                            <i class="bi bi-check fs-3 rounded-circle text-primary"></i>
                            <p class="m-0">ផលិតផលប្រកបដោយគុណភាព និងគ្មានជាតិគីមី</p>
                        </li>
                        <li class="d-flex align-items-center">
                            <i class="bi bi-check fs-3 rounded-circle text-primary"></i>
                            <p class="m-0">ជាគេហទំព័រជួយដល់ទីផ្សារកសិកម្មនៅកម្ពុជា</p>
                        </li>
                    </ul>
                    <RouterLink to="" type="button" class="btn-primary text-decoration-none px-3 py-2 rounded">
                        អានបន្ថែម</RouterLink>
                </div>
            </div>
        </div>
    </section>
    <ToastView />
</template>

<script setup>
import HeroBanner from '../layouts/HeroBanner.vue';
import { useAllProducts } from '@/stores/views/allProduct_store';
import ToastView from './ToastView.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import router from '@/router';
import { useAllVideos } from '@/stores/views/videoFeed_store';
const allProduct = useAllProducts();
const allVideos = useAllVideos();
onMounted(() => {
    allProduct.onloadProduct();
    allVideos.onloadVideoFilter();
});

const goToDetail = (id) => {
    router.push({ name: 'detailproduct', query: { id: id } });
};

const addToCart = (id) => {
    allProduct.addToCart(id);
};

function OnSavefav(id) {
    allProduct.addToFavorite(id);
}

function goToDetailVideo(id) {
    router.push({ name: 'video', query: { id: id } });
}
</script>
