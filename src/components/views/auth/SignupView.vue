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
          <h1 class="fw-bold" data-aos="fade-up" data-aos-delay="400">បង្កើតគណនី</h1>
          <p class="text-secondary" data-aos="fade-up" data-aos-delay="500">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
        </div>

        <form @submit.prevent="onSubmit">
          <!-- Full Name Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="600">
            <input
              type="text"
              id="fullName"
              v-model="form.fullName"
              class="form-control"
              placeholder="ឈ្មោះពេញ"
              :class="{ 'is-invalid': $v.form.fullName.$dirty && $v.form.fullName.$error }"
            />
            <div class="invalid-feedback" v-if="$v.form.fullName.$dirty && $v.form.fullName.$error">
              {{ $v.form.fullName.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Email Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="700">
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-control"
              placeholder="បញ្ចូលអ៊ីមែល"
              :class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$error }"
            />
            <div class="invalid-feedback" v-if="$v.form.email.$dirty && $v.form.email.$error">
              {{ $v.form.email.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="800">
            <input
              :type="visibility.password ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="form-control password-input"
              placeholder="បញ្ចូលលេខសម្ងាត់"
              :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }"
            />
            <i @click="toggleVisibility('password')"
               :class="['bi', visibility.password ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle', { 'shift-left': $v.form.password.$dirty && $v.form.password.$error }]"
               class="position-absolute"></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
          </div>
          
          <div class="form-check mb-2" data-aos="fade-up" data-aos-delay="900">
            <input 
              type="checkbox" 
              id="termsAgreement" 
              v-model="form.termsAgreement" 
              class="form-check-input"
              :class="{ 'border-danger': showTermsError }" 
            />
            <label for="termsAgreement" class="form-check-label">យល់ព្រមនូវលក្ខណ្ឌគោលការណ៍</label>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100 mt-2" data-aos="fade-up" data-aos-delay="1000">ចូលគណនី</button>
        </form>

        <!-- Signin Link -->
        <div class="text-center mt-3" data-aos="fade-up" data-aos-delay="1100">
          <p>មានគណនីរួចហើយមែនទេ? <router-link to="/login" class="text-success">ចូលគណនី</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, email } from "@vuelidate/validators";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS when component is mounted
onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 50
  });
});

// Validators
const required = helpers.withMessage("សូមបញ្ចូលព័ត៌មានក្នុងប្រអប់ជាមុនសិន", helpers.req);
const fullNameValidator = helpers.withMessage(
  "ឈ្មោះត្រូវតែមានយ៉ាងតិច 2 តួអក្សរ",
  (value) => value && value.length >= 2
);
const isAtLeast8Chars = helpers.withMessage(
  "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួ",
  (value) => value?.length >= 8
);
const hasLowercase = helpers.withMessage(
  "ពាក្យសម្ងាត់ត្រូវមានអក្សរតូច",
  (value) => /[a-z]/.test(value)
);
const hasUppercase = helpers.withMessage(
  "ពាក្យសម្ងាត់ត្រូវមានអក្សរធំ",
  (value) => /[A-Z]/.test(value)
);
const hasNumber = helpers.withMessage(
  "ពាក្យសម្ងាត់ត្រូវមានលេខ",
  (value) => /\d/.test(value)
);
const hasSpecialChar = helpers.withMessage(
  "ពាក្យសម្ងាត់ត្រូវមានតួអក្សរពិសេស",
  (value) => /[!@#$%^&*]/.test(value)
);

// Track terms checkbox error
const showTermsError = ref(false);

// Reactive Form Data
const form = reactive({
  fullName: "",
  email: "",
  password: "",
  termsAgreement: false,
});

// Validation Rules
const rules = {
  form: {
    fullName: { required, fullNameValidator },
    email: {
      required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
      email: helpers.withMessage("សូមបញ្ចូលទម្រង់អ៊ីមែលឲ្យបានត្រឹមត្រូវ", email),
    },
    password: {
      required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", helpers.req),
      isAtLeast8Chars,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
    },
  },
};

const $v = useVuelidate(rules, { form });

// Password Visibility Management
const visibility = reactive({
  password: false,
});

const toggleVisibility = (field) => {
  visibility[field] = !visibility[field];
};

// Form Submission Logic
function onSubmit() {
  $v.value.$touch();
  
  // Reset terms error state first
  showTermsError.value = false;
  
  // Check if terms checkbox is not checked
  if (!form.termsAgreement) {
    showTermsError.value = true;
    return;
  }
  
  if ($v.value.$invalid) return;

  console.log("Form Submitted Successfully:", form);

  // Reset the form
  form.fullName = "";
  form.email = "";
  form.password = "";
  form.termsAgreement = false;
  showTermsError.value = false;
  $v.value.$reset();
}
</script>

<style scoped>
/* Add this CSS to make the red border more prominent */
.border-danger {
  border: 2px solid #e93a4b !important;
}
</style>