<template>
  <section class="py-5">
    <div class="container-fluid">
      <div class="seller-pf row d-flex justify-content-between rounded-4">
        <div class="row col-10 col-md-8 gap-5">
          <div
            class="col-12 col-lg-6 pf-seller-main d-flex justify-content-center align-content-center bg-secondary-subtle rounded-4 position-relative"
          >
            <img
              src="../../assets/images/epak.png"
              alt=""
              class="pf-seller-avatar rounded-4"
            />
            <p
              class="mb-0 bg-primary py-1 px-2 text-white position-absolute verify-status rounded"
            >
              បានផ្ទៀងផ្ទាត់
            </p>
          </div>
          <div class="col-12 col-lg-6">
            <h2 class="fw-bold mb-3">អាមំុកូនអុីប៉ាក់</h2>
            <p class="text-paragraph fw-medium mb-4">
              លក់ បន្លែធម្មជាតិ ទឹកប្រហុកម៉ែរួយ និង ឆៃថាវធ្វើពីការ៉ុត
              ផលិតផលទាំងអស់បង្កើតដោយ
            </p>
            <div class="d-flex align-items-center gap 3">
              <p class="mb-0 text-warning fs-3 me-2">
                <i class="bi bi-star-fill"></i>
              </p>
              <p class="mb-0 fw-bold">9.9 (វាយតម្លៃ​ 156ដង)</p>
            </div>
          </div>
        </div>
        <div class="col-2 col-md-4 text-right d-flex justify-content-end">
          <div>
            <router-link to="" class="btn btn-primary me-0 me-md-3 mb-3 mb-md-0"
              ><i class="bi bi-heart"></i
              ><span class="d-none d-md-inline-block ms-2"
                >តាមដាន</span
              ></router-link
            >
            <router-link to="" class="btn btn-share bg-white"
              ><i class="bi bi-share"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container-fluid">
      <div class="follower-num row d-flex justify-content-between rounded-4">
        <!-- <div class="d-flex justify-content-between"> -->
        <div class="col-4">
          <h3 class="text-center fw-bold">7</h3>
          <h5 class="fw-bold text-center">អ្នកតាមដាន</h5>
        </div>
        <div class="col-4">
          <h3 class="text-center fw-bolder color-style-1">31</h3>
          <h5 class="fw-bold text-center">បានលក់</h5>
        </div>
        <div class="col-4">
          <h3 class="text-center fw-bold color-style-2">999</h3>
          <h5 class="fw-bold text-center">អីវ៉ាន់ក្នុងឃ្លាំង</h5>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </section>
  <section class="py-5">
    <div class="container-fluid px-0">
      <div class="d-flex justify-content-between">
        <div class="d-flex gap-3">
          <router-link to="" class="btn btn-primary">ទាំងអស់</router-link>
          <router-link to="" class="btn btn-outline-secondary"
            >ដំឡូង</router-link
          >
          <router-link to="" class="btn btn-outline-secondary"
            >ស្ពៃ</router-link
          >
          <router-link to="" class="btn btn-outline-secondary"
            >ទឹកប្រហុក</router-link
          >
          <router-link to="" class="btn btn-outline-secondary"
            >ននោង</router-link
          >
          <router-link to="" class="btn btn-outline-secondary"
            >ទឹកកាពិ
          </router-link>
          <router-link to="" class="btn btn-outline-secondary"
            >ទឹកកាលីងឈូក</router-link
          >
          <router-link to="" class="btn btn-outline-secondary"
            >ដំឡូង</router-link
          >
        </div>
        <div class="filter-search position-relative">
          <button class="btn btn-primary filter-search">
            តាមដាន <i class="bi bi-chevron-down ms-1"></i>
          </button>
          <div class="filter-hover position-absolute bg-gradient rounded-bottom">
            <div class="my-2 dropdown-hover">
              បន្លែ
            </div>
            <div class="mb-2 dropdown-hover">
              ផ្លែឈើ
            </div>
            <div class="mb-2 dropdown-hover">
              ផ្លែឈើ
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container-fluid px-0">
      <div class="row">
        <div class="col-2">
          <div class="w-100">
            <img
              src="../../assets/images/5.avif"
              alt=""
              class="w-100 h-100 object-fit-cover"
            />
          </div>
          <div>
            <h4>ក្រូចខ្វិចបាត់ដំបងពូនី</h4>
            <p>500g</p>
            <p class="text-primary">
              10000៛
              <span class="text-decoration-line-through text-paragraph"
                >10000$</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup></script>
