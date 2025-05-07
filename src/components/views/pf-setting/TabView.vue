<template>
    <!-- Navigation Menu using Bootstrap Tabs -->
    <div class="user-navlist bg-white rounded-2 border p-0 overflow-hidden">
  <ul class="nav nav-tabs flex-column border-0">
    <li class="nav-item">
      <a class="nav-link active border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#profile">
        <i class="bi bi-person-circle me-2"></i> គណនី
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#usage-history">
        <i class="bi bi-clock-history me-2"></i> ប្រវត្តិការប្រើប្រាស់
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#login-method">
        <i class="bi bi-shield-lock me-2"></i> វិធីសាស្រ្តចូលប្រើប្រាស់គណនី
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#delivery-method">
        <i class="bi bi-truck me-2"></i> រៀបចំដឹកជញ្ជូន
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link border-0 py-3 ps-4 tab-link delete-acc" data-bs-toggle="tab" href="#delete-account">
        <i class="bi bi-trash me-2"></i> លុបគណនី
      </a>
    </li>
    <li class="nav-item">
      <a role="button" style="cursor: pointer;" class="nav-link border-0 py-3 ps-4" @click.prevent="logout">
        <i class="bi bi-box-arrow-right me-2"></i> ចាកចេញពីគណនី
      </a>
    </li>
  </ul>
</div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const logout = async () => {
  try {
    await axios.post('/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (e) {
    // console.warn('Logout error:', e)
  }
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization'];
  router.push('/')
}
</script>

<style scoped>

.modal-backdrop {
opacity: 0 !important;
}
.tab-animation {
opacity: 0;
transform: translateY(15px);
transition: opacity 0.3s ease-out, transform 0.3s ease-out;
will-change: opacity, transform;
cursor: p;
}

.tab-pane.active .tab-animation {
opacity: 1;
transform: translateY(0);
}

/* Staggered animation with fewer redundant declarations */
.tab-pane.active .tab-animation:nth-child(1) { transition-delay: 0.05s; }
.tab-pane.active .tab-animation:nth-child(2) { transition-delay: 0.1s; }
.tab-pane.active .tab-animation:nth-child(3) { transition-delay: 0.15s; }
.tab-pane.active .tab-animation:nth-child(4) { transition-delay: 0.2s; }
.tab-pane.active .tab-animation:nth-child(5) { transition-delay: 0.25s; }
.tab-pane.active .tab-animation:nth-child(6) { transition-delay: 0.3s; }

/* Smooth tab transitions */
.tab-pane {
transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.tab-pane.fade {
opacity: 0;
transform: translateX(8px);
}

.tab-pane.fade.show {
opacity: 1;
transform: translateX(0);
}

/* Tab navigation styling */
.tab-link {
position: relative;
transition: all 0.3s ease;
color: #6c757d;
cursor: pointer!important;
}

.tab-link::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 3px;
background-color: #32CA83;
transition: width 0.3s ease;
}

.tab-link.active {
color: #32CA83 !important;
background-color: rgba(50, 202, 131, 0.1) !important;
}
.delete-acc{
  color: rgb(237, 2, 2)!important;
}
.delete-acc.active {
  color: rgb(237, 2, 2) !important;
  background-color: rgba(237, 2, 2, 0.1) !important; /* Optional: Light red background */
}

.tab-link.active::after {
width: 100%;
}

/* Card and element hover effects */
.hover-effect {
transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-effect:hover {
transform: translateY(-4px);
box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

/* Profile card animations */
.profile-card {
transition: box-shadow 0.3s ease;
}

.profile-card:hover {
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.profile-img-container {
overflow: hidden;
border-radius: 50%;
}

.pf-user {
transition: transform 0.4s ease;
}

.pf-user:hover {
transform: scale(1.05);
}

/* Social links animation */
.social-link {
color: #6c757d;
transition: color 0.2s ease, transform 0.2s ease;
}

.social-link:hover {
color: #32CA83;
transform: translateY(-2px);
}

/* Button styling */
.btn {
transition: all 0.2s ease;
}

.btn-primary {
background-color: #32CA83;
border-color: #32CA83;
}

.btn-primary:hover {
background-color: #28a66c;
border-color: #28a66c;
box-shadow: 0 4px 8px rgba(50, 202, 131, 0.2);
}

/* Form controls */
.form-control {
transition: border-color 0.2s ease, box-shadow 0.2s ease;
box-shadow: none !important;
}

.form-control:focus {
border-color: #32CA83;
box-shadow: 0 0 0 0.2rem rgba(50, 202, 131, 0.15) !important;
}

/* Success overlay animation */
.success-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(255, 255, 255, 0.95);
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
animation: fadeIn 0.3s ease;
}

.success-message {
text-align: center;
animation: scaleIn 0.4s ease;
}

.success-message i {
font-size: 48px;
color: #32CA83;
margin-bottom: 16px;
}

@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

@keyframes scaleIn {
from { transform: scale(0.9); opacity: 0; }
to { transform: scale(1); opacity: 1; }
}

/* Responsive optimizations */
@media (max-width: 768px) {
.tab-animation {
transition-duration: 0.25s;
}

.tab-pane.active .tab-animation {
transition-delay: 0s !important;
}

.tab-pane.active .tab-animation:nth-child(n+2) {
transition-delay: 0.05s !important;
}
}

/* Fix for modal backdrop */
.modal-backdrop.show {
background-color: rgba(0, 0, 0, 0.5) !important;
opacity: 1 !important;
pointer-events: auto !important;
}

/* Clean up redundant styles */
#bio {
resize: none;
}

</style>