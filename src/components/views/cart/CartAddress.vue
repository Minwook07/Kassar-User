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
                    <div v-if="cardStore.selectedAddress" class="ms-3">
                        <h5 class="fw-bold">
                            ផ្ទះលេខ {{ cardStore.selectedAddress.house_number || 'N/A' }}
                            ផ្លូវលេខ {{ cardStore.selectedAddress.street_number || 'N/A' }},
                            ភូមិ {{ cardStore.selectedAddress.village?.local_name || 'N/A' }},
                            ស្រុក/ខណ្ឌ {{ cardStore.selectedAddress.district?.local_name || 'N/A' }},
                            ស្រុក/ខណ្ឌ {{ cardStore.selectedAddress.district?.local_name || 'N/A' }},
                            រាជធានី/ខេត្ត {{ cardStore.selectedAddress.province?.local_name || 'N/A' }}
                        </h5>
                        <span>{{ cardStore.selectedAddress.name || 'N/A' }}</span>
                        <p>{{ cardStore.selectedAddress.phone || 'N/A' }}</p>
                    </div>
                    <div v-else class="ms-3">
                        <p class="text-muted">មិនមានអាសយដ្ឋាននៅលើផែនទី</p>
                    </div>
                </div>
            </form>
        </div>
        <!-- Floating Button -->
        <button class="floating-button border-0 shadow-lg" @click="onOpenAddAddress()">
            <i class="fa-solid" :class="cardStore.isAddress ? 'fa-pen-to-square' : 'fa-plus'"></i>
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

const onOpenAddAddress = () => {
    if (cardStore.mdl_address) {
        if (cardStore.isAddress && cardStore.selectedAddressId) {
            // EDIT MODE: Load the selected address data
            cardStore.loadAddressForEdit(cardStore.selectedAddressId);
        } else {
            // CREATE MODE: Reset form
            cardStore.selected_id = 0;
            cardStore.frm_add = {
                province: '',
                district: '',
                commune: '',
                village: '',
                houseNumber: '',
                streetNumber: '',
                phone: '',
                name: ''
            };
        }
        cardStore.mdl_address.show();
    }
};
</script>