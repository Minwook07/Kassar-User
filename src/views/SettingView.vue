<template>
  <div class="container py-5" data-aos="fade-up" data-aos-duration="800">
    <div class="row g-4">
      <!-- Sidebar Column -->
      <div class="col-12 col-md-3" data-aos="fade-right" data-aos-delay="100">
        <!-- Profile Card -->
        <div class="row">
          <div class="col-lg-12 col-md-6 col-lg-4">
            <div class="profile-card bg-white border rounded-2 p-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div class="profile-img-container mb-4 d-flex justify-content-center">
                <img src="@/assets/images/user_pf_sample.jpg" alt="Profile Image" class="pf-user img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover;" />
              </div>
              <div class="profile-info text-center">
                <h2 class="profile-name fs-4 mb-3">ស្រឿន​ ចន្ធី</h2>
                <div class="profile-social d-flex justify-content-center gap-3 mt-3">
                  <a href="https://www.facebook.com/profile.php?id=100036610731530&mibextid=LQQJ4d" class="social-link fs-5 text-decoration-none">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="#" class="social-link fs-5 text-decoration-none">
                    <i class="bi bi-tiktok"></i>
                  </a>
                  <a href="https://www.instagram.com/thyyyyy_o?igsh=ZWVmMzIwd2R4Nmw3&utm_source=qr" class="social-link fs-5 text-decoration-none">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="https://t.me/Chanthy_Sreoun7" class="social-link fs-5 text-decoration-none">
                    <i class="bi bi-telegram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Menu using Bootstrap Tabs -->
        <div class="user-navlist border rounded-2 border overflow-hidden">
          <ul class="nav nav-tabs flex-column border-0">
            <li class="nav-item">
              <a class="nav-link active border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#profile">
                <i class="bi bi-person me-2"></i> គណនី
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#usage-history">
                <i class="bi bi-clock-history me-2"></i> ប្រវត្តិការប្រើប្រាស់
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#login-method">
                <i class="bi bi-lock me-2"></i> វិធីសាស្រ្តចូលប្រើប្រាស់គណនី
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#delivery-method">
                <i class="bi bi-truck me-2"></i> រៀបចំដឹកជញ្ជូន
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0 py-3 ps-4 tab-link" data-bs-toggle="tab" href="#delete-account">
                <i class="bi bi-trash me-2"></i> លុបគណនី
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0 py-3 ps-4" href="@/login">
                <i class="bi bi-box-arrow-right me-2"></i> ចាកចេញពីគនណី
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-md-9">
        <div class="tab-content bg-white rounded-2 border p-0">
          <!-- Profile Tab -->
          <div id="profile" class="tab-pane fade show active">
            <div class="container p-4">
              <!-- Header with profile picture and save button -->
              <div class="row align-items-center mb-4 tab-animation">
                <div class="col-md-8">
                  <div class="d-flex align-items-center">
                    <div class="position-relative me-4">
                      <img 
                        src="@/assets/images/user_pf_sample.jpg" 
                        alt="Profile" 
                        class="rounded-circle border border-3 border-primary-subtle" 
                        style="width: 80px; height: 80px; object-fit: cover;"
                      >
                    </div>
                    <div>
                      <h5 class="fw-semibold mb-1">ស្រឿន ចន្ធី</h5>
                      <p class="text-muted mb-0">chanthy0105@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                  <button class="btn btn-primary px-4 py-2">
                    <i class="bi bi-bag-heart me-1 fs-5 pt-1"></i> ស្នើរជាអ្នកលក់
                  </button>
                </div>
              </div>
              <hr class="my-2">
              <!-- Profile information -->
              <div class="card border-0 shadow-sm mb-4 tab-animation">
                <div class="card-body p-0">
                  <div class="list-group list-group-flush">
                    <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                      <span class="text-muted">ឈ្មោះ</span>
                      <span class="fw-medium">ឈ្មោះរបស់អ្នក</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                      <span class="text-muted">អាសយដ្ឋានអ៊ីមែល</span>
                      <span class="fw-medium">chanthy0105@gmail.com</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                      <span class="text-muted">ប្រភេទអ្នកប្រើប្រាស់</span>
                      <span class="fw-medium">អ្នកទិញ</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                      <span class="text-muted">លេខទូរស័ព្ទ</span>
                      <span class="fw-medium">0167930220</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center py-3 mt-2">
                      <span class="text-muted">ជីវប្រវត្តិ</span>
                      <span class="fw-medium">កសិករ</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Edit Button to Trigger Modal -->
<!-- Button to trigger modal -->
<div class="d-grid d-md-flex justify-content-md-start tab-animation">
    <button class="btn btn-primary py-2 px-4" data-bs-toggle="modal" data-bs-target="#editProfileModal">
        <i class="bi bi-pencil-square me-2"></i> កែតម្រូវ
    </button>
</div>

<!-- Modal for Editing Profile -->

            </div>
          </div>

  <!-- Modal -->
  <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true" data-bs-backdrop="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" data-aos="zoom-in" data-aos-duration="400">
            <div class="modal-header">
                <h5 class="modal-title" id="editProfileModalLabel">កែតម្រូវព័ត៌មានផ្ទាល់ខ្លួន</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Form for Editing Profile -->
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">ឈ្មោះ</label>
                        <input type="text" class="form-control" id="name" value="ឈ្មោះរបស់អ្នក">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">អាសយដ្ឋានអ៊ីមែល</label>
                        <input type="email" class="form-control" id="email" value="chanthy0105@gmail.com">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                        <input type="text" class="form-control" id="phone" value="0167930220">
                    </div>
                    <div class="mb-3">
                        <label for="bio" class="form-label">ជីវប្រវត្តិ</label>
                        <textarea class="form-control" id="bio" rows="4" style="resize: none;">កសិករ</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">បិទ</button>
                <button type="button" class="btn btn-primary">រក្សាទុក</button>
            </div>
        </div>
    </div>
</div>

          <!-- Order History Tab -->
          <div id="usage-history" class="tab-pane fade p-4">
            <h3 class="fw-bold text-primary mb-4 tab-animation">ប្រវត្តិការបញ្ជាទិញ</h3>

            <div class="orders-list bg-white rounded-2 border p-4 mb-4 border hover-effect tab-animation">
              <div class="d-flex flex-column flex-md-row align-items-md-center gap-3">
                <div class="order-img">
                  <img src="@/assets/images/cart/veget-1.jpg" alt="Order" class="rounded-3"
                    style="width: 80px; height: 80px; object-fit: cover;" />
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
                  <img src="@/assets/images/cart/veget-1.jpg" alt="Order" class="rounded-3"
                    style="width: 80px; height: 80px; object-fit: cover;" />
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
                  <img src="@/assets/images/cart/veget-1.jpg" alt="Order" class="rounded-3"
                    style="width: 80px; height: 80px; object-fit: cover;" />
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
            <h4 class="fw-bold text-primary mb-3 tab-animation">វិធីសាស្រ្តចូលប្រើប្រាស់គណនី</h4>
            <p class="text-muted mb-4 tab-animation">
              លោកអ្នកបានចូលគណនីដោយអនុវត្តន៍តាមជំហានដូចខាងក្រោម
            </p>

            <form class="auth-form">
              <div class="mb-4 tab-animation">
                <label class="form-label fw-semibold mb-2">អាស័យដ្ផានអ៊ីម៊ែល</label>
                <div class="input-group">
                  <input type="email" class="form-control form-control-lg rounded-start"
                    placeholder="chanthy0105@gmail.com" />
                  <button type="button" class="btn btn-primary rounded-end px-3">
                    <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                  </button>
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
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel"
    aria-hidden="true " data-bs-backdrop="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" data-aos="zoom-in" data-aos-duration="300">
        <div class="modal-header">
          <h5 class="modal-title fs-5 fw-bold text-danger" id="deleteConfirmModalLabel">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>បញ្ជាក់ការលុបគណនី
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="mb-4">លោកអ្នកនឹងបាត់បង់ទិន្នន័យទាំងអស់ដែលបានបង្កើតក្នុងគណនីនេះ។<br>
            គណនីនេះមិនអាចយកវិញបាននោះទេ។</p>

          <div class="mb-4">
            <label class="form-label fw-semibold mb-2">បញ្ចូលពាក្យសម្ងាត់</label>
            <input type="password" id="password" class="form-control form-control-lg rounded-3" 
              placeholder="បញ្ចូលពាក្យសម្ងាត់" />
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold mb-2">ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់</label>
            <input type="password" id="confirm_password" class="form-control form-control-lg rounded-3"
              placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary px-4 py-2 rounded-2" data-bs-dismiss="modal">បោះបង់</button>
          <button type="button" id="confirmDelete" class="btn btn-danger px-4 py-2 rounded-2">យល់ព្រមលុប</button>
        </div>
      </div>
    </div>
  </div>




</template>

<script setup>
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animation library with performance-focused settings
  AOS.init({
    once: true,
    offset: 40,
    duration: 500,
    easing: 'ease-out',
    disable: window.innerWidth < 768 // Disable on mobile for better performance
  });

  // Enhanced tab animation management
  const handleTabAnimations = () => {
    // Get active tab
    const activeTab = document.querySelector('.tab-pane.active');
    if (!activeTab) return;
    
    // Select animation elements in active tab
    const animElements = activeTab.querySelectorAll('.tab-animation');
    
    // Reset animations
    animElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
    });
    
    // Staggered animations with requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      animElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 50 * (index + 1));
      });
    });
  };

  // Initialize animations for default tab
  handleTabAnimations();
  
  // Tab change listeners
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', () => {
      handleTabAnimations();
      // Update URL hash for shareable links (optional)
      history.pushState(null, null, tabLink.getAttribute('href'));
    });
  });

  // Account deletion handling with improved UX
  const setupDeleteAccount = () => {
    const deleteModal = document.getElementById('deleteConfirmModal');
    const deleteButton = document.getElementById('confirmDelete');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const testPassword = 'test123'; // In production, this would be validated server-side
    
    if (!deleteButton) return;
    
    deleteButton.addEventListener('click', () => {
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
      
      // Validation with focused error handling
      if (!password || !confirmPassword) {
        showFormError(passwordInput, 'សូមបំពេញពាក្យសម្ងាត់ទាំងអស់!');
        return;
      }
      
      if (password !== confirmPassword) {
        showFormError(confirmPasswordInput, 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ!');
        return;
      }
      
      if (password !== testPassword) {
        showFormError(passwordInput, 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ!');
        return;
      }
      
      // Success flow
      bootstrap.Modal.getInstance(deleteModal).hide();
      
      // Show animated success message
      showSuccessOverlay('គណនីត្រូវបានលុបដោយជោគជ័យ!');
      
      // Redirect after animation completes
      setTimeout(() => {
        window.location.href = '/';
      }, 1800);
    });
  };
  
  // Helper to show form validation errors
  const showFormError = (inputElement, message) => {
    // Clear previous errors
    clearFormErrors();
    
    // Add error styling
    inputElement.classList.add('is-invalid');
    
    // Create and insert error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.innerText = message;
    inputElement.parentNode.appendChild(errorDiv);
    
    // Focus the input
    inputElement.focus();
  };
  
  // Helper to clear form errors
  const clearFormErrors = () => {
    document.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
      el.remove();
    });
  };
  
  // Helper to show success overlay
  const showSuccessOverlay = (message) => {
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    successOverlay.innerHTML = `
      <div class="success-message">
        <i class="bi bi-check-circle-fill"></i>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(successOverlay);
  };
  
  // Initialize delete account functionality
  setupDeleteAccount();
  
  // Throttled window resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      AOS.refresh();
    }, 200);
  });
  
  // Add special hover effects to cards and other elements
  document.querySelectorAll('.hover-effect').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-4px)';
      el.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.08)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0)';
      el.style.boxShadow = 'none';
    });
  });
});

</script>
  <!-- Add this CSS to the head of your document -->
  <style scoped>/* Optimized Animation Styles */
/* Core Animation System */
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

