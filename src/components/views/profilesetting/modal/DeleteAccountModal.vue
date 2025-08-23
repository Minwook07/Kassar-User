<template>
    <div class="modal fade" id="mdl-delete" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-danger">បញ្ជាក់ការលុបគណនី</h5>
                    <button type="button" class="btn-close" @click="hideModal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <i class="fas fa-exclamation-triangle text-danger fa-3x mb-3"></i>
                        <p class="mb-3">សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្នសម្រាប់បញ្ជាក់ការលុបគណនី.</p>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">បញ្ជាក់ពាក្យសម្ងាត់</label>
                        <div class="input-group">
                            <input :type="infoProfileStore.showDeletePassword ? 'text' : 'password'"
                                class="form-control form-control-lg" v-model="infoProfileStore.del_frm.password"
                                placeholder="បញ្ចូលពាក្យសម្ងាត់ដើម្បីបញ្ជាក់" required>
                            <button type="button" class="btn btn-outline-secondary"
                                @click="infoProfileStore.showDeletePassword = !infoProfileStore.showDeletePassword">
                                <i :class="infoProfileStore.showDeletePassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary" @click="hideModal">បោះបង់</button>
                    <button type="button" class="btn btn-danger" @click="onDelete()">លុបគណនី</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useInfoProfile } from '@/stores/views/profile_store'
import axios from 'axios';
import { Modal } from 'bootstrap';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const infoProfileStore = useInfoProfile()
const router = useRouter()

onMounted(() => {
    infoProfileStore.mdl_delete = Modal.getOrCreateInstance(document.getElementById('mdl-delete'))
})

const hideModal = () => {
    if (infoProfileStore.mdl_delete) {
        infoProfileStore.mdl_delete.hide()
    }
    infoProfileStore.del_frm.password = ''
}

const onDelete = () => {
    if (!infoProfileStore.del_frm.password.trim()) {
        alert('Please enter your password to confirm deletion.')
        return
    }

    axios.post('/api/profile/delete', {
        password: infoProfileStore.del_frm.password
    })
        .then((res) => {
            infoProfileStore.mdl_delete.hide()
            infoProfileStore.del_frm.password = ''
            alert('គណនីលុបបានដោយជោគជ័យ')
            router.push('/')
        })
        .catch((err) => {
            console.error('Delete account error:', err)
            if (err.response?.data?.message) {
                alert(err.response.data.message)
            } else {
                alert('បរាជ័យក្នុងការលុបគណនី! សូមព្យាយាមម្តងទៀត.')
            }
        });
}
</script>