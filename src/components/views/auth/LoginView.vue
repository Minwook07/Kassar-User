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
          <h1 class="fw-bold">ចូលប្រើប្រាស់គណនី</h1>
          <p class="text-secondary">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
        </div>

        <form>
          <!-- Email Field -->
          <div class="mb-3">
            <input type="email" id="email" v-model="form.email" class="form-control" placeholder="បញ្ចូលអ៊ីមែល"
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
            <i @click="togglePasswordVisibility" :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
              class="password-toggle"></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="d-flex justify-content-between align-items-center ">
            <div class="form-check">
              <input type="checkbox" id="remember" class="form-check-input" />
              <label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
            </div>
            <router-link to="/forgotpass" class="text-secondary text-decoration-none" aria-label="Forgot Password">ភ្លេចពាក្យសម្ងាត់?</router-link>
          </div>

          <!-- Submit Button -->
          <button type="button" class="btn btn-login w-100" @click="onSaveLogin">ចូលគណនី</button>
        </form>

        <!-- Social Login Section -->
        <div class="text-center mt-3">
          <p> <span class="text-rul"></span>ឬ ចូលគណនីជាមួយ <span class="text-rul"></span></p>
        </div>
        <div class="social-buttons-container">
          <button type="button" class="social-button google-button">
            <img src="@/assets/images/Google-icon.png" alt="Google Icon"> Google
          </button>
          <button type="button" class="social-button facebook-button">
            <img src="@/assets/images/facebook.png" alt="Facebook Icon"> Facebook
          </button>
        </div>

        <!-- Signup Link -->
        <div class="text-center mt-3">
          <p>មិនទាន់មានគណនីមែនទេ? <router-link to="/signup" class="text-success">បង្កើតគណនី</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, email, minLength } from "@vuelidate/validators";

// Validators
const required = helpers.withMessage("សូមបញ្ចូលព័ត៌មានក្នុងប្រអប់ជាមុនសិន", helpers.req);

// Dummy Credentials
const dummyCredentials = { email: "user@example.com", password: "password123" };
const form = reactive({ email: "", password: "" });
const showPassword = ref(false);

// Validation Rules
const rules = {
  form: {
    email: {
      required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
      email: helpers.withMessage("សូមបញ្ចូលទម្រង់អ៊ីមែលឲ្យបានត្រឹមត្រូវ", email),
    },
    password: {
      required: helpers.withMessage("សូមបញ្ចូលលេខសម្ងាត់", helpers.req),
      minLength: helpers.withMessage("លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 6 លេខ ឬតួអក្សរ", minLength(6)),
    },
  },
};

const $v = useVuelidate(rules, { form });

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function onSaveLogin() {
  $v.value.$touch();
  if ($v.value.$invalid) return;

  if (form.email === dummyCredentials.email && form.password === dummyCredentials.password) {
    console.log("Login successful!");
  } else {
    console.log("Invalid email or password.");
  }

  form.email = "";
  form.password = "";
  $v.value.$reset();
}
</script>
