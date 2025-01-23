<template>
  <section style="background-color: #f4f4f4">
    <div class="container py-5">
      <div class="row">
        <div class="col-4 px-0">
          <div class="mb-3 rounded" style="height: 390px">
            <img
              class="w-100 h-100 object-fit-cover rounded"
              ref="imageDetails"
              :src="imageSrc"
              alt=""
            />
          </div>
          <div class="row px-0">
            <div
              class="col-3  rounded"
              :class="{
                'border border-success bg-warning': activeImage === img.id,
              }"
              v-for="img in detailProducts.imgs"
              :key="img.id"
            >
              <img
                @click="onChangeImage(img.id, img.img)"
                class="w-100 h-100 object-fit-cover rounded"
                :src="img.img"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-4 ps-5 ">
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
            <h5 class="mb-4">ប្រភេទ​ ៖ បន្លែ​ ផ្លែឈើ ទំពាំងបាយជូរ​ ក្រូចថ្លុង</h5>
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
            <button class="btn btn-primary rounded-pill fs-5 px-5 py-2"><i class="bi bi-cart3 me-2"></i>ទូទាត់</button>
          </div>
          <button class="btn btn-supporting rounded-pill px-3 py-1 mb-4">ក្នុងស្តុក</button>
          <div class="d-flex text-dark">
            <p class="mb-0 me-2"><i class="bi bi-heart"></i></p>
            <p class="mb-0">ដាក់ទៅបញ្ជីប្រាថ្នា</p>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-white border-1 p-3 mb-3">
            <div class="d-flex align-items-center mb-4">
              <div class="px-3 d-flex align-items-center mb-2">
                <div
                  class="line-detail rounded-pill bg-primary me-2"
                ></div>
                <div
                  class="dot-detail rounded-circle bg-primary "
                ></div>
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
                <h5 class="text-light fw-bold">
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
                <h5 class="text-light fw-bold">
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
                <h5 class="text-light fw-bold">
                  $40.00
                  <span
                    class="fw-bold fs-6 text-decoration-line-through text-dark"
                    >$65.00</span
                  >
                </h5>
              </div>
            </div>
          </div>
          <div>
            <img
              src="../../assets/images/posterDetail.gif"
              class="w-100 h-100 object-fit-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
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
  // console.log('hi',imageDetails.value.value);
};
</script>
