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
          <h1 class="fw-bold">​ផ្លាស់ប្តូរពាក្យសម្ងាត់</h1>
          <p class="text-secondary mt-2">បង្កើតពាក្យសម្ងាត់ថ្មីសម្រាប់គណនីរបស់អ្នក</p>
        </div>

        <form @submit.prevent="onSubmit"
              data-aos="fade-up" 
              data-aos-delay="600">
          <!-- Password Field -->
          <div class="mb-3 position-relative"
               data-aos="fade-up" 
               data-aos-delay="700">
            <input 
              :type="visibility.password ? 'text' : 'password'" 
              id="password" 
              v-model="form.password"
              class="form-control password-input" 
              placeholder="បញ្ចូលលេខសម្ងាត់"
              :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error, 'is-valid': $v.form.password.$dirty && !$v.form.password.$error }" />
            <i @click="toggleVisibility('password')"
              :class="['bi', visibility.password ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle', { 'shift-left': $v.form.password.$dirty && $v.form.password.$error }]"
              class="position-absolute"></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
            <div class="valid-feedback" v-if="$v.form.password.$dirty && !$v.form.password.$error">
              ពាក្យសម្ងាត់ត្រឹមត្រូវ
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="mb-3 position-relative"
               data-aos="fade-up" 
               data-aos-delay="800">
            <input 
              :type="visibility.confirmPassword ? 'text' : 'password'" 
              id="confirmPassword" 
              v-model="form.confirmPassword"
              class="form-control password-input" 
              placeholder="បញ្ជាក់លេខសម្ងាត់"
              :class="{ 'is-invalid': $v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error, 'is-valid': $v.form.confirmPassword.$dirty && !$v.form.confirmPassword.$error }" />
            <i @click="toggleVisibility('confirmPassword')"
              :class="['bi', visibility.confirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle', { 'shift-left': $v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error }]"
              class="position-absolute"></i>
            <div class="invalid-feedback" v-if="$v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error">
              {{ $v.form.confirmPassword.$errors[0]?.$message }}
            </div>
            <div class="valid-feedback" v-if="$v.form.confirmPassword.$dirty && !$v.form.confirmPassword.$error">
              ពាក្យសម្ងាត់ត្រូវគ្នា
            </div>
          </div>

          <!-- Password Strength Indicator -->
          <div class="password-strength mb-3"
               data-aos="fade-up" 
               data-aos-delay="850"
               v-if="form.password">
            <div class="strength-bar">
              <div class="strength-progress" :style="{ width: `${passwordStrength}%`, backgroundColor: strengthColor }"></div>
            </div>
            <div class="strength-text" :style="{ color: strengthColor }">
              {{ strengthText }}
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" 
                  class="btn btn-login w-100"
                  data-aos="fade-up" 
                  data-aos-delay="900">ផ្លាស់ប្តូរ</button>
        </form>
        
        <!-- Success Message (Hidden by default) -->
        <div class="text-center mt-3 success-message" ref="successMessage" style="display: none;"
             data-aos="fade-up">
          <div class="alert alert-success">
            <i class="bi bi-check-circle me-2"></i>
            ពាក្យសម្ងាត់របស់អ្នកត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
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

// Success message reference
const successMessage = ref(null);

// Validation Rules
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

const confirmPasswordMatch = helpers.withMessage(
  "ពាក្យសម្ងាត់មិនត្រូវគ្នា",
  (value, vm) => value === vm.form.password
);

// Reactive Form Data
const form = reactive({
  password: "",
  confirmPassword: "",
});

// Validation Rules
const rules = {
  form: {
    password: {
      required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", helpers.req),
      isAtLeast8Chars,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
    },
    confirmPassword: {
      required: helpers.withMessage("សូមបញ្ជាក់ពាក្យសម្ងាត់", helpers.req),
      confirmPasswordMatch,
    },
  },
};

const $v = useVuelidate(rules, { form });

// Password Visibility Management
const visibility = reactive({
  password: false,
  confirmPassword: false,
});

const toggleVisibility = (field) => {
  visibility[field] = !visibility[field];
};

// Password Strength Calculation
const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length check (0-25%)
  strength += Math.min(25, (password.length / 8) * 25);
  
  // Complexity checks (25% each)
  if (/[a-z]/.test(password)) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 25;
  if (/[!@#$%^&*]/.test(password)) strength += 25;
  
  return Math.min(100, strength);
};

const passwordStrength = computed(() => {
  return calculatePasswordStrength(form.password);
});

const strengthColor = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return '#ff4d4d'; // Red
  if (strength < 50) return '#ffa64d'; // Orange
  if (strength < 75) return '#ffff4d'; // Yellow
  return '#4dff4d'; // Green
});

const strengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return 'ខ្សោយណាស់';
  if (strength < 50) return 'ខ្សោយ';
  if (strength < 75) return 'មធ្យម';
  if (strength < 100) return 'ខ្លាំង';
  return 'ខ្លាំងណាស់';
});

// Form Submission Logic with animation
function onSubmit() {
  $v.value.$touch();
  
  if ($v.value.$invalid) {
    // Refresh animations for error states
    AOS.refresh();
    return;
  }

  // Show success message with animation
  if (successMessage.value) {
    successMessage.value.style.display = 'block';
    
    // Add animation class
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  console.log("Password Changed Successfully");

  // Reset the form after delay
  setTimeout(() => {
    form.password = "";
    form.confirmPassword = "";
    $v.value.$reset();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      if (successMessage.value) {
        successMessage.value.style.display = 'none';
      }
    }, 3000);
  }, 1000);
}
</script>

<style scoped>


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}
</style>