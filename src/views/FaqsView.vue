<template>
    <main>
        <div class="bg-faq d-flex align-items-center justify-content-center">
            <div class="" data-aos="fade-down" data-aos-duration="500">
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
                <div class="col-5" data-aos="fade-right" data-aos-duration="500">
                    <div class="faq-title">
                        <h2 class="title fw-bold">សំណួរទូរទៅរបស់គេហទំព័រ</h2>
                        <p class="pe-4">
                            សូមស្វាគមន៍មកកាន់ទំព័រសំណួរ និងចំលើយរបស់យើង ដើម្បីជាភាពងាយស្រួលដល់ចំងល់ការប្រើប្រាស់នូវក្នុងគេហទំព័រនេះឳ្យកាន់តែប្រសើ។
                            ហើយប្រសិនជាលោក អ្នកមានចំងល់ណាមួយក្រៅពីសំណួរ និងចំលើយដែលបង្ហាញនេះសូមធ្វើការទាក់ទងមកកាន់យើងខ្ញុំនៅប៊ូតុងខាងក្រោមបាន  <i class="bi bi-arrow-down-circle text-success"></i>
                        </p>
                    </div>
                </div>
                <div class="col-7" data-aos="fade-left" data-aos-duration="500">
                    <div>
                        <div v-for="faq in faqStore.faqs" :key="faq.id" class="accordion" id="faqAccordion">
                            <!-- Question 1 -->
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" @click="toggleFaq(faq.id)"
                                        :aria-expanded="openFaq === faq.id" :aria-controls="'faq' + faq.id">
                                        <div class="w-100 d-flex justify-content-between align-items-center">
                                            <span>{{ faq.question }}</span>
                                            <i v-if="openFaq === faq.id" class="bi bi-arrow-up-circle"></i>
                                            <i v-else class="bi bi-arrow-down-circle"></i>
                                        </div>
                                    </button>
                                </h2>
                                <div :id="'faq' + faq.id" class="accordion-collapse collapse"
                                    data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        {{ faq.answer }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-faq-contact d-flex align-items-center justify-content-center mt-5">
                <div class="text-center" data-aos="zoom-out" data-aos-duration="250">
                    <h3 class="text-light fw-bold">អ្នករកមិនឃើញអ្វីដែលអ្នកកំពុងស្វែងរក?</h3>
                    <p class="text-light">សូមធ្វើការផ្ញើសារមកកាន់យើងប្រសិនអ្នកមានអ្វីមិនច្បាស់លើគេហទំព័ររបស់យើង</p>
                    <div class="">
                        <router-link to="/contact" role="button"
                            class="text-light btn-link-contact btn btn-success fw-bold text-decoration-none px-5 py-3 fs-6">
                            ទំនាក់ទំនង</router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Collapse } from 'bootstrap';

import { useFaqStore } from '@/stores/faq_store';

const openFaq = ref(null);
const faqStore = useFaqStore()

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

    faqStore.onLoadFaq()
});

const toggleFaq = (id) => {
    const currentElement = document.getElementById('faq' + id);
    const previousElement = openFaq.value ? document.getElementById('faq' + openFaq.value) : null;

    if (currentElement) {
        if (openFaq.value === id) {
            // If clicking the already open FAQ, close it
            new Collapse(currentElement).hide();
            openFaq.value = null;
        } else {
            // Close the previously opened FAQ (if any)
            if (previousElement) {
                new Collapse(previousElement).hide();
            }

            // Open the new FAQ
            new Collapse(currentElement).show();
            openFaq.value = id;
        }
    }
};
</script>