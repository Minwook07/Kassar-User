<template>
    <HeroBanner />
    <section class="product-section mt-4">
        <div class="container-fluid">
            <nav>
                <div class="nav nav-underline" id="nav-tab" role="tablist">
                    <button class="nav-link fs-5 active" id="nav-home-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                        aria-selected="true">ផលិតផលថ្មីៗ</button>
                    <button class="nav-link fs-5" id="nav-profile-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                        aria-selected="false">ផលិតផលលក់ដាច់</button>

                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                    tabindex="0">...</div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                    tabindex="0">...</div>

            </div>
            <div class="w-100 d-flex justify-content-center mt-4">
                <RouterLink to="" type="button" class="btn-primary text-decoration-none p-1 rounded">
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
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="col-3 video-wrapper">
                    <RouterLink class="text-decoration-none" to="">
                        <div class="video" to="">
                            <img src="@/assets/images/products/video_sample.jpg" alt="">
                            <span class="view-count fs-6 fw-semibold text-white">11.5K views</span>
                        </div>
                        <div class="caption mt-2">
                            <p class="text-black fw-semibold m-0">សាច់គោងៀត
                                ផលិតផលខេត្តកំពង់ចាម
                                ធានាអនាម័យ
                                ១០០%</p>
                        </div>
                        <div class="user_info d-flex align-items-center">
                            <img src="@/assets/images/user_pf_sample.jpg" alt="">
                            <p class="username m-0 fw-bold ps-1 text-black">Thy Farm Store</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-center mt-4">
                <RouterLink to="" type="button" class="btn-primary text-decoration-none p-1 rounded">
                    មើលបន្ថែម</RouterLink>
            </div>
        </div>
    </section>

    <section class="blog-section mt-5">
        <div class="container">
            <div class="row">
                <div class="col-6 d-flex image-wrapper">
                    <div class="w-50 left">
                        <img class="w-50" src="@/assets/images/agriculture-img/agri1.jpg" alt="">
                    </div>
                    <div class="w-50 right">
                        <img class="w-100" src="@/assets/images/agriculture-img/agri4.jpg" alt="">
                        <img class="w-50" src="@/assets/images/agriculture-img/agri3.jpg" alt="">
                    </div>
                </div>
                <div class="col-6 px-5">
                    <h1 class="fw-bold text-primary">ទីផ្សារនៃផលិតផលកសិកម្មធម្មជាតិ</h1>
                    <p class="fw-semibold fs-4">
                        បន្លែត្រីនិងសាច់ព្រមទាំងគ្រឿងទេសគ្រប់មុខសុទ្ធតែជាផលិតផលកសិម្មរបស់ប្រជាកសិករខ្មែរ</p>
                    <div class="w-100 bg-primary p-3 rounded-4 d-flex blog-badge d-flex justify-content-between">
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
                    <div class="w-100 d-flex justify-content-start mt-4">
                        <RouterLink to="" type="button" class="btn-primary text-decoration-none px-3 py-2 rounded">
                            អានបន្ថែម</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import HeroBanner from '../layouts/HeroBanner.vue';


</script>
