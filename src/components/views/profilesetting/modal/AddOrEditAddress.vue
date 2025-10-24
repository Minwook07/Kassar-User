<template>
    <div class="modal fade" id="addressModal" tabindex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="addressModalLabel">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        {{ isEditMode ? 'កែប្រែអាសយដ្ឋាន' : 'បន្ថែមអាសយដ្ឋានថ្មី' }}
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="handleSubmit">
                        <!-- Name Field -->
                        <div class="mb-3">
                            <label for="name" class="form-label fw-bold">
                                ឈ្មោះអ្នកទទួល <span class="text-danger">*</span>
                            </label>
                            <input type="text" class="form-control" id="name" v-model="cardStore.frm_add.name"
                                :class="{ 'is-invalid': errors.name }" placeholder="បញ្ចូលឈ្មោះអ្នកទទួល" required>
                            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                        </div>

                        <!-- Phone Field -->
                        <div class="mb-3">
                            <label for="phone" class="form-label fw-bold">
                                លេខទូរស័ព្ទ <span class="text-danger">*</span>
                            </label>
                            <input type="tel" class="form-control" id="phone" v-model="cardStore.frm_add.phone"
                                :class="{ 'is-invalid': errors.phone }" placeholder="012 345 678"
                                @input="formatPhoneInput" required>
                            <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
                        </div>

                        <!-- Province Field -->
                        <div class="mb-3">
                            <label for="province" class="form-label fw-bold">
                                រាជធានី/ខេត្ត <span class="text-danger">*</span>
                            </label>
                            <select class="form-select" id="province" v-model="cardStore.frm_add.province"
                                :class="{ 'is-invalid': errors.province }" @change="onProvinceChange" required>
                                <option value="">-- ជ្រើសរើសរាជធានី/ខេត្ត --</option>
                                <option v-for="province in cardStore.provinces" :key="province.id" :value="province.id">
                                    {{ province.local_name }}
                                </option>
                            </select>
                            <div v-if="errors.province" class="invalid-feedback">{{ errors.province }}</div>
                        </div>

                        <!-- District Field -->
                        <div class="mb-3">
                            <label for="district" class="form-label fw-bold">
                                ស្រុក/ខណ្ឌ <span class="text-danger">*</span>
                            </label>
                            <select class="form-select" id="district" v-model="cardStore.frm_add.district"
                                :class="{ 'is-invalid': errors.district }" @change="onDistrictChange"
                                :disabled="!cardStore.frm_add.province" required>
                                <option value="">-- ជ្រើសរើសស្រុក/ខណ្ឌ --</option>
                                <option v-for="district in cardStore.districts" :key="district.id" :value="district.id">
                                    {{ district.local_name }}
                                </option>
                            </select>
                            <div v-if="errors.district" class="invalid-feedback">{{ errors.district }}</div>
                        </div>

                        <!-- Commune Field -->
                        <div class="mb-3">
                            <label for="commune" class="form-label fw-bold">
                                ឃុំ/សង្កាត់ <span class="text-danger">*</span>
                            </label>
                            <select class="form-select" id="commune" v-model="cardStore.frm_add.commune"
                                :class="{ 'is-invalid': errors.commune }" @change="onCommuneChange"
                                :disabled="!cardStore.frm_add.district" required>
                                <option value="">-- ជ្រើសរើសឃុំ/សង្កាត់ --</option>
                                <option v-for="commune in cardStore.communes" :key="commune.id" :value="commune.id">
                                    {{ commune.local_name }}
                                </option>
                            </select>
                            <div v-if="errors.commune" class="invalid-feedback">{{ errors.commune }}</div>
                        </div>

                        <!-- Village Field -->
                        <div class="mb-3">
                            <label for="village" class="form-label fw-bold">
                                ភូមិ <span class="text-danger">*</span>
                            </label>
                            <select class="form-select" id="village" v-model="cardStore.frm_add.village"
                                :class="{ 'is-invalid': errors.village }" :disabled="!cardStore.frm_add.commune"
                                required>
                                <option value="">-- ជ្រើសរើសភូមិ --</option>
                                <option v-for="village in cardStore.villages" :key="village.id" :value="village.id">
                                    {{ village.local_name }}
                                </option>
                            </select>
                            <div v-if="errors.village" class="invalid-feedback">{{ errors.village }}</div>
                        </div>

                        <!-- House Number and Street Number -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="houseNumber" class="form-label fw-bold">
                                    ផ្ទះលេខ <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control" id="houseNumber"
                                    v-model="cardStore.frm_add.houseNumber"
                                    :class="{ 'is-invalid': errors.houseNumber }" placeholder="បញ្ចូលផ្ទះលេខ" required>
                                <div v-if="errors.houseNumber" class="invalid-feedback">{{ errors.houseNumber }}</div>
                            </div>

                            <div class="col-md-6 mb-3">
                                <label for="streetNumber" class="form-label fw-bold">
                                    ផ្លូវលេខ <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control" id="streetNumber"
                                    v-model="cardStore.frm_add.streetNumber"
                                    :class="{ 'is-invalid': errors.streetNumber }" placeholder="បញ្ចូលផ្លូវលេខ"
                                    required>
                                <div v-if="errors.streetNumber" class="invalid-feedback">{{ errors.streetNumber }}</div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>បោះបង់
                    </button>
                    <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="isSubmitting">
                        <span v-if="isSubmitting">
                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            កំពុងរក្សាទុក...
                        </span>
                        <span v-else>
                            <i class="fas fa-save me-2"></i>រក្សាទុក
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCardStore } from '@/stores/card_store';
import { Modal } from 'bootstrap';

const cardStore = useCardStore();
const errors = ref({});
const isSubmitting = ref(false);

const isEditMode = computed(() => cardStore.selected_id > 0);

onMounted(async () => {
    cardStore.mdl_address = Modal.getOrCreateInstance(document.getElementById('addressModal'));

    // Load provinces on mount
    await cardStore.onLoadProvince();
});

const formatPhoneInput = (event) => {
    let value = event.target.value.replace(/\D/g, '');

    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }

    // Format based on length
    let formatted = value;
    if (value.length > 6) {
        formatted = value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 7) + ' ' + value.slice(7);
    } else if (value.length > 5) {
        formatted = value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5);
    } else if (value.length > 3) {
        formatted = value.slice(0, 3) + ' ' + value.slice(3);
    }

    cardStore.frm_add.phone = formatted.trim();
};

const onProvinceChange = async () => {
    cardStore.frm_add.district = '';
    cardStore.frm_add.commune = '';
    cardStore.frm_add.village = '';
    cardStore.districts = [];
    cardStore.communes = [];
    cardStore.villages = [];

    if (cardStore.frm_add.province) {
        await cardStore.onLoadDistrict(cardStore.frm_add.province);
    }
};

const onDistrictChange = async () => {
    cardStore.frm_add.commune = '';
    cardStore.frm_add.village = '';
    cardStore.communes = [];
    cardStore.villages = [];

    if (cardStore.frm_add.district) {
        await cardStore.onLoadCommune(cardStore.frm_add.district);
    }
};

const onCommuneChange = async () => {
    cardStore.frm_add.village = '';
    cardStore.villages = [];

    if (cardStore.frm_add.commune) {
        await cardStore.onLoadVillage(cardStore.frm_add.commune);
    }
};

const validateForm = () => {
    errors.value = {};

    if (!cardStore.frm_add.name || cardStore.frm_add.name.trim() === '') {
        errors.value.name = 'សូមបញ្ចូលឈ្មោះអ្នកទទួល';
    }

    const cleanPhone = cardStore.frm_add.phone.replace(/\s+/g, '');
    if (!cleanPhone) {
        errors.value.phone = 'សូមបញ្ចូលលេខទូរស័ព្ទ';
    } else if (cleanPhone.length < 8 || cleanPhone.length > 10) {
        errors.value.phone = 'លេខទូរស័ព្ទត្រូវតែមាន 8-10 ខ្ទង់';
    }

    if (!cardStore.frm_add.province) {
        errors.value.province = 'សូមជ្រើសរើសរាជធានី/ខេត្ត';
    }

    if (!cardStore.frm_add.district) {
        errors.value.district = 'សូមជ្រើសរើសស្រុក/ខណ្ឌ';
    }

    if (!cardStore.frm_add.commune) {
        errors.value.commune = 'សូមជ្រើសរើសឃុំ/សង្កាត់';
    }

    if (!cardStore.frm_add.village) {
        errors.value.village = 'សូមជ្រើសរើសភូមិ';
    }

    if (!cardStore.frm_add.houseNumber || cardStore.frm_add.houseNumber.trim() === '') {
        errors.value.houseNumber = 'សូមបញ្ចូលផ្ទះលេខ';
    }

    if (!cardStore.frm_add.streetNumber || cardStore.frm_add.streetNumber.trim() === '') {
        errors.value.streetNumber = 'សូមបញ្ចូលផ្លូវលេខ';
    }

    return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    isSubmitting.value = true;

    try {
        await cardStore.onSaveAddress();

        // Close modal on success
        cardStore.mdl_address.hide()

        // Show success message
        if (cardStore.$toast) {
            cardStore.$toast.success(
                isEditMode.value ? 'កែប្រែអាសយដ្ឋានបានជោគជ័យ' : 'បន្ថែមអាសយដ្ឋានបានជោគជ័យ'
            );
        }
    } catch (error) {
        console.error('Submit error:', error);
        // Error handling is done in the store
    } finally {
        isSubmitting.value = false;
    }
};

// Expose method to open modal from parent
const openModal = () => {
    cardStore.mdl_address.show()
};

const closeModal = () => {
    cardStore.mdl_address.hide()
};

defineExpose({
    openModal,
    closeModal
});
</script>

<style scoped>
.form-label {
    color: #333;
    font-size: 0.95rem;
}

.form-control:focus,
.form-select:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
}

.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    display: block;
    font-size: 0.875rem;
}

.modal-header.bg-primary {
    border-bottom: none;
}

.btn-close-white {
    filter: brightness(0) invert(1);
}
</style>