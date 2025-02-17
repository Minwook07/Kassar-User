<template>
    <div class="card-pay px-4 py-5">
        <h5 class="fw-bold pb-1">ជ្រើសរើសវិធីសាស្ត្រទូរទាត់</h5>
        <p class="text-muted">
            សុវត្ថិភាព និងការការពារ encrypted ដោយ ABA Pay
        </p>

        <!-- Payment Options -->
        <div class="row row-cols-1 g-3 mt-4">
            <!-- ABA KHQR -->
            <div class="col">
                <div class="card p-3 px-4 d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="img-bank" style="background-color: #e1232eff;">
                            <img src="@/assets/images/Cart/icon/qr-1.png" alt="ABA KHQR" />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="fw-bold mb-1">ABA KHQR</h6>
                            <p class="text-muted mb-0">ស្កេនសម្រាប់ទូរទាត់ជាមួយកម្មវិធីធនាគារ</p>
                        </div>
                    </div>
                    <div>
                        <a role="button" class="arrow-way text-black"><i class="bi bi-chevron-right"></i></a>
                    </div>
                </div>
            </div>

            <!-- Credit / Debit Card -->
            <div class="col">
                <div class="card p-3 px-4 d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="img-bank">
                            <img src="@/assets/images/Cart/icon/credit-card.svg" alt="Credit/Debit Card"
                                style="background-color: teal; padding: 10px;" />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="fw-bold text-credit">Credit / Debit Card</h6>
                            <div class="cart-img d-flex justify-content-between align-items-center">
                                <img src="@/assets/images/Cart/icon/visa.svg" alt="">
                                <img src="@/assets/images/Cart/icon/mastercard.svg" alt="">
                                <img src="@/assets/images/Cart/icon/unionpay.svg" class="img-uni" alt="">
                                <img src="@/assets/images/Cart/icon/jcb.svg" alt="">
                            </div>
                        </div>
                    </div>

                    <!-- choose already -->
                    <!-- <div class="d-flex flex-row align-items-center">
                        <div class="img-bank">
                            <img src="@/assets/images/Cart/icon/visa-text.svg" alt="Credit/Debit Card" style="background-color: #0e4595ff; " />
                            <img src="@/assets/images/Cart/icon/mastercard-text.svg" alt="" style="background-color: #16366fff; " />
                            <img src="@/assets/images/Cart/icon/unionpay-text.svg" alt="" class="img-uni-text" />
                            <img src="@/assets/images/Cart/icon/jcb-text.svg" alt="" style="background-color: #0e4595ff; " />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="fw-bold mb-1">Mastercard ending in 6226</h6>
                            <p class="text-muted mb-0">Exp. date 01/30</p>
                        </div>
                    </div> -->
                    <div>
                        <a role="button" class="arrow-way text-black" @click="onOpenCredit()"><i
                                class="bi bi-chevron-right"></i></a>
                    </div>
                </div>
            </div>

            <!-- Alipay -->
            <div class="col">
                <div class="card  p-3 px-4 d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="img-bank">
                            <img src="@/assets/images/Cart/icon/alipay.svg" alt="ABA KHQR" class="p-2"
                                style="background-color: rgb(12, 154, 224);" />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="fw-bold mb-1">Alipay</h6>
                            <p class="text-muted mb-0">ស្កេនសម្រាប់ទូរទាត់ជាមួយកម្មវិធី Alipay</p>
                        </div>
                    </div>
                    <div>
                        <a role="button" class="arrow-way text-black"><i class="bi bi-chevron-right"></i></a>
                    </div>
                </div>
            </div>

            <!-- WeChat -->
            <div class="col">
                <div class="card  p-3 px-4 d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="img-bank">
                            <img src="@/assets/images/Cart/icon/wechat-pay-fill.svg" alt="WeChat" class="p-2"
                                style="background-color: rgb(16, 198, 16);" />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="fw-bold mb-1">WeChat</h6>
                            <p class="text-muted mb-0">ស្កេនសម្រាប់ទូរទាត់ជាមួយកម្មវិធី WeChat</p>
                        </div>
                    </div>
                    <div>
                        <a role="button" class="arrow-way text-black"><i class="bi bi-chevron-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';

const cardStore = useCardStore()


const onOpenCredit = () => {
    console.log(cardStore.mdl_credit);
    cardStore.mdl_credit.show()
}
</script>