<template>
  <header ref="headerRef" class="page-header navbar-top bg-body-tertiary">
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-between w-100 pe-2">
        <RouterLink class="navbar-brand" to="/">
          <img src="/kassar_text.png" alt="" style="width: 150px;">
        </RouterLink>
        <form class="d-flex search-input-wrapper align-items-center">
          <input class="form-control me-2" type="search" placeholder="ស្វែងរកផលិតផល" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">ស្វែងរក</button>
        </form>
        <div class="d-none d-flex">
          <div class="ms-auto">
            <RouterLink class="btn btn-primary-outline rounded-5 px-4 me-1" to="/signup">បង្កើតគណនី</RouterLink>
          </div>
          <div class="ms-auto">
            <RouterLink class="btn btn-primary rounded-5 px-4" to="/auth">ចូលគណនី</RouterLink>
          </div>
        </div>
        <ul class="d-flex align-items-center navbar-action-btn m-0">
          <RouterLink class="btn-cart fs-4 text-secondary" to="/cart">
            <img src="@/assets/images/icons-img/cart.png" alt="">
          </RouterLink>
          <RouterLink class="btn-favorite fs-4 text-secondary" to="">
            <img src="@/assets/images/icons-img/love.png" alt="">
          </RouterLink>
          <div class="profile-wrapper position-relative">
            <button ref="btnClickProfile" class="rounded-circle user-pf" type="button">
              <img src="@/assets/images/user_pf_sample.jpg" alt="">
            </button>
            <ul class="dropdown-menu p-1" ref="profileDropdown">
              <li>
                <RouterLink to="/profile" href="#" class="d-flex align-items-center text-decoration-none p-0">
                  <div class="rounded-circle user-pf ">
                    <img src="@/assets/images/user_pf_sample.jpg" alt="">
                  </div>
                  <div class="name ms-2">
                    <h6 class="text-secondary m-0 fw-bold"><span>ចាន់ ធី</span></h6>
                  </div>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-gear me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">​ការកំណត់</h6>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-bag-heart me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ប្រវិត្តនៃការទិញ</h6>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-escape me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ចាកចេញ</h6>
                </RouterLink>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  </header>
  <nav class="navbar-bottom">
    <div class="container-fluid">
      <ul class="navbar-nav d-flex flex-row align-items-center justify-content-center">
        <li class="nav-item">
          <RouterLink class="nav-link mt-1" to=""><i class="bi bi-collection-play-fill fs-3"></i>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="/">
            <h6 class="m-0">ទំព័រដើម</h6>
          </RouterLink>
        </li>
        <li class="nav-item position-relative category-dropdown">
          <RouterLink class="nav-link btn-dropdown d-flex align-items-center" to="" type="button">
            <h6 class="m-0">ប្រភេទផលិតផល</h6> <i class="bi bi-chevron-down ms-1 fs-6 pt-1"></i>
          </RouterLink>
          <ul class="dropdown-menu">
            <li><RouterLink class="dropdown-item" to="/allproducts">ត្រី</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/allproducts">បន្លែ</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/allproducts">ផ្លែឈើ</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/allproducts">អង្ករ</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/allproducts">គ្រឿងទេស</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/allproducts">អាហារគ្រៀម</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/allproducts">អាហារសម្រន</RouterLink></li>
          </ul>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="">
            <h6 class="m-0">ផលិតផល</h6>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="/about">
            <h6 class="m-0">អំពីពួកយើង</h6>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="">
            <h6 class="m-0">ទំនាក់ទំនង</h6>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script setup>

import { ref, onMounted, onUnmounted } from "vue";

const headerRef = ref(null);
const toggleClass = "is-sticky";
const btnClickProfile = ref(null)
const profileDropdown = ref(null)


const handleScroll = () => {
  if (window.scrollY > 150) {
    headerRef.value.classList.add(toggleClass);
  } else {
    headerRef.value.classList.remove(toggleClass);
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  btnClickProfile.value.addEventListener('click', () => {
    profileDropdown.value.classList.toggle('active');
  })
});


</script>
