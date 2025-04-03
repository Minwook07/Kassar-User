<template>
    <div class="card-pay bg-white">
        <div class="py-5 px-4">
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="fw-bold pb-1">វិធីសាស្ត្រទូរទាត់</h5>
                    <p>សុវត្ថិភាព និង ការ encrpted ជាមួយ ABA Pay</p>
                </div>
            </div>
            <div class="mt-3 way-pay-cart">
                <div class="row">
                    <div class="col-12">
                        <div class="py-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="code" class="form-label">លេខកាត</label>
                                <div class="cart-img d-flex justify-content-between align-items-center">
                                    <div class="cart-img d-flex justify-content-between align-items-center">
                                        <img src="@/assets/images/cart-img/icon/visa.svg" alt="">
                                        <img src="@/assets/images/cart-img/icon/mastercard.svg" alt="">
                                        <img src="@/assets/images/cart-img/icon/unionpay.svg" class="img-uni" alt="">
                                        <img src="@/assets/images/cart-img/icon/jcb.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <input type="text" class="form-control shadow-none" id="code" placeholder="លេខកាត">
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label for="expiryDate" class="form-label">កាលបរិច្ឆេទផុតកំណត់ (MM/YY)</label>
                                <input type="text" class="form-control shadow-none" id="expiryDate" v-model="expiryDate"
                                    placeholder="MM/YY" maxlength="5" @input="formatExpiryDate" />
                            </div>
                            <div class="col-6 mb-3">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control shadow-none" id="cvv" placeholder="0000">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const expiryDate = ref("");

const formatExpiryDate = (event) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 4) {
        value = value.slice(0, 4); // Restrict length to 4 digits
    }

    if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2); // Add slash after MM
    }

    expiryDate.value = value;
};
</script>
