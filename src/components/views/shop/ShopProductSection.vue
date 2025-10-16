<template>
    <section class="py-5">
        <div class="container-fluid">
            <div class="row px-0 justify-content-between">
                <div class="col-12 px-0">
                    <ul class="nav nav-pills mynav-pills mb-3 gap-3" id="pills-tab" role="tablist">
                        <li data-aos="fade-right" class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-more-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-more" type="button" role="tab" aria-controls="pills-more"
                                aria-selected="false">
                                ទាំងអស់
                            </button>
                        </li>

                        <li v-for="category in categories" :key="category.id" class="nav-item" role="presentation">
                            <button class="nav-link" :class="{ active: selectedTab === category.name }"
                                :id="`pills-${category.name}-tab`" data-bs-toggle="pill"
                                :data-bs-target="`#pills-${category.name}`" type="button" role="tab"
                                :aria-controls="`pills-${category.name}`" :aria-selected="selectedTab === category.name"
                                @click="selectTab(category.name)">
                                {{ t('categories.' + category.name) }}
                            </button>
                        </li>

                    </ul>
                    <div class="tab-content shadow-none px-0" id="pills-tabContent z-1">
                        <div class="tab-pane fade" :class="{ 'show active': selectedTab === 'ទាំងអស់' }" id="pills-more"
                            role="tabpanel">
                            <div class="row">
                                <div data-aos="fade-up" class="col-12 col-md-4 col-lg-3 mb-3"
                                    v-for="product in allProducts" :key="product.id" @click="goToDetail(product.id)">
                                    <div class="bg-white card card-product border-0 rounded position-relative">
                                        <div class="card-img p-3">
                                            <img :src="product.product_thumbnail"
                                                class="mycard-img-top rounded-top object-fit-cover" alt="" />
                                        </div>
                                        <div class="p-3 card-body">
                                            <div class="d-flex justify-content-between">
                                                <p class="text-primary mb-1">
                                                    {{ t('categories.' + (product.category.name)) }}
                                                </p>
                                                <p class="mb-1">
                                                    <span class="text-warning me-2"><i
                                                            class="bi bi-star-fill"></i></span>{{
                                                                product.rating.average }}
                                                </p>
                                            </div>
                                            <h4 class="fw-bold">{{ product.name }}</h4>
                                            <p class="product-desc">{{ product.description }}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="text-primary mb-0 fw-bold">
                                                    {{ product.price.original }} ៛ /{{
                                                        t('product_units.' + (product.product_units.name))
                                                    }}
                                                </p>
                                                <button @click.stop="AddToCart(product.id)"
                                                    class="btn btn-primary rounded-pill"><i
                                                        class="bi bi-bag-fill me-1"></i>កន្ត្រក</button>
                                            </div>
                                        </div>
                                        <div class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3">
                                            <p class="mb-0 px-3 text-white">
                                                {{ product.promotions.discount_rate }}
                                            </p>
                                        </div>

                                        <div class="position-absolute border border-dark-subtle top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                                            @click.stop="toggleFav(product)">
                                            <p class="mb-0 mt-1 text-danger fw-bold">
                                                <i :class="product.is_favorited
                                                    ? 'bi bi-heart-fill'
                                                    : 'bi bi-heart'
                                                    "></i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-for="category in categories" :key="category.id" class="tab-pane fade"
                            :class="{ 'show active': selectedTab === category.name }" :id="`pills-${category.name}`"
                            role="tabpanel" :aria-labelledby="`pills-${category.name}-tab`">
                            <div class="row">
                                <div data-aos="fade-up" class="col-12 col-md-4 col-lg-3 mb-3"
                                    v-for="product in filteredProducts(category)" :key="product.id"
                                    @click="goToDetail(product.id)">
                                    <div class="bg-white card card-product border-0 rounded position-relative">
                                        <div class="card-img p-3">
                                            <img :src="product.product_thumbnail"
                                                class="mycard-img-top rounded-top object-fit-cover" alt="" />
                                        </div>
                                        <div class="p-3 card-body">
                                            <div class="d-flex justify-content-between">
                                                <p class="text-primary mb-1">
                                                    {{ t('categories.' + (product.category.name)) }}
                                                </p>
                                                <p class="mb-1">
                                                    <span class="text-warning me-2"><i
                                                            class="bi bi-star-fill"></i></span>
                                                    {{ product.rating.average }}
                                                </p>
                                            </div>
                                            <h4 class="fw-bold">{{ product.name }}</h4>
                                            <p class="product-desc">{{ product.description }}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="text-primary mb-0 fw-bold">
                                                    {{ product.price.original }} ៛ /{{
                                                        t('product_units.' + (product.product_units.name))
                                                    }}
                                                </p>
                                                <button @click.stop="AddToCart(product.id)"
                                                    class="btn btn-primary rounded-pill"><i
                                                        class="bi bi-bag-fill me-1"></i>កន្ត្រក</button>
                                            </div>
                                        </div>
                                        <div class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3">
                                            <p class="mb-0 px-3 text-white">
                                                {{ product.promotions.discount_rate }}
                                            </p>
                                        </div>

                                        <div class="position-absolute border border-dark-subtle top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                                            @click.stop="toggleFav(product)">
                                            <p class="mb-0 mt-1 text-danger fw-bold">
                                                <i :class="product.is_favorited
                                                    ? 'bi bi-heart-fill'
                                                    : 'bi bi-heart'
                                                    "></i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const categories = ref([]);
const allProducts = ref([]);
const selectedTab = ref("ទាំងអស់");

onMounted(async () => {
    try {
        const [catRes, prodRes] = await Promise.all([
            axios.get("/api/categories"),
            axios.get("/api/products"),
        ]);

        if (catRes.data.result) categories.value = catRes.data.data;
        if (prodRes.data.result) allProducts.value = prodRes.data.data;
    } catch (err) {
        console.error("Failed to load categories or products:", err);
    }
});

function selectTab(name) {
    selectedTab.value = name;
}

function filteredProducts(category) {
    return allProducts.value.filter(
        (p) => p.category?.id === category.id
    );
}

function goToDetail(id) {
    router.push(`/products/${id}`);
}
</script>
