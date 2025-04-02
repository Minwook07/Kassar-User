<template>
    <div class="modal fade" id="mdl-delete" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="py-4 modal-content d-flex justify-content-between align-items-center">
                <div class="text-center">
                    <span class="fw-bold fs-5" id="exampleModalLabel">លុបទំនិញ</span>
                    <p>សូមអាន និងឆ្លើយតបសារបញ្ជាក់</p>
                </div>
                <div class="w-75 mt-3">
                    <div class="text-center">
                        តើអ្នកប្រាកដក្នុងការលុបទំនិញ
                        <span class="fw-bolder text-danger"> {{ getSelectedCartProductName() }} </span>?
                        <p>បន្ទាប់ពីលុប ទិន្នន័យនេះនឹងបាត់បង់!</p>
                    </div>
                </div>
                <div class="pt-4">
                    <button class="btn btn-outline-danger me-3" type="button" data-bs-dismiss="modal">
                        <i class="bi bi-x-circle"></i> បោះបង់
                    </button>
                    <button class="btn btn-danger" type="button" @click="onDeleteCart()"><i class="bi bi-check-circle"></i> អូខ, យល់ព្រម</button>
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
    cartStore.mdl_delete = Modal.getOrCreateInstance(document.getElementById('mdl-delete'))
})

const getSelectedCartProductName = () => {
    const selectedCart = cartStore.cartLists.find(cart => cart.id === cartStore.selected_id);
    return selectedCart ? selectedCart.product.name : ''; // Return the name if found
};

const onDeleteCart = () => {

    const token = sessionStorage.getItem("token");

    axios.delete(`/api/cart/${cartStore.selected_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            cartStore.onLoadCart()
            cartStore.mdl_delete.hide()
            cartStore.selected_id = 0
        })
}

</script>
