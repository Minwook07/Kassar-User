<template>
    <div class="custom-card bg-white" style="height: 200px;">
        <div>
            <div v-if="!cardStore.isAddress">
                <div class="location-icon">
                    <i class="bi bi-geo-alt-fill text-secondary"></i>
                </div>
                <div class="text-center mt-3">
                    <h5 class="fw-bold">មិនមានអាស័យដ្ឋាននៅលើផែនទី</h5>
                    <p class="text-muted">សូមបញ្ចូលអាសយដ្ឋានរបស់អ្នកដើម្បីអាចរកឃើញ</p>
                </div>
            </div>
            <!-- form -->
            <form v-else>
                <h4 class="fw-bold">អាស័យដ្ឋានរបស់អ្នក</h4>
                <div class="d-flex pt-2">
                    <div
                        class="icon-address fs-1 text-light bg-success text-center rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    
                    <div v-if="cardStore.isAddress">
                        <div v-if="cardStore.selectedAddress">
                            <h5 class="fw-bold">
                                ផ្ទះលេខ {{ cardStore.selectedAddress.house_number || 'N/A' }}
                                ផ្លូវលេខ {{ cardStore.selectedAddress.street_number || 'N/A' }},
                                សង្កាត់ {{ cardStore.selectedAddress.commune?.local_name || 'N/A' }},
                                ខណ្ឌ {{ cardStore.selectedAddress.district?.local_name || 'N/A' }},
                                រាជធានី/ខេត្ត {{ cardStore.selectedAddress.province?.local_name || 'N/A' }}
                            </h5>
                            <span>{{ cardStore.selectedAddress.name || 'N/A' }}</span>
                            <p>{{ cardStore.selectedAddress.phone || 'N/A' }}</p>
                        </div>
                    </div>

                    <div v-else>
                        <p class="text-muted">មិនមានអាសយដ្ឋាននៅលើផែនទី</p>
                    </div>

                </div>
            </form>
        </div>

        <!-- Floating Button -->
        <button class="floating-button border-0 shadow-lg" @click="onOpenAddAddress()">
            <i class="bi bi-plus"></i>
        </button>
    </div>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { onMounted } from 'vue';

const cardStore = useCardStore();

onMounted(async () => {
    await cardStore.onLoadAddress();
});

const formatPhone = (phone) => {
    if (!phone) return 'N/A';

    let digits = phone.replace(/\D/g, '');

    if (digits.length < 8) return phone;

    // For 8 digits: XX XX XX XX
    if (digits.length === 8) {
        return digits.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }

    // For 9 digits: XXX XX XX XX
    if (digits.length === 9) {
        return digits.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }

    // For 10 digits: XXX XXX XX XX
    if (digits.length === 10) {
        return digits.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }

    return phone;
};


const onOpenAddAddress = () => {
    if (cardStore.mdl_address) {
        cardStore.mdl_address.show();
    }
};
</script>
