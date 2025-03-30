<template>
    <div class="container" style="margin-top: 75px; margin: 0 auto;">
        <div style="width: 200px; margin: 0 auto;">
            <h2>TOTAL: ${{ amount }}</h2>
            <form method="POST" target="aba_webservice" :action="apiUrl" id="aba_merchant_request">
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
                <input type="hidden" name="return_url" :value="returnUrl" />
                <input type="hidden" name="payment_option" :value="paymentOption" />
                <input type="hidden" name="merchant_id" :value="merchantId" />
                <input type="hidden" name="req_time" :value="reqTime" />
                <input type="hidden" name="continue_success_url" :value="continueSuccessUrl" />
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
const returnUrl = ref('');
const continueSuccessUrl = ref('');
const apiUrl = ref('');

// Fetch payment info from API on mount
onMounted(async () => {
    const formData = new FormData();

    // Add the items array to FormData
    const items = [
        { product_id: 11, quantity: 4 },
        { product_id: 12, quantity: 10 }
    ];

    // Convert the items array into a JSON string and append it to FormData
    formData.append('items', JSON.stringify(items));

    // Add the address_id
    formData.append('address_id', 1);
    try {
        const response = await axios.post('http://kassar_api.com:8080/public/api/checkout/2', formData, {
            headers: {
                'Authorization': 'Bearer 1|fIeRhVqKR3sjroNvR99quoCRtX34KDESM88ZmaOR9a2745e6',
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });
        const data = response.data;
        console.log(data);


        merchantId.value = data.merchant_id;
        reqTime.value = data.req_time;
        transactionId.value = data.transactionId;
        amount.value = data.amount;
        items.value = data.items;
        shipping.value = data.shipping;
        firstName.value = data.firstName;
        lastName.value = data.lastName;
        phone.value = data.phone;
        email.value = data.email;
        type.value = data.type;
        currency.value = data.currency;
        paymentOption.value = data.payment_option;
        returnUrl.value = data.return_url;
        returnParams.value = data.return_params;
        continueSuccessUrl.value = data.continue_success_url;
        hash.value = data.hash;
        apiUrl.value = data.api_url;

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