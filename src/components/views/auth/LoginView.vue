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
                   :class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$error }" />
            <div class="invalid-feedback" v-if="$v.form.email.$dirty && $v.form.email.$error">
              {{ $v.form.email.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="800">
            <input :type="showPassword ? 'text' : 'password'" 
                   id="password" 
                   v-model="form.password"
                   class="form-control password-input" 
                   placeholder="បញ្ចូលលេខសម្ងាត់"
                   :class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }" />
            <i @click="togglePasswordVisibility"
               :class="['bi', showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill', 'password-toggle']"></i>
            <div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
              {{ $v.form.password.$errors[0]?.$message }}
            </div>
          </div>

          <!-- Remember Me -->
          <div class="form-check mb-3" data-aos="fade-up" data-aos-delay="900">
            <input type="checkbox" 
                   id="remember" 
                   v-model="form.remember" 
                   class="form-check-input" />
            <label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
          </div>

          <!-- Submit Button -->
          <button type="submit" 
                  class="btn btn-login w-100" 
                  data-aos="fade-up" 
                  data-aos-delay="1000">ចូលគណនី</button>
        </form>

        <!-- Signup Link -->
        <div class="text-center mt-4" data-aos="fade-up" data-aos-delay="1100">
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
import axios from "axios";

// Initialize AOS
onMounted(() => {
  AOS.init({
    once: true,
    offset: 50,
    easing: 'ease-in-out'
  });
});

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
    },
  },
};

const $v = useVuelidate(rules, { form });

// Password Visibility
const showPassword = ref(false);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
async function onSaveLogin() {
  $v.value.$touch();
  
  if ($v.value.$invalid) {
    AOS.refresh();
    return;
  }

  try {
    let formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("remember", form.remember);

    const response = await axios.post("http://localhost/kassar_api/public/api/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    });

    alert("ចូលគណនីជោគជ័យ!");
    console.log(response.data); // Handle token storage or redirection

  } catch (err) {
    alert("Error: " + (err.response?.data.message || "Something went wrong"));
  }
}

</script>

<style scoped>
.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 10;
}

.password-toggle:hover {
  color: #212529;
}

/* Adjust position when validation error is present */
.is-invalid + .password-toggle {
  top: 35%;
  right: 40px;
}
</style>