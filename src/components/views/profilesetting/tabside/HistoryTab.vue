<template>
    <div class="content-view-container">
        <div class="card-header p-0 mb-4 bg-transparent border-0">
            <h4 class="fw-semibold">ប្រវត្តិការបញ្ជាទិញ</h4>
            <p class="m-0">មើលប្រវត្តិការបញ្ជាទិញរបស់អ្នក</p>
        </div>

        <div class="card-body p-0" v-if="transactions.length > 0">
            <div v-for="transaction in transactions" :key="transaction.id" class="border-bottom py-4">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <img :src="transaction.thumbnail" alt="Product" class="rounded"
                            style="width: 60px; height: 60px; object-fit: cover;">
                    </div>
                    <div class="col">
                        <h6 class="mb-1 fw-bold">{{ transaction.name }}</h6>
                        <p class="text-muted small mb-1">តម្លៃ: {{ transaction.amount }}</p>
                        <p class="text-muted small mb-0">{{ transaction.date }}</p>
                    </div>
                    <div class="col-auto text-end">
                        <div class="fw-bold mb-1">${{ transaction.price }}</div>
                        <span class="badge" :class="{
                            'text-bg-success': transaction.status === 'ជោគជ័យ',
                            'text-bg-warning': transaction.status === 'រង់ចាំ',
                            'text-bg-danger': transaction.status === 'បរាជ័យ'
                        }">
                            {{ transaction.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body p-4" v-else>
            <div class="text-center py-5">
                <i class="fas fa-shopping-bag text-muted mb-3" style="font-size: 3rem;"></i>
                <h5 class="text-muted">មិនទាន់មានការបញ្ជាទិញ</h5>
                <p class="text-muted">ការបញ្ជាទិញរបស់អ្នកនឹងបង្ហាញនៅទីនេះ</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import durian from '@/assets/images/cart-img/veget-1.jpg'

// const transactions = [] //to see v-else
const transactions = ref([
    {
        id: 1,
        thumbnail: durian,
        name: 'ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន',
        amount: '1 គីឡូក្រាម',
        price: '១០០០០',
        status: 'ជោគជ័យ',
        date: '2024-01-15'
    },
    {
        id: 2,
        thumbnail: durian,
        name: 'នំប៉ក់ពៀរ កូនម៉ែ',
        amount: '2 ដុំ',
        price: '៥០០០',
        status: 'រង់ចាំ',
        date: '2024-01-10'
    },
    {
        id: 3,
        thumbnail: durian,
        name: 'ននោងខ្មែរ ខេត្តកំពត',
        amount: '1 ឡូ',
        price: '២០០០០',
        status: 'ជោគជ័យ',
        date: '2024-01-05'
    }
])
</script>