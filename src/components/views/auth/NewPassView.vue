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
          <h1 class="fw-bold" data-aos="fade-up" data-aos-delay="400">ភ្លេចពាក្យសម្ងាត់</h1>
          <p class="text-secondary mt-3" data-aos="fade-up" data-aos-delay="500">
            សូមបញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ
          </p>
        </div>

        <form @submit.prevent="sendOTP">
          <!-- Email Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="600">
            <label for="email" class="form-label">អ៊ីមែល</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
              :class="{ 'is-invalid': emailError }"
              aria-label="Email"
              required
            />
            <div class="invalid-feedback" v-if="emailError">
              {{ emailError }}
            </div>
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
            {{ loading ? 'កំពុងផ្ញើ...' : 'ផ្ញើ' }}
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center mt-3" data-aos="fade-up" data-aos-delay="1100">
          <p>មានគណនីរួចហើយ? 
            <router-link to="/login" class="text-success">
              ចូលទៅកាន់គណនី
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AOS from 'aos';
import { useRouter } from 'vue-router';
import 'aos/dist/aos.css';

const router = useRouter();
const email = ref("");
const emailError = ref("");
const apiError = ref("");
const loading = ref(false);

onMounted(() => {
  AOS.init({ duration: 800, easing: 'ease', once: true, offset: 50 });
});

function validateEmail() {
  emailError.value = "";
  
  if (!email.value) {
    emailError.value = "សូមបញ្ចូលអ៊ីមែល";
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = "សូមបញ្ចូលអ៊ីមែលឲ្យបានត្រឹមត្រូវ";
    return false;
  }
  
  return true;
}

async function sendOTP() {
  if (!validateEmail()) return;
  
  loading.value = true;
  apiError.value = "";
  
  try {
    await axios.post("http://localhost/kassar_api/public/api/forgot-password", {
      email: email.value
    });
    
    // Navigate to OTP verification page
    router.push({ 
      name: 'VerifyOTP', 
      query: { email: email.value } 
    });
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "មានបញ្ហាក្នុងការផ្ញើ OTP។ សូមព្យាយាមម្តងទៀត";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Styles are similar to the previous components */
.form-control {
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
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
  transition: color 0.3s ease;
}

.text-success:hover {
  color: #218838 !important;
}
</style>
