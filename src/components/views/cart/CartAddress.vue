<template>
    <div class="custom-card bg-white" style="height: 200px;">
        <div>
            <div v-if="cardStore.isAddress == null">
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
                    <div class="icon-address fs-1 text-light bg-success text-center rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    
                    <!-- Ensure reactive binding -->
                    <div v-if="cardStore.cartAddresses.length > 0" class="text-body align-items-center pt-3 ps-3">
                        <div v-for="cartAddress in cardStore.cartAddresses" :key="cartAddress.id">
                            <h5 class="fw-bold">
                            ផ្ទះលេខ{{ cartAddress.house_number || 'N/A' }} 
                            ផ្លូវលេខ​{{ cartAddress.street_number || '' }}
                            សង្កាត់ {{ cartAddress.commune || 'N/A' }},
                            ខណ្ឌ {{ cartAddress.district || 'N/A' }},
                            រាជធានី/ខេត្ត {{ cartAddress.province || 'N/A' }}
                            </h5>
                            <span>{{ cartAddress.name || 'N/A' }}</span>
                            <p>{{ formatPhone(cartAddress.phone) || 'N/A' }}</p>
                        </div>
                    </div>

                    <div v-else>
                        <p class="text-muted">មិនមានអាសយដ្ឋាន</p>
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

  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  } else if (digits.length === 9) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  } else if (digits.length === 8) {
    return digits.replace(/(\d{3})(\d{3})(\d{2})/, '$1 $2 $3');
  }

  return phone; 
};

const onOpenAddAddress = () => {
    if (cardStore.mdl_address) {
        cardStore.mdl_address.show();
    }
};
</script>
