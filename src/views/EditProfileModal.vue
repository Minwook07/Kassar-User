<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Profile</h5>
                <button type="button" class="btn-close" @click="showEditModal = false"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="saveProfile">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-control" v-model="editForm.name">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Gender</label>
                            <select class="form-select" v-model="editForm.gender">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" v-model="editForm.email">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Phone Number</label>
                            <input type="tel" class="form-control" v-model="editForm.phonenumber">
                        </div>
                        <div class="col-12">
                            <label class="form-label">History</label>
                            <textarea class="form-control" rows="3" v-model="editForm.history"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showEditModal = false">Cancel</button>
                <button type="button" class="btn btn-primary" @click="saveProfile">Save Changes</button>
            </div>
        </div>
    </div>
</template>