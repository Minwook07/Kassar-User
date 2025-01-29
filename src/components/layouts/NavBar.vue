<template>
  <nav class="navbar-top bg-body-tertiary">
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-between w-100 pe-2">
        <RouterLink class="navbar-brand" to="/">
          <img src="/kassar_text.png" alt="" style="width: 150px;">
        </RouterLink>
        <form class="d-flex search-input-wrapper align-items-center">
          <input class="form-control me-2" type="search" placeholder="ស្វែងរកផលិតផល" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">ស្វែងរក</button>
        </form>
        <!-- <div class="ms-auto">
                    <RouterLink class="btn btn-primary rounded-5 px-4" to="/auth">ចូលគណនី</RouterLink>
                    </div> -->
        <div class="d-flex align-items-center navbar-action-btn">
          <RouterLink class="btn-cart fs-4 text-secondary pe-3" to="">
            <img src="@/assets/images/icons-img/cart.png" alt="">
          </RouterLink>
          <RouterLink class="btn-favorite fs-4 text-secondary pe-3" to="">
            <img src="@/assets/images/icons-img/love.png" alt="">
          </RouterLink>
          <button class="rounded-circle user-pf" type="button">
            <img src="@/assets/images/user_pf_sample.jpg" alt="">
          </button>
        </div>
      </div>
    </div>
  </nav>
  <nav class="navbar-bottom">
    <div class="container-fluid">
      <ul class="navbar-nav d-flex flex-row align-items-center justify-content-center">
        <li class="nav-item">
          <RouterLink class="nav-link mt-1" to=""><i class="bi bi-collection-play fs-2"></i>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="">
            <h6 class="m-0">ប្រភេទផលិតផល</h6> <i class="bi bi-chevron-down ms-1 fs-6 pt-1"></i>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="">
            <h6 class="m-0">ទំព័រដើម</h6>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="">
            <h6 class="m-0">ផលិតផល</h6>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link d-flex align-items-center" to="">
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

<script setup></script>
