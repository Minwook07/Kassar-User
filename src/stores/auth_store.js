import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        mdl_term: null,
        form: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
        auths: [],
        loading: false,
        showPassword: false,
        showConfirmPassword: false,
        toast: {
            message: '',
            icon: 'bi bi-check2-circle fs-5 text-success',
            instance: null
        }
    }),

    actions: {
        initTermModal(modalElement) {
            if (modalElement) {
                this.mdl_term = modalElement;
            }
        },

        acceptTerms() {
            this.form.acceptTerms = true;
            if (this.mdl_term) {
                this.mdl_term.hide();
            }
        },

        resetForm() {
            this.form = {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false,
            };
            this.showPassword = false;
            this.showConfirmPassword = false;
        },

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },

        toggleConfirmPasswordVisibility() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },

        setToastInstance(instance) {
            this.toast.instance = instance;
        },

        showToast(message, isSuccess = true) {
            if (this.toast.instance) {
                this.toast.message = message;
                this.toast.icon = isSuccess
                    ? 'bi bi-check2-circle fs-5 text-success'
                    : 'bi bi-x-circle fs-5 text-danger';
                this.toast.instance.show();
            }
        },

        async register(router) {
            this.loading = true;

            try {
                const formData = new FormData();
                formData.append("name", this.form.name);
                formData.append("email", this.form.email);
                formData.append("password", this.form.password);
                formData.append("password_confirmation", this.form.confirmPassword);
                formData.append("terms_accepted", this.form.acceptTerms ? 1 : 0);

                await axios.post("/api/auth/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                    },
                });

                this.showToast("បង្កើតគណនីជោគជ័យ", true);

                setTimeout(() => {
                    this.resetForm();
                    router.push("/login");
                }, 2000);

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

                this.showToast(message, false);
            } finally {
                this.loading = false;
            }
        }
    }
});