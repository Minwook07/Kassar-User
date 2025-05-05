<template>
  <section class="product-detail">
    <div class="container py-5">
      <div v-if="detailProducts" class="row g-4">
        <!-- Product Images Section -->
        <div class="col-12 col-md-6 col-lg-4" data-aos="fade-down-right">
          <div class="mb-3 rounded overflow-hidden shadow-sm" style="height: 400px">
            <img 
              class="w-100 h-100 object-fit-cover" 
              :src="selectedImageUrl || detailProducts.product.product_thumbnail" 
              alt="Product Image" 
            />
          </div>
          <div class="d-flex gap-2 overflow-auto pb-2">
            <div 
              v-for="product_img in detailProducts.product.product_images"
              :key="product_img.id"
              class="rounded overflow-hidden"
              style="width: 80px; height: 80px; flex-shrink: 0;"
              @click="onChangeImage(product_img.id, product_img.image_url)"
            >
              <img 
                class="w-100 h-100 object-fit-cover" 
                :class="{ 'border border-success border-3 p-1': activeImage === product_img.id }"
                :src="product_img.image_url" 
                alt="Product Image" 
              />
            </div>
          </div>
        </div>

        <!-- Product Info Section -->
        <div class="col-12 col-md-6 col-lg-4 ps-md-4" data-aos="fade-down">
          <h1 class="fw-bold mb-3">
            {{ detailProducts.product.name }}
          </h1>
          
          <div class="d-flex gap-3 align-items-center mb-4" data-aos="zoom-in-up">
            <div class="d-flex text-warning">
              <i class="bi bi-star-fill me-1"></i>
              <i class="bi bi-star-fill me-1"></i>
              <i class="bi bi-star-fill me-1"></i>
              <i class="bi bi-star-fill me-1"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <p class="mb-0 text-secondary">(99 វាយតម្លៃ)</p>
          </div>
          
          <div class="mb-4">
            <div v-if="detailProducts.product.price && detailProducts.product.price.has_discount !== false">
              <p class="text-success fw-bold fs-4 mb-0">
                {{ detailProducts.product.price.discounted_price }} /
                {{ detailProducts.product.product_units.name }}
              </p>
              <span class="text-decoration-line-through text-secondary">
                {{ detailProducts.product.price.original }}
              </span>
            </div>
            <p class="text-success fw-bold fs-4 mb-0" v-else>
              {{ detailProducts.product.price.original }} /
              {{ detailProducts.product.product_units.name }}
            </p>
            <h5 class="mt-2 mb-4" data-aos="fade-up">
              ប្រភេទ​ ៖ {{ detailProducts.product.category.name }}
            </h5>
          </div>
          
          <div class="d-flex flex-wrap gap-3 align-items-center mb-4">
            <div 
              class="bg-light rounded-pill d-flex align-items-center p-1" 
              data-aos="fade-right"
              style="width: fit-content"
            >
              <button 
                class="btn btn-white rounded-circle d-flex justify-content-center align-items-center"
                style="width: 40px; height: 40px;"
                @click="count > 0 && count--"
                :disabled="count <= 0"
              >
                <i class="bi bi-dash-lg text-success"></i>
              </button>
              <span class="px-3 fw-bold">{{ count }}</span>
              <button 
                class="btn btn-white rounded-circle d-flex justify-content-center align-items-center"
                style="width: 40px; height: 40px;"
                @click="count < detailProducts.product.qty_in_stock && count++"
                :disabled="count >= detailProducts.product.qty_in_stock"
              >
                <i class="bi bi-plus-lg text-success"></i>
              </button>
            </div>
            
            <button 
              class="btn btn-success rounded-pill px-4 py-2" 
              data-aos="fade-left" 
              @click="addToCart" 
              :disabled="count < 1"
            >
              <i class="bi bi-cart3 me-2"></i>
              <span>ដាក់ចូលកន្ត្រក</span>
            </button>
          </div>
          
          <div class="mb-4">
            <button 
              v-if="detailProducts.product.stock_status === 'low_stock'"
              class="btn btn-warning text-white rounded-pill px-3 py-1"
            >
              ស្តុកតិច
            </button>
            <button 
              v-if="detailProducts.product.stock_status === 'in_stock'" 
              class="btn btn-success rounded-pill px-3 py-1"
            >
              មានស្តុក
            </button>
            <button 
              v-else-if="detailProducts.product.stock_status === 'out_of_stock'"
              class="btn btn-secondary rounded-pill px-3 py-1"
            >
              អស់ស្តុក
            </button>
          </div>

          <div 
            class="d-flex align-items-center mb-4 cursor-pointer" 
            data-aos="fade-down" 
            @click="toggleFav(detailProducts.product)"
            style="cursor: pointer;"
          >
            <p class="mb-0 text-danger me-2">
              <i :class="detailProducts.product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'" class="fs-5"></i>
            </p>
            <p class="mb-0">បានដាក់ទៅបញ្ជីប្រាថ្នា</p>
          </div>
          
          <div class="mb-4">
            <h5 class="fw-bold mb-3">ធានាការទូរទាត់ប្រាក់ប្រកបដោយសុវត្ថិភាព</h5>
            <div class="d-flex gap-2 align-items-center">
              <div class="p-2 border rounded">
                <img src="@/assets/images/cart-img/icon/visa.svg" alt="Visa" height="20" />
              </div>
              <div class="p-2 border rounded">
                <img src="@/assets/images/cart-img/icon/mastercard (1).svg" alt="Mastercard" height="20" />
              </div>
              <div class="p-2 border rounded">
                <img src="@/assets/images/cart-img/icon/unionpay.svg" alt="UnionPay" height="20" />
              </div>
              <div class="p-2 border rounded">
                <img src="@/assets/images/cart-img/icon/jcb.svg" alt="JCB" height="20" />
              </div>
            </div>
          </div>
        </div>

        <!-- Shop and Related Products Section -->
        <div class="col-12 col-lg-4">
          <div class="d-flex justify-content-end mb-3">
            <button 
              class="btn btn-success" 
              data-aos="fade-up" 
              @click="goToshop(detailProducts.product.id)"
            >
              <i class="bi bi-shop me-2"></i>
              <span>ចូលមើលហាង</span>
            </button>
          </div>
          
          <div class="card border-0 shadow-sm mb-4" data-aos="fade-down-left">
            <div class="card-body">
              <div class="d-flex align-items-center mb-4">
                <div class="d-flex align-items-center me-2">
                  <div class="bg-success rounded-pill me-2" style="width: 15px; height: 3px;"></div>
                  <div class="bg-success rounded-circle" style="width: 6px; height: 6px;"></div>
                </div>
                <h5 class="mb-0 fw-bold">ផលិតផលវាយតម្លៃខ្ពស់</h5>
              </div>
              
              <div 
                v-for="topRatedPro in topRatedPros.slice(0, 3)"
                :key="topRatedPro.id" 
                class="row mb-3 p-2 rounded align-items-center top-rated-item"
                @click="goToDetail(topRatedPro.id)"
                style="cursor: pointer;"
              >
                <div class="col-4">
                  <img 
                    :src="topRatedPro.product_thumbnail" 
                    alt="" 
                    class="img-fluid rounded"
                  />
                </div>
                <div class="col-8">
                  <div class="d-flex text-warning mb-1">
                    <i class="bi bi-star-fill me-1"></i>
                    <i class="bi bi-star-fill me-1"></i>
                    <i class="bi bi-star-fill me-1"></i>
                    <i class="bi bi-star-fill me-1"></i>
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <p class="mb-1 product-name">{{ topRatedPro.name }}</p>
                  <h5 class="text-success fw-bold mb-0 product-price">
                    {{ topRatedPro.price.discounted_price }}<sup>៛</sup> / {{ topRatedPro.product_units.name }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Details Tabs -->
        <div class="col-12 col-lg-8 mb-4">
          <ul class="nav nav-tabs mb-3" id="productTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link active" 
                id="description-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#description" 
                type="button" 
                role="tab" 
                aria-controls="description" 
                aria-selected="true"
                @click="activeTab = 'description'"
              >
                ព័ណ៌នា
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link" 
                id="reviews-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#reviews" 
                type="button" 
                role="tab" 
                aria-controls="reviews" 
                aria-selected="false"
                @click="activeTab = 'reviews'"
              >
                វាយតម្លៃ
              </button>
            </li>
          </ul>
          
          <div class="tab-content" id="productTabsContent">
            <div 
              class="tab-pane fade show active" 
              id="description" 
              role="tabpanel" 
              aria-labelledby="description-tab"
              v-if="activeTab === 'description'"
              data-aos="fade-right"
            >
              <p class="text-secondary">{{ detailProducts.product.description }}</p>
            </div>
            
            <div 
              class="tab-pane fade" 
              id="reviews" 
              role="tabpanel" 
              aria-labelledby="reviews-tab"
              v-if="activeTab === 'reviews'"
            >
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <div class="d-flex gap-3">
                    <div class="flex-shrink-0">
                      <img 
                        src="@/assets/images/1.jpg" 
                        alt="Reviewer" 
                        class="rounded-circle"
                        width="60"
                        height="60"
                        style="object-fit: cover;"
                      />
                    </div>
                    <div class="flex-grow-1" data-aos="fade-right">
                      <div class="d-flex justify-content-between mb-2">
                        <h5 class="fw-bold mb-0">មីងកា​ បាត់ដំបង</h5>
                        <div class="d-flex text-warning">
                          <i class="bi bi-star-fill me-1"></i>
                          <i class="bi bi-star-fill me-1"></i>
                          <i class="bi bi-star-fill me-1"></i>
                          <i class="bi bi-star-fill me-1"></i>
                          <i class="bi bi-star-fill"></i>
                        </div>
                      </div>
                      <p class="mb-0 text-secondary">
                        <i class="bi bi-quote text-success me-1"></i>
                        ក្រូចខ្វិចឆ្ញាញ់ណាស់​ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                        ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                        ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                        <i class="bi bi-quote text-success ms-1" style="display: inline-block; transform: scaleX(-1)"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Advertisement Banner -->
        <div class="col-12 col-lg-4 mb-4">
          <img 
            data-aos="fade-left" 
            src="@/assets/images/posterDetail.gif"
            alt="Advertisement" 
            class="img-fluid rounded"
          />
        </div>
        
        <!-- Similar Products Section -->
        <div class="col-12 mb-4">
          <h4 class="fw-bold mb-4" data-aos="fade-up-right">ផលិតផលស្រដៀង</h4>
          <div class="row g-4">
            <div 
              class="col-12 col-sm-6 col-md-4 col-lg-3" 
              data-aos="fade-up"
              v-for="related_product in detailProducts.related_products" 
              :key="related_product.id"
            >
              <div 
                class="card h-100 border-0 shadow-sm product-card"
                @click="goToDetail(related_product.id)"
                style="cursor: pointer;"
              >
                <div class="position-relative p-3">
                  <img 
                    :src="related_product.product_thumbnail" 
                    alt="" 
                    class="card-img-top rounded"
                    style="height: 180px; object-fit: cover;"
                  />
                  <div 
                    v-for="promotion in related_product.promotions" 
                    :key="promotion.id"
                    class="position-absolute top-0 start-0 mt-3 ms-3 bg-success text-white px-2 py-1 rounded-pill"
                  >
                    {{ promotion.promotions.discount_rate }} %
                  </div>
                  <button 
                    class="position-absolute top-0 end-0 mt-3 me-3 btn btn-light rounded-circle p-1"
                    style="width: 35px; height: 35px;"
                    @click.stop="toggleFav(related_product)"
                  >
                    <i 
                      :class="related_product.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"
                      class="text-danger"
                    ></i>
                  </button>
                </div>
                
                <div class="card-body">
                  <div class="d-flex justify-content-between mb-2">
                    <p class="text-success mb-0">
                      {{ related_product.category.name }}
                    </p>
                    <p class="mb-0">
                      <i class="bi bi-star-fill text-warning me-1"></i>4.9
                    </p>
                  </div>
                  
                  <h5 class="fw-bold mb-2">{{ related_product.name }}</h5>
                  <p class="text-secondary mb-3 small product-description">
                    {{ related_product.description }}
                  </p>
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div v-if="related_product.price && related_product.price.has_discount !== false">
                        <p class="text-success fw-bold mb-0">
                          {{ related_product.price.discounted_price }}<sup>៛</sup> /
                          {{ related_product.product_units.name }}
                        </p>
                        <span class="text-decoration-line-through text-secondary small">
                          {{ related_product.price.original }}<sup>៛</sup>
                        </span>
                      </div>
                      <p class="text-success fw-bold mb-0" v-else>
                        {{ related_product.price.original }}<sup>៛</sup> /
                        {{ related_product.product_units.name }}
                      </p>
                    </div>
                    <button class="btn btn-success rounded-pill">
                      <i class="bi bi-bag-fill me-1"></i>កន្ត្រក
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ToastView />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import ToastView from "./ToastView.vue";
import { useToastStore } from "@/stores/toast_store";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const detailProducts = ref(null);
const toastFav = ref(null);
const topRatedPros = ref([]);
const related_products = ref([]);
const count = ref(0);
const router = useRouter();
const toastStore = useToastStore();
const activeImage = ref(null);
const selectedImageUrl = ref("");
const activeTab = ref('description');

const id = ref(null);

const getDetail = () => {
  if (!id.value) return;
  axios
    .get(`api/products/${id.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      detailProducts.value = res.data.data;
      related_products.value = res.data.data.related_products;
    })
};

watch(
  () => router.currentRoute.value.query.id,
  (newId) => {
    id.value = newId;
    count.value = 0;              
    activeImage.value = null;     
    selectedImageUrl.value = "";
    getDetail();
  },
  { immediate: true }
);

const addToCart = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    return;
  }
  if (!detailProducts.value || !detailProducts.value.product) {
    return;
  }

  // Prepare data with product_id and qty only.
  const data = {
    product_id: detailProducts.value.product.id,
    qty: count.value || 1, // default to 1 if count is 0
  };

  axios
    .post("api/cart", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data && res.data.result) {
        toastStore.showToast('ដាក់ចូលកន្ត្រកជោគជ័យ');
      }
    })
};

const topRatedPro = () => {
  axios.get("api/products?rating=5")
    .then((res) => {
      topRatedPros.value = res.data.data;
    })
}

const toggleFav = (FavProduct) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return;
  }

  axios
    .post(`api/favorites/toggle?product_id=${FavProduct.id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      toastFav.value = !FavProduct.is_favorited;

      if (!toastFav.value) {
        toastStore.showToast('ដកចេញរួចរាល់');
      }
      else {
        toastStore.showToast('ដាក់ចូលរូចរាល់');
      }

      let index = related_products.value.findIndex((p) => p.id == FavProduct.id);
      if (index !== -1) {
        related_products.value[index].is_favorited = toastFav.value;
      }
      
      // Update main product if it's the same one
      if (detailProducts.value && detailProducts.value.product && 
          detailProducts.value.product.id === FavProduct.id) {
        detailProducts.value.product.is_favorited = toastFav.value;
      }
    })
};

onMounted(() => {
  topRatedPro();
});

const onChangeImage = (imgId, imageUrl) => {
  activeImage.value = imgId;
  selectedImageUrl.value = imageUrl;
};

const goToshop = (id) => {
  router.push({ name: "viewshop", query: { id } });
};

const goToDetail = (id) => {
  router.push({ name: "detailproduct", query: { id } }).then(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 200);
  });
};
</script>

<style scoped>
/* Bootstrap enhancements */
.top-rated-item:hover {
  background-color: #32CA83;
  transition: all 0.3s ease;
}

.top-rated-item:hover .product-name,
.top-rated-item:hover .product-price {
  color: white !important;
}

/* Fix for Bootstrap tabs */
.nav-tabs .nav-link.active {
  color: #32CA83;
  border-color: #dee2e6 #dee2e6 #fff;
  border-bottom: 2px solid #32CA83;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
}
</style>