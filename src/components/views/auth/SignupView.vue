<template>
  <div class="frm-auth">
    <div class="row  rounded-3 overflow-hidden">
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
          <h1 class="fw-bold">បង្កើតគណនី</h1>
          <p class="text-secondary">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
        </div>

        <form @submit.prevent="onSubmit">
          <!-- Full Name Field -->
          <div class="mb-3">
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
          <div class="mb-3">
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
          <div class="mb-3 position-relative">
            <input
              :type="visibility.password ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="form-control password-input"
              placeholder="បញ្ចូលលេខសម្ងាត់"
              :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }"
            />
            <i
              @click="toggleVisibility('password')"
              :class="visibility.password ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
              class="password-toggle"
            ></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-login w-100">ចូលគណនី</button>
        </form>

        <!-- Signin Link -->
        <div class="text-center mt-3">
          <p>មានគណនីរួចហើយមែនទេ? <router-link to="/login" class="text-success">ចូលគណនី</router-link></p>
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

// Reactive Form Data
const form = reactive({
  fullName: "",
  email: "",
  password: "",
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
  if ($v.value.$invalid) return;

  console.log("Form Submitted Successfully:", form);

  // Reset the form
  form.fullName = "";
  form.email = "";
  form.password = "";
  $v.value.$reset();
}
</script>
