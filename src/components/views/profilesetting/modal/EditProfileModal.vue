<!-- components/EditProfileModal.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);" v-if="show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Profile</h5>
                    <button type="button" class="btn-close" @click="onClose"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Full Name</label>
                        <input v-model="form.name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Gender</label>
                        <select v-model="form.gender" class="form-select">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Phone Number</label>
                        <input v-model="form.phone" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">About</label>
                        <textarea v-model="form.history" class="form-control" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="onClose">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onSave">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['show', 'user']);
const emit = defineEmits(['close', 'save']);

const form = ref({ ...props.user });

const onSave = () => {
    emit('save', { ...form.value });
};

const onClose = () => {
    emit('close');
};
</script>