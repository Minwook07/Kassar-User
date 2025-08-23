<!-- components/PasswordInput.vue -->
<template>
  <div class="mb-3 position-relative">
    <label class="form-label">{{ label }}</label>
    <input
      :type="show ? 'text' : 'password'"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      class="position-absolute top-50 end-0 translate-middle-y me-3"
      style="cursor: pointer"
      @click="show = !show"
    >
      <i :class="`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`"></i>
    </span>
  </div>
</template>

<script setup>
defineProps(['label', 'modelValue']);
defineEmits(['update:modelValue']);
const show = ref(false);
</script>