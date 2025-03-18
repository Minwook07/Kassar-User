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
                                        <input type="text" class="form-control shadow-none" id="name" placeholder="">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">លេខទូរស័ព្ទ</label>
                                        <input type="text" class="form-control shadow-none" id="name" placeholder="">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">អ៊ីមែល</label>
                                        <input type="text" class="form-control shadow-none" id="email" placeholder="">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">បញ្ចេញមតិ</label>
                                        <textarea class="form-control shadow-none" id="exampleFormControlTextarea1"
                                            rows="4" style="min-height: 150px;"></textarea>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn-contact btn btn-primary">ដាក់បញ្ជូន</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.831910745176!2d104.88776301934413!3d11.572216188389563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951001c8a7b55%3A0xa95ff42ea192073c!2sANT%20Technology%20Training%20School%202!5e0!3m2!1sen!2skh!4v1740537317234!5m2!1sen!2skh" class="contact-map mt-5" width="100%" height="350" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </main>
</template>

