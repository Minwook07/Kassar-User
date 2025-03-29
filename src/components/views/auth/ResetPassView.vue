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
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3" />
          <h1 class="fw-bold">កំណត់ពាក្យសម្ងាត់ថ្មី</h1>
          <p class="text-secondary mt-3">សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នក</p>
        </div>

        <form @submit.prevent="resetPassword">
          <div class="mb-3">
            <label class="form-label">ពាក្យសម្ងាត់ថ្មី</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
              :class="{ 'is-invalid': passwordError }"
              @input="validatePassword"
            />
            <div class="invalid-feedback" v-if="passwordError">{{ passwordError }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
            <input
              type="password"
              v-model="confirmPassword"
              class="form-control"
              placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត"
              :class="{ 'is-invalid': confirmPasswordError }"
              @input="validatePasswordConfirmation"
            />
            <div class="invalid-feedback" v-if="confirmPasswordError">{{ confirmPasswordError }}</div>
          </div>

          <div class="mb-3 text-muted small">
            <p>ពាក្យសម្ងាត់ត្រូវតែមាន:</p>
            <ul>
              <li :class="{ 'text-success': password.length >= 8 }">យ៉ាងហោចណាស់ 8 តួអក្សរ</li>
              <li :class="{ 'text-success': hasUppercase }">យ៉ាងហោចណាស់ 1 អក្សរធំ</li>
              <li :class="{ 'text-success': hasNumber }">យ៉ាងហោចណាស់ 1 លេខ</li>
            </ul>
          </div>

          <div v-if="apiError" class="text-danger text-center mb-3">{{ apiError }}</div>
          <div v-if="successMessage" class="alert alert-success text-center">{{ successMessage }}</div>

          <button type="submit" class="btn btn-login w-100" :disabled="loading || !isFormValid">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            {{ loading ? 'កំពុងកំណត់...' : 'កំណត់ពាក្យសម្ងាត់ថ្មី' }}
          </button>
        </form>

        <div v-if="successMessage" class="text-center mt-3">
          <router-link to="/login" class="btn btn-outline-success">ចូលទៅកាន់ទំព័រចូលគណនី</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Form data
const email = ref(route.query.email || "");
const otp = ref(route.query.otp || "");
const password = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const apiError = ref("");
const successMessage = ref("");
const loading = ref(false);

// Password strength indicators
const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));

// Form validation
const isFormValid = computed(() => {
  return password.value.length >= 8 && 
         hasUppercase.value && 
         hasNumber.value && 
         password.value === confirmPassword.value;
});

const validatePassword = () => {
  passwordError.value = "";
  if (!password.value) {
    passwordError.value = "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី";
  } else if (password.value.length < 8) {
    passwordError.value = "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ";
  } else if (!hasUppercase.value) {
    passwordError.value = "ត្រូវមានយ៉ាងហោចណាស់ 1 អក្សរធំ";
  } else if (!hasNumber.value) {
    passwordError.value = "ត្រូវមានយ៉ាងហោចណាស់ 1 លេខ";
  }
};

const validatePasswordConfirmation = () => {
  confirmPasswordError.value = "";
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "ពាក្យសម្ងាត់មិនដូចគ្នា";
  }
};

// Verify required data on mount
onMounted(() => {
  if (!email.value || !otp.value) {
    apiError.value = "សូមព្យាយាមម្តងទៀត ឬស្នើសុំលេខកូដថ្មី";
    router.push('/forgot-password');
  }
});

async function resetPassword() {
  validatePassword();
  validatePasswordConfirmation();
  
  if (!isFormValid.value) return;

  loading.value = true;
  apiError.value = "";

  try {
    const response = await axios.post("api/reset-password", 
      {
        email: email.value,
        otp: otp.value,
        password: password.value,
        password_confirmation: confirmPassword.value
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    successMessage.value = "ពាក្យសម្ងាត់របស់អ្នកត្រូវបានកំណត់ឡើងវិញដោយជោគជ័យ!";
    
    // Auto-redirect after 2 seconds
    setTimeout(() => {
      router.push('/login');
    }, 2000);
    
  } catch (error) {
    apiError.value = error.response?.data?.message || 
                    error.response?.data?.error || 
                    "មានបញ្ហាក្នុងការកំណត់ពាក្យសម្ងាត់ឡើងវិញ";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Your existing styles */
.otp-input {
  width: 45px;
  height: 60px;
  font-size: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
}

.otp-input:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
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
</style>