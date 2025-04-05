<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
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
            <span class="text text-1 text-white">{{ toastStore.toastMessage }}</span>
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
import { useToastStore } from "@/stores/toast_store";
import { Toast } from "bootstrap";
import { onMounted } from "vue";

const toastStore = useToastStore();

onMounted(() => {
  toastStore.toast_alert = Toast.getOrCreateInstance(
    document.getElementById("liveToast")
  );
});
</script>
