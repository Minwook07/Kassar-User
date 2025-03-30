<template>
  <section>
    <div class="container py-5">
      <div class="row" v-if="detailProducts">
        <div class="col-12 col-md-6 col-lg-4 mb-5" data-aos="fade-down-right">
          <div class="mb-3 rounded" style="height: 400px">
            <img
              class="w-100 h-100 object-fit-cover rounded"
              :src="detailProducts.product.product_thumbnail"
              alt=""
            />
          </div>
          <div class="d-flex">
            <!-- <div
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
            </div> -->
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 ps-5 mb-5">
          <h2 class="fw-bold mb-3" data-aos="fade-down">
            {{ detailProducts.product.name }}
          </h2>
          <div
            data-aos="zoom-in-up"
            class="d-flex gap-3 align-content-center mb-4"
          >
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
            <div
                    v-if="detailProducts.product.price && detailProducts.product.price.has_discount !== false"
                  >
                    <p class="text-primary mb-0 fw-bold">
                      {{ detailProducts.product.price.discounted_price }} /
                      {{ detailProducts.product.product_units.name }}
                    </p>
                    <span class="text-decoration-line-through text-paragraph">
                      {{ detailProducts.product.price.original }}</span
                    >
                  </div>
                  <p class="text-primary mb-0 fw-bold" v-else>
                    {{ detailProducts.product.price.original }} /
                    {{ detailProducts.product.product_units.name }}
                  </p>
            <h5 class="mb-4" data-aos="fade-up">
              ប្រភេទ​ ៖ {{ detailProducts.product.category.name }}
            </h5>
          </div>
          <div class="d-flex gap-4 align-items-center mb-3">
            <div
              data-aos="fade-right"
              class="bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1"
            >
              <div 
                class="bg-white rounded-circle btn-select-qty d-flex justify-content-center align-items-center"
                @click="count>0 && count--"
              >
                <i class="bi bi-dash-lg text-primary fs-4"></i>
              </div>
              <p class="mb-0 fw-bold fs-5">{{ count }}</p>
              <div
                class="bg-white rounded-circle btn-select-qty d-flex justify-content-center align-items-center"
                  :class="{'disabled': count >= detailProducts.product.qty_in_stock}"
                 @click="count < detailProducts.product.qty_in_stock && count++"
              >
                <i class="bi bi-plus-lg text-primary fs-4"></i>
              </div>
            </div>
            <button
              data-aos="fade-left"
              class="btn btn-primary rounded-pill px-5 py-2 mb-2"
            >
              <i class="bi bi-cart3 me-2"></i>ដាក់ចូលកន្រ្តក
            </button>
          </div>
          <button
            v-if="detailProducts.product.stock_status === 'low_stock'"
            class="btn btn-warning rounded-pill text-white mb-3"
          >
            ស្តុកតិច
          </button>

          <button
            v-if="detailProducts.product.stock_status === 'in_stock'"
            class="btn btn-primary rounded-pill mb-3"
          >
            មានស្តុក
          </button>

          <button
            v-else-if="detailProducts.product.stock_status === 'out_of_stock'"
            class="btn btn-secondary rounded-pill text-white mb-3"
          >
            អស់ស្តុក
          </button>

          <div data-aos="fade-down" class="d-flex text-dark mb-3">
            <p class="mb-0 me-2"><i class="bi bi-heart"></i></p>
            <p class="mb-0">ដាក់ទៅបញ្ជីប្រាថ្នា</p>
          </div>
          <div>
            <h5 class="fw-bold mb-4">ធានាការទូរទាត់ប្រាក់ប្រកបដោយសុវត្ថិភាព</h5>
            <div class="d-flex gap-2 align-items-center">
              <div class="visa-card">
                <img src="@/assets/images/cart-img/icon/visa.svg" alt="" />
              </div>
              <div class="visa-card">
                <img
                  src="@/assets/images/cart-img/icon/mastercard (1).svg"
                  alt=""
                />
              </div>
              <div class="visa-card">
                <img src="@/assets/images/cart-img/icon/unionpay.svg" alt="" />
              </div>
              <div class="visa-card">
                <img src="@/assets/images/cart-img/icon/jcb.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="d-flex justify-content-end">
            <button 
              data-aos="fade-up"
              to="/viewshop"
              class="btn btn-primary mb-3"
              @click="goToshop(detailProducts.shop.id)">
              <i class="bi bi-shop me-1"></i>
              ចូលមើលហាង
            </button>
          </div>
          <div
            data-aos="fade-down-left"
            class="bg-white border-1 p-3 mb-3 rounded"
          >
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
                  src="@/assets/images/5.avif"
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
                  src="@/assets/images/5.avif"
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
                  src="@/assets/images/5.avif"
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
          <div class="tab-content shadow-none" id="nav-tabContent">
            <div
              data-aos="fade-right"
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabindex="0"
            >
              <p>{{ detailProducts.description }}</p>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabindex="0"
            >
              <divi
                class="mt-2 d-flex gap-3 align-items-center bg-white py-4 px-3 rounded"
              >
                <div class="pf-feedback-detail rounded-circle ms-2">
                  <img
                    src="@/assets/images/1.jpg"
                    class="rounded-circle"
                    alt=""
                  />
                </div>
                <div data-aos="fade-right">
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
              </divi>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 mb-5 rounded">
          <div class="mt-0 mt-lg-5">
            <img
              data-aos="fade-left"
              src="@/assets/images/posterDetail.gif"
              class="w-100 h-100 object-fit-cover rounded"
              alt=""
            />
          </div>
        </div>
        <h3 class="fw-bold" data-aos="fade-up-right">Related Product</h3>
        <!-- <div class="row"> -->
        <div
          data-aos="fade-up"
          class="col-12 col-md-6 col-lg-3 mb-3"
          v-for="related_products in detailProducts.related_products"
          :key="related_products.id"
        >
          <div
            class="bg-white card card-product border-0 rounded position-relative"
          >
            <div class="card-img p-3">
              <img
                :src="related_products.product_thumbnail"
                class="mycard-img-top rounded-top object-fit-cover"
                alt=""
              />
            </div>
            <div class="p-3 card-body">
              <div class="d-flex justify-content-between">
                <p class="text-primary mb-1">{{related_products.category.name }}</p>
                <p class="mb-1">
                  <span class="text-warning me-2"
                    ><i class="bi bi-star-fill"></i></span
                  >4.9
                </p>
              </div>
              <h4 class="fw-bold">{{ related_products.name }}</h4>
              <p>{{ related_products.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div
                    v-if="related_products.price && related_products.price.has_discount !== false"
                  >
                    <p class="text-primary mb-0 fw-bold">
                      {{ related_products.price.discounted_price }} /
                      {{related_products.product_units.name }}
                    </p>
                    <span class="text-decoration-line-through text-paragraph">
                      {{ related_products.price.original }}</span
                    >
                  </div>
                  <p class="text-primary mb-0 fw-bold" v-else>
                    {{ related_products.price.original }} /
                    {{related_products.product_units.name }}
                  </p>
                <router-link to="" class="btn btn-primary rounded-pill"
                  ><i class="bi bi-bag-fill me-1"></i>កន្រ្តក</router-link
                >
              </div>
            </div>
            <div
                class="position-absolute bg-primary card-product-discount top-0 ms-3 mt-3"
                v-for="promotion in related_products.promotions"
                :key="promotion.id"
              >
                <p class="mb-0 px-3 text-white">
                  {{ promotion.promotions.discount_rate }} %
                </p>
              </div>

            <!-- <div
              class="position-absolute border border-dark-subtle top-0 end-0 me-3 save-fav rounded-circle d-flex justify-content-center align-items-center"
              @click="allProducts.toggleFav(product.id)"
            >
              <p class="mb-0 mt-1 text-danger fw-bold">
                <i
                  :class="product.isFav ? 'bi bi-heart-fill' : 'bi bi-heart'"
                ></i>
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import { useAllProducts } from "@/stores/views/allProduct_store";
const allProducts = useAllProducts();
const detailProducts = ref(null);
const related_products = ref();
const count = ref(0);
const router = useRouter();
const getDetail = () => {
  const id = router.currentRoute.value.query.id;
  axios
    .get(`api/products/${id}`)
    .then((res) => {
      detailProducts.value = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(() => {
  getDetail();
});
// const router = useRouter();
const goToshop = (id) =>{
  router.push({ name: 'viewshop', query: { id } });
}
// const imageDetails = ref(null);
// const activeImage = ref(null);
// const imageSrc = ref(new URL("@/assets/images/5.avif", import.meta.url).href);

// activeImage.value = detailProducts.imgs[0].id;
// const onChangeImage = (imgId, newImageSrc) => {
//   activeImage.value = imgId;
//   imageSrc.value = newImageSrc;
// };
</script>
