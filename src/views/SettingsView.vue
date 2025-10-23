<template>
    <div class="container-fluid py-4 bg-light min-vh-100">
        <div class="row g-4 max-w-7xl mx-auto">
            <div class="col-lg-3 col-md-4">
                <SidebarProfile />

                <div class="card shadow-sm border-0 overflow-hidden">
                    <div class="card-header bg-white border-0 p-3">
                        <h6 class="fw-bold text-primary mb-0">
                            <i class="fas fa-cog me-2"></i>ការកំណត់
                        </h6>
                    </div>
                    <div class="card-body p-0">
                        <div class="list-group list-group-flush">
                            <button v-for="tab in tabs" :key="tab.id" @click="handleTabClick(tab.id)" :class="[
                                'list-group-item',
                                'list-group-item-action',
                                'border-0',
                                'd-flex',
                                'align-items-center',
                                'py-3',
                                'px-4',
                                'modern-tab-item',
                                { 'active': activeTab === tab.id }
                            ]">
                                <div class="tab-icon me-3">
                                    <i :class="[tab.icon, 'tab-icon-inner']"></i>
                                </div>
                                <span class="fw-medium flex-grow-1 text-start">{{ tab.name }}</span>
                                <i class="fas fa-chevron-right small text-muted tab-arrow"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-9 col-md-8">
                <!-- Account Tab -->
                <div v-if="activeTab === 'account'" class="card card-tab shadow-sm border-0">
                    <AccountTab @open-cropper="handleOpenCropper" />
                </div>

                <!-- History Tab -->
                <div v-if="activeTab === 'history'" class="card card-tab shadow-sm border-0">
                    <HistoryTab />
                </div>

                <!-- Account Login Tab -->
                <div v-if="activeTab === 'accountlogin'" class="card card-tab shadow-sm border-0">
                    <AccountLoginTab />
                </div>

                <!-- Delivery Tab -->
                <div v-if="activeTab === 'delivery'" class="card card-tab shadow-sm border-0">
                    <DeliveryTab />
                </div>

                <!-- Delete Account Tab -->
                <div v-if="activeTab === 'deleteacc'" class="card card-tab shadow-sm border-0">
                    <DeleteAccountTab />
                </div>
            </div>
        </div>

        <ImageCropper :is-visible="showCropper" :image-src="cropperImageSrc" @close="handleCloseCropper"
            @save="handleSaveCroppedImage" />
        <EditProfileModal />
        <DeleteAccountModal />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SidebarProfile from '@/components/views/profilesetting/profileside/SidebarProfile.vue'
import AccountTab from '@/components/views/profilesetting/tabside/AccountTab.vue'
import AccountLoginTab from '@/components/views/profilesetting/tabside/AccountLoginTab.vue'
import ImageCropper from '@/components/views/profilesetting/modal/ImageCropper.vue'
import HistoryTab from '@/components/views/profilesetting/tabside/HistoryTab.vue'
import DeliveryTab from '@/components/views/profilesetting/tabside/DeliveryTab.vue'
import DeleteAccountTab from '@/components/views/profilesetting/tabside/DeleteAccountTab.vue'
import EditProfileModal from '@/components/views/profilesetting/modal/EditProfileModal.vue'
import DeleteAccountModal from '@/components/views/profilesetting/modal/DeleteAccountModal.vue'

const route = useRoute()

const activeTab = ref('account')

onMounted(() => {
    if (route.query.tab) {
        activeTab.value = route.query.tab
        sessionStorage.setItem('profileActiveTab', route.query.tab)
    } else if (route.path === '/profile') {
        // Only load saved tab if navigating within the profile page (refresh)
        const isPageRefresh = performance.getEntriesByType('navigation')[0]?.type === 'reload'

        if (isPageRefresh) {
            const savedTab = sessionStorage.getItem('profileActiveTab')
            if (savedTab) {
                activeTab.value = savedTab
            }
        } else {
            activeTab.value = 'account'
            sessionStorage.setItem('profileActiveTab', 'account')
        }
    } else {
        sessionStorage.removeItem('profileActiveTab')
    }
})

onUnmounted(() => {
    if (route.path !== '/profile') {
        sessionStorage.removeItem('profileActiveTab')
    }
})

// Navigation tabs
const tabs = ref([
    { id: 'account', name: 'គណនី', icon: 'fas fa-user' },
    { id: 'history', name: 'ប្រវត្តិការបញ្ជាទិញ', icon: 'fas fa-history' },
    { id: 'accountlogin', name: 'វិធីសាស្ត្រចូលប្រើប្រាស់គណនី', icon: 'fas fa-shield-alt' },
    { id: 'delivery', name: 'ការដឹកជញ្ជូន', icon: 'fas fa-truck' },
    { id: 'deleteacc', name: 'លុបគណនី', icon: 'fas fa-trash' },
    { id: 'logout', name: 'ចាកចេញពីគណនី', icon: 'fas fa-sign-out-alt' }
])

// Handle tab clicks
const handleTabClick = (tabId) => {
    if (tabId === 'logout') {
        if (confirm('Are you sure you want to logout?')) {
            alert('Logging out...')
        }
        return
    }
    activeTab.value = tabId
    sessionStorage.setItem('profileActiveTab', tabId)
}

const showCropper = ref(false)
const cropperImageSrc = ref('')

const handleOpenCropper = (imageSrc) => {
    cropperImageSrc.value = imageSrc
    showCropper.value = true
}

const handleCloseCropper = () => {
    showCropper.value = false
    cropperImageSrc.value = ''
}

const handleSaveCroppedImage = (croppedImageUrl) => {
    // Emit event to AccountTab or handle the cropped image
    // You can emit this to parent or use a store/event bus
    console.log('[v0] Cropped image saved:', croppedImageUrl)
    showCropper.value = false
    cropperImageSrc.value = ''
}
</script>

<style scoped>
.modern-tab-item {
    position: relative;
    transition: all 0.3s ease;
    border-left: 3px solid transparent !important;
}

.modern-tab-item:hover {
    background-color: rgba(8, 145, 178, 0.05) !important;
    border-left-color: #32CA83 !important;
    transform: translateX(2px);
}

.modern-tab-item.active {
    background-color: rgba(8, 145, 178, 0.1) !important;
    border-left-color: #32CA83 !important;
    color: #32CA83 !important;
}

.modern-tab-item.active .tab-icon-inner {
    color: #32CA83 !important;
}

.modern-tab-item:hover .tab-icon-inner {
    color: #32CA83 !important;
}

.modern-tab-item.active .tab-arrow {
    color: #32CA83 !important;
}

.tab-icon {
    width: 40px;
    height: 40px;
    background-color: rgba(8, 145, 178, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.modern-tab-item:hover .tab-icon {
    background-color: rgba(8, 145, 178, 0.2);
    transform: scale(1.1);
}

.modern-tab-item.active .tab-icon {
    background-color: #32CA83;
}

.modern-tab-item.active .tab-icon .tab-icon-inner {
    color: white !important;
}

.card-tab {
    transition: all 0.3s ease;
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.bg-gradient-to-r {
    background: linear-gradient(to right, rgba(8, 145, 178, 0.05), rgba(236, 72, 153, 0.05));
}

.text-destructive {
    color: var(--destructive) !important;
}

.bg-destructive\/5 {
    background-color: rgba(190, 18, 60, 0.05) !important;
}

.bg-destructive\/10 {
    background-color: rgba(190, 18, 60, 0.1) !important;
}

.min-vh-100 {
    min-height: 100vh;
}

.max-w-7xl {
    max-width: 80rem;
}
</style>