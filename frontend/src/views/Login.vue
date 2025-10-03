<template>
    <div class="login-page">
        <div class="container">
            <div class="login-wrapper">
                <div class="login-card">
                    <div class="login-header">
                        <h2>Đăng nhập</h2>
                        <p>Chào mừng bạn quay trở lại</p>

                        <!-- General Error -->
                        <div v-if="generalError" class="alert alert-error" role="alert">
                            <i class="fas fa-exclamation-circle"></i>
                            {{ generalError }}
                        </div>
                    </div>

                    <form @submit.prevent="handleLogin" class="login-form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="loginForm.email" placeholder="Nhập email của bạn"
                                required
                                :class="{ 'error': hasFieldError('email') || (loginForm.email && !isValidEmail) }"
                                @input="clearErrors">
                            <p v-if="hasFieldError('email')" class="error-message">
                                {{ getFieldError('email') }}
                            </p>
                            <p v-else-if="loginForm.email && !isValidEmail" class="error-message">
                                Email không đúng định dạng
                            </p>
                        </div>

                        <div class="form-group">
                            <label for="password">Mật khẩu</label>
                            <div class="password-input">
                                <input :type="showPassword ? 'text' : 'password'" id="password"
                                    v-model="loginForm.password" placeholder="Nhập mật khẩu" required
                                    :class="{ 'error': hasFieldError('password') }" @input="clearErrors">
                                <button type="button" @click="togglePassword" class="password-toggle">
                                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                            <p v-if="hasFieldError('password')" class="error-message">
                                {{ getFieldError('password') }}
                            </p>
                        </div>

                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="rememberMe">
                                <span class="checkmark"></span>
                                Ghi nhớ đăng nhập
                            </label>
                            <router-link to="/forgot-password" class="forgot-link">
                                Quên mật khẩu?
                            </router-link>
                        </div>

                        <button type="submit" class="login-btn" :disabled="!isFormValid || loading">
                            <span v-if="loading" class="spinner"></span>
                            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
                        </button>

                        <div class="divider">
                            <span>hoặc</span>
                        </div>

                        <div class="social-login">
                            <button type="button" class="social-btn google-btn">
                                <i class="fab fa-google"></i>
                                Đăng nhập với Google
                            </button>
                            <button type="button" class="social-btn facebook-btn">
                                <i class="fab fa-facebook-f"></i>
                                Đăng nhập với Facebook
                            </button>
                        </div>

                        <div class="signup-prompt">
                            <p>Chưa có tài khoản?
                                <router-link to="/register" class="signup-link">Đăng ký ngay</router-link>
                            </p>
                        </div>
                    </form>
                </div>

                <div class="login-illustration">
                    <div class="illustration-content">
                        <h3>Khám phá thế giới mua sắm</h3>
                        <p>Tham gia cộng đồng hàng triệu người dùng đang tin tưởng và lựa chọn chúng tôi</p>
                        <div class="features">
                            <div class="feature">
                                <i class="fas fa-shipping-fast"></i>
                                <span>Giao hàng nhanh chóng</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-shield-alt"></i>
                                <span>Bảo mật thông tin</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-headset"></i>
                                <span>Hỗ trợ 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService, ApiError } from '../services/api.js'
import { useToast } from '../services/toast.js'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { success, error, warning } = useToast()
const { login: setAuth } = useAuth()

// Form state
const loginForm = ref({
    email: '',
    password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const serverErrors = ref({})
const generalError = ref('')

// Computed properties
const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.email))

const isFormValid = computed(() => {
    return loginForm.value.email &&
        loginForm.value.password &&
        isValidEmail.value
})

// Helper functions
const clearErrors = () => {
    serverErrors.value = {}
    generalError.value = ''
}

const getFieldError = (fieldName) => {
    return serverErrors.value[fieldName]?.[0] || ''
}

const hasFieldError = (fieldName) => {
    return !!serverErrors.value[fieldName]?.length
}

// Methods
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const handleLogin = async () => {
    clearErrors()

    if (!isFormValid.value) {
        if (!loginForm.value.email) return warning('Vui lòng nhập email')
        if (!isValidEmail.value) return warning('Email không đúng định dạng')
        if (!loginForm.value.password) return warning('Vui lòng nhập mật khẩu')
    }

    loading.value = true
    try {
        const credentials = {
            email: loginForm.value.email.toLowerCase().trim(),
            password: loginForm.value.password,
            remember: rememberMe.value
        }
        const { token, user } = await authService.login(credentials) // <- shape chuẩn
        setAuth(token, user)
        router.push(router.currentRoute.value.query.redirect || '/')
        const Swal = (await import('sweetalert2')).default
        Swal.fire({
            toast: true,
            position: "top-end",
            title: 'Đăng nhập thành công',
            text: 'Chào mừng bạn đến với trang quản trị!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
        })
    } catch (err) {
        console.error('Login error:', err)

        if (err instanceof ApiError) {
            if (err.isValidationError()) {
                // Lỗi validation từ server (422)
                serverErrors.value = err.getValidationErrors()

                // Hiển thị lỗi validation tổng quát
                const errorMessages = Object.values(serverErrors.value)
                    .flat()
                    .slice(0, 2) // Chỉ hiển thị 2 lỗi đầu tiên

                if (errorMessages.length > 0) {
                    error(`Đăng nhập thất bại: ${errorMessages.join(', ')}`)
                }

            } else if (err.isUnauthorized()) {
                // Sai email hoặc mật khẩu (401)
                generalError.value = 'Email hoặc mật khẩu không chính xác'
                error('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.')

            } else if (err.status === 423) {
                // Tài khoản bị khóa
                generalError.value = 'Tài khoản của bạn đã bị khóa'
                error('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ.')

            } else if (err.status === 429) {
                // Quá nhiều lần thử đăng nhập
                generalError.value = 'Đã vượt quá số lần thử đăng nhập'
                error('Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau.')

            } else if (err.isServerError()) {
                // Lỗi server (5xx)
                generalError.value = 'Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.'
                error('Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.')

            } else {
                // Các lỗi khác
                generalError.value = err.message || 'Có lỗi xảy ra khi đăng nhập'
                error(generalError.value)
            }
        } else {
            // Network error hoặc lỗi không xác định
            generalError.value = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'
            error(generalError.value)
        }
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.container {
    max-width: 1200px;
    width: 100%;
}

.login-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    min-height: 600px;
}

.login-card {
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.login-header h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
}

.login-header p {
    color: #6b7280;
    font-size: 16px;
}

/* Alert styles */
.alert {
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.5;
}

.alert-error {
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
}

.alert-error i {
    color: #ef4444;
}

.login-form {
    width: 100%;
}

.form-group {
    margin-bottom: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #374151;
}

.form-group input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.3s ease;
    background: #f9fafb;
}

.form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Input error state */
input.error {
    border-color: #ef4444 !important;
    background-color: #fef2f2 !important;
}

input.error:focus {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
}

/* Error message */
.error-message {
    color: #ef4444;
    font-size: 12px;
    margin-top: 6px;
}

.password-input {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 4px;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6b7280;
    cursor: pointer;
}

.checkbox-label input {
    margin-right: 8px;
}

.forgot-link {
    color: #3b82f6;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
}

.forgot-link:hover {
    text-decoration: underline;
}

.login-btn {
    width: 100%;
    padding: 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.login-btn:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
}

.login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.divider {
    text-align: center;
    margin: 32px 0;
    position: relative;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e5e7eb;
}

.divider span {
    background: white;
    padding: 0 16px;
    color: #6b7280;
    font-size: 14px;
}

.social-login {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
}

.social-btn {
    flex: 1;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.google-btn:hover {
    border-color: #ea4335;
    color: #ea4335;
}

.facebook-btn:hover {
    border-color: #1877f2;
    color: #1877f2;
}

.signup-prompt {
    text-align: center;
}

.signup-prompt p {
    color: #6b7280;
    margin: 0;
}

.signup-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
}

.signup-link:hover {
    text-decoration: underline;
}

.login-illustration {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    padding: 60px 40px;
}

.illustration-content h3 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
}

.illustration-content p {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 40px;
    line-height: 1.6;
}

.features {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feature {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
}

.feature i {
    font-size: 18px;
    opacity: 0.8;
}

@media (max-width: 768px) {
    .login-wrapper {
        grid-template-columns: 1fr;
    }

    .login-illustration {
        order: -1;
        padding: 40px 20px;
    }

    .login-card {
        padding: 40px 30px;
    }

    .social-login {
        flex-direction: column;
    }
}
</style>