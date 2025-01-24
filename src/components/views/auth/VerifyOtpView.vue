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
            <h1 class="fw-bold">ផ្ទៀងផ្ទាត់លេខកូដ</h1>
            <p class="text-secondary">
              សូមបញ្ចូលលេខកូដដែលយើងទើបតែផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក
            </p>
          </div>
  
          <form>
            <!-- OTP Fields -->
            <div class="mb-3 d-flex justify-content-evenly ">
              <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                v-model="otp[index]"
                maxlength="1"
                class="otp-input form-control"
                :class="{ 'is-invalid': otp[index] === '' && isFormSubmitted }"
                @input="focusNextInput(index)"
                aria-label="OTP Digit"
              />
            </div>
  
            <!-- OTP Error -->
            <div v-if="isFormSubmitted && otp.some(digit => digit === '')" class="text-danger text-center mb-3">
              សូមបញ្ចូលលេខកូដទាំងអស់។
            </div>
  
            <!-- Submit Button with @click -->
            <button type="button" class="btn btn-login w-100" @click="onSubmit">ផ្ទៀងផ្ទាត់</button>
          </form>
  
          <!-- Resend OTP Link -->
          <div class="text-center mt-3">
            <p>មិនទទួលបានលេខកូដសម្រាប់ផ្ទៀងផ្ទាត់? <router-link to="" class="text-success">ផ្ញើម្តងទៀត</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  
  // OTP data
  const otp = reactive(["", "", "", "", ""]);
  const isFormSubmitted = ref(false);
  
  // Handle input focus logic
  const focusNextInput = (index) => {
    if (index < otp.length - 1 && otp[index].length === 1) {
      const nextInput = document.querySelectorAll(".otp-input")[index + 1];
      nextInput?.focus();
    }
  };
  
  // Validate and handle form submission
  const onSubmit = () => {
    isFormSubmitted.value = true;
  
    // Ensure all OTP digits are filled before proceeding
    if (otp.every(digit => digit !== "")) {
      console.log("OTP Submitted:", otp.join(""));
  
      // Simulate OTP verification
      otp.fill(""); // Clear OTP inputs after submission
      isFormSubmitted.value = false;
    }
  };
  </script>
  
  <style scoped>
  .otp-input {
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 1.5rem;
    margin-right: 4px;  /* Adjusted margin for closer spacing */
    margin-left: 4px;   
  }
  
  .otp-input:focus {
    border-color: #007bff;
  }
  
  .is-invalid {
    border-color: #dc3545;
  }
  </style>
  