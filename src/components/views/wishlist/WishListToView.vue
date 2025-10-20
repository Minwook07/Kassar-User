<template>
	<div class="wishlist-page">
		<!-- Header Section -->
		<div class="py-4 " :style="{ backgroundImage: `url(${bgImage})` }">
			<div class="container">
				<div class="d-flex align-items-center justify-content-between">
					<div>
						<h1 class="h2 mb-0" data-aos="fade-down">បញ្ជីប្រាថ្នា</h1>
						<p class="text-muted mb-0" data-aos="fade-down">
							{{ wishlist_store.CountFav }}
							​ផលិតផលបានជ្រើសរើស
						</p>
					</div>
					<button data-aos="fade-left" class="btn btn-danger" @click="clearWishlist">
						<i class="bi bi-trash"></i>
						លុបទាំងអស់
					</button>
				</div>
			</div>
		</div>

		<!-- Wishlist Items -->
		<div class="container py-5">
			<div v-if="wishlist_store.FavProducts.length > 0">
				<!-- Products Grid -->
				<div class="row">
					<div data-aos="fade-up" v-for="FavProduct in wishlist_store.FavProducts" :key="FavProduct.id"
						class="col-12 col-md-4 col-lg-3 mb-4" @click="viewProduct">
						<div class="card h-100 border-0 shadow-sm">
							<div class="position-relative">
								<img :src="FavProduct.product.thumbnail" class="card-img-top"
									style="height: 200px; object-fit: cover" />
								<button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
									@click="RemoveFav(FavProduct)">
									<i class="bi bi-x-lg"></i>
								</button>
								<span class="badge bg-success position-absolute bottom-0 start-0 m-2">{{
									FavProduct.product.category_id }}</span>
							</div>
							<div class="card-body">
								<div class="d-flex justify-content-between align-items-start mb-2">
									<h5 class="card-title mb-0">{{ FavProduct.product.name }}</h5>
									<div class="d-flex align-items-center">
										<Star class="text-warning me-1" />
										<!-- <span class="small">{{ item.rating }}</span> -->
									</div>
								</div>
								<p class="small text-muted mb-3 product-desc">
									{{ FavProduct.product.description }}
								</p>
								<div class="d-flex justify-content-between align-items-center mb-3">
									<div>
										<span class="h5 text-success mb-0">${{ FavProduct.product.price }}</span>
										<span class="text-muted small">/ {{
											t('product_units.' + (FavProduct.product.product_unit.name)) }}</span>
									</div>
								</div>
								<div class="d-grid">
									<button class="btn btn-primary" @click="addToCart(item.id)">
										<ShoppingCart class="me-2" size="18" />
										ដាក់ចូលកន្ត្រក
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-else class="text-center py-5">
				<Heart class="text-muted mb-3" size="48" />
				<h3 class="h4 mb-3">បញ្ជីប្រាថ្នារបស់អ្នកគឺទទេ</h3>
				<p class="text-muted mb-4">
					ស្វែងរកផលិតផលបន្ថែមដើម្បីបញ្ជូលក្នុងបញ្ជីប្រាថ្នា
				</p>
				<router-link to="/allproducts" class="me-2 btn btn-primary">មើលផលិតផល</router-link>
			</div>
		</div>
	</div>
	<ToastView />
</template>

<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useContactStore } from "@/stores/contact_store";
import { useCardStore } from "@/stores/card_store";
import bgImage from '@/assets/images/background/bg-fav.png';
import { useWishListStore } from "@/stores/views/wishlist_store";
import { Heart, ShoppingCart, Star } from "lucide-vue-next";
import ToastView from "../toast/ToastView.vue";

const { t } = useI18n()
const contactStore = useContactStore();
const cartListStore = useCardStore();
const wishlist_store = useWishListStore()

const clearWishlist = async () => {
	await wishlist_store.clearWishlist();
	cartListStore.onLoadFav();
};

const RemoveFav = async (FavProduct) => {
	await wishlist_store.RemoveFav(FavProduct.id);

	if (contactStore.toast_alert) {
		contactStore.toast_alert.show();
	}

	cartListStore.onLoadFav();
};

onMounted(() => {
	wishlist_store.onLoadWishList()
});

</script>

<style scoped>
.card {
	transition: transform 0.2s;
}

.card:hover {
	cursor: pointer;
	transform: translateY(-2px);
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.badge {
	font-weight: 500;
}

.btn-outline-success:hover {
	background-color: var(--bs-success);
	color: white;
}

.bg-fav {
	background-image: url("~@/assets/images/background/bg-fav.png") !important;
}
</style>
