<template>
	<div class="frm-auth">
		<div class="row rounded-4 shadow-lg overflow-hidden">
			<!-- Left Section -->
			<div class="col-md-6 left-section text-white d-none d-md-flex flex-column align-items-center justify-content-center p-5"
				data-aos="fade-right" data-aos-duration="1000">
				<h1 class="text-center fw-bold mb-4" data-aos="fade-up" data-aos-delay="200">
					Kassar នាំលោកអ្នក ទៅកាន់អាជីវកម្ម កសិកម្មបែបទំនើប
				</h1>
				<img src="@/assets/images/Auth.png" alt="auth" class="img-fluid auth-img" data-aos="zoom-in"
					data-aos-delay="400" />
			</div>

			<!-- Right Section -->
			<div class="col-md-6 right-section bg-white p-5" data-aos="fade-left" data-aos-duration="1000">
				<div class="text-center mb-4" data-aos="fade-up" data-aos-delay="300">
					<router-link to="/" class="img-fluid mb-3" data-aos="zoom-in" data-aos-delay="500">
						<img src="@/assets/images/kassar_text.png" alt="Kassar Logo" class="img-fluid logo-img mb-3" />
					</router-link>
					<h1 class="fw-bold fs-3">បង្កើតគណនីថ្មី</h1>
					<p class="text-secondary">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតគណនី</p>
				</div>

				<form @submit.prevent="onSaveRegister" data-aos="fade-up" data-aos-delay="600">
					<!-- Name Field -->
					<div class="mb-3" data-aos="fade-up" data-aos-delay="700">
						<input type="text" id="name" v-model="authStore.form.name" class="form-control"
							placeholder="បញ្ចូលឈ្មោះ"
							:class="{ 'is-invalid': $v.authStore.form.name.$dirty && $v.authStore.form.name.$error }" />
						<div class="invalid-feedback"
							v-if="$v.authStore.form.name.$dirty && $v.authStore.form.name.$error">
							{{ $v.authStore.form.name.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Email Field -->
					<div class="mb-3" data-aos="fade-up" data-aos-delay="750">
						<input type="email" id="email" v-model="authStore.form.email" class="form-control"
							placeholder="បញ្ចូលអ៊ីមែល"
							:class="{ 'is-invalid': $v.authStore.form.email.$dirty && $v.authStore.form.email.$error }" />
						<div class="invalid-feedback"
							v-if="$v.authStore.form.email.$dirty && $v.authStore.form.email.$error">
							{{ $v.authStore.form.email.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Password Field -->
					<div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="800">
						<input :type="authStore.showPassword ? 'text' : 'password'" id="password"
							v-model="authStore.form.password" class="form-control password-input"
							placeholder="បញ្ចូលលេខសម្ងាត់"
							:class="{ 'is-invalid': $v.authStore.form.password.$dirty && $v.authStore.form.password.$error }" />
						<i @click="authStore.togglePasswordVisibility()"
							:class="['password-toggle', authStore.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
						<div class="invalid-feedback"
							v-if="$v.authStore.form.password.$dirty && $v.authStore.form.password.$error">
							{{ $v.authStore.form.password.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Confirm Password Field -->
					<div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="850">
						<input :type="authStore.showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
							v-model="authStore.form.confirmPassword" class="form-control password-input"
							placeholder="បញ្ជាក់លេខសម្ងាត់"
							:class="{ 'is-invalid': $v.authStore.form.confirmPassword.$dirty && $v.authStore.form.confirmPassword.$error }" />
						<i @click="authStore.toggleConfirmPasswordVisibility()"
							:class="['password-toggle', authStore.showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
						<div class="invalid-feedback"
							v-if="$v.authStore.form.confirmPassword.$dirty && $v.authStore.form.confirmPassword.$error">
							{{ $v.authStore.form.confirmPassword.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Terms & Conditions -->
					<div class="form-check mb-3" data-aos="fade-up" data-aos-delay="900">
						<input type="checkbox" id="terms" v-model="authStore.form.acceptTerms" class="form-check-input"
							:class="{ 'is-invalid': $v.authStore.form.acceptTerms.$dirty && $v.authStore.form.acceptTerms.$error }" />
						<label for="terms" class="form-check-label">
							ខ្ញុំយល់ព្រមតាម <a href="#" class="text-success" @click="openTermsModal">លក្ខខណ្ឌ</a> និង <a
								href="#" class="text-success">គោលការណ៍</a>
						</label>
						<div class="invalid-feedback d-block"
							v-if="$v.authStore.form.acceptTerms.$dirty && $v.authStore.form.acceptTerms.$error">
							{{ $v.authStore.form.acceptTerms.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Submit Button -->
					<button type="submit" class="btn btn-register w-100" :disabled="authStore.loading"
						data-aos="fade-up" data-aos-delay="1000">
						<span v-if="authStore.loading" class="spinner-border spinner-border-sm" role="status"
							aria-hidden="true"></span>
						{{ authStore.loading ? 'កំពុងបង្កើត...' : 'បង្កើតគណនី' }}
					</button>
				</form>

				<!-- Login Link -->
				<div class="text-center mt-4" data-aos="fade-up" data-aos-delay="1100">
					<p>មានគណនីរួចហើយ? <router-link to="/login"
							class="text-success fw-bold text-decoration-none">ចូលគណនី</router-link></p>
				</div>
			</div>
		</div>

		<!-- Toast Container -->
		<div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="margin-top: 50px;">
			<div id="liveToast" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="false">
				<div class="toast-content p-3">
					<div>
						<i :class="authStore.toast.icon"></i>
					</div>
					<div class="message">
						<span class="text text-1">{{ authStore.toast.message }}</span>
					</div>
					<div>
						<button type="button" class="btn btn-close border-0 ms-auto p-0" data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
				</div>
				<div class="progress active"></div>
			</div>
		</div>
	</div>
	<TermofuseToView />
</template>

<script setup>
import { onMounted, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, email, minLength } from "@vuelidate/validators";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'vue-router';
import { Toast } from 'bootstrap';
import { useAuthStore } from "@/stores/auth_store";
import TermofuseToView from "../system/TermofuseToView.vue";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
	AOS.init({ once: true, offset: 50, easing: 'ease-in-out' });
	const toastInstance = Toast.getOrCreateInstance(document.getElementById('liveToast'));
	authStore.setToastInstance(toastInstance);
});

// Watch for terms acceptance and trigger validation
watch(() => authStore.form.acceptTerms, (newValue) => {
	if (newValue) {
		$v.value.authStore.form.acceptTerms.$touch();
	}
});

const rules = {
	authStore: {
		form: {
			name: {
				required: helpers.withMessage("សូមបញ្ចូលឈ្មោះ", helpers.req),
				minLength: helpers.withMessage("ឈ្មោះត្រូវមានយ៉ាងហោចណាស់ 2 តួអក្សរ", minLength(2)),
			},
			email: {
				required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
				email: helpers.withMessage("សូមបញ្ចូលទម្រង់អ៊ីមែលឱ្យបានត្រឹមត្រូវ", email),
			},
			password: {
				required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", helpers.req),
				minLength: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួអក្សរ", minLength(8)),
			},
			confirmPassword: {
				required: helpers.withMessage("សូមបញ្ជាក់ពាក្យសម្ងាត់", helpers.req),
				sameAsPassword: helpers.withMessage(
					"ពាក្យសម្ងាត់មិនត្រូវគ្នា",
					(value) => value === authStore.form.password
				),
			},
			acceptTerms: {
				required: helpers.withMessage("សូមយល់ព្រមលក្ខខណ្ឌ", (value) => value === true),
			},
		}
	},
};

const $v = useVuelidate(rules, { authStore });

const openTermsModal = (event) => {
	event.preventDefault();
	if (authStore.mdl_term) {
		authStore.mdl_term.show();
	}
};

async function onSaveRegister() {
	$v.value.$touch();

	if ($v.value.$invalid) {
		return;
	}

	await authStore.register(router);
}
</script>

<style scoped>
.password-input {
	padding-right: 50px;
}

.password-toggle {
	position: absolute;
	right: 15px;
	top: 55%;
	transform: translateY(-60%);
	color: #6c757d;
	cursor: pointer;
	transition: color 0.2s ease;
	z-index: 10;
}

.password-toggle:hover {
	color: #212529;
}

.is-invalid~.password-toggle {
	top: 35%;
}

input.is-invalid+.password-toggle,
input.is-invalid~.password-toggle {
	right: 30px;
}

.form-control:focus {
	outline: #2ecc71 !important;
	border-color: #2ecc71 !important;
	box-shadow: none;
}

.btn-register {
	background: #2ecc71;
	border: none;
	color: white;
	padding: 0.75rem;
	font-weight: 600;
	transition: all 0.3s ease;
}

.btn-register:hover {
	background: #27ae60;
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(46, 204, 113, 0.3);
}

.btn-register:disabled {
	opacity: 0.6;
	cursor: not-allowed;
	transform: none;
}

.invalid-feedback.d-block {
	display: block;
}
</style>