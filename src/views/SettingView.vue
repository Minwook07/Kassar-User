<template>
  <div class="container py-5" data-aos="fade-up" data-aos-duration="800">
    <div class="row g-4">
      <!-- Sidebar Column -->
      <div class="col-12 col-md-3" data-aos="fade-right" data-aos-delay="100">
        <!-- Profile Card -->
         <ProfileToView/>
         <TabView/>
      </div>

      <!-- Main Content -->
      <div class="col-md-9">
        <ContentView/>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel"
    aria-hidden="true " data-bs-backdrop="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" data-aos="zoom-in" data-aos-duration="300">
        <div class="modal-header">
          <h5 class="modal-title fs-5 fw-bold text-danger" id="deleteConfirmModalLabel">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>បញ្ជាក់ការលុបគណនី
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="mb-4">លោកអ្នកនឹងបាត់បង់ទិន្នន័យទាំងអស់ដែលបានបង្កើតក្នុងគណនីនេះ។<br>
            គណនីនេះមិនអាចយកវិញបាននោះទេ។</p>

          <div class="mb-4">
            <label class="form-label fw-semibold mb-2">បញ្ចូលពាក្យសម្ងាត់</label>
            <input type="password" id="password" class="form-control form-control-lg rounded-3" 
              placeholder="បញ្ចូលពាក្យសម្ងាត់" />
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold mb-2">ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់</label>
            <input type="password" id="confirm_password" class="form-control form-control-lg rounded-3"
              placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary px-4 py-2 rounded-2" data-bs-dismiss="modal">បោះបង់</button>
          <button type="button" id="confirmDelete" class="btn btn-danger px-4 py-2 rounded-2">យល់ព្រមលុប</button>
        </div>
      </div>
    </div>
  </div>




</template>

<script setup>
import ProfileToView from '@/components/views/pf-setting/ProfileToView.vue';
import TabView from '@/components/views/pf-setting/TabView.vue';
import ContentView from '@/components/views/pf-setting/ContentView.vue';
</script>



