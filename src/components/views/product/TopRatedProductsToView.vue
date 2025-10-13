<template>
    <div class="top-rated-card" v-if="topRatedProduct_store.topRatedPro && topRatedProduct_store.topRatedPro > 0">
        <div class="card-header bg-success text-white rounded-top">
            <h6 class="mb-0 fw-semibold">
                <i class="bi bi-star-fill me-2"></i>ផលិតផលវាយតម្លៃខ្ពស់
            </h6>
        </div>
        <div class="card-body p-3">
            <div v-for="topRatedPro in topRatedPros.slice(0, 3)" :key="topRatedPro.id"
                class="top-rated-item mb-3 p-2 rounded cursor-pointer" @click="goToDetail(topRatedPro.id)">
                <div class="row g-2 align-items-center">
                    <div class="col-4">
                        <div class="product-thumb">
                            <img :src="topRatedPro.product_thumbnail" alt="Product" class="img-fluid rounded" />
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="stars d-flex mb-1">
                            <i v-for="n in 5" :key="n" class="bi bi-star-fill text-warning small"></i>
                        </div>
                        <p class="product-name mb-1 small fw-semibold">{{ topRatedPro.name }}</p>
                        <div class="product-price text-success fw-bold small">
                            {{ topRatedPro.price.discounted_price }}<sup>៛</sup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTopRatedProduct } from '@/stores/views/topRatedProduct_store';

const topRatedProduct_store = useTopRatedProduct()


</script>