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
            <input type="checkbox" id="terms_accepted" v-model="useAuth.frm.terms_accepted" class="form-check-input"
              :class="{ 'border-danger': useAuth.vv.terms_accepted.$error }" />
            <label for="terms_accepted" class="form-check-label">យល់ព្រមនូវលក្ខណ្ឌគោលការណ៍</label>
            <div class="invalid-feedback" v-if="useAuth.vv.terms_accepted.$error">
              {{ useAuth.vv.terms_accepted.$errors[0].$message }}
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

  <!-- Toast Container -->
  <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="margin-top: 50px;">
    <div id="liveToast" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="false">
      <div class="toast-content p-3">
        <div>
          <i :class="toastIcon"></i>
        </div>

        <div class="message">
          <span class="text text-1">{{ toastMessage }}</span>
        </div>
        <div>
          <button type="button" class="btn btn-close border-0 ms-auto p-0" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
      <div class="progress active"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, ref } from "vue";
import { helpers, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useAuthStore } from "@/stores/auth_store";
import { Toast } from 'bootstrap';
import { useRouter } from 'vue-router';

// Get the auth store instance
const useAuth = useAuthStore();
const router = useRouter();

// Password Visibility Management
const visibility = reactive({
  password: false,
  password_confirmation: false,
});

const toggleVisibility = (field) => {
  visibility[field] = !visibility[field];
};

// Toast Management
const toastMessage = ref('');
const toastIcon = ref('bi bi-check2-circle fs-5 text-success');
let toastInstance = null;

// Initialize AOS and Toast when component is mounted
onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 50,
  });

  // Initialize Bootstrap Toast
  toastInstance = Toast.getOrCreateInstance(document.getElementById('liveToast'));
});

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
  terms_accepted: {
    isChecked: helpers.withMessage("សូមយល់ព្រមលក្ខខ័ណ្ឌ", (value) => value === true)
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
    terms_accepted: useAuth.frm.terms_accepted,
  };

  // API request
  axios.post("http://localhost/kassar_api/public/api/auth/register", formData)
    .then(() => {
      // Show success toast
      if (toastInstance) {
        toastMessage.value = 'ចុះឈ្មោះជោKជ័យ';
        toastIcon.value = 'bi bi-check2-circle fs-5 text-success';
        toastInstance.show();

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    })
    .catch((err) => {
      const errors = err.response?.data.errors || err.response?.data.message;
      
      // Show error toast
      if (toastInstance) {
        toastMessage.value = 'មានកំហុស: ' + (typeof errors === 'object' ? Object.values(errors)[0] : errors);
        toastIcon.value = 'bi bi-x-circle fs-5 text-danger';
        toastInstance.show();
      }
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

.is-invalid + .password-toggle {
  top: 35%;
  right: 40px;
}

.border-danger {
  border: 2px solid #e93a4b !important;
}

</style>
