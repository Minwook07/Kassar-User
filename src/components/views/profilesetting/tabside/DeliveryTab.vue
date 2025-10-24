<template>
    <div class="content-view-container">
        <div class="card-header p-0 mb-5 bg-transparent border-0">
            <h4 class="fw-semibold">ការដឹកជញ្ជូន</h4>
            <p class="m-0">គ្រប់គ្រងអាសយដ្ឋានដឹកជញ្ជូនរបស់អ្នក</p>
        </div>

        <div class="card-body p-0">
            <!-- Current Selected Address -->
            <div class="row g-4 mb-4">
                <div class="col-12">
                    <div v-if="cardStore.selectedAddress"
                        class="p-4 bg-light rounded-3 border-start border-primary border-4">
                        <h6 class="fw-bold text-primary mb-3">
                            <i class="fas fa-map-marker-alt me-2"></i>អាសយដ្ឋានបច្ចុប្បន្ន
                        </h6>
                        <h5 class="fw-bold mb-2">{{ cardStore.selectedAddress.name }}</h5>
                        <p class="mb-1">
                            ផ្ទះលេខ {{ cardStore.selectedAddress.house_number?? 'N/A' }}
                            ផ្លូវលេខ {{ cardStore.selectedAddress.street_number?? 'N/A' }},
                            ភូមិ {{ cardStore.selectedAddress.commune?.local_name || 'N/A' }},
                            ឃុំ/សង្កាត់ {{ cardStore.selectedAddress.commune?.local_name || 'N/A' }},
                            ស្រុក/ខណ្ឌ {{ cardStore.selectedAddress.district?.local_name || 'N/A' }},
                            រាជធានី/ខេត្ត {{ cardStore.selectedAddress.province?.local_name || 'N/A' }}
                        </p>
                        <p class="mb-0 text-muted">
                            <i class="fas fa-phone me-2"></i>{{ cardStore.selectedAddress.phone }}
                        </p>
                    </div>
                    <div v-else class="p-4 bg-light rounded-3 border-start border-warning border-4 text-center">
                        <i class="fas fa-exclamation-circle fa-2x text-warning mb-2"></i>
                        <p class="mb-0">មិនមានអាសយដ្ឋានសម្រាប់បង្ហាញ</p>
                    </div>
                </div>
            </div>

            <!-- All Addresses List -->
            <div class="row g-4 mb-4">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0">អាសយដ្ឋានទាំងអស់ ({{ cardStore.cartAddresses.length }})</h6>
                        <button class="btn btn-primary btn-sm" @click="openAddModal">
                            <i class="fas fa-plus me-2"></i>បន្ថែមអាសយដ្ឋានថ្មី
                        </button>
                    </div>

                    <div v-if="cardStore.cartAddresses.length > 0" class="row g-3">
                        <div v-for="address in cardStore.cartAddresses" :key="address.id"
                            class="col-12 col-md-6 col-lg-4">
                            <div class="card h-100 position-relative"
                                :class="{ 'border-primary border-2': address.id === cardStore.selectedAddressId }"
                                style="cursor: pointer;">
                                <!-- Selected Badge -->
                                <div v-if="address.id === cardStore.selectedAddressId"
                                    class="position-absolute top-0 end-0 m-2">
                                    <span class="badge bg-primary">
                                        <i class="fas fa-check me-1"></i>បច្ចុប្បន្ន
                                    </span>
                                </div>

                                <div class="card-body" @click="selectAddress(address.id)">
                                    <h6 class="fw-bold mb-2">{{ address.name }}</h6>
                                    <p class="small mb-1">
                                        <i class="fas fa-home me-2 text-muted"></i>
                                        ផ្ទះលេខ {{ address.house_number?? 'N/A' }}, ផ្លូវលេខ {{ address.street_number?? 'N/A' }}
                                    </p>
                                    <p class="small mb-1">
                                        <i class="fas fa-map-marker-alt me-2 text-muted"></i>
                                        {{ address.village?.local_name || 'N/A' }},
                                        {{ address.commune?.local_name || 'N/A' }},
                                        {{ address.district?.local_name || 'N/A' }},
                                        {{ address.province?.local_name || 'N/A' }}
                                    </p>
                                    <p class="small mb-3">
                                        <i class="fas fa-phone me-2 text-muted"></i>
                                        {{ address.phone }}
                                    </p>

                                    <div class="d-flex gap-2">
                                        <button class="btn btn-sm btn-outline-primary flex-fill"
                                            @click.stop="editAddress(address.id)">
                                            <i class="fas fa-edit me-1"></i>កែប្រែ
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger"
                                            @click.stop="confirmDelete(address.id)">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-5">
                        <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                        <p class="text-muted">មិនមានអាសយដ្ឋាន</p>
                        <button class="btn btn-primary" @click="openAddModal">
                            <i class="fas fa-plus me-2"></i>បន្ថែមអាសយដ្ឋានដំបូង
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddOrEditAddress />
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { onMounted } from 'vue';
import axios from 'axios';
import AddOrEditAddress from '../modal/AddOrEditAddress.vue';

const cardStore = useCardStore();

onMounted(async () => {
    await cardStore.onLoadAddress();
});

const selectAddress = (addressId) => {
    cardStore.selectAddress(addressId);
};

const openAddModal = () => {
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

    if (cardStore.mdl_address) {
        cardStore.mdl_address.show();
    }
};

const editAddress = (addressId) => {
    cardStore.loadAddressForEdit(addressId);

    if (cardStore.mdl_address) {
        cardStore.mdl_address.show();
    }
};

const confirmDelete = (addressId) => {
    if (confirm('តើអ្នកពិតជាចង់លុបអាសយដ្ឋាននេះមែនទេ?')) {
        deleteAddress(addressId);
    }
};

const deleteAddress = async (addressId) => {
    try {
        await axios.delete(`/api/address/${addressId}`, {
            headers: { Authorization: `Bearer ${cardStore.token}` }
        });

        await cardStore.onLoadAddress();

        if (cardStore.$toast) {
            cardStore.$toast.success('លុបអាសយដ្ឋានបានជោគជ័យ');
        }
    } catch (error) {
        console.error('Delete address error:', error);
        if (cardStore.$toast) {
            cardStore.$toast.error('មិនអាចលុបអាសយដ្ឋានបានទេ');
        }
    }
};
</script>

<style scoped>
.card {
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.border-2 {
    border-width: 2px !important;
}
</style>