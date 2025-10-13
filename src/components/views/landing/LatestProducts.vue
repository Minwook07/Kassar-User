<template>
    <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="fade-up" v-for="product in allProduct.productArr"
            :key="product.id">
            <div class="product-card h-100" @click="goToDetail(product.id)">
                <!-- Image Container -->
                <div class="product-image-wrapper">
                    <div class="image-container">
                        <img :src="product.product_thumbnail" :alt="product.name" class="product-image" />
                    </div>

                    <!-- Discount Badge -->
                    <div v-for="promotion in product.promotions || []" :key="promotion.id" class="discount-badge">
                        <span class="discount-percentage">-{{ promotion?.discount_rate }}%</span>
                    </div>

                    <!-- Favorite Button -->
                    <button class="favorite-btn" @click.stop="OnSavefav(product.id)"
                        :class="{ active: product.is_favorited }">
                        <i :class="product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                    </button>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                    <!-- Category & Rating -->
                    <div class="card-header-info">
                        <span class="category-tag">
                            {{ t('categories.' + product.category.name) }}
                        </span>
                        <div class="rating">
                            <i class="bi bi-star-fill"></i>
                            <span>{{ product.rating.average }}</span>
                        </div>
                    </div>

                    <!-- Product Title -->
                    <h5 class="product-title">{{ product.name }}</h5>

                    <!-- Product Description -->
                    <p class="product-description">
                        {{ product.description }}
                    </p>

                    <!-- Price & Cart Button -->
                    <div class="card-footer-content">
                        <div class="price-container">
                            <div v-if="product.price && product.price.has_discount !== false">
                                <div class="current-price">
                                    {{ product.price.discounted_price }} រៀល
                                </div>
                                <div class="price-details">
                                    <span class="original-price">{{ product.price.original }} រៀល</span>
                                    <span class="unit-separator">•</span>
                                    <span class="unit">{{ t('product_units.' + (product.product_units?.name || ''))
                                        }}</span>
                                </div>
                            </div>
                            <div v-else>
                                <div class="current-price">
                                    {{ product.price.original }} រៀល
                                </div>
                                <div class="unit-text">
                                    {{ t('product_units.' + (product.product_units?.name || '')) }}
                                </div>
                            </div>
                        </div>

                        <button class="cart-btn" @click.stop="AddToCart(product.id)">
                            <i class="bi bi-bag-plus-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAllProducts } from '@/stores/views/allProduct_store';
import { useCardStore } from '@/stores/card_store';
import { useRouter } from 'vue-router';

const router = useRouter()
const { t } = useI18n()

const allProduct = useAllProducts()
const cartListStore = useCardStore();

onMounted(() => {
    allProduct.onloadProduct();
})

const goToDetail = (id) => {
    router.push({ name: 'detailproduct', query: { id: id } });
};

async function OnSavefav(id) {
    const result = await allProduct.addToFavorite(id);
    if (result) {
        cartListStore.onLoadFav();
    }
}

async function AddToCart(id) {
    const result = await allProduct.addToCart(id);
    if (result) {
        cartListStore.onLoadCart();
    }
}
</script>
