<template>
    <div>
        <!-- Grid View -->
        <div v-if="allproducts.viewMode === 'grid'" class="row g-4">
            <template v-if="allproducts.productArr.length > 0">
                <div class="col-12 col-sm-6 col-md-4" v-for="product in allproducts.productArr" :key="product.id">
                    <div class="product-card h-100" @click="goToDetail(product.id)">
                        <div class="product-image-wrapper">
                            <div class="image-container">
                                <img :src="product.product_thumbnail" :alt="product.name" class="product-image" />
                            </div>

                            <div v-for="promotion in product.promotions || []" :key="promotion.id"
                                class="discount-badge">
                                <span class="discount-percentage">-{{ promotion?.discount_rate }}%</span>
                            </div>

                            <button class="favorite-btn" @click.stop="OnSavefav(product.id)"
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
                                            {{ formatPrice(product.price.discounted_price) }} រៀល
                                        </div>
                                        <div class="price-details">
                                            <span class="original-price">{{ formatPrice(product.price.original) }}
                                                រៀល</span>
                                            <span class="unit-separator">•</span>
                                            <span class="unit">{{ t('product_units.' + (product.product_units?.name ||
                                                ''))
                                            }}</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="current-price">
                                            {{ formatPrice(product.price.original) }} រៀល
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
            </template>
        </div>

        <!-- List View -->
        <div v-else-if="allproducts.viewMode === 'list'" class="list-view">
            <template v-if="allproducts.productArr.length > 0">
                <div v-for="product in allproducts.productArr" :key="product.id" class="product-list-item mb-3"
                    @click="goToDetail(product.id)">
                    <div class="row g-0">
                        <!-- Image Column -->
                        <div class="col-12 col-md-3 col-lg-2">
                            <div class="list-image-wrapper">
                                <img :src="product.product_thumbnail" :alt="product.name" class="list-product-image" />

                                <div v-for="promotion in product.promotions || []" :key="promotion.id"
                                    class="list-discount-badge">
                                    <span>-{{ promotion?.discount_rate }}%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Content Column -->
                        <div class="col-12 col-md-9 col-lg-10">
                            <div class="list-card-body">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                        <!-- Header Info -->
                                        <div class="d-flex align-items-center gap-3 mb-2">
                                            <span class="category-tag">
                                                {{ t('categories.' + product.category.name) }}
                                            </span>
                                            <div class="rating">
                                                <i class="bi bi-star-fill"></i>
                                                <span>{{ product.rating.average }}</span>
                                                <span class="text-muted ms-1">({{ product.rating.count }})</span>
                                            </div>
                                        </div>

                                        <!-- Product Name -->
                                        <h5 class="list-product-title">{{ product.name }}</h5>

                                        <!-- Shop Name -->
                                        <p class="text-muted small mb-2">
                                            <i class="bi bi-shop me-1"></i>{{ product.shop.name }}
                                        </p>

                                        <!-- Description -->
                                        <p class="list-product-description">
                                            {{ product.description }}
                                        </p>

                                        <!-- Price & Actions Row -->
                                        <div
                                            class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3">
                                            <!-- Price -->
                                            <div class="price-container">
                                                <div v-if="product.price && product.price.has_discount !== false">
                                                    <div class="current-price mb-1">
                                                        {{ formatPrice(product.price.discounted_price) }} រៀល
                                                    </div>
                                                    <div class="price-details">
                                                        <span class="original-price">{{
                                                            formatPrice(product.price.original) }} រៀល</span>
                                                        <span class="unit-separator">•</span>
                                                        <span class="unit">{{ t('product_units.' +
                                                            (product.product_units?.name || '')) }}</span>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <div class="current-price mb-1">
                                                        {{ formatPrice(product.price.original) }} រៀល
                                                    </div>
                                                    <div class="unit-text">
                                                        {{ t('product_units.' + (product.product_units?.name || '')) }}
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Action Buttons -->
                                            <div class="d-flex gap-2">
                                                <button
                                                    class="btn btn-outline-primary btn-sm rounded-5 px-4 me-1 d-flex align-items-center"
                                                    @click.stop="goToDetail(product.id)">
                                                    <i class="fa-solid fa-eye me-1"></i> មើល
                                                </button>
                                                <button
                                                    class="btn btn-primary btn-sm rounded-5 px-2 px-lg-4 py-2 d-flex align-items-center"
                                                    @click.stop="AddToCart(product.id)">
                                                    <i class="bi bi-bag-plus-fill me-1"></i> ទិញ
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Favorite Button -->
                                    <button class="favorite-btn-list ms-3" @click.stop="OnSavefav(product.id)"
                                        :class="{ active: product.is_favorited }">
                                        <i :class="product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <!-- Empty State -->
        <div v-if="allproducts.productArr.length === 0"
            class="d-flex flex-column align-items-center justify-content-center text-center py-5">
            <img src="@/assets/images/empty-box-agriculture.svg" alt="No products" class="mb-4"
                style="max-width: 180px;" />

            <h3 class="fw-bold text-secondary mb-2">
                សូមទោស! មិនមានផលិតផលសម្រាប់ប្រភេទនេះទេ
            </h3>
            <p class="text-muted mb-4">
                ការជ្រើសរើសនេះមិនមានទំនិញណាមួយទេ។ សូមព្យាយាមប្រភេទផ្សេង ឬស្វែងរកតាមឈ្មោះផលិតផល
            </p>
        </div>

        <!-- Pagination -->
        <div v-if="!allproducts.isLoading && allproducts.productArr.length > 0"
            class="pagination-wrapper mt-5 d-flex justify-content-center align-items-center gap-2">
            <!-- Previous Button -->
            <button class="btn btn-outline-success" @click="goToPage(allproducts.currentPage - 1)"
                :disabled="allproducts.currentPage === 1">
                <i class="bi bi-chevron-left"></i> មុន
            </button>

            <!-- Page Numbers -->
            <button v-for="page in totalPages" :key="page" class="btn"
                :class="page === allproducts.currentPage ? 'btn-success' : 'btn-outline-success'"
                @click="goToPage(page)">
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
        </div>
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

const formatPrice = (value) => {
    if (value == null || value === '') return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        allproducts.currentPage = page;
        allproducts.GetAllProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
/* Pagination */
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

/* List View Styles */
.list-view {
    width: 100%;
}

.product-list-item {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
}

.product-list-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.list-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
    overflow: hidden;
}

.list-product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-list-item:hover .list-product-image {
    transform: scale(1.05);
}

.list-discount-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #dc3545;
    color: white;
    padding: 4px 12px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    z-index: 1;
}

.list-card-body {
    padding: 1.5rem;
}

.list-product-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.list-product-description {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
    .list-image-wrapper {
        min-height: 200px;
    }

    .list-card-body {
        padding: 1rem;
    }

    .list-product-title {
        font-size: 1.1rem;
    }

    .favorite-btn-list {
        width: 40px;
        height: 40px;
    }
}

@media (max-width: 576px) {
    .list-image-wrapper {
        min-height: 180px;
    }
}
</style>