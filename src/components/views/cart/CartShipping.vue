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
    <button @click="showModal = true" class="mt-3 btn btn-primary btn-process w-100">
      ទូទាត់ <span>{{ formatPrice(totalPrice - totalDis) }} ៛</span>
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        
        <!-- If showQR is true => Show the separate QR modal style -->
        <template v-if="showQR">
          <div class="aba-qr-modal">
            <div class="aba-qr-header">
              <div class="aba-logo-container">
                <img 
                  src="/logo-ABA.png" 
                  alt="ABA Logo" 
                  class="aba-logo"
                />
                <span class="aba-pay-text">ABA PAY</span>
              </div>
              <div class="timer-container">
                <span class="timer">{{ countdown }}:{{ timerSeconds < 10 ? '0' + timerSeconds : timerSeconds }}</span>
                <button @click="closeModal" class="close-button">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            
            <div class="amount-container">
              <span class="amount">{{ formatPrice((totalPrice - totalDis).toFixed(2)) }}</span>
              <span class="currency">រៀល</span>
            </div>
            
            <div class="scan-text">Scan to pay</div>
            
            <div class="qr-container">
              <div class="qr-corner top-left"></div>
              <div class="qr-corner top-right"></div>
              <div class="qr-corner bottom-left"></div>
              <div class="qr-corner bottom-right"></div>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ABA_PAY_{{ totalPrice - totalDis }}" 
                alt="ABA QR Code" 
                class="qr-code"
              />
            </div>
          </div>
        </template>
        
        <!-- Else => Show normal confirm payment content -->
        <template v-else>
          <div class="d-flex justify-content-around">
            <p class="text-center ms-5">តើអ្នកប្រាកដជាចង់បង់ប្រាក់មែនទេ?</p>
            <a @click="closeModal" class="text-danger pointer ms-5"> <i class="bi bi-x-circle"></i></a>
          </div>
          <RouterLink to="/waypay" class="btn btn-primary mb-3">បង់ប្រាក់តាម​ Credit Card</RouterLink>
          <button @click="openQR" class="btn btn-danger">បង់ប្រាក់តាម ABA QR</button>
        </template>

      </div>
    </div>
  </div>

  <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="margin-top: 50px;">
        <div id="liveToast" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="false">
            <div class="toast-content p-3">
                <div>
                    <i class="bi bi-check2-circle fs-5 text-success"></i>
                    <!-- <i class="bi bi-exclamation-circle fs-6 text-info"></i>
                    <i class="bi bi-x-circle fs-6 text-danger"></i> -->
                </div>

                <div class="message">
                    <span class="text text-1">បង់ប្រាក់ជោគជ័យ</span>
                </div>
                <div>
                    <button type="button" class="btn btn-close border-0 ms-auto p-0" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
            <div class="progress active"></div>
        </div>
    </div>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { Toast } from 'bootstrap';
import { computed, ref, onBeforeUnmount, onMounted } from 'vue';

const cartListStore = useCardStore();

// format money
const formatPrice = cartListStore.formatPrice;

// Reactive state for total price and discount
const totalPrice = computed(() => cartListStore.totalPrice);
const totalDis = computed(() => cartListStore.totalDis);

onMounted(() => {
    cartListStore.toast_alert = Toast.getOrCreateInstance(document.getElementById('liveToast'));
})

// Modal visibility state
const showModal = ref(false);
const showQR = ref(false);

// Timer for the countdown
const countdown = ref(0);
const timerSeconds = ref(10);
let countdownInterval = null;

// format money
// const formatPrice = (price) => {
//   if (!price) return null;
//   return Math.floor(price) // Remove decimals
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
// };

// Open QR modal and start countdown
const openQR = () => {
  showQR.value = true;
  countdown.value = 0;  
  timerSeconds.value = 10;
  
  countdownInterval = setInterval(() => {
    timerSeconds.value--;
    
    if (timerSeconds.value < 0) {
      timerSeconds.value = 59;
      countdown.value--;
    }
    
    // If total time is up (after 10 seconds)
    if (countdown.value === 0 && timerSeconds.value === 0) {
      clearInterval(countdownInterval);
      if (cartListStore.toast_alert) {
                cartListStore.toast_alert.show();
            }
      closeModal();
    }
  }, 1000);
};

// Close modal
const closeModal = () => {
  showModal.value = false;
  showQR.value = false;
  clearInterval(countdownInterval);
};

// Clean up interval when component is unmounted
onBeforeUnmount(() => {
  clearInterval(countdownInterval);
});
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