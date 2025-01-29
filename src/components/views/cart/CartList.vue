<template>
  <section>
    <div class="mt-4">
      <div class="cart-container">
        <!-- Cart Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold">កន្ត្រក <span class="text-secondary">៣ ទំនិញ</span></h4>
          <div>
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckChecked">
            <label for="selectAll">ជ្រើសទាំងអស់</label>
          </div>
        </div>

        <div>
          <!-- Cart Items -->
          <div class="form-check align-items-center d-flex justify-content-start">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckChecked">
            <label class="form-check-label fs-5 fw-bold" for="flexCheckChecked">
              ហាងលក់សាច់គោ
            </label>
          </div>
          <div class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img src="@/assets/images/Cart/img-1.jpg" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">ឆ្អាលណាគក់ស្រុកMONYមិនអន</h5>
              <p class="mb-1 text-muted">
                10000៛ / ស្រុក | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>
            <div class="text-end">
              <h5 class="fw-bold" style="margin-bottom: 20px !important;">20000៛</h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement()">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                <p class="mb-0 fw-bold fs-5">{{ count }}</p>
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="count++">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img src="@/assets/images/Cart/img-1.jpg" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">ឆ្អាលណាគក់ស្រុកMONYមិនអន</h5>
              <p class="mb-1 text-muted">
                10000៛ / ស្រុក | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>
            <div class="text-end">
              <h5 class="fw-bold" style="margin-bottom: 20px !important;">20000៛</h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement()">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                <p class="mb-0 fw-bold fs-5">{{ count }}</p>
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="count++">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img src="@/assets/images/Cart/img-1.jpg" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">ឆ្អាលណាគក់ស្រុកMONYមិនអន</h5>
              <p class="mb-1 text-muted">
                10000៛ / ស្រុក | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>
            <div class="text-end">
              <h5 class="fw-bold" style="margin-bottom: 20px !important;">20000៛</h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement()">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                <p class="mb-0 fw-bold fs-5">{{ count }}</p>
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="count++">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2 shop -->
        <div>
          <!-- Cart Items -->
          <hr class="hr mt-2 mb-3">
          <div class="form-check align-items-center d-flex justify-content-start">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckChecked">
            <label class="form-check-label fs-5 fw-bold" for="flexCheckChecked">
              ហាងលក់សាច់គោ
            </label>
          </div>
          <div class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img src="@/assets/images/Cart/img-1.jpg" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">ឆ្អាលណាគក់ស្រុកMONYមិនអន</h5>
              <p class="mb-1 text-muted">
                10000៛ / ស្រុក | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>
            <div class="text-end">
              <h5 class="fw-bold" style="margin-bottom: 20px !important;">20000៛</h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement()">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                <p class="mb-0 fw-bold fs-5">{{ count }}</p>
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="count++">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img src="@/assets/images/Cart/img-1.jpg" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">ឆ្អាលណាគក់ស្រុកMONYមិនអន</h5>
              <p class="mb-1 text-muted">
                10000៛ / ស្រុក | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>
            <div class="text-end">
              <h5 class="fw-bold" style="margin-bottom: 20px !important;">20000៛</h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement()">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                <p class="mb-0 fw-bold fs-5">{{ count }}</p>
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="count++">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="cart-item d-flex align-items-center">
            <input class="form-check-input me-3 rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
            <div class="me-3 rounded-2 img-cart" style="width: 100px; height: 100px;">
              <img src="@/assets/images/Cart/img-1.jpg" alt="Product Image" class="item-img me-3 rounded-2" />
            </div>
            <div class="flex-grow-1">
              <h5 class="mb-2 mt-1 fw-bold">ឆ្អាលណាគក់ស្រុកMONYមិនអន</h5>
              <p class="mb-1 text-muted">
                10000៛ / ស្រុក | <span class="text-success">In Stock</span>
              </p>
              <a role="button" class="delete-btn">
                <i class="bi bi-trash"></i> លុបចេញ
              </a>
            </div>
            <div class="text-end">
              <h5 class="fw-bold" style="margin-bottom: 20px !important;">20000៛</h5>
              <div style="width:90px; height: 30px;"
                class="quantity-controls bg-secondary-subtle btn-select-main rounded-pill d-flex justify-content-between align-items-center p-1">
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="decrement()">
                  <i class="bi bi-dash-lg text-black fs-6"></i>
                </div>
                <p class="mb-0 fw-bold fs-5">{{ count }}</p>
                <div class="bg-white rounded-circle btn-quantity d-flex justify-content-center align-items-center"
                  @click="count++">
                  <i class="bi bi-plus-lg text-black fs-6"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue';

const count = ref(0);
const decrement = () => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>