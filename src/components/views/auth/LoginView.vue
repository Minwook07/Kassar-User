<template>
    <div class="frm-login">
      <div class="row shadow-lg rounded-3 overflow-hidden">
        <!-- Left Section -->
        <div class="col-md-6 left-section text-white d-flex flex-column align-items-center justify-content-center">
          <h1 class="text-center fw-bold">
            Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
          </h1>
          <img src="/src/assets/images/Auth.png" alt="auth" class="img-fluid mb-4" />
        </div>
  
        <!-- Right Section -->
        <div class="col-md-6 right-section bg-white p-5">
          <div class="text-center mb-4">
            <img src="/src/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid mb-2" />
            <h1 class="fw-bold mt-3">ចូលប្រើប្រាស់គណនី</h1>
            <p class="text-secondary mt-3">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
          </div>
  
          <!-- Login Form -->
          <form @submit.prevent="onSaveLogin">
            <!-- Email Input -->
            <div class="mt-3">
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
  
            <!-- Password Input -->
            <div class="mt-3 position-relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                class="form-control password-input"
                placeholder="បញ្ចូលលេខសម្ងាត់"
                :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }"
              />
              <i
                @click="togglePasswordVisibility"
                :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
                class="password-toggle"></i>
              <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
                {{ $v.form.password.$errors[0]?.$message }}
              </div>
            </div>
  
            <!-- Remember Me and Forgot Password -->
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div class="form-check">
                <input type="checkbox" id="remember" class="form-check-input" />
                <label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
              </div>
              <a href="#" class="text-secondary text-decoration-none">ភ្លេចពាក្យសម្ងាត់?</a>
            </div>
  
            <!-- Submit Button -->
            <button type="submit" class="btn btn-login w-100 mt-3">ចូលគណនី</button>
  
            <!-- Alternative Login Options -->
            <div class="text-center mt-3">
              <p>ឬចូលប្រើប្រាស់កម្មវិធីជាមួយ</p>
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-outline-secondary me-2 d-flex align-items-center">
                  <img src="/src/assets/images/Google-icon.png" alt="Google Icon" /> Google
                </button>
                <button type="button" class="btn btn-outline-secondary d-flex align-items-center">
                  <img src="/src/assets/images/facebook.png" alt="Facebook Icon" /> Facebook
                </button>
              </div>
            </div>
          </form>
  
          <!-- Sign-Up Link -->
          <div class="text-center mt-4">
            <p class="mb-0">
              <span class="text-secondary">មិនទាន់មានគណនីមែនទេ?</span>
              <a href="#" class="text-success">បង្កើតគណនី</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import useVuelidate from "@vuelidate/core";
  import { helpers, email, minLength } from "@vuelidate/validators";
  
  const required = helpers.withMessage("សូមបញ្ចូលព័ត៌មានក្នុងប្រអប់ជាមុនសិន", helpers.req);
  
  const dummyCredentials = { email: "user@example.com", password: "password123" };
  const form = reactive({ email: "", password: "" });
  const showPassword = ref(false);
  
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
    if ($v.value.$invalid) return console.error("Validation failed.");
  
    if (form.email === dummyCredentials.email && form.password === dummyCredentials.password) {
      alert("ចូលគណនីបានជោគជ័យ!");
    } else {
      alert("អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។");
    }
  
    form.email = "";
    form.password = "";
    $v.value.$reset();
  }
  </script>
  
  <style scoped>
  .password-input {
    padding-right: 2.5rem;
  }
  .password-toggle {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
  }
  .form-control.is-invalid {
    border-color: #dc3545;
  }
  .invalid-feedback {
    color: #dc3545;
  }
  </style>
  