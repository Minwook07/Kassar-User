<!-- <template>
  <div class=" frm-login container-fluid vh-100 d-flex align-items-center justify-content-center">
    <LoginView />
    <SigninView />
  </div>
</template>

<script setup>
import LoginView from '@/components/views/auth/LoginView.vue';
import SigninView from '@/components/views/auth/SigninView.vue';
</script> -->
<template>
  <div class="frm-login container-fluid vh-100 d-flex align-items-center justify-content-center">
    <router-view />
  </div>
</template>
