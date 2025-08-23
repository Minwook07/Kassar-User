<template>
    <div class="content-view-container">
        <div class="card-header p-0 mb-5 bg-transparent border-0">
            <h4 class="fw-semibold">វិធីសាស្រ្តចូលប្រើប្រាស់គណនី</h4>
            <p class="m-0">លោកអ្នកបានចូលគណនីដោយអនុវត្តន៍តាមជំហានដូចខាងក្រោម</p>
        </div>

        <div class="card-body p-0">
            <div v-if="errorMessage" class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i>
                {{ errorMessage }}
                <button type="button" class="btn-close" @click="errorMessage = ''"></button>
            </div>

            <div v-if="successMessage" class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                {{ successMessage }}
                <button type="button" class="btn-close" @click="successMessage = ''"></button>
            </div>

            <form @submit.prevent="updatePassword">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-envelope"></i>អ៊ីមែល
                    </label>
                    <input type="email" class="form-control" :value="infoProfileStore.frm.email" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-lock"></i>ពាក្យសម្ងាត់បច្ចុប្បន្ន
                    </label>
                    <div class="input-group">
                        <input :type="showCurrentPassword ? 'text' : 'password'" v-model="passwordForm.current_password"
                            placeholder="សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន" class="form-control" required>
                        <button class="btn btn-outline-secondary" type="button"
                            @click="showCurrentPassword = !showCurrentPassword">
                            <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-key"></i>ពាក្យសម្ងាត់ថ្មី
                    </label>
                    <div class="input-group">
                        <input :type="showNewPassword ? 'text' : 'password'" v-model="passwordForm.new_password"
                            placeholder="សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី" class="form-control" required
                            @input="checkPasswordStrength">
                        <button class="btn btn-outline-secondary" type="button"
                            @click="showNewPassword = !showNewPassword">
                            <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                    <div v-if="passwordForm.new_password" class="password-strength">
                        <div class="strength-indicator">
                            <small>កម្លាំងពាក្យសម្ងាត់:</small>
                            <div class="progress">
                                <div class="progress-bar" :class="passwordStrengthClass"
                                    :style="{ width: passwordStrengthWidth }"></div>
                            </div>
                            <small :class="passwordStrengthTextClass">{{ passwordStrengthText }}</small>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-check-double"></i>បញ្ជាក់ពាក្យសម្ងាត់ថ្មី
                    </label>
                    <div class="input-group">
                        <input :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="passwordForm.new_password_confirmation" placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                            class="form-control"
                            :class="{ 'is-invalid': passwordForm.new_password_confirmation && !passwordsMatch }"
                            required>
                        <button class="btn btn-outline-secondary" type="button"
                            @click="showConfirmPassword = !showConfirmPassword">
                            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                    <div v-if="passwordForm.new_password_confirmation && !passwordsMatch" class="invalid-feedback">
                        ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ
                    </div>
                </div>

                <div class="submit-section">
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading || !passwordsMatch">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                        <i v-else class="fas fa-key"></i>
                        {{ isLoading ? 'កំពុងផ្លាស់ប្តូរ...' : 'ផ្លាស់ប្តូរពាក្យសម្ងាត់' }}
                    </button>
                </div>
            </form>

            <div class="security-tips">
                <h6>
                    <i class="fas fa-lightbulb"></i>គន្លឹះសុវត្ថិភាព
                </h6>
                <ul>
                    <li>ប្រើពាក្យសម្ងាត់យ៉ាងតិច ៨ តួអក្សរ</li>
                    <li>រួមបញ្ចូលអក្សរធំ អក្សរតូច លេខ និងនិមិត្តសញ្ញា</li>
                    <li>កុំប្រើពាក្យសម្ងាត់ដូចគ្នានៅកន្លែងផ្សេង</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useInfoProfile } from '@/stores/views/profile_store'
import axios from 'axios'

const infoProfileStore = useInfoProfile()
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const passwordStrength = ref(0)

const passwordForm = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
})

const checkPasswordStrength = () => {
    const password = passwordForm.new_password
    let strength = 0

    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 12.5
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5

    passwordStrength.value = Math.min(strength, 100)
}

const passwordStrengthClass = computed(() => {
    if (passwordStrength.value < 30) return 'bg-danger'
    if (passwordStrength.value < 60) return 'bg-warning'
    if (passwordStrength.value < 80) return 'bg-info'
    return 'bg-success'
})

const passwordStrengthWidth = computed(() => `${passwordStrength.value}%`)

const passwordStrengthText = computed(() => {
    if (passwordStrength.value < 30) return 'ខ្សោយ'
    if (passwordStrength.value < 60) return 'មធ្យម'
    if (passwordStrength.value < 80) return 'ល្អ'
    return 'ខ្លាំង'
})

const passwordStrengthTextClass = computed(() => {
    if (passwordStrength.value < 30) return 'text-danger'
    if (passwordStrength.value < 60) return 'text-warning'
    if (passwordStrength.value < 80) return 'text-info'
    return 'text-success'
})

const passwordsMatch = computed(() => {
    return passwordForm.new_password === passwordForm.new_password_confirmation
})

const updatePassword = async () => {
    if (!passwordsMatch.value) {
        errorMessage.value = 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ'
        return
    }

    const token = sessionStorage.getItem('token') || localStorage.getItem('token')
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    try {
        const res = await axios.post('/api/profile/password', passwordForm, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res.data.result === true) {
            successMessage.value = 'ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ!'
            passwordForm.current_password = ''
            passwordForm.new_password = ''
            passwordForm.new_password_confirmation = ''
            passwordStrength.value = 0
        } else {
            errorMessage.value = res.data.message
        }
    } catch (err) {
        if (err.response && err.response.data) {
            errorMessage.value = err.response.data.message || 'មានបញ្ហាក្នុងការផ្លាស់ប្តូរ!'
        } else {
            errorMessage.value = 'មានបញ្ហាក្នុងការផ្លាស់ប្តូរ!'
        }
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>

.input-group {
    display: flex;
}

.input-group .form-control {
    border-right: none;
    border-radius: 6px 0 0 6px;
}

.input-group .btn {
    border-left: none;
    border-radius: 0 6px 6px 0;
    border: 2px solid #e5e7eb;
}

.password-strength {
    margin-top: 0.5rem;
}

.strength-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.progress {
    flex: 1;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    transition: all 0.3s ease;
}

.submit-section {
    margin: 2rem 0;
}

.btn-primary {
    background: #32CA83;
    border: none;
    padding: 1rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-primary:hover {
    background: #0e7490;
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.security-tips {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
    border-left: 4px solid #32CA83;
}

.security-tips h6 {
    color: #32CA83;
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.security-tips ul {
    margin: 0;
    padding-left: 1rem;
    color: #6b7280;
    font-size: 0.9rem;
}

.alert {
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.alert-danger {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
}

.alert-success {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
}

.btn-close {
    background: none;
    border: none;
    margin-left: auto;
    cursor: pointer;
}

.invalid-feedback {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.is-invalid {
    border-color: #dc2626;
}

.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}
</style>
