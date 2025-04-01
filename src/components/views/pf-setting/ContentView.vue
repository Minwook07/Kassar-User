<template>
  <!-- Navigation Menu using Bootstrap Tabs -->
  <div class="tab-content bg-white rounded-2 border p-0">
    <div id="profile" class="tab-pane fade show active">
      <div class="container p-4">
        <!-- Header with profile picture and save button -->
        <div class="row align-items-center mb-4 tab-animation">
          <div class="col-md-8">
            <div class="d-flex align-items-center">
              <!-- Avatar with dropdown menu -->
              <div class="position-relative me-4">
                <div class="dropdown">
                  <img
                    :src="profile.avatar || defaultAvatar"
                    alt="Profile"
                    class="rounded-circle border border-3 border-primary-subtle dropdown-toggle"
                    style="width: 80px; height: 80px; object-fit: cover"
                    id="avatarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
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
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="d-none"
                  />
                </div>
              </div>

              <div>
                <h5 class="fw-semibold mb-1">{{ profile.name }}</h5>
                <p class="text-muted mb-0">{{ profile.email }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 text-md-end mt-3 mt-md-0">
            <button class="btn btn-primary px-4 py-2">
              <i class="bi bi-shop-window me-1 fs-5 pt-1"></i> ស្នើរជាអ្នកលក់
            </button>
          </div>
        </div>
        <hr class="my-2" />

        <!-- Profile information -->
        <div class="card border-0 mb-4 tab-animation">
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span class="text-muted">ឈ្មោះ</span>
                <span class="fw-medium">{{ profile.name }}</span>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span class="text-muted">ភេទ</span>
                <span class="fw-medium">{{ profile.gender }}</span>
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
          <button
            class="btn btn-primary py-2 px-4"
            @click="openEditProfileModal"
          >
            <i class="bi bi-pencil-square me-2"></i> កែតម្រូវ
          </button>
        </div>

        <!-- Crop Modal -->
        <div class="modal fade" id="avatar-crop-modal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Crop Profile Picture</h5>
                <button type="button" class="btn-close" @click="closeCropModal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div v-if="imgCrop.img_crop" class="cropper-container">
                  <Cropper 
                    ref="cropper"
                    :src="imgCrop.img_crop" 
                    :stencil-props="{ aspectRatio: 1 }"
                    @change="onCrop"
                    class="cropper"
                  />
                </div>
                <div v-else class="text-center p-5">
                  <p class="mb-3">No image selected for cropping</p>
                  <button class="btn btn-primary" @click="triggerFileInput">
                    <i class="bi bi-upload me-2"></i>Upload Image
                  </button>
                </div>
                
                <div v-if="profile.avatar" class="mt-3 d-flex justify-content-center">
                  <div class="btn-group">
                    <button class="btn btn-outline-secondary btn-sm" @click="triggerFileInput">
                      <i class="bi bi-arrow-repeat me-1"></i> Replace
                    </button>
                    <button class="btn btn-outline-danger btn-sm" @click="removeAvatarFromModal">
                      <i class="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-outline-secondary" type="button" @click="closeCropModal">
                  Cancel
                </button>
                <button 
                  class="btn btn-primary" 
                  type="button" 
                  @click="performCrop" 
                  :disabled="!imgCrop.img_crop"
                >
                  <i class="bi bi-check-circle me-1"></i> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Profile Modal -->
        <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editProfileModalLabel">កែតម្រូវព័ត៌មានផ្ទាល់ខ្លួន</h5>
                <button type="button" class="btn-close" @click="closeEditModal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateProfile">
                  <!-- Avatar preview in edit modal -->
                  <div class="text-center mb-4">
                    <div class="position-relative d-inline-block">
                      <img 
                        :src="profile.avatar || defaultAvatar" 
                        alt="Profile" 
                        class="rounded-circle border border-3 border-primary-subtle"
                        style="width: 100px; height: 100px; object-fit: cover"
                      />
                      <button 
                        type="button" 
                        class="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle p-1"
                        @click="openImageUpload"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                    </div>
                  </div>
                  
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
                    <textarea class="form-control" id="history" rows="4" style="resize: none" v-model="editForm.history"></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" @click="closeEditModal">បិទ</button>
                    <button type="submit" class="btn btn-primary">
                      <i class="bi bi-save me-1"></i>រក្សាទុក
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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

            <span
                class="status-badge bg-success text-white px-3 py-1 rounded-2 d-inline-block mb-2">Success</span>

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

            <span
                class="status-badge bg-success text-white px-3 py-1 rounded-2 d-inline-block mb-2">Success</span>

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

            <span
                class="status-badge bg-success text-white px-3 py-1 rounded-2 d-inline-block mb-2">Success</span>

            <span class="order-date d-block text-muted">2023-01-15 17:30:33</span>

        </div>

    </div>

</div>

</div>

<!-- Login Method Tab -->

<div id="login-method" class="tab-pane fade p-4">

<h4 class="fw-bold text-primary mb-3 tab-animation">

    វិធីសាស្រ្តចូលប្រើប្រាស់គណនី

</h4>

<p class="text-muted mb-4 tab-animation">

    លោកអ្នកបានចូលគណនីដោយអនុវត្តន៍តាមជំហានដូចខាងក្រោម

</p>

<form class="auth-form">

    <div class="mb-4 tab-animation">

        <label class="form-label fw-semibold mb-2">គណនីអ៊ីមែល</label>

        <div class="input-group">

            <input type="email" class="form-control form-control-lg rounded-start"
                placeholder="chanthy0105@gmail.com" />

        </div>

    </div>

    <div class="mb-4 tab-animation">

        <label class="form-label fw-semibold mb-2">ពាក្យសម្ងាត់</label>

        <div class="input-group">

            <input type="password" class="form-control form-control-lg rounded-start"
                placeholder="សូមបំពេញពាក្យសម្ងាត់" />

            <button type="button" class="btn btn-primary rounded-end px-3">

                <i class="bi bi-pencil-square me-2"></i>កែប្រែ

            </button>

        </div>

    </div>

    <div class="bg-light p-4 rounded-2 border mt-4 tab-animation">

        <h6 class="fw-bold mb-3">

            ចាប់ផ្តើមការផ្ទៀងផ្ទាត់ការកំណត់ប្រព័ន្ធសុវត្ថិភាពសម្រាប់គណនី

        </h6>

        <p class="mb-3">

            ដើម្បីមានសុវត្ថិភាពខ្ពស់របស់គណនីអ្នកការផ្ទៀងផ្ទាត់ពីរកត្តាបន្ថែមស្រទាប់សុវត្ថិភាពបន្ថែមទៅក្នុងគណនីរបស់អ្នក។

            ដើម្បីចូល អ្នកនឹងត្រូវផ្តល់លេខកូដ 6 ខ្ទង់

            ព្រមទាំងអនុវត្តតាមគោលការណ៍របស់គេហទំព័រ

        </p>

        <button type="button" class="btn btn-outline-primary rounded-2 px-4 py-2">

            <i class="bi bi-search me-2"></i>អានបន្ថែម

        </button>

    </div>

</form>

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

<div class="bg-danger bg-opacity-10 p-4 rounded-2 mt-3 tab-animation">

    <div class="d-flex align-items-center gap-2">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="text-danger bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">

            <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />

        </svg>

        <span class="fw-semibold">តើអ្នកប្រាកដថាចង់លុបគណនីរបស់អ្នកមែនទេ?</span>

    </div>

    <p class="mb-0 mt-2 ms-4 ps-2">

        ប្រសិនបើអ្នកលុបគណនីរបស់អ្នក ទិន្នន័យ ពត៌មាន

        និងទាំងអស់របស់អ្នកនឹងត្រូវបានលុបជាអចិន្ត្រៃយ៍។

    </p>

</div>

<!-- Delete Button (Trigger Modal) -->

<button type="button" class="btn btn-danger px-5 py-2 rounded-2 border mt-4 tab-animation"
    data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">

    <i class="bi bi-trash me-2"></i>លុបគណនី

</button>

</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { Modal } from 'bootstrap';

const defaultAvatar = "/images/no_photo.jpg";

const profile = ref({
  id: null,
  name: "",
  email: "",
  gender: null,
  phone: null,
  avatar: "",
  roles: [],
  history: ""
});

const editForm = ref({
  name: "",
  email: "",
  phone: "",
  gender: 1,
  history: "",
  role: ""
});

// Avatar management
const imgCrop = ref({
  img_crop: "",
});
const cropper = ref(null);
const fileInput = ref(null);
let cropModal = null;
let editProfileModal = null;

// Toast notification system
const showToast = (message, type = 'success') => {
  // You can implement a toast notification system here
  console.log(`${type}: ${message}`);
  // Example implementation with alert for now
  alert(`${message}`);
};

// Role translations
const roleTranslations = {
  "Regular User": "អតិថិជន",
  "Seller User": "អ្នកលក់",
  "System Admin": "អ្នកគ្រប់គ្រងប្រព័ន្ធ",
};

const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

const translateRole = (roleName) => {
  return roleTranslations[roleName] || roleName;
};

// Fetch user profile
const fetchProfile = async () => {
  const token = getToken();
  try {
    const response = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    profile.value = response.data.data;
    profile.value.gender = profile.value.gender === 1 ? "ប្រុស" : "ស្រី";
    prepareEditForm();
  } catch (error) {
    console.error("Error fetching profile:", error);
    showToast("Failed to load profile", "error");
  }
};

const prepareEditForm = () => {
  editForm.value = {
    name: profile.value.name,
    email: profile.value.email,
    phone: profile.value.phone || "",
    gender: profile.value.gender === "ប្រុស" ? 1 : 2,
    role: profile.value.roles[0]?.name || "",
    history: profile.value.history || "",
  };
};

const updateProfile = async () => {
  const token = getToken();
  try {
    await axios.post("/api/profile", editForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchProfile();
    closeEditModal();
    showToast("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    showToast("Failed to update profile", "error");
  }
};

// Modal handling functions
const openEditProfileModal = () => {
  prepareEditForm();
  if (editProfileModal) {
    editProfileModal.show();
  } else {
    // Try to initialize the modal if it's not already initialized
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      editProfileModal = new Modal(modalEl);
      editProfileModal.show();
    } else {
      showToast("Modal element not found in DOM", "error");
    }
  }
};

const closeEditModal = () => {
  if (editProfileModal) {
    editProfileModal.hide();
  }
};

const closeCropModal = () => {
  if (cropModal) {
    cropModal.hide();
  }
};

// Avatar functions
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imgCrop.value.img_crop = e.target.result;
    openAvatarModal();
  };
  reader.readAsDataURL(file);
  
  // Reset file input to allow selecting the same file again
  event.target.value = '';
};

const openImageUpload = () => {
  // Close edit modal first
  if (editProfileModal) {
    editProfileModal.hide();
  }
  
  // Then trigger file input
  setTimeout(() => {
    triggerFileInput();
  }, 300);
};

const openAvatarModal = () => {
  // First ensure modal is initialized
  if (!cropModal) {
    const modalEl = document.getElementById('avatar-crop-modal');
    if (modalEl) {
      cropModal = new Modal(modalEl);
    } else {
      showToast("Avatar modal element not found in DOM", "error");
      return;
    }
  }
  
  // Then show it
  cropModal.show();
};

const removeAvatar = async () => {
  const token = getToken();
  try {
    await axios.delete("/api/profile/avatar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    profile.value.avatar = "";
    showToast("Profile picture removed");
  } catch (error) {
    console.error("Error removing avatar:", error);
    showToast("Failed to remove profile picture", "error");
  }
};

const removeAvatarFromModal = async () => {
  await removeAvatar();
  closeCropModal();
  
  // Clear the crop data
  imgCrop.value.img_crop = "";
};

const onCrop = ({ canvas }) => {
  // Store reference to the cropper canvas in state
  console.log("Crop changed!", canvas);
};

const performCrop = async () => {
  if (!cropper.value) {
    showToast("Cropper not initialized properly", "error");
    return;
  }
  
  const { canvas } = cropper.value.getResult();
  if (!canvas) {
    showToast("Please crop the image first", "error");
    return;
  }
  
  const token = getToken();
  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append("avatar", blob, "avatar.jpg");

    try {
      const response = await axios.post(
        "/api/profile/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      profile.value.avatar = response.data.avatar;
      closeCropModal();
      
      // Clear the crop data
      imgCrop.value.img_crop = "";
      
      showToast("Profile picture updated successfully");
    } catch (error) {
      console.error("Error updating avatar:", error);
      showToast("Failed to update profile picture", "error");
    }
  }, "image/jpeg", 0.9);
};

onMounted(async () => {
  await fetchProfile();
  
  // Initialize modals after DOM is fully rendered
  nextTick(() => {
    // Try to initialize modals with proper error handling
    try {
      const cropModalEl = document.getElementById('avatar-crop-modal');
      const editModalEl = document.getElementById('editProfileModal');
      
      if (cropModalEl) {
        cropModal = new Modal(cropModalEl, {
          backdrop: 'static',  // Prevent closing when clicking outside
          keyboard: false     // Prevent closing with keyboard
        });
      } else {
        console.warn("Crop modal element not found");
      }
      
      if (editModalEl) {
        editProfileModal = new Modal(editModalEl, {
          backdrop: 'static',  // Prevent closing when clicking outside
          keyboard: false     // Prevent closing with keyboard
        });
      } else {
        console.warn("Edit profile modal element not found");
      }
    } catch (error) {
      console.error("Error initializing modals:", error);
    }
  });
});
</script>

<style scoped>
.tab-animation {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.tab-pane.active .tab-animation {
  opacity: 1;
  transform: translateY(0);
}

/* Avatar dropdown styles */
.dropdown-toggle {
  cursor: pointer;
  transition: transform 0.2s;
}

.dropdown-toggle:hover {
  transform: scale(1.05);
}

.dropdown-menu {
  min-width: 10rem;
}

/* Cropper styles */
.cropper-container {
  width: 100%;
  height: 300px;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.cropper {
  height: 100%;
  width: 100%;
}

.btn-outline-secondary {
  border-color: #dee2e6;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
}

/* Avatar edit button */
.position-relative .btn-sm {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}



/* Ensure modals are visible */

.modal-backdrop{
    display: none!important; /* Hide the backdrop */
}
</style>