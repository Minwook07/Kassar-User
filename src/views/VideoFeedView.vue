<template>
  <div class="video-feed d-flex">
    <div class="video-section d-flex justify-content-center position-relative">
      <div class="top-bar p-3 w-100 d-flex  align-items-center justify-content-between position-absolute top-0 start-0">
        <RouterLink to="/allproducts" class="btn-dark text-decoration-none
         d-flex align-items-center">
          <img src="/kassar.png" alt="" style="width: 40px;">
          <h6 class="m-0 px-2 text-white">ទំព័រផលិតផល</h6>
        </RouterLink>
        <form class="d-flex search-input-wrapper align-items-center">
          <input class="form-control me-2" type="search" placeholder="ស្វែងរកផលិតផល" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">ស្វែងរក</button>
        </form>
        <RouterLink to="/allproducts" class="btn-dark text-decoration-none
         d-flex align-items-center">
          <i class="fa-solid fa-plus fs-3 p-2 text-white"></i>
          <h6 class="m-0 pe-2 text-white">បង្ហោះវីដេអូ</h6>
        </RouterLink>
      </div>
      <div class="sidebar p-3 h-100 position-absolute top-0 end-0 d-flex align-items-center">
        <div class="switch-button-wrapper d-flex flex-column">
          <button class="btn-dark rounded-circle border-0">
            <i class="text-white fs-5 fa-solid fa-chevron-up"></i>
          </button>
          <button class="btn-dark rounded-circle border-0">
            <i class="text-white fs-5 fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>
      <div class="video-link">
      </div>
    </div>
    <div class="video-detail p-3">
      <div class="shop-profile rounded-3 p-3  bg-white">
        <div class="d-flex align-items-start justify-content-between">
          <div class="d-flex">
            <RouterLink to="/viewshop" class="shop-avatar">
              <img src="@/assets/images/user_pf_sample.jpg" alt="">
            </RouterLink>
            <div class="owner-detail ps-2">
              <RouterLink to="/viewshop" class="name text-decoration-none ">
                <h5 class="m-0 fw-bold">ពូធី បន្លែធម្មជាតិបាត់ដំបង់</h5>
              </RouterLink>
              <div class="rating d-flex align-items-center mt-1">
                <h6 class="m-0 fw-bold pe-1 text-black-50">4.5</h6> <i class="fa fa-star text-warning fs-6"></i>
                <span class="px-2 fw-bold fs-5 text-black-50"> · </span>
                <h6 class="m-0 fw-bold pe-1 text-black-50">1 ថ្ងៃមុន</h6>
              </div>
            </div>
          </div>
          <div class="btn btn-primary">
            <span class="d-none d-md-inline-block">តាមដាន</span>
          </div>
        </div>
        <div class="shop-post-title mt-3">
          <p>លក់ បន្លែធម្មជាតិ ទឹកប្រហុកម៉ែរួយ និង ឆៃថាវធ្វើពីការ៉ុត ផលិតផលទាំងអស់បង្កើតដោយកសិករក្នុងទីរួមខេត្តកំពង់ចាម
            កំពង់ស្ពឺ កំពត។</p>
        </div>
      </div>
      <div class="product rounded-3 p-3 bg-white mt-3 d-flex align-items-start">
        <div class="thumbnail">
          <img src="@/assets/images/products/herb.png" alt="">
        </div>
        <div class="detail ms-3">
          <h5 class="fw-bold text-semidark">ជីវ៉ាន់ស៊ុយ ខ្មែរ</h5>
          <p class="m-0">1 <span>គីឡូក្រាម</span></p>
          <p class="fw-bold fs-3 text-secondary m-0">៥០០០៛</p>
          <router-link to="" class="btn btn-outline-primary rounded-2 ms-auto"><i
              class="bi bi-bag-fill me-1"></i>កន្រ្តក</router-link>
        </div>
        <span class="category-pill ms-auto">បន្លែ</span>
      </div>
      <div class="share-action rounded-3 bg-white mt-3 d-flex">
        <input type="text" value="https://kassar-usr.chandalen.dev/product" id="myInput" 
        class="w-100 ">
        <button class="btn btn-share" @click="copyLink()"><i class="bi bi-share"></i>
        </button>
      </div>
      <div class="comment-section rounded-3 p-3 bg-white mt-3">
        <p class="m-0 fw-bold fs-5">មិតិ (<span>11</span>)</p>
        <hr class="my-1">
      </div>
    </div>
  </div>
</template>
<script setup>
function copyLink() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

}
</script>
