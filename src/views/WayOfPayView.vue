<template>
    <div class="container contain-hieght py-5">
        <!-- Progress Indicator -->
        <div class="progress-indicator col-lg-11 mb-5 d-flex justify-content-between align-items-center" data-aos="fade-down" data-aos-duration="500">
            <div class="step d-flex justify-content-between align-items-center">
                <div class="step-number step-number-active"><i class="bi bi-check-lg"></i></div>
                <div class="fs-5 part-text fw-bold text-center d-flex justify-content-center align-items-center">ព័ត៌មានទំនិញ
                    <span class="ms-2 part-dash text-center d-sm-none d-none d-md-none d-lg-block">-------------------</span>
                </div>
            </div>
            <div class="step d-flex justify-content-between align-items-center">
                <div class="step-number step-number-active"><i class="bi bi-check-lg"></i></div>
                <div class="fs-5 part-text fw-bold text-center d-flex justify-content-center align-items-center">វិធីសាស្ត្រទូទាត់
                    <span class="ms-2 part-dash text-center d-sm-none d-none d-md-none d-lg-block">-------------------</span>
                </div>
            </div>
            <div class="step d-flex justify-content-between align-items-center">
                <div class="step-number">3</div>
                <div class="fs-5 part-text fw-bold text-center">ការទិញទំនិញជោគជ័យ</div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8 col-md-12" data-aos="fade-right" data-aos-duration="500">
                <PayOptions />
            </div>

            <div class="col-lg-4 col-md-12 mt-lg-0 mt-4" data-aos="fade-left" data-aos-duration="500">
                <Shipping />
            </div>
        </div>
    </div>
    <CreditModal />
</template>

<script setup>
import CreditModal from '@/components/views/payway/PayCreditModal.vue';
import PayOptions from '@/components/views/payway/PayOptions.vue';
import Shipping from '@/components/views/payway/PayShipping.vue';
</script>
