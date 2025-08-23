<template>
    <div class="content-view-container">
        <div class="card-header p-0 mb-5 bg-transparent border-0">
            <h4 class="fw-semibold">លុបគណនី</h4>
            <p class="m-0">លុបគណនីរបស់អ្នកជាអចិន្ត្រៃយ៍</p>
        </div>
        <div class="card-body p-0">
            <div class="alert alert-warning border-0 mb-4">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>ការព្រមាន:</strong> ការលុបគណនីនេះមិនអាចត្រឡប់វិញបានទេ។
            </div>

            <h6 class="fw-bold mb-2">ការលុបគណនី</h6>
            <p class="text-muted mb-4">
                នៅពេលដែលអ្នកលុបគណនីរបស់អ្នក, ទិន្នន័យទាំងអស់របស់អ្នក រួមទាំងព័ត៌មានផ្ទាល់ខ្លួន,
                ប្រវត្តិប្រតិបត្តិការ, and saved preferences will be permanently removed from our servers.
                This action is irreversible and cannot be undone.
            </p>

            <button @click="deleteAccount()" class="btn btn-danger">
                <i class="fas fa-trash me-2"></i>លុបគណនីជាអចិន្ត្រៃយ៍
            </button>
        </div>
    </div>
</template>

<script setup>
import { useInfoSetting } from '@/stores/views/setting_store'

const infoSettingStore = useInfoSetting()

const deleteAccount = () => {
    // Fixed: Remove password check since password input will be in the modal
    // Call the show method directly
    infoSettingStore.mdl_delete_confirm.show()
}
</script>