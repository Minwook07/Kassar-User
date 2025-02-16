



<script setup lang="ts">
import ProfileRight from '@/components/views/pf-setting/ProfileRight.vue';
import ProfileLeft from '@/components/views/pf-setting/ProfileLeft.vue';


</script>

<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar Column -->
      <div class="col-md-3">
        <ProfileLeft/>

      </div>

      <!-- Main Content Column -->
      <div class="col-md-8 ms-2">
        <ProfileRight />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

