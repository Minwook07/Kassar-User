<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('profile');
const tabs = {
  profile: { icon: 'bi bi-gear', label: 'គណនី' },
  'login-method': { icon: 'bi bi-key', label: 'វិធីសាស្រ្តចូលគណី' },
  'usage-history': { icon: 'bi bi-arrow-repeat', label: 'ប្រវត្តិប្រើប្រាស់' },
  delivery: { icon: 'bi bi-geo-alt-fill', label: 'រៀបចំដឹកជញ្ជូន' },
  'delete-account': { icon: 'bi bi-trash3', label: 'លុបគណី' }
};
const email = ref('');
const password = ref('');
const formData = ref({
  name: '',
  email: '',
  userType: '',
  bio: ''
});

const handleSubmit = () => {
  console.log('Form submitted:', { email: email.value, password: password.value });
};
</script>

<template>
  <div class="container py-5">
    <div class="row g-4">
      <!-- Sidebar Column -->
      <div class="col-md-3">
        <!-- Profile Card -->
        <div class="profile-card">
          <div class="profile-img-container">
            <img src="https://via.placeholder.com/150" alt="Profile Image" class="profile-img" />
          </div>
          <div class="profile-info text-center">
            <h2 class="profile-name">សុខ កញ្ញា</h2>
            <div class="profile-social">
              <a href="#" class="social-link"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-link"><i class="bi bi-tiktok"></i></a>
              <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-link"><i class="bi bi-telegram"></i></a>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="nav-menu">
          <button 
            v-for="(tab, key) in tabs" 
            :key="key"
            class="nav-item"
            :class="{ active: activeTab === key }"
            @click="activeTab = key"
          >
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-md-9">
        <div class="content-card">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="fade-enter">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h1 class="content-title mb-0">គណនី</h1>
              <button class="btn-save">
                <i class="bi bi-check2-circle me-2"></i>រក្សាទុក
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="profile-form">
              <div class="form-group">
                <label>ឈ្មោះ</label>
                <input type="text" v-model="formData.name" class="form-control" placeholder="សុខ សុភា" />
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>អាសយដ្ឋានអ៊ីមែល</label>
                    <input type="email" v-model="formData.email" class="form-control" placeholder="Bora@rt1@gmail.com" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>ប្រភេទអ្នកប្រើប្រាស់</label>
                    <input type="text" v-model="formData.userType" class="form-control" placeholder="ធម្មតា" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>ជីវប្រវត្តិ</label>
                <textarea v-model="formData.bio" class="form-control" rows="4" placeholder="ស្ត្រីមេផ្ទះ"></textarea>
              </div>
            </form>
          </div>

          <!-- Order History Tab -->
          <div v-if="activeTab === 'usage-history'" class="fade-enter">
            <h3 class="content-title">ប្រវត្តិការបញ្ជាទិញ</h3>
            <div class="orders-list">
              <div v-for="n in 4" :key="n" class="order-item">
                <div class="order-img">
                  <img src="https://via.placeholder.com/90" alt="Order" />
                </div>
                <div class="order-details">
                  <h4>ត្រកួនកន្ទុយក្រពើ ចុងMONYវិមាន</h4>
                  <p class="quantity">ចំនួន 1គីឡូក្រាម</p>
                  <p class="price">តម្លៃ ១០០០០ រៀល</p>
                </div>
                <div class="order-status">
                  <span class="status-badge">Pending</span>
                  <span class="order-date">2023-01-15 17:30:33</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Login Method Tab -->
          <div v-if="activeTab === 'login-method'" class="fade-enter">
            <div class="auth-card">
              <h4 class="auth-title">វិធីសាស្រ្តចូលប្រើប្រាស់គណនី</h4>
              <p class="auth-subtitle">លោកអ្នកបានចូលគណនីដោយអនុវត្តន៍តាមជំហានដូចខាងក្រោម</p>

              <form @submit.prevent="handleSubmit" class="auth-form">
                <div class="form-group">
                  <label>អាស័យដ្ផានអ៊ីម៊ែល</label>
                  <div class="input-group">
                    <input type="email" v-model="email" class="form-control" placeholder="Bora@rt1@gmail.com">
                    <button type="button" class="btn-verify">
                      <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                    </button>
                  </div>
                </div>

                <div class="form-group">
                  <label>ពាក្យសម្ងាត់</label>
                  <div class="input-group d-flex  ">
                    <input type="password" v-model="password" class="form-control" placeholder="••••••••">
                    <button type="button" class="btn-verify">
                      <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                    </button>
                  </div>
                </div>

                <div class="info-box">
                  <h6>ចាប់ផ្តើមការផ្ទៀងផ្ទាត់ពីរជាន់សម្រាប់គណនី</h6>
                  <p>ដើម្បីបង្កើនការការពារគណនីរបស់អ្នកការផ្ទៀងផ្ទាត់ពីរជាន់នឹងត្រូវបានអនុវត្តនៅពេលចូលប្រើប្រាស់។</p>
                  <button type="button" class="btn-apply">
                    <i class="bi bi-search me-2"></i>អានបន្ថែម
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Delete Account Tab -->
          <div v-if="activeTab === 'delete-account'" class="fade-enter">
            <div class="delete-account">
              <i class="bi bi-exclamation-triangle-fill warning-icon"></i>
              <h3>លុបគណី</h3>
              <p>ប្រសិនបើអ្នកលុបគណី នេះជាប្រតិបត្តិការដែលមិនអាចមកវិញបាន។</p>
              <button class="btn-delete">
                <i class="bi bi-trash3 me-2"></i>លុបគណី
              </button>
            </div>
          </div>

          <!-- Delivery Tab -->
          <div v-if="activeTab === 'delivery'" class="fade-enter">
            <h3 class="content-title">អាស័យដ្ឋាន</h3>
            <p class="text-muted mb-4">រៀបចំអាសយដ្ឋានដឹកជញ្ជូន សូមលោកអ្នកបញ្ចូលព័ត៌មានទីតាំងអាស័យដ្ផាន</p>
            <div class="address-card mb-4">
              <p class="mb-0">
                ផ្ទះលេខ51 ផ្លូវលេខ205 សង្កាត់ទឹកល្អក2 ខណ្ឌទួលគោក រាជធានីភ្នំពេញ
              </p>
            </div>
            <div class="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.71343543293!2d104.89073297481734!3d11.572389088628979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951001c8a7b55%3A0xa95ff42ea192073c!2sANT%20Technology%20Training%20School%202!5e0!3m2!1sen!2skh!4v1739332119459!5m2!1sen!2skh" 
                width="100%" 
                height="450" 
                style="border:0;" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modern Profile Styles */
.container {
  max-width: 1200px;
}

/* Profile Card */
.profile-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -2px rgba(0, 0, 0, 0.025);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.profile-img-container {
  width: 140px;
  height: 140px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #32ca83;
  box-shadow: 0 0 0 4px rgba(50, 202, 131, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-img-container:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 6px rgba(50, 202, 131, 0.3);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-img:hover {
  transform: scale(1.1);
}

.profile-name {
  font-size: 1.75rem;
  margin-bottom: 1.25rem;
  color: #1a2b3c;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.profile-social {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  color: #64748b;
  font-size: 1.35rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem;
  border-radius: 12px;
}

.social-link:hover {
  color: #32ca83;
  transform: translateY(-3px);
  background: rgba(50, 202, 131, 0.1);
}

/* Navigation Menu */
.nav-menu {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 24px;
  padding: 1.25rem;
  margin-top: 2rem;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -2px rgba(0, 0, 0, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  border: none;
  background: transparent;
  border-radius: 16px;
  color: #64748b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 1.05rem;
}

.nav-item:last-child {
  margin-bottom: 0;
}

.nav-item:hover,
.nav-item.active {
  background: linear-gradient(135deg, #32ca83, #2bb876);
  color: white;
  transform: translateX(6px);
  box-shadow: 0 4px 12px rgba(50, 202, 131, 0.25);
}

.nav-item i {
  margin-right: 1.25rem;
  font-size: 1.3rem;
}

/* Content Card */
.content-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -2px rgba(0, 0, 0, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.content-title {
  color: #1a2b3c;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.5px;
}

/* Form Styling */
.form-group {
  margin-bottom: 2rem;
}

.form-group label {

  margin-bottom: 0.75rem;
  color: #1a2b3c;
  font-weight: 600;
  font-size: 1.05rem;
}

.form-control {
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.05rem;
  background: #f8fafc;
}

.form-control:focus {
  border-color: #32ca83;
  box-shadow: 0 0 0 4px rgba(50, 202, 131, 0.15);
  outline: none;
  background: white;
}

.form-control::placeholder {
  color: #94a3b8;
}

/* Buttons */
.btn-save,
.btn-verify,
.btn-apply {
  background: linear-gradient(135deg, #32ca83, #2bb876);
  color: white;
  border: none;
  padding: 1rem 2.25rem;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.05rem;
  box-shadow: 0 4px 12px rgba(50, 202, 131, 0.25);
}

.btn-save:hover,
.btn-verify:hover,
.btn-apply:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(50, 202, 131, 0.35);
}

.btn-delete {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 1rem 2.25rem;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.05rem;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.btn-delete:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(239, 68, 68, 0.35);
}

/* Order History */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.025);
}

.order-item:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.order-img {
  width: 90px;
  height: 90px;
  border-radius: 16px;
  overflow: hidden;
  margin-right: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.order-img img:hover {
  transform: scale(1.1);
}

.order-details {
  flex: 1;
}

.order-details h4 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #1a2b3c;
  font-weight: 700;
}

.quantity {
  color: #64748b;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}

.price {
  color: #32ca83;
  font-weight: 700;
  margin: 0;
  font-size: 1.1rem;
}

.order-status {
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, #32ca83, #2bb876);
  color: white;
  border-radius: 24px;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(50, 202, 131, 0.25);
}

.order-date {
  display: block;
  color: #64748b;
  font-size: 0.95rem;
}

/* Authentication Card */
.auth-card {
  padding: 2.5rem;
}

.auth-title {
  font-size: 1.75rem;
  color: #1a2b3c;
  margin-bottom: 1.25rem;
  font-weight: 700;
}

.auth-subtitle {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.auth-form .input-group {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.info-box {
  background: linear-gradient(145deg, #E3F9E7, #d1f5d7);
  padding: 2rem;
  border-radius: 20px;
  margin-top: 2.5rem;
  border: 1px solid rgba(50, 202, 131, 0.2);
  box-shadow: 0 4px 12px rgba(50, 202, 131, 0.1);
}

.info-box h6 {
  color: #1a2b3c;
  margin-bottom: 1.25rem;
  font-weight: 700;
  font-size: 1.1rem;
}

.info-box p {
  color: #64748b;
  margin-bottom: 1.75rem;
  line-height: 1.6;
}

/* Delete Account */
.delete-account {
  text-align: center;
  padding: 4rem 2.5rem;
}

.warning-icon {
  font-size: 3.5rem;
  color: #ef4444;
  margin-bottom: 2rem;
  filter: drop-shadow(0 4px 8px rgba(239, 68, 68, 0.25));
}

.delete-account h3 {
  color: #ef4444;
  margin-bottom: 1.25rem;
  font-weight: 700;
  font-size: 1.75rem;
}

.delete-account p {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Address Card */
.address-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
}

/* Map Container */
.map-container {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Animations */
.fade-enter {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .profile-card,
  .nav-menu,
  .content-card {
    border-radius: 20px;
    padding: 1.5rem;
  }

  .profile-img-container {
    width: 120px;
    height: 120px;
  }

  .nav-item {
    padding: 1rem;
    font-size: 1rem;
  }

  .content-title {
    font-size: 1.5rem;
  }

  .form-control {
    padding: 0.875rem 1rem;
  }

  .btn-save,
  .btn-verify,
  .btn-apply,
  .btn-delete {
    padding: 0.875rem 1.75rem;
  }

  .order-item {
    flex-direction: column;
    text-align: center;
  }

  .order-img {
    margin: 0 auto 1rem;
  }

  .order-status {
    text-align: center;
    margin-top: 1rem;
  }
}
</style>