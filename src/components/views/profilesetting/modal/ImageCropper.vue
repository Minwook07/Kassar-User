<template>
    <!-- Full screen modal overlay -->
    <div v-if="isVisible" class="cropper-modal-overlay" @click.self="handleCancel">
        <div class="cropper-modal-container">
            <div class="cropper-modal-header">
                <h5 class="modal-title">
                    <i class="fas fa-crop-alt me-2"></i>កាត់រូបភាព
                </h5>
                <button type="button" class="btn-close-custom" @click="handleCancel">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="cropper-modal-body">
                <div class="cropper-container">
                    <Cropper ref="cropperRef" :src="imageSrc" :stencil-props="{
                        aspectRatio: 1,
                        movable: true,
                        resizable: true
                    }" :canvas="{
                        maxWidth: 400,
                        maxHeight: 400
                    }" class="cropper-instance" />
                </div>
            </div>

            <div class="cropper-modal-footer">
                <button type="button" class="btn btn-secondary me-2" @click="handleCancel">
                    <i class="fas fa-times me-2"></i>បោះបង់
                </button>
                <button type="button" class="btn btn-primary" @click="handleSave">
                    <i class="fas fa-check me-2"></i>រក្សាទុក
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { useInfoProfile } from '@/stores/views/profile_store'
import { useToastStore } from '@/stores/toast_store'

const infoProfileStore = useInfoProfile()
const toastStore = useToastStore();

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['close', 'save'])

const cropperRef = ref(null)

const handleCancel = () => {
    emit('close')
}

const handleSave = () => {
    if (cropperRef.value) {
        const { canvas } = cropperRef.value.getResult()
        if (canvas) {
            canvas.toBlob(async (blob) => {
                try {
                    const data = await infoProfileStore.onUpdateAvatar(blob)
                    toastStore.showToast('បានកែប្រែរូបភាពដោយជោគជ័យ', 'success');
                    emit('save', data)
                } catch (err) {
                    toastStore.showToast('បរាជ័យក្នុងការផ្ទុករូបភាព', 'error');
                }
            }, 'image/jpeg', 0.8)
        }
    }
}

</script>

<style scoped>
.cropper-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}

.cropper-modal-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.cropper-modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #0891b2 0%, #ec4899 100%);
    color: white;
}

.modal-title {
    margin: 0;
    font-weight: 600;
    font-size: 1.125rem;
}

.btn-close-custom {
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.2s;
}

.btn-close-custom:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.cropper-modal-body {
    padding: 24px;
    flex: 1;
    overflow: hidden;
}

.cropper-container {
    height: 400px;
    width: 100%;
}

.cropper-instance {
    height: 100%;
    width: 100%;
}

.cropper-modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    background-color: #f9fafb;
}

.btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
}

.btn-secondary {
    background-color: #6b7280;
    color: white;
}

.btn-secondary:hover {
    background-color: #4b5563;
}

.btn-primary {
    background-color: #0891b2;
    color: white;
}

.btn-primary:hover {
    background-color: #0e7490;
}

@media (max-width: 768px) {
    .cropper-modal-container {
        margin: 10px;
        max-height: 95vh;
    }

    .cropper-container {
        height: 300px;
    }

    .cropper-modal-footer {
        flex-direction: column;
        gap: 10px;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
