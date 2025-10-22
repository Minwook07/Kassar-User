<template>
    <div class="content-view-container">
        <div class="card-header p-0 mb-4 bg-transparent border-0">
            <h4 class="fw-semibold">ប្រវត្តិការបញ្ជាទិញ</h4>
            <p class="m-0">មើលប្រវត្តិការបញ្ជាទិញរបស់អ្នក</p>
        </div>

        <div class="card-body p-0" v-if="orderProductStore.orders.length > 0">
            <div class="card-body p-0" v-if="orderProductStore.orders.length > 0">
                <div v-for="item in orderProductStore.orders" :key="item.id" class="border-bottom py-4">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="mb-1 fw-bold">{{ item.id }}</h6>
                            <p class="text-muted small mb-1">តម្លៃ: {{ item.total_amount }}</p>
                            <p class="text-muted small mb-0">{{ item.created_at }}</p>
                        </div>
                        <div class="col-auto text-end">
                            <div class="fw-bold mb-1">${{ item.total_amount }}</div>
                            <span class="badge" :class="{
                                'text-bg-success': item.order_status === 'delivered',
                                'text-bg-primary': item.order_status === 'confirmed',
                                'text-bg-info': item.order_status === 'processing',
                                'text-bg-warning': item.order_status === 'pending',
                                'text-bg-danger': item.order_status === 'cancelled'
                            }">
                                {{ translateStatusMessage(item.order_status) }}
                            </span>

                        </div>
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
import { onMounted } from 'vue';
import { useOrderProductStore } from '@/stores/views/orderProducts_store';
import { translateStatusMessage } from '@/utils/statusHelper';

const orderProductStore = useOrderProductStore()

onMounted(() => {
    orderProductStore.onLoadOrderHistory();
})
</script>