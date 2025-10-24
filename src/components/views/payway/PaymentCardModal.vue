<template>
    <div class="modal fade" id="card-modal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content py-5 px-4">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="modal-title fw-bold pb-1">វិធីសាស្ត្រទូទាត់</h5>
                        <p>សុវត្ថិភាព និង ការ encrypted ជាមួយ ABA Pay</p>
                    </div>
                    <button type="button" class="btn-close" @click="clearCard()" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                            <img src="@/assets/images/cart-img/icon/unionpay.svg" class="img-uni"
                                                alt="">
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
                                    <input type="text" class="form-control shadow-none" id="expiryDate"
                                        v-model="expiryDate" placeholder="MM/YY" maxlength="5"
                                        @input="formatExpiryDate" />
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <input type="text" class="form-control shadow-none" id="cvv" placeholder="123">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 btn-wayPay ">
                    <button class="btn btn-success" type="button" @click="onSaveCart()">
                        រួចរាល់
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue'
import { usePaymentMethodStore } from '@/stores/views/paymentMethodStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const paymentMethodStore = usePaymentMethodStore()

const expiryDate = ref("");

onMounted(() => {
    paymentMethodStore.mdl_card = Modal.getOrCreateInstance(document.getElementById('card-modal'))
})

const clearCard = async () => {
    await router.replace({ query: {} })
}

const formatExpiryDate = (event) => {
    let input = event.target
    let value = input.value.replace(/\D/g, '')

    if (value.length > 4) value = value.slice(0, 4)

    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2)
    }

    expiryDate.value = value
}

</script>
