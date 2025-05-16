<template>
  <div class="modal fade" id="mdl-payment" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Payment Options View -->
        <template v-if="!showQR">
          <section>
            <div class="d-flex justify-content-between align-items-center p-3 pb-4">
            <h4 class="text-center mb-0 fw-medium">ជ្រើសរើសមធ្យោបាយក្នុងការទូរទាត់?</h4>
            <a @click="closeModal" class="text-danger pointer"> 
              <i class="bi bi-x fs-4"></i>
            </a>
          </div>
          <div class="p-3 d-flex flex-column">
            <button @click="handleCreditCardPayment" class="btn btn-primary mb-3 py-3">បង់ប្រាក់តាម​ Credit Card</button>
            <button @click="openQR" class="btn btn-danger py-3">បង់ប្រាក់តាម ABA QR</button>
          </div>
          </section>
        </template>

        <!-- ABA QR View -->
        <template v-else>
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
              <span class="amount">{{ formatPrice((totalAmount).toFixed(2)) }}</span>
              <span class="currency">រៀល</span>
            </div>
            
            <div class="scan-text">Scan to pay</div>
            
            <div class="qr-container">
              <div class="qr-corner top-left"></div>
              <div class="qr-corner top-right"></div>
              <div class="qr-corner bottom-left"></div>
              <div class="qr-corner bottom-right"></div>
              <img 
                :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ABA_PAY_${totalAmount}`" 
                alt="ABA QR Code" 
                class="qr-code"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useCardStore } from '@/stores/card_store';
import { useToastStore } from '@/stores/toast_store';
import { useRouter } from 'vue-router';

const router = useRouter();
const toastStore = useToastStore();
const cardStore = useCardStore();

// Modal state
let paymentModal = null;
const showQR = ref(false);

// Timer for the countdown
const countdown = ref(0);
const timerSeconds = ref(10);
let countdownInterval = null;

// Props
const props = defineProps({
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  }
});

// Format price function
const formatPrice = (price) => {
  if (!price) return null;
  return Math.floor(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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
      toastStore.showToast("បង់ប្រាក់ជោគជ័យ");
      closeModal();
      router.push('/success');
    }
  }, 1000);
};

// Add this method to handle credit card payment
const handleCreditCardPayment = () => {
  closeModal();
  // Use a small timeout to ensure the modal is fully closed before navigation
  setTimeout(() => {
    router.push('/waypay');
  }, 100);
};

// Close the modal
const closeModal = () => {
  showQR.value = false;
  clearInterval(countdownInterval);
  if (paymentModal) {
    paymentModal.hide();
    // Ensure focus is properly managed
    setTimeout(() => {
      const modalElement = document.getElementById('mdl-payment');
      if (modalElement) {
        modalElement.classList.remove('show');
        document.body.classList.remove('modal-open');
        const backdrops = document.getElementsByClassName('modal-backdrop');
        while (backdrops.length > 0) {
          backdrops[0].parentNode.removeChild(backdrops[0]);
        }
      }
    }, 150);
  }
};

// Initialize the modal with proper focus management
onMounted(() => {
  const modalElement = document.getElementById('mdl-payment');
  paymentModal = Modal.getOrCreateInstance(modalElement, {
    backdrop: 'static', // Prevent closing when clicking outside
    keyboard: true // Allow ESC key to close the modal
  });
  
  // Fix for aria-hidden issue
  modalElement.addEventListener('shown.bs.modal', () => {
    // Remove aria-hidden attribute when modal is shown
    modalElement.removeAttribute('aria-hidden');
  });
});

// Clean up interval when component is unmounted
onBeforeUnmount(() => {
  clearInterval(countdownInterval);
});

// Expose methods to parent components
defineExpose({
  showModal: () => {
    showQR.value = false;
    if (paymentModal) {
      paymentModal.show();
    }
  }
});
</script>

<style scoped>
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
