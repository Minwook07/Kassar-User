<template>
  <div class="frm-auth">
    <div class="row rounded-4 shadow-lg overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white d-none d-md-flex flex-column align-items-center justify-content-center p-5"
           data-aos="fade-right" data-aos-delay="200">
        <h1 class="text-center fw-bold mb-4">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid auth-img" data-aos="zoom-in" data-aos-delay="400" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4" data-aos="fade-left" data-aos-delay="200">
        <div class="text-center">
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3" 
               data-aos="zoom-in" data-aos-delay="300" />
          <h1 class="fw-bold" data-aos="fade-up" data-aos-delay="400">ផ្ទៀងផ្ទាត់លេខកូដ</h1>
          <p class="text-secondary mt-3" data-aos="fade-up" data-aos-delay="500">
            សូមបញ្ចូលលេខកូដ 6 ខ្ទង់ដែលយើងទើបតែផ្ញើទៅកាន់អ៊ីមែល
            <span class="text-primary">{{ maskedEmail }}</span>
          </p>
        </div>

        <form @submit.prevent="verifyOTP">
          <!-- OTP Fields -->
          <div class="mb-3 d-flex justify-content-evenly" data-aos="fade-up" data-aos-delay="600">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              type="text"
              v-model="otp[index]"
              maxlength="1"
              class="otp-input form-control text-center"
              :class="{ 'is-invalid': otpError }"
              @input="handleInput(index, $event)"
              @keydown.delete="handleBackspace(index, $event)"
              @keypress="restrictToNumbers"
              aria-label="OTP Digit"
              ref="otpInputs"
            />
          </div>
          
          <div class="invalid-feedback text-center" v-if="otpError">
            {{ otpError }}
          </div>

          <!-- API Error Message -->
          <div v-if="apiError" class="text-danger text-center mb-3" data-aos="fade-up" data-aos-delay="900">
            {{ apiError }}
          </div>

          <!-- Submit Button -->
          <button type="submit" 
                  class="btn btn-login w-100" 
                  data-aos="fade-up" 
                  data-aos-delay="1000"
                  :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ loading ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'ផ្ទៀងផ្ទាត់' }}
          </button>
        </form>

        <!-- Resend OTP -->
        <div class="text-center mt-3" data-aos="fade-up" data-aos-delay="1100">
          <p>មិនទទួលបានលេខកូដ? 
            <a href="#" class="text-success" @click.prevent="resendOTP" :class="{ 'disabled': resendCooldown > 0 }">
              ផ្ញើលេខកូដម្តងទៀត 
              <span v-if="resendCooldown > 0">({{ resendCooldown }}s)</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import axios from "axios";
import AOS from 'aos';
import { useRouter, useRoute } from 'vue-router';
import 'aos/dist/aos.css';

const router = useRouter();
const route = useRoute();
const otp = ref(["", "", "", "", "", ""]);
const otpInputs = ref([]);
const otpError = ref("");
const apiError = ref("");
const loading = ref(false);
const resendCooldown = ref(0);
const email = ref(route.query.email || "");

const maskedEmail = computed(() => {
  if (!email.value) return "";
  const [name, domain] = email.value.split("@");
  const maskedName = name.substring(0, 2) + "*".repeat(name.length - 2);
  return `${maskedName}@${domain}`;
});

onMounted(() => {
  AOS.init({ duration: 800, easing: 'ease', once: true, offset: 50 });
  
  // Start cooldown timer (set to 60 seconds)
  startCooldown();
  
  // Focus first OTP input
  nextTick(() => {
    if (otpInputs.value[0]) {
      otpInputs.value[0].focus();
    }
  });
});

function startCooldown() {
  resendCooldown.value = 60; // Set cooldown to 60 seconds
  const timer = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

const restrictToNumbers = (event) => {
  if (!/\d/.test(event.key)) {
    event.preventDefault();
  }
};

const handleInput = (index, event) => {
  otpError.value = "";
  
  // Auto-focus next input
  if (event.target.value && index < otp.value.length - 1) {
    nextTick(() => {
      otpInputs.value[index + 1]?.focus();
    });
  }
};

const handleBackspace = (index, event) => {
  if (!event.target.value && index > 0) {
    nextTick(() => {
      otpInputs.value[index - 1]?.focus();
    });
  }
};

function validateOTP() {
  const otpString = otp.value.join("");
  if (otpString.length !== 6) {
    otpError.value = "សូមបញ្ចូលលេខកូដ 6 ខ្ទង់";
    return false;
  }
  return true;
}

async function verifyOTP() {
  if (!validateOTP()) return;
  
  loading.value = true;
  apiError.value = "";
  
  try {
    const response = await axios.post("http://localhost/kassar_api/public/api/send-otp", {
      email: email.value,
      otp: otp.value.join("")
    });
    
    // Redirect to reset password page with token
    router.push({ 
      name: 'ResetPassword', 
      query: { 
        email: email.value,
        token: response.data.token 
      }
    });
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "ការផ្ទៀងផ្ទាត់បរាជ័យ។ សូមព្យាយាមម្តងទៀត";
    // Clear OTP on error
    otp.value = ["", "", "", "", "", ""];
    nextTick(() => {
      if (otpInputs.value[0]) {
        otpInputs.value[0].focus();
      }
    });
  } finally {
    loading.value = false;
  }
}

async function resendOTP() {
  if (resendCooldown.value > 0) return;
  
  loading.value = true;
  apiError.value = "";
  
  try {
    await axios.post("http://localhost/kassar_api/public/api/forgot-password", {
      email: email.value
    });
    
    // Start new cooldown (set to 60 seconds)
    startCooldown();
    
    // Show success message
    apiError.value = "";
    otpError.value = "លេខកូដត្រូវបានផ្ញើឡើងវិញ! សូមពិនិត្យអ៊ីមែលរបស់អ្នក។";
    
    // Clear OTP fields
    otp.value = ["", "", "", "", "", ""];
    nextTick(() => {
      if (otpInputs.value[0]) {
        otpInputs.value[0].focus();
      }
    });
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "មានបញ្ហាក្នុងការផ្ញើលេខកូដឡើងវិញ។ សូមព្យាយាមម្តងទៀត";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.otp-input {
  width: 45px;
  height: 60px;
  font-size: 1.5rem;
  margin: 0 4px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.otp-input:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

.otp-input.is-invalid {
  border-color: #dc3545;
}

.otp-input.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.btn-login {
  background-color: #28a745;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-login:disabled {
  background-color: #6c757d;
  opacity: 0.65;
}

.text-success {
  position: relative;
  transition: color 0.3s ease;
}

.text-success:hover:not(.disabled) {
  color: #218838 !important;
}

.text-success.disabled {
  color: #6c757d !important;
  cursor: not-allowed;
}

.text-success::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.text-success:hover:not(.disabled)::after {
  width: 100%;
}
</style>
