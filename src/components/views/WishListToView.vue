<template>
    <div class="wishlist-page">
      <!-- Header Section -->
      <div class="bg-light py-4">
        <div class="container">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h1 class="h2 mb-0" data-aos="fade-down">បញ្ជីប្រាថ្នា</h1>
              <p class="text-muted mb-0" data-aos="fade-down">{{ items.length }} ​ផលិតផលបានជ្រើសរើស</p>
            </div>
            <button data-aos="fade-left" class="btn btn-outline-danger" @click="clearWishlist" v-if="items.length > 0">
              <Trash2 class="me-2" size="18" />
              លុបទាំងអស់
            </button>
          </div>
        </div>
      </div>
  
      <!-- Wishlist Items -->
      <div class="container py-5">
        <div v-if="items.length === 0" class="text-center py-5">
          <Heart class="text-muted mb-3" size="48" />
          <h3 class="h4 mb-3" >បញ្ជីប្រាថ្នារបស់អ្នកគឺទទេរ</h3>
          <p class="text-muted mb-4">ស្វែងរកផលិតផលបន្ថែមដើម្បីបញ្ជូលក្នុងបញ្ជីប្រាថ្នា</p>
            <router-link to="/allproducts" class="me-2 btn btn-primary">មើលផលិតផល</router-link>
        </div>
  
        <div v-else>
          <!-- Category Filters -->
          <div class="mb-4" data-aos="fade-down-right">
            <div class="d-flex gap-2 flex-wrap">
              <button 
                v-for="category in categories" 
                :key="category"
                class="btn"
                :class="selectedCategory === category ? 'btn-success' : 'btn-outline-success'"
                @click="filterByCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>
  
          <!-- Products Grid -->
          <div class="row">
            <div data-aos="fade-up" v-for="item in filteredItems" :key="item.id" class="col-12 col-md-4 col-lg-3">
              <div class="card h-100 border-0 shadow-sm">
                <div class="position-relative">
                  <img :src="item.image" :alt="item.name" class="card-img-top" style="height: 200px; object-fit: cover;">
                  <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" @click="removeFromWishlist(item.id)">
                    <X size="18" />
                  </button>
                  <span class="badge bg-success position-absolute bottom-0 start-0 m-2">{{ item.category }}</span>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0">{{ item.name }}</h5>
                    <div class="d-flex align-items-center">
                      <Star class="text-warning me-1" size="18" fill="#ffc107" />
                      <span class="small">{{ item.rating }}</span>
                    </div>
                  </div>
                  <p class="text-muted small mb-2">
                    <MapPin class="me-1" size="14" />
                    {{ item.farmer }}
                  </p>
                  <p class="small text-muted mb-3">{{ item.description }}</p>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <span class="h5 text-success mb-0">${{ item.price.toFixed(2) }}</span>
                      <span class="text-muted small">/ {{ item.unit }}</span>
                    </div>
                    <span class="badge bg-light text-success">
                      {{ item.stock }} in stock
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
  import { ref, computed } from 'vue'
  import { Heart, ShoppingBag, ShoppingCart, Star, Trash2, X, MapPin } from 'lucide-vue-next'
  

interface WishlistItem {
  id: number
  name: string
  farmer: string
  category: string
  price: number
  unit: string
  rating: number
  image: string
  description: string
  stock: number
}

const selectedCategory = ref('ទាំងអស់')

const items = ref<WishlistItem[]>([
  {
    id: 1,
    name: 'Organic Red Apples',
    farmer: 'Green Valley Farm',
    category: 'ផ្លែឈើ',
    price: 2.99,
    unit: 'kg',
    rating: 4.8,
    stock: 50,
    description: 'Fresh, crisp organic apples perfect for snacking or baking.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Fresh Carrots',
    farmer: 'Sunshine Organics',
    category: 'បន្លែ',
    price: 1.99,
    unit: 'bunch',
    rating: 4.6,
    stock: 75,
    description: 'Locally grown organic carrots, harvested at peak freshness.',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Raw Honey',
    farmer: 'Mountain Apiaries',
    category: 'ទឹកឃ្មំុ',
    price: 12.99,
    unit: 'ក្រឡ',
    rating: 5.0,
    stock: 25,
    description: 'Pure, unfiltered honey from local mountain wildflowers.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Organic Brown Rice',
    farmer: 'Rice Valley Co-op',
    category: 'គ្រាប់ធនញ្ញជាតិ',
    price: 4.99,
    unit: 'kg',
    rating: 4.7,
    stock: 100,
    description: 'Nutrient-rich organic brown rice from sustainable farms.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Fresh Eggs',
    farmer: 'Happy Hens Farm',
    category: 'គ្រឿងទេស',
    price: 5.99,
    unit: 'dozen',
    rating: 4.9,
    stock: 40,
    description: 'Free-range eggs from pasture-raised happy hens.',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Organic Tomatoes',
    farmer: 'Sunshine Organics',
    category: 'បន្លែ',
    price: 3.49,
    unit: 'kg',
    rating: 4.5,
    stock: 60,
    description: 'Vine-ripened organic tomatoes, perfect for salads and cooking.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
])

const categories = computed(() => {
  const uniqueCategories = new Set(items.value.map(item => item.category))
  return ['ទាំងអស់', ...Array.from(uniqueCategories)]
})

const filteredItems = computed(() => {
  if (selectedCategory.value === 'ទាំងអស់') {
    return items.value
  }
  return items.value.filter(item => item.category === selectedCategory.value)
})

const removeFromWishlist = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
}

const clearWishlist = () => {
  items.value = []
}

const addToCart = (id: number) => {
  // TODO: Implement add to cart functionality
  console.log('Adding to cart:', id)
}

const filterByCategory = (category: string) => {
  selectedCategory.value = category
}
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
