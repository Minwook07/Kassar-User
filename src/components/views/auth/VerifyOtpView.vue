<template>
  <div class="frm-auth">
    <div class="row rounded-3 overflow-hidden">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white d-flex flex-column align-items-center justify-content-center">
        <h1 class="text-center fw-bold">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4">
        <div class="text-center">
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid" />
          <h1 class="fw-bold">ផ្ទៀងផ្ទាត់លេខកូដ</h1>
          <p class="text-secondary">
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
              :class="{ 'is-invalid': otp[index] === '' && isFormSubmitted }"
              @input="focusNextInput(index)"
              @keydown.delete="focusPreviousInput(index)"
              aria-label="OTP Digit"
            />
          </div>

          <!-- OTP Error -->
          <div v-if="isFormSubmitted && otp.some(digit => digit === '')" class="text-danger text-center mb-3">
            សូមបញ្ចូលលេខកូដទាំងអស់។
          </div>

          <!-- Countdown Timer -->
          <p class="countdown-text text-danger mt-2 text-center" v-if="resendCountdown > 0">
            សូមរង់ចាំ {{ resendCountdown }} វិនាទី
          </p>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100">ផ្ទៀងផ្ទាត់</button>
        </form>

        <!-- Resend OTP with Countdown -->
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
import { reactive, ref } from "vue";

// OTP data
const otp = reactive(["", "", "", "", ""]);
const isFormSubmitted = ref(false);
const resendCountdown = ref(0);
const isResending = ref(false); // To prevent multiple resend requests
let countdownInterval = null;

// Handle input focus logic
const focusNextInput = (index) => {
  if (index < otp.length - 1 && otp[index].length === 1) {
    const nextInput = document.querySelectorAll(".otp-input")[index + 1];
    nextInput?.focus();
  }
};

// Handle backspace to focus previous input
const focusPreviousInput = (index) => {
  if (index > 0 && otp[index].length === 0) {
    const prevInput = document.querySelectorAll(".otp-input")[index - 1];
    prevInput?.focus();
  }
};

// Handle form submission
const onSubmit = () => {
  isFormSubmitted.value = true;

  // Validate OTP
  if (otp.every(digit => digit !== "")) {
    console.log("OTP Submitted:", otp.join(""));

    // Simulate OTP verification
    otp.fill(""); // Clear OTP inputs after submission
    isFormSubmitted.value = false;
  }
};

// Resend OTP Function with Countdown
const resendOTP = () => {
  if (resendCountdown.value > 0 || isResending.value) return;

  isResending.value = true; // Disable resend button
  console.log("Resending OTP...");

  // Simulate API call to resend OTP
  setTimeout(() => {
    isResending.value = false; // Re-enable resend button after API call
  }, 1000); // Simulate 1 second API call delay

  // Start countdown
  resendCountdown.value = 10; // Start countdown from 10 seconds
  countdownInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
};
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
</style>