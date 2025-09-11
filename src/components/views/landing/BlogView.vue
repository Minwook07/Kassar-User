<template>
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
                    <RouterLink to="/about" type="button" class="btn-primary text-decoration-none px-3 py-2 rounded">
                        អានបន្ថែម</RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>