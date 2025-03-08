<template>
  <div class="frm-auth">
    <div class="row rounded-4 shadow-lg overflow-hidden">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white  d-none d-md-flex flex-column align-items-center justify-content-center p-5">
        <h1 class="text-center fw-bold mb-4">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid auth-img" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4">
        <div class="text-center">
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3" />
          <h1 class="fw-bold">ផ្ទៀងផ្ទាត់លេខកូដ</h1>
          <p class="text-secondary mt-3">
            សូមបញ្ចូលលេខកូដដែលយើងទើបតែផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក
          </p>
        </div>

        <form @submit.prevent="onSubmit">
          <!-- OTP Fields -->
          <div class="mb-3 d-flex justify-content-evenly">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              type="text"
              v-model="otp[index]"
              maxlength="1"
              class="otp-input form-control"
              :class="{ 'is-invalid': isFormSubmitted && otp[index].trim() === '' }"
              @input="handleInput(index, $event)"
              @keydown.delete="handleBackspace(index, $event)"
              @keypress="restrictToNumbers(index, $event)"
              :title="validationMessages[index]"
              aria-label="OTP Digit"
            />
          </div>

          <!-- OTP Error -->
          <div v-if="isFormSubmitted && isOTPIncomplete" class="text-danger text-center mb-3">
            សូមបញ្ចូលលេខកូដទាំងអស់។
          </div>

          <!-- Countdown Timer -->
          <p class="countdown-text text-danger mt-2 text-center" v-if="resendCountdown > 0">
            រយៈពេលនៅសល់​​​​៖​​ {{ formatTime(resendCountdown) }} វិនាទី
          </p>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100">ផ្ទៀងផ្ទាត់</button>
        </form>

        <!-- Resend OTP -->
        <div class="text-center mt-3">
          <p>មិនទទួលបានលេខកូដសម្រាប់ផ្ទៀងផ្ទាត់? 
            <a href="#" class="text-success" :class="{ 'disabled': resendCountdown > 0 || isResending }" @click.prevent="resendOTP">
              ផ្ញើលេខកូដម្តងទៀត
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";

const otp = reactive(["", "", "", "", "", ""]);
const isFormSubmitted = ref(false);
const resendCountdown = ref(300); // Start with 5 minutes (300 seconds)
const isResending = ref(false);
const isDisabled = ref(false);
const validationMessages = reactive(["", "", "", "", "", ""]);
let countdownInterval = null;

// Computed property to check if OTP is incomplete
const isOTPIncomplete = computed(() => otp.some(digit => digit === ""));

// Format time to display as MM:SS
const formatTime = (seconds) => `${seconds}`;

// Restrict input to numbers only and show a validation message
const restrictToNumbers = (index, event) => {
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
    validationMessages[index] = "សូមបញ្ចូលជាលេខ";
    setTimeout(() => (validationMessages[index] = ""), 2000);
  }
};

// Handle input focus and auto-move to next
const handleInput = (index) => {
  if (index < otp.length - 1 && otp[index]) {
    document.querySelectorAll(".otp-input")[index + 1]?.focus();
  }
};

// Handle backspace key
const handleBackspace = (index) => {
  if (index > 0 && !otp[index]) {
    document.querySelectorAll(".otp-input")[index - 1]?.focus();
  }
};

// Handle OTP form submission
const onSubmit = () => {
  isFormSubmitted.value = true;

  if (!isOTPIncomplete.value) {
    console.log("OTP Submitted:", otp.join(""));
    otp.fill(""); // Clear OTP fields
    isFormSubmitted.value = false;
  }
};

// Start OTP resend countdown
const startResendCountdown = () => {
  countdownInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
};

// Resend OTP logic
const resendOTP = () => {
  if (resendCountdown.value > 0 || isResending.value) return;

  isResending.value = true;
  isDisabled.value = true; // Disable inputs

  console.log("Resending OTP...");

  setTimeout(() => {
    isResending.value = false;
    isDisabled.value = false; // Re-enable inputs
    resendCountdown.value = 300; // Reset countdown to 5 minutes
    startResendCountdown();
  }, 1000);
};

// Start the countdown when the component is mounted
onMounted(() => {
  startResendCountdown();
});
</script>

<style scoped>
.otp-input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
  margin: 0 4px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.otp-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.is-invalid {
  border-color: #dc3545;
}

.countdown-text {
  font-size: 14px;
  font-weight: bold;
}

.btn-login {
  background-color: #28a745;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
}

.btn-login:hover {
  background-color: #218838;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.frm-auth input.is-invalid {
  background-image: none !important;
}
.otp-input[data-v-dfc555f2] {
  font-size: 15px !important;
}
</style>