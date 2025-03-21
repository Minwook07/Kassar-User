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
      <div class="col-md-6 right-section bg-white p-5" 
           data-aos="fade-left" 
           data-aos-duration="1000">
        <div class="text-center mb-4" 
             data-aos="fade-up" 
             data-aos-delay="300">
          <img src="@/assets/images/kassar_text.png" 
               alt="Kassar Logo" 
               class="img-fluid logo-img mb-3" 
               data-aos="zoom-in" 
               data-aos-delay="500" />
          <h1 class="fw-bold fs-3">ចូលប្រើប្រាស់គណនី</h1>
          <p class="text-secondary">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
        </div>

        <form @submit.prevent="onSaveLogin" data-aos="fade-up" data-aos-delay="600">
          <!-- Email Field -->
          <div class="mb-3" data-aos="fade-up" data-aos-delay="700">
            <input type="email" 
                   id="email" 
                   v-model="form.email" 
                   class="form-control modern-input" 
                   placeholder="បញ្ចូលអ៊ីមែល" 
                   />
          </div>

          <!-- Password Field -->
          <div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="800">
            <input :type="showPassword ? 'text' : 'password'" 
                   id="password" 
                   v-model="form.password"
                   class="form-control password-input" 
                   placeholder="បញ្ចូលលេខសម្ងាត់"
                   :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error, 'is-valid': $v.form.password.$dirty && !$v.form.password.$error }" />
            <i @click="togglePasswordVisibility"
               :class="['bi', showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle', { 'shift-left': $v.form.password.$dirty && $v.form.password.$error }]"
               class="position-absolute"></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
            <div class="valid-feedback" v-if="$v.form.password.$dirty && !$v.form.password.$error">
              ពាក្យសម្ងាត់ត្រឹមត្រូវ
            </div>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay="900">
            <div class="form-check">
              <input type="checkbox" 
                     id="remember" 
                     v-model="form.remember" 
                     class="form-check-input"
                     :class="{'is-invalid': $v.form.remember.$dirty && $v.form.remember.$error}" />
              <label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
            </div>
            <router-link to="/forgotpass" class="text-secondary text-decoration-none small">ភ្លេចពាក្យសម្ងាត់?</router-link>
          </div>

          <!-- Submit Button -->
          <button type="submit" 
                  class="btn btn-login w-100" 
                  data-aos="fade-up" 
                  data-aos-delay="1000">ចូលគណនី</button>
        </form>

        <!-- Social Login Section -->
        <div class="text-center mt-4" data-aos="fade-up" data-aos-delay="1100">
          <p class="fw-semibold"><span class="text-rul"></span> ឬ ចូលគណនីជាមួយ <span class="text-rul"></span></p>
        </div>
        <div class="social-buttons-container" data-aos="fade-up" data-aos-delay="1200">
          <button type="button" class="social-button google-button" data-aos="zoom-in" data-aos-delay="1300">
            <img src="@/assets/images/Google-Icon.png" alt="Google Icon"> Google
          </button>
          <button type="button" class="social-button facebook-button" data-aos="zoom-in" data-aos-delay="1400">
            <img src="@/assets/images/facebook.png" alt="Facebook Icon"> Facebook
          </button>
        </div>

        <!-- Signup Link -->
        <div class="text-center mt-4" data-aos="fade-up" data-aos-delay="1500">
          <p>មិនទាន់មានគណនីមែនទេ? <router-link to="/signup" class="text-success fw-bold">បង្កើតគណនី</router-link></p>
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

// Initialize AOS
onMounted(() => {
  AOS.init({
    once: true,
    offset: 50,
    easing: 'ease-in-out'
  });
});

// Validators
const required = helpers.withMessage("សូមបញ្ចូលព័ត៌មានក្នុងប្រអប់ជាមុនសិន", helpers.req);

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

// Reactive Form Data
const form = reactive({
  email: "",
  password: "",
  remember: false,
});

// Validation Rules
const rules = {
  form: {
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
    remember: {},
  },
};

const $v = useVuelidate(rules, { form });

// Password Visibility
const showPassword = ref(false);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Form Submission with validation feedback animation
function onSaveLogin() {
  $v.value.$touch();
  
  if ($v.value.$invalid) {
    // Animate validation errors
    AOS.refresh();
    return;
  }

  // Success animation could be added here
  console.log("Email:", form.email);
  console.log("Password:", form.password);
  console.log("Remember Me:", form.remember);

  form.email = "";
  form.password = "";
  form.remember = false;
  $v.value.$reset();
}
</script>

<style scoped>
/* You can add these styles to your existing CSS */
.form-control.is-valid,
.form-control.is-invalid {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.invalid-feedback, 
.valid-feedback {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.form-control.is-invalid + .invalid-feedback,
.form-control.is-valid + .valid-feedback {
  opacity: 1;
  transform: translateY(0);
}

.btn-login {
  transition: all 0.3s ease;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.social-button {
  transition: all 0.3s ease;
}

.social-button:hover {
  transform: translateY(-2px);
}
</style>