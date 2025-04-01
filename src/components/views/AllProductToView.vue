<template>
  <section style="background-color: #f2f2f2">
    <div class="bg-allProduct d-flex align-items-center justify-content-center">
      <div data-aos="fade-up">
        <h1 class="text-secondary fw-bold">ទំនិញ</h1>
        <div>
          <router-link
            to="/"
            class="text-center text-secondary text-decoration-none"
            >ទំព័រដើម</router-link
          >
          <router-link
            to="/allproducts"
            class="text-center text-secondary text-decoration-none"
            >/ ទំនិញ</router-link
          >
        </div>
      </div>
    </div>
    <div class="container-fluid my-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 col-lg-2">
          <h4 class="mb-0 fw-bold text-primary" data-aos="fade-up-right">
            ជម្រើសផលិតផល
          </h4>
          <hr />
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">ប្រភេទ</h5>
            <div v-for="category in categories" :key="category.id">
              <div class="mb-2 myform-check form-check">
                <input
                  @change="handleCategory"
                  v-model="selectedCategory"
                  type="radio"
                  :value="category.id"
                  :id="'radio-' + category.id"
                  class="form-check-input shadow-none"
                />
                <label class="form-check-label" :for="'radio-' + category.id">{{
                  category.name
                }}</label>
              </div>
            </div>
            <hr />
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold">តម្លៃ</h5>
            <div class="price-range-container p-4 bg-light rounded">
              <div class="price-display mb-3 fs-6">
                ៛{{ formatPrice(range[0]) }} - ៛{{ formatPrice(range[1]) }}
              </div>

              <div class="position-relative">
                <!-- Slider track -->
                <div
                  class="slider-track"
                  :style="{
                    '--left-position': `${(range[0] / max_price) * 100}%`,
                    '--right-position': `${
                      100 - (range[1] / max_price) * 100
                    }%`,
                  }"
                ></div>
                <input
                  type="range"
                  class="range-input"
                  v-model.number="range[0]"
                  :min="min_price"
                  :max="range[1]"
                  @input="handleRangeInput"
                />
                <input
                  type="range"
                  class="range-input"
                  v-model.number="range[1]"
                  :min="range[0]"
                  :max="max_price"
                  @input="handleRangeInput"
                />
              </div>
            </div>
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">វាយតម្លៃ</h5>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i></div
              ></label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <hr />
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-10 row justify-content-start">
          <div class="col-12 row mb-3 justify-content-end px-0">
            <div
              class="col-12 col-lg-6 bg-search rounded d-flex justify-content-between align-items-center"
            >
              <input
                v-model="search"
                @input="handleSearch"
                type="text"
                placeholder="ស្វែងរកតាមរយៈឈ្មោះផលិតផល,ប្រភេទ ..."
                class="form-control search"
              />
              <div class="pe-3">
                <i class="bi bi-search text-primary"></i>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            class="col-12 col-md-6 col-lg-3 mb-3"
            v-for="product in allProducts"
            :key="product.id"
            @click="goToDetail(product.id)"
          >
            <div
              class="bg-white text-decoration-none card h-100 card-product border-0 rounded position-relative"
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
                  <p class="text-primary mb-1">{{ product.category.name }}</p>
                  <p class="mb-1">
                    <span class="text-warning me-2"
                      ><i class="bi bi-star-fill"></i></span
                    >4.9
                  </p>
                </div>
                <h5 class="fw-bold">{{ product.name }}</h5>
                <p style="height: 40px">{{ product.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div
                    v-if="product.price && product.price.has_discount !== false"
                  >
                    <p class="text-primary mb-0 fw-bold">
                      {{ product.price.discounted_price }} /
                      {{ product.product_units.name }}
                    </p>
                    <span class="text-decoration-line-through text-paragraph">
                      {{ product.price.original }}</span
                    >
                  </div>
                  <p class="text-primary mb-0 fw-bold" v-else>
                    {{ product.price.original }} /
                    {{ product.product_units.name }}
                  </p>
                  <router-link to="" class="btn btn-primary rounded-pill"
                    ><i class="bi bi-bag-fill me-1"></i>កន្រ្តក</router-link
                  >
                </div>
              </div>
              <div
                class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
                v-for="promotion in product.promotions"
                :key="promotion.id"
              >
                <p class="mb-0 px-3 text-white">
                  {{ promotion.discount_rate }} %
                </p>
              </div>

              <div
                class="position-absolute border border-dark-subtle top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                @click.stop="
                  product.is_favorited
                    ? RemoveFav(product)
                    : StoreNewFav(product)
                "
              >
                <p class="mb-0 mt-1 text-danger fw-bold">
                  <i
                    :class="
                      product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'
                    "
                  ></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <paginate
          :page-count="pageCount"
          :click-handler="handlePageClick"
          prev-text="‹"
          next-text="›"
          container-class="pagination"
        />
      </div>
    </div>
  </section>
  <div
    class="toast-container position-fixed top-0 start-50 translate-middle-x p-3"
    style="margin-top: 50px"
  >
    <div
      id="liveToast"
      class="toast border-0 p-3 bg-primary"
      role="alert"
      style="width: 500px"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-content d-flex justify-content-center gap-3">
        <div>
          <i class="bi bi-check2-circle fs-5 text-white"></i>
        </div>

        <div class="message">
          <span class="text text-white"
            >លោកអ្នកបានបន្ថែមទំនិញចូលបញ្ជីរប្រាថ្នាជោគជ័យ</span
          >
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
import { ref, computed } from "vue";
import Paginate from "vuejs-paginate-next";
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Toast } from "bootstrap";
import { useContactStore } from "@/stores/contact_store";
const allProducts = ref([]);
const categories = ref([]);
const totalProducts = ref([]);
const selectedCategory = ref();
const itemsPerPage = 8;
const currentPage = ref(1);
const min_price = 0;
const max_price = 15;
const search = ref("");
const contactStore = useContactStore();
const GetAllProducts = () => {
  let url = `/api/products?per_page=${itemsPerPage}&page=${currentPage.value}`;
  if (search.value) {
    url += `&search=${encodeURIComponent(search.value)}`;
  }
  if (selectedCategory.value) {
    url += `&category_id=${selectedCategory.value}`;
  }
  console.log(min_price, max_price);
  // if (range.value[0] !== undefined && range.value[1] !== undefined) {
  //   url += `&min_price=${range.value[0]}&max_price=${range.value[1]}`;
  // }
  console.log(url);

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    })
    .then((res) => {
      totalProducts.value = res.data.paginate.total;
      allProducts.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
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
const StoreNewFav = (product) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    alert("Please login to add products to your favorites.");
    return;
  }

  if (!product) {
    alert("Invalid product.");
    return;
  }
  axios
    .post(
      "api/favorites",
      { product_id: product.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(token);
      product.is_favorited = !product.is_favorited;
      if (contactStore.toast_alert) {
        contactStore.toast_alert.show();
      }
    })
    .catch((error) => {
      console.error(
        "Error adding favorite:",
        error.response?.data || error.message
      );
    });
};
const RemoveFav = () =>{
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    alert("Please login to remove products from your favorites.");
    return;
  }
  axios.delete(``)
}
onMounted(() => {
  GetAllProducts();
  GetAllCategories();
  toast();
});
const toast = () => {
  const toastElement = document.getElementById("liveToast");
  if (toastElement) {
    contactStore.toast_alert = Toast.getOrCreateInstance(toastElement);
  } else {
    console.error("Toast element not found!");
  }
};
const handleSearch = () => {
  currentPage.value = 1;
  GetAllProducts();
};
const handleCategory = () => {
  currentPage.value = 1;
  GetAllProducts();
};
const pageCount = computed(() =>
  Math.max(1, Math.ceil(totalProducts.value / itemsPerPage))
);
const handlePageClick = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= pageCount.value) {
    currentPage.value = pageNumber;
    GetAllProducts();
  }
};
const range = ref([min_price, max_price]);
const handleRangeInput = () => {
  GetAllProducts();
};
const formatPrice = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const router = useRouter();
const goToDetail = (id) => {
  router.push({ name: "detailproduct", query: { id } });
};
</script>
