import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fontsource/kantumruy-pro';
import '@/assets/css/main.css';
import '@/assets/css/cart.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

app.use(createPinia())
app.use(router)
AOS.init();
app.mount('#app')

AOS.init({
  duration: 1000, 
  once: true,    
  easing: 'ease-in-out', 
});