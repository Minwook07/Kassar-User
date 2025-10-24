<template>
    <div class="modal fade" id="qr-modal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content py-5 px-4">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="modal-title">ការទូទាត់ QR</h5>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="clearQr"></button>
                </div>

                <div class="modal-body text-center">
                    <p class="text-muted">
                        ស្កេនកូដ QR នេះជាមួយកម្មវិធីធនាគាររបស់អ្នក:
                    </p>
                    <img src="/images/default-avatar.png" class="img-fluid mb-3" alt="QR Code"
                        style="max-width: 200px;">
                    <p><strong>សរុប:</strong> ៛{{ showTotalPrice }}</p>
                </div>

                <div class="btn-wayPay">
                    <button class="btn btn-success" type="button" @click="onSaveCart">
                        រួចរាល់
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { computed, onMounted } from 'vue';
import { useCardStore } from '@/stores/card_store';
import { usePaymentMethodStore } from '@/stores/views/paymentMethodStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter()
const cartListStore = useCardStore()
const paymentMethodStore = usePaymentMethodStore()

const totalPrice = computed(() => cartListStore.totalPrice);
const totalDis = computed(() => cartListStore.totalDis);
const showTotalPrice = computed(() => totalPrice.value - totalDis.value)

const clearQr = async () => {
    await router.replace({ query: {} })
}

const onSaveCart = async () => {
    paymentMethodStore.mdl_qr.hide()
    router.push('/payment-success')
};

onMounted(() => {
    paymentMethodStore.mdl_qr = Modal.getOrCreateInstance(document.getElementById('qr-modal'));
})
</script>
