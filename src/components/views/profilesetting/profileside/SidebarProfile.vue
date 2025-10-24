<template>
    <div class="profile-sidebar">
        <div class="profile-card">
            <div class="card-body">
                <div class="profile-avatar">
                    <img :src="infoProfileStore.avatarUrl" alt="Profile" class="avatar-image">
                    <div class="status-badge"></div>
                </div>

                <h5 class="profile-name">{{ infoProfileStore.frm.name }}</h5>
                <p class="profile-type">{{ infoProfileStore.frm.history }}</p>

                <div class="social-links">
                    <a href="#" class="social-btn facebook">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" class="social-btn telegram">
                        <i class="fa-solid fa-paper-plane"></i>
                    </a>
                    <a href="#" class="social-btn instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" class="social-btn linkedin">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useInfoProfile } from '@/stores/views/profile_store'
import { onMounted } from 'vue'

const infoProfileStore = useInfoProfile()

onMounted(() => {
    infoProfileStore.onLoadProfile()
})
</script>

<style scoped>
.profile-sidebar {
    margin-bottom: 1.5rem;
}

.profile-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.profile-card:hover {
    transform: translateY(-2px);
}

.card-body {
    padding: 2rem;
    text-align: center;
    position: relative;
}

.card-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(135deg, #32CA83, #ec4899);
    opacity: 0.1;
}

.profile-avatar {
    position: relative;
    width: 90px;
    height: 90px;
    margin: 0 auto 1rem;
}

.avatar-image {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.avatar-image:hover {
    transform: scale(1.05);
}

.status-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #16a34a;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(22, 163, 74, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
    }
}

.profile-name {
    margin: 0 0 0.25rem 0;
    font-weight: bold;
    color: #32CA83;
    position: relative;
}

.profile-type {
    margin: 0 0 1rem 0;
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
}

.social-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: 2px solid;
    transition: all 0.3s ease;
}

.social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.facebook {
    color: #1877f2;
    border-color: #1877f2;
}

.facebook:hover {
    background: #1877f2;
    color: white;
}

.telegram {
    color: #0088cc;
    border-color: #0088cc;
}

.telegram:hover {
    background: #0088cc;
    color: white;
}

.instagram {
    color: #e4405f;
    border-color: #e4405f;
}

.instagram:hover {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
}

.linkedin {
    color: #0077b5;
    border-color: #0077b5;
}

.linkedin:hover {
    background: #0077b5;
    color: white;
}
</style>
