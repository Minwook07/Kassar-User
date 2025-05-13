<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <Transition name="toast-slide">
      <div
        v-if="toastStore.toastMessage"
        id="liveToast"
        class="toast border-0 shadow-lg bg-primary show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-content d-flex align-items-center gap-3 p-3">
          <div class="toast-icon">
            <i class="bi bi-check2-circle fs-5 text-white"></i>
          </div>
          <div class="message flex-grow-1">
            <span class="text text-white fw-medium">{{ toastStore.toastMessage }}</span>
          </div>
          <div>
            <button
              type="button"
              class="btn-close btn-close-white border-0 p-0"
              @click="hideToast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useToastStore } from "@/stores/toast_store";
import { ref, watch } from "vue";

const toastStore = useToastStore();
const autoHideTimer = ref(null);

// Function to hide toast
const hideToast = () => {
  toastStore.toastMessage = ''; // Clear the message to hide toast
  clearTimeout(autoHideTimer.value);
};

// Watch for toast message changes to set auto-hide timer
watch(() => toastStore.toastMessage, (newVal) => {
  if (newVal) {
    // Clear any existing timer
    if (autoHideTimer.value) {
      clearTimeout(autoHideTimer.value);
    }
    
    // hide in 3 seconds
    autoHideTimer.value = setTimeout(() => {
      hideToast();
    }, 3000);
  }
});
</script>

<style scoped>
.toast-container {
  z-index: 1050;
}

.toast {
  border-radius: 12px;
  overflow: hidden;
  width: auto;
  min-width: auto;
  max-width: 400px;
}

/* Vue transition classes */
.toast-slide-enter-active {
  animation: slideInRight 0.3s ease forwards;
}

.toast-slide-leave-active {
  animation: slideOutLeft 0.3s ease forwards;
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

.toast-content {
  display: flex;
  align-items: center;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
}

.message {
  word-break: break-word;
  overflow-wrap: break-word;
}

.message .text {
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Add some responsive adjustments */
@media (max-width: 576px) {
  .toast {
    min-width: 250px;
    max-width: 90vw;
  }
}
</style>