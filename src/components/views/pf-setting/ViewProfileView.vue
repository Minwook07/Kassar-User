<template>
    <div class="container py-5">
      <div class="row">
        <!-- Profile Sidebar -->
        <div class="col-md-4">
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
          <ul class="profile-menu nav flex-column mt-4">
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="bi bi-gear me-2"></i> គណនី</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="bi bi-key me-2"></i> វិធីសាស្រ្តចូលគណី</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="bi bi-arrow-repeat me-2"></i> ប្រវត្តិប្រើប្រាស់</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="bi bi-geo-alt-fill me-2"></i> រៀបចំដឹកជញ្ជូន</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="bi bi-pencil-square me-2"></i> កែប្រែព័ត៌មាន</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="bi bi-trash3 me-2"></i> លុបគណី</a>
            </li>
          </ul>
        </div>
  
        <!-- Info Display -->
        <div class="col-md-8">
          <div class="info-display">
            <form>
              <div class="mt-3">
                <label for="inputName" class="form-label fw-bold">ឈ្មោះ</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="សុខ​ កញ្ញា"
                />
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <label for="inputEmail" class="form-label fw-bold">អាស័យដ្ឋានអ៊ីម៉ែល</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="sokkanha@1010gmail.com"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="typeCustomer" class="form-label fw-bold">ប្រភេទអ្នកប្រើប្រាស់</label>
                  <input
                    type="text"
                    class="form-control"
                    id="typeCustomer"
                    placeholder="ធម្មតា"
                  />
                </div>
              </div>
              <div class="mt-3">
                <label for="work" class="form-label fw-bold">ជីវប្រវត្តិ</label>
                <input
                  type="text"
                  class="form-control"
                  id="work"
                  placeholder="ស្ត្រីមេផ្ទះ"
                />
                <div class="mt-4">
                  <button class="btn btn-edit fw-bold">
                    <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Container Styling */
  
  /* Profile Styling */
  .profile {
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    background-color: #32ca83;
    color: #fff;
  }
  
  .profile-img {
    width: 120px;
    height: 120px;
    margin: 0 auto 15px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .profile-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .profile-info h1 {
    font-size: 1.8rem;
  }
  
  .profile-social a {
    font-size: 30px;
    margin: 0 10px;
    color: #fff;
    transition: color 0.3s ease;
  }
  
  .profile-social a:hover {
    color: #d4edda;
  }
  
  /* Profile Menu */
  .profile-menu {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-menu .nav-link { 
    color: #555;
    font-size: 1rem;
    padding: 12px 15px;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .profile-menu .nav-link:hover {
    background-color: #e9ecef;
    color: #32ca83;
  }
  .profile-menu .nav-link i{
    background-color: #8e8e8e;
    color: #ffffff;
    border-radius:100%;
    padding: 10px;
  }
  
  /* Info Display */
  .info-display {
    padding: 25px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .info-display .form-label {
    font-size: 1rem;
    color: #333;
  }
  
  .info-display .form-control {
    border: 1px solid #ddd;
    background-color: #f6f7f9;
    border-radius: 8px;
    padding: 15px;
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
  </style>
  