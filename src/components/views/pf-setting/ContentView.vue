<template>
  <!-- Navigation Menu using Bootstrap Tabs -->
  <div class="tab-content bg-white rounded-2 border p-0">
    <div id="profile" class="tab-pane fade show active">
      <div class="container p-4">

        <!-- Header with profile picture and save button -->
        <div class="row align-items-center mb-4 tab-animation">
          <div class="col-md-8">
            <div class="d-flex align-items-center">
              <div class="position-relative me-4">
                <img
                  :src="profile.avatar || '@/assets/images/user_pf_sample.jpg'"
                  alt="Profile"
                  class="rounded-circle border border-3 border-primary-subtle"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  @change="updateAvatar"
                  style="position: absolute; opacity: 0; width: 80px; height: 80px; cursor: pointer;"
                  title="Click to change avatar"
                />
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
                <span class="fw-medium">{{ profile.gender }}</span> <!-- Displays 'Male' or 'Female' -->
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
                <span class="fw-medium">{{ profile.bio || "មិនទាន់កំណត់" }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Button to trigger modal -->
        <div class="d-grid d-md-flex justify-content-md-start tab-animation">
          <button
            class="btn btn-primary py-2 px-4"
            data-bs-toggle="modal"
            data-bs-target="#editProfileModal"
            @click="prepareEditForm"
          >
            <i class="bi bi-pencil-square me-2"></i> កែតម្រូវ
          </button>
        </div>

        <!-- Modal for Editing Profile -->
        <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true" data-bs-backdrop="false">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" data-aos="zoom-in" data-aos-duration="400">
              <div class="modal-header">
                <h5 class="modal-title" id="editProfileModalLabel">កែតម្រូវព័ត៌មានផ្ទាល់ខ្លួន</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <!-- Form for Editing Profile -->
                <form @submit.prevent="updateProfile">
                  <div class="mb-3">
                    <label for="name" class="form-label">ឈ្មោះ</label>
                    <input type="text" class="form-control" id="name" v-model="editForm.name" />
                  </div>
                  <div class="mb-3">
                    <label for="gender" class="form-label">ភេទ</label>
                    <select class="form-control" id="gender" v-model="editForm.gender">
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">គណនីអ៊ីមែល</label>
                    <input type="email" class="form-control" id="email" v-model="editForm.email" />
                  </div>
                  <div class="mb-3">
                    <label for="role" class="form-label">ប្រភេទអ្នកប្រើប្រាស់</label>
                    <select class="form-control" id="role" v-model="editForm.role">
                      <option value="Regular User">អតិថិជន</option>
                      <option value="Seller User">អ្នកលក់</option>
                      <option value="System Admin">អ្នកគ្រប់គ្រងប្រព័ន្ធ</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                    <input type="text" class="form-control" id="phone" v-model="editForm.phone" />
                  </div>
                  <div class="mb-3">
                    <label for="bio" class="form-label">ជីវប្រវត្តិ</label>
                    <textarea class="form-control" id="bio" rows="4" style="resize: none" v-model="editForm.bio"></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">បិទ</button>
                    <button type="submit" class="btn btn-primary">រក្សាទុក</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const profile = ref({
  id: null,
  name: "",
  email: "",
  gender: null,
  phone: null,
  avatar: "",
  roles: [],
  address: {
    province: null,
    district: null,
    commune: null,
    village: null,
  },
});

const editForm = ref({
  name: "",
  email: "",
  phone: "",
  gender: 1, // Default gender; will be set later
  bio: "",
  role: "",
});

// Role translations
const roleTranslations = {
  "Regular User": "អតិថិជន",
  "Seller User": "អ្នកលក់",
  "System Admin": "អ្នកគ្រប់គ្រងប្រព័ន្ធ",
};

// Function to translate roles
const translateRole = (roleName) => {
  return roleTranslations[roleName] || roleName;
};
const getToken= () => {

  return localStorage.getItem("token") || sessionStorage.getItem("token");
}
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

    // Map gender ID to string
    profile.value.gender = profile.value.gender === 1 ? "Male" : "Female"; 

    // Initialize edit form with current data
    editForm.value = {
      name: profile.value.name,
      email: profile.value.email,
      phone: profile.value.phone || "",
      gender: profile.value.gender === "Male" ? 1 : 2, // Set the original gender ID
      role: profile.value.roles[0]?.name || "", // Set the role
      bio: profile.value.bio || "",
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// Prepare the edit form before opening the modal
const prepareEditForm = () => {
  editForm.value = {
    name: profile.value.name,
    email: profile.value.email,
    phone: profile.value.phone || "",
    gender: profile.value.gender === "Male" ? 1 : 2, // Ensure gender is set correctly
    role: profile.value.roles[0]?.name || "", // Ensure role is set correctly
    bio: profile.value.bio || "",
  };
};

// Update profile
const updateProfile = async () => {
  try {
    await axios.post("/api/profile", editForm.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchProfile(); // Refresh profile data
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Update avatar
const updateAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post("/api/profile/avatar", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    profile.value.avatar = response.data.avatar;
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
};

// On component mount, fetch the profile
onMounted(() => {
  fetchProfile();
});
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
}

.tab-pane.active .tab-animation {
  opacity: 1;
  transform: translateY(0);
}

</style>