<template>
  <section style="background-color: #f4f4f4">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-5">
          <div class="mb-3 rounded">
            <img
              class="w-100 h-100 object-fit-cover rounded"
              ref="imageDetails"
              :src="imageSrc"
              alt=""
            />
          </div>
          <div class="d-flex">
            <div
              class="col-3 rounded"
              v-for="img in detailProducts.imgs"
              :key="img.id"
            >
              <img
                :class="{
                  'border border-success p-0 ': activeImage === img.id,
                }"
                @click="onChangeImage(img.id, img.img)"
                class="p-1 w-100 h-100 object-fit-cover rounded"
                :src="img.img"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 ps-5 mb-5">
          <h2 class="fw-bold mb-3">
            ទឹកផ្លែទំពាំងប៊្លរី <br />ដែនដីក្រុងមនោរម្យ
          </h2>
          <div class="d-flex gap-3 align-content-center mb-4">
            <div
              class="d-flex justify-content-center gap-1 align-content-center"
            >
              <p class="mb-0 text-warning"><i class="bi bi-star-fill"></i></p>
              <p class="mb-0 text-warning"><i class="bi bi-star-fill"></i></p>
              <p class="mb-0 text-warning"><i class="bi bi-star-fill"></i></p>
              <p class="mb-0 text-warning"><i class="bi bi-star-fill"></i></p>
              <p class="mb-0 text-warning"><i class="bi bi-star-fill"></i></p>
            </div>
            <p class="mb-0 .text-dark-emphasis">(99 វាយតម្លៃ)</p>
          </div>
          <div>
            <h2 class="text-primary fw-bold mb-4">
              $40.00
              <span
                class="fw-bold ms-2 fs-5 text-decoration-line-through text-success-emphasis"
                >$65.00</span
              >
            </h2>
            <h5 class="mb-4">
              ប្រភេទ​ ៖ បន្លែ​ ផ្លែឈើ ទំពាំងបាយជូរ​ ក្រូចថ្លុង
            </h5>
          </div>
          <div class="d-flex gap-4 align-items-center mb-3">
            <div
              class="bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1"
            >
              <div
                class="bg-white rounded-circle btn-select-qty d-flex justify-content-center align-items-center"
                @click="decrement()"
              >
                <i class="bi bi-dash-lg text-primary fs-4"></i>
              </div>
              <p class="mb-0 fw-bold fs-5">{{ count }}</p>
              <div
                class="bg-white rounded-circle btn-select-qty d-flex justify-content-center align-items-center"
                @click="count++"
              >
                <i class="bi bi-plus-lg text-primary fs-4"></i>
              </div>
            </div>
            <button class="btn btn-primary rounded-pill px-5 py-2">
              <i class="bi bi-cart3 me-2"></i>ទូទាត់
            </button>
          </div>
          <button class="btn btn-supporting rounded-pill px-3 py-1 mb-4">
            ក្នុងស្តុក
          </button>
          <div class="d-flex text-dark mb-3">
            <p class="mb-0 me-2"><i class="bi bi-heart"></i></p>
            <p class="mb-0">ដាក់ទៅបញ្ជីប្រាថ្នា</p>
          </div>
          <div>
            <h5 class="fw-bold mb-4">ធានាការទូរទាត់ប្រាក់ប្រកបដោយសុវត្ថិភាព</h5>
            <div class="d-flex gap-2 align-items-center">
              <div class="visa-card">
                <img src="../../assets/images/visa.png" alt="" />
              </div>
              <div class="visa-card">
                <img src="../../assets/images/visa.png" alt="" />
              </div>
              <div class="visa-card">
                <img src="../../assets/images/visa.png" alt="" />
              </div>
              <div class="visa-card">
                <img src="../../assets/images/visa.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="d-flex justify-content-end">
            <router-link to="/" class="btn btn-primary mb-3">
              <i class="bi bi-shop me-1"></i>
              ចូលមើលហាង
            </router-link>
          </div>
          <div class="bg-white border-1 p-3 mb-3 rounded">
            <div class="d-flex align-items-center mb-4">
              <div class="px-3 d-flex align-items-center mb-2">
                <div class="line-detail rounded-pill bg-primary me-2"></div>
                <div class="dot-detail rounded-circle bg-primary"></div>
              </div>
              <h5 class="">Top Rated Product</h5>
            </div>
            <div class="row px-3 align-items-center">
              <div class="col-4 mb-3">
                <img
                  class="w-100 h-100 object-fit-cover"
                  src="../../assets/images/5.avif"
                  alt=""
                />
              </div>
              <div class="col-8 mb-3">
                <div class="d-flex gap-2 align-content-center mb-2">
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                </div>
                <p class="mb-0">Mixed solid Seat Cover</p>
                <h5 class="text-primary fw-bold">
                  $40.00
                  <span
                    class="fw-bold fs-6 text-decoration-line-through text-dark"
                    >$65.00</span
                  >
                </h5>
              </div>
              <div class="col-4 mb-3">
                <img
                  class="w-100 h-100 object-fit-cover"
                  src="../../assets/images/5.avif"
                  alt=""
                />
              </div>
              <div class="col-8 mb-3">
                <div class="d-flex gap-2 align-content-center mb-2">
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                </div>
                <p class="mb-0">Mixed solid Seat Cover</p>
                <h5 class="text-primary fw-bold">
                  $40.00
                  <span
                    class="fw-bold fs-6 text-decoration-line-through text-dark"
                    >$65.00</span
                  >
                </h5>
              </div>
              <div class="col-4 mb-3">
                <img
                  class="w-100 h-100 object-fit-cover"
                  src="../../assets/images/5.avif"
                  alt=""
                />
              </div>
              <div class="col-8 mb-3">
                <div class="d-flex gap-2 align-content-center mb-2">
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                  <p class="mb-0 text-warning">
                    <i class="bi bi-star-fill"></i>
                  </p>
                </div>
                <p class="mb-0">Mixed solid Seat Cover</p>
                <h5 class="text-primary fw-bold">
                  $40.00
                  <span
                    class="fw-bold fs-6 text-decoration-line-through text-dark"
                    >$65.00</span
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8 mb-5">
          <nav>
            <div class="nav mynav-tabs nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active p-0"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Description
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Reviews
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabindex="0"
            >
              <h3>អាម៉ុក (ការីត្រីដូង)</h3>
              <p>
                អាម៉ុកត្រយ គឺជាមុខម្ហូបជាតិរបស់កម្ពុជា ត្រីដូងក្រអូប និងហឹរ
                ចំហុយស្លឹកចេក ដែលផ្តល់សាច់ដូចមូស ដែលធ្វើឲ្យវារលាយក្នុងមាត់។
                គ្រឿង​ផ្សំ​គ្រឿង​ក្រៀម​ក៏​ត្រូវ​បាន​បញ្ចូល​ក្នុង​ម្ហូប​ផង​ដែរ។
                សាច់មាន់ តៅហ៊ូ និងខ្យងអាចប្រើជំនួសត្រីបាន។ អាម៉ុកត្រយ
                គឺជាមុខម្ហូបជាតិរបស់កម្ពុជា ត្រីដូងក្រអូប និងហឹរ ចំហុយស្លឹកចេក
                ដែលផ្តល់សាច់ដូចមូស ដែលធ្វើឲ្យវារលាយក្នុងមាត់។
                គ្រឿង​ផ្សំ​គ្រឿង​ក្រៀម​ក៏​ត្រូវ​បាន​បញ្ចូល​ក្នុង​ម្ហូប​ផង​ដែរ។

                <br /><br />
                មាន់ តៅហ៊ូ និងខ្យងអាចប្រើជំនួសត្រីបាន។ អាម៉ុកត្រយ
                គឺជាមុខម្ហូបជាតិរបស់កម្ពុជា ត្រីដូងក្រអូប និងហឹរ ចំហុយស្លឹកចេក
                ដែលផ្តល់សាច់ដូចមូស ដែលសុទ្ធសឹងតែធ្វើអោយវារលាយ។ នៅក្នុងមាត់។
                គ្រឿង​ផ្សំ​គ្រឿង​ក្រៀម​ក៏​ត្រូវ​បាន​បញ្ចូល​ក្នុង​ម្ហូប​ផង​ដែរ។
                មាន់ តៅហ៊ូ និងខ្យងអាចប្រើជំនួសត្រីបាន។ អាម៉ុកត្រយ
                គឺជាមុខម្ហូបជាតិរបស់កម្ពុជា ត្រីដូងក្រអូប និងហឹរ ចំហុយស្លឹកចេក
                ដែលផ្តល់សាច់ដូចមូស ដែលសុទ្ធសឹងតែធ្វើអោយវារលាយ។ នៅក្នុងមាត់។
                គ្រឿង​ផ្សំ​គ្រឿង​ក្រៀម​ក៏​ត្រូវ​បាន​បញ្ចូល​ក្នុង​ម្ហូប​ផង​ដែរ។
                សាច់មាន់ តៅហ៊ូ និងខ្យងអាចប្រើជំនួសត្រីបាន។ មាន់ តៅហ៊ូ
                និងខ្យងអាចប្រើជំនួសត្រីបាន។ អាម៉ុកត្រយ
                គឺជាមុខម្ហូបជាតិរបស់កម្ពុជា ត្រីដូងក្រអូប និងហឹរ ចំហុយស្លឹកចេក
                ដែលផ្តល់សាច់ដូចមូស ដែលសុទ្ធសឹងតែធ្វើអោយវារលាយ។ នៅក្នុងមាត់។
                គ្រឿង​ផ្សំ​គ្រឿង​ក្រៀម​ក៏​ត្រូវ​បាន​បញ្ចូល​ក្នុង​ម្ហូប​ផង​ដែរ។
                មាន់ តៅហ៊ូ និងខ្យងអាចប្រើជំនួសត្រីបាន។ អាម៉ុកត្រយ
                គឺជាមុខម្ហូបជាតិរបស់កម្ពុជា ត្រីដូងក្រអូប និងហឹរ ចំហុយស្លឹកចេក
                ដែលផ្តល់សាច់ដូចមូស ដែលសុទ្ធសឹងតែធ្វើអោយវារលាយ។ នៅក្នុងមាត់។
                គ្រឿង​ផ្សំ​គ្រឿង​ក្រៀម​ក៏​ត្រូវ​បាន​បញ្ចូល​ក្នុង​ម្ហូប​ផង​ដែរ។
                សាច់មាន់ តៅហ៊ូ និងខ្យងអាចប្រើជំនួសត្រីបាន។
              </p>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabindex="0"
            >
              <div
                class="mt-2 d-flex gap-3 align-items-center bg-white py-4 px-3 rounded"
              >
                <div class="pf-feedback-detail rounded-circle ms-2">
                  <img
                    src="../../assets/images/1.jpg"
                    class="rounded-circle"
                    alt=""
                  />
                </div>
                <div>
                  <div class="d-flex px-3 justify-content-between">
                    <h4 class="fw-bold">មីងកា​ បាត់ដំបង</h4>
                    <div class="d-flex gap-2 align-content-center mb-2">
                      <p class="mb-0 text-warning">
                        <i class="bi bi-star-fill"></i>
                      </p>
                      <p class="mb-0 text-warning">
                        <i class="bi bi-star-fill"></i>
                      </p>
                      <p class="mb-0 text-warning">
                        <i class="bi bi-star-fill"></i>
                      </p>
                      <p class="mb-0 text-warning">
                        <i class="bi bi-star-fill"></i>
                      </p>
                      <p class="mb-0 text-warning">
                        <i class="bi bi-star-fill"></i>
                      </p>
                    </div>
                  </div>
                  <div class="px-3">
                    <p>
                      <i class="bi bi-quote text-primary me-1 fs-4"></i
                      >ក្រូចខ្វិចឆ្ញាញ់ណាស់​ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                      ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់
                      ក្រូចខ្វិចឆ្ញាញ់ណាស់ ក្រូចខ្វិចឆ្ញាញ់ណាស់<i
                        class="bi bi-quote ms-1 text-primary fs-4"
                        style="display: inline-block; transform: scaleX(-1)"
                      ></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 mb-5 rounded">
          <div class="mt-0 mt-lg-5">
            <img
              src="../../assets/images/posterDetail.gif"
              class="w-100 h-100 object-fit-cover rounded"
              alt=""
            />
          </div>
        </div>
        <h3 class="fw-bold">Related Product</h3>
        <!-- <div class="row"> -->
        <div
          class="col-12 col-md-6 col-lg-3 mb-3"
          v-for="product in allProduct.products"
          :key="product.id"
        >
          <div
            class="bg-white card card-product border-0 rounded position-relative"
          >
            <div class="card-img p-3">
              <img
                :src="product.img"
                class="mycard-img-top rounded-top object-fit-cover"
                alt=""
              />
            </div>
            <div class="p-3 card-body">
              <div class="d-flex justify-content-between">
                <p class="text-primary mb-1">បន្លែ</p>
                <p class="mb-1">
                  <span class="text-warning me-2"
                    ><i class="bi bi-star-fill"></i></span
                  >4.9
                </p>
              </div>
              <h4 class="fw-bold">{{ product.name }}</h4>
              <p>500g</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="text-primary mb-0 fw-bold">
                  10000៛
                  <span class="text-decoration-line-through text-paragraph"
                    >10000៛</span
                  >
                </p>
                <router-link to="" class="btn btn-primary rounded-pill"
                  ><i class="bi bi-bag-fill me-1"></i>កន្រ្តក</router-link
                >
              </div>
            </div>
            <div
              class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
            >
              <p class="mb-0 px-3 text-white">20%</p>
            </div>

            <div
              class="position-absolute border border-dark-subtle bg-white top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
               @click="OnSavefav(product.id)"
               v-show="!product.isFav"
            >
              <button class="mb-0 mt-1 text-danger fw-bold">
                <i
                 
                 
                  :class="
                    allProduct.isFav
                      ? 'bi bi-heart-fill '
                      : 'bi bi-heart'
                  "
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>
<script setup>
import { ref } from "vue";
import { useDetailProducts } from "@/stores/views/detailproducts_store";
const detailProducts = useDetailProducts();
const count = ref(0);
const decrement = () => {
  if (count.value > 0) {
    count.value--;
  }
};
const imageDetails = ref(null);
const activeImage = ref(null);
const imageSrc = ref(new URL("@/assets/images/5.avif", import.meta.url).href);

activeImage.value = detailProducts.imgs[0].id;
const onChangeImage = (imgId, newImageSrc) => {
  activeImage.value = imgId;
  imageSrc.value = newImageSrc;
};
import { useAllProducts } from "@/stores/views/allProduct_store";
const allProduct = useAllProducts();
const OnSavefav = (id) => {
  let index = allProduct.products.findIndex((item) => item.id == id);
  console.log(index);
  allProduct.products[index].isFav = !allProduct.products[index].isFav;
};
</script>
