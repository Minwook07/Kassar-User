<template>
  <header ref="headerRef" class="page-header bg-body-tertiary">
    <div class="container-fluid p-0">
      <div class="d-flex align-items-center justify-content-between w-100 p-2 navbar-top ">
        <RouterLink class="navbar-brand" to="/">
          <img src="/kassar_text.png" alt="" style="width: 150px;">
        </RouterLink>
        <form class="d-flex search-input-wrapper align-items-center">
          <div class="position-relative w-100">
            <input class="form-control me-2" type="search" placeholder="ស្វែងរកផលិតផល" aria-label="Search">
            <button class="btn btn-outline-success position-absolute top-50 end-0 translate-middle-y border-0"
              type="submit">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </form>

        <div v-if="!token" class="d-flex">
          <div class="ms-auto d-none d-lg-inline">
            <RouterLink class="btn btn-outline-primary rounded-5 px-4 me-1 d-flex align-items-center" to="/signup">
              <i class="bi bi-person-plus me-2"></i>
              <span class="d-none d-lg-inline">បង្កើតគណនី</span>
            </RouterLink>
          </div>
          <div class="ms-auto">
            <RouterLink class="btn btn-primary rounded-5 px-2 px-lg-4 d-flex align-items-center" to="/login">
              <i class="bi bi-box-arrow-in-right me-2"></i>
              <span class="d-none d-lg-inline">ចូលគណនី</span>
            </RouterLink>
          </div>
        </div>

        <!-- Button for offcanvas -->
        <button class="btn btn-outline-primary pt-2 d-block d-lg-none" type="button" @click="showOffcanvas">
          <i class="bi bi-list fw-bold"></i>
        </button>

        <ul v-if="token" class="d-none d-lg-flex align-items-center navbar-action-btn m-0 p-0">
          <RouterLink class="btn-cart fs-4 text-secondary me-2" to="/cart">
            <div class="position-relative">
              <img src="@/assets/images/icons-img/cart.png" alt="">
              <span v-if="cartListStore"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size: 11px; top: 10px!important">
                {{ cartListStore.cartLists.length }}
              </span>
            </div>
          </RouterLink>
          <RouterLink class="position-relative btn-favorite fs-4 text-secondary me-3" to="/wishlist">
            <img src="@/assets/images/icons-img/love.png" alt="">
            <span v-if="cartListStore"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: 11px; top: 10px!important">
              {{ cartListStore.countFavItem }}
            </span>
          </RouterLink>
          <div class="profile-wrapper position-relative">
            <button ref="btnClickProfile" class="rounded-circle user-pf" type="button">
              <img :src="profileStore.profile.avatar" alt="">
            </button>
            <ul class="dropdown-menu p-1" ref="profileDropdown">
              <li>
                <RouterLink to="/profile" class="d-flex align-items-center text-decoration-none p-0">
                  <div class="rounded-circle user-pf">
                    <img :src="profileStore.profile.avatar" alt="">
                  </div>
                  <div class="name ms-2">
                    <h6 class="text-secondary m-0 fw-bold"><span>
                        {{
                          profileStore.profile?.roles?.length &&
                            profileStore.profile.roles[0].name === 'role_seller_user'
                            ? profileStore.profile.shop_name
                        : profileStore.profile?.name
                        }}
                      </span></h6>
                    <p class="text-muted m-0" style="font-size: 12px;">{{ profileStore.profile.email }}</p>
                  </div>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/profile" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-gear me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ការកំណត់</h6>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-bag-heart me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ប្រវិត្តនៃការទិញ</h6>
                </RouterLink>
              </li>
              <li>
                <a href="https://adm.kassar.publicvm.com/" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-kanban me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ការគ្រប់គ្រង</h6>
                </a>
              </li>
              <li>
                <a href="#" @click.prevent="logout" class="d-flex align-items-center text-decoration-none p-0">
                  <i class="bi bi-escape me-1 text-secondary fs-5 pt-1"></i>
                  <h6 class="text-black">ចាកចេញ</h6>
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>

    <!-- Navbar bottom remains unchanged -->
    <nav class="navbar-bottom d-none d-lg-block">
      <div class="container-fluid">
        <ul class="navbar-nav d-flex flex-row align-items-center justify-content-center">
          <li class="nav-item">
            <RouterLink class="nav-link mt-1" :to="{ path: '/video', query: { id: allVideos.lastVideoId } }">
              <i class="bi bi-collection-play-fill fs-3"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center" to="/">
              <h6 class="m-0">ទំព័រដើម</h6>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center" to="/allproducts">
              <h6 class="m-0">ផលិតផល</h6>
            </RouterLink>
          </li>
          <li class="nav-item position-relative category-dropdown">
            <RouterLink class="nav-link btn-dropdown d-flex align-items-center" to="" type="button">
              <h6 class="m-0">ប្រភេទផលិតផល</h6>
              <i class="bi bi-chevron-down ms-1 fs-6 pt-1"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li v-for="category in categoryStore.categories" :key="category.id">
                <RouterLink class="dropdown-item" :to="{
                  path: '/allproducts',
                  query: { category_id: category.id }
                }">{{ t('categories.' + category.name) }}</RouterLink>
              </li>
            </ul>
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

  <!-- Offcanvas for navbar -->
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
        <li class="nav-item profile-wrapper mb-2" v-if="token">
          <RouterLink to="/profile" class="d-flex align-items-center text-decoration-none p-0">
            <div class="rounded-circle user-pf">
              <img :src="profileStore.profile.avatar" alt="">
            </div>
            <div class="name ms-2">
              <h5 class="text-primary m-0 fw-bold"><span>{{ profileStore.profile.name }}</span></h5>
              <p class="text-muted m-0" style="font-size: 12px;">{{ profileStore.profile.email }}</p>
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
          <RouterLink to="/allproducts">ផលិតផល</RouterLink>
        </li>
        <li class="nav-item">
          <a class="bg-transparent w-100 d-flex justify-content-between align-items-center" @click="toggleCollapse">
            <span>ប្រភេទផលិតផល</span>
            <i class="bi bi-chevron-down ms-1 fs-6 pt-1"></i>
          </a>
        </li>
        <div class="collapse" id="categoryCollapse">
          <ul class="category-list list-unstyled">
            <li v-for="category in categoryStore.categories" :key="category.id">
              <RouterLink class="dropdown-item" :to="{
                path: '/allproducts',
                query: { category_id: category.id }
              }">{{ t('categories.' + category.name) }}</RouterLink>
            </li>
          </ul>
        </div>
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
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { Offcanvas, Collapse } from "bootstrap";
import axios from "axios";
import { useAllVideos } from '@/stores/views/videoFeed_store';
import { useCardStore } from '@/stores/card_store';
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/views/categories_store";
import { useProfileStore } from '@/stores/profile';

const { t } = useI18n()
const categoryStore = useCategoryStore();
const profileStore = useProfileStore();
const cartListStore = useCardStore();
const allVideos = useAllVideos();

const headerRef = ref(null);
const toggleClass = "is-sticky";

// Create a reactive token variable.
const token = ref(null);

const router = useRouter();

const logout = async () => {
  const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!storedToken) {
    router.push('/');
    return;
  }

  try {
    await axios.post('/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    });

    // 1) Remove token from storage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // 2) Remove default header
    delete axios.defaults.headers.common['Authorization'];

    // 3) Clear reactive token so template re-evaluates v-if
    token.value = null;

    // 4) Navigate home
    router.push('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const btnClickProfile = ref(null);
const profileDropdown = ref(null);
const offcanvasInstance = ref(null);
let collapseInstance = null;

const handleScroll = () => {
  if (window.scrollY > 250) {
    headerRef.value.classList.add(toggleClass);
  } else {
    headerRef.value.classList.remove(toggleClass);
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  token.value = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token.value) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
    try {
      // const { data } = await axios.get("/api/profile");
      // if (data.result) {
      //   profile.value = data.data;
      // }
    } catch (error) {
    }
  }

  await nextTick();
  if (btnClickProfile.value) {
    btnClickProfile.value.addEventListener("click", (event) => {
      // Prevent event from bubbling up so that global click listener doesn't immediately hide it.
      event.stopPropagation();
      if (profileDropdown.value) {
        profileDropdown.value.classList.toggle("active");
      }
    });
  }

  // Add a global click listener to detect outside clicks
  document.addEventListener("click", handleOutsideClick);

  offcanvasInstance.value = new Offcanvas(document.getElementById("myOffcanvas"));
  collapseInstance = new Collapse(document.getElementById("categoryCollapse"), { toggle: false });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleOutsideClick);
});

// Function to handle clicks outside the profile dropdown
const handleOutsideClick = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target) &&
    btnClickProfile.value && !btnClickProfile.value.contains(event.target)) {
    profileDropdown.value.classList.remove("active");
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

onMounted(() => {
  if (token.value) {
    cartListStore.onLoadCart();
    cartListStore.onLoadFav();
    profileStore.fetchProfile();
  }
  allVideos.onloadVideoFilter();
  categoryStore.GetAllCategories();
  return
});
</script>