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
              <img :src="detailShop.image" alt="" class="pf-seller-avatar" />
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
               v-if="detailShop && detailShop.id"
                @click="toggleFollow(detailShop.id)"
                data-aos="fade-down"
                class="btn btn-primary me-0 me-md-3 mb-3 mb-md-0"
              >
                <i
                  :class="follow.is_following ? 'bi bi-heart-fill' : 'bi bi-heart'"
                ></i>
                <span class="d-none d-md-inline-block ms-2">{{
                  follow.is_following ? "ឈប់តាមដាន" : "តាមដាន"
                }}</span>
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
            <div v-if="count_follows">
              <h3 class="text-center fw-bold color-style-2">
                {{ count_follows.total }}
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
                  class="nav-link active"
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
                  :id="`pills-${category.name}-tab`"
                  data-bs-toggle="pill"
                  :data-bs-target="`#pills-${category.name}`"
                  type="button"
                  role="tab"
                  :aria-controls="`pills-${category.name}`"
                  :aria-selected="false"
                >
                  {{ category.name }}
                </button>
              </li>
            </ul>
            <div class="tab-content shadow-none px-0" id="pills-tabContent z-1">
              <div
                class="tab-pane fade"
                :class="{ 'show active': selectedTab === 'ទាំងអស់' }"
                id="pills-more"
                role="tabpanel"
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
                        <p class="product-desc">{{ product.description }}</p>
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
                v-for="category in categories"
                :key="category.id"
                class="tab-pane fade"
                :class="{ 'show active': selectedTab === category.name }"
                :id="`pills-${category.name}`"
                role="tabpanel"
                :aria-labelledby="`pills-${category.name}-tab`"
              >
                <div class="row">
                  <div
                    data-aos="fade-up"
                    class="col-12 col-md-4 col-lg-3 mb-3"
                    v-for="product in filteredProducts(category)"
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
                              ><i class="bi bi-star-fill"></i
                            ></span>
                            {{ product.rating.average }}
                          </p>
                        </div>
                        <h4 class="fw-bold">{{ product.name }}</h4>
                        <p class="product-desc">{{ product.description }}</p>
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
                          >
                            <i class="bi bi-bag-fill me-1"></i> កន្រ្តក
                          </router-link>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
  <Toast />
</template>
<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref,watch } from "vue";
import { useSellerStore } from "@/stores/seller_store";
import Toast from "./Toast.vue";
import { useToastStore } from "@/stores/toast_store";
import axios from "axios";
const allProducts = ref([]);
const detailShop = ref([]);
const toastFav = ref(null);
const count_follows = ref([]);
const categories = ref([]);
const follow=  ref({ isFollowing: null});
const sellerStore = useSellerStore();
const router = useRouter();
const selectedTab = "ទាំងអស់";
const toastStore = useToastStore();
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
const filteredProducts = (category) => {
  return allProducts.value.filter(
    (product) => product.category.id === category.id
  );
};
const GetShopDetail = () => {
  const id = router.currentRoute.value.query.id;
  axios.get(`/api/products/${id}/shop`).then((res) => {
    detailShop.value = res.data.data;
    if (detailShop.value) {
      getCountFollower(detailShop.value.id);
    }
  });
};
const toggleFollow = (id) => {
  if (!id) {
    alert("Shop ID is missing!");
    return;
  }
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    alert("please login");
  }
  axios
    .post(`api/shops/${id}/toggle-follow`,null ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      follow.value = res.data.data;
      getCountFollower(id);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
const getCountFollower = (id) => {
  axios
    .get(`api/shops/${id}/followers`)
    .then((res) => {
      count_follows.value = res.data.paginate;
      console.log(count_follows.value);
      
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
      // change message toast
      toastFav.value = !FavProduct.is_favorited;
      
      if(!toastFav.value) {
        toastStore.showToast('ដកចេញរួចរាល់');
      }
      else{
        toastStore.showToast('ដាក់ចូលរូចរាល់');
      }

      // change fav icon
      let index = allProducts.value.findIndex((p) => p.id == FavProduct.id);
      allProducts.value[index].is_favorited = toastFav.value;
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
onMounted(() => {
  GetAllProducts();
  GetShopDetail();
  GetAllCategories();
  getCountFollower();
  if (detailShop.value && detailShop.value.id) {
    toggleFollow(detailShop.value.id);
  }
});
watch(
  () => detailShop.value,
  (newVal) => {
    if (newVal && newVal.id) {
      toggleFollow(newVal.id);
    }
  },
  { immediate: true }
);
</script>
