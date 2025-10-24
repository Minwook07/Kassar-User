<template>
    <HeaderPaymentMethod />
    <div class="container py-5">
        <h2 class="mb-4 text-center">ជ្រើសរើសវិធីសាស្ត្រទូទាត់</h2>

        <div class="row justify-content-center g-4">
            <!-- QR Payment -->
            <div class="col-md-4">
                <div class="card payment-card shadow-sm text-center p-4 hover-effect" @click="openQr()">
                    <i class="bi bi-qr-code fs-1 text-primary mb-3"></i>
                    <h5>បង់ប្រាក់ដោយប្រើ QR Code</h5>
                    <p class="text-muted small">ស្កេន QR ដើម្បី​ទូទាត់​ប្រាក់​យ៉ាង​រហ័ស និង​សុវត្ថិភាព</p>
                </div>
            </div>

            <!-- Credit Card Payment -->
            <div class="col-md-4">
                <div class="card payment-card shadow-sm text-center p-4 hover-effect" @click="openCard()">
                    <i class="bi bi-credit-card fs-1 text-success mb-3"></i>
                    <h5>បង់ជាមួយប័ណ្ណឥណទាន</h5>
                    <p class="text-muted small">ប្រើ Visa, MasterCard ឬ JCB របស់អ្នក</p>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <PaymentQRModal />
        <PaymentCardModal />
    </div>
</template>

<script setup>
import PaymentQRModal from './PaymentQRModal.vue'
import PaymentCardModal from './PaymentCardModal.vue'
import HeaderPaymentMethod from '../cart/HeaderPaymentMethod.vue'
import { useCardStore } from '@/stores/card_store'
import { usePaymentMethodStore } from '@/stores/views/paymentMethodStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const cartListStore = useCardStore()
const paymentMethodStore = usePaymentMethodStore()


const totalPrice = computed(() => cartListStore.totalPrice);
const totalDis = computed(() => cartListStore.totalDis);

const openQr = () => {
    paymentMethodStore.mdl_qr.show()
        router.push({
        query: {
            method: 'qr',
            total: totalPrice.value - totalDis.value
        }
    })
}

const openCard = () => {
    paymentMethodStore.mdl_card.show()
    router.push({
        query: {
            method: 'card'
        }
    })
}
</script>

<style scoped>
.payment-card {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-effect:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
</style>
