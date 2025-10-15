<template>
    <div class="hero-discount product-hero d-flex">
        <div class="product w-50 rounded-3 shadow-sm py-2 px-3 h-100
                            d-flex flex-column justify-content-between align-items-center "
            v-for="product in allProduct.discountPro.slice(0, 2)" :key="product.id" @click="goToDetail(product.id)">
            <div class="title w-100 d-flex align-items-center justify-content-start mb-2">
                <p class="m-0 fw-semibold text-secondary">បញ្ចុះតម្លៃ</p>
                <span class="badge rounded-2 ms-1">ជារៀងរាល់ថ្ងៃ​</span>
            </div>
            <div class="discount_product_img">
                <img :src="product.product_thumbnail" alt="">
            </div>
            <div class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                <p class="m-0 name">{{ product.name }}</p>
                <span>{{ product.price?.discounted_price }} រៀល</span>
                <span class="text-decoration-line-through text-danger small">{{
                    product.price?.original }} រៀល</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAllProducts } from '@/stores/views/allProduct_store';
import { useRouter } from 'vue-router';

import "swiper/css";
import "swiper/css/pagination";

const allProduct = useAllProducts();
const router = useRouter()

onMounted(() => {
    allProduct.onloadDiscountProduct(2, 1, 'asc');

})

const goToDetail = (id) => {
    router.push({ name: 'detailproduct', query: { id: id } });
    console.log(id);

};
</script>