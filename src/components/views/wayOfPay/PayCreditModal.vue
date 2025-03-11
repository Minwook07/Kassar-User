<template>
    <div class="modal fade" id="mdl-credit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content py-5 px-4">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="modal-title fw-bold pb-1">វិធីសាស្ត្រទូរទាត់</h5>
                        <p>សុវត្ថិភាព និង ការ encrpted ជាមួយ ABA Pay</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                <input type="text" class="form-control" id="code" placeholder="លេខកាត">
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label for="date" class="form-label">កាលបរិច្ឆេទផុតកំណត់</label>
                                    <input type="date" class="form-control" id="date" placeholder="">
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <input type="text" class="form-control" id="cvv" placeholder="0000">
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
import { onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useCardStore } from '@/stores/card_store';

const cardStore = useCardStore()

onMounted(() => {
    cardStore.mdl_credit = Modal.getOrCreateInstance(document.getElementById('mdl-credit'))
})


const onSaveCart = () => {
    // cardStore.setIsAdress(true)  // use for save data
    cardStore.mdl_credit.hide()

}


</script>