import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/components/views/auth/LoginView.vue'
import SignupView from '@/components/views/auth/SignupView.vue'
import ForgotPassView from '@/components/views/auth/ForgotPassView.vue'
import VerifyOtpView from '@/components/views/auth/VerifyOtpView.vue'
import ResetPasswordView from '@/components/views/auth/ResetPassView.vue'
import DetailProductsView from '@/views/DetailProductsView.vue';
import ViewShopView from '@/views/ViewShopView.vue'
import AllProductView from '@/views/AllProductView.vue'
import CartView from '@/views/CartView.vue'
import PaySuccessView from '@/views/PaySuccessView.vue'
import WishListView from '@/views/WishListView.vue'
import RequestSeller from '@/views/RequestSeller.vue'
import TermofuseView from '@/views/TermofuseView.vue'
import FooterView from '@/components/layouts/FooterView.vue'
import ContactUsView from '@/views/ContactUsView.vue'
import FaqsView from '@/views/FaqsView.vue'
import VideoFeedView from '@/views/VideoFeedView.vue'
import PolicyView from '@/views/PolicyView.vue'
import TermPageView from '@/views/TermPageView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import AuthLoader from '@/components/views/loader/AuthLoader.vue'
import PayWayTest from '@/components/views/PayWayTest.vue'
import SettingsView from '@/views/SettingsView.vue'
import AllShopToView from '@/components/views/shop/AllShopToView.vue'
import PayCreditModal from '@/components/views/payway/PayCreditModal.vue'

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
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignupView,
		},
		{
			path: '/forgot-password',
			name: 'forgotpass',
			component: ForgotPassView,
		},
		{
			path: '/verify-otp',
			name: 'VerifyOTP',
			component: VerifyOtpView,
		},
		{
			path: '/reset-password',
			name: 'ResetPassword',
			component: ResetPasswordView,
		},
		{
			path: '/profile',
			name: 'profile',
			component: SettingsView,
			meta: { requiredAuth: true }
		},
		{
			path: '/detailproduct',
			name: 'detailproduct',
			component: DetailProductsView,
		},
		{
			path: '/allshops',
			name: 'allshops',
			component: AllShopToView,
		},
		{
			path: '/viewshop',
			name: 'viewshop',
			component: ViewShopView,
		},
		{
			path: '/allproducts',
			name: 'allproducts',
			component: AllProductView,
		},
		{
			path: '/cart',
			name: 'cart',
			component: CartView,
			meta: { requiredAuth: true }
		},
		{
			path: '/success',
			name: 'success',
			component: PaySuccessView,
			meta: { requiredAuth: true }
		},
		{
			path: '/wishlist',
			name: 'wishlist',
			component: WishListView,
			meta: { requiredAuth: true }
		},
		{
			path: '/seller',
			name: 'seller',
			component: RequestSeller,
			meta: { requiredAuth: true }
		},
		{
			path: '/termofuse',
			name: 'termofuse',
			component: TermofuseView,
		},
		{
			path: '/footer',
			name: 'footer',
			component: FooterView,
		},
		{
			path: '/contact',
			name: 'contact',
			component: ContactUsView,
		},
		{
			path: '/faq',
			name: 'faq',
			component: FaqsView,
		},
		{
			path: '/video',
			name: 'video',
			component: VideoFeedView
		},
		{
			path: '/policy',
			name: 'policy',
			component: PolicyView,
		},
		{
			path: '/termpage',
			name: 'termpage',
			component: TermPageView,
		},
		{
			path: '/privacy',
			name: 'privacy',
			component: PrivacyView,
		},
		{
			path: '/load1',
			name: 'load1',
			component: AuthLoader,
		},
		{
			path: '/payway-test',
			name: 'payway-test',
			component: PayWayTest,
		},
		{
			path: '/waypay',
			name: 'waypay',
			component: PayCreditModal,
		}
	],
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token') || sessionStorage.getItem('token')
	if (to.meta.requiredAuth && !token) {
		next('/login')
	} else {
		next()
	}
})

export default router
