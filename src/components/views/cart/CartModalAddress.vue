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
                        <div class="col-12  mt-4">
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label for="province" class="form-label">ខេត្ត រាជធានី</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>សូមជ្រើសរើសរាជធានី ខេត្ត ដែលអ្នករស់នៅ</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>

                                    </select>
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="province" class="form-label">ក្រុង ស្រុក ខណ្ឌ</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>សូមជ្រើសរើសក្រុង/ស្រុក/ខណ្ឌ ដែលអ្នករស់នៅ</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label for="province" class="form-label">ឃុំ សង្កាត់</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>សូមជ្រើសរើសឃុំ សង្កាត់ ដែលអ្នករស់នៅ</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>

                                    </select>
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="province" class="form-label">ភូមិ</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>សូមជ្រើសរើសភូមិ ដែលអ្នករស់នៅ</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-5 mb-3">
                                    <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                                    <input type="text" class="form-control" id="phone" placeholder="">
                                </div>
                                <div class="col-5 mb-3">
                                    <label for="home-num" class="form-label">ផ្ទះលេខ</label>
                                    <input type="text" class="form-control" id="home-num" placeholder="">
                                </div>
                                <div class="col-2 mb-3">
                                    <label for="steet-num" class="form-label">ផ្លូវលេខ</label>
                                    <input type="text" class="form-control" id="steet-num" placeholder="0000">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-address d-flex align-items-center justify-content-end">
                    <button class="btn btn-outline-danger me-4" data-bs-dismiss="modal" type="button">បោះបង់</button>
                    <button class="btn btn-success" type="button" @click="onSaveAddress()">
                        រួចរាល់
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { Modal } from 'bootstrap';
import { useCardStore } from '@/stores/card_store';

const cardStore = useCardStore()

onMounted(() => {
    cardStore.mdl_address = Modal.getOrCreateInstance(document.getElementById('mdl-address'))
})


const onSaveAddress = () => {
    cardStore.setIsAdress(true)  // use for save data
    cardStore.mdl_address.hide()

}


</script>