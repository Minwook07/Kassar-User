<template>
	<section style="background-color: #f2f2f2">
		<div class="bg-allProduct d-flex align-items-center justify-content-center">
			<div data-aos="fade-up">
				<h1 class="text-secondary fw-bold">ទំនិញ</h1>
				<div>
					<router-link to="/" class="text-center text-secondary text-decoration-none">ទំព័រដើម</router-link>
					<router-link to="/allproducts" class="text-center text-secondary text-decoration-none">/
						ទំនិញ</router-link>
				</div>
			</div>
		</div>
		<div class="container-fluid my-5 p-0">
			<div class="row">
				<!-- Sidebar Filter -->
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
								<input @change="() => selectCategory(category.id)"
									v-model="allproducts.selectedCategory" type="radio" :value="category.id"
									:id="'radio-' + category.id" class="form-check-input shadow-none" />
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
									:min="allproducts.min_price" :max="allproducts.range[1]"
									@input="applyPriceFilter" />
								<input type="range" class="range-input" v-model.number="allproducts.range[1]"
									:min="allproducts.range[0]" :max="allproducts.max_price"
									@input="applyPriceFilter" />
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
							<input type="radio" class="form-check-input shadow-none" id="exampleCheck2" />
							<label class="form-check-label" for="exampleCheck2">
								<div class="d-flex gap-2 text-warning">
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
								</div>
							</label>
						</div>
						<div class="mb-2 myform-check form-check">
							<input type="radio" class="form-check-input shadow-none" id="exampleCheck3" />
							<label class="form-check-label" for="exampleCheck3">
								<div class="d-flex gap-2 text-warning">
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
								</div>
							</label>
						</div>
						<div class="mb-2 myform-check form-check">
							<input type="radio" class="form-check-input shadow-none" id="exampleCheck4" />
							<label class="form-check-label" for="exampleCheck4">
								<div class="d-flex gap-2 text-warning">
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
								</div>
							</label>
						</div>
						<div class="mb-2 myform-check form-check">
							<input type="radio" class="form-check-input shadow-none" id="exampleCheck5" />
							<label class="form-check-label" for="exampleCheck5">
								<div class="d-flex gap-2 text-warning">
									<i class="bi bi-star-fill"></i>
								</div>
							</label>
						</div>
					</div>
				</div>

				<!-- Main Content -->
				<div class="col-12 col-md-9 col-lg-10">
					<div class="row mb-4">
						<!-- Search Bar -->
						<div class="col-12 col-lg-6 mb-3 mb-lg-0">
							<div class="bg-search rounded d-flex justify-content-between align-items-center">
								<input v-model="allproducts.search" @input="handleSearch" type="text"
									placeholder="ស្វែងរកតាមរយៈឈ្មោះផលិតផល, ប្រភេទផលិតផល ..."
									class="form-control search" />
								<div class="pe-3">
									<i class="bi bi-search text-primary"></i>
								</div>
							</div>
						</div>

						<div class="col-12 col-lg-6">
							<div class="d-flex align-items-center justify-content-lg-end gap-3 flex-wrap">
								<!-- Sort Dropdown -->
								<div class="d-flex align-items-center gap-2">
									<label class="mb-0 text-nowrap fw-semibold">តម្រៀបតាម:</label>
									<div class="dropdown">
										<button class="btn btn-outline-primary dropdown-toggle" type="button"
											id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
											{{ allproducts.currentSortLabel }}
										</button>
										<ul class="dropdown-menu" aria-labelledby="sortDropdown">
											<li>
												<a class="dropdown-item"
													:class="{ active: allproducts.sortColumn === 'id' && allproducts.sortDirection === 'desc' }"
													href="#" @click.prevent="handleSort('newest')">ថ្មីបំផុត</a>
											</li>
											<li>
												<a class="dropdown-item"
													:class="{ active: allproducts.sortColumn === 'id' && allproducts.sortDirection === 'asc' }"
													href="#" @click.prevent="handleSort('oldest')">ចាស់បំផុត</a>
											</li>
											<li>
												<a class="dropdown-item"
													:class="{ active: allproducts.sortColumn === 'price' && allproducts.sortDirection === 'asc' }"
													href="#" @click.prevent="handleSort('price-low-high')">តម្លៃ:
													ទាបទៅខ្ពស់</a>
											</li>
											<li>
												<a class="dropdown-item"
													:class="{ active: allproducts.sortColumn === 'price' && allproducts.sortDirection === 'desc' }"
													href="#" @click.prevent="handleSort('price-high-low')">តម្លៃ:
													ខ្ពស់ទៅទាប</a>
											</li>
											<li>
												<a class="dropdown-item"
													:class="{ active: allproducts.sortColumn === 'name' && allproducts.sortDirection === 'asc' }"
													href="#" @click.prevent="handleSort('name-a-z')">ឈ្មោះ: ក-អ</a>
											</li>
											<li>
												<a class="dropdown-item"
													:class="{ active: allproducts.sortColumn === 'name' && allproducts.sortDirection === 'desc' }"
													href="#" @click.prevent="handleSort('name-z-a')">ឈ្មោះ: អ-ក</a>
											</li>
										</ul>
									</div>
								</div>

								<div class="btn-group" role="group">
									<button type="button" title="List view" class="btn btn-outline-primary"
										:class="{ active: allproducts.viewMode === 'list' }"
										@click="handleViewChange('list')">
										<List :size="18" />
									</button>
									<button type="button" title="Grid view" class="btn btn-outline-primary"
										:class="{ active: allproducts.viewMode === 'grid' }"
										@click="handleViewChange('grid')">
										<LayoutGrid :size="18" />
									</button>
								</div>

								<!-- Mobile filter button -->
								<button type="button" class="btn btn-outline-primary d-lg-none" data-bs-toggle="modal"
									data-bs-target="#filterModal">
									<i class="fa-solid fa-sliders"></i>
								</button>
							</div>
						</div>
					</div>

					<div v-if="allproducts.isLoading && allproducts.viewMode === 'grid'" class="row g-4">
						<div class="col-12 col-sm-6 col-md-4" v-for="n in 6" :key="n">
							<ProductSkeleton />
						</div>
					</div>

					<div v-if="allproducts.isLoading && allproducts.viewMode === 'list'" class="row g-4">
						<div v-for="n in 6" :key="n">
							<ProductListSkeleton />
						</div>
					</div>

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
import { LayoutGrid, List } from 'lucide-vue-next';
import ToastView from "../toast/ToastView.vue";
import { useCategoryStore } from "@/stores/views/categories_store";
import { useAllProducts } from "@/stores/views/allProduct_store";
import ProductSkeleton from '@/components/views/product/ProductSkeleton.vue';
import AllProductListToView from "./AllProductListToView.vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import ProductListSkeleton from "./ProductListSkeleton.vue";

const { t } = useI18n()

const categoryStore = useCategoryStore();
const allproducts = useAllProducts();
const route = useRoute()
const router = useRouter()

const handleSearch = () => {
	allproducts.currentPage = 1;

	if (!allproducts.search.trim()) {
		router.replace({ name: "allproducts" });
		allproducts.GetAllProducts();
		return;
	}

	router.replace({
		name: "allproducts",
		query: { q: allproducts.search.trim() }
	});

	allproducts.GetAllProducts();
};

const handleSort = (sortType) => {
	allproducts.setSorting(sortType);
};

const handleViewChange = (mode) => {
	allproducts.setViewMode(mode);
	router.replace({
		name: "allproducts",
		query: { ...route.query, view: mode }
	});
};

onMounted(() => {
	// Restore view mode from query params
	if (route.query.view) {
		allproducts.setViewMode(route.query.view);
	}

	if (route.query.q) {
		allproducts.search = route.query.q;
		allproducts.currentPage = 1;
		allproducts.GetAllProducts();
	}
	else {
		allproducts.GetAllProducts();
	}
});

onBeforeRouteUpdate((to, from, next) => {
	allproducts.search = to.query.q || "";
	allproducts.currentPage = 1;

	if (to.query.view) {
		allproducts.setViewMode(to.query.view);
	}

	allproducts.GetAllProducts();

	next();
})

const selectCategory = async (categoryId) => {
	allproducts.selectedCategory = categoryId;
	allproducts.currentPage = 1;

	const query = {
		q: allproducts.search || undefined,
		category: categoryId || undefined,
		min_price: (allproducts.range[0] !== allproducts.min_price) ? allproducts.range[0] : undefined,
		max_price: (allproducts.range[1] !== allproducts.max_price) ? allproducts.range[1] : undefined,
		view: allproducts.viewMode
	}

	router.replace({ name: "allproducts", query })

	await allproducts.GetAllProducts();
};

const applyPriceFilter = () => {
	allproducts.currentPage = 1;

	const query = {
		q: allproducts.search || undefined,
		category: allproducts.selectedCategory || undefined,
		min_price: allproducts.range[0],
		max_price: allproducts.range[1],
		view: allproducts.viewMode
	};

	router.replace({ name: "allproducts", query });
	allproducts.GetAllProducts();
};

const resetFilters = () => {
	allproducts.selectedCategory = null;
	allproducts.search = "";
	allproducts.range = [allproducts.min_price, allproducts.max_price];
	allproducts.currentPage = 1;
	allproducts.sortColumn = 'id';
	allproducts.sortDirection = 'desc';
	allproducts.currentSortLabel = 'ថ្មីបំផុត';

	router.replace({
		name: "allproducts",
		query: { view: allproducts.viewMode }
	});
	allproducts.GetAllProducts();
};

const formatPrice = (value) => {
	if (value == null || value === '') return '0';
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
</script>

<style scoped>
.dropdown-item.active {
	background-color: #32CA83 !important;
	color: white !important;
}

.dropdown-item:not(.active):hover,
.dropdown-item:not(.active):focus {
	background-color: #32CA83 !important;
	color: white !important;
}

.dropdown-item.active:hover,
.dropdown-item.active:focus {
	background-color: #28A76B !important;
	/* optional darker green */
	color: white !important;
}

/* Active button in btn-group */
.btn-group .btn.active {
	background-color: #32CA83 !important;
	color: white !important;
	border-color: #32CA83 !important;
}

.btn-check:checked+.btn,
.btn.active,
.btn.show,
.btn:first-child:active,
:not(.btn-check)+.btn:active {
	color: white !important;
	background-color: #32CA83 !important;
	border-color: #32CA83 !important;
}
</style>