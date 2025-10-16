<template>
    <div class="col-12" v-if="relatedProductStore.related_products && relatedProductStore.related_products.length > 0">
        <div class="similar-products-section">
            <h4 class="section-title fw-bold mb-4">
                <i class="bi bi-grid me-2 text-success"></i>ផលិតផលស្រដៀង
            </h4>
            <div class="row g-4">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="fade-up"
                    v-for="product in relatedProductStore.related_products" :key="product.id">
                    <div class="product-card h-100" @click="goToDetail(product.id)">
                        <div class="product-image-wrapper">
                            <div class="image-container">
                                <img :src="product.product_thumbnail" :alt="product.name" class="product-image" />
                            </div>

                            <div v-for="promotion in product.promotions || []" :key="promotion.id"
                                class="discount-badge">
                                <span class="discount-percentage">-{{ promotion?.discount_rate }}%</span>
                            </div>

                            <button class="favorite-btn" @click.stop="OnSavefav(product)"
                                :class="{ active: product.is_favorited }">
                                <i :class="product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                            </button>
                        </div>

                        <div class="card-body">
                            <div class="card-header-info">
                                <span class="category-tag">
                                    {{ t('categories.' + product.category.name) }}
                                </span>
                                <div class="rating">
                                    <i class="bi bi-star-fill"></i>
                                    <span>{{ product.rating.average }}</span>
                                </div>
                            </div>

                            <h5 class="product-title">{{ product.name }}</h5>

                            <p class="product-description">
                                {{ product.description }}
                            </p>

                            <div class="card-footer-content">
                                <div class="price-container">
                                    <div v-if="product.price && product.price.has_discount !== false">
                                        <div class="current-price">
                                            {{ product.price.discounted_price }} រៀល
                                        </div>
                                        <div class="price-details">
                                            <span class="original-price">{{ product.price.original }} រៀល</span>
                                            <span class="unit-separator">•</span>
                                            <span class="unit">{{ t('product_units.' + (product.product_units?.name ||
                                                '')) }}</span>
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
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useRelatedProduct } from '@/stores/views/relatedProduct_store';
import { useToastStore } from '@/stores/toast_store';
import { useCardStore } from '@/stores/card_store';
import axios from 'axios';
import { onMounted } from 'vue';

const router = useRouter();
const { t } = useI18n();
const relatedProductStore = useRelatedProduct();
const toastStore = useToastStore();
const cartStore = useCardStore();

const goToDetail = (id) => {
    router.push({ name: "detailproduct", query: { id } }).then(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 200);
    });
};

const OnSavefav = async (product) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        toastStore.showToast("សូមចូល​គណនីជា​មុនសិន");
        return;
    }

    try {
        await axios.post(`api/favorites/toggle?product_id=${product.id}`, null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        product.is_favorited = !product.is_favorited;
        cartStore.onLoadFav();
        toastStore.showToast(product.is_favorited ? 'ដាក់ចូលរូចរាល់' : 'ដកចេញរួចរាល់');
    } catch (error) {
        console.error('Error toggling favorite:', error);
        toastStore.showToast('មានបញ្ហា សូមព្យាយាមម្តងទៀត');
    }
};

const AddToCart = async (productId) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        toastStore.showToast("សូមចូល​គណនី​មុន​បន្ថែម​ទំនិញ");
        return;
    }

    try {
        const res = await axios.post("api/cart", { product_id: productId, qty: 1 }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.result) {
            cartStore.onLoadCart();
            toastStore.showToast('ដាក់ចូលកន្ត្រកជោគជ័យ');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        toastStore.showToast('មានបញ្ហា សូមព្យាយាមម្តងទៀត');
    }
};
</script>