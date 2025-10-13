<template>
    <div class="row g-4">
        <div v-if="allProduct.products.length > 0" class="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="fade-up"
            v-for="product in allProduct.products" :key="product.id">
            <div class="card h-100 border-0 shadow-sm product-card" @click="goToDetail(product.id)"
                style="cursor: pointer!important;">
                <div class="position-relative p-3">
                    <img :src="product.product_thumbnail" alt="" class="card-img-top rounded"
                        style="height: 180px; object-fit: cover;" />
                    <div v-for="promotion in product.promotions" :key="promotion.id"
                        class="position-absolute top-0 start-0 mt-3 ms-3 bg-success text-white px-2 py-1 rounded-pill">
                        {{ promotion.promotions?.discount_rate }} បញ្ចុះតម្លៃ
                    </div>
                    <button class="position-absolute top-0 end-0 mt-3 me-3 btn btn-light rounded-circle p-1"
                        style="width: 35px; height: 35px;" @click.stop="OnSavefav(product.id)">
                        <i :class="product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'" class="text-danger"></i>
                    </button>
                </div>

                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <p class="text-success mb-0">
                            {{ product.category.name }}
                        </p>
                        <p class="mb-0">
                            <i class="bi bi-star-fill text-warning me-1"></i>{{ product.rating.average
                            }}
                        </p>
                    </div>

                    <h5 class="fw-bold mb-2">{{ product.name }}</h5>
                    <p class="text-secondary mb-3 small product-description">
                        {{ product.description }}
                    </p>

                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div v-if="product.price && product.price.has_discount !== false">
                                <p class="text-success fw-bold mb-0">
                                    {{ product.price.discounted_price }}<sup>៛</sup> /
                                    {{ t('product_units.' + (product.product_units?.name || '')) }}
                                </p>
                                <span class="text-decoration-line-through text-secondary small">
                                    {{ product.price.original }}<sup>៛</sup>
                                </span>
                            </div>
                            <p class="text-success fw-bold mb-0" v-else>
                                {{ product.price.original }}<sup>៛</sup> /
                                {{ t('product_units.' + (product.product_units?.name || '')) }}
                            </p>
                        </div>
                        <button class="btn btn-success rounded-pill">
                            <i class="bi bi-bag-fill me-1"></i>កន្ត្រក
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="col-12 text-center py-5">
            <p class="text-secondary fs-5">មិនមានផលិតផលលក់ដាច់នៅឡើយទេ។</p>
            <i class="bi bi-exclamation-circle fs-1 text-secondary"></i>
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
    allProduct.onLoadBestSellers()
});
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