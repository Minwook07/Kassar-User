<template>
    <div class="info-display">
          <form>
            <div class="mt-3">
              <label for="inputName" class="form-label fw-bold">ឈ្មោះ</label>
              <input type="text" class="form-control" id="inputName" placeholder="សុខ​ កញ្ញា" />
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <label for="inputEmail" class="form-label fw-bold">អាស័យដ្ឋានអ៊ីម៉ែល</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="sokkanha@1010gmail.com" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="typeCustomer" class="form-label fw-bold">ប្រភេទអ្នកប្រើប្រាស់</label>
                <input type="text" class="form-control" id="typeCustomer" placeholder="ធម្មតា" />
              </div>
            </div>
            <div class="mt-3">
              <label for="work" class="form-label fw-bold">ជីវប្រវត្តិ</label>
              <input type="text" class="form-control" id="work" placeholder="ស្ត្រីមេផ្ទះ" />
              <div class="mt-4">
                <button class="btn btn-edit fw-bold">
                  <i class="bi bi-pencil-square me-2"></i>កែប្រែ
                </button>
              </div>
            </div>
          </form>
        </div>
</template>