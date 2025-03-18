<template>
    <main>
        <div class="bg-faq d-flex align-items-center justify-content-center">
            <div class="" data-aos="fade-down"
            data-aos-duration="500">
                <h1 class="text-secondary fw-bold">FAQs Page</h1>
                <div class="text-center">
                    <router-link to="/" class="text-secondary text-decoration-none">ទំព័រដើម</router-link>
                    <router-link to="/faq" class="text-secondary text-decoration-none">/
                        FAQs</router-link>
                </div>
            </div>
        </div>
        <div class="container py-5">
            <div class="row">
                <div class="col-5" data-aos="fade-right"
                data-aos-duration="500">
                    <div class="faq-title">
                        <h2 class="title fw-bold">សំណួរទូរទៅរបស់គេហទំព័រ</h2>
                        <p>
                            Prepared is me marianne pleasure likewise debating. Wonder an unable except better stairs do
                            ye
                            admire. His secure called esteem praise.
                        </p>
                    </div>
                </div>
                <div class="col-7" data-aos="fade-left"
                data-aos-duration="500">
                    <div>
                        <div class="accordion" id="faqAccordion">
                            <!-- Question 1 -->
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" @click="toggleFaq('faq1')"
                                        aria-expanded="false" aria-controls="faq1">
                                        <div class="w-100 d-flex justify-content-between align-items-center">
                                            <span>How can I order my favourite product?</span>
                                            <i v-if="openFaq === 'faq1'" class="bi bi-arrow-up-circle"></i>
                                            <i v-else class="bi bi-arrow-down-circle"></i>
                                        </div>
                                    </button>
                                </h2>
                                <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        You can order your product by selecting the item and adding it to the cart.
                                        Then,
                                        proceed to checkout to complete your purchase.
                                    </div>
                                </div>
                            </div>

                            <!-- Question 2 -->
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" @click="toggleFaq('faq2')"
                                        aria-expanded="false" aria-controls="faq2">
                                        <div class="w-100 d-flex justify-content-between align-items-center">
                                            <span>How can I complete the order with payment?</span>
                                            <i v-if="openFaq === 'faq2'" class="bi bi-arrow-up-circle"></i>
                                            <i v-else class="bi bi-arrow-down-circle"></i>
                                        </div>
                                    </button>
                                </h2>
                                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        You can complete the payment using credit/debit cards, mobile banking, or
                                        digital
                                        wallets.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-faq-contact d-flex align-items-center justify-content-center">
            <div class="text-center" data-aos="zoom-out" data-aos-duration="250">
                <h3 class="text-light fw-bold">អ្នករកមិនឃើញអ្វីដែលអ្នកកំពុងស្វែងរក?</h3>
                <p class="text-light">សូមធ្វើការផ្ញើសារមកកាន់យើងប្រសិនអ្នកមានអ្វីមិនច្បាស់លើគេហទំព័ររបស់យើង</p>
                <div class="">
                    <router-link to="/contact" role="button" class="text-light btn btn-success fw-bold text-decoration-none">
                        Contact Us</router-link>
                </div>
            </div>
        </div>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Collapse } from 'bootstrap';

const openFaq = ref(null);

onMounted(() => {
    const collapseElements = document.querySelectorAll('.accordion-collapse');
    collapseElements.forEach(el => new Collapse(el, { toggle: false }));

    // Listen for Bootstrap collapse events
    collapseElements.forEach(el => {
        el.addEventListener('hidden.bs.collapse', () => {
            if (openFaq.value === el.id) {
                openFaq.value = null; // Reset icon state when collapsed
            }
        });
    });
});

const toggleFaq = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const bsCollapse = new Collapse(element);

        if (element.classList.contains('show')) {
            bsCollapse.hide();
            openFaq.value = null; // Set to null when closing
        } else {
            bsCollapse.show();
            openFaq.value = id; // Track open FAQ
        }
    }
};
</script>