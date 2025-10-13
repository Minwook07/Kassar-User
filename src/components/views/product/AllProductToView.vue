<template>
  <section style="background-color: #f2f2f2">
    <div class="bg-allProduct d-flex align-items-center justify-content-center">
      <div data-aos="fade-up">
        <h1 class="text-secondary fw-bold">ទំនិញ</h1>
        <div>
          <router-link to="/" class="text-center text-secondary text-decoration-none">ទំព័រដើម</router-link>
          <router-link to="/allproducts" class="text-center text-secondary text-decoration-none">/ ទំនិញ</router-link>
        </div>
      </div>
    </div>
    <div class="container-fluid my-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 col-lg-2">
          <h4 class="mb-0 fw-bold text-primary" data-aos="fade-up-right">
            ជម្រើសផលិតផល
          </h4>
          <hr />
          <div class="mt-3 mb-4 text-center">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="bi bi-arrow-repeat"></i>
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">ប្រភេទ</h5>
            <div v-for="category in categoryStore.categories" :key="category.id">
              <div class="mb-2 myform-check form-check">
                <input @change="() => selectCategory(category.id)" v-model="allproducts.selectedCategory" type="radio"
                  :value="category.id" :id="'radio-' + category.id" class="form-check-input shadow-none" />
                <label class="form-check-label" :for="'radio-' + category.id">
                  {{ t('categories.' + category.name) }}
                </label>
              </div>
            </div>
            <hr />
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold">តម្លៃ</h5>
            <div class="price-range-container p-4 bg-light rounded">
              <div class="price-display mb-3 fs-6">
                ៛{{ formatPrice(allproducts.range[0]) }} - ៛{{ formatPrice(allproducts.range[1]) }}
              </div>

              <div class="position-relative">
                <!-- Slider track -->
                <div class="slider-track" :style="{
                  '--left-position': `${(allproducts.range[0] / allproducts.max_price) * 100}%`,
                  '--right-position': `${100 - (allproducts.range[1] / allproducts.max_price) * 100}%`,
                }"></div>
                <input type="range" class="range-input" v-model.number="allproducts.range[0]"
                  :min="allproducts.min_price" :max="allproducts.range[1]" @input="handleRangeInput" />
                <input type="range" class="range-input" v-model.number="allproducts.range[1]"
                  :min="allproducts.range[0]" :max="allproducts.max_price" @input="handleRangeInput" />
              </div>
            </div>
          </div>
          <hr>
          <div class="mb-3">
            <h5 class="fw-bold mb-3">វាយតម្លៃ</h5>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-10 row justify-content-start">
          <div class="col-12 row mb-3 justify-content-end px-0">
            <div class="col-12 col-lg-6 bg-search rounded d-flex justify-content-between align-items-center">
              <input v-model="allproducts.search" @input="handleSearch" type="text"
                placeholder="ស្វែងរកតាមរយៈឈ្មោះផលិតផល,ប្រភេទ ..." class="form-control search" />
              <div class="pe-3">
                <i class="bi bi-search text-primary"></i>
              </div>
            </div>
          </div>

          <!-- Skeleton Loader -->
          <div v-if="allproducts.isLoading" class="row g-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="n in 8" :key="n">
              <ProductSkeleton />
            </div>
          </div>

          <!-- Products grid -->
          <AllProductListToView />
        </div>
      </div>
    </div>
  </section>
  <ToastView />
</template>

<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import ToastView from "../toast/ToastView.vue";
import { useCategoryStore } from "@/stores/views/categories_store";
import { useAllProducts } from "@/stores/views/allProduct_store";
import { useRoute } from "vue-router";
import ProductSkeleton from '@/components/views/product/ProductSkeleton.vue';
import { storeToRefs } from "pinia";
import AllProductListToView from "./AllProductListToView.vue";

const { t } = useI18n()

const categoryStore = useCategoryStore();
const allproducts = useAllProducts();

onMounted(() => {
  allproducts.GetAllProducts();
});

const handleSearch = () => {
  allproducts.currentPage = 1;
  allproducts.GetAllProducts();
};

const selectCategory = async (categoryId) => {
  allproducts.selectedCategory = categoryId;
  allproducts.currentPage = 1;
  await allproducts.GetAllProducts();
};

const handleRangeInput = () => {
  allproducts.GetAllProducts();
};

const resetFilters = () => {
  allproducts.selectedCategory = null;
  allproducts.search = "";
  allproducts.range = [allproducts.min_price, allproducts.max_price];
  allproducts.currentPage = 1;
  allproducts.GetAllProducts();
};

const formatPrice = (value) => {
  if (value == null || value === '') return '0';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
</script>