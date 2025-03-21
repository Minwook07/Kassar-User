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
                  <input type="text" class="form-control shadow-none" id="fname" placeholder="">
                </div>
                <div class="col-5">
                  <label for="lname" class="form-label">នាមខ្លួន</label>
                  <input type="text" class="form-control shadow-none" id="lname" placeholder="">
                </div>
                <div class="col-2">
                  <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                  <input type="text" class="form-control shadow-none" id="phone" placeholder="">
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <label for="businessnName" class="form-label">ឈ្មោះអាជីវកម្ម</label>
                  <input type="text" class="form-control shadow-none" id="businessnName" placeholder=""
                    v-model="sellerStore.frm.shop_name">
                </div>
                <div class="col-6">
                  <label for="province" class="form-label">ប្រភេទអាជីវកម្ម</label>
                  <select class="form-select py-2 shadow-none" aria-label="Default select example">
                    <option selected class="text-danger">សូមជ្រើសរើសប្រភេទអាជីវកម្ម</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
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
                  <input class="form-control shadow-none" id="typeBank" @click="onOpenCredit()">

                  </input>
                </div>
                <div class="col-6">
                  <label for="address" class="form-label">អាស័យដ្ឋាន អាជីវកម្ម</label>
                  <input type="text" class="form-control shadow-none" id="address" placeholder="">
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="">
                <label for="exampleFormControlTextarea1" class="form-label">បញ្ចេញមតិបន្ថែម</label>
                <textarea class="form-control none shadow-none" id="exampleFormControlTextarea1" rows="4" style="min-height: 150px;"
                  v-model="sellerStore.frm.description"></textarea>
              </div>
            </div>
            <div class="d-flex justify-content-end fs-5 pt-4">
              <button type="button" class="btn-seller btn btn-outline-danger me-3">បោះបង់</button>
              <button type="button" class="btn-seller btn btn-primary" @click="onSaveSeller()">ដាក់បញ្ជូន</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PayCreditModal />
</template>
<script setup>
import PayCreditModal from '@/components/views/wayOfPay/PayCreditModal.vue';

import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import { useCardStore } from '@/stores/card_store';
import { useSellerStore } from '@/stores/seller_store';

const cardStore = useCardStore()
const sellerStore = useSellerStore()


const onOpenCredit = () => {
  console.log(cardStore.mdl_credit);
  cardStore.mdl_credit.show()
}

const onSaveSeller = () => {
  let frmData = new FormData()
  frmData.append('shop_name', sellerStore.frm.shop_name),
  frmData.append('description', sellerStore.frm.description)

  axios.post('http://localhost/kassar_api/public/api/seller_request', frmData)
    .then((res) => {
      sellerStore.onLoadSeller()
      alert('successfull.');
    })
}
</script>
