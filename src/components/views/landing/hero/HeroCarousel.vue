<template>
    <div class="product-hero">
        <div id="heroCarouselAds" class="carousel carousel-fade slide rounded-3 h-100 overflow-hidden shadow-sm"
            data-bs-ride="carousel" data-bs-touch="true">
            <div class="carousel-indicators ">
                <button type="button" data-bs-target="#heroCarouselAds" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
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
            <button class="carousel-control-prev" type="button" data-bs-target="#heroCarouselAds" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#heroCarouselAds" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>