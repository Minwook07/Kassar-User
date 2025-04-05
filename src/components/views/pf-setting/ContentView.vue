<template>
  <!-- Navigation Menu using Bootstrap Tabs -->
  <div class="tab-content bg-white rounded-2 border p-0">
    <!-- Navigation Menu using Bootstrap Tabs -->
    <div class="tab-content bg-white rounded-2 border p-0">
      <div id="profile" class="tab-pane fade show active">
        <div class="container p-4">
          <!-- Header with profile picture and save button -->
          <div class="row align-items-center mb-4 tab-animation">
            <div class="col-md-8">
              <div class="d-flex align-items-center">
                <div class="position-relative me-4">
                  <div class="dropdown">
                    <div data-bs-toggle="dropdown"
                      class="position-absolute rounded-circle d-flex justify-content-center align-items-center end-0 bottom-0"
                      style="width: 35px; height: 35px; background-color: var(--bs-primary); color: #fff; cursor: pointer;">
                      <i class="bi bi-pencil-square"></i>
                    </div>
                    <img :src="profile.avatar" alt="Profile"
                      class="rounded-circle border border-3 border-primary-subtle dropdown-toggle"
                      style="width: 80px; height: 80px; object-fit: cover" id="avatarDropdown" aria-expanded="false" />
                    <ul class="dropdown-menu" aria-labelledby="avatarDropdown">
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="triggerFileInput">
                          <i class="bi bi-pencil-fill me-2"></i>Change Photo
                        </a>
                      </li>
                      <li v-if="profile.avatar">
                        <a class="dropdown-item text-danger" href="#" @click.prevent="removeAvatar">
                          <i class="bi bi-trash-fill me-2"></i>Remove Photo
                        </a>
                      </li>
                    </ul>
                    <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="d-none" />
                  </div>
                </div>
                <div>
                  <h5 class="fw-semibold mb-1">{{ profile.name }}</h5>
                  <p class="text-muted mb-0">{{ profile.email }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 text-md-end mt-3 mt-md-0">
              <router-link to="/seller" class="btn btn-primary px-4 py-2">
                <i class="bi bi-shop-window me-1 fs-5 pt-1"></i> ស្នើរជាអ្នកលក់
              </router-link>
            </div>
          </div>
          <hr class="my-2" />

          <!-- Profile information -->
          <div class=" mb-4 tab-animation">
            <div class="card-body p-0">
              <div class="list-group list-group-flush">
                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="text-muted">ឈ្មោះ</span>
                  <span class="fw-medium">{{ profile.name }}</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="text-muted">ភេទ</span>
                  <p class="fw-medium"> {{ translateGender(profile.gender) }}</p>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                  <span class="text-muted">គណនីអ៊ីមែល</span>
                  <span class="fw-medium">{{ profile.email }}</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                  <span class="text-muted">ប្រភេទអ្នកប្រើប្រាស់</span>
                  <span class="fw-medium">{{ translateRole(profile.roles[0]?.name) || "អតិថិជន" }}</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                  <span class="text-muted">លេខទូរស័ព្ទ</span>
                  <span class="fw-medium">{{ profile.phone || "មិនទាន់កំណត់" }}</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                  <span class="text-muted">ជីវប្រវត្តិ</span>
                  <span class="fw-medium">{{ profile.history || "មិនទាន់កំណត់" }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Button to trigger modal -->
          <div class="d-grid d-md-flex justify-content-md-start tab-animation">
            <button class="btn btn-primary py-2 px-4" @click="openEditProfileModal">
              <i class="bi bi-pencil-square me-2"></i> កែប្រែព័ត៌មាន
            </button>
          </div>

          <!-- Crop Modal -->
          <div class="modal fade " id="avatar-crop-modal" tabindex="-1" aria-hidden="true" data-bs-backdrop="false">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                  <h5 class="modal-title">កែសម្រួលរូបភាព</h5>
                  <button type="button" class="btn-close" @click="closeCropModal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                  <div v-if="imgCrop.img_crop" class="cropper-container rounded-3 overflow-hidden">
                    <Cropper ref="cropper" :src="imgCrop.img_crop" :stencil-props="{
                      aspectRatio: 1,
                      handlers: {},
                      movable: false,
                      resizable: false
                    }" :stencil-size="{ width: 300, height: 300 }" image-restriction="stencil" :zoomable="false"
                      @change="onCrop" class="cropper" />
                  </div>
                  <div v-else class="text-center p-5">
                    <div class="d-inline-block p-4 rounded-3 bg-light">
                      <i class="bi bi-image text-muted fs-1"></i>
                      <p class="mb-3 mt-2">No image selected</p>
                      <button class="btn btn-primary" @click="triggerFileInput">
                        <i class="bi bi-upload me-2"></i>Select Image
                      </button>
                    </div>
                  </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                  <div class="d-flex justify-content-between w-100">
                    <div>
                      <button v-if="imgCrop.img_crop" class="btn btn-outline-danger" type="button"
                        @click="replaceImage">
                        <i class="bi bi-upload me-1"></i> Replace
                      </button>
                    </div>
                    <div>
                      <button class="btn btn-outline-secondary me-2" type="button" @click="closeCropModal">
                        Cancel
                      </button>
                      <button class="btn btn-primary" type="button" @click="performCrop" :disabled="!imgCrop.img_crop">
                        <span v-if="!cropping">
                          <i class="bi bi-check-circle me-1"></i> Save
                        </span>
                        <span v-else>
                          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Edit Profile Modal -->
          <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel"
            aria-hidden="true" data-bs-backdrop="false">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="editProfileModalLabel">កែប្រែព័ត៌មានផ្ទាល់ខ្លួន</h5>
                  <button type="button" class="btn-close" @click="closeEditModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="updateProfile">
                    <div class="mb-3">
                      <label for="name" class="form-label">ឈ្មោះ</label>
                      <input type="text" class="form-control" id="name" v-model="editForm.name" />
                    </div>
                    <div class="mb-3">
                      <label for="gender" class="form-label">ភេទ</label>
                      <select class="form-select" id="gender" v-model="editForm.gender">
                        <option value="1">ប្រុស</option>
                        <option value="2">ស្រី</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">គណនីអ៊ីមែល</label>
                      <input type="email" class="form-control" id="email" v-model="editForm.email" />
                    </div>
                    <div class="mb-3">
                      <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                      <input type="text" class="form-control" id="phone" v-model="editForm.phone" />
                    </div>
                    <div class="mb-3">
                      <label for="history" class="form-label">ជីវប្រវត្តិ</label>
                      <textarea class="form-control" id="history" rows="4" style="resize: none"
                        v-model="editForm.history"></textarea>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-outline-secondary" @click="closeEditModal">បិទ</button>
                      <button type="submit" class="btn btn-primary" :disabled="updating">
                        <span v-if="!updating">
                          <i class="bi bi-save me-1"></i> កែប្រែ
                        </span>
                        <span v-else>
                          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          កំពុងធ្វើការកែប្រែ...
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="login-method" class="tab-pane fade p-4">
        <h4 class="fw-bold text-primary mb-3 tab-animation">
          វិធីសាស្រ្តចូលប្រើប្រាស់គណនី
        </h4>

        <p class="text-muted mb-4 tab-animation">
          លោកអ្នកបានចូលគណនីដោយអនុវត្តន៍តាមជំហានដូចខាងក្រោម
        </p>

        <form @submit.prevent="updatePassword" class="auth-form">
          <div class="mb-4 tab-animation">
            <label class="form-label fw-semibold mb-2">គណនីអ៊ីមែល</label>
            <div class="input-group">
              <input type="email" class="form-control form-control-lg rounded-start" v-model="profile.email" disabled />
            </div>
          </div>

          <div class="mb-4 tab-animation">
            <label class="form-label fw-semibold mb-2">ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
            <div class="input-group">
              <input type="password" class="form-control form-control-lg rounded-start"
                placeholder="បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន" v-model="passwordForm.current_password" required />
              <span class="input-group-text rounded-end">
                <i class="bi bi-lock"></i>
              </span>
            </div>
          </div>

          <div class="mb-4 tab-animation">
            <label class="form-label fw-semibold mb-2">ពាក្យសម្ងាត់ថ្មី</label>
            <div class="input-group">
              <input type="password" class="form-control form-control-lg rounded-start"
                placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី" v-model="passwordForm.new_password" required />
              <span class="input-group-text rounded-end">
                <i class="bi bi-key"></i>
              </span>
            </div>
          </div>

          <div class="mb-4 tab-animation">
            <label class="form-label fw-semibold mb-2">បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
            <div class="input-group">
              <input type="password" class="form-control form-control-lg rounded-start"
                placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត" v-model="passwordForm.new_password_confirmation" required />
              <span class="input-group-text rounded-end">
                <i class="bi bi-key"></i>
              </span>
            </div>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end tab-animation">
            <button type="submit" class="btn btn-primary px-4 py-2"
              :disabled="passwordForm.new_password !== passwordForm.new_password_confirmation">
              <i class="bi bi-key me-2"></i>ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់
            </button>
          </div>
        </form>
      </div>
      <div id="usage-history" class="tab-pane fade p-4">

        <h3 class="fw-bold text-primary mb-4 tab-animation">

          ប្រវត្តិការបញ្ជាទិញ

        </h3>

        <div class="orders-list bg-white rounded-2 border p-4 mb-4 border hover-effect tab-animation">

          <div class="d-flex flex-column flex-md-row align-items-md-center gap-3">

            <div class="order-img">

              <img src="@/assets/images/cart-img/veget-1.jpg" alt="Order" class="rounded-3"
                style="width: 80px; height: 80px; object-fit: cover" />

            </div>

            <div class="order-details flex-grow-1">

              <h4 class="fs-5 mb-2">ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>

              <p class="quantity mb-1 text-muted">ចំនួន 1គីឡូក្រាម</p>

              <p class="price mb-0 fw-bold">តម្លៃ ១០០០០ រៀល</p>

            </div>

            <div class="order-status text-md-end mt-2 mt-md-0">

              <span class="status-badge bg-success text-white px-3 py-1 rounded-2 d-inline-block mb-2">Success</span>

              <span class="order-date d-block text-muted">2023-01-15 17:30:33</span>

            </div>

          </div>

        </div>

        <div class="orders-list bg-white rounded-2 border p-4 mb-4 border hover-effect tab-animation">

          <div class="d-flex flex-column flex-md-row align-items-md-center gap-3">

            <div class="order-img">

              <img src="@/assets/images/cart-img/veget-1.jpg" alt="Order" class="rounded-3"
                style="width: 80px; height: 80px; object-fit: cover" />

            </div>

            <div class="order-details flex-grow-1">

              <h4 class="fs-5 mb-2">ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>

              <p class="quantity mb-1 text-muted">ចំនួន 1គីឡូក្រាម</p>

              <p class="price mb-0 fw-bold">តម្លៃ ១០០០០ រៀល</p>

            </div>

            <div class="order-status text-md-end mt-2 mt-md-0">

              <span class="status-badge bg-success text-white px-3 py-1 rounded-2 d-inline-block mb-2">Success</span>

              <span class="order-date d-block text-muted">2023-01-15 17:30:33</span>

            </div>

          </div>

        </div>

        <div class="orders-list bg-white rounded-2 border p-4 mb-4 border hover-effect tab-animation">

          <div class="d-flex flex-column flex-md-row align-items-md-center gap-3">

            <div class="order-img">

              <img src="@/assets/images/cart-img/veget-1.jpg" alt="Order" class="rounded-3"
                style="width: 80px; height: 80px; object-fit: cover" />

            </div>

            <div class="order-details flex-grow-1">

              <h4 class="fs-5 mb-2">ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>

              <p class="quantity mb-1 text-muted">ចំនួន 1គីឡូក្រាម</p>

              <p class="price mb-0 fw-bold">តម្លៃ ១០០០០ រៀល</p>

            </div>

            <div class="order-status text-md-end mt-2 mt-md-0">

              <span class="status-badge bg-success text-white px-3 py-1 rounded-2 d-inline-block mb-2">Success</span>

              <span class="order-date d-block text-muted">2023-01-15 17:30:33</span>

            </div>

          </div>

        </div>

      </div>


      <!-- Edit Delivery Tab -->

      <div id="delivery-method" class="tab-pane fade p-4">

        <h3 class="fw-bold text-primary mb-3 tab-animation">អាស័យដ្ឋាន</h3>

        <p class="text-muted mb-4 tab-animation">

          រៀបចំអាសយដ្ឋានដឹកជញ្ជូន សូមលោកអ្នកបញ្ចូលព័ត៌មានទីតាំងអាស័យដ្ផាន

        </p>

        <div class="address-card bg-white rounded-2 border p-4 mb-4 border tab-animation">

          <p class="mb-0">

            ផ្ទះលេខ51 ផ្លូវលេខ205 សង្កាត់ទឹកល្អក2 ខណ្ឌទួលគោក រាជធានីភ្នំពេញ

          </p>

        </div>

        <div class="map-container rounded-2 overflow-hidden border tab-animation">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.71343543293!2d104.89073297481734!3d11.572389088628979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951001c8a7b55%3A0xa95ff42ea192073c!2sANT%20Technology%20Training%20School%202!5e0!3m2!1sen!2skh!4v1739332119459!5m2!1sen!2skh"
            width="100%" height="450" style="border: 0" loading="lazy" referrerpolicy="no-referrer-when-downgrade">

          </iframe>

        </div>

      </div>

      <!-- Delete Account Tab -->

      <div id="delete-account" class="tab-pane fade p-4">
        <h2 class="fw-bold text-primary mb-4 tab-animation">លុបគណនី</h2>

        <div class="alert alert-danger rounded-2 mt-3 tab-animation">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-exclamation-triangle-fill fs-4"></i>
            <span class="fw-semibold">តើអ្នកប្រាកដថាចង់លុបគណនីរបស់អ្នកមែនទេ?</span>
          </div>
          <p class="mb-0 mt-2 ms-4 ps-2">
            ប្រសិនបើអ្នកលុបគណនីរបស់អ្នក ទិន្នន័យ ពត៌មាន
            និងទាំងអស់របស់អ្នកនឹងត្រូវបានលុបជាអចិន្ត្រៃយ៍។
          </p>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end tab-animation mt-4">
          <button type="button" class="btn btn-danger px-4 py-2" data-bs-toggle="modal"
            data-bs-target="#deleteConfirmModal">
            <i class="bi bi-trash me-2"></i>លុបគណនី
          </button>
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="false">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title text-danger">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>ផ្ទៀងផ្ទាត់ការលុបគណនី
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>តើអ្នកប្រាកដថាចង់លុបគណនីរបស់អ្នកជាអចិន្ត្រៃយ៍មែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។</p>
                <div class="form-group mb-3">
                  <label for="deletePassword" class="form-label">បញ្ចូលពាក្យសម្ងាត់របស់អ្នកដើម្បីបញ្ជាក់</label>
                  <input type="password" class="form-control" id="deletePassword" v-model="deletePassword"
                    placeholder="ពាក្យសម្ងាត់បច្ចុប្បន្នរបស់អ្នក">
                </div>
              </div>
              <div class="modal-footer border-0">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">បោះបង់</button>
                <button type="button" class="btn btn-danger" @click="deleteAccount" :disabled="!deletePassword">
                  <span v-if="!deleting">
                    <i class="bi bi-trash me-2"></i>លុបគណនី
                  </span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    កំពុងលុប...
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="margin-top: 50px;">
      <div id="liveToast" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="false">
        <div class="toast-content p-3">
          <div>
            <i :class="toastIcon"></i>
          </div>
          <div class="message">
            <span class="text text-1">{{ toastMessage }}</span>
          </div>
          <div>
            <button type="button" class="btn btn-close border-0 ms-auto p-0" data-bs-dismiss="toast"
              aria-label="Close"></button>
          </div>
        </div>
        <div class="progress active"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { Modal } from 'bootstrap';
import axios from 'axios';

// Profile data
const profile = ref({
  id: null,
  name: '',
  email: '',
  gender: null,
  phone: null,
  avatar: '',
  roles: [],
  history: ''
});

// Forms
const editForm = ref({
  name: '',
  email: '',
  phone: '',
  gender: 1, // Default to male
  history: ''
});

const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
});

const deletePassword = ref('');

// Avatar cropping
const imgCrop = ref({
  img_crop: '',
  file_name: ''
});

// Loading states
const cropping = ref(false);
const updating = ref(false);
const deleting = ref(false);
const changingPassword = ref(false);

// Refs
const fileInput = ref(null);
const cropper = ref(null);
let cropModal = null;
let editModal = null;

// Toast state
const toastMessage = ref('');
const toastIcon = ref('');

const showToast = (message, icon = 'bi bi-check-circle') => {
  toastMessage.value = message;
  toastIcon.value = icon;

  const toastEl = document.getElementById('liveToast');
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
};

// Computed properties
const avatarUrl = computed(() => {
  return profile.value.avatar || '/img/default.jpg';
});

// Role translations
const translateRole = (roleName) => {
  const translations = {
    "Regular User": "អតិថិជន",
    "Seller User": "អ្នកលក់",
    "System Admin": "អ្នកគ្រប់គ្រង"
  };
  return translations[roleName] || roleName;
};

// Gender translations
const translateGender = (gender) => {
  return gender === 1 ? 'ប្រុស' : gender === 2 ? 'ស្រី' : 'មិនបញ្ជាក់';
};

// Helper functions
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

const showSuccess = (message) => {
  showToast(`${message}`, 'bi bi-check-circle');
};

const showError = (message, error = null) => {
  let errorMessage = message;

  if (error) {
    if (error.response) {
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 413) {
        errorMessage = 'ឯកសារធំជាងទៅ (អតិថិជន 2MB)';
      } else if (error.response.status === 415) {
        errorMessage = 'ប្រភេទឯកសារមិនគាំទ្រ';
      }
    } else if (error.request) {
      errorMessage = 'កំហុសប្រព័ន្ធបណ្តាញ - សូមពិនិត្យការតភ្ជាប់របស់អ្នក';
    }
  }

  showToast(`កំហុស: ${errorMessage}`, 'bi bi-x-circle');
};

// Profile functions
const fetchProfile = async () => {
  try {
    const response = await axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    profile.value = response.data.data;
    prepareEditForm();
  } catch (error) {
    showError('បរាជ័យក្នុងការទាញយកប្រវត្តិរូប', error);
  }
};

const prepareEditForm = () => {
  editForm.value = {
    name: profile.value.name,
    email: profile.value.email,
    phone: profile.value.phone || '',
    gender: profile.value.gender || '',
    history: profile.value.history || ''
  };
};

const updateProfile = async () => {
  updating.value = true;
  try {
    await axios.post('/api/profile', editForm.value, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    await fetchProfile();
    closeEditModal();
    showSuccess('ប្រវត្តិរូបបានកែប្រែបានជោគជ័យ');
  } catch (error) {
    showError('បរាជ័យក្នុងការកែប្រែប្រវត្តិរូប', error);
  } finally {
    updating.value = false;
  }
};

// Avatar functions
const triggerFileInput = () => fileInput.value.click();

const handleFileSelect = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  e.target.value = '';

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    showError('សូមជ្រើសរើសរូបភាព JPEG, PNG, ឬ WebP');
    return;
  }

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    showError('រូបភាពត្រូវតែលតិចជាង 2MB');
    return;
  }

  // Read and show in cropper
  const reader = new FileReader();
  reader.onload = (event) => {
    imgCrop.value = {
      img_crop: event.target.result,
      file_name: file.name
    };
    openCropModal();
  };
  reader.onerror = () => showError('កំហុសក្នុងការអានឯកសាររូបភាព');
  reader.readAsDataURL(file);
};

const performCrop = async () => {
  if (!imgCrop.value.img_crop) return;

  cropping.value = true;

  try {
    const { canvas } = cropper.value.getResult();
    if (!canvas) throw new Error('គ្មានរូបភាពសម្រាប់កាត់');

    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.85);
    });

    const formData = new FormData();
    formData.append('avatar', blob, 'profile.jpg');

    const response = await axios.post('/api/profile/avatar', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    profile.value.avatar = response.data.avatar;
    closeCropModal();
    showSuccess('ផ្លាស់ប្តូររូបភាពជោគជ័យ');
  } catch (error) {
    showError('បរាជ័យ', error);
  } finally {
    cropping.value = false;
  }
};

// Replace image function
const replaceImage = () => {
  imgCrop.value = { img_crop: '', file_name: '' };
  triggerFileInput();
};

const updatePassword = async () => {
  if (passwordForm.value.new_password !== passwordForm.value.new_password_confirmation) {
    showToast("ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នា។", 'bi bi-x-circle');
    return;
  }

  changingPassword.value = true;

  try {
    const response = await axios.post('/api/profile/password', passwordForm.value, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    passwordForm.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    };
    showSuccess('ពាក្យសម្ងាត់កែប្រែជោគជ័យ');
  } catch (error) {
    showError('បរាជ័យ', error);
  } finally {
    changingPassword.value = false;
  }
};

const deleteAccount = async () => {
  deleting.value = true;

  try {
    await axios.post('/api/profile/delete', {
      password: deletePassword.value
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  } catch (error) {
    showError('បរាជ័យក្នុងការលុបគណនី', error);
  } finally {
    deleting.value = false;
  }
};

const removeAvatar = async () => {
  if (!confirm('តើអ្នកប្រាកដថាចង់លុបរូបភាព?')) return;

  try {
    await axios.delete('/api/profiles/avatar', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    profile.value.avatar = '';
    showSuccess('រូបភាពលុបដោយជោគជ័យ');
  } catch (error) {
    showError('បរាជ័យក្នុងការលុបរូបភាព', error);
  }
};

// Modal controls
const openCropModal = () => {
  cropModal.show();
};

const closeCropModal = () => {
  imgCrop.value = { img_crop: '', file_name: '' };
  cropModal.hide();
};

const openEditProfileModal = () => {
  prepareEditForm();
  editModal.show();
};

const closeEditModal = () => editModal.hide();

// Initialize when component mounts
onMounted(async () => {
  await fetchProfile();
  cropModal = new Modal(document.getElementById('avatar-crop-modal'));
  editModal = new Modal(document.getElementById('editProfileModal'));
});
</script>

<style scoped>
/* Add to your style section */
.cropper-container {
  width: 100%;
  height: 400px;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cropper {
  width: 100%;
  height: 100%;
}

.modal-content {
  border-radius: 16px;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.alert-danger {
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 4px solid #dc3545;
}

.btn-danger {
  transition: all 0.2s;
}

.btn-danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.form-control:disabled {
  background-color: #f8f9fa;
  opacity: 1;
}

/* Avatar Styles */
.avatar {
  width: 80px;
  height: 80px;
  border: 3px solid #007bff;
  /* Primary color border */
  transition: transform 0.2s;
  /* Smooth hover effect */
}

.avatar:hover {
  transform: scale(1.05);
  /* Slight scale on hover */
}

/* Card Styles */


/* List Group Item Styles */
.list-group-item {
  padding: 15px;
  /* Comfortable padding */
}

/* Button Styles */
.btn-primary {
  border-radius: 20px;
  /* Pill-shaped buttons */
  transition: background-color 0.3s;
  /* Smooth transition */
}

.btn-primary:hover {
  background-color: #0056b3;
  /* Darker shade on hover */
}

/* Modal Styles */
.modal-content {
  border-radius: 10px;
  /* Rounded modal */
  z-index: 99999 !important;
}

.modal-header {
  border-bottom: none;
  /* Clean header */
}

/* Cropper Styles */
.cropper-container {
  width: 100%;
  height: 300px;
  background: #f8f9fa;
  /* Light gray background */
  border-radius: 8px;
  /* Rounded container */
  overflow: hidden;
  /* Prevent overflow */
}

/* Dropdown Menu Styles */
.dropdown-menu {
  min-width: 10rem;
  /* Consistent dropdown width */
}

.modal {
  z-index: 1050 !important;
}

.modal-backdrop {
  z-index: 1040 !important;
}

/* Ensure cropper is properly sized */
.cropper-container {
  width: 100%;
  height: 400px;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
}

.cropper {
  width: 100%;
  height: 100%;
}

/* Modal styling */
.modal-content {
  border-radius: 16px;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Avatar styling */
.avatar-upload {
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar-upload:hover {
  transform: scale(1.05);
}
</style>
