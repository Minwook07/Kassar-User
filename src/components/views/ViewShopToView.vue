<template>
  <section style="background-color: #f4f4f4">
    <section class="py-5">
      <div class="container-fluid">
        <div
          class="seller-pf row d-flex justify-content-between rounded-4"
          v-if="detailShop"
        >
          <div class="row col-10 col-md-8 gap-5">
            <div
              data-aos="fade-up-right"
              class="col-12 col-lg-6 pf-seller-main d-flex justify-content-center align-content-center bg-secondary-subtle rounded-4 position-relative"
            >
              <img
                :src="detailShop.image"
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
              <h2 class="fw-bold mb-3" data-aos="fade-down">
                {{ detailShop.shop_name }}
              </h2>
              <p class="text-paragraph fw-medium mb-4" data-aos="fade-up">
                {{ detailShop.comment }}
              </p>
              <div
                data-aos="zoom-in-up"
                class="d-flex align-items-center gap 3"
              >
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
              <button
                @click="follow(detailShop.id)"
                data-aos="fade-down"
                class="btn btn-primary me-0 me-md-3 mb-3 mb-md-0"
              >
                <i class="bi bi-heart"></i
                ><span class="d-none d-md-inline-block ms-2">តាមដាន</span>
              </button>
              <button
                @click="onShare()"
                data-aos="fade-up-left"
                class="btn btn-share bg-white"
              >
                <i class="bi bi-share"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container-fluid m-auto">
        <div class="follower-num row justify-content-center py-3 rounded-4">
          <div
            class="col-4 d-flex justify-content-end"
            data-aos="fade-down-right"
          >
            <div v-if="count_follow">
              <h3 class="text-center fw-bold color-style-2">
                {{ count_follow.count }}8
              </h3>
              <h5 class="fw-bold text-center">អ្នកតាមដាន</h5>
            </div>
          </div>
          <div class="col-4" data-aos="fade-up">
            <h3 class="text-center fw-bolder bg-warning color-style-2">31</h3>
            <h5 class="fw-bold text-center">បានលក់</h5>
          </div>
          <div
            class="col-4 d-flex justify-content-start"
            data-aos="fade-up-left"
          >
            <div>
              <h3 class="text-center fw-bold color-style-2">
                {{ detailShop.total_quantity }}
              </h3>
              <h5 class="fw-bold text-center">អីវ៉ាន់ក្នុងឃ្លាំង</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container-fluid">
        <div class="row px-0 justify-content-between">
          <div class="col-12 px-0">
            <ul
              class="nav nav-pills mynav-pills mb-3 gap-3"
              id="pills-tab"
              role="tablist"
            >
              <li data-aos="fade-right" class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-more-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-more"
                  type="button"
                  role="tab"
                  aria-controls="pills-more"
                  aria-selected="false"
                >
                  ទាំងអស់
                </button>
              </li>

              <li
                v-for="category in categories"
                :key="category.id"
                data-aos="fade-right"
                class="nav-item"
                role="presentation"
              >
                <button
                  class="nav-link"
                  :id="`pills-${category.id}-tab`"
                  data-bs-toggle="pill"
                  :data-bs-target="`#pills-${category.id}`"
                  type="button"
                  role="tab"
                  :aria-controls="`pills-${category.id}`"
                  aria-selected="false"
                >
                  {{ category.name }}
                </button>
              </li>
            </ul>

            <div class="tab-content shadow-none px-0" id="pills-tabContent z-1">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabindex="0"
              >
                <div class="row">
                  <div
                    data-aos="fade-up"
                    class="col-12 col-md-4 col-lg-3 mb-3"
                    v-for="product in allProducts"
                    :key="product.id"
                    @click="goToDetail(product.id)"
                  >
                    <div
                      class="bg-white card card-product border-0 rounded position-relative"
                    >
                      <div class="card-img p-3">
                        <img
                          :src="product.product_thumbnail"
                          class="mycard-img-top rounded-top object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div class="p-3 card-body">
                        <div class="d-flex justify-content-between">
                          <p class="text-primary mb-1">
                            {{ product.category.name }}
                          </p>
                          <p class="mb-1">
                            <span class="text-warning me-2"
                              ><i class="bi bi-star-fill"></i></span
                            >{{ product.rating.average }}
                          </p>
                        </div>
                        <h4 class="fw-bold">{{ product.name }}</h4>
                        <p>{{ product.description }}</p>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <p class="text-primary mb-0 fw-bold">
                            {{ product.price.original }}/{{
                              product.product_units.name
                            }}
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
                        class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
                      >
                        <p class="mb-0 px-3 text-white">
                          {{ product.promotions.discount_rate }}
                        </p>
                      </div>

                      <div
                        class="position-absolute border border-dark-subtle top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                        @click.stop="toggleFav(product)"
                      >
                        <p class="mb-0 mt-1 text-danger fw-bold">
                          <i
                            :class="
                              product.is_favorited
                                ? 'bi bi-heart-fill'
                                : 'bi bi-heart'
                            "
                          ></i>
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
                <div class="row">
                  <div
                    class="col-12 col-md-4 col-lg-3 mb-3"
                    v-for="product in allProducts"
                    :key="product.id"
                  >
                    <div
                      class="bg-white card card-product border-0 rounded position-relative"
                    >
                      <div class="card-img p-3">
                        <img
                          :src="product.img"
                          class="mycard-img-top rounded-top object-fit-cover"
                          alt=""
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
                        <h4 class="fw-bold">{{ product.name }}</h4>
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
                        class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
                      >
                        <p class="mb-0 px-3 text-white">20%</p>
                      </div>

                      <div
                        class="position-absolute border border-dark-subtle bg-white top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                        @click="OnSavefav(product.id)"
                      >
                        <p class="mb-0 mt-1 text-danger fw-bold">
                          <i
                            :class="
                              allProducts.isFav
                                ? 'bi bi-heart-fill'
                                : 'bi bi-heart'
                            "
                          ></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabindex="0"
              >
                <div class="row">
                  <div
                    class="col-12 col-md-4 col-lg-3 mb-3"
                    v-for="product in allProducts"
                    :key="product.id"
                  >
                    <div
                      class="bg-white card card-product border-0 rounded position-relative"
                    >
                      <div class="card-img p-3">
                        <img
                          :src="product.img"
                          class="mycard-img-top rounded-top object-fit-cover"
                          alt=""
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
                        <h4 class="fw-bold">{{ product.name }}</h4>
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
                        class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
                      >
                        <p class="mb-0 px-3 text-white">20%</p>
                      </div>

                      <div
                        class="position-absolute border border-dark-subtle bg-white top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                        @click="OnSavefav(product.id)"
                      >
                        <p class="mb-0 mt-1 text-danger fw-bold">
                          <i
                            :class="
                              allProducts.isFav
                                ? 'bi bi-heart-fill'
                                : 'bi bi-heart'
                            "
                          ></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-more"
                role="tabpanel"
                aria-labelledby="pills-more-tab"
                tabindex="0"
              >
                <div class="row">
                  <div
                    class="col-12 col-md-6 col-lg-3 mb-3"
                    v-for="product in allProducts"
                    :key="product.id"
                  >
                    <div
                      class="bg-white card card-product border-0 rounded position-relative"
                    >
                      <div class="card-img p-3">
                        <img
                          :src="product.img"
                          class="mycard-img-top rounded-top object-fit-cover"
                          alt=""
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
                        <h4 class="fw-bold">{{ product.name }}</h4>
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
                        class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
                      >
                        <p class="mb-0 px-3 text-white">20%</p>
                      </div>

                      <div
                        class="position-absolute border border-dark-subtle bg-white top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                        v-show="!product.isFav"
                        @click="OnSavefav(product.id)"
                      >
                        <p class="mb-0 mt-1 text-danger fw-bold">
                          <i
                            :class="
                              allProducts.isFav
                                ? 'bi bi-heart-fill'
                                : 'bi bi-heart'
                            "
                          ></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      id="liveToast"
      class="toast border-0 p-3 bg-primary"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        class="toast-content d-flex justify-content-center gap-3"
        v-if="product in allProducts"
        :key="product.id"
      >
        <div>
          <i class="bi bi-check2-circle fs-5 text-white"></i>
        </div>

        <div class="message">
          <span class="text text-white">{{
            FavProduct.is_favorited ? "ដាក់ចូលរួចរាល់" : "ដកចេញរួចរាល់"
          }}</span>
          {{ FavProduct.is_favorited }}
        </div>

        <div>
          <button
            type="button"
            class="btn btn-close border-0 ms-auto text-white p-0"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div class="progress active"></div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useSellerStore } from "@/stores/seller_store";
import { Toast } from "bootstrap";
import { useContactStore } from "@/stores/contact_store";
import axios from "axios";
const allProducts = ref([]);
const detailShop = ref([]);
const count_follow = ref([]);
const categories = ref([]);
const token = localStorage.getItem("token");
const sellerStore = useSellerStore();
const router = useRouter();
const contactStore = useContactStore();
const GetAllProducts = () => {
  axios
    .get("/api/products")
    .then((res) => {
      allProducts.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
const GetShopDetail = () => {
  const id = router.currentRoute.value.query.id;
  axios.get(`/api/products/${id}/shop`).then((res) => {
    detailShop.value = res.data.data;
  });
};
const follow = (id) => {
  if (token) {
    alert();
  }
  axios
    .get(`/api/follow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      count_follow.value = res.data.data.count_follow;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
const toggleFav = (FavProduct) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    alert("Please login to add products to your favorites.");
    return;
  }

  axios
    .post(`api/favorites/toggle?product_id=${FavProduct.id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      FavProduct.is_favorited = !FavProduct.is_favorited;
      contactStore.toast_alert.show();
    })
    .catch((error) => {
      console.error("Toggle Favorite:", error.response?.data || error.message);
    });
};
const GetAllCategories = () => {
  axios
    .get("/api/categories")
    .then((res) => {
      categories.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
};
const onShare = () => {
  sellerStore.mdl_share.show();
};
const goToDetail = (id) => {
  router.push({ name: "detailproduct", query: { id } });
};
const toast = () => {
  const toastElement = document.getElementById("liveToast");
  if (toastElement) {
    contactStore.toast_alert = Toast.getOrCreateInstance(toastElement);
  } else {
    console.error("Toast element not found!");
  }
};
onMounted(() => {
  GetAllProducts();
  GetShopDetail();
  GetAllCategories();
  toast();
});
</script>
