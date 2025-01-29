<script setup>
import FormProfile from '@/components/views/pf-setting/InfoDisplay.vue';
import Navlist from '@/components/views/pf-setting/ProfileMenu.vue';
import ViewProfileView from '@/components/views/pf-setting/ViewProfileView.vue';
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar Column -->
      <div class="col-md-3">
        <!-- Profile Sidebar -->
        <ViewProfileView />
        <!-- Profile Menu -->
        <Navlist />
      </div>

      <!-- Main Content Column -->
      <div class="col-md-8 ms-2">
        <!-- Info Display Form -->
        <FormProfile />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
.container {
  max-width: 1200px; /* Adjust as needed */
}

.row {
  margin: 0 auto;
}

.col-md-3 {
  padding-right: 15px; /* Add spacing between columns */
}

.col-md-8 {
  padding-left: 15px; /* Add spacing between columns */
}
</style>