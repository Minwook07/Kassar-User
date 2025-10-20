<template>
	<section>
		<div class="mt-4">
			<div class="cart-container bg-white">
				<!-- Cart Header -->
				<div class="d-flex justify-content-between align-items-center mb-4">
					<h4 class="fw-bold">កន្ត្រក <span class="text-secondary">{{ cartListStore.cartLists.length }}
							ទំនិញ</span>
					</h4>
					<div>
						<!-- Select All Checkbox -->
						<input class="form-check-input me-3 rounded-circle shadow-none" type="checkbox" id="selectAll"
							v-model="selectAllChecked" @change="onSelectAllChange">
						<label for="selectAll">ជ្រើសទាំងអស់</label>
					</div>
				</div>

				<div>
					<!-- Loop through Cart Items -->
					<div v-for="cartList in cartListStore.cartLists" :key="cartList.id"
						class="cart-item d-flex align-items-center">

						<!-- Product Image -->
						<div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
							<img :src="cartList.product.thumbnail_url" alt="Product Image"
								class="item-img me-3 rounded-2" />
						</div>

						<!-- Product Details -->
						<div class="flex-grow-1">
							<h5 class="mb-2 mt-1 fw-bold">{{ cartList.product.name }}</h5>
							<p class="mb-1 text-muted">
								{{ formatPrice(cartList.product.price) }} ៛ /{{ t('product_units.' + (cartList.product.product_unit.name)) }} |
								<span class="text-success">
									{{ cartList.product.stock_status }}</span> | <span class="text-danger">
									{{ cartList.product.discount_rate }}% </span>
							</p>
							<a role="button" class="delete-btn" @click="onConfirmDelete(cartList)">
								<i class="bi bi-trash"></i> លុបចេញ
							</a>
						</div>

						<!-- Quantity Controls -->
						<div class="text-end">
							<h5 class="fw-bold mb-3">
								<span v-show="cartList.product.discount_rate != 0"
									style="text-decoration: line-through; " class="text-danger"> {{
										(cartListStore.cartCounts[cartList.id] || 1) * cartList.product.price
									}}៛</span>
								<span> {{ formatPrice((cartListStore.cartCounts[cartList.id] || 1) *
									cartList.product.discounted_price)
								}}៛</span>
							</h5>
							<div style="width:90px; height: 30px;"
								class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">

								<!-- Decrease Quantity -->
								<div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
									@click="decrement(cartList.id)" style="cursor: pointer;">
									<i class="bi bi-dash-lg text-black fs-6"></i>
								</div>

								<!-- Quantity Display -->
								<p class="mb-0 fw-bold fs-5">{{ cartListStore.cartCounts[cartList.id] || 1 }}</p>

								<!-- Increase Quantity -->
								<div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
									@click="increment(cartList.id)" style="cursor: pointer;">
									<i class="bi bi-plus-lg text-black fs-6"></i>
								</div>
							</div>
						</div>
					</div> <!-- End Loop -->

					<div class="mt-4 d-flex justify-content-end">
						<button class="btn btn-danger px-5 py-3" :disabled="!isAnyItemSelected" type="button"
							@click="onConfirmDeleteAll()">
							លុបទាំងអស់
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const cartListStore = useCardStore();
const selectAllChecked = ref(false); // Ensure it's false by default
const { t } = useI18n()

// format money
const formatPrice = cartListStore.formatPrice;

// Create a computed property to check if any item is selected
const isAnyItemSelected = computed(() => {
	return cartListStore.cartLists.some(cartItem => cartItem.isSelected);
});

// const formatPrice = (price) => {
//   if (!price) return null;
//   return Math.floor(price) // Remove decimals
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
// };

// Handle "Select All" checkbox click
const onSelectAllChange = () => {
	cartListStore.cartLists.forEach(cartItem => {
		cartItem.isSelected = selectAllChecked.value; // Update selection for all items
	});
};

onMounted(() => {
	cartListStore.onLoadCart();
	// Ensure the "Select All" checkbox is unchecked initially
	selectAllChecked.value = false;
});

const onConfirmDelete = ({ id }) => {
	cartListStore.selected_id = id;
	cartListStore.mdl_delete.show();
};

const onConfirmDeleteAll = () => {
	cartListStore.mdl_delete_all.show();
};

// Increase quantity for a specific product
const increment = (id) => {
	const newQuantity = (cartListStore.cartCounts[id] || 1) + 1;
	cartListStore.updateQuantity(id, newQuantity);
};

// Decrease quantity for a specific product
const decrement = (id) => {
	const newQuantity = (cartListStore.cartCounts[id] || 1) - 1;
	cartListStore.updateQuantity(id, newQuantity);
};
</script>
