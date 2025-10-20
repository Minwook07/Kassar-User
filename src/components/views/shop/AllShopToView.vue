<template>
    <div class="container-fluid my-5 p-0">
        <h1 class="mb-5 fw-bold text-success">
            🌱 ហាងទាំងអស់ដែលមាន
        </h1>

        <!-- Loading State -->
        <div v-if="shopStore.loading" class="text-center py-5">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-muted">កំពុងផ្ទុកហាង...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="shopStore.error" class="alert alert-danger text-center rounded-3 shadow-sm">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            {{ shopStore.error }}
        </div>

        <!-- Shop Grid -->
        <div v-else class="row g-4">
            <div v-for="shop in shopStore.shops" :key="shop.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="shop-card h-100 rounded-4 border-0 shadow-sm overflow-hidden transition-all">
                    <div class="d-flex justify-content-center align-items-center"
                        style="height: 200px; overflow: hidden;">
                        <img :src="shop.avatar" class="object-fit-cover" alt="Shop Avatar"
                            style="height: 180px; object-fit: cover;" />
                    </div>

                    <div class="p-3">
                        <h5 class="fw-bold mb-1 text-dark">
                            {{ shop.shop_name }}
                        </h5>
                        <p class="text-muted small mb-2">{{ shop.comment }}</p>

                        <div class="d-flex align-items-center text-muted small mb-3">
                            <i class="fa-solid fa-basket-shopping text-success me-1"></i>
                            <span>{{ shop.total_products }} ផលិតផល</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <a :href="`tel:${shop.phone}`" class="text-decoration-none text-success small">
                                <i class="fa-solid fa-phone me-1"></i> ខលទូរសព្ទ
                            </a>
                            <button class="btn btn-success btn-sm px-3 rounded-pill fw-medium">
                                មើលហាង
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="!shopStore.loading"
            class="pagination-wrapper mt-5 d-flex justify-content-center align-items-center gap-2">
            <!-- Previous Button -->
            <button class="btn btn-outline-success" @click="goToPage(shopStore.currentPage - 1)"
                :disabled="shopStore.currentPage === 1">
                <i class="bi bi-chevron-left"></i> មុន
            </button>

            <!-- Page Numbers -->
            <button v-for="page in shopStore.totalPages" :key="page" class="btn"
                :class="page === shopStore.currentPage ? 'btn-success' : 'btn-outline-success'" @click="goToPage(page)">
                {{ page }}
            </button>

            <!-- Next Button -->
            <button class="btn btn-outline-success" @click="goToPage(shopStore.currentPage + 1)"
                :disabled="shopStore.currentPage === shopStore.totalPages">
                បន្ទាប់ <i class="bi bi-chevron-right"></i>
            </button>
        </div>

        <!-- Pagination Info -->
        <div v-if="!shopStore.loading && shopStore.pagination" class="text-center mt-3 text-muted">
            បង្ហាញ {{ shopStore.pagination.first_item }} ក្នុងចំណោម {{ shopStore.pagination.last_item }}
            នៃ {{ shopStore.pagination.total }} ហាង
        </div>
    </div>
</template>

<script setup>
import { useAllShopStore } from '@/stores/views/allShop_store'
import { onMounted } from 'vue'

const shopStore = useAllShopStore()

onMounted(() => {
    shopStore.getShopLoad()
})

const goToPage = (page) => {
    // Prevent invalid pages
    if (page < 1 || page > shopStore.totalPages) return
    shopStore.getShopLoad(page)
}
</script>

<style scoped>
.shop-card {
    background: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.shop-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(34, 193, 89, 0.15);
}

.shop-card img {
    transition: opacity 0.3s ease;
}

.shop-card:hover img {
    opacity: 0.95;
}
</style>