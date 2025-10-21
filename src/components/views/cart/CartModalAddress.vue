<template>
    <div class="modal fade" id="mdl-address" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content py-5 px-4">
                <div class="d-flex gap-3 align-items-center">
                    <span class="icon-address-mdl fs-1 text-secondary bg-body-secondary text-center rounded-circle">
                        <i class="bi bi-geo-alt-fill"></i>
                    </span>
                    <h5 class="modal-title fw-bold">អាស័យដ្ឋានរបស់អ្នក</h5>
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-12 mt-4">
                            <div class="row">
                                <!-- Province -->
                                <div class="col-6 mb-3">
                                    <label class="form-label">ខេត្ត / រាជធានី</label>
                                    <select class="form-select shadow-none"
                                        :class="{ 'is-invalid': cardStore.vv.province.$error }"
                                        v-model="cardStore.frm_add.province" @change="onProvinceChange">
                                        <option value="">សូមជ្រើសរើសខេត្ត / រាជធានី</option>
                                        <option v-for="province in cardStore.provinces" :key="province.id"
                                            :value="province.id">
                                            {{ province.local_name }}
                                        </option>
                                    </select>
                                    <div class="invalid-feedback" v-if="cardStore.vv.province.$error">
                                        {{ cardStore.vv.province.$errors[0].$message }}
                                        <!-- Please enter gender -->
                                    </div>
                                </div>

                                <!-- District -->
                                <div class="col-6 mb-3">
                                    <label class="form-label">ក្រុង / ស្រុក / ខណ្ឌ</label>
                                    <select class="form-select shadow-none"
                                        :class="{ 'is-invalid': cardStore.vv.district.$error }"
                                        v-model="cardStore.frm_add.district" @change="onDistrictChange"
                                        :disabled="!cardStore.districts.length">
                                        <option value="">សូមជ្រើសរើសក្រុង / ស្រុក / ខណ្ឌ</option>
                                        <option v-for="district in cardStore.districts" :key="district.id"
                                            :value="district.id">
                                            {{ district.local_name }}
                                        </option>
                                    </select>
                                    <div class="invalid-feedback" v-if="cardStore.vv.district.$error">
                                        {{ cardStore.vv.district.$errors[0].$message }}
                                        <!-- Please enter gender -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Commune & Village -->
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label class="form-label">ឃុំ / សង្កាត់</label>
                                    <select class="form-select shadow-none"
                                        :class="{ 'is-invalid': cardStore.vv.commune.$error }"
                                        v-model="cardStore.frm_add.commune" @change="onCommuneChange"
                                        :disabled="!cardStore.communes.length">
                                        <option value="">សូមជ្រើសរើសឃុំ / សង្កាត់</option>
                                        <option v-for="commune in cardStore.communes" :key="commune.id"
                                            :value="commune.id">
                                            {{ commune.local_name }}
                                        </option>
                                    </select>
                                    <div class="invalid-feedback" v-if="cardStore.vv.commune.$error">
                                        {{ cardStore.vv.commune.$errors[0].$message }}
                                        <!-- Please enter gender -->
                                    </div>
                                </div>

                                <div class="col-6 mb-3">
                                    <label class="form-label">ភូមិ</label>
                                    <select class="form-select shadow-none"
                                        :class="{ 'is-invalid': cardStore.vv.village.$error }"
                                        v-model="cardStore.frm_add.village" :disabled="!cardStore.villages.length">
                                        <option value="">សូមជ្រើសរើសភូមិ</option>
                                        <option v-for="village in cardStore.villages" :key="village.id"
                                            :value="village.id">
                                            {{ village.local_name }}
                                        </option>
                                    </select>
                                    <div class="invalid-feedback" v-if="cardStore.vv.village.$error">
                                        {{ cardStore.vv.village.$errors[0].$message }}
                                        <!-- Please enter gender -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Inputs -->
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3 mb-3">
                                    <label class="form-label">ឈ្មោះអ្នកទទួល</label>
                                    <input type="text" class="form-control shadow-none"
                                        :class="{ 'is-invalid': cardStore.vv.name.$error }"
                                        v-model="cardStore.frm_add.name">
                                    <div class="invalid-feedback" v-if="cardStore.vv.name.$error">
                                        {{ cardStore.vv.name.$errors[0].$message }}
                                        <!-- Please enter gender -->
                                    </div>
                                </div>
                                <div class="col-3 mb-3">
                                    <label class="form-label">លេខទូរស័ព្ទ</label>
                                    <input type="text" class="form-control shadow-none"
                                        :class="{ 'is-invalid': cardStore.vv.phone.$error }"
                                        v-model="cardStore.frm_add.phone">
                                    <div class="invalid-feedback" v-if="cardStore.vv.phone.$error">
                                        {{ cardStore.vv.phone.$errors[0].$message }}
                                        <!-- Please enter gender -->
                                    </div>
                                </div>
                                <div class="col-3 mb-3">
                                    <label class="form-label">ផ្ទះលេខ</label>
                                    <input type="text" class="form-control shadow-none"
                                        v-model="cardStore.frm_add.houseNumber">
                                </div>
                                <div class="col-3 mb-3">
                                    <label class="form-label">ផ្លូវលេខ</label>
                                    <input type="text" class="form-control shadow-none"
                                        v-model="cardStore.frm_add.streetNumber">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Buttons -->
                <div class="btn-address d-flex align-items-center justify-content-end">
                    <button class="btn btn-outline-danger me-4" data-bs-dismiss="modal" type="button">បោះបង់</button>
                    <button class="btn btn-success" type="button" @click="onSaveAddress()">
                        រួចរាល់
                    </button>
                </div>
            </div>
        </div>
    </div>
    <ToastView />
</template>

<script setup>
import ToastView from '../toast/ToastView.vue';
import { computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useCardStore } from '@/stores/card_store';
import { useToastStore } from '@/stores/toast_store';
import axios from 'axios';

import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

const toastStore = useToastStore();
const cardStore = useCardStore();
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
}))
cardStore.vv = useVuelidate(rules, cardStore.frm_add)

onMounted(() => {
    cardStore.mdl_address = Modal.getOrCreateInstance(document.getElementById('mdl-address'));
    cardStore.onLoadProvince();
});

// 🏆 When province is selected, load districts
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

// 🏆 When district is selected, load communes
const onDistrictChange = () => {
    cardStore.frm_add.commune = '';
    cardStore.frm_add.village = '';
    cardStore.communes = [];
    cardStore.villages = [];

    if (cardStore.frm_add.district) {
        cardStore.onLoadCommune(cardStore.frm_add.district);
    }
};

// 🏆 When commune is selected, load villages
const onCommuneChange = () => {
    cardStore.frm_add.village = '';
    cardStore.villages = [];

    if (cardStore.frm_add.commune) {
        cardStore.onLoadVillage(cardStore.frm_add.commune);
    }
};

const onSaveAddress = () => {

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    cardStore.vv.$validate();
    if (cardStore.vv.$error) {
        return;
    }

    let frmData = new FormData();
    frmData.append('province_id', cardStore.frm_add.province); // Corrected field name
    frmData.append('district_id', cardStore.frm_add.district); // Corrected field name
    frmData.append('commune_id', cardStore.frm_add.commune); // Corrected field name
    frmData.append('village_id', cardStore.frm_add.village); // Corrected field name
    frmData.append('house_number', cardStore.frm_add.houseNumber);
    frmData.append('street_number', cardStore.frm_add.streetNumber);
    frmData.append('phone', cardStore.frm_add.phone);
    frmData.append('name', cardStore.frm_add.name)

    axios.post('/api/addresses', frmData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {
            cardStore.onLoadAddress();
            toastStore.showToast("រក្សាទុកជោគជ័យ")
            cardStore.mdl_address.hide();
            cardStore.isAddress = "Address saved successfully!";
        })
};

</script>
