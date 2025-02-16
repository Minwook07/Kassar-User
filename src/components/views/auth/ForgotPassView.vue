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
            <h1 class="fw-bold">ភ្លេចពាក្យសម្ងាត់?</h1>
            <p class="text-secondary">
              បញ្ចូលអ៊ីម៉ែលរបស់អ្នកដើម្បីទទួលបានតំណភ្ជាប់ប្ដូរលេខសម្ងាត់ (អ៊ីម៉ែលដែលភ្ជាប់ជាមួយគណនីរបស់អ្នក)
            </p>
          </div>
  
          <form @submit.prevent="onSubmit">
            <!-- Email Field -->
            <div class="mb-3">
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-control"
                placeholder="បញ្ចូលអ៊ីមែល"
                :class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$error }"
                aria-label="Email Address"
              />
              <div class="invalid-feedback" v-if="$v.form.email.$dirty && $v.form.email.$error">
                {{ $v.form.email.$errors[0]?.$message }}
              </div>
            </div>
  
            <!-- Submit Button -->
            <button type="submit" class="btn btn-login w-100">បញ្ជូន</button>
          </form>
  
          <!-- Signin Link -->
          <div class="text-center mt-3">
            <p>ចងចាំពាក្យសម្ងាត់? <router-link to="/login" class="text-success">ចូលគណនី</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import useVuelidate from "@vuelidate/core";
  import { helpers, email } from "@vuelidate/validators";
  
  // Validators
  const required = helpers.withMessage("សូមបញ្ចូលព័ត៌មានក្នុងប្រអប់ជាមុនសិន", helpers.req);
  
  // Form Data
  const form = reactive({
    email: "",
  });
  
  // Validation Rules
  const rules = {
    form: {
      email: {
        required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
        email: helpers.withMessage("សូមបញ្ចូលទម្រង់អ៊ីមែលឲ្យបានត្រឹមត្រូវ", email),
      },
    },
  };
  
  const $v = useVuelidate(rules, { form });
  
  // Form Submission Logic
  function onSubmit() {
    $v.value.$touch();
    if ($v.value.$invalid) return;
  
    // Simulate the process of resetting the password
    console.log("Password reset link sent to:", form.email);
  
    // Reset the form after submission
    form.email = "";
    $v.value.$reset();
  }
  </script>

  