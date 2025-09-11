<template>
    <div class="rounded-3 overflow-hidden bg-white category-side h-100 shadow-sm" data-aos="fade-left">
        <div class="text-center category-title">
            <p class="fw-bold fs-5 text-white py-2 m-0">ប្រភេទផលិតផល</p>
        </div>
        <ul class="category-list list-unstyled">
            <li class="category-item" v-for="category in categoryStore.categories" :key="category.id">
                <button class="nav-link category-link" @click="selectCategory(category.id)">
                    {{ t('categories.' + category.name) }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useCategoryStore } from '@/stores/views/categories_store';
import { useAllProducts } from '@/stores/views/allProduct_store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const { t } = useI18n()
const router = useRouter()

const allProduct = useAllProducts()
const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.GetAllCategories();
})

const selectCategory = async (categoryId) => {
    allProduct.selectedCategory = categoryId
    await allProduct.GetAllProducts()
    router.push({ path: '/allproducts', query: { category_id: categoryId } })
}
</script>