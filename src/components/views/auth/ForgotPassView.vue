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
          <h1 class="fw-bold">ភ្លេចពាក្យសម្ងាត់?</h1>
          <p class="text-secondary">បញ្ចូលអ៊ីម៉ែលរបស់អ្នកដើម្បីទទួលបានលេខកូដសម្រាប់ផ្ទៀងផ្ទាត់</p>
        </div>

        <form @submit.prevent="sendOTP">
          <div class="mb-3">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="បញ្ចូលអ៊ីមែល"
              :class="{ 'is-invalid': emailError }"
            />
            <div class="invalid-feedback" v-if="emailError">{{ emailError }}</div>
          </div>

          <div v-if="apiError" class="text-danger text-center mb-3">{{ apiError }}</div>
          <div v-if="successMessage" class="text-success text-center mb-3">{{ successMessage }}</div>

          <button type="submit" class="btn btn-login w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            {{ loading ? 'កំពុងផ្ញើ...' : 'ផ្ញើលេខកូដ' }}
          </button>
        </form>

        <div class="text-center mt-3">
        
          <p>ចងចាំពាក្យសម្ងាត់? <router-link to="/login" class="text-success">ចូលគណនី</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref("");
const emailError = ref("");
const apiError = ref("");
const successMessage = ref("");
const loading = ref(false);

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
    await axios.post("api/forgot-password", {
      email: email.value
    });
    
    successMessage.value = "លេខកូដត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នក!";
    
    // Redirect to OTP input page
    setTimeout(() => {
      router.push({ 
        name: 'VerifyOTP', 
        query: { email: email.value } 
      });
    }, 1500);
    
  } catch (error) {
    apiError.value = error.response?.data?.message || "មានបញ្ហា, សូមព្យាយាមម្តងទៀត";
  } finally {
    loading.value = false;
  }
}
</script>