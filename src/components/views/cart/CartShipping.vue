<template>
  <div class="card-process py-5 mx-auto bg-white" data-aos="fade-left" data-aos-duration="500">
    <h5 class="fw-bold">ដឹកជញ្ជូន</h5>
    <small>កាលបរិច្ឆេទដឹកជញ្ជូន៖ 04-Sep-2025</small>
    <hr class="hr">
    
    <h6 class="fw-bold mb-2">កូដបញ្ចុះតម្លៃ</h6>
    <div class="d-flex mt-3 mb-3 position-relative">
      <input type="text" class="px-2 code-discount" placeholder=" បញ្ចូលកូដបញ្ចុះតម្លៃ">
      <button type="submit" class="btn btn-custom btn-primary">ទទួលយក</button>
    </div>

    <hr class="hr">
    <div class="d-flex justify-content-between mb-2">
      <h6 class="fw-bold">តម្លៃ</h6>
      <h6 class="fw-bold">{{ formatPrice(totalPrice) }} ៛</h6>
    </div>
    <div class="d-flex justify-content-between text-muted mb-2">
      <span>បញ្ចុះតម្លៃសរុប</span>
      <span>{{ formatPrice(totalDis) }} ៛</span>
    </div>
    <div class="d-flex justify-content-between text-muted">
      <span>ថ្លៃដឹកជញ្ជូន</span>
      <span>ឥតគិតថ្លៃ</span>
    </div>

    <hr class="hr">
    <div class="d-flex justify-content-between fw-bold">
      <span>តម្លៃសរុប</span>
      <span>{{ formatPrice(totalPrice - totalDis) }} ៛</span>
    </div>
    <hr class="hr">

    <!-- Payment Button -->
    <button @click="openPaymentModal" class="mt-3 btn btn-primary btn-process w-100">
      ទូទាត់ <span>{{ formatPrice(totalPrice - totalDis) }} ៛</span>
    </button>
  </div>

  <!-- Payment Modal Component -->
  <CartModalPayment 
    ref="paymentModalRef"
    :totalAmount="totalPrice - totalDis"
  />
  
  <ToastView />
</template>

<script setup>
import ToastView from '../toast/ToastView.vue';
import CartModalPayment from './CartModalPayment.vue';
import { useCardStore } from '@/stores/card_store';
import { computed, ref } from 'vue';

const cartListStore = useCardStore();
const paymentModalRef = ref(null);

// format money
const formatPrice = cartListStore.formatPrice;

// Reactive state for total price and discount
const totalPrice = computed(() => cartListStore.totalPrice);
const totalDis = computed(() => cartListStore.totalDis);

// Open payment modal
const openPaymentModal = () => {
  paymentModalRef.value.showModal();
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 300px;
}

.modal-content a {
  cursor: pointer;
}

/* ABA QR Modal - Matching Reference Image */
.aba-qr-modal {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.aba-qr-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.aba-logo-container {
  display: flex;
  align-items: center;
}

.aba-logo {
  width: 30px;
  height: auto;
  margin-right: 8px;
}

.aba-pay-text {
  font-weight: bold;
  font-size: 16px;
}

.timer-container {
  display: flex;
  align-items: center;
}

.timer {
  color: #666;
  margin-right: 8px;
  font-size: 14px;
}

.close-button {
  background: none;
  border: none;
  color: #00bcd4;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.amount-container {
  text-align: center;
  margin: 20px 0;
}

.amount {
  font-size: 32px;
  font-weight: bold;
  margin-right: 5px;
}

.currency {
  font-size: 16px;
  color: #666;
}

.scan-text {
  text-align: center;
  color: #666;
  margin-bottom: 15px;
}

.qr-container {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto 20px;
}

.qr-code {
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
}

.qr-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border-color: #00bcd4;
  z-index: 2;
}

.top-left {
  top: 0;
  left: 0;
  border-top: 3px solid;
  border-left: 3px solid;
}

.top-right {
  top: 0;
  right: 0;
  border-top: 3px solid;
  border-right: 3px solid;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: 3px solid;
  border-left: 3px solid;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 3px solid;
  border-right: 3px solid;
}

.pointer {
  cursor: pointer;
}
</style>
