<template>
  <div class="frm-auth">
    <div class="row rounded-4 shadow-lg overflow-hidden">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white  d-none d-md-flex flex-column align-items-center justify-content-center p-5">
        <h1 class="text-center fw-bold mb-4">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid auth-img" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-5">
        <div class="text-center mb-4">
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3" />
          <h1 class="fw-bold fs-3">ចូលប្រើប្រាស់គណនី</h1>
          <p class="text-secondary">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
        </div>

        <form @submit.prevent="onSaveLogin">
          <!-- Email Field -->
          <div class="mb-3">
            <input type="email" id="email" v-model="form.email" class="form-control modern-input" 
              placeholder="បញ្ចូលអ៊ីមែល" 
              :class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$error }" />
            <div class="invalid-feedback" v-if="$v.form.email.$dirty && $v.form.email.$error">
              {{ $v.form.email.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-3 position-relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password"
              class="form-control password-input" placeholder="បញ្ចូលលេខសម្ងាត់"
              :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }" />
              <i @click="togglePasswordVisibility"
                            :class="['bi', showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle', { 'shift-left': $v.form.password.$dirty && $v.form.password.$error }]"
                            class="position-absolute"></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-check">
              <input type="checkbox" id="remember" v-model="form.remember" class="form-check-input"
                :class="{'is-invalid': $v.form.remember.$dirty && $v.form.remember.$error}" />
              <label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
            </div>
            <router-link to="/forgotpass" class="text-secondary text-decoration-none small">ភ្លេចពាក្យសម្ងាត់?</router-link>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100">ចូលគណនី</button>
        </form>

        <!-- Social Login Section -->
        <div class="text-center mt-4">
          <p class="fw-semibold"><span class="text-rul"></span> ឬ ចូលគណនីជាមួយ <span class="text-rul"></span></p>
        </div>
        <div class="social-buttons-container">
          <button type="button" class="social-button google-button">
            <img src="@/assets/images/Google-Icon.png" alt="Google Icon"> Google
          </button>
          <button type="button" class="social-button facebook-button">
            <img src="@/assets/images/facebook.png" alt="Facebook Icon"> Facebook
          </button>
        </div>

        <!-- Signup Link -->
        <div class="text-center mt-4">
          <p>មិនទាន់មានគណនីមែនទេ? <router-link to="/signup" class="text-success fw-bold">បង្កើតគណនី</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, email } from "@vuelidate/validators";

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
  remember: false, // Added remember checkbox state
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
    remember: {
      required: helpers.withMessage("សូមបញ្ចូលសំគាល់ចងចាំ", helpers.req), // Added validation for remember checkbox
    },
  },
};

const $v = useVuelidate(rules, { form });

// Password Visibility
const showPassword = ref(false);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Form Submission
function onSaveLogin() {
  $v.value.$touch();
  if ($v.value.$invalid) return;

  console.log("Email:", form.email);
  console.log("Password:", form.password);
  console.log("Remember Me:", form.remember); // Check the remember value

  form.email = "";
  form.password = "";
  form.remember = false; // Reset remember checkbox
  $v.value.$reset();
}
</script>

