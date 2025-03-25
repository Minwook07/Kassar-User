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
          <h1 class="fw-bold" data-aos="fade-up" data-aos-delay="400">កំណត់ពាក្យសម្ងាត់ថ្មី</h1>
          <p class="text-secondary mt-3" data-aos="fade-up" data-aos-delay="500">
            សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នក
          </p>
        </div>

        <form @submit.prevent="resetPassword">
          <!-- New Password Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="600">
            <label for="password" class="form-label">ពាក្យសម្ងាត់ថ្មី</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
              :class="{ 'is-invalid': passwordError }"
              aria-label="New Password"
            />
            <div class="invalid-feedback" v-if="passwordError">
              {{ passwordError }}
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="700">
            <label for="confirmPassword" class="form-label">បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="form-control"
              placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត"
              :class="{ 'is-invalid': confirmPasswordError }"
              aria-label="Confirm New Password"
            />
            <div class="invalid-feedback" v-if="confirmPasswordError">
              {{ confirmPasswordError }}
            </div>
          </div>

          <!-- Password Requirements -->
          <div class="mb-3 text-muted small" data-aos="fade-up" data-aos-delay="800">
            <p>ពាក្យសម្ងាត់ត្រូវតែមាន:</p>
            <ul>
              <li :class="{ 'text-success': hasMinLength }">យ៉ាងហោចណាស់ 8 តួអក្សរ</li>
              <li :class="{ 'text-success': hasUppercase }">យ៉ាងហោចណាស់ 1 អក្សរធំ</li>
              <li :class="{ 'text-success': hasLowercase }">យ៉ាងហោចណាស់ 1 អក្សរតូច</li>
              <li :class="{ 'text-success': hasNumber }">យ៉ាងហោចណាស់ 1 លេខ</li>
              <li :class="{ 'text-success': hasSpecialChar }">យ៉ាងហោចណាស់ 1 តួអក្សរពិសេស</li>
            </ul>
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
            {{ loading ? 'កំពុងកំណត់...' : 'កំណត់ពាក្យសម្ងាត់ថ្មី' }}
          </button>
        </form>

        <!-- Success Message (shown after successful reset) -->
        <div v-if="successMessage" class="text-center mt-3" data-aos="fade-up" data-aos-delay="1100">
          <div class="alert alert-success">
            {{ successMessage }}
          </div>
          <router-link to="/login" class="btn btn-outline-success">
            ចូលទៅកាន់ទំព័រចូលគណនី
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import AOS from 'aos';
import { useRouter, useRoute } from 'vue-router';
import 'aos/dist/aos.css';

const router = useRouter();
const route = useRoute();
const password = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const apiError = ref("");
const successMessage = ref("");
const loading = ref(false);

const email = ref(route.query.email || "");
const token = ref(route.query.token || "");

onMounted(() => {
  AOS.init({ duration: 800, easing: 'ease', once: true, offset: 50 });
  
  // Validate token and email
  if (!email.value || !token.value) {
    router.push('/forgotpass');
  }
});

// Password strength indicators
const hasMinLength = computed(() => password.value.length >= 8);
const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const hasLowercase = computed(() => /[a-z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value));

const isPasswordValid = computed(() => {
  return (
    hasMinLength.value &&
    hasUppercase.value &&
    hasLowercase.value &&
    hasNumber.value &&
    hasSpecialChar.value
  );
});

function validateForm() {
  let isValid = true;
  
  // Reset errors
  passwordError.value = "";
  confirmPasswordError.value = "";
  
  // Validate password
  if (!password.value) {
    passwordError.value = "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី";
    isValid = false;
  } else if (!isPasswordValid.value) {
    passwordError.value = "ពាក្យសម្ងាត់មិនត្រឹមត្រូវតាមលក្ខខណ្ឌខាងលើ";
    isValid = false;
  }
  
  // Validate confirm password
  if (!confirmPassword.value) {
    confirmPasswordError.value = "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត";
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "ពាក្យសម្ងាត់មិនដូចគ្នា";
    isValid = false;
  }
  
  return isValid;
}

async function resetPassword() {
  if (!validateForm()) return;
  
  loading.value = true;
  apiError.value = "";
  
  try {
    const response = await axios.post("http://localhost/kassar_api/public/api/reset-password", {
      email: email.value,
      token: token.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    });
    
    // Show success message
    successMessage.value = "ពាក្យសម្ងាត់របស់អ្នកត្រូវបានកំណត់ឡើងវិញដោយជោគជ័យ! អ្នកអាចចូលឥឡូវនេះ។";
    
    // Clear form
    password.value = "";
    confirmPassword.value = "";
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "មានបញ្ហាក្នុងការកំណត់ពាក្យសម្ងាត់ឡើងវិញ។ សូមព្យាយាមម្តងទៀត";
    
    // If token is invalid or expired, redirect to forgot password
    if (error.response?.status === 401 || error.response?.status === 410) {
      setTimeout(() => {
        router.push('/forgotpass');
      }, 3000);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Password requirements styling */
.text-success {
  color: #28a745 !important;
}

/* Form control styling */
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

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

/* Button styling */
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

/* Success message styling */
.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
  border-radius: 8px;
}

.btn-outline-success {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-outline-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>