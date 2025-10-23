<template>
    <div class="content-view-container">
        <div class="card-header p-0 mb-5 bg-transparent border-0">
            <h4 class="fw-semibold">ការដឹកជញ្ជូន</h4>
            <p class="m-0">គ្រប់គ្រងអាសយដ្ឋានដឹកជញ្ជូនរបស់អ្នក</p>
        </div>

        <div class="card-body p-0">
            <div class="row g-4">
                <div class="col-12">
                    <div v-if="cardStore" class="p-4 bg-light rounded-3 border-start border-primary border-4">
                        <h6 class="fw-bold text-primary mb-3">
                            <i class="fas fa-map-marker-alt me-2"></i>អាសយដ្ឋានបច្ចុប្បន្ន
                        </h6>
                        <h5 class="fw-bold">
                            ផ្ទះលេខ {{ cardStore.house_number }}
                            ផ្លូវលេខ {{ cardStore.street_number }},
                            សង្កាត់ {{ cardStore.commune?.local_name }},
                            ខណ្ឌ {{ cardStore.district?.local_name }},
                            រាជធានី/ខេត្ត {{ cardStore.province?.local_name }}
                        </h5>
                    </div>
                    <div v-else class="p-4 bg-light rounded-3 border-start border-primary border-4 text-center">
                        <p>មិនមានអាសយដ្ឋានសម្រាប់បង្ហាញ</p>
                    </div>

                </div>

                <div class="col-12 mb-4">
                    <h6 class="fw-bold mb-2">Location Map</h6>
                    <div class="border rounded overflow-hidden" style="height: 300px;">
                        <div class="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                            <div class="text-center">
                                <i class="fas fa-map-marker-alt fa-3x mb-2"></i>
                                <p>Interactive Map View</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <button class="btn btn-primary">
                    <i class="fas fa-edit me-2"></i>កែប្រែអាសយដ្ឋាន
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { onMounted } from 'vue';

const cardStore = useCardStore()

onMounted(async () => {
    await cardStore.onLoadAddress();
});
</script>