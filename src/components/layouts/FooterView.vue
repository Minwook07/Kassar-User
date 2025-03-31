<template>
    <main>
        <div class="footer pt-5 pb-2">
            <div class="container-fluid">
                <div class="row ">
                    <div class="col-lg-4 col-12">
                        <div class="item-foot">
                            <div class="logo-foot">
                                <RouterLink to="/">
                                    <img src="@/assets/images/kassar_text_white.png" alt="" style=" height: 50px; object-fit: cover;">
                                </RouterLink>
                            </div>
                            <div class="text-foot py-3">
                                ពួកយើងជាផ្នែកមួយដើម្បីជួយគាំទ្រដល់អាជីវកម្មរបស់កសិករខ្មែរ
                                ជាមួយ Kassar ដែលនាំឲ្យទីផ្សារកសិកម្មនៅកម្ពុជាមានការប្រសើរឡើង។
                            </div>
                            <div class="icon-foot">
                                <RouterLink class="link-a" to="">
                                    <i class="bi bi-facebook"></i>
                                </RouterLink>
                                <RouterLink class="link-a" to="">
                                    <i class="bi bi-instagram"></i>
                                </RouterLink>
                                <RouterLink class="link-a" to="">
                                    <i class="bi bi-telegram"></i>
                                </RouterLink>
                                <RouterLink class="link-a" to="">
                                    <i class="bi bi-twitter-x"></i>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 mt-lg-0 mt-4">
                        <div class="item-foot">
                            <p class="fw-semibold">ក្រុមហ៊ុន</p>
                            <div class="border-foot"></div> 
                            <ul class="link_foot d-flex flex-column gap-3 pt-2">
                                <li>
                                    <RouterLink class="link-a" to="/about">អំពីពួកយើង</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="/contact">ទំនាក់ទំនង</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="/video">វិឌីអូ</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 mt-lg-0 mt-4">
                        <div class="item-foot">
                            <p class="fw-semibold">សេវាកម្ម</p>
                            <div class="border-foot"></div> 
                            <ul class="link_foot d-flex flex-column gap-3 pt-2">
                                <li>
                                    <RouterLink class="link-a" to="/profile">គណនីខ្ញុំ</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="/">ប្រវត្តិកម្មង់</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="/faq">សំណួរ & ចម្លើយ</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 mt-lg-0 mt-4">
                        <div class="item-foot">
                            <p class="fw-semibold">ព័ត៌មានលំអិត</p>
                            <div class="border-foot"></div> 
                            <ul class="link_foot d-flex flex-column gap-3 pt-2">
                                <li>
                                    <RouterLink class="link-a" to="/privacy">គោលការណ៍ឯកជនភាព</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="/termpage">លក្ខខណ្ឌ និងការប្រើប្រាស់</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="/policy">បង្វិលប្រាក់វិញ ឬប្រាក់ត្រឡប់</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 mt-lg-0 mt-4">
                        <div class="item-foot">
                            <p class="fw-semibold">ព័ត៌មានទំនាក់ទំនង</p>
                            <div class="border-foot"></div> 
                            <ul class="link_foot d-flex flex-column gap-3 pt-2"> 
                                <li>
                                    <RouterLink class="link-a"  to="#"> +855 978 654 345</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="">kassar@gmail.com</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="link-a" to="">289, Tuol Kouk, Phnom Penh</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <hr class="pt-2"> 
                <p class="text-foot">Copyright &copy; 2025 <RouterLink to="/" class="text-danger text-decoration-none link-website">Kassar Website Design</RouterLink>. All right reserved.</p>
            </div>
        </div>
    </main>
</template>
