<template>
  <div class="card h-100 border-0 shadow-sm product-card">
    <div class="position-relative p-3">
      <!-- Skeleton for image -->
      <div class="skeleton-image rounded"></div>
      <!-- Skeleton for discount badge -->
      <div class="position-absolute top-0 start-0 mt-3 ms-3 skeleton-badge rounded-pill"></div>
      <!-- Skeleton for favorite button -->
      <div class="position-absolute top-0 end-0 mt-3 me-3 skeleton-circle"></div>
    </div>
    
    <div class="card-body">
      <div class="d-flex justify-content-between mb-2">
        <!-- Skeleton for category -->
        <div class="skeleton-text-sm"></div>
        <!-- Skeleton for rating -->
        <div class="skeleton-text-sm"></div>
      </div>
      
      <!-- Skeleton for title -->
      <div class="skeleton-text-lg mb-2"></div>
      
      <!-- Skeleton for description -->
      <div class="skeleton-text-sm mb-1"></div>
      <div class="skeleton-text-sm mb-1"></div>
      <div class="skeleton-text-sm mb-3"></div>
      
      <div class="d-flex justify-content-between align-items-center">
        <!-- Skeleton for price -->
        <div class="skeleton-text-md"></div>
        <!-- Skeleton for button -->
        <div class="skeleton-button rounded-pill"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for the skeleton
</script>

<style scoped>
.skeleton-image {
  height: 180px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-badge {
  width: 50px;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text-sm {
  height: 12px;
  width: 80px;
  margin-right: 10px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-text-md {
  height: 16px;
  width: 100px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-text-lg {
  height: 20px;
  width: 140px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-button {
  height: 38px;
  width: 100px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>