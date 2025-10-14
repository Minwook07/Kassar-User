<template>
    <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);"
        v-if="infoProfileStore.mdl_edit">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">កែប្រែព័ត៌មាន</h5>
                    <button type="button" class="btn-close" @click="hideModal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">ឈ្មោះពេញ</label>
                        <input v-model="formData.name" class="form-control" placeholder="បញ្ចូលឈ្មោះ" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">ភេទ</label>
                        <select v-model="formData.gender" class="form-select">
                            <option value="Unknown">មិនទាន់ជ្រើស</option>
                            <option value="Male">ប្រុស</option>
                            <option value="Female">ស្រី</option>
                        </select>

                    </div>
                    <div class="mb-3">
                        <label class="form-label">លេខទូរស័ព្ទ</label>
                        <input v-model="formData.phone" class="form-control" placeholder="បញ្ចូលលេខទូរស័ព្ទ" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">ជីវប្រវត្តិ</label>
                        <textarea v-model="formData.history" class="form-control" rows="3"
                            placeholder="សរសេរអំពីខ្លួនអ្នក"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal">បោះបង់</button>
                    <button type="button" class="btn btn-primary" @click="onSave" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                        រក្សាទុក
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useInfoProfile } from '@/stores/views/profile_store';
import { useToastStore } from '@/stores/toast_store';

const isLoading = ref(false);
const infoProfileStore = useInfoProfile();
const toastStore = useToastStore();

const formData = reactive({
    get name() { return this._name !== undefined ? this._name : (infoProfileStore.frm.name || ''); },
    set name(value) { this._name = value; },
    get gender() { return this._gender !== undefined ? this._gender : (infoProfileStore.frm.gender || 'Unknown'); },
    set gender(value) { this._gender = value; },
    get phone() { return this._phone !== undefined ? this._phone : (infoProfileStore.frm.phone || ''); },
    set phone(value) { this._phone = value; },
    get history() { return this._history !== undefined ? this._history : (infoProfileStore.frm.history || ''); },
    set history(value) { this._history = value; },
    _name: undefined,
    _gender: undefined,
    _phone: undefined,
    _history: undefined
});

const hideModal = () => {
    infoProfileStore.mdl_edit_confirm.hide();
    // Reset internal form values when hiding
    formData._name = undefined;
    formData._gender = undefined;
    formData._phone = undefined;
    formData._history = undefined;
};

const onSave = async () => {
    // Basic validation
    if (!formData.name.trim()) {
        alert('សូមបញ្ចូលឈ្មោះ');
        return;
    }

    isLoading.value = true;

    try {
        // Call the store action to update profile
        await infoProfileStore.onUpdateProfile({
            name: formData.name.trim(),
            gender: formData.gender,
            phone: formData.phone.trim(),
            history: formData.history.trim()
        });

        toastStore.showToast('បានកែប្រែព័ត៌មានដោយជោគជ័យ');

        hideModal();

    } catch (error) {

        if (error.response?.status === 422 && error.response.data?.data) {
            const validationErrors = error.response.data.data;

            if (validationErrors.phone) {
                toastStore.showToast('លេខទូរស័ព្ទនេះមានអ្នកប្រើរួចហើយ');
                return;
            }
            if (validationErrors.name) {
                toastStore.showToast('ឈ្មោះមិនត្រឹមត្រូវ');
                return;
            }
            if (validationErrors.gender) {
                toastStore.showToast('ភេទមិនត្រឹមត្រូវ');
                return;
            }
            if (validationErrors.history) {
                toastStore.showToast('ជីវប្រវត្តិមិនត្រឹមត្រូវ');
                return;
            }
        }

        const msg = error.response?.data?.message || 'មានកំហុសក្នុងការកែប្រែព័ត៌មាន សូមព្យាយាមម្តងទៀត';
        toastStore.showToast(`កំហុស: ${msg}`);
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.modal {
    z-index: 1050;
}

.modal-dialog {
    max-width: 500px;
}

.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}

.form-label {
    font-weight: 600;
    color: #374151;
}

.form-control,
.form-select {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.75rem;
}

.form-control:focus,
.form-select:focus {
    border-color: #32CA83;
    box-shadow: 0 0 0 0.2rem rgba(50, 202, 131, 0.25);
}

.btn-primary {
    background-color: #32CA83;
    border-color: #32CA83;
}

.btn-primary:hover {
    background-color: #11b066;
    border-color: #11b066;
}

.btn-primary:disabled {
    background-color: #6b7280;
    border-color: #6b7280;
}
</style>