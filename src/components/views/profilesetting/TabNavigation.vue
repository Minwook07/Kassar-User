<template>
    <div class="card shadow-sm">
        <ul class="nav flex-column nav-pills">
            <li class="nav-item" v-for="tab in tabs" :key="tab.key">
                <a href="#" class="nav-link d-flex align-items-center py-3" :class="{ active: activeTab === tab.key }"
                    @click.prevent="$emit('update:activeTab', tab.key)">
                    <i :class="`bi bi-${tab.icon} me-2 fs-5`"></i>
                    <span class="text-capitalize">{{ tab.label }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps(['activeTab']);
const emit = defineEmits(['update:activeTab']);

const tabs = [
    { key: 'account', label: 'Account', icon: 'person' },
    { key: 'history', label: 'History', icon: 'clock-history' },
    { key: 'accountlogin', label: 'Password', icon: 'key' },
    { key: 'delivery', label: 'Delivery', icon: 'truck' },
    { key: 'deleteacc', label: 'Delete Account', icon: 'trash' },
    { key: 'logout', label: 'Logout', icon: 'box-arrow-right' }
];
</script>

<style scoped>
.nav-pills .nav-link.active {
    background-color: #0d6efd;
    color: white;
    border-radius: 8px;
}

.nav-link:hover {
    background-color: #f8f9fa;
}
</style>