<script setup>
import FormProfile from '@/components/views/pf-setting/FormProfile.vue';
import Navlist from '@/components/views/pf-setting/Navlist.vue';
import ViewProfileView from '@/components/views/pf-setting/ViewProfileView.vue';

</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-3 ">
        <!-- Profile Sidebar -->
        <ViewProfileView />

        <!-- Profile Menu -->
        <Navlist />
        

        
        
      </div>
      

      <!-- Info Display -->
      <div class="col-md-8 ms-2 ">
        <FormProfile />

      </div>
    </div>
  </div>
</template>



  