<template>
  <div class="wishlist-page">
    <!-- Header Section -->
    <div class="bg-light py-4">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h1 class="h2 mb-0" data-aos="fade-down">បញ្ជីប្រាថ្នា</h1>
            <p class="text-muted mb-0" data-aos="fade-down">
              <!-- {{ items.length }} -->
              ​ផលិតផលបានជ្រើសរើស
            </p>
          </div>
          <button
            data-aos="fade-left"
            class="btn btn-outline-danger"
            @click="clearWishlist"
          >
            <Trash2 class="me-2 fs-6" />
            លុបទាំងអស់
          </button>
        </div>
      </div>
    </div>

    <!-- Wishlist Items -->
    <div class="container py-5">
      <div v-if="FavProducts === 0" class="text-center py-5">
        <Heart class="text-muted mb-3" size="48" />
        <h3 class="h4 mb-3">បញ្ជីប្រាថ្នារបស់អ្នកគឺទទេរ</h3>
        <p class="text-muted mb-4">
          ស្វែងរកផលិតផលបន្ថែមដើម្បីបញ្ជូលក្នុងបញ្ជីប្រាថ្នា
        </p>
        <router-link to="/allproducts" class="me-2 btn btn-primary"
          >មើលផលិតផល</router-link
        >
      </div>

      <div v-else>
        <!-- Category Filters -->
        <div class="mb-4" data-aos="fade-down-right">
          <div class="d-flex gap-2 flex-wrap">
            <button
              v-for="FavProduct in FavProducts"
              :key="FavProduct.id"
              class="btn"
              :class="
                selectedCategory === FavProduct.product.category_id
                  ? 'btn-success'
                  : 'btn-outline-success'
              "
              @click="filterByCategory(FavProduct.product.category_id)"
            >
              {{ FavProduct.product.category_id }}
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="row">
          <div
            data-aos="fade-up"
            v-for="FavProduct in FavProducts"
            :key="FavProduct.id"
            class="col-12 col-md-4 col-lg-3 mb-4"
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
                  @click="removeFromWishlist(FavProduct.id)"
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
                <p class="small text-muted mb-3">
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
                      >/ {{ FavProduct.product.unit }}</span
                    >
                  </div>
                  <span class="badge bg-light text-success">
                    <!-- {{ item.stock }} in stock -->
                  </span>
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
  X,
  MapPin,
} from "lucide-vue-next";
import axios from "axios";
import { onMounted } from "vue";
const FavProducts = ref();
const token = localStorage.getItem("token");
// const token = "9|BKu4srmyXm8oeP7QH4qnIBu1Qo4s24oFhC6fgtJqcddf1db5";
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
      console.log(res.data.data);
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
onMounted(() => {
  GetAllFav();
});

// const categories = computed(() => {
//   const uniqueCategories = new Set(items.value.map(item => item.category))
//   return ['ទាំងអស់', ...Array.from(uniqueCategories)]
// })

// const filteredItems = computed(() => {
//   if (selectedCategory.value === 'ទាំងអស់') {
//     return items.value
//   }
//   return items.value.filter(item => item.category === selectedCategory.value)
// })

// const removeFromWishlist = (id: number) => {
//   items.value = items.value.filter(item => item.id !== id)
// }

// const filterByCategory = (category: string) => {
//   selectedCategory.value = category
// }
</script>

<style scoped>
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
</style>
