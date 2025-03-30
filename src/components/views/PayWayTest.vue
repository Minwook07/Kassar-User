<template>
    <div class="container" style="margin-top: 75px; margin: 0 auto;">
      <div style="width: 200px; margin: 0 auto;">
        <h2>TOTAL: ${{ amount }}</h2>
        <form method="POST" target="aba_webservice" action="https://checkout.payway.com.kh" id="aba_merchant_request">
          <input type="hidden" name="hash" :value="hash" />
          <input type="hidden" name="tran_id" :value="transactionId" />
          <input type="hidden" name="amount" :value="amount" />
          <input type="hidden" name="firstname" :value="firstName" />
          <input type="hidden" name="lastname" :value="lastName" />
          <input type="hidden" name="phone" :value="phone" />
          <input type="hidden" name="email" :value="email" />
          <input type="hidden" name="items" :value="items" />
          <input type="hidden" name="return_params" :value="returnParams" />
          <input type="hidden" name="shipping" :value="shipping" />
          <input type="hidden" name="currency" :value="currency" />
          <input type="hidden" name="type" :value="type" />
          <input type="hidden" name="payment_option" :value="paymentOption" />
          <input type="hidden" name="merchant_id" :value="merchantId" />
          <input type="hidden" name="req_time" :value="reqTime" />
        </form>
        <input type="button" id="checkout_button" value="Checkout Now" @click="checkout" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const amount = ref(0);
  const hash = ref('');
  const transactionId = ref('');
  const firstName = ref('');
  const lastName = ref('');
  const phone = ref('');
  const email = ref('');
  const items = ref('');
  const returnParams = ref('');
  const shipping = ref('');
  const currency = ref('');
  const type = ref('');
  const paymentOption = ref('');
  const merchantId = ref('');
  const reqTime = ref('');
  
  // Fetch payment info from API on mount
  onMounted(async () => {
    try {
      const response = await axios.get('http://kassar_api.com:8080/public/api/checkout/2');
      const data = response.data;
      
      // Assign API response to the refs
      amount.value = data.amount;
      hash.value = data.hash;
      transactionId.value = data.transactionId;
      firstName.value = data.firstName;
      lastName.value = data.lastName;
      phone.value = data.phone;
      email.value = data.email;
      items.value = data.items;
      returnParams.value = data.returnParams;
      shipping.value = data.shipping;
      currency.value = data.currency;
      type.value = data.type;
      paymentOption.value = data.paymentOption;
      merchantId.value = data.merchantId;
      reqTime.value = data.reqTime;
    } catch (error) {
      console.error('Error fetching payment info:', error);
    }
  });
  
  // Checkout function to call the Payway checkout API
  const checkout = () => {
    AbaPayway.checkout();
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 75px;
    margin: 0 auto;
  }
  
  #checkout_button {
    margin-top: 20px;
  }
  </style>
  