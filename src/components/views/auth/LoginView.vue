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
					<h1 class="fw-bold fs-3">ចូលប្រើប្រាស់គណនី</h1>
					<p class="text-secondary">សូមធ្វើការបំពេញព័ត៌មានខាងក្រោមដើម្បីចូលគណនី</p>
				</div>

				<form @submit.prevent="onSaveLogin" data-aos="fade-up" data-aos-delay="600">
					<!-- Email Field -->
					<div class="mb-3" data-aos="fade-up" data-aos-delay="700">
						<input type="email" id="email" v-model="form.email" class="form-control modern-input"
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

					<div class="d-flex justify-content-between ">
						<!-- Remember Me -->
						<div class="form-check mb-3" data-aos="fade-up" data-aos-delay="900">
							<input type="checkbox" id="remember" v-model="form.remember" class="form-check-input" />
							<label for="remember" class="form-check-label">ចងចាំខ្ញុំ</label>
						</div>
						<!-- Forgot Password -->
						<router-link to="/forgot-password"
							class="text-success fw-bold text-decoration-none">ភ្លេចពាក្យសម្ងាត់?</router-link>
					</div>

					<!-- Submit Button -->
					<button type="submit" class="btn btn-login w-100" :disabled="loading" data-aos="fade-up"
						data-aos-delay="1000">
						<span v-if="loading" class="spinner-border spinner-border-sm" role="status"
							aria-hidden="true"></span>
						{{ loading ? 'កំពុងចូល...' : 'ចូលគណនី' }}
					</button>
				</form>

				<!-- Signup Link -->
				<div class="text-center mt-4" data-aos="fade-up" data-aos-delay="1100">
					<p>មិនទាន់មានគណនីមែនទេ? <router-link to="/signup"
							class="text-success fw-bold text-decoration-none">បង្កើតគណនី</router-link></p>
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
import { helpers, email } from "@vuelidate/validators";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { useRouter } from 'vue-router';
import { Toast } from 'bootstrap';
import { useInfoProfile } from "@/stores/views/profile_store";
import { useCardStore } from "@/stores/card_store";

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
	email: "",
	password: "",
	remember: false,
});

const loading = ref(false);

const rules = {
	form: {
		email: {
			required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", helpers.req),
			email: helpers.withMessage("សូមបញ្ចូលទម្រង់អ៊ីមែលឲ្យបានត្រឹមត្រូវ", email),
		},
		password: {
			required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", helpers.req),
		},
	},
};

const $v = useVuelidate(rules, { form });

const showPassword = ref(false);
function togglePasswordVisibility() {
	showPassword.value = !showPassword.value;
}

function saveToken(token, remember) {
	localStorage.removeItem("token");
	sessionStorage.removeItem("token");

	if (remember) {
		localStorage.setItem("token", token);
	} else {
		sessionStorage.setItem("token", token);
	}

	profileStore.setToken(token);

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

async function onSaveLogin() {
	loading.value = true;
	$v.value.$touch();

	if ($v.value.$invalid) {
		loading.value = false;
		return;
	}

	try {
		const formData = new FormData();
		formData.append("email", form.email);
		formData.append("password", form.password);

		const response = await axios.post("/api/auth/login", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "application/json",
			},
		});

		const token = response.data.data.token;

		saveToken(token, form.remember);

		await profileStore.onLoadProfile();

		const cartStore = useCardStore();
		cartStore.setToken(token);
		cartStore.onLoadCart();
		cartStore.onLoadFav();

		if (toastInstance) {
			toastMessage.value = "ចូលគណនីជោគជ័យ!";
			toastIcon.value = "bi bi-check2-circle fs-5 text-success";
			toastInstance.show();

			setTimeout(() => router.push("/"), 2000);
		}
	} catch (err) {
		if (toastInstance) {
			toastMessage.value = err.response?.data?.message || "Invalid credentials";
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
	padding-right: 45px;
}

.password-toggle {
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
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

.form-control:focus {
	outline: #2ecc71 !important;
	border-color: #2ecc71 !important;
	box-shadow: none;
}
</style>