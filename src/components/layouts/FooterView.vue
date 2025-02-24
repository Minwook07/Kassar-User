<template>
    <main>
        <div class="footer pt-5 pb-3 mt-5">
            <div class="container-fluid">
                <div class="row ">
                    <div class="col-lg-4 col-12">
                        <div class="item-foot">
                            <div class="logo-foot">
                                <a href="#">
                                    <img src="@/assets/images/kassar_text_white.png" alt="" style=" height: 50px; object-fit: cover;">
                                </a>
                            </div>
                            <div class="text-foot py-3">
                                ពួកយើងជាផ្នែកមួយដើម្បីជួយគាំទ្រដល់អាជីវកម្មរបស់កសិករខ្មែរ
                                ជាមួយ Kassar ដែលនាំឲ្យទីផ្សារកសិកម្មនៅកម្ពុជាមានការប្រសើរឡើង។
                            </div>
                            <div class="icon-foot">
                                <a href="#">
                                    <i class="bi bi-facebook"></i>
                                </a>
                                <a href="#">
                                    <i class="bi bi-instagram"></i>
                                </a>
                                <a href="#">
                                    <i class="bi bi-telegram"></i>
                                </a>
                                <a href="#">
                                    <i class="bi bi-twitter-x"></i>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 mt-lg-0 mt-4">
                        <div class="item-foot">
                            <p class="fw-semibold">ក្រុមហ៊ុន</p>
                            <div class="border-foot"></div> 
                            <ul class="link_foot d-flex flex-column gap-3 pt-2">
                                <li>
                                    <a href="#">អំពីពួកយើង</a>
                                </li>
                                <li>
                                    <a href="#">ទំនាក់ទំនង</a>
                                </li>
                                <li>
                                    <a href="#">New Feed</a>
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
                                    <a href="#">គណនីខ្ញុំ</a>
                                </li>
                                <li>
                                    <a href="#">ប្រវត្តិកម្មង់</a>
                                </li>
                                <li>
                                    <a href="#">FAQs</a>
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
                                    <a href="#">ឯកជនភាព</a>
                                </li>
                                <li>
                                    <a href="#">Return</a>
                                </li>
                                <li>
                                    <a href="#">FAQs</a>
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
                                    <a href="#"> +855 978 654 345</a>
                                </li>
                                <li>
                                    <a href="#">kassar@gmail.com</a>
                                </li>
                                <li>
                                    <a href="#">289, Tuol Kouk, Phnom Penh</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="text-center pt-4">
                    <hr class="pt-3"> 
                    <p class="text-foot">Copyright c 2025 <a href="#" class="text-danger text-decoration-none link-website">Kassar Website Design</a>. All right reserved.</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
:root {
    --bs-primary: #18A558;
    --bs-secoundary: #116530;
    --bs-supporting: #A3EBB1;
    --bs-accent: #F8C519;
    --bs-primary-hover: #158649;
    --bs-secoundary-hover: #0f5728;
    --bs-supporting-hover: #91d6a0;
    --bs-accent-hover: #e0b018;
    --bs-text-white: #ffffff;
    --bs-text-light: #dddddd;
    --bs-text-black: #000000;
}

.footer {
    background-color: var(--bs-primary);
}
.text-foot{
    font-size: 18px !important;
    color: var(--bs-text-white);
}

.icon-foot a i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--bs-supporting-hover);
    border-radius: 100%;
    margin-right: 10px;
    font-size: 20px;
    color: white;
}

.icon-foot a:hover i {
    transform: scale(1.1);
    background-color: var(--bs-secoundary);
}
.item-foot p{
    color: var(--bs-text-white);
    font-size: 18px !important;
}
.border-foot{
    margin-top: -7px;
    margin-bottom: 10px;
    width: 30px;
    border-bottom: 2px solid var(--bs-supporting);
}
.item-foot a {
    text-decoration: none !important;
    color: rgb(241, 241, 241);
    font-size: 18px !important;
    transition: 0.3s;
}
.item-foot .link_foot a:hover{
    color: var(--bs-secoundary-hover);
    padding-left: 5px !important;
}
.item-foot ul {
    list-style: none !important;
    padding-left: 0;
}
.link-website{
    color: var(--bs-accent) !important;
}
</style>
