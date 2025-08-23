<template>
    <div class="content-view-container">
        <div class="tab-header mb-5">
            <h4 class="fw-semibold">ការកំណត់គណនី</h4>
        </div>
        <div class="tab-body">
            <div class="profile-section">
                <div class="profile-info">
                    <div class="avatar-section">
                        <img :src="infoProfileStore.avatarUrl" :key="infoProfileStore.avatarUrl" alt="Profile"
                            class="avatar-img">
                        <button @click="toggleThumbnailOptions" class="edit-avatar-btn">
                            <i class="fas fa-edit"></i>
                        </button>

                        <div v-if="showThumbnailOptions" class="avatar-options" @click.stop>
                            <button @click="handleUpload" class="option-btn upload-btn">
                                <i class="fas fa-upload"></i> ផ្ទុកឡើង
                            </button>
                            <button @click="handleRemove" class="option-btn remove-btn">
                                <i class="fas fa-trash"></i> លុបចោល
                            </button>
                        </div>
                    </div>
                    <div class="user-details">
                        <h3>{{ infoProfileStore.frm.name }}</h3>
                        <p>{{ infoProfileStore.frm.email }}</p>
                    </div>
                </div>

                <div class="seller-section">
                    <button class="btn-seller">
                        <i class="fas fa-store"></i>ចុះឈ្មោះជាអ្នកលក់
                    </button>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <label>ឈ្មោះ</label>
                    <div class="info-value">{{ infoProfileStore.frm.name }}</div>
                </div>

                <div class="info-item">
                    <label>ភេទ</label>
                    <div class="info-value">{{ infoProfileStore.frm.gender || 'មិនទាន់ជ្រើស' }}</div>
                </div>

                <div class="info-item">
                    <label>អ៊ីមែល</label>
                    <div class="info-value">{{ infoProfileStore.frm.email }}</div>
                </div>

                <div class="info-item">
                    <label>ប្រភេទគណនី</label>
                    <div class="info-value">{{infoProfileStore.frm.roles.map(role => role.name).join(', ')}}
                    </div>
                </div>

                <div class="info-item">
                    <label>លេខទូរស័ព្ទ</label>
                    <div class="info-value">{{ infoProfileStore.frm.phone }}</div>
                </div>

                <div class="info-item full-width">
                    <label>ជីវប្រវត្តិ</label>
                    <p class="info-value">{{ infoProfileStore.frm.history }}</p>
                </div>
            </div>

            <div class="action-section">
                <!-- Fixed: Call the correct method -->
                <button @click="showEditModal" class="btn-edit">
                    <i class="fas fa-edit"></i>កែប្រែព័ត៌មាន
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import { useInfoProfile } from '@/stores/views/profile_store'

const emit = defineEmits(['open-cropper'])

const infoProfileStore = useInfoProfile()
const showThumbnailOptions = ref(false)

// Fixed: This should be a function, not a variable assignment
const showEditModal = () => {
    infoProfileStore.mdl_edit_confirm.show()
}

const toggleThumbnailOptions = () => {
    showThumbnailOptions.value = !showThumbnailOptions.value
}

const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                emit('open-cropper', reader.result)
                showThumbnailOptions.value = false
            }
            reader.readAsDataURL(file)
        }
    }
    input.click()
}

const handleRemove = async () => {
    try {
        await infoProfileStore.onRemoveAvatar()
        console.log('Success remove avatar')
    } catch (err) {
        console.error('Remove fail', err)
    }
}

const closeDropdown = (e) => {
    if (!e.target.closest('.avatar-section')) {
        showThumbnailOptions.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.profile-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.profile-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.avatar-section {
    position: relative;
}

.avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e5e7eb;
}

.edit-avatar-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #32CA83;
    color: white;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.avatar-options {
    position: absolute;
    width: 200px;
    top: 100%;
    left: 50px;
    margin-top: 0.5rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.5rem;
    z-index: 10;
}

.option-btn {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 0.25rem;
}

.upload-btn:hover {
    background: #dbeafe;
    color: #32CA83;
}

.remove-btn:hover {
    background: #fef2f2;
    color: #dc2626;
}

.user-details h3 {
    margin: 0 0 0.25rem 0;
    font-weight: bold;
    color: #374151;
}

.user-details p {
    margin: 0;
    color: #6b7280;
}

.btn-seller {
    background: #32CA83;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.btn-seller:hover {
    background: #11b066;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.info-item.full-width {
    grid-column: 1 / -1;
}

.info-item label {
    display: block;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
}

.info-value {
    font-weight: 600;
    color: #374151;
}

.action-section {
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

.btn-edit {
    background: #32CA83;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.btn-edit:hover {
    background: #11b066;
}

@media (max-width: 768px) {
    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>