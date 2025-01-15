<template>
    <div class="frm-login">
        <div class="row shadow-lg rounded-3 overflow-hidden">
            <!-- Left Section -->
            <div class="col-md-6 left-section text-white d-flex flex-column align-items-center justify-content-center">
                <h1 class="text-center fw-bold">
                    Kassar នាំលោកអ្នក
ទៅកាន់អាជីវកម្ម
កសិកម្មបែបទំនើប                </h1>
                <img src="/src/assets/images/Auth.png" alt="auth" class="img-fluid mb-4" />
            </div>

            <!-- Right Section -->
            <div class="col-md-6 right-section bg-white p-5">
                <!-- Logo and Heading -->
                <div class="text-center mb-4">
                    <img src="/src/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid mb-2" />
                    <h1 class="fw-bold mt-3">ចូលប្រើប្រាស់គណនី</h1>
                    <p class=" text-secondary  mt-3">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
                </div>

                <!-- Login Form -->
                <form>
                    <!-- Email Input -->
                    <div class="mt-3">
                        <input type="email" id="email" class="form-control" placeholder="បញ្ចូលអ៊ីមែល" />
                    </div>

                    <!-- Password Input -->
                    <div class="mt-3">
                        <input type="password" id="password" class="form-control" placeholder="បញ្ចូលលេខសម្ងាត់" />
                    </div>

                    <!-- Remember Me and Forgot Password -->
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="form-check">
                            <input type="checkbox" id="remember" class="form-check-input" />
                            <label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
                        </div>
                        <a href="#" class="text-secondary text-decoration-none">
                            ភ្លេចពាក្យសម្ងាត់?
                        </a>
                    </div>

                    <!-- Submit Button -->
                    <a type="submit" class="btn btn-login w-100 mt-3">ចូលគណនី</a>

                    <!-- Alternative Login Options -->
                    <div class="text-center mt-3">
                        <p>ឬចូលប្រើប្រាស់កម្មវិធីជាមួយ</p>
                        <div class="d-flex justify-content-center">
                            <button type="button"
                                class="btn btn-outline-secondary me-2 d-flex align-items-center justify-content-center">
                                <img src="/src/assets/images/Google-icon.png" alt="Google Icon" />
                                Google
                            </button>
                            <button type="button"
                                class="btn btn-outline-secondary d-flex align-items-center justify-content-center">
                                <img src="/src/assets/images/facebook.png" alt="Facebook Icon" />
                                Facebook
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Sign-Up Link -->
                <div class="text-center mt-4">
                    <p class="mb-0">
                        <span class="text-secondary">មិនទាន់មានគណនីមែនទេ?</span>
                        <a href="#" class="text-success ">បង្កើតគណនី</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
