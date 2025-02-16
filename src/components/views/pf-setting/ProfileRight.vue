<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('profile')
</script>

<template>
  <div class="profile-right">
    <div v-if="activeTab === 'profile'">
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
    </div>
    <div v-if="activeTab === 'login-method'">
      <h4>វិធីសាស្រ្តចូលគណី</h4>
      <p>ការកំណត់វិធីសាស្រ្តចូលគណីរបស់អ្នក...</p>
    </div>
    <div v-if="activeTab === 'usage-history'">
      <h4>ប្រវត្តិប្រើប្រាស់</h4>
      <p>ព័ត៌មានអំពីប្រវត្តិប្រើប្រាស់...</p>
    </div>
    <div v-if="activeTab === 'delivery'">
      <h4>រៀបចំដឹកជញ្ជូន</h4>
      <p>ការកំណត់អាសយដ្ឋាននិងការដឹកជញ្ជូន...</p>
    </div>
    <div v-if="activeTab === 'edit-info'">
      <h4>កែប្រែព័ត៌មាន</h4>
      <p>កែប្រែព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក...</p>
    </div>
    <div v-if="activeTab === 'delete-account'">
      <h4 class="text-danger">លុបគណី</h4>
      <p>ប្រសិនបើអ្នកលុបគណី នេះជាប្រតិបត្តិការដែលមិនអាចមកវិញបាន។</p>
      <button class="btn btn-danger">លុបគណី</button>
    </div>
  </div>
</template>

<style scoped>
.profile-right {
  padding: 20px;
  flex-grow: 1;
}

.info-display {
  padding: 25px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.info-display .form-label {
  font-size: 1rem;
  color: #333;
}

.info-display .form-control {
  border: 1px solid #ddd;
  background-color: #f6f7f9;
  border-radius: 8px;
  height: 45px;
  transition: border-color 0.3s ease;
}

.info-display .form-control:focus {
  border-color: #32ca83;
  box-shadow: none;
}

.info-display .btn-edit {
  background-color: #32ca83;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.info-display .btn-edit:hover {
  background-color: #28a86b;
  transform: scale(1.05);
}
</style>