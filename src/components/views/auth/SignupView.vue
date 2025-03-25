<template>
  <div class="frm-auth">
    <div class="row rounded-4 shadow-lg overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
      <!-- Left Section -->
      <div
        class="col-md-6 left-section text-white d-none d-md-flex flex-column align-items-center justify-content-center p-5"
        data-aos="fade-right" data-aos-delay="200">
        <h1 class="text-center fw-bold mb-4">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid auth-img" data-aos="zoom-in"
          data-aos-delay="400" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4" data-aos="fade-left" data-aos-delay="200">
        <div class="text-center">
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3"
            data-aos="zoom-in" data-aos-delay="300" />
          <h1 class="fw-bold" data-aos="fade-up" data-aos-delay="400">បង្កើតគណនី</h1>
          <p class="text-secondary" data-aos="fade-up" data-aos-delay="500">
            សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី
          </p>
        </div>

        <form @submit.prevent="onSubmit">
          <!-- Full Name Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="600">
            <input type="text" id="fullName" v-model="useAuth.frm.name" class="form-control" placeholder="ឈ្មោះពេញ"
              :class="{ 'is-invalid': useAuth.vv.name.$error }" />
            <div class="invalid-feedback" v-if="useAuth.vv.name.$error">
              {{ useAuth.vv.name.$errors[0].$message }}
            </div>
          </div>

          <!-- Email Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="700">
            <input type="email" id="email" v-model="useAuth.frm.email" class="form-control" placeholder="បញ្ចូលអ៊ីមែល"
              :class="{ 'is-invalid': useAuth.vv.email.$error }" />
            <div class="invalid-feedback" v-if="useAuth.vv.email.$error">
              {{ useAuth.vv.email.$errors[0].$message }}
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="800">
            <input 
              :type="visibility.password ? 'text' : 'password'" 
              id="password" 
              v-model="useAuth.frm.password" 
              class="form-control password-input" 
              placeholder="បញ្ចូលលេខសម្ងាត់" 
              :class="{ 'is-invalid': useAuth.vv.password.$error }" 
            />
            <i 
              @click="toggleVisibility('password')" 
              :class="['bi', visibility.password ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle']"
              aria-label="Toggle password visibility"
            ></i>
            <div class="invalid-feedback" v-if="useAuth.vv.password.$error">
              {{ useAuth.vv.password.$errors[0].$message }}
            </div>
          </div>

          <!-- Password Confirmation Field -->
          <div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="900">
            <input 
              :type="visibility.password_confirmation ? 'text' : 'password'" 
              id="password_confirmation" 
              v-model="useAuth.frm.password_confirmation" 
              class="form-control" 
              placeholder="បញ្ចូលពាក្យសម្ងាត់ឡើងវិញ" 
              :class="{ 'is-invalid': useAuth.vv.password_confirmation.$error }" 
            />
            <i 
              @click="toggleVisibility('password_confirmation')" 
              :class="['bi', visibility.password_confirmation ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle']"
              aria-label="Toggle password visibility"
            ></i>
            <div class="invalid-feedback" v-if="useAuth.vv.password_confirmation.$error">
              {{ useAuth.vv.password_confirmation.$errors[0].$message }}
            </div>
          </div>

          <!-- Terms Agreement -->
          <div class="form-check mb-2" data-aos="fade-up" data-aos-delay="900">
            <input type="checkbox" id="termsAgreement" v-model="useAuth.frm.termsAgreement" class="form-check-input"
              :class="{ 'border-danger': useAuth.vv.termsAgreement.$error }" />
            <label for="termsAgreement" class="form-check-label">យល់ព្រមនូវលក្ខណ្ឌគោលការណ៍</label>
            <div class="invalid-feedback" v-if="useAuth.vv.termsAgreement.$error">
              {{ useAuth.vv.termsAgreement.$errors[0].$message }}
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100 mt-2" data-aos="fade-up" data-aos-delay="1000">
            ចុះឈ្មោះ
          </button>
        </form>

        <!-- Signin Link -->
        <div class="text-center mt-3" data-aos="fade-up" data-aos-delay="1100">
          <p>
            មានគណនីរួចហើយមែនទេ?
            <router-link to="/login" class="text-success">ចូលគណនី</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { helpers, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useAuthStore } from "@/stores/auth_store";

// Get the auth store instance
const useAuth = useAuthStore();

// Initialize AOS when component is mounted
onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 50,
  });
});

// Password Visibility Management
const visibility = reactive({
  password: false,
  password_confirmation: false,
});

const toggleVisibility = (field) => {
  visibility[field] = !visibility[field];
};

// Define validation rules
const rules = computed(() => ({
  name: {
    required: helpers.withMessage("សូមបញ្ចូលឈ្មោះពេញ", helpers.req),
    minLength: helpers.withMessage("ឈ្មោះត្រូវតែមានយ៉ាងតិច 2 តួអក្សរ", (value) => value && value.length >= 2)
  },
  email: {
    required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
    email: helpers.withMessage("សូមបញ្ចូលអ៊ីមែលឲ្យបានត្រឹមត្រូវ", email)
  },
  password: {
    required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", helpers.req),
    minLength: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួ", (value) => value && value.length >= 8),
    hasLowercase: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានអក្សរតូច", (value) => /[a-z]/.test(value)),
    hasUppercase: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានអក្សរធំ", (value) => /[A-Z]/.test(value)),
    hasNumber: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានលេខ", (value) => /\d/.test(value)),
    hasSpecialChar: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានតួអក្សរពិសេស", (value) => /[!@#$%^&*]/.test(value))
  },
  password_confirmation: {
    required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់បញ្ជាក់", helpers.req),
    sameAsPassword: helpers.withMessage("ពាក្យសម្ងាត់បញ្ជាក់មិនត្រូវគ្នា", (value) => value === useAuth.frm.password)
  },
  termsAgreement: {
    isChecked: helpers.withMessage("", (value) => value === true)
  }
}));

// Apply Vuelidate
useAuth.vv = useVuelidate(rules, useAuth.frm);

function onSubmit() {
  useAuth.vv.$validate();

  if (useAuth.vv.$error) {
    return;
  }

  const formData = {
    name: useAuth.frm.name,
    email: useAuth.frm.email,
    password: useAuth.frm.password,
    password_confirmation: useAuth.frm.password_confirmation,
    termsAgreement: useAuth.frm.termsAgreement,
  };

  // API request
  axios.post("http://localhost/kassar_api/public/api/auth/register", formData)
    .then(() => {
      alert("ចុះឈ្មោះជោគជ័យ!");
      // Optionally, redirect or perform additional actions after successful registration
    })
    .catch((err) => {
      const errors = err.response?.data.errors || err.response?.data.message;
      alert("Error: " + errors);
    });
}
</script>

<style scoped>
.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 10;
}

.password-toggle:hover {
  color: #212529;
}

/* Adjust position when validation error is present */
.is-invalid + .password-toggle {
  top: 35%;
  right: 40px;
}

.border-danger {
  border: 2px solid #e93a4b !important;
}
</style>