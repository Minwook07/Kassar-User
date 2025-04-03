<template>
    <div class="modal fade" id="mdl-delete-all" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="py-4 modal-content d-flex justify-content-between align-items-center">
                <div class="text-center">
                    <span class="fw-bold fs-5" id="exampleModalLabel">លុបទំនិញទាំងអស់</span>
                    <p>សូមអាន និងឆ្លើយតបសារបញ្ជាក់</p>
                </div>
                <div class="w-75 mt-3">
                    <div class="text-center fw-medium">
                        <span class="text-danger">គ្រោះថ្នាក់</span> ​តើអ្នកប្រាកដក្នុងការលុបទំនិញទាំងអស់នេះឬ​ ?
                        <p>បន្ទាប់ពីលុប ទិន្នន័យទាំងអស់នេះនឹងបាត់បង់!</p>
                    </div>
                </div>
                <div class="pt-4">
                    <button class="btn btn-outline-danger me-3" type="button" data-bs-dismiss="modal">
                        <i class="bi bi-x-circle"></i> បោះបង់
                    </button>
                    <button class="btn btn-danger" type="button" @click="onDeleteAllCart()"><i class="bi bi-check-circle"></i> អូខ, យល់ព្រម</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import { useCardStore } from '@/stores/card_store';

const cartStore = useCardStore()

onMounted(() => {
    cartStore.mdl_delete_all = Modal.getOrCreateInstance(document.getElementById('mdl-delete-all'))
})

const onDeleteAllCart = () => {

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    axios.delete(`/api/cart-clear`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            cartStore.onLoadCart()
            cartStore.mdl_delete_all.hide()
            cartStore.selected_id = 0
        })
}

</script>
