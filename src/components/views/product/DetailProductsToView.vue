<template>
  <section class="product-detail bg-light min-vh-100">
    <div class="container py-5">
      <div v-if="detailProducts" class="row g-4">
        <!-- Product Images Section -->
        <div class="col-12 col-lg-5" data-aos="fade-right">
          <div class="product-gallery">
            <!-- Main Image -->
            <div class="main-image-container mb-3">
              <div class="main-image-wrapper">
                <img :src="selectedImageUrl || detailProducts.product.product_thumbnail" alt="Product Image"
                  class="main-product-image" />
                <div class="image-overlay">
                  <button class="btn btn-light btn-sm rounded-circle zoom-btn">
                    <i class="bi bi-zoom-in"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Thumbnail Gallery -->
            <div class="thumbnail-gallery">
              <div class="thumbnail-scroll">
                <div
                  v-for="(product_img, index) in [detailProducts.product.product_thumbnail, ...detailProducts.product.product_images]"
                  :key="product_img.id || `main-${index}`" class="thumbnail-item"
                  :class="{ 'active': activeImage === (product_img.id || 'main') }"
                  @click="onChangeImage(product_img.id || 'main', typeof product_img === 'string' ? product_img : product_img.image_url)">
                  <img :src="typeof product_img === 'string' ? product_img : product_img.image_url"
                    alt="Product Thumbnail" class="thumbnail-image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Info Section -->
        <div class="col-12 col-xl-4">
          <!-- Modernized product info section with better spacing and semantic tokens -->
          <div class="product-info">

            <!-- Product Header -->
            <div class="product-header mb-4">
              <div class="category-badge mb-3">
                <span class="badge bg-primary/10 text-primary border border-primary rounded-pill px-3 py-2 fw-medium">
                  <i class="bi bi-tag me-1"></i>{{ t('categories.' + (detailProducts.product?.category?.name)) }}
                </span>
              </div>

              <h1 class="product-title display-6 fw-bold text-foreground mb-3 lh-sm">
                {{ detailProducts.product?.name || '' }}
              </h1>

              <div class="rating-section d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-border">
                <div class="stars d-flex gap-1">
                  <i v-for="n in 5" :key="n" class="bi bi-star-fill text-warning fs-5"></i>
                </div>
                <span class="rating-text text-muted-foreground fw-medium">(99 វាយតម្លៃ)</span>
                <span class="divider text-muted-foreground">•</span>
                <span class="sold-count text-muted-foreground fw-medium">លក់ 1.2k+</span>
              </div>
            </div>

            <!-- Price Section -->
            <div class="price-section mb-4 p-4 bg-card rounded-4 shadow-sm border border-border">
              <div v-if="detailProducts.product?.price && detailProducts.product.price.has_discount !== false"
                class="price-with-discount">
                <div class="d-flex align-items-baseline gap-3 mb-2">
                  <span class="current-price text-primary fw-bold" style="font-size: 2.5rem;">
                    {{ detailProducts.product.price.discounted_price }}
                  </span>
                  <span class="currency text-primary fw-bold fs-4">៛</span>
                  <span class="original-price text-decoration-line-through text-muted-foreground fs-5">
                    {{ detailProducts.product.price.original }}៛
                  </span>
                </div>
                <div class="discount-info">
                  <span class="badge bg-destructive text-destructive-foreground rounded-pill px-3 py-2">
                    <i class="bi bi-lightning-fill me-1"></i>សន្សំ 25%
                  </span>
                </div>
              </div>
              <div v-else class="price-regular">
                <div class="d-flex align-items-baseline gap-2">
                  <span class="current-price text-primary fw-bold" style="font-size: 2.5rem;">
                    {{ detailProducts.product?.price?.original || '' }}
                  </span>
                  <span class="currency text-primary fw-bold fs-4">៛</span>
                </div>
              </div>
              <div class="unit-info mt-2">
                <small class="text-muted-foreground">ក្នុង 1 {{ t('product_units.' +
                  (detailProducts.product?.product_units?.name)) }}</small>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="stock-section mb-4">
              <div class="d-flex align-items-center gap-3">
                <span class="fw-semibold text-foreground">ស្ថានភាព:</span>
                <span v-if="detailProducts.product?.stock_status === 'low_stock'"
                  class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-medium">
                  <i class="bi bi-exclamation-triangle me-2"></i>ស្តុកតិច
                </span>
                <span v-else-if="detailProducts.product?.stock_status === 'in_stock'"
                  class="badge bg-primary text-primary-foreground px-3 py-2 rounded-pill fw-medium">
                  <i class="bi bi-check-circle me-2"></i>មានស្តុក
                </span>
                <span v-else-if="detailProducts.product?.stock_status === 'out_of_stock'"
                  class="badge bg-secondary text-secondary-foreground px-3 py-2 rounded-pill fw-medium">
                  <i class="bi bi-x-circle me-2"></i>អស់ស្តុក
                </span>
              </div>
            </div>

            <!-- Quantity & Purchase Actions -->
            <div class="purchase-section mb-4 p-4 bg-card rounded-4 shadow-sm border border-border">
              <div class="quantity-section mb-4">
                <label class="form-label fw-semibold text-foreground mb-3">បរិមាណ:</label>
                <div class="quantity-controls d-flex align-items-center gap-3">
                  <button
                    class="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 45px; height: 45px;" @click="count > 0 && count--" :disabled="count <= 0">
                    <i class="bi bi-dash fs-5"></i>
                  </button>
                  <div class="quantity-display bg-muted rounded-3 px-4 py-2 fw-bold text-center border border-border"
                    style="min-width: 80px;">
                    {{ count }}
                  </div>
                  <button
                    class="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 45px; height: 45px;"
                    @click="count < (detailProducts.product?.qty_in_stock || 0) && count++"
                    :disabled="count >= (detailProducts.product?.qty_in_stock || 0)">
                    <i class="bi bi-plus fs-5"></i>
                  </button>
                </div>
                <small class="text-muted-foreground mt-2 d-block">មានស្តុក {{ detailProducts.product?.qty_in_stock || 0
                }} {{ t('product_units.' + (detailProducts.product?.product_units?.name)) }}</small>
              </div>

              <div class="action-buttons d-flex gap-3">
                <button class="btn btn-primary flex-fill py-3 rounded-pill fw-semibold fs-5 shadow-sm"
                  @click="addToCart" :disabled="count < 1" style="transition: all 0.3s ease;">
                  <i class="bi bi-cart-plus me-2"></i>ដាក់ចូលកន្ត្រក
                </button>
                <button
                  class="btn btn-outline-destructive rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style="width: 60px; height: 60px; flex-shrink: 0;" @click="toggleFav(detailProducts.product)">
                  <i :class="detailProducts.product?.is_favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"
                    class="fs-4"></i>
                </button>
              </div>
            </div>

            <!-- Payment Security -->
            <div class="payment-section p-4 bg-card rounded-4 shadow-sm border border-border">
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-shield-check text-primary fs-4 me-3"></i>
                <div>
                  <h6 class="fw-semibold mb-1 text-foreground">ការទូរទាត់ប្រាក់ប្រកបដោយសុវត្ថិភាព</h6>
                  <small class="text-muted-foreground">ការពារ 100% សម្រាប់ការទិញរបស់អ្នក</small>
                </div>
              </div>
              <div class="payment-methods d-flex gap-2 flex-wrap">
                <div class="payment-method bg-muted rounded-3 p-2 border border-border">
                  <img src="@/assets/images/cart-img/icon/visa.svg" alt="Visa" style="height: 24px;" />
                </div>
                <div class="payment-method bg-muted rounded-3 p-2 border border-border">
                  <img src="@/assets/images/cart-img/icon/mastercard (1).svg" alt="Mastercard" style="height: 24px;" />
                </div>
                <div class="payment-method bg-muted rounded-3 p-2 border border-border">
                  <img src="@/assets/images/cart-img/icon/unionpay.svg" alt="UnionPay" style="height: 24px;" />
                </div>
                <div class="payment-method bg-muted rounded-3 p-2 border border-border">
                  <img src="@/assets/images/cart-img/icon/jcb.svg" alt="JCB" style="height: 24px;" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shop Info & Top Rated Products -->
        <div class="col-12 col-lg-3" data-aos="fade-left">
          <div class="sidebar-content">
            <!-- Shop Button -->
            <div class="shop-section mb-4">
              <div class="shop-card bg-card rounded-4 shadow-sm border border-border p-4">
                <div class="shop-info mb-3">
                  <div class="d-flex align-items-center gap-3 mb-3">
                    <div
                      class="shop-avatar bg-primary/10 rounded-circle d-flex align-items-center justify-content-center"
                      style="width: 50px; height: 50px;">
                      <i class="bi bi-shop text-primary fs-4"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1 text-foreground">{{ shops_store.shops.shop_name }}</h6>
                      <small class="text-muted-foreground">ទំនុកចិត្ត 99.8%</small>
                    </div>
                  </div>
                  <div class="shop-stats d-flex justify-content-between text-center">
                    <div>
                      <div class="fw-bold text-primary">4.9</div>
                      <small class="text-muted-foreground">ការវាយតម្លៃ</small>
                    </div>
                    <div>
                      <div class="fw-bold text-primary">{{ shops_store.shops.total_products }}+</div>
                      <small class="text-muted-foreground">ផលិតផល</small>
                    </div>
                    <div>
                      <div class="fw-bold text-primary">5k+</div>
                      <small class="text-muted-foreground">អតិថិជន</small>
                    </div>
                  </div>
                </div>
                <button class="btn btn-outline-primary w-100 py-3 rounded-pill fw-semibold"
                  @click="goToshop(detailProducts.product?.id)">
                  <i class="bi bi-shop me-2"></i>ចូលមើលហាង
                </button>
              </div>
            </div>

            <!-- Top Rated Products -->
            <TopRatedProductsToView />
          </div>
        </div>

        <!-- Product Details Tabs -->
        <div class="col-12 col-lg-8">
          <div class="product-tabs-section">
            <ul class="nav nav-pills nav-fill mb-4" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link rounded-pill px-4 py-3 fw-semibold"
                  :class="{ active: activeTab === 'description' }" @click="activeTab = 'description'">
                  <i class="bi bi-file-text me-2"></i>ព័ណ៌នា
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link rounded-pill px-4 py-3 fw-semibold" :class="{ active: activeTab === 'reviews' }"
                  @click="activeTab = 'reviews'">
                  <i class="bi bi-chat-dots me-2"></i>វាយតម្លៃ
                </button>
              </li>
            </ul>

            <div class="tab-content">
              <div v-if="activeTab === 'description'" class="tab-pane active">
                <div class="description-content p-4 bg-white rounded-3 shadow-sm">
                  <p class="text-muted lh-lg">{{ detailProducts.product.description }}</p>
                </div>
              </div>

              <div v-if="activeTab === 'reviews'" class="tab-pane active">
                <div class="reviews-content">
                  <div class="review-item bg-white p-4 rounded-3 shadow-sm">
                    <div class="d-flex gap-3">
                      <div class="reviewer-avatar">
                        <img src="@/assets/images/1.jpg" alt="Reviewer" class="rounded-circle" width="60" height="60" />
                      </div>
                      <div class="review-content flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <h6 class="fw-bold mb-0">មីងកា​ បាត់ដំបង</h6>
                          <div class="stars d-flex">
                            <i v-for="n in 5" :key="n" class="bi bi-star-fill text-warning"></i>
                          </div>
                        </div>
                        <p class="text-muted mb-0 lh-lg">
                          ក្រូចខ្វិចឆ្ញាញ់ណាស់​ ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                          ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Advertisement -->
        <div class="col-12 col-lg-4">
          <div class="ad-section">
            <img src="@/assets/images/posterDetail.gif" alt="Advertisement" class="img-fluid rounded-3 shadow-sm" />
          </div>
        </div>

        <!-- Similar Products Section -->
        <SimilarProductToView />
      </div>
    </div>
  </section>
  <ToastView />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useI18n } from 'vue-i18n'
import { useRouter } from "vue-router";
import ToastView from "../toast/ToastView.vue";
import { useToastStore } from "@/stores/toast_store";
import { useShopStore } from "@/stores/views/shops_store";
import SimilarProductToView from "./SimilarProductToView.vue";
import { useRelatedProduct } from "@/stores/views/relatedProduct_store";
import TopRatedProductsToView from "./TopRatedProductsToView.vue";
import { useTopRatedProduct } from "@/stores/views/topRatedProduct_store";

const { t } = useI18n()

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const detailProducts = ref(null);
const toastFav = ref(null);
const related_products = ref([]);
const count = ref(0);
const router = useRouter();
const toastStore = useToastStore();
const activeImage = ref(null);
const selectedImageUrl = ref("");
const activeTab = ref('description');
const shops_store = useShopStore()
const relatedProductStore = useRelatedProduct()

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
      relatedProductStore.onLoadRelatedProduct(id.value);
    })
};

const addToCart = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    toastStore.showToast("សូមចូល​គណនី​មុន​បន្ថែម​ទំនិញ");
    return;
  }
  if (!detailProducts.value || !detailProducts.value.product) {
    return;
  }

  const data = {
    product_id: detailProducts.value.product.id,
    qty: count.value || 1,
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

const toggleFav = (FavProduct) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    toastStore.showToast("សូមចូល​គណនីជា​មុនសិន");
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

      if (detailProducts.value && detailProducts.value.product &&
        detailProducts.value.product.id === FavProduct.id) {
        detailProducts.value.product.is_favorited = toastFav.value;
      }
    })
};

onMounted(() => {
  shops_store.onlaodShop(1);
  id.value = router.currentRoute.value.query.id;
  getDetail();
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
/* Product Gallery Styles */
.product-gallery {
  position: sticky;
  top: 2rem;
}

.main-image-container {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.main-image-wrapper {
  position: relative;
  aspect-ratio: 1;
  background: #f8f9fa;
}

.main-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image-wrapper:hover .image-overlay {
  opacity: 1;
}

.main-image-wrapper:hover .main-product-image {
  transform: scale(1.05);
}

.zoom-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Thumbnail Gallery */
.thumbnail-gallery {
  margin-top: 1rem;
}

.thumbnail-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail-item {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-item:hover {
  border-color: var(--bs-success);
  transform: translateY(-2px);
}

.thumbnail-item.active {
  border-color: var(--bs-success);
  box-shadow: 0 4px 12px rgba(50, 202, 131, 0.3);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info Styles */
.product-info {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.rating-section {
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.stars i {
  font-size: 1.1rem;
}

.category-badge .badge {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

.price-section {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.current-price {
  font-size: 2rem;
  line-height: 1.2;
}

.stock-section .badge {
  font-size: 0.875rem;
  font-weight: 600;
}

/* Quantity Controls */
.quantity-controls {
  background: #f8f9fa;
  border-radius: 0.75rem;
  padding: 0.5rem;
  width: fit-content;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bs-success);
}

.quantity-display {
  min-width: 60px;
  font-size: 1.1rem;
}

.action-buttons .btn {
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.favorite-btn {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover {
  transform: scale(1.05);
}

/* Payment Methods */
.payment-methods {
  gap: 0.75rem;
}

.payment-method {
  width: 50px;
  height: 35px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}

.payment-method img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Sidebar Styles */
.sidebar-content {
  position: sticky;
  top: 2rem;
}

.top-rated-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.top-rated-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.top-rated-item:hover {
  background-color: #f0f9f4;
  transform: translateX(4px);
}

.product-thumb {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.5rem;
}

/* Product Tabs */
.product-tabs-section {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.nav-pills .nav-link {
  color: #64748b;
  background: #f1f5f9;
  border: none;
  transition: all 0.3s ease;
}

.nav-pills .nav-link.active {
  background: var(--bs-success);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(50, 202, 131, 0.3);
}

.nav-pills .nav-link:hover:not(.active) {
  background: #e2e8f0;
  transform: translateY(-1px);
}

/* Similar Products */
.similar-products-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.5rem;
  color: #2d3748;
}

.product-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
  border-color: var(--bs-success);
}

.product-image-container {
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.discount-badge {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.favorite-overlay {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.favorite-overlay:hover {
  background: white;
  transform: scale(1.1);
}

.category-tag {
  background: #f0f9f4;
  color: var(--bs-success);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-name {
  cursor: pointer;
  transition: color 0.3s ease;
}

.product-name:hover {
  color: var(--bs-success);
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-info {
    padding: 1.5rem;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .current-price {
    font-size: 1.75rem;
  }

  .product-tabs-section {
    padding: 1.5rem;
  }

  .sidebar-content {
    position: static;
    margin-top: 2rem;
  }
}

@media (max-width: 576px) {
  .action-buttons {
    flex-direction: column;
  }

  .favorite-btn {
    width: 100%;
    height: 50px;
  }

  .quantity-controls {
    justify-content: center;
    width: 100%;
  }
}
</style>