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
          <h4 class="mb-0 fw-bold" data-aos="fade-up-right">ជម្រើសផលិតផល</h4>
          <hr />
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">ប្រភេទ</h5>
            <div v-for="category in categories" :key="category.id">
              <div class="mb-2 myform-check form-check">
                <input
                  type="checkbox"
                  class="form-check-input shadow-none"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">{{
                  category.name
                }}</label>
              </div>
            </div>
            <hr />
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold">តម្លៃ</h5>
            <div class="price-range-container p-4 bg-light rounded">
              <h3 class="khmer-text mb-3">តម្លៃ</h3>

              <div class="price-display mb-3 fs-6">
                ៛{{ formatPrice(range[0]) }} - ៛{{ formatPrice(range[1]) }}
              </div>

              <div class="position-relative">
                <div
                  class="slider-track"
                  :style="{
                    '--left-position': `${(range[0] / maxPrice) * 100}%`,
                    '--right-position': `${100 - (range[1] / maxPrice) * 100}%`,
                  }"
                ></div>
                <input
                  type="range"
                  class="range-input"
                  v-model.number="range[0]"
                  :min="minPrice"
                  :max="maxPrice"
                  @input="validateRange(0)"
                />
                <input
                  type="range"
                  class="range-input"
                  v-model.number="range[1]"
                  :min="minPrice"
                  :max="maxPrice"
                  @input="validateRange(1)"
                />
              </div>
            </div>
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">ម៉ាក</h5>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >កសិដ្ឋានសិរីរាង្គ</label
              >
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Fresh Direct</label
              >
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Locak Harvest</label
              >
            </div>
            <hr />
          </div>
          <div class="mb-3" data-aos="fade-up-right">
            <h5 class="fw-bold mb-3">ស្តុក</h5>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >មានក្នុងស្តុក</label
              >
            </div>
            <div class="mb-2 myform-check form-check">
              <input
                type="checkbox"
                class="form-check-input shadow-none"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >គ្មានក្នុងស្តុក</label
              >
            </div>
            <hr />
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-10 row justify-content-start">
          <div class="col-12 row mb-3 justify-content-end px-0">
            <div class="col-12 col-lg-6 ps-4">
              <input
                type="text"
                placeholder="ស្វែងរក"
                class="form-control search"
              />
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
              class="bg-white text-decoration-none card card-product border-0 rounded position-relative"
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
                <p>{{ product.product_unit.name }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="text-primary mb-0 fw-bold">
                    {{ product.price }}
                    <span class="text-decoration-line-through text-paragraph"
                      >10000៛</span
                    >
                  </p>
                  <router-link to="" class="btn btn-primary rounded-pill"
                    ><i class="bi bi-bag-fill me-1"></i>កន្រ្តក</router-link
                  >
                </div>
              </div>
              <div
                class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
              >
                <p class="mb-0 px-3 text-white">20%</p>
              </div>

              <div
                class="position-absolute border border-dark-subtle top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
                @click="allProducts.toggleFav(product.id)"
              >
                <p class="mb-0 mt-1 text-danger fw-bold">
                  <i
                    :class="product.isFav ? 'bi bi-heart-fill' : 'bi bi-heart'"
                  ></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <paginate
          :page-count="pageCount"
          :click-handler="handlePageClick"
          :prev-text="'<i class=\'bi bi-chevron-left\'></i>'"
          :next-text="'<i class=\'bi bi-chevron-right\'></i>'"
          :container-class="'pagination'"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from "vue";
import Paginate from "vuejs-paginate-next";
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
const allProducts = ref([]);
const categories = ref([]);
const GetAllProducts = () => {
  axios
    .get("http://kassar_api.test/api/products")
    .then((res) => {
      allProducts.value = res.data.data;
      console.log(res.data.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
const GetAllCategories = () => {
  axios
    .get("http://kassar_api.test/api/categories")
    .then((res) => {
      categories.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
};
onMounted(() => {
  GetAllProducts();
  GetAllCategories();
});

const itemsPerPage = 4;
const currentPage = ref(1);
const pageCount = computed(() =>
  Math.max(1, Math.ceil(allProducts.length / itemsPerPage))
);
const paginatedProducts = computed(() => {
  if (!allProducts.length) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allProducts.products.slice(start, end);
});

const handlePageClick = (pageNumber) => {
  currentPage.value = pageNumber;
};

const minPrice = 0;
const maxPrice = 100000;
const range = ref([20000, 40000]);

const validateRange = (index) => {
  if (index === 0 && range.value[0] > range.value[1]) {
    range.value[0] = range.value[1];
  } else if (index === 1 && range.value[1] < range.value[0]) {
    range.value[1] = range.value[0];
  }
};

const formatPrice = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const router = useRouter();
const goToDetail = (id) => {
  router.push({ name: 'detailproduct', query: { id } });


};
</script>
