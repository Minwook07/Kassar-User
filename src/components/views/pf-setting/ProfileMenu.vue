<template>
  <div class="profile-menu mt-4">
    <ul class="nav nav-tabs flex-column">
      <li class="nav-item">
        <RouterLink to="/profile" class="nav-link" active-class="active">
          <i class="bi bi-gear me-2"></i> គណនី
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/login-method" class="nav-link" active-class="active">
          <i class="bi bi-key me-2"></i> វិធីសាស្រ្តចូលគណី
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/usage-history" class="nav-link" active-class="active">
          <i class="bi bi-arrow-repeat me-2"></i> ប្រវត្តិប្រើប្រាស់
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/delivery" class="nav-link" active-class="active">
          <i class="bi bi-geo-alt-fill me-2"></i> រៀបចំដឹកជញ្ជូន
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/edit-info" class="nav-link" active-class="active">
          <i class="bi bi-pencil-square me-2"></i> កែប្រែព័ត៌មាន
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/delete-account" class="nav-link" active-class="active">
          <i class="bi bi-trash3 me-2"></i> លុបគណី
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// No additional logic needed for now
</script>

<style scoped>
.profile-menu {
  max-width: 250px; /* Adjust width as needed */
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #333;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #f8f9fa;
}

.nav-link.active {
  background-color: #e9ecef;
  font-weight: bold;
}
</style>