<template>
  <!-- Profile Menu Tabs -->
  <div class="profile">
         <div class="profile-img">
           <img src="/src/assets/images/imgprofile.png" alt="Profile Image" />
         </div>
         <div class="profile-info">
           <h1 class="fw-bold">សុខ កញ្ញា</h1>
         </div>
         <div class="profile-social mt-4">
           <a href="#"><i class="bi bi-facebook"></i></a>
           <a href="#"><i class="bi bi-tiktok"></i></a>
           <a href="#"><i class="bi bi-instagram"></i></a>
           <a href="#"><i class="bi bi-telegram"></i></a>
         </div>
       </div>
       <div class="profile-tabs mt-3  ">
         <ul class="nav nav-tabs flex-column">
           <li class="nav-item">
             <button class="nav-link" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">
               <i class="bi bi-gear me-2"></i> គណនី
             </button>
           </li>
           <li class="nav-item">
             <button class="nav-link" :class="{ active: activeTab === 'login-method' }" @click="activeTab = 'login-method'">
               <i class="bi bi-key me-2"></i> វិធីសាស្រ្តចូលគណី
             </button>
           </li>
           <li class="nav-item">
             <button class="nav-link" :class="{ active: activeTab === 'usage-history' }" @click="activeTab = 'usage-history'">
               <i class="bi bi-arrow-repeat me-2"></i> ប្រវត្តិប្រើប្រាស់
             </button>
           </li>
           <li class="nav-item">
             <button class="nav-link" :class="{ active: activeTab === 'delivery' }" @click="activeTab = 'delivery'">
               <i class="bi bi-geo-alt-fill me-2"></i> រៀបចំដឹកជញ្ជូន
             </button>
           </li>
           <li class="nav-item">
             <button class="nav-link" :class="{ active: activeTab === 'edit-info' }" @click="activeTab = 'edit-info'">
               <i class="bi bi-pencil-square me-2"></i> កែប្រែព័ត៌មាន
             </button>
           </li>
           <li class="nav-item">
             <button class="nav-link text-danger" :class="{ active: activeTab === 'delete-account' }"
               @click="activeTab = 'delete-account'">
               <i class="bi bi-trash3 me-2"></i> លុបគណី
             </button>
           </li>
         </ul>
       </div>
</template>

<script setup>
</script>

<style scoped>
/* Info Display */
.info-display {
    padding: 25px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.profile-tabs{
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    
}
.info-display .form-label {
    font-size: 1rem;
    color: #333;
}

.info-display .form-control {
    border: 1px solid #ddd;
    background-color: #f6f7f9;
    border-radius: 8px;
    height: 45px;
    transition: border-color 0.3s ease;
}

.info-display .form-control:focus {
    border-color: #32ca83;
    box-shadow: none;
}

.info-display .btn-edit {
    background-color: #32ca83;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 25px;
    font-size: 1rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
}

.info-display .btn-edit:hover {
    background-color: #28a86b;
    transform: scale(1.05);
}

.pagination li.active a {
    background-color: var(--bs-primary);
    color: #fff;
    border-color: var(--bs-primary);
}
.profile-tabs .nav-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  background: #f8f9fa;
  color: #333;
  transition: background 0.3s ease-in-out;
}

.profile-tabs .nav-link:hover {
  background: #e5e7e9;
}
</style>