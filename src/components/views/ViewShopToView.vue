<template>
  <section style="background-color: #f4f4f4">
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
          <div
            class="col-2 col-md-4 text-right d-flex justify-content-end px-0"
          >
            <div>
              <router-link
                to=""
                class="btn btn-primary me-0 me-md-3 mb-3 mb-md-0"
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
      <div class="container-fluid m-auto">
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
      <div class="container-fluid">
        <div class="d-flex row px-0 justify-content-between">
          <div class="col-3 col-md-10 px-0">
            <ul
              class="nav nav-pills mynav-pills mb-5 gap-3"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  ទាំងអស់
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  ស្ពៃ
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  ដំឡូង
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  ទឹកប្រហុក
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  ននោង
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  ទឹកកាពិ
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  ទឹកកាលីងឈូក
                </button>
              </li>
            </ul>
            <div class="tab-content px-0" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabindex="0"
              >
                <div class="row">
                  <div class="col-3">
                    <div class="bg-white card rounded position-relative">
                     <div class="card-img">
                      <img src="../../assets/images/5.avif" class="mycard-img-top rounded-top  object-fit-cover" alt="" />
                     </div>
                      <div class="p-3 card-body">
                        <div class="d-flex justify-content-between">
                          <p class="text-primary mb-1">បន្លែ</p>
                          <p class="mb-1">
                            <span class="text-warning me-2"
                              ><i class="bi bi-star-fill"></i></span
                            >4.9
                          </p>
                        </div>
                        <h4 class="fw-bold">ក្រូចខ្វិចបាត់ដំបងពូនី</h4>
                        <p>500g</p>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <p class="text-primary mb-0 fw-bold">
                            10000៛
                            <span
                              class="text-decoration-line-through text-paragraph"
                              >10000៛</span
                            >
                          </p>
                          <router-link
                            to=""
                            class="btn btn-primary rounded-pill"
                            ><i class="bi bi-bag-fill me-1"></i
                            >កន្រ្តក</router-link
                          >
                        </div>
                      </div>
                      <div
                        class="position-absolute bg-primary card-product-discount top-0 mt-3"
                      >
                        <p class="mb-0 px-3 text-white">20%</p>
                      </div>

                      <div
                        class="position-absolute border border-dark-subtle bg-white top-0 end-0 mt-3 me-3 px-2 py-1 rounded-circle"
                      >
                        <p class="mb-0 mt-1 text-danger bg-white fw-bold">
                          <i class="bi bi-heart"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="bg-white card rounded position-relative">
                     <div class="card-img">
                      <img
                        src="../../assets/images/fish.jpg"
                        alt=""
                        class="mycard-img-top rounded-top  object-fit-cover"
                      />
                     </div>
                      <div class="p-3 card-body">
                        <div class="d-flex justify-content-between">
                          <p class="text-primary mb-1">បន្លែ</p>
                          <p class="mb-1">
                            <span class="text-warning me-2"
                              ><i class="bi bi-star-fill"></i></span
                            >4.9
                          </p>
                        </div>
                        <h4 class="fw-bold">ក្រូចខ្វិចបាត់ដំបងពូនី</h4>
                        <p>500g</p>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <p class="text-primary mb-0 fw-bold">
                            10000៛
                            <span
                              class="text-decoration-line-through text-paragraph"
                              >10000៛</span
                            >
                          </p>
                          <router-link
                            to=""
                            class="btn btn-primary rounded-pill"
                            ><i class="bi bi-bag-fill me-1"></i
                            >កន្រ្តក</router-link
                          >
                        </div>
                      </div>
                      <div
                        class="position-absolute bg-primary card-product-discount top-0 mt-3"
                      >
                        <p class="mb-0 px-3 text-white">20%</p>
                      </div>

                      <div
                        class="position-absolute border border-dark-subtle bg-white top-0 end-0 mt-3 me-3 px-2 py-1 rounded-circle"
                      >
                        <p class="mb-0 mt-1 text-danger bg-white fw-bold">
                          <i class="bi bi-heart"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabindex="0"
              >
                ....
              </div>
              <div
                class="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabindex="0"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="pills-disabled"
                role="tabpanel"
                aria-labelledby="pills-disabled-tab"
                tabindex="0"
              >
                ...
              </div>
            </div>
          </div>
          <div class="col-3 col-md-2 px-0">
            <div class="filter-search position-relative">
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary filter-search px-3">
                  <i class="bi bi-funnel me-1"></i> តាមដាន
                  <i class="bi bi-chevron-down ms-1"></i>
                </button>
              </div>
              <div
                class="filter-hover position-absolute bg-gradient rounded end-0"
              >
                <div class="my-2 dropdown-hover">បន្លែ</div>
                <div class="mb-2 dropdown-hover">ផ្លែឈើ</div>
                <div class="mb-2 dropdown-hover">ផ្លែឈើ 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup></script>
