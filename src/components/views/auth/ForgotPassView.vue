<template>
  <div class="frm-auth">
    <div class="row rounded-4 shadow-lg overflow-hidden">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white d-none d-md-flex flex-column align-items-center justify-content-center p-5"
           data-aos="fade-right" 
           data-aos-duration="1000">
        <h1 class="text-center fw-bold mb-4"
            data-aos="fade-up" 
            data-aos-delay="200">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" 
             alt="auth" 
             class="img-fluid auth-img"
             data-aos="zoom-in" 
             data-aos-delay="400" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4"
           data-aos="fade-left" 
           data-aos-duration="1000">
        <div class="text-center"
             data-aos="fade-up" 
             data-aos-delay="300">
          <img src="@/assets/images/kassar_text.png" 
               alt="Kassar Logo" 
               class="img-fluid logo-img mb-3"
               data-aos="zoom-in" 
               data-aos-delay="500" />
          <h1 class="fw-bold">ភ្លេចពាក្យសម្ងាត់?</h1>
          <p class="text-secondary">
            បញ្ចូលអ៊ីម៉ែលរបស់អ្នកដើម្បីទទួលបានលេខកូដសម្រាប់ផ្ទៀងផ្ទាត់ (អ៊ីម៉ែលដែលភ្ជាប់ជាមួយគណនីរបស់អ្នក)
          </p>
        </div>

        <form @submit.prevent="sendOTP"
              data-aos="fade-up" 
              data-aos-delay="600">
          <!-- Email Field -->
          <div class="mb-3"
               data-aos="fade-up" 
               data-aos-delay="700">
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="បញ្ចូលអ៊ីមែល"
              :class="{ 'is-invalid': emailError }"
              aria-label="Email Address"
            />
            <div class="invalid-feedback" v-if="emailError">
              {{ emailError }}
            </div>
          </div>

          <!-- API Error Message -->
          <div v-if="apiError" class="text-danger text-center mb-3">
            {{ apiError }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="text-success text-center mb-3">
            {{ successMessage }}
          </div>

          <!-- Submit Button -->
          <button type="submit" 
                  class="btn btn-login w-100"
                  data-aos="fade-up" 
                  data-aos-delay="800"
                  :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ loading ? 'កំពុងផ្ញើ...' : 'ផ្ញើលេខកូដ' }}
          </button>
        </form>

        <!-- Signin Link -->
        <div class="text-center mt-3"
             data-aos="fade-up" 
             data-aos-delay="900">
          <p>ចងចាំពាក្យសម្ងាត់? <router-link to="/login" class="text-success text-decoration-none">ចូលគណនី</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AOS from 'aos';
import axios from "axios";
import { useRouter } from 'vue-router';
import 'aos/dist/aos.css';

const router = useRouter();
const email = ref("");
const emailError = ref("");
const apiError = ref("");
const successMessage = ref("");
const loading = ref(false);

onMounted(() => {
  AOS.init({
    once: true,
    offset: 50,
    easing: 'ease-in-out'
  });
});

function validateEmail() {
  emailError.value = "";
  if (!email.value) {
    emailError.value = "សូមបញ្ចូលអ៊ីមែល";
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = "សូមបញ្ចូលទម្រង់អ៊ីមែលឲ្យបានត្រឹមត្រូវ";
    return false;
  }
  
  return true;
}

async function sendOTP() {
  if (!validateEmail()) return;
  
  loading.value = true;
  apiError.value = "";
  successMessage.value = "";
  
  try {
    const response = await axios.post("http://localhost/kassar_api/public/api/forgot-password", {
      email: email.value
    });
    
    successMessage.value = "លេខកូដត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នក! សូមពិនិត្យក្នុងអ៊ីមែល។";
    
    // Redirect to OTP verification after 2 seconds
    setTimeout(() => {
      router.push({ 
        name: 'verifyotp', 
        query: { email: email.value } 
      });
    }, 2000);
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "មានបញ្ហា, សូមព្យាយាមម្តងទៀត";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Animation styles for validation feedback */
.form-control.is-invalid {
  border-color: #dc3545;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.invalid-feedback {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.form-control.is-invalid + .invalid-feedback {
  opacity: 1;
  transform: translateY(0);
}

/* Button animations */
.btn-login {
  transition: all 0.3s ease;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #218838;
}

.btn-login:disabled {
  background-color: #6c757d;
  opacity: 0.65;
}

/* Router link animation */
.text-success {
  position: relative;
  transition: color 0.3s ease;
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

.text-success:hover::after {
  width: 100%;
}
</style>