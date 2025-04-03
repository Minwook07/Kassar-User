<template>
    <div class="container" style="margin-top: 75px; margin: 0 auto;">
        <input type="button" id="checkout_button" value="Checkout Now" @click="getCheckoutData" />
        <div style="width: 200px; margin: 0 auto;" v-if="checkoutData">

            <h2>TOTAL: ${{ checkoutData.data.amount }}</h2>

            <input type="button" id="checkout_button" value="បង់ប្រាក់" @click="pay" />

            <form method="POST" target="aba_webservice" :action="checkoutData.data.api_url" id="aba_merchant_request">
                <input type="hidden" name="hash" :value="checkoutData.data.hash" />
                <input type="hidden" name="tran_id" :value="checkoutData.data.transactionId" />
                <input type="hidden" name="amount" :value="checkoutData.data.amount" />
                <input type="hidden" name="firstname" :value="checkoutData.data.firstName" />
                <input type="hidden" name="lastname" :value="checkoutData.data.lastName" />
                <input type="hidden" name="phone" :value="checkoutData.data.phone" />
                <input type="hidden" name="email" :value="checkoutData.data.email" />
                <input type="hidden" name="items" :value="checkoutData.data.items" />
                <input type="hidden" name="return_params" :value="checkoutData.data.return_params" />
                <input type="hidden" name="shipping" :value="checkoutData.data.shipping" />
                <input type="hidden" name="currency" :value="checkoutData.data.currency" />
                <input type="hidden" name="type" :value="checkoutData.data.type" />
                <input type="hidden" name="return_url" :value="checkoutData.data.return_url" />
                <input type="hidden" name="payment_option" :value="checkoutData.data.payment_option" />
                <input type="hidden" name="merchant_id" :value="checkoutData.data.merchant_id" />
                <input type="hidden" name="req_time" :value="checkoutData.data.req_time" />
                <input type="hidden" name="continue_success_url" :value="checkoutData.data.continue_success_url" />
            </form>
            <input type="button" id="checkout_button" value="Checkout Now" @click="checkout" />

            <img v-if="qrData" :src="qrData.qrImage" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const checkoutData = ref(null);
const qrData = ref(null);

const getCheckoutData = async () => {
    const formData = new FormData();

    const itemsArray = [
        { product_id: 11, quantity: 4 },
        { product_id: 12, quantity: 10 }
    ];

    formData.append('items', JSON.stringify(itemsArray));
    formData.append('address_id', 1);

    try {
        // Get Checkout Data
        const response = await axios.post('/api/checkout', formData, {
            headers: {
                'Authorization': 'Bearer 15|gNxfuJ6A9VBhMWU6y6vCmcQyaGhHtRkOj7Wuav9se4ae17be',
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        checkoutData.value = response.data;
        console.log('Checkout Data: ', checkoutData.value);

    } catch (error) {
        console.error('Error fetching payment info:', error);
    }
}


// Payway payment requests
const generateQR = async () => {
    if (!checkoutData.value || !checkoutData.value.data) {
        console.error('No checkout data available for QR generation.');
        return;
    }

    const data = checkoutData.value.data;
    // console.log(data);
    
    var frmPayway = new FormData();
    frmPayway.append('hash', data.hash);
    frmPayway.append('tran_id', data.transactionId);
    frmPayway.append('amount', data.amount);
    frmPayway.append('firstname', data.firstName);
    frmPayway.append('lastname', data.lastName);
    frmPayway.append('phone', data.phone);
    frmPayway.append('email', data.email);
    frmPayway.append('items', data.items);
    frmPayway.append('return_params', data.return_params);
    frmPayway.append('shipping', data.shipping);
    frmPayway.append('currency', data.currency);
    frmPayway.append('type', data.type);
    frmPayway.append('return_url', data.return_url);
    frmPayway.append('payment_option', data.payment_option);
    frmPayway.append('merchant_id', data.merchant_id);
    frmPayway.append('req_time', data.req_time);
    frmPayway.append('continue_success_url', data.continue_success_url);



    try {
        const qrResponse = await axios.post(
            checkoutData.value.data.api_url,
            frmPayway,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        qrData.value = qrResponse.data;
        console.log('QR Data:', qrData.value);

    } catch (error) {
        console.error('Error generating QR:', error);
    }
};

// Checkout function to call the Payway checkout API
const pay = () => {
    // Ensure data exists before making second API call
    if (checkoutData.value && checkoutData.value.data) {
        generateQR();
    }
};

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