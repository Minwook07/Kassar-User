<template>
    <div class="modal fade" id="mdl-address" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header border-bottom">
                    <div class="d-flex gap-3 align-items-center">
                        <span
                            class="icon-address-mdl fs-1 text-secondary bg-body-secondary text-center rounded-circle px-3 py-2">
                           <i class="fa-solid fa-location-dot"></i>
                        </span>
                        <h5 class="modal-title fw-bold mb-0">
                            {{ showForm ? (editingAddressId ? 'កែប្រែអាស័យដ្ឋាន' : 'បន្ថែមអាស័យដ្ឋានថ្មី') :
                                'អាស័យដ្ឋានរបស់អ្នក' }}
                        </h5>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body p-4">
                    <!-- Address List View -->
                    <div v-if="!showForm">
                        <!-- Add New Address Button -->
                        <div class="mb-4">
                            <button class="btn btn-success w-100" @click="openAddressForm()">
                                <i class="fa-solid fa-circle-plus me-2"></i>
                                បន្ថែមអាស័យដ្ឋានថ្មី
                            </button>
                        </div>

                        <!-- Address Cards -->
                        <div v-if="cardStore.cartAddresses.length > 0" class="row g-3">
                            <div v-for="address in cardStore.cartAddresses" :key="address.id" class="col-12">
                                <div class="card address-card"
                                    :class="{ 'border-success': cardStore.selectedAddressId === address.id }"
                                    style="cursor: pointer;">
                                    <div class="card-body p-3">
                                        <div class="d-flex justify-content-between align-items-start">
                                            <!-- Radio Selection -->
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio"
                                                    :id="'address-' + address.id" name="selectedAddress"
                                                    :checked="cardStore.selectedAddressId === address.id"
                                                    @change="selectAddress(address.id)">
                                                <label class="form-check-label w-100" :for="'address-' + address.id">
                                                    <div class="ms-2">
                                                        <!-- Name and Phone -->
                                                        <div class="d-flex align-items-center gap-2 mb-2">
                                                            <h6 class="fw-bold mb-0">{{ address.name || 'N/A' }}</h6>
                                                            <span class="badge bg-secondary">{{ address.phone || 'N/A'
                                                            }}</span>
                                                        </div>

                                                        <!-- Address Details -->
                                                        <p class="mb-1 text-muted">
                                                            <i class="fa-solid fa-location-dot me-1"></i>
                                                            ផ្ទះលេខ {{ address.house_number || 'N/A' }}
                                                            ផ្លូវលេខ {{ address.street_number || 'N/A' }},
                                                            {{ address.village?.local_name || 'N/A' }},
                                                            {{ address.commune?.local_name || 'N/A' }},
                                                            {{ address.district?.local_name || 'N/A' }},
                                                            {{ address.province?.local_name || 'N/A' }}
                                                        </p>

                                                        <!-- Default Badge -->
                                                        <span v-if="cardStore.selectedAddressId === address.id"
                                                            class="badge bg-success">
                                                            <i class="fa-solid fa-circle-check me-1"></i>
                                                            អាសយដ្ឋានលំនាំដើម
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>

                                            <!-- Action Buttons -->
                                            <div class="d-flex gap-2">
                                                <button class="btn btn-sm btn-outline-primary"
                                                    @click.stop="openAddressForm(address.id)" title="កែប្រែ">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button class="btn btn-sm btn-outline-danger"
                                                    @click.stop="deleteAddress(address.id)" title="លុប">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-else class="text-center py-5">
                            <i class="fa-solid fa-location-dot" style="font-size: 4rem;"></i>
                            <h5 class="text-muted mt-3">មិនមានអាស័យដ្ឋាននៅឡើយទេ</h5>
                            <p class="text-muted">សូមបន្ថែមអាស័យដ្ឋានដើម្បីបន្ត</p>
                        </div>
                    </div>

                    <!-- Address Form -->
                    <div v-else>
                        <div class="mb-3">
                            <button class="btn btn-link text-decoration-none p-0" @click="showForm = false">
                                <i class="fa-solid fa-arrow-left-long me-2"></i>
                                ត្រលប់ក្រោយ
                            </button>
                        </div>

                        <div class="row">
                            <!-- Province -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ខេត្ត / រាជធានី <span class="text-danger">*</span></label>
                                <select class="form-select shadow-none"
                                    :class="{ 'is-invalid': cardStore.vv?.province?.$error }"
                                    v-model="cardStore.frm_add.province" @change="onProvinceChange">
                                    <option value="">សូមជ្រើសរើសខេត្ត / រាជធានី</option>
                                    <option v-for="province in cardStore.provinces" :key="province.id"
                                        :value="province.id">
                                        {{ province.local_name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="cardStore.vv?.province?.$error">
                                    {{ cardStore.vv.province.$errors[0].$message }}
                                </div>
                            </div>

                            <!-- District -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ក្រុង / ស្រុក / ខណ្ឌ <span
                                        class="text-danger">*</span></label>
                                <select class="form-select shadow-none"
                                    :class="{ 'is-invalid': cardStore.vv?.district?.$error }"
                                    v-model="cardStore.frm_add.district" @change="onDistrictChange"
                                    :disabled="!cardStore.districts.length">
                                    <option value="">សូមជ្រើសរើសក្រុង / ស្រុក / ខណ្ឌ</option>
                                    <option v-for="district in cardStore.districts" :key="district.id"
                                        :value="district.id">
                                        {{ district.local_name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="cardStore.vv?.district?.$error">
                                    {{ cardStore.vv.district.$errors[0].$message }}
                                </div>
                            </div>

                            <!-- Commune -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ឃុំ / សង្កាត់ <span class="text-danger">*</span></label>
                                <select class="form-select shadow-none"
                                    :class="{ 'is-invalid': cardStore.vv?.commune?.$error }"
                                    v-model="cardStore.frm_add.commune" @change="onCommuneChange"
                                    :disabled="!cardStore.communes.length">
                                    <option value="">សូមជ្រើសរើសឃុំ / សង្កាត់</option>
                                    <option v-for="commune in cardStore.communes" :key="commune.id" :value="commune.id">
                                        {{ commune.local_name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="cardStore.vv?.commune?.$error">
                                    {{ cardStore.vv.commune.$errors[0].$message }}
                                </div>
                            </div>

                            <!-- Village -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ភូមិ <span class="text-danger">*</span></label>
                                <select class="form-select shadow-none"
                                    :class="{ 'is-invalid': cardStore.vv?.village?.$error }"
                                    v-model="cardStore.frm_add.village" :disabled="!cardStore.villages.length">
                                    <option value="">សូមជ្រើសរើសភូមិ</option>
                                    <option v-for="village in cardStore.villages" :key="village.id" :value="village.id">
                                        {{ village.local_name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="cardStore.vv?.village?.$error">
                                    {{ cardStore.vv.village.$errors[0].$message }}
                                </div>
                            </div>

                            <!-- Name -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ឈ្មោះអ្នកទទួល <span class="text-danger">*</span></label>
                                <input type="text" class="form-control shadow-none"
                                    :class="{ 'is-invalid': cardStore.vv?.name?.$error }"
                                    v-model="cardStore.frm_add.name">
                                <div class="invalid-feedback" v-if="cardStore.vv?.name?.$error">
                                    {{ cardStore.vv.name.$errors[0].$message }}
                                </div>
                            </div>

                            <!-- Phone -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">លេខទូរស័ព្ទ <span class="text-danger">*</span></label>
                                <input type="text" class="form-control shadow-none"
                                    :class="{ 'is-invalid': cardStore.vv?.phone?.$error }"
                                    v-model="cardStore.frm_add.phone">
                                <div class="invalid-feedback" v-if="cardStore.vv?.phone?.$error">
                                    {{ cardStore.vv.phone.$errors[0].$message }}
                                </div>
                            </div>

                            <!-- House Number -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ផ្ទះលេខ</label>
                                <input type="text" class="form-control shadow-none"
                                    v-model="cardStore.frm_add.houseNumber">
                            </div>

                            <!-- Street Number -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">ផ្លូវលេខ</label>
                                <input type="text" class="form-control shadow-none"
                                    v-model="cardStore.frm_add.streetNumber">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="modal-footer border-top" v-if="showForm">
                    <button class="btn btn-outline-secondary" @click="showForm = false" type="button">
                        បោះបង់
                    </button>
                    <button class="btn btn-success" type="button" @click="onSaveAddress()">
                        <i class="fa-solid fa-circle-check me-2"></i>
                        {{ editingAddressId ? 'កែប្រែ' : 'រួចរាល់' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useCardStore } from '@/stores/card_store';
import { useToastStore } from '@/stores/toast_store';

import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

const toastStore = useToastStore();
const cardStore = useCardStore();

const showForm = ref(false);
const editingAddressId = ref(null);

const rules = computed(() => ({
    province: {
        required: helpers.withMessage(() => 'សូមជ្រើសរើសខេត្ត', required)
    },
    district: {
        required: helpers.withMessage(() => 'សូមជ្រើសរើសស្រុក', required)
    },
    commune: {
        required: helpers.withMessage(() => 'សូមជ្រើសរើសឃុំ', required)
    },
    village: {
        required: helpers.withMessage(() => 'សូមជ្រើសរើសភូមិ', required)
    },
    name: {
        required: helpers.withMessage(() => "សូមបញ្ចូលឈ្មោះអ្នកទទួល", required)
    },
    phone: {
        required: helpers.withMessage(() => "សូមបញ្ចូលលេខទូរស័ព្ទ", required)
    },
}));

const v$ = useVuelidate(rules, computed(() => cardStore.frm_add));
cardStore.vv = v$;

onMounted(() => {
    cardStore.mdl_address = Modal.getOrCreateInstance(document.getElementById('mdl-address'));
    cardStore.onLoadProvince();

    // Reset to list view when modal is hidden
    document.getElementById('mdl-address').addEventListener('hidden.bs.modal', () => {
        showForm.value = false;
        editingAddressId.value = null;
    });
});

const openAddressForm = (addressId = null) => {
    showForm.value = true;
    editingAddressId.value = addressId;

    if (addressId) {
        cardStore.loadAddressForEdit(addressId);
    } else {
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
        cardStore.districts = [];
        cardStore.communes = [];
        cardStore.villages = [];
    }

    if (cardStore.vv) {
        cardStore.vv.$reset();
    }
};

const selectAddress = (addressId) => {
    cardStore.selectAddress(addressId);
    toastStore.showToast("បានជ្រើសរើសអាសយដ្ឋាន");
};

const deleteAddress = async (addressId) => {
    if (confirm('តើអ្នកពិតជាចង់លុបអាសយដ្ឋាននេះមែនទេ?')) {
        try {
            await axios.delete(`/api/address/${addressId}`, {
                headers: { Authorization: `Bearer ${cardStore.token}` }
            });
            await cardStore.onLoadAddress();
            toastStore.showToast("លុបជោគជ័យ");
        } catch (error) {
            console.error('Delete failed:', error);
            toastStore.showToast("លុបបរាជ័យ");
        }
    }
};

const onProvinceChange = () => {
    cardStore.frm_add.district = '';
    cardStore.frm_add.commune = '';
    cardStore.frm_add.village = '';
    cardStore.districts = [];
    cardStore.communes = [];
    cardStore.villages = [];

    if (cardStore.frm_add.province) {
        cardStore.onLoadDistrict(cardStore.frm_add.province);
    }
};

const onDistrictChange = () => {
    cardStore.frm_add.commune = '';
    cardStore.frm_add.village = '';
    cardStore.communes = [];
    cardStore.villages = [];

    if (cardStore.frm_add.district) {
        cardStore.onLoadCommune(cardStore.frm_add.district);
    }
};

const onCommuneChange = () => {
    cardStore.frm_add.village = '';
    cardStore.villages = [];

    if (cardStore.frm_add.commune) {
        cardStore.onLoadVillage(cardStore.frm_add.commune);
    }
};

const onSaveAddress = async () => {
    await cardStore.vv.$validate();
    if (cardStore.vv.$error) {
        console.log('Validation errors:', cardStore.vv.$errors);
        return;
    }

    try {
        await cardStore.onSaveAddress();
        toastStore.showToast("រក្សាទុកជោគជ័យ");
        showForm.value = false;
        editingAddressId.value = null;
    } catch (error) {
        console.error("Save failed:", error);
        toastStore.showToast("បរាជ័យ");
    }
};
</script>

<style scoped>
.address-card {
    transition: all 0.2s ease;
}

.address-card:hover {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.address-card.border-success {
    border-width: 2px !important;
}

.form-check-input:checked {
    background-color: #198754;
    border-color: #198754;
}

.icon-address-mdl {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>