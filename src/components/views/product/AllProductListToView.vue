<template>
    <!-- Show products or empty state (not when loading) -->
    <div v-if="!allproducts.isLoading" class="row g-4">
        <!-- Products Grid -->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in allproducts.productArr"
            v-if="allproducts.productArr.length > 0" :key="product.id">
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

        <div v-if="allproducts.productArr.length === 0"
            class="col-12 d-flex flex-column align-items-center justify-content-center text-center py-5">
            <img src="@/assets/images/empty-box-agriculture.svg" alt="No products" class="mb-4"
                style="max-width: 180px;" />

            <h3 class="fw-bold text-secondary mb-2">
                សូមទោស! មិនមានផលិតផលសម្រាប់ប្រភេទនេះទេ
            </h3>
            <p class="text-muted mb-4">
                ការជ្រើសរើសនេះមិនមានទំនិញណាមួយទេ។ សូមព្យាយាមប្រភេទផ្សេង ឬស្វែងរកតាមឈ្មោះផលិតផល
            </p>
        </div>
    </div>

    <div v-if="!allproducts.isLoading && allproducts.productArr.length > 0"
        class="pagination-wrapper mt-5 d-flex justify-content-center align-items-center gap-2">
        <!-- Previous Button -->
        <button class="btn btn-outline-success" @click="goToPage(allproducts.currentPage - 1)"
            :disabled="allproducts.currentPage === 1">
            <i class="bi bi-chevron-left"></i> មុន
        </button>

        <!-- Page Numbers -->
        <button v-for="page in totalPages" :key="page" class="btn"
            :class="page === allproducts.currentPage ? 'btn-success' : 'btn-outline-success'" @click="goToPage(page)">
            {{ page }}
        </button>

        <!-- Next Button -->
        <button class="btn btn-outline-success" @click="goToPage(allproducts.currentPage + 1)"
            :disabled="allproducts.currentPage === totalPages">
            បន្ទាប់ <i class="bi bi-chevron-right"></i>
        </button>
    </div>

    <!-- Pagination Info -->
    <div v-if="!allproducts.isLoading && allproducts.productArr.length > 0" class="text-center mt-3 text-muted">
        បង្ហាញ {{ allproducts.productArr.length }} ក្នុងចំណោម {{ allproducts.totalProducts }} ផលិតផល
        (ទំព័រ {{ allproducts.currentPage }} / {{ totalPages }})
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAllProducts } from '@/stores/views/allProduct_store';
import { useCardStore } from '@/stores/card_store';

const { t } = useI18n()
const router = useRouter()

const allproducts = useAllProducts()
const cartListStore = useCardStore()

const totalPages = computed(() => {
    return Math.ceil(allproducts.totalProducts / allproducts.itemsPerPage) || 1;
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        allproducts.currentPage = page;
        allproducts.GetAllProducts();
    }
};

async function OnSavefav(id) {
    const result = await allproducts.addToFavorite(id);
    if (result) {
        cartListStore.onLoadFav();
    }
}

async function AddToCart(id) {
    const result = await allproducts.addToCart(id);
    if (result) {
        cartListStore.onLoadCart();
    }
}

const goToDetail = (id) => {
    router.push({ name: "detailproduct", query: { id } });
};
</script>

<style scoped>
.pagination-wrapper .btn {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pagination-wrapper .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>