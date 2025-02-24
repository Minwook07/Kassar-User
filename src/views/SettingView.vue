<template>
  <div class="container py-5">
    <div class="row g-4">
      <!-- Sidebar Column -->
      <div class="col-12 col-md-3"> <!-- Full width on small devices, 3 columns on medium and up -->
  <!-- Profile Card -->
  <div class="profile-card">
    <div class="profile-img-container">
      <img src="@/assets/images/user_pf_sample.jpg" alt="Profile Image" class="profile-img w-100" /> <!-- Make image responsive -->
    </div>
    <div class="profile-info text-center">
      <h2 class="profile-name">ស្រឿន​ ចន្ធី</h2>
      <div class="profile-social">
        <a href="https://www.facebook.com/profile.php?id=100036610731530&mibextid=LQQJ4d" class="social-link"><i class="bi bi-facebook"></i></a>
        <a href="#" class="social-link"><i class="bi bi-tiktok"></i></a>
        <a href="https://www.instagram.com/thyyyyy_o?igsh=ZWVmMzIwd2R4Nmw3&utm_source=qr" class="social-link"><i class="bi bi-instagram"></i></a>
        <a href="https://t.me/Chanthy_Sreoun7" class="social-link"><i class="bi bi-telegram"></i></a>
      </div>
    </div>
  </div>

  <!-- Navigation Menu using Bootstrap Tabs -->
  <div class="user-navlist">
    <ul class="nav nav-tabs flex-column">
      <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#profile">
          <i class="bi bi-person"></i> គណនី
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#usage-history">
          <i class="bi bi-clock-history"></i> ប្រវត្តិការប្រើប្រាស់
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#login-method">
          <i class="bi bi-lock"></i> វិធីសាស្រ្តចូលប្រើប្រាស់គណនី
        </a>
      </li>
      <!-- Delivery Tab -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#delivery-method">
          <i class="bi bi-truck"></i> រៀបចំដឹកជញ្ជូន
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#delete-account">
          <i class="bi bi-trash"></i> លុបគណនី
        </a>
      </li>
    </ul>
  </div>
</div>


      <!-- Main Content -->
      <div class="col-md-9">
        <div class="tab-content">
          <!-- Profile Tab -->
          <div id="profile" class="tab-pane fade show active">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold text-primary mb-0">គណនី</h2>
    <button class="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
      <i class="bi bi-check2-circle me-2"></i> រក្សាទុក
    </button>
  </div>

  <form class="profile-form p-4 bg-white rounded-4">
    <div class="mb-3">
      <label class="form-label fw-semibold">ឈ្មោះ</label>
      <input type="text" class="form-control form-control-lg rounded-3" placeholder="ស្រឿន​ ចន្ធី" />
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label fw-semibold">អាសយដ្ឋានអ៊ីមែល</label>
          <input type="email" class="form-control form-control-lg rounded-3" placeholder="chanthy0105@gmail.com" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label fw-semibold">ប្រភេទអ្នកប្រើប្រាស់</label>
          <input type="text" class="form-control form-control-lg rounded-3" placeholder="ធម្មតា" />
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">ជីវប្រវត្តិ</label>
      <textarea class="form-control form-control-lg rounded-3" rows="4" placeholder="កសិករ" style="resize: none;"></textarea>
    </div>

    <button class="btn  btn-edit btn-primary  py-2 rounded-pill shadow-sm">
      <i class="bi bi-pencil-square me-2"></i> កែតម្រូវ
    </button>
  </form>
</div>


          <!-- Order History Tab -->
          <div id="usage-history" class="tab-pane fade">
            <h3 class="content-title">ប្រវត្តិការបញ្ជាទិញ</h3>
            <div class="orders-list">
              <div class="order-item">
                <div class="order-img">
                  <img src="@/assets/images/Cart/img-2.jpg" alt="Order" />
                </div>
                <div class="order-details">
                  <h4>ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>
                  <p class="quantity">ចំនួន 1គីឡូក្រាម</p>
                  <p class="price">តម្លៃ ១០០០០ រៀល</p>
                </div>
                <div class="order-status">
                  <span class="status-badge">Success</span>
                  <span class="order-date">2023-01-15 17:30:33</span>
                </div>
              </div>
            </div>
            <div class="orders-list mt-2">
              <div class="order-item">
                <div class="order-img">
                  <img src="@/assets/images/Cart/img-2.jpg" alt="Order" />
                </div>
                <div class="order-details">
                  <h4>ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>
                  <p class="quantity">ចំនួន 1គីឡូក្រាម</p>
                  <p class="price">តម្លៃ ១០០០០ រៀល</p>
                </div>
                <div class="order-status">
                  <span class="status-badge">Success</span>
                  <span class="order-date">2023-01-15 17:30:33</span>
                </div>
              </div>
            </div>
            <div class="orders-list mt-2">
              <div class="order-item">
                <div class="order-img">
                  <img src="@/assets/images/Cart/img-2.jpg" alt="Order" />
                </div>
                <div class="order-details">
                  <h4>ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>
                  <p class="quantity">ចំនួន 1គីឡូក្រាម</p>
                  <p class="price">តម្លៃ ១០០០០ រៀល</p>
                </div>
                <div class="order-status">
                  <span class="status-badge">Success</span>
                  <span class="order-date">2023-01-15 17:30:33</span>
                </div>
              </div>
            </div>
            <div class="orders-list mt-2">
              <div class="order-item">
                <div class="order-img">
                  <img src="@/assets/images/Cart/img-2.jpg" alt="Order" />
                </div>
                <div class="order-details">
                  <h4>ផ្កាខាត់ណាកំពត កូនពូMONYមីងវន</h4>
                  <p class="quantity">ចំនួន 1គីឡូក្រាម</p>
                  <p class="price">តម្លៃ ១០០០០ រៀល</p>
                </div>
                <div class="order-status">
                  <span class="status-badge">Success</span>
                  <span class="order-date">2023-01-15 17:30:33</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Login Method Tab -->
          <div id="login-method" class="tab-pane fade">
            <div class="auth-card">
              <h4 class="auth-title">វិធីសាស្រ្តចូលប្រើប្រាស់គណនី</h4>
              <p class="auth-subtitle">
                លោកអ្នកបានចូលគណនីដោយអនុវត្តន៍តាមជំហានដូចខាងក្រោម
              </p>

              <form class="auth-form">
                <div class="form-group">
                  <label>អាស័យដ្ផានអ៊ីម៊ែល</label>
                  <div class="input-group">
                    <input type="email" class="form-control" placeholder="chanthy0105@gmail.com" />
                    <button type="button" class="btn-verify">
                      <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                    </button>
                  </div>
                </div>

                <div class="form-group">
                  <label>ពាក្យសម្ងាត់</label>
                  <div class="input-group d-flex">
                    <input type="password" class="form-control" placeholder="សូមបំពេញពាក្យសម្ងាត់" />
                    <button type="button" class="btn-verify">
                      <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                    </button>
                  </div>
                </div>

                <div class="info-box">
                  <h6>
                    ចាប់ផ្តើមការផ្ទៀងផ្ទាត់ការកំណត់ប្រព័ន្ធសុវត្ថិភាពសម្រាប់គណនី
                  </h6>
                  <p >
                    ដើម្បីមានសុវត្ថិភាពខ្ពស់របស់គណនីអ្នកការផ្ទៀងផ្ទាត់ពីរកត្តាបន្ថែមស្រទាប់សុវត្ថិភាពបន្ថែមទៅក្នុងគណនីរបស់អ្នក។
                    ដើម្បីចូល អ្នកនឹងត្រូវផ្តល់លេខកូដ 6 ខ្ទង់
                    ព្រមទាំងអនុវត្តតាមគោលការណ៍របស់គេហទំព័រ
                  </p>
                  <button type="button" class="btn-apply">
                    <i class="bi bi-search me-2"></i>អានបន្ថែម
                  </button>
                </div>
              </form>
            </div>
          </div>
          <!-- Edit Delivery Tab -->
          <div id="delivery-method" class="tab-pane fade">
            <h3 class="content-title">អាស័យដ្ឋាន</h3>
            <p class="text-muted mb-4">
              រៀបចំអាសយដ្ឋានដឹកជញ្ជូន សូមលោកអ្នកបញ្ចូលព័ត៌មានទីតាំងអាស័យដ្ផាន
            </p>
            <div class="address-card mb-4">
              <p class="mb-0">
                ផ្ទះលេខ51 ផ្លូវលេខ205 សង្កាត់ទឹកល្អក2 ខណ្ឌទួលគោក រាជធានីភ្នំពេញ
              </p>
            </div>
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.71343543293!2d104.89073297481734!3d11.572389088628979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951001c8a7b55%3A0xa95ff42ea192073c!2sANT%20Technology%20Training%20School%202!5e0!3m2!1sen!2skh!4v1739332119459!5m2!1sen!2skh"
                width="100%" height="450" style="border: 0" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          <!-- Delete Account Tab -->
          <div id="delete-account" class="tab-pane fade">
            <div class="delete-container">
              <div>
                <h2 class="fw-bold mb-0">លុបគណនី</h2>
              </div>

              <div class="bg-red">
                <div class="d-flex align-items-center gap-2 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="warning-icon bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path
                      d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <span>តើអ្នកប្រាកដថាចង់លុបគណនីរបស់អ្នកមែនទេ?</span>
                </div>
                <p class="mb-0 mt-2">
                  ប្រសិនបើអ្នកលុបគណនីរបស់អ្នក ទិន្នន័យ ពត៌មាន
                  និងទាំងអស់របស់អ្នកនឹងត្រូវបានលុបជាអចិន្ត្រៃយ៍។
                </p>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-3">
                <button type="button" class="btn btn-delete">លុប</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>

</style>
