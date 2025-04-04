<template>
    <div class="card-process py-5 mx-auto bg-white">
        <h5 class="fw-bold">ដឹកជញ្ជូន</h5>
        <small class="">កាលបរិច្ឆេទដឹកជញ្ជូន៖ 04-Sep-2025</small>

        <hr class="hr">
        <div class="d-flex justify-content-between mb-2">
            <h6 class="fw-bold">តម្លៃ</h6>
            <h6 class="fw-bold">{{ formatPrice(totalPrice) }} ៛</h6>
        </div>
        <div class="d-flex justify-content-between text-muted mb-2">
            <span>បញ្ចុះតម្លៃ</span>
            <span>-{{ formatPrice(totalDis) }} ៛</span>
        </div>
        <div class="d-flex justify-content-between text-muted ">
            <span>ថ្លៃដឹកជញ្ចូន</span>
            <span>ឥតគិតថ្លៃ</span>
        </div>
        <hr class="hr">
        <div class="d-flex justify-content-between fw-bold">
            <span>តម្លៃសរុប</span>
            <span>{{ formatPrice(totalPrice - totalDis) }} ៛</span>
        </div>
        <hr class="hr">
        
        <RouterLink class="text-white text-decoration-none" to="/success">
            <button class="mt-3 btn btn-secondary btn-process w-100">
                ទូទាត់
                <span>{{ formatPrice(totalPrice - totalDis) }} ៛</span>
            </button>
        </RouterLink>
    </div>
</template>
<script setup>
import { useCardStore } from '@/stores/card_store';
import { computed, ref } from 'vue';

const cartListStore = useCardStore();

const formatPrice = cartListStore.formatPrice;

// Reactive state for total price and discount
const totalPrice = computed(() => cartListStore.totalPrice);
const totalDis = computed(() => cartListStore.totalDis);
</script>
