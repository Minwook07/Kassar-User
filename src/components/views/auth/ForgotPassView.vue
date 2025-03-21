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
          <h1 class="fw-bold">ភ្លេចពាក្យសម្ងាត់?</h1>
          <p class="text-secondary">
            បញ្ចូលអ៊ីម៉ែលរបស់អ្នកដើម្បីទទួលបានតំណភ្ជាប់ប្ដូរលេខសម្ងាត់ (អ៊ីម៉ែលដែលភ្ជាប់ជាមួយគណនីរបស់អ្នក)
          </p>
        </div>

        <form @submit.prevent="onSubmit"
              data-aos="fade-up" 
              data-aos-delay="600">
          <!-- Email Field -->
          <div class="mb-3"
               data-aos="fade-up" 
               data-aos-delay="700">
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-control"
              placeholder="បញ្ចូលអ៊ីមែល"
              :class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$error, 'is-valid': $v.form.email.$dirty && !$v.form.email.$error }"
              aria-label="Email Address"
            />
            <div class="invalid-feedback" v-if="$v.form.email.$dirty && $v.form.email.$error">
              {{ $v.form.email.$errors[0]?.$message }}
            </div>
            <div class="valid-feedback" v-if="$v.form.email.$dirty && !$v.form.email.$error">
              អ៊ីមែលត្រឹមត្រូវ
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" 
                  class="btn btn-login w-100"
                  data-aos="fade-up" 
                  data-aos-delay="800">បញ្ជូន</button>
        </form>

        <!-- Signin Link -->
        <div class="text-center mt-3"
             data-aos="fade-up" 
             data-aos-delay="900">
          <p>ចងចាំពាក្យសម្ងាត់? <router-link to="/login" class="text-success text-decoration-none ">ចូលគណនី</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
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

// Form Submission Logic with animation feedback
function onSubmit() {
  $v.value.$touch();
  
  if ($v.value.$invalid) {
    // Refresh animations for error states
    AOS.refresh();
    return;
  }

  // Success animation or feedback could be added here
  // For example, you could add a success notification

  // Simulate the process of resetting the password
  console.log("Password reset link sent to:", form.email);

  // Reset the form after submission
  form.email = "";
  $v.value.$reset();
}
</script>

<style scoped>
/* Animation styles for validation feedback */
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

/* Button animations */
.btn-login {
  transition: all 0.3s ease;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Router link animation */
.text-success {
  position: relative;
  transition: color 0.3s ease;
}

.text-success::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease;
}

</style>