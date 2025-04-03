<template>
    <div class="tab-content bg-white rounded-2 border p-0">
      <div id="profile" class="tab-pane fade show active">
        <div class="container p-4">
          <div class="row align-items-center mb-4 tab-animation">
            <div class="col-md-8">
              <div class="d-flex align-items-center">
                <div class="position-relative me-4">
                  <div class="dropdown">
                    <img
                      :src="profile.avatar"
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
          </div>
          <hr class="my-2" />
          
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
                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="text-muted">គណនីអ៊ីមែល</span>
                  <span class="fw-medium">{{ profile.email }}</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="text-muted">លេខទូរស័ព្ទ</span>
                  <span class="fw-medium">{{ profile.phone || "មិនទាន់កំណត់" }}</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="text-muted">ជីវប្រវត្តិ</span>
                  <span class="fw-medium">{{ profile.history || "មិនទាន់កំណត់" }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <div class="d-grid d-md-flex justify-content-md-start tab-animation">
            <button class="btn btn-primary py-2 px-4" @click="openAvatarModal">
              <i class="bi bi-pencil-square me-2"></i>Change Avatar
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
                </div>
                <div class="modal-footer">
                  <button class="btn btn-outline-secondary" type="button" @click="closeCropModal">Cancel</button>
                  <button class="btn btn-primary" type="button" @click="performCrop" :disabled="!imgCrop.img_crop">
                    <i class="bi bi-check-circle me-1"></i> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from "vue";
  import axios from "axios";
  import { Cropper } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";
  import { Modal } from "bootstrap";
  
  const profile = ref({
    name: "",
    email: "",
    gender: "",
    phone: null,
    avatar: "",
    history: "",
  });
  
  const imgCrop = ref({
    img_crop: "",
  });
  const cropper = ref(null);
  const fileInput = ref(null);
  let cropModal = null;
  
  const showToast = (message) => {
    alert(message); // Simple alert for demo purposes
  };
  
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost/kassar_api/public/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      profile.value = response.data.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      showToast("Failed to load profile");
    }
  };
  
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
    event.target.value = ""; // Reset file input
  };
  
  const openAvatarModal = () => {
    if (!cropModal) {
      const modalEl = document.getElementById("avatar-crop-modal");
      cropModal = new Modal(modalEl, { backdrop: "static", keyboard: false });
    }
    cropModal.show();
  };
  
  const closeCropModal = () => {
    if (cropModal) {
      cropModal.hide();
    }
  };
  
  const onCrop = ({ canvas }) => {
    // You can add any additional logic here if needed
  };
  
  const performCrop = async () => {
    if (!cropper.value) return;
  
    const { canvas } = cropper.value.getResult();
    if (!canvas) {
      showToast("Please crop the image first");
      return;
    }
  
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("avatar", blob, "avatar.jpg");
  
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost/kassar_api/public/api/profile/avatar", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        profile.value.avatar = response.data.avatar;
        closeCropModal();
        showToast("Profile picture updated successfully");
      } catch (error) {
        console.error("Error updating avatar:", error);
        showToast("Failed to update profile picture");
      }
    }, "image/jpeg", 0.9);
  };
  
  onMounted(async () => {
    await fetchProfile();
  });
  </script>
  
  <style scoped>
  /* Avatar Styles */
  .avatar {
    width: 80px;
    height: 80px;
    border: 3px solid #007bff; /* Primary color border */
    transition: transform 0.2s; /* Smooth hover effect */
  }
  
  .avatar:hover {
    transform: scale(1.05); /* Slight scale on hover */
  }
  
  /* Card Styles */
  .card {
    border: none; /* Remove default border */
    border-radius: 8px; /* Rounded edges */
    background-color: #ffffff; /* White background */
  }
  
  /* List Group Item Styles */
  .list-group-item {
    padding: 15px; /* Comfortable padding */
  }
  
  /* Button Styles */
  .btn-primary {
    border-radius: 20px; /* Pill-shaped buttons */
    transition: background-color 0.3s; /* Smooth transition */
  }
  
  .btn-primary:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
  
  /* Modal Styles */
  .modal-content {
    border-radius: 10px; /* Rounded modal */
    z-index: 99999!important;
  }
  
  .modal-header {
    border-bottom: none; /* Clean header */
  }
  
  /* Cropper Styles */
  .cropper-container {
    width: 100%;
    height: 300px;
    background: #f8f9fa; /* Light gray background */
    border-radius: 8px; /* Rounded container */
    overflow: hidden; /* Prevent overflow */
  }
  
  /* Dropdown Menu Styles */
  .dropdown-menu {
    min-width: 10rem; /* Consistent dropdown width */
  }
  
  .modal {
      z-index: 1050 !important;
  }
  .modal-backdrop {
      z-index: 1040 !important;
  }
  </style>