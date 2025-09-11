import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fontsource/kantumruy-pro';
import '@/assets/css/main.css';
import '@/assets/css/cart.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'aos/dist/aos.css';
import axios from 'axios';
import { loadLocaleMessages } from './utils/i18nLoader';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import AOS from 'aos';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const i18n = createI18n({
    legacy: false,
    locale: 'km',
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
});

const app = createApp(App);

app.use(i18n)
app.use(createPinia())
app.use(router)
app.mount('#app')


AOS.init();

// AOS.init({
//   duration: 1000,
//   once: true,
//   easing: 'ease-in-out',
// });