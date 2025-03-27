<template>
  <div class="hero-form" data-aos="fade-up" data-aos-duration="300">
    <img src="@/assets/images/cart-img/hero-from.png" alt="">
  </div>
  <div class="seller my-5" data-aos="fade-up" data-aos-duration="500">
    <div class="container">
      <div class="card">
        <div class="header-card">
          <span class="fw-bold fs-5">ព័ត៌មានអ្នកលក់</span>
          <p>ចូលរួមជាអ្នកលក់ តោះចាប់ផ្តើមលក់ចាប់ពីថ្ងៃនេះ</p>
        </div>
        <hr class="pt-3">
        <div class="form_seller">
          <div class="row g-4">
            <div class="col-12">
              <div class="row">
                <div class="col-5">
                  <label for="fname" class="form-label">នាមត្រកូល</label>
                  <input type="text" class="form-control shadow-none" id="fname" placeholder=""
                    :class="{ 'is-invalid': sellerStore.vv.first_name.$error }" v-model="sellerStore.frm.first_name">
                  <div class="invalid-feedback" v-if="sellerStore.vv.first_name.$error">
                    {{ sellerStore.vv.first_name.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
                <div class="col-5">
                  <label for="lname" class="form-label">នាមខ្លួន</label>
                  <input type="text" class="form-control shadow-none" id="lname" placeholder=""
                    :class="{ 'is-invalid': sellerStore.vv.last_name.$error }" v-model="sellerStore.frm.last_name">
                  <div class="invalid-feedback" v-if="sellerStore.vv.last_name.$error">
                    {{ sellerStore.vv.last_name.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
                <div class="col-2">
                  <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                  <input type="text" class="form-control shadow-none" id="phone" placeholder=""
                    :class="{ 'is-invalid': sellerStore.vv.phone.$error }" v-model="sellerStore.frm.phone">
                  <div class="invalid-feedback" v-if="sellerStore.vv.phone.$error">
                    {{ sellerStore.vv.phone.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <label for="businessnName" class="form-label">ឈ្មោះហាង</label>
                  <input type="text" class="form-control shadow-none" id="businessnName" placeholder=""
                    :class="{ 'is-invalid': sellerStore.vv.shop_name.$error }" v-model="sellerStore.frm.shop_name">
                  <div class="invalid-feedback" v-if="sellerStore.vv.shop_name.$error">
                    {{ sellerStore.vv.shop_name.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
                <div class="col-6">
                  <label for="address" class="form-label">អាស័យដ្ឋានរបស់ហាង</label>
                  <input type="text" class="form-control shadow-none" id="address" placeholder=""
                    :class="{ 'is-invalid': sellerStore.vv.address.$error }" v-model="sellerStore.frm.address">
                  <div class="invalid-feedback" v-if="sellerStore.vv.address.$error">
                    {{ sellerStore.vv.address.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <label for="typeBank" class="form-label">
                    <div class="bank-type d-flex justify-content-between align-items-center">
                      ប្រភេទធនាគារ
                      <img src="@/assets/images/cart-img/icon/visa.svg" alt="">
                      <img src="@/assets/images/cart-img/icon/mastercard.svg" alt="">
                      <img src="@/assets/images/cart-img/icon/unionpay.svg" class="img-uni" alt="">
                      <img src="@/assets/images/cart-img/icon/jcb.svg" alt="">
                    </div>
                  </label>
                  <input class="form-control shadow-none" :class="{ 'is-invalid': sellerStore.vv.card_number.$error }"
                    v-model="sellerStore.frm.card_number" id="typeBank">
                  <div class="invalid-feedback" v-if="sellerStore.vv.card_number.$error">
                    {{ sellerStore.vv.card_number.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
                <div class="col-3 mb-3">
                  <label for="expiryDate" class="form-label">កាលបរិច្ឆេទផុតកំណត់</label>
                  <input type="text" class="form-control shadow-none" id="expiryDate"
                    :class="{ 'is-invalid': sellerStore.vv.card_date.$error }" v-model="sellerStore.frm.card_date"
                    placeholder="MM/YY" maxlength="5" @input="formatExpiryDate" />
                  <div class="invalid-feedback" v-if="sellerStore.vv.card_date.$error">
                    {{ sellerStore.vv.card_date.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
                <div class="col-3 mb-3">
                  <label for="cvv" class="form-label">CVV</label>
                  <input type="text" class="form-control shadow-none" id="cvv" placeholder="000"
                    :class="{ 'is-invalid': sellerStore.vv.card_cvv.$error }" v-model="sellerStore.frm.card_cvv">
                  <div class="invalid-feedback" v-if="sellerStore.vv.card_cvv.$error">
                    {{ sellerStore.vv.card_cvv.$errors[0].$message }}
                    <!-- Please enter your name -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="">
                <label for="exampleFormControlTextarea1" class="form-label">បញ្ចេញមតិបន្ថែម</label>
                <textarea class="form-control none shadow-none" id="exampleFormControlTextarea1" rows="4"
                  style="min-height: 150px;" :class="{ 'is-invalid': sellerStore.vv.description.$error }"
                  v-model="sellerStore.frm.description"></textarea>
                <div class="invalid-feedback" v-if="sellerStore.vv.description.$error">
                  {{ sellerStore.vv.description.$errors[0].$message }}
                  <!-- Please enter your name -->
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end fs-5 pt-4">
              <button type="button" class="btn-seller btn btn-outline-danger me-3" @click="onClear()">បោះបង់</button>
              <button type="button" class="btn-seller btn btn-primary" @click="onSaveSeller()">ដាក់បញ្ជូន</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="margin-top: 50px;">
    <div id="liveToast" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="false">
      <div class="toast-content p-3">
        <div>
          <i class="bi bi-check2-circle fs-5 text-success"></i>
          <!-- <i class="bi bi-exclamation-circle fs-6 text-info"></i>
                    <i class="bi bi-x-circle fs-6 text-danger"></i> -->
        </div>

        <div class="message">
          <span class="text text-1">
            ដាក់ស្នើជោគជ័យ
          </span>
        </div>
        <div>
          <button type="button" class="btn btn-close border-0 ms-auto p-0" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
      <div class="progress active"></div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import { Toast } from 'bootstrap';
import { computed, onMounted, ref } from "vue";
import { useSellerStore } from '@/stores/seller_store';
import { helpers, integer, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const sellerStore = useSellerStore()

const rules = computed(() => ({
  first_name: {
    required: helpers.withMessage('សូមបញ្ចូលនាមត្រកូលរបស់អ្នក', required),
  },
  last_name: {
    required: helpers.withMessage('សូមបញ្ចូលនាមខ្លួនរបស់អ្នក', required)
  },
  phone: {
    required: helpers.withMessage('សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក', required),
    integer: helpers.withMessage('លេខទូរស័ព្ទមិនអាចមានអក្សរ ឬអក្សរពិសេសបានទេ', integer)
  },
  shop_name: {
    required: helpers.withMessage('សូមបញ្ចូលឈ្មោះហាងរបស់អ្នក', required)
  },
  address: {
    required: helpers.withMessage('សូមបញ្ចូលអាស័យដ្ឋានរបស់ហាង', required)
  },
  card_number: {
    required: helpers.withMessage('សូមបញ្ចូលលេខកាតធនាគារបស់អ្នក', required),
    integer: helpers.withMessage('លេខកាតមិនអាចមានអក្សរ ឬអក្សរពិសេសបានទេ', integer)
  },
  card_date: {
    required: helpers.withMessage('សូមបញ្ចូលថ្ងៃផុតកំណត់របស់កាត', required)
  },
  card_cvv: {
    required: helpers.withMessage('សូមបញ្ចូលលេខ CVV របស់អ្នក', required),
    integer: helpers.withMessage('លេខ CVV មិនអាចមានអក្សរ ឬអក្សរពិសេសបានទេ', integer),
    length: helpers.withMessage('លេខ CVV ត្រូវតែមាន ៣ លេខតែប៉ុណ្ណោះ', (value) => value.length === 3)
  },
  description: {
    required: helpers.withMessage('សូមបញ្ចូលជាអក្សរ', required)
  }
}));
sellerStore.vv = useVuelidate(rules, sellerStore.frm)

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  if (value.length > 4) {
    value = value.slice(0, 4); // Restrict length to 4 digits
  }

  if (value.length >= 2) {
    value = value.slice(0, 2) + "/" + value.slice(2); // Add slash after MM
  }
  sellerStore.frm.card_date = value;
};

onMounted(() => {
  sellerStore.toast_alert = Toast.getOrCreateInstance(document.getElementById('liveToast'));
})

const onClear = () => {
  sellerStore.frm.first_name = ''
  sellerStore.frm.last_name = ''
  sellerStore.frm.shop_name = ''
  sellerStore.frm.phone = ''
  sellerStore.frm.card_number = ''
  sellerStore.frm.card_date = ''
  sellerStore.frm.card_cvv = ''
  sellerStore.frm.card_cvv = ''
  sellerStore.frm.address = ''
  sellerStore.frm.description = ''
  sellerStore.selected_id = 0
  sellerStore.vv.$reset()
}

const onSaveSeller = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Token not found! Please log in again.");
    return;
  }

  sellerStore.vv.$validate()
  if (sellerStore.vv.$error) {
    return
  }


  let frmData = new FormData()
  frmData.append('first_name', sellerStore.frm.first_name)
  frmData.append('last_name', sellerStore.frm.last_name)
  frmData.append('phone', sellerStore.frm.phone)
  frmData.append('shop_name', sellerStore.frm.shop_name)
  frmData.append('card_number', sellerStore.frm.card_number)
  frmData.append('card_date', sellerStore.frm.card_date)
  frmData.append('card_cvv', sellerStore.frm.card_cvv)
  frmData.append('address', sellerStore.frm.address)
  frmData.append('description', sellerStore.frm.description)

  axios.post('/api/seller_request', frmData, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    }
  })
    .then((res) => {
      sellerStore.onLoadSeller();
      if (sellerStore.toast_alert) {
        sellerStore.toast_alert.show();
      }
    })
}
</script>
