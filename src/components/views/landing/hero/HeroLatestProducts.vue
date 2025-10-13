<template>
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
                    <div class="detail d-flex flex-column justify-content-center align-items-center pt-2">
                        <p class="m-0 name">{{ product.name }}</p>
                        <span class="text-primary">{{ product.price?.discounted_price }} រៀល</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAllProducts } from '@/stores/views/allProduct_store';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import "swiper/css";
import "swiper/css/pagination";

const router = useRouter()
const allProduct = useAllProducts();
onMounted(() => {
    allProduct.onloadLatestProduct(4, 1, 'desc');
})

const goToDetail = (id) => {
    router.push({ name: 'detailproduct', query: { id: id } });
    console.log(id);
};
</script>