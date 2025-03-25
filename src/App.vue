<template>
  <NavBar v-if="!['login', 'signup', 'forgotpass', 'verifyotp', 'newpass', 'video', 'load1'].includes(route.name)" />
  <RouterView />
  <FooterView v-if="!['login', 'signup', 'forgotpass', 'verifyotp', 'newpass', 'video', 'load1'].includes(route.name)" />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import NavBar from '@/components/layouts/NavBar.vue';
import FooterView from '@/components/layouts/FooterView.vue';
const route = useRoute();
// new Vue({  render: (h) => h(App),  mounted() {    AOS.init()  },}).$mount('#app')
</script>



