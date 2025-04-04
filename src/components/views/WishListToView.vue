<template>
  <div class="wishlist-page">
    <!-- Header Section -->
    <div class="py-4 " :style="{ backgroundImage: `url(${bgImage})`}">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h1 class="h2 mb-0" data-aos="fade-down">បញ្ជីប្រាថ្នា</h1>
            <p class="text-muted mb-0" data-aos="fade-down">
              {{ CountFav}}
              ​ផលិតផលបានជ្រើសរើស
            </p>
          </div>
          <button
            data-aos="fade-left"
            class="btn btn-danger"
            @click="clearWishlist"
          >
          <i class="bi bi-trash"></i>
            លុបទាំងអស់
          </button>
        </div>
      </div>
    </div>

    <!-- Wishlist Items -->
    <div class="container py-5">
      <div v-if="CountFav === 0" class="text-center py-5">
        <Heart class="text-muted mb-3" size="48" />
        <h3 class="h4 mb-3">បញ្ជីប្រាថ្នារបស់អ្នកគឺទទេ</h3>
        <p class="text-muted mb-4">
          ស្វែងរកផលិតផលបន្ថែមដើម្បីបញ្ជូលក្នុងបញ្ជីប្រាថ្នា
        </p>
        <router-link to="/allproducts" class="me-2 btn btn-primary"
          >មើលផលិតផល</router-link
        >
      </div>

      <div v-else>
        <!-- Products Grid -->
        <div class="row">
          <div
            data-aos="fade-up"
            v-for="FavProduct in FavProducts"
            :key="FavProduct.id"
            class="col-12 col-md-4 col-lg-3 mb-4" 
            @click="viewProduct"
          >
            <div class="card h-100 border-0 shadow-sm">
              <div class="position-relative">
                <img
                  :src="FavProduct.product.thumbnail_url"
                  class="card-img-top"
                  style="height: 200px; object-fit: cover"
                />
                <button
                  class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  @click="RemoveFav(FavProduct)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
                <span
                  class="badge bg-success position-absolute bottom-0 start-0 m-2"
                  >{{ FavProduct.product.category_id }}</span
                >
              </div>
              <div class="card-body">
                <div
                  class="d-flex justify-content-between align-items-start mb-2"
                >
                  <h5 class="card-title mb-0">{{ FavProduct.product.name }}</h5>
                  <div class="d-flex align-items-center">
                    <Star class="text-warning me-1" />
                    <!-- <span class="small">{{ item.rating }}</span> -->
                  </div>
                </div>
                <p class="small text-muted mb-3 product-desc">
                  {{ FavProduct.product.description }}
                </p>
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <span class="h5 text-success mb-0"
                      >${{ FavProduct.product.price }}</span
                    >
                    <span class="text-muted small"
                      >/ {{ FavProduct.product.product_unit.name}}</span
                    >
                  </div>
                </div>
                <div class="d-grid">
                  <button class="btn btn-primary" @click="addToCart(item.id)">
                    <ShoppingCart class="me-2" size="18" />
                    ដាក់ចូលកន្ត្រក
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
  class="toast-container position-fixed top-0 end-0 p-3"
  >
    <div
      id="liveToast"
      class="toast border-0 p-3 bg-primary"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-content d-flex justify-content-center gap-3">
        <div>
          <i class="bi bi-check2-circle fs-5 text-white"></i>
        </div>

        <div class="message">
          <span class="text text-white"
            >ដកចេញរួចរាល់</span
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
import axios from "axios";
import { onMounted } from "vue";
import { useContactStore } from "@/stores/contact_store";
import { Toast } from "bootstrap";
import bgImage from '@/assets/images/background/bg-fav.png';
const contactStore = useContactStore();
const FavProducts = ref();
const selectedCategory = ref();
const CountFav = ref();
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const GetAllFav = () => {
  console.log(token);

  axios
    .get("/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      FavProducts.value = res.data.data;
      CountFav.value = res.data.favorite_count;
    });
};
const clearWishlist = () => {
  axios
    .delete("/api/favorites-clear", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      GetAllFav();
    })
    .catch((error) => {
      console.error(
        "Error clearing wishlist:",
        error.response?.data || error.message
      );
    });
};
const RemoveFav = (FavProduct) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    alert("Please login to remove products from your favorites.");
    return;
  }
  axios
    .delete(
      `api/favorites/${FavProduct.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
    .then((res) => {
      if (contactStore.toast_alert) {
        contactStore.toast_alert.show();
      }
      GetAllFav();
    })
    .catch((error) => {
      console.error(
        "Remove Favorite:",
        error.response?.data || error.message
      );
    });
};
onMounted(() => {
  GetAllFav();
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
</script>

<style>
.card {
  transition: transform 0.2s;
}

.card:hover {
  cursor: pointer;
  transform: translateY(-2px);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.badge {
  font-weight: 500;
}

.btn-outline-success:hover {
  background-color: var(--bs-success);
  color: white;
}
.bg-fav {
  background-image: url("~@/assets/images/background/bg-fav.png") !important;
}


</style>
