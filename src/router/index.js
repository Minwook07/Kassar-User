import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import AuthView from '@/views/AuthView.vue'
import DetailProductsView from '@/views/DetailProductsView.vue';
import ViewShopToView from '@/components/views/ViewShopToView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/detailproduct',
      name: 'detailproduct',
      component: DetailProductsView,
    },
    {
      path: '/viewshop',
      name: 'viewshop',
      component: ViewShopToView,
    }
  ],
})

export default router
