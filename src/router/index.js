import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import AuthView from '@/views/AuthView.vue'
import LoginView from '@/components/views/auth/LoginView.vue'
import SignupView from '@/components/views/auth/SignupView.vue'
import ForgotPassView from '@/components/views/auth/ForgotPassView.vue'
import VerifyOtpView from '@/components/views/auth/VerifyOtpView.vue'
import NewPassView from '@/components/views/auth/NewPassView.vue'
import DetailProductsView from '@/views/DetailProductsView.vue';
import ViewShopToView from '@/components/views/ViewShopToView.vue';
import SettingView from '@/views/SettingView.vue'
import AllProductView from '@/views/AllProductView.vue'
import AddCardView from '@/views/AddCartView.vue'
import WayOfPayView from '@/views/WayOfPayView.vue'
import PaySuccessView from '@/views/PaySuccessView.vue'
import WishListView from '@/views/WishListView.vue'
import RequestSeller from '@/views/RequestSeller.vue'
import FooterView from '@/views/FooterView.vue'


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
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
    },
    {
      path: '/forgotpass',
      name: 'ForgotPass',
      component: ForgotPassView,
    },
    {
      path: '/verifyotp',
      name: 'VerifyOtp',
      component: VerifyOtpView,
    },

    {
      path: '/newpass',
      name: 'NewPass',
      component: NewPassView,
    },

    {
      path: '/profile',
      name: 'ViewProfile',
      component: SettingView,
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
    },
    {
      path: '/allproducts',
      name: 'allproducts',
      component: AllProductView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: AddCardView,
    },
    {
      path: '/waypay',
      name: 'waypay',
      component: WayOfPayView,
    },
    {
      path: '/success',
      name: 'success',
      component: PaySuccessView,
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishListView,
    },
    {
      path: '/seller',
      name: 'seller',
      component: RequestSeller,
    },
    {
      path: '/footer',
      name: 'footer',
      component: FooterView,
    },
  ],
})

export default router
