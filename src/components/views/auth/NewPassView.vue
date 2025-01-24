<template>
  <div class="frm-auth">
    <div class="row shadow-lg rounded-3 overflow-hidden">
      <!-- Left Section -->
      <div class="col-md-6 left-section text-white d-flex flex-column align-items-center justify-content-center">
        <h1 class="text-center fw-bold">
          Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
        </h1>
        <img src="@/assets/images/Auth.png" alt="auth" class="img-fluid" />
      </div>

      <!-- Right Section -->
      <div class="col-md-6 right-section bg-white p-4">
        <div class="text-center">
          <img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid" />
          <h1 class="fw-bold">​ផ្លាស់ប្តូរពាក្យសម្ងាត់</h1>
          <p class="text-secondary">បង្កើតពាក្យសម្ងាត់ថ្មីសម្រាប់គណនីរបស់អ្នក</p>
        </div>

        <form @submit.prevent="onSubmit">
          <!-- Password Field -->
          <div class="mb-3 position-relative">
            <input
              :type="visibility.password ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="form-control password-input"
              placeholder="បញ្ចូលលេខសម្ងាត់ថ្មី"
              :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }"
            />
            <i
              @click="toggleVisibility('password')"
              :class="visibility.password ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
              class="password-toggle"
            ></i>
            <div
              class="invalid-feedback"
              v-if="$v.form.password.$dirty && $v.form.password.$error"
            >
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="mb-3 position-relative">
            <input
              :type="visibility.confirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="form.confirmPassword"
              @input="form.confirmPassword = form.confirmPassword.trim()"
              class="form-control password-input"
              placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
              :class="{ 'is-invalid': $v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error }"
            />
            <i
              @click="toggleVisibility('confirmPassword')"
              :class="visibility.confirmPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
              class="password-toggle"
            ></i>
            <div
              class="invalid-feedback"
              v-if="$v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error"
            >
              {{ $v.form.confirmPassword.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100">ផ្លាស់ប្តូរ</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

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
  (value, vm) => value?.trim() === vm.form.password?.trim()
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

// Form Submission Logic
function onSubmit() {
  form.password = form.password.trim();
  form.confirmPassword = form.confirmPassword.trim();

  console.log("Password:", form.password);
  console.log("Confirm Password:", form.confirmPassword);

  $v.value.$touch();
  if ($v.value.$invalid) return;

  console.log("Password Changed Successfully");

  // Reset the form
  form.password = "";
  form.confirmPassword = "";
  $v.value.$reset();
}
</script>
