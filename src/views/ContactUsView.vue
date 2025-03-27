<template>
    <main>
        <div class="bg-contact d-flex align-items-center justify-content-center">
            <div class="" data-aos="fade-down" data-aos-duration="800">
                <h1 class="text-secondary fw-bold">ទំនាក់ទំនង</h1>
                <div class="text-center">
                    <router-link to="/" class="text-secondary text-decoration-none">ទំព័រដើម</router-link>
                    <router-link to="/contact" class="text-secondary text-decoration-none">/
                        ទំនាក់ទំនង</router-link>
                </div>
            </div>
        </div>
        <div class="container-fluid py-5">
            <div class="row">
                <div class="col-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="item-contact">
                        <span class="fw-bold fs-5">ទាក់ទងមកយើងខ្ញុំ</span>
                        <p>អ្នកអាចទាក់ទងមកយើងខ្ញុំតាមរយៈខាងក្រោមនេះបាន</p>
                        <ul class="list-unstyled">
                            <li>
                                <router-link to="" class="contact-link">
                                    <div class="contact-card">
                                        <div class="icon-circle">
                                            <i class="bi bi-telephone"></i>
                                        </div>
                                        <div class="contact-details">
                                            <h5>Phone</h5>
                                            <p>+1 (800) 333 44 55</p>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="" class="contact-link">
                                    <div class="contact-card">
                                        <div class="icon-circle">
                                            <i class="bi bi-envelope"></i>
                                        </div>
                                        <div class="contact-details">
                                            <h5>Email</h5>
                                            <p>kassar@gmail.com</p>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="" class="contact-link">
                                    <div class="contact-card">
                                        <div class="icon-circle">
                                            <i class="bi bi-geo-alt"></i>
                                        </div>
                                        <div class="contact-details">
                                            <h5>Address</h5>
                                            <p>289, Tuol Kouk, Phnom Penh</p>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                        <hr>
                        <div class="link-contact">
                            <p class="fw-bold fs-6">តាមដានប្រព័ន្ធផ្សព្វផ្សាយសង្គមរបស់យើង ៖</p>
                            <div class="">
                                <ul class="list-unstyled d-flex justify-content-between w-50">
                                    <li>
                                        <router-link to="" class="contact-link fb">
                                            <i class="bi bi-facebook"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="" class="contact-link">
                                            <i class="bi bi-instagram"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="" class="contact-link">
                                            <i class="bi bi-telegram"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="" class="contact-link">
                                            <i class="bi bi-twitter-x"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6" data-aos="fade-left" data-aos-delay="100">
                    <div class="item-form p-4 bg-white">
                        <p class="fw-bold fs-5">ផ្ញើសារ</p>
                        <form>
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">ឈ្មោះ</label>
                                        <input type="text" class="form-control shadow-none" id="name" placeholder="" 
                                            :class="{'is-invalid': contactStore.vv.name.$error}" v-model="contactStore.frm.name">
                                            <div class="invalid-feedback" v-if="contactStore.vv.name.$error">
                                                {{ contactStore.vv.name.$errors[0].$message }}
                                                <!-- Please enter your name -->
                                            </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">លេខទូរស័ព្ទ</label>
                                        <input type="text" class="form-control shadow-none" id="phone" placeholder="" 
                                            :class="{'is-invalid': contactStore.vv.phone.$error}" v-model="contactStore.frm.phone">
                                            <div class="invalid-feedback" v-if="contactStore.vv.phone.$error">
                                                {{ contactStore.vv.phone.$errors[0].$message }}
                                            </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">អ៊ីមែល</label>
                                        <input type="text" class="form-control shadow-none" id="email" placeholder=""
                                            :class="{'is-invalid': contactStore.vv.email.$error}" v-model="contactStore.frm.email">
                                            <div class="invalid-feedback" v-if="contactStore.vv.email.$error">
                                                {{ contactStore.vv.email.$errors[0].$message }}
                                            </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">បញ្ចេញមតិ</label>
                                        <textarea class="form-control shadow-none" id="exampleFormControlTextarea1" 
                                            :class="{'is-invalid': contactStore.vv.desc.$error}" v-model="contactStore.frm.desc"
                                            rows="4" style="min-height: 150px;"></textarea>
                                            <div class="invalid-feedback" v-if="contactStore.vv.desc.$error">
                                                {{ contactStore.vv.desc.$errors[0].$message }}
                                            </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn-contact btn btn-outline-danger shadow-none me-3" @click="onClear()">សម្អាត</button>
                                    <button type="button" class="btn-contact btn btn-primary shadow-none" @click="onSaveContact()">ដាក់បញ្ជូន</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.831910745176!2d104.88776301934413!3d11.572216188389563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951001c8a7b55%3A0xa95ff42ea192073c!2sANT%20Technology%20Training%20School%202!5e0!3m2!1sen!2skh!4v1740537317234!5m2!1sen!2skh"
                class="contact-map mt-5" width="100%" height="350" style="border:0;" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </main>

    <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="margin-top: 50px;">
        <div id="liveToast" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="false">
            <div class="toast-content p-3">
                <div>
                    <i class="bi bi-check2-circle fs-5 text-success"></i>
                    <!-- <i class="bi bi-exclamation-circle fs-6 text-info"></i>
                    <i class="bi bi-x-circle fs-6 text-danger"></i> -->
                </div>

                <div class="message">
                    <span class="text text-1">ជោគជ័យ</span>
                </div>
                <div>
                    <button type="button" class="btn btn-close border-0 ms-auto p-0" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
            <div class="progress active"></div>
        </div>
    </div>
</template>

<script setup>
import { useContactStore } from '@/stores/contact_store';
import { Toast } from 'bootstrap';
import { computed, onMounted } from 'vue';
import axios from 'axios';
import { helpers, integer, required, email, maxLength, minLength} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const contactStore = useContactStore()

const rules = computed(() => ({
    name:{
        required: helpers.withMessage('សូមបញ្ចូលឈ្មោះរបស់អ្នក', required)
    },
    phone: {
        required: helpers.withMessage('សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក', required),
        integer: helpers.withMessage('លេខទូរស័ព្ទមិនអាចមានអក្សរ ឬអក្សរពិសេសបានទេ', integer)
    },
    email:{
        required: helpers.withMessage('សូមបញ្ចូលអ៊ីមែលរបស់អ្នក', required),
        email: helpers.withMessage('អ៊ីមែលមិនត្រឹមត្រូវទេ', email)
    },
    desc:{
        required: helpers.withMessage('សូមបញ្ចូលការពិពណ៌នារ', required),
        minLength: helpers.withMessage('ការពិពណ៌នាត្រូវមានយ៉ាងតិច 10 តួអក្សរ', minLength(10)),
        maxLength: helpers.withMessage('ការពិពណ៌នាមិនអាចលើស 500 តួអក្សរ', maxLength(500))
    }
}))
contactStore.vv = useVuelidate(rules, contactStore.frm)

onMounted(() => {
    contactStore.toast_alert = Toast.getOrCreateInstance(document.getElementById('liveToast'));
})

const onClear = () => {
    contactStore.selected_id = 0
    contactStore.frm.name = ''
    contactStore.frm.email = ''
    contactStore.frm.phone = ''
    contactStore.frm.desc = ''
    contactStore.vv.$reset()
}

const onSaveContact = () => {

    contactStore.vv.$validate()
    if(contactStore.vv.$error){
        return
    }

    let frmData = new FormData()
    frmData.append('name', contactStore.frm.name)
        frmData.append('phone', contactStore.frm.phone)
        frmData.append('email', contactStore.frm.email)
        frmData.append('desc', contactStore.frm.desc)

    axios.post('/api/contacts', frmData)
        .then((res) => {
            contactStore.onLoadContact()

            // reset form
            contactStore.frm = {
                name: '',
                phone: '',
                email: '',
                desc: ''
            };

            if (contactStore.toast_alert) {
                contactStore.toast_alert.show();
            }
        })
}
</script>
