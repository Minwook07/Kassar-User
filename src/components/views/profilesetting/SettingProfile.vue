<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <!-- Left Sidebar -->
      <div class="col-lg-3 col-md-4">
        <!-- User Profile Card -->
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body text-center p-4">
            <div class="position-relative d-inline-block mb-3">
              <img 
                :src="userProfile.thumbnail" 
                alt="Profile" 
                class="rounded-circle profile-img"
                style="width: 80px; height: 80px; object-fit: cover;"
              >
              <div class="position-absolute bottom-0 end-0">
                <span class="badge bg-success rounded-pill p-2">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <h5 class="card-title mb-2 fw-bold">{{ userProfile.name }}</h5>
            <p class="text-muted small mb-3">{{ userProfile.typeofuser }}</p>
            
            <!-- Social Media Icons -->
            <div class="d-flex justify-content-center gap-2">
              <a href="#" class="btn btn-outline-primary btn-sm rounded-circle p-2">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="btn btn-outline-info btn-sm rounded-circle p-2">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="btn btn-outline-danger btn-sm rounded-circle p-2">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="btn btn-outline-primary btn-sm rounded-circle p-2">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="card shadow-sm border-0">
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="['list-group-item', 'list-group-item-action', 'border-0', 'd-flex', 'align-items-center', 'py-3', { 'active': activeTab === tab.id }]"
              >
                <i :class="[tab.icon, 'me-3', 'text-primary']"></i>
                <span class="fw-medium">{{ tab.name }}</span>
                <i class="fas fa-chevron-right ms-auto small text-muted"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content Area -->
      <div class="col-lg-9 col-md-8">
        <!-- Account Tab -->
        <div v-if="activeTab === 'account'" class="card shadow-sm border-0">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0 fw-bold">Account Settings</h5>
          </div>
          <div class="card-body p-4">
            <div class="row align-items-center mb-4">
              <div class="col-auto">
                <div class="position-relative">
                  <img 
                    :src="userProfile.thumbnail" 
                    alt="Profile" 
                    class="rounded-circle"
                    style="width: 100px; height: 100px; object-fit: cover;"
                  >
                  <button 
                    @click="showThumbnailOptions = !showThumbnailOptions"
                    class="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 p-2"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  
                  <!-- Thumbnail Options -->
                  <div v-if="showThumbnailOptions" class="position-absolute top-100 start-0 mt-2 bg-white shadow rounded p-2 border">
                    <button class="btn btn-sm btn-outline-primary d-block mb-1 w-100">
                      <i class="fas fa-upload me-1"></i> Upload
                    </button>
                    <button class="btn btn-sm btn-outline-danger d-block w-100">
                      <i class="fas fa-trash me-1"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
              <div class="col">
                <button class="btn btn-success">
                  <i class="fas fa-store me-2"></i>Register as Seller
                </button>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-medium">Full Name</label>
                <input type="text" class="form-control" :value="userProfile.name" readonly>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Gender</label>
                <select class="form-select" :value="userProfile.gender" disabled>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Email</label>
                <input type="email" class="form-control" :value="userProfile.email" readonly>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">User Type</label>
                <input type="text" class="form-control" :value="userProfile.typeofuser" readonly>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Phone Number</label>
                <input type="tel" class="form-control" :value="userProfile.phonenumber" readonly>
              </div>
              <div class="col-12">
                <label class="form-label fw-medium">History</label>
                <textarea class="form-control" rows="3" :value="userProfile.history" readonly></textarea>
              </div>
            </div>

            <div class="mt-4">
              <button @click="showEditModal = true" class="btn btn-primary">
                <i class="fas fa-edit me-2"></i>Edit Profile
              </button>
            </div>
          </div>
        </div>

        <!-- History Tab -->
        <div v-if="activeTab === 'history'" class="card shadow-sm border-0">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0 fw-bold">Transaction History</h5>
          </div>
          <div class="card-body p-0">
            <div v-for="transaction in transactions" :key="transaction.id" class="border-bottom p-4">
              <div class="row align-items-center">
                <div class="col-auto">
                  <img :src="transaction.thumbnail" alt="Product" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
                </div>
                <div class="col">
                  <h6 class="mb-1 fw-bold">{{ transaction.name }}</h6>
                  <p class="text-muted small mb-1">Amount: {{ transaction.amount }}</p>
                  <p class="text-muted small mb-0">{{ transaction.date }}</p>
                </div>
                <div class="col-auto text-end">
                  <div class="fw-bold mb-1">${{ transaction.price }}</div>
                  <span :class="['badge', transaction.status === 'success' ? 'bg-success' : 'bg-warning']">
                    {{ transaction.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Login Tab -->
        <div v-if="activeTab === 'accountlogin'" class="card shadow-sm border-0">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0 fw-bold">Login & Security</h5>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="updatePassword">
              <div class="mb-3">
                <label class="form-label fw-medium">Email Address</label>
                <input type="email" class="form-control" :value="userProfile.email" readonly>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-medium">Current Password</label>
                <div class="input-group">
                  <input 
                    :type="showCurrentPassword ? 'text' : 'password'" 
                    class="form-control" 
                    v-model="passwordForm.currentPassword"
                    placeholder="Enter current password"
                  >
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary"
                    @click="showCurrentPassword = !showCurrentPassword"
                  >
                    <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-medium">New Password</label>
                <div class="input-group">
                  <input 
                    :type="showNewPassword ? 'text' : 'password'" 
                    class="form-control" 
                    v-model="passwordForm.newPassword"
                    placeholder="Enter new password"
                  >
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-medium">Confirm New Password</label>
                <div class="input-group">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    class="form-control" 
                    v-model="passwordForm.confirmPassword"
                    placeholder="Confirm new password"
                  >
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
                <i class="fas fa-key me-2"></i>Update Password
              </button>
            </form>
          </div>
        </div>

        <!-- Delivery Tab -->
        <div v-if="activeTab === 'delivery'" class="card shadow-sm border-0">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0 fw-bold">Delivery Address</h5>
          </div>
          <div class="card-body p-4">
            <div class="mb-4">
              <h6 class="fw-bold mb-2">Primary Address</h6>
              <p class="text-muted mb-1">Home delivery address for all orders</p>
              <div class="border rounded p-3 bg-light">
                <p class="mb-1 fw-medium">{{ deliveryInfo.address }}</p>
                <p class="text-muted small mb-0">{{ deliveryInfo.desc }}</p>
              </div>
            </div>
            
            <div class="mb-4">
              <h6 class="fw-bold mb-2">Location Map</h6>
              <div class="border rounded overflow-hidden" style="height: 300px;">
                <div class="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                  <div class="text-center">
                    <i class="fas fa-map-marker-alt fa-3x mb-2"></i>
                    <p>Interactive Map View</p>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary">
              <i class="fas fa-edit me-2"></i>Edit Address
            </button>
          </div>
        </div>

        <!-- Delete Account Tab -->
        <div v-if="activeTab === 'deleteacc'" class="card shadow-sm border-0">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0 fw-bold text-danger">Delete Account</h5>
          </div>
          <div class="card-body p-4">
            <div class="alert alert-danger" role="alert">
              <i class="fas fa-exclamation-triangle me-2"></i>
              <strong>Warning!</strong> This action cannot be undone.
            </div>
            
            <h6 class="fw-bold mb-2">Account Deletion</h6>
            <p class="text-muted mb-4">
              Once you delete your account, all your data including profile information, 
              transaction history, and saved preferences will be permanently removed from our servers. 
              This action is irreversible and cannot be undone.
            </p>

            <button @click="showDeleteModal = true" class="btn btn-danger">
              <i class="fas fa-trash me-2"></i>Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
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
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title text-danger">Confirm Account Deletion</h5>
            <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <i class="fas fa-exclamation-triangle text-danger fa-3x mb-3"></i>
              <p class="mb-3">Please enter your current password to confirm account deletion.</p>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Current Password</label>
              <div class="input-group">
                <input 
                  :type="showDeletePassword ? 'text' : 'password'" 
                  class="form-control" 
                  v-model="deleteForm.password"
                  placeholder="Enter your password"
                >
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  @click="showDeletePassword = !showDeletePassword"
                >
                  <i :class="showDeletePassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteAccount">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// Reactive data
const activeTab = ref('account')
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showThumbnailOptions = ref(false)

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showDeletePassword = ref(false)

// User profile data
const userProfile = reactive({
  thumbnail: '/placeholder.svg?height=100&width=100',
  name: 'John Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  typeofuser: 'Premium Member',
  phonenumber: '+1 (555) 123-4567',
  history: 'Active member since 2020. Regular customer with excellent purchase history and positive reviews.'
})

// Navigation tabs
const tabs = ref([
  { id: 'account', name: 'Account', icon: 'fas fa-user' },
  { id: 'history', name: 'History', icon: 'fas fa-history' },
  { id: 'accountlogin', name: 'Login & Security', icon: 'fas fa-shield-alt' },
  { id: 'delivery', name: 'Delivery', icon: 'fas fa-truck' },
  { id: 'deleteacc', name: 'Delete Account', icon: 'fas fa-trash' },
  { id: 'logout', name: 'Logout', icon: 'fas fa-sign-out-alt' }
])

// Transaction history
const transactions = ref([
  {
    id: 1,
    thumbnail: '/placeholder.svg?height=60&width=60',
    name: 'Wireless Headphones',
    amount: '1x',
    price: '99.99',
    status: 'success',
    date: '2024-01-15'
  },
  {
    id: 2,
    thumbnail: '/placeholder.svg?height=60&width=60',
    name: 'Smartphone Case',
    amount: '2x',
    price: '29.99',
    status: 'pending',
    date: '2024-01-10'
  },
  {
    id: 3,
    thumbnail: '/placeholder.svg?height=60&width=60',
    name: 'Laptop Stand',
    amount: '1x',
    price: '45.00',
    status: 'success',
    date: '2024-01-05'
  }
])

// Delivery information
const deliveryInfo = reactive({
  address: '123 Main Street, Apt 4B, New York, NY 10001',
  desc: 'Please ring doorbell twice. Leave packages with doorman if not home.'
})

// Forms
const editForm = reactive({
  name: '',
  email: '',
  gender: '',
  phonenumber: '',
  history: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const deleteForm = reactive({
  password: ''
})

// Methods
const saveProfile = () => {
  Object.assign(userProfile, editForm)
  showEditModal.value = false
  alert('Profile updated successfully!')
}

const updatePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('New passwords do not match!')
    return
  }
  alert('Password updated successfully!')
  Object.assign(passwordForm, { currentPassword: '', newPassword: '', confirmPassword: '' })
}

const deleteAccount = () => {
  if (!deleteForm.password) {
    alert('Please enter your password to confirm deletion.')
    return
  }
  alert('Account deletion confirmed. This would permanently delete your account.')
  showDeleteModal.value = false
}

// Handle tab clicks
const handleTabClick = (tabId) => {
  if (tabId === 'logout') {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...')
    }
    return
  }
  activeTab.value = tabId
}

// Initialize edit form
onMounted(() => {
  Object.assign(editForm, userProfile)
})

// Close thumbnail options when clicking outside
const closeOptions = () => {
  showThumbnailOptions.value = false
}
</script>

<style scoped>
.profile-img {
  border: 3px solid #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.list-group-item.active .text-primary {
  color: white !important;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.modal {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.badge {
  font-size: 0.75rem;
}

.input-group .btn {
  border-left: 0;
}

.alert {
  border: none;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .container-fluid {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
}
</style>