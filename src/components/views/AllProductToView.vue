<template>
  <section style="background-color: #f2f2f2">
    <div class="bg-allProduct d-flex align-items-center justify-content-center">
      <div data-aos="fade-up">
        <h1 class="text-secondary fw-bold">ទំនិញ</h1>
        <div>
          <router-link to="/" class="text-center text-secondary text-decoration-none">ទំព័រដើម</router-link>
          <router-link to="/allproducts" class="text-center text-secondary text-decoration-none">/ ទំនិញ</router-link>
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
          <div class="mt-3 mb-4 text-center">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="bi bi-arrow-repeat"></i>
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">ប្រភេទ</h5>
            <div v-for="category in categories" :key="category.id">
              <div class="mb-2 myform-check form-check">
                <input @change="handleCategory" v-model="selectedCategory" type="radio" :value="category.id"
                  :id="'radio-' + category.id" class="form-check-input shadow-none" />
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
                <div class="slider-track" :style="{
                  '--left-position': `${(range[0] / max_price) * 100}%`,
                  '--right-position': `${100 - (range[1] / max_price) * 100
                    }%`,
                }"></div>
                <input type="range" class="range-input" v-model.number="range[0]" :min="min_price" :max="range[1]"
                  @input="handleRangeInput" />
                <input type="range" class="range-input" v-model.number="range[1]" :min="range[0]" :max="max_price"
                  @input="handleRangeInput" />
              </div>
            </div>
          </div>
          <hr>
          <div class="mb-3">
            <h5 class="fw-bold mb-3">វាយតម្លៃ</h5>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
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
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
            <div class="mb-2 myform-check form-check">
              <input type="radio" class="form-check-input shadow-none" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                <div class="d-flex gap-2 text-warning">
                  <i class="bi bi-star-fill"></i>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-10 row justify-content-start">
          <div class="col-12 row mb-3 justify-content-end px-0">
            <div class="col-12 col-lg-6 bg-search rounded d-flex justify-content-between align-items-center">
              <input v-model="search" @input="handleSearch" type="text"
                placeholder="ស្វែងរកតាមរយៈឈ្មោះផលិតផល,ប្រភេទ ..." class="form-control search" />
              <div class="pe-3">
                <i class="bi bi-search text-primary"></i>
              </div>
            </div>
          </div>

          <!-- Skeleton Loader -->
          <div v-if="isLoading" class="row g-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="n in 8" :key="n">
              <ProductSkeleton />
            </div>
          </div>

          <!-- Products grid -->
          <div class="row g-4" v-else-if="allProducts.length > 0">
            <div 
              class="col-12 col-sm-6 col-md-4 col-lg-3" 
              data-aos="fade-up"
              v-for="product in allProducts" 
              :key="product.id"
            >
              <div 
                class="card h-100 border-0 shadow-sm product-card"
                @click="goToDetail(product.id)"
                style="cursor: pointer;"
              >
                <div class="position-relative p-3">
                  <img 
                    :src="product.product_thumbnail" 
                    alt="" 
                    class="card-img-top rounded"
                    style="height: 180px; object-fit: cover;"
                    loading="lazy"
                  />
                  <div 
                    v-for="promotion in product.promotions" 
                    :key="promotion.id"
                    class="position-absolute top-0 start-0 mt-3 ms-3 bg-success text-white px-2 py-1 rounded-pill"
                  >
                    {{ promotion.promotions.discount_rate }} %
                  </div>
                  <button 
                    class="position-absolute top-0 end-0 mt-3 me-3 btn btn-light rounded-circle p-1"
                    style="width: 35px; height: 35px;"
                    @click.stop="toggleFav(product)"
                  >
                    <i 
                      :class="product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"
                      class="text-danger"
                    ></i>
                  </button>
                </div>
                
                <div class="card-body">
                  <div class="d-flex justify-content-between mb-2">
                    <p class="text-success mb-0">
                      {{ product.category.name }}
                    </p>
                    <p class="mb-0">
                      <i class="bi bi-star-fill text-warning me-1"></i>{{ product.rating.average }}
                    </p>
                  </div>
                  
                  <h5 class="fw-bold mb-2">{{ product.name }}</h5>
                  <p class="text-secondary mb-3 small product-description">
                    {{ product.description }}
                  </p>
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div v-if="product.price && product.price.has_discount !== false">
                        <p class="text-success fw-bold mb-0">
                          {{ product.price.discounted_price }}<sup>៛</sup> /
                          {{ product.product_units.name }}
                        </p>
                        <span class="text-decoration-line-through text-secondary small">
                          {{ product.price.original }}<sup>៛</sup>
                        </span>
                      </div>
                      <p class="text-success fw-bold mb-0" v-else>
                        {{ product.price.original }}<sup>៛</sup> /
                        {{ product.product_units.name }}
                      </p>
                    </div>
                    <button class="btn btn-success rounded-pill" @click.stop="AddToCart(product.id)">
                      <i class="bi bi-bag-fill me-1"></i>កន្ត្រក
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <paginate :page-count="pageCount" :click-handler="handlePageClick" prev-text="‹" next-text="›"
              container-class="pagination" />
          </div>
          
          <!-- No products message -->
          <div v-else class="col-12 d-flex flex-column align-items-center justify-content-center text-center">
            <img src="@/assets/images/empty-box-agriculture.svg" alt="No products" class="mb-4"
              style="max-width: 180px;" />

            <h3 class="fw-bold text-secondary mb-2">
              សូមទោស! មិនមានផលិតផលសម្រាប់ប្រភេទនេះទេ
            </h3>
            <p class="text-muted mb-4">
              ការជ្រើសរើសនេះមិនមានទំនិញណាមួយទេ។ សូមព្យាយាមប្រភេទផ្សេង ឬស្វែងរកតាមឈ្មោះផលិតផល
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div id="liveToast" class="toast border-0 p-3 bg-primary" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-content d-flex justify-content-center gap-3">
        <div>
          <i class="bi bi-check2-circle fs-5 text-white"></i>
        </div>

        <div class="message">
          <span class="text text-white">{{
            toastFav ? "ដាក់ចូលរួចរាល់" : "ដកចេញរួចរាល់"

          }}</span>
        </div>

        <div>
          <button type="button" class="btn btn-close border-0 ms-auto text-white p-0" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
      <div class="progress active"></div>
    </div>
  </div>
  <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1060;">
    <div id="cartToastElement" class="toast border-0 p-3 bg-success" role="alert" aria-live="assertive"
      aria-atomic="true">
      <div class="toast-content d-flex justify-content-center gap-3">
        <div>
          <i class="bi bi-check2-circle fs-5 text-white"></i>
        </div>

        <div class="message">
          <span class="text text-white" id="cartToastMessage">ដាក់ចូលកន្ត្រកជោគជ័យ</span>
        </div>

        <div>
          <button type="button" class="btn btn-close border-0 ms-auto text-white p-0" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
      <div class="progress active"></div>
    </div>
  </div>

</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import Paginate from "vuejs-paginate-next";
import axios from "axios";
import { useRouter } from "vue-router";
import { Toast } from "bootstrap";
import { useContactStore } from "@/stores/contact_store";
import { useToastStore } from "@/stores/toast_store";
import { useRoute } from "vue-router";
import ProductSkeleton from '@/components/views/ProductSkeleton.vue';

const allProducts = ref([]);
const toastFav = ref(null);
const categories = ref([]);
const totalProducts = ref([]);
const isLoading = ref(true); // Add loading state

const route = useRoute();
const toastStore = useToastStore();
const selectedCategory = ref(null);
const itemsPerPage = 8;
const currentPage = ref(1);
const min_price = 0;
const max_price = 100000;
const search = ref("");
const router = useRouter();
const cartToast = ref(null);
const contactStore = useContactStore();
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const cartToastElement = ref(null);
const liveToast = ref(null);
const range = ref([min_price, max_price]);

onMounted(() => {
  selectedCategory.value = route.query.category_id || null;
  // Initialize toasts first
  const toastElement = document.getElementById("liveToast");
    if (toastElement) {
        liveToast.value = Toast.getOrCreateInstance(toastElement);
        contactStore.toast_alert = liveToast.value;
    }

    cartToastElement.value = document.getElementById("cartToastElement");
    if (cartToastElement.value) {
        cartToast.value = new Toast(cartToastElement.value);
    }
  
  // Then fetch data
  GetAllCategories();
  if (route.query.category_id) {
    currentPage.value = 1;
  }
  GetAllProducts();
});

const GetAllProducts = () => {
  isLoading.value = true; // Set loading to true before fetching data
  
  let url = `/api/products?per_page=${itemsPerPage}&page=${currentPage.value}`;

  if (search.value) {
    url += `&search=${encodeURIComponent(search.value)}`;
  }

  if (selectedCategory.value) {
    url += `&category_id=${selectedCategory.value}`;
  }

  if (range.value[0] !== undefined && range.value[1] !== undefined) {
    url += `&min_price=${range.value[0]}&max_price=${range.value[1]}`;
  }

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      totalProducts.value = res.data.paginate.total;
      allProducts.value = res.data.data;
    })
    .catch((error) => {
      allProducts.value = [];
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    });
};

const GetAllCategories = () => {
  axios
    .get("/api/categories")
    .then((res) => {
      categories.value = res.data.data;
    })
    .catch((error) => {
      categories.value = [];
    });
};

const toggleFav = (FavProduct) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    toastStore.showToast('សូម​ចូល​គណនី​ជាមុនសិន');
      setTimeout(() => {
          router.push({ name: 'login' });
      }, 2000);
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
      contactStore.toast_alert.show();

      // change fav icon
      let index = allProducts.value.findIndex((p) => p.id == FavProduct.id);
      allProducts.value[index].is_favorited = toastFav.value;
    })
    .catch((error) => {
      // console.error("Error toggling favorite:", error);
    });
};

const AddToCart = (id) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    toastStore.showToast('សូមចូល​គណនី​មុន​បន្ថែម​ទំនិញ');
      setTimeout(() => {
          router.push({ name: 'login' });
      }, 2000);
    return;
  }

  const formData = new FormData();
  formData.append('product_id', id);
  formData.append('qty', 1);

  axios.post('/api/cart', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      if (response.data && response.data.result) {
        // Use the new cart toast instead of toastStore
        const cartToastMessage = document.getElementById("cartToastMessage");
        if (cartToastMessage) {
          cartToastMessage.textContent = 'ដាក់ចូលកន្ត្រកជោគជ័យ';
        }
        if (cartToast.value) {
          cartToast.value.show();
        }
      } else {
        const cartToastMessage = document.getElementById("cartToastMessage");
        if (cartToastMessage) {
          cartToastMessage.textContent = 'មានបញ្ហា! មិនអាចដាក់ចូលកន្ត្រកបានទេ';
        }
        if (cartToast.value) {
          cartToast.value.show();
        }
      }
    })
    .catch(error => {
      const cartToastMessage = document.getElementById("cartToastMessage");
      if (cartToastMessage) {
        cartToastMessage.textContent = 'មានបញ្ហា! មិនអាចដាក់ចូលកន្ត្រកបានទេ';
      }
      if (cartToast.value) {
        cartToast.value.show();
      }
    });
};

const handleSearch = () => {
  currentPage.value = 1;
  GetAllProducts();
};

const handleCategory = () => {
  currentPage.value = 1;
  router.push({
    path: '/allproducts',
    query: {
      ...route.query,
      category_id: selectedCategory.value
    }
  });
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

const handleRangeInput = () => {
  GetAllProducts();
};

const formatPrice = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const goToDetail = (id) => {
  router.push({ name: "detailproduct", query: { id } });
};

const resetFilters = () => {
  selectedCategory.value = null;
  search.value = "";
  range.value = [min_price, max_price];
  currentPage.value = 1;

  router.push({ path: "/allproducts", query: {} });

  GetAllProducts();
};

</script>

<style scoped>
.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: transparent;
}

.toast .progress.active::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  animation: progress 5s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}

/* Product card hover effect */
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Limit description height */
.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>