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
						<input type="text" id="name" v-model="form.name" class="form-control" placeholder="បញ្ចូលឈ្មោះ"
							:class="{ 'is-invalid': $v.form.name.$dirty && $v.form.name.$error }" />
						<div class="invalid-feedback" v-if="$v.form.name.$dirty && $v.form.name.$error">
							{{ $v.form.name.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Email Field -->
					<div class="mb-3" data-aos="fade-up" data-aos-delay="750">
						<input type="email" id="email" v-model="form.email" class="form-control"
							placeholder="បញ្ចូលអ៊ីមែល"
							:class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$error }" />
						<div class="invalid-feedback" v-if="$v.form.email.$dirty && $v.form.email.$error">
							{{ $v.form.email.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Password Field -->
					<div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="800">
						<input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password"
							class="form-control password-input" placeholder="បញ្ចូលលេខសម្ងាត់"
							:class="{ 'is-invalid': $v.form.password.$dirty && $v.form.password.$error }" />
						<i @click="togglePasswordVisibility"
							:class="['password-toggle', showPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
						<div class="invalid-feedback" v-if="$v.form.password.$dirty && $v.form.password.$error">
							{{ $v.form.password.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Confirm Password Field -->
					<div class="mb-3 position-relative" data-aos="fade-up" data-aos-delay="850">
						<input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
							v-model="form.confirmPassword" class="form-control password-input"
							placeholder="បញ្ជាក់លេខសម្ងាត់"
							:class="{ 'is-invalid': $v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error }" />
						<i @click="toggleConfirmPasswordVisibility"
							:class="['password-toggle', showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
						<div class="invalid-feedback"
							v-if="$v.form.confirmPassword.$dirty && $v.form.confirmPassword.$error">
							{{ $v.form.confirmPassword.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Terms & Conditions -->
					<div class="form-check mb-3" data-aos="fade-up" data-aos-delay="900">
						<input type="checkbox" id="terms" v-model="form.acceptTerms" class="form-check-input"
							:class="{ 'is-invalid': $v.form.acceptTerms.$dirty && $v.form.acceptTerms.$error }" />
						<label for="terms" class="form-check-label">
							ខ្ញុំយល់ព្រមតាម <a href="#" class="text-success">លក្ខខណ្ឌ</a> និង <a href="#"
								class="text-success">គោលការណ៍</a>
						</label>
						<div class="invalid-feedback d-block"
							v-if="$v.form.acceptTerms.$dirty && $v.form.acceptTerms.$error">
							{{ $v.form.acceptTerms.$errors[0]?.$message }}
						</div>
					</div>

					<!-- Submit Button -->
					<button type="submit" class="btn btn-register w-100" :disabled="loading" data-aos="fade-up"
						data-aos-delay="1000">
						<span v-if="loading" class="spinner-border spinner-border-sm" role="status"
							aria-hidden="true"></span>
						{{ loading ? 'កំពុងបង្កើត...' : 'បង្កើតគណនី' }}
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
						<i :class="toastIcon"></i>
					</div>
					<div class="message">
						<span class="text text-1">{{ toastMessage }}</span>
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
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, email, minLength } from "@vuelidate/validators";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { useRouter } from 'vue-router';
import { Toast } from 'bootstrap';
import { useInfoProfile } from "@/stores/views/profile_store";

const router = useRouter();
const profileStore = useInfoProfile();

const toastMessage = ref('');
const toastIcon = ref('bi bi-check2-circle fs-5 text-success');
let toastInstance = null;

onMounted(() => {
	AOS.init({ once: true, offset: 50, easing: 'ease-in-out' });
	toastInstance = Toast.getOrCreateInstance(document.getElementById('liveToast'));
});

const form = reactive({
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	acceptTerms: false,
});

const loading = ref(false);

const rules = {
	form: {
		name: {
			required: helpers.withMessage("សូមបញ្ចូលឈ្មោះ", helpers.req),
			minLength: helpers.withMessage("ឈ្មោះត្រូវមានយ៉ាងហោចណាស់ 2 តួអក្សរ", minLength(2)),
		},
		email: {
			required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
			email: helpers.withMessage("សូមបញ្ចូលទម្រង់អ៊ីមែលឲ្យបានត្រឹមត្រូវ", email),
		},
		password: {
			required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", helpers.req),
			minLength: helpers.withMessage("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួអក្សរ", minLength(8)),
		},
		confirmPassword: {
			required: helpers.withMessage("សូមបញ្ជាក់ពាក្យសម្ងាត់", helpers.req),
			sameAsPassword: helpers.withMessage(
				"ពាក្យសម្ងាត់មិនត្រូវគ្នា",
				(value) => value === form.password
			),
		},
		acceptTerms: {
			required: helpers.withMessage("សូមយល់ព្រមលក្ខខណ្ឌ", (value) => value === true),
		},
	},
};

const $v = useVuelidate(rules, { form });

const showPassword = ref(false);
const showConfirmPassword = ref(false);

function togglePasswordVisibility() {
	showPassword.value = !showPassword.value;
}

function toggleConfirmPasswordVisibility() {
	showConfirmPassword.value = !showConfirmPassword.value;
}

async function onSaveRegister() {
	loading.value = true;
	$v.value.$touch();

	if ($v.value.$invalid) {
		loading.value = false;
		return;
	}

	try {
		const formData = new FormData();
		formData.append("name", form.name);
		formData.append("email", form.email);
		formData.append("password", form.password);
		formData.append("password_confirmation", form.confirmPassword);
		formData.append("terms_accepted", form.acceptTerms ? 1 : 0);

		await axios.post("/api/auth/register", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "application/json",
			},
		});

		if (toastInstance) {
			toastMessage.value = "បង្កើតគណនីជោគជ័យ";
			toastIcon.value = "bi bi-check2-circle fs-5 text-success";
			toastInstance.show();

			setTimeout(() => router.push("/login"), 2000);
		}
	} catch (err) {
		let message = "មានបញ្ហាក្នុងការបង្កើតគណនី";

		if (err.response?.status === 422) {
			const errors = err.response.data.errors;
			if (errors?.email) message = errors.email[0];
			else if (errors?.name) message = errors.name[0];
			else message = "ព័ត៌មានមិនត្រឹមត្រូវ";
		} else if (err.response?.data?.message) {
			message = err.response.data.message;
		}

		if (toastInstance) {
			toastMessage.value = message;
			toastIcon.value = "bi bi-x-circle fs-5 text-danger";
			toastInstance.show();
		}
	} finally {
		loading.value = false;
	}
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