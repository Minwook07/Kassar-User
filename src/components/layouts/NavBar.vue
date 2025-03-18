<template>
  <header ref="headerRef" class="page-header  bg-body-tertiary">
    <div class="container-fluid p-0">
      <div class="d-flex align-items-center justify-content-between w-100 p-2 navbar-top ">
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
            <RouterLink class="btn btn-primary rounded-5 px-4" to="/login">ចូលគណនី</RouterLink>
          </div>
        </div>
        <button class="btn btn-outline-primary pt-2 d-block d-lg-none" type="button" @click="showOffcanvas">
          <i class="bi bi-list fw-bold"></i>
        </button>
        <ul class="d-none d-lg-flex align-items-center navbar-action-btn m-0 p-0">
          <RouterLink class="btn-cart fs-4 text-secondary me-2" to="/cart">
            <img src="@/assets/images/icons-img/cart.png" alt="">
          </RouterLink>
          <RouterLink class="btn-favorite fs-4 text-secondary me-2" to="/wishlist">
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
                <RouterLink to="/profile" class="d-flex align-items-center text-decoration-none p-0">
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
                <RouterLink to="/login" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-escape me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ចាកចេញ</h6>
                </RouterLink>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
    <nav class="navbar-bottom d-none d-lg-block">
      <div class="container-fluid">
        <ul class="navbar-nav d-flex flex-row align-items-center justify-content-center">
          <li class="nav-item">
            <RouterLink class="nav-link mt-1" to="/video"><i class="bi bi-collection-play-fill fs-3"></i>
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
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">ត្រី</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">បន្លែ</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">ផ្លែឈើ</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">អង្ករ</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">គ្រឿងទេស</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">អាហារគ្រៀម</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/allproducts">អាហារសម្រន</RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center" to="/allproducts">
              <h6 class="m-0">ផលិតផល</h6>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center" to="/about">
              <h6 class="m-0">អំពីពួកយើង</h6>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center" to="/contact">
              <h6 class="m-0">ទំនាក់ទំនង</h6>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- offcanvas for navbar -->
  <div class="offcanvas offcanvas-end home-offcanvas" tabindex="-1" id="myOffcanvas"
    aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <RouterLink class="navbar-brand" to="/">
        <img src="/kassar_text.png" alt="" style="width: 150px;">
      </RouterLink>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-2">
      <ul class="navbar-nav p-0 list-unstyled">
        <li class="nav-item profile-wrapper mb-2">
          <RouterLink to="/profile" href="#" class="d-flex align-items-center text-decoration-none p-0">
            <div class="rounded-circle user-pf ">
              <img src="@/assets/images/user_pf_sample.jpg" alt="">
            </div>
            <div class="name ms-2">
              <h5 class="text-primary m-0 fw-bold"><span>ចាន់ ធី</span></h5>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/">ទំព័រដើម</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="">វីដេអូ</RouterLink>
        </li>
        <li class="nav-item">
          <a class="bg-transparent w-100 d-flex justify-content-between align-items-center" @click="toggleCollapse">
            <span>ប្រភេទផលិតផល</span> <i class="bi bi-chevron-down ms-1 fs-6 pt-1"></i>
          </a>
        </li>
        <div class="collapse" id="categoryCollapse">
          <ul class="category-list list-unstyled">
            <li>
              <RouterLink class="category-item" to="/allproducts">ត្រី</RouterLink>
            </li>
            <li>
              <RouterLink class="category-item" to="/allproducts">បន្លែ</RouterLink>
            </li>
            <li>
              <RouterLink class="category-item" to="/allproducts">ផ្លែឈើ</RouterLink>
            </li>
            <li>
              <RouterLink class="category-item" to="/allproducts">អង្ករ</RouterLink>
            </li>
            <li>
              <RouterLink class="category-item" to="/allproducts">គ្រឿងទេស</RouterLink>
            </li>
            <li>
              <RouterLink class="category-item" to="/allproducts">អាហារគ្រៀម</RouterLink>
            </li>
            <li>
              <RouterLink class="category-item" to="/allproducts">អាហារសម្រន</RouterLink>
            </li>
          </ul>
        </div>
        <li class="nav-item">
          <RouterLink to="/allproducts">ផលិតផល</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/cart">កន្ត្រក</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/wishlist">ចូលចិត្ត</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/contact">ទំនាក់ទំនង</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about">អំពីពួកយើង</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, watch } from "vue";
import { Offcanvas, Collapse } from "bootstrap";
import { onBeforeRouteLeave } from "vue-router";

const headerRef = ref(null);
const toggleClass = "is-sticky";
const btnClickProfile = ref(null)
const profileDropdown = ref(null)
const offcanvasInstance = ref(null);
let collapseInstance = null;

const handleScroll = () => {
  if (window.scrollY > 390) {
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
  offcanvasInstance.value = new Offcanvas(document.getElementById('myOffcanvas'));
  collapseInstance = new Collapse(document.getElementById('categoryCollapse'), { toggle: false });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

onBeforeRouteLeave(() => {
  hideOffcanvas();
});

const showOffcanvas = () => {
  offcanvasInstance.value?.show();
};

const hideOffcanvas = () => {
  offcanvasInstance.value?.hide();
};


const toggleCollapse = () => {
  if (collapseInstance) {
    collapseInstance.toggle();
  }
};

</script>
