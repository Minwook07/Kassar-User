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


document.addEventListener("DOMContentLoaded", () => {
  // Initialize animation library with performance-focused settings
  AOS.init({
    once: true,
    offset: 40,
    duration: 500,
    easing: 'ease-out',
    disable: window.innerWidth < 768 // Disable on mobile for better performance
  });

  // Enhanced tab animation management
  const handleTabAnimations = () => {
    // Get active tab
    const activeTab = document.querySelector('.tab-pane.active');
    if (!activeTab) return;
    
    // Select animation elements in active tab
    const animElements = activeTab.querySelectorAll('.tab-animation');
    
    // Reset animations
    animElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
    });
    
    // Staggered animations with requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      animElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 50 * (index + 1));
      });
    });
  };

  // Initialize animations for default tab
  handleTabAnimations();
  
  // Tab change listeners
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', () => {
      handleTabAnimations();
      // Update URL hash for shareable links (optional)
      history.pushState(null, null, tabLink.getAttribute('href'));
    });
  });

  // Account deletion handling with improved UX
  const setupDeleteAccount = () => {
    const deleteModal = document.getElementById('deleteConfirmModal');
    const deleteButton = document.getElementById('confirmDelete');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const testPassword = 'test123'; // In production, this would be validated server-side
    
    if (!deleteButton) return;
    
    deleteButton.addEventListener('click', () => {
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
      
      // Validation with focused error handling
      if (!password || !confirmPassword) {
        showFormError(passwordInput, 'សូមបំពេញពាក្យសម្ងាត់ទាំងអស់!');
        return;
      }
      
      if (password !== confirmPassword) {
        showFormError(confirmPasswordInput, 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ!');
        return;
      }
      
      if (password !== testPassword) {
        showFormError(passwordInput, 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ!');
        return;
      }
      
      // Success flow
      bootstrap.Modal.getInstance(deleteModal).hide();
      
      // Show animated success message
      showSuccessOverlay('គណនីត្រូវបានលុបដោយជោគជ័យ!');
      
      // Redirect after animation completes
      setTimeout(() => {
        window.location.href = '/';
      }, 1800);
    });
  };
  
  // Helper to show form validation errors
  const showFormError = (inputElement, message) => {
    // Clear previous errors
    clearFormErrors();
    
    // Add error styling
    inputElement.classList.add('is-invalid');
    
    // Create and insert error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.innerText = message;
    inputElement.parentNode.appendChild(errorDiv);
    
    // Focus the input
    inputElement.focus();
  };
  
  // Helper to clear form errors
  const clearFormErrors = () => {
    document.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
      el.remove();
    });
  };
  
  // Helper to show success overlay
  const showSuccessOverlay = (message) => {
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    successOverlay.innerHTML = `
      <div class="success-message">
        <i class="bi bi-check-circle-fill"></i>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(successOverlay);
  };
  
  // Initialize delete account functionality
  setupDeleteAccount();
  
  // Throttled window resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      AOS.refresh();
    }, 200);
  });
  
  // Add special hover effects to cards and other elements
  document.querySelectorAll('.hover-effect').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-4px)';
      el.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.08)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0)';
      el.style.boxShadow = 'none';
    });
  });
});

</script>

  <style scoped>

.modal-backdrop {
    opacity: 0 !important;
}
.tab-animation {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  will-change: opacity, transform;
}

.tab-pane.active .tab-animation {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation with fewer redundant declarations */
.tab-pane.active .tab-animation:nth-child(1) { transition-delay: 0.05s; }
.tab-pane.active .tab-animation:nth-child(2) { transition-delay: 0.1s; }
.tab-pane.active .tab-animation:nth-child(3) { transition-delay: 0.15s; }
.tab-pane.active .tab-animation:nth-child(4) { transition-delay: 0.2s; }
.tab-pane.active .tab-animation:nth-child(5) { transition-delay: 0.25s; }
.tab-pane.active .tab-animation:nth-child(6) { transition-delay: 0.3s; }

/* Smooth tab transitions */
.tab-pane {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.tab-pane.fade {
  opacity: 0;
  transform: translateX(8px);
}

.tab-pane.fade.show {
  opacity: 1;
  transform: translateX(0);
}

/* Tab navigation styling */
.tab-link {
  position: relative;
  transition: all 0.3s ease;
  color: #6c757d;
}

.tab-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #32CA83;
  transition: width 0.3s ease;
}

.tab-link.active {
  color: #32CA83 !important;
  background-color: rgba(50, 202, 131, 0.1) !important;
}

.tab-link.active::after {
  width: 100%;
}

/* Card and element hover effects */
.hover-effect {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-effect:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

/* Profile card animations */
.profile-card {
  transition: box-shadow 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.profile-img-container {
  overflow: hidden;
  border-radius: 50%;
}

.pf-user {
  transition: transform 0.4s ease;
}

.pf-user:hover {
  transform: scale(1.05);
}

/* Social links animation */
.social-link {
  color: #6c757d;
  transition: color 0.2s ease, transform 0.2s ease;
}

.social-link:hover {
  color: #32CA83;
  transform: translateY(-2px);
}

/* Button styling */
.btn {
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #32CA83;
  border-color: #32CA83;
}

.btn-primary:hover {
  background-color: #28a66c;
  border-color: #28a66c;
  box-shadow: 0 4px 8px rgba(50, 202, 131, 0.2);
}

/* Form controls */
.form-control {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: none !important;
}

.form-control:focus {
  border-color: #32CA83;
  box-shadow: 0 0 0 0.2rem rgba(50, 202, 131, 0.15) !important;
}

/* Success overlay animation */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.success-message {
  text-align: center;
  animation: scaleIn 0.4s ease;
}

.success-message i {
  font-size: 48px;
  color: #32CA83;
  margin-bottom: 16px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Responsive optimizations */
@media (max-width: 768px) {
  .tab-animation {
    transition-duration: 0.25s;
  }
  
  .tab-pane.active .tab-animation {
    transition-delay: 0s !important;
  }
  
  .tab-pane.active .tab-animation:nth-child(n+2) {
    transition-delay: 0.05s !important;
  }
}

/* Fix for modal backdrop */
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.5) !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* Clean up redundant styles */
#bio {
  resize: none;
}

</style>

