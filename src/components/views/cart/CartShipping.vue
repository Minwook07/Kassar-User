<template>
  <div class="card-process py-5 mx-auto bg-white" data-aos="fade-left" data-aos-duration="500">
    <h5 class="fw-bold">ដឹកជញ្ជូន</h5>
    <small>កាលបរិច្ឆេទដឹកជញ្ជូន៖ 04-Sep-2025</small>
    <hr class="hr">
    
    <h6 class="fw-bold mb-2">កូដបញ្ចុះតម្លៃ</h6>
    <div class="d-flex mt-3 mb-3 position-relative">
      <input type="text" class="px-2 code-discount" placeholder=" បញ្ចូលកូដបញ្ចុះតម្លៃ">
      <button type="submit" class="btn btn-custom">ទទួលយក</button>
    </div>

    <hr class="hr">
    <div class="d-flex justify-content-between mb-2">
      <h6 class="fw-bold">តម្លៃ</h6>
      <h6 class="fw-bold">{{ totalPrice }} ៛</h6>
    </div>
    <div class="d-flex justify-content-between text-muted mb-2">
      <span>បញ្ចុះតម្លៃសរុប</span>
      <span>{{ totalDis }} ៛</span>
    </div>
    <div class="d-flex justify-content-between text-muted">
      <span>ថ្លៃដឹកជញ្ចូន</span>
      <span>ឥតគិតថ្លៃ</span>
    </div>

    <hr class="hr">
    <div class="d-flex justify-content-between fw-bold">
      <span>តម្លៃសរុប</span>
      <span>{{ totalPrice - totalDis }} ៛</span>
    </div>
    <hr class="hr">

    <!-- Payment Button -->
    <button @click="showModal = true" class="mt-3 btn btn-secondary btn-process w-100">
      ទូទាត់ <span>{{ totalPrice - totalDis }} ៛</span>
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="d-flex justify-content-around">
          <p class="text-center ms-5">តើអ្នកប្រាកដជាចង់បង់ប្រាក់មែនទេ?</p>
          <a @click="showModal = false" class="text-danger pointe ms-5"> <i class="bi bi-x-circle"></i></a>
        </div>
        <RouterLink to="/waypay" class="btn btn-primary mb-3">បង់ប្រាក់តាម​ Credit Card</RouterLink>
        <button @click="confirmPayment" class="btn btn-danger">បង់ប្រាក់តាម ABA QR</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { computed, ref } from 'vue';

const cartListStore = useCardStore();

// Reactive state for total price and discount
const totalPrice = computed(() => cartListStore.totalPrice);
const totalDis = computed(() => cartListStore.totalDis);

// Modal visibility state
const showModal = ref(false);

// Confirm payment function
const confirmPayment = () => {
  alert('✅ Payment Confirmed!');
  showModal.value = false;
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
  align-items: center;
  z-index: 1000;
  border-radius: 10px;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 300px;
}

.modal-content a{
  cursor: pointer;
}
</style>
