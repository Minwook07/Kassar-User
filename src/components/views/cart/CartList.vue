<template>
  <section>
    <div class="mt-4">
      <div class="cart-container bg-white">
        <!-- Cart Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold">កន្ត្រក <span class="text-secondary">{{ cartListStore.cartLists.length }} ទំនិញ</span></h4>
          <div>
            <input class="form-check-input me-3 rounded-circle shadow-none" type="checkbox" id="selectAll">
            <label for="selectAll">ជ្រើសទាំងអស់</label>
          </div>
        </div>

        <div>
           <!-- Cart Items -->
           <div class="form-check align-items-center d-flex justify-content-start">
            <input class="form-check-input me-3 rounded-circle shadow-none" type="checkbox">
            <label class="form-check-label fs-5 fw-bold">ហាងលក់សាច់គោ</label>
          </div>
          <!-- Loop through Cart Items -->
          <div v-for="cartList in cartListStore.cartLists" :key="cartList.id" class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle shadow-none" type="checkbox">

            <!-- Product Image -->
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img :src="cartList.product.thumbnail" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>

            <!-- Product Details -->
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">{{ cartList.product.name }}</h5>
              <p class="mb-1 text-muted">
                {{ cartList.product.price }} / 1kg | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>

            <!-- Quantity Controls -->
            <div class="text-end">
              <h5 class="fw-bold mb-3"> {{ (cartListStore.cartCounts[cartList.id] || 1) * cartList.product.price }} </h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                
                <!-- Decrease Quantity -->
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement(cartList.id)">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                
                <!-- Quantity Display -->
                <p class="mb-0 fw-bold fs-5">{{ cartListStore.cartCounts[cartList.id] || 1 }}</p>
                
                <!-- Increase Quantity -->
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="increment(cartList.id)">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div> <!-- End Loop -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { onMounted } from 'vue';

const cartListStore = useCardStore();

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

// Load cart items when the component is mounted
onMounted(() => {
  cartListStore.onLoadCart();
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
