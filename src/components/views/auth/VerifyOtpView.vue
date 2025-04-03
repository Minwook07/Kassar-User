<template>
  <div class="frm-auth">
    <div class="row rounded-4 shadow-lg overflow-hidden">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white d-none d-md-flex flex-column align-items-center justify-content-center p-5">
        <h1 class="text-center fw-bold mb-4">Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប</h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid auth-img" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4">
        <div class="text-center">
          <router-link to="/" class="img-fluid mb-3" data-aos="zoom-in" data-aos-delay="500">
            <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3" />
          </router-link>
          <h1 class="fw-bold">ផ្ទៀងផ្ទាត់លេខកូដ</h1>
          <p class="text-secondary mt-3">
            បញ្ចូលលេខកូដ 6 ខ្ទង់ដែលផ្ញើទៅកាន់<br>
            <span class="text-primary">{{ maskedEmail }}</span>
          </p>
        </div>

        <form @submit.prevent="verifyOTP">
          <!-- OTP Input Fields -->
          <div class="d-flex justify-content-center gap-2 mb-4">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              type="text"
              v-model="otp[index]"
              maxlength="1"
              class="form-control text-center otp-input"
              @input="focusNext(index, $event)"
              @keydown.delete="focusPrev(index, $event)"
              @keypress="validateInput"
              ref="otpInputs"
            />
          </div>

          <div v-if="otpError" class="text-danger text-center mb-3">{{ otpError }}</div>
          <div v-if="apiError" class="text-danger text-center mb-3">{{ apiError }}</div>

          <button type="submit" class="btn btn-login w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ loading ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'ផ្ទៀងផ្ទាត់' }}
          </button>
        </form>

        <div class="text-center mt-3">
          <p>មិនទទួលបានលេខកូដ? 
            <a href="#" class="text-success" @click.prevent="resendOTP" v-if="canResend">
              ផ្ញើលេខកូដម្តងទៀត
            </a>
            <span v-else class="text-muted">
              ផ្ញើលេខកូដម្តងទៀតរយៈពេល {{ countdown }} វិនាទី
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const otp = ref(["", "", "", "", "", ""]);
const otpInputs = ref([]);
const otpError = ref("");
const apiError = ref("");
const loading = ref(false);
const email = ref(route.query.email || "");
const canResend = ref(false);
const countdown = ref(60);
let countdownInterval = null;

const maskedEmail = computed(() => {
  if (!email.value) return "";
  const [name, domain] = email.value.split("@");
  return `${name.substring(0, 2)}***@${domain}`;
});

// Start countdown timer when component mounts
onMounted(() => {
  startCountdown();
  if (otpInputs.value[0]) {
    otpInputs.value[0].focus();
  }
});

function startCountdown() {
  canResend.value = false;
  countdown.value = 60;
  
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      canResend.value = true;
    }
  }, 1000);
}

function validateInput(e) {
  const inputChar = e.key;
  // Allow letters and digits
  if (!/[a-zA-Z0-9]/.test(inputChar)) {
    e.preventDefault();
  }
}

function focusNext(index, e) {
  if (e.target.value && index < 5) {
    otpInputs.value[index + 1].focus();
  }
}

function focusPrev(index, e) {
  if (!e.target.value && index > 0) {
    otpInputs.value[index - 1].focus();
  }
}

async function verifyOTP() {
  const otpCode = otp.value.join("");

  // Validate OTP length
  if (otpCode.length !== 6) {
    otpError.value = "សូមបញ្ចូលលេខកូដ 6 ខ្ទង់";
    return;
  }

  if (!email.value) {
    apiError.value = "សូមបញ្ចូលអ៊ីមែល";
    return;
  }

  loading.value = true; // Set loading to true
  otpError.value = "";
  apiError.value = "";
  
  try {
    // Verify OTP first
    await axios.post("/api/send-otp", {
      email: email.value,
      otp: otpCode
    });

    // Redirect to reset password with email and OTP
    router.push({
      name: 'ResetPassword',
      query: {
        email: email.value,
        otp: otpCode
      }
    });
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "លេខកូដមិនត្រឹមត្រូវ ឬបានផុតកំណត់";
    otp.value = ["", "", "", "", "", ""];
    if (otpInputs.value[0]) otpInputs.value[0].focus();
  } finally {
    loading.value = false; // Reset loading state
  }
}

async function resendOTP() {
  if (!canResend.value) return;
  
  try {
    loading.value = true; // Set loading to true
    await axios.post("/api/forgot-password", {
      email: email.value
    });
    
    // Reset messages and OTP fields
    apiError.value = "";
    otpError.value = "លេខកូដត្រូវបានផ្ញើឡើងវិញ!";
    otp.value = ["", "", "", "", "", ""];
    if (otpInputs.value[0]) otpInputs.value[0].focus();
    
    // Start countdown again
    startCountdown();
  } catch (error) {
    apiError.value = error.response?.data?.message || "មានបញ្ហាក្នុងការផ្ញើលេខកូដឡើងវិញ";
  } finally {
    loading.value = false; // Reset loading state
  }
}

// Clean up interval when component unmounts
onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<style scoped>
.btn-login {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
}

.btn-login:hover {
  background-color: #158649;
}

.btn-login:disabled {
  background-color: #6c757d;
}

.otp-input {
  width: 45px;
  height: 60px;
  font-size: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
}

.form-control:focus {
  outline: #2ecc71!important;
  border-color: #2ecc71!important;
  box-shadow: none;
}

.otp-input:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.text-primary {
  color: #007bff !important;
}

.text-success {
  color: #28a745 !important;
  text-decoration: none;
  font-weight: bold;
}

.text-success:hover {
  text-decoration: underline;
}

.text-muted {
  color: #6c757d !important;
}
</style>