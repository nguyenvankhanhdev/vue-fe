<template>
  <div class="register-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="register-wrapper">
        <!-- Left -->
        <div class="register-illustration">
          <div class="illustration-content">
            <h3>Tham gia cùng chúng tôi</h3>
            <p>Tạo tài khoản để trải nghiệm những ưu đãi tuyệt vời và dịch vụ chăm sóc khách hàng tốt nhất</p>
            <div class="benefits">
              <div class="benefit"><i class="fas fa-gift"></i><span>Ưu đãi độc quyền</span></div>
              <div class="benefit"><i class="fas fa-star"></i><span>Tích điểm thưởng</span></div>
              <div class="benefit"><i class="fas fa-truck"></i><span>Miễn phí vận chuyển</span></div>
            </div>
          </div>
        </div>

        <!-- Right -->
        <div class="register-card">
          <div class="register-header">
            <h2>Đăng ký tài khoản</h2>
            <p>Tạo tài khoản mới để bắt đầu mua sắm</p>

            <!-- General Error -->
            <div v-if="generalError" class="p-4 rounded-lg border alert-error" role="alert">
              <i class="fas fa-exclamation-circle"></i>
              {{ generalError }}
            </div>
          </div>

          <form @submit.prevent="handleRegister" class="register-form" novalidate>
            <div class="form-row">
              <div class="mb-4">
                <label for="firstName">Họ</label>
                <input id="firstName" type="text" v-model.trim="registerForm.firstName" placeholder="Nhập họ" required
                  :class="{ 'error': hasFieldError('first_name') }" @input="clearErrors">
                <p v-if="hasFieldError('first_name')" class="error-message">
                  {{ getFieldError('first_name') }}
                </p>
              </div>
              <div class="mb-4">
                <label for="lastName">Tên</label>
                <input id="lastName" type="text" v-model.trim="registerForm.lastName" placeholder="Nhập tên" required
                  :class="{ 'error': hasFieldError('last_name') }" @input="clearErrors">
                <p v-if="hasFieldError('last_name')" class="error-message">
                  {{ getFieldError('last_name') }}
                </p>
              </div>
            </div>

            <div class="mb-4">
              <label for="email">Email</label>
              <input id="email" type="email" v-model.trim="registerForm.email" placeholder="Nhập địa chỉ email" required
                :class="{ 'error': hasFieldError('email') || (registerForm.email && !isValidEmail) }"
                @input="clearErrors">
              <p v-if="hasFieldError('email')" class="error-message">
                {{ getFieldError('email') }}
              </p>
              <p v-else-if="registerForm.email && !isValidEmail" class="error-message">
                Email không hợp lệ
              </p>
            </div>

            <div class="mb-4">
              <label for="phone">Số điện thoại</label>
              <input id="phone" type="tel" v-model.trim="registerForm.phone" placeholder="Nhập số điện thoại" required
                :class="{ 'error': hasFieldError('phone') || (registerForm.phone && !isValidPhone) }"
                @input="clearErrors">
              <p v-if="hasFieldError('phone')" class="error-message">
                {{ getFieldError('phone') }}
              </p>
              <p v-else-if="registerForm.phone && !isValidPhone" class="error-message">
                Số điện thoại không hợp lệ
              </p>
            </div>

            <div class="mb-4">
              <label for="password">Mật khẩu</label>
              <div class="password-input">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="registerForm.password"
                  placeholder="Nhập mật khẩu" required :class="{ 'error': hasFieldError('password') }"
                  @input="clearErrors">
                <button type="button" class="password-toggle" @click="togglePassword" aria-label="Hiện/ẩn mật khẩu">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>

              <div class="password-strength" aria-live="polite">
                <div class="strength-bar" :class="passwordStrength.class">
                  <div class="strength-fill" :style="{ width: passwordStrength.width }"></div>
                </div>
                <span class="strength-text">{{ passwordStrength.text }}</span>
              </div>

              <p v-if="hasFieldError('password')" class="error-message">
                {{ getFieldError('password') }}
              </p>
            </div>

            <div class="mb-4">
              <label for="confirmPassword">Xác nhận mật khẩu</label>
              <div class="password-input">
                <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
                  v-model="registerForm.confirmPassword" placeholder="Nhập lại mật khẩu" required
                  :class="{ 'error': registerForm.confirmPassword && !passwordsMatch }" @input="clearErrors">
                <button type="button" class="password-toggle" @click="toggleConfirmPassword"
                  aria-label="Hiện/ẩn xác nhận mật khẩu">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p v-if="registerForm.confirmPassword && !passwordsMatch" class="error-message">Mật khẩu xác nhận không
                khớp</p>
            </div>

            <div class="form-row">
              <div class="mb-4">
                <label for="birthDate">Ngày sinh</label>
                <input id="birthDate" type="date" v-model="registerForm.birthDate" required
                  :class="{ 'error': hasFieldError('birth_date') }" @change="clearErrors">
                <p v-if="hasFieldError('birth_date')" class="error-message">
                  {{ getFieldError('birth_date') }}
                </p>
              </div>
              <div class="mb-4">
                <label for="gender">Giới tính</label>
                <select id="gender" v-model="registerForm.gender" required :class="{ 'error': hasFieldError('gender') }"
                  @change="clearErrors">
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
                <p v-if="hasFieldError('gender')" class="error-message">
                  {{ getFieldError('gender') }}
                </p>
              </div>
            </div>

            <!-- Checkboxes with tick -->
            <div class="form-options">
              <label class="checkbox">
                <input type="checkbox" v-model="agreeTerms" required>
                <span class="box" aria-hidden="true"></span>
                <span class="text">Tôi đồng ý với
                  <a href="/terms" target="_blank">Điều khoản sử dụng</a>
                  và
                  <a href="/privacy" target="_blank">Chính sách bảo mật</a>
                </span>
              </label>

              <label class="checkbox">
                <input type="checkbox" v-model="subscribeNewsletter">
                <span class="box" aria-hidden="true"></span>
                <span class="text">Đăng ký nhận tin khuyến mãi qua email</span>
              </label>
            </div>

            <button type="submit" class="register-btn" :disabled="!isFormValid || loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản' }}
            </button>

            <div class="divider"><span>hoặc</span></div>

            <div class="social-register">
              <button type="button" class="social-btn google-btn"><i class="fab fa-google"></i>Đăng ký với
                Google</button>
              <button type="button" class="social-btn facebook-btn"><i class="fab fa-facebook-f"></i>Đăng ký với
                Facebook</button>
            </div>

            <div class="login-prompt">
              <p>Đã có tài khoản?
                <router-link to="/login" class="login-link">Đăng nhập ngay</router-link>
              </p>
            </div>
          </form>
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
const { login: setAuthState } = useAuth()

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  gender: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeTerms = ref(false)
const subscribeNewsletter = ref(false)
const loading = ref(false)
const serverErrors = ref({})
const generalError = ref('')

const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email))
const isValidPhone = computed(() => /^0\d{9,10}$/.test(registerForm.value.phone))

const passwordsMatch = computed(() =>
  registerForm.value.password === registerForm.value.confirmPassword
)

const passwordStrength = computed(() => {
  const p = registerForm.value.password
  let score = 0
  if (p.length >= 8) score++
  if (/[a-z]/.test(p)) score++
  if (/[A-Z]/.test(p)) score++
  if (/\d/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  const map = [
    { class: 'weak', width: '20%', text: 'Yếu' },
    { class: 'fair', width: '40%', text: 'Khá yếu' },
    { class: 'good', width: '60%', text: 'Tốt' },
    { class: 'strong', width: '80%', text: 'Mạnh' },
    { class: 'very-strong', width: '100%', text: 'Rất mạnh' }
  ]
  return map[Math.max(0, Math.min(score - 1, 4))]
})

const isFormValid = computed(() => {
  const f = registerForm.value
  return f.firstName && f.lastName &&
    isValidEmail.value &&
    isValidPhone.value &&
    f.password && f.confirmPassword && passwordsMatch.value &&
    f.birthDate && f.gender && agreeTerms.value
})

const togglePassword = () => (showPassword.value = !showPassword.value)
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value)

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

const handleRegister = async () => {
  // Clear previous errors
  clearErrors()

  // Validate form trước khi gửi
  if (!isFormValid.value) {
    warning('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc')
    return
  }

  loading.value = true

  try {
    // Chuẩn bị data để gửi lên server
    const fullName = `${registerForm.value.firstName || ''} ${registerForm.value.lastName || ''}`
      .replace(/\s+/g, ' ')
      .trim()
    const userData = {
      name: fullName,
      email: registerForm.value.email.toLowerCase().trim(),
      phone: registerForm.value.phone.trim(),
      password: registerForm.value.password,
      password_confirmation: registerForm.value.confirmPassword,
      birth_date: registerForm.value.birthDate,
      gender: registerForm.value.gender,
      subscribe_newsletter: subscribeNewsletter.value
    }

    // Gọi API đăng ký
    const response = await authService.register(userData)

    if (userData.email) {
      localStorage.setItem('pendingVerifyEmail', userData.email)
    }

    // setAuthState(response.token, response.user)

    // Hiển thị thông báo và chuyển sang bước xác minh email
    const displayName = response?.user?.first_name || response?.user?.name || 'bạn'
    success(`Chào mừng ${displayName}! Vui lòng kiểm tra email để xác minh tài khoản.`, 6000)
    router.push({ name: 'VerifyEmail' })

  } catch (err) {
    console.error('Registration error:', err)

    if (err instanceof ApiError) {
      if (err.isValidationError()) {
        // Lỗi validation từ server (422)
        const errors = err.getValidationErrors()
        // Map lỗi 'name' của BE sang 2 trường first_name/last_name để UI hiện đúng
        if (errors?.name?.length) {
          errors.first_name = errors.first_name || errors.name
          errors.last_name = errors.last_name || errors.name
        }
        serverErrors.value = errors

        // Hiển thị lỗi validation tổng quát
        const errorMessages = Object.values(serverErrors.value)
          .flat()
          .slice(0, 3) // Chỉ hiển thị 3 lỗi đầu tiên

        if (errorMessages.length > 0) {
          error(`Vui lòng kiểm tra lại: ${errorMessages.join(', ')}`)
        }

      } else if (err.status === 409) {
        // Email đã tồn tại
        serverErrors.value.email = ['Email này đã được sử dụng']
        error('Email này đã được sử dụng. Vui lòng thử email khác hoặc đăng nhập.')

      } else if (err.isServerError()) {
        // Lỗi server (5xx)
        generalError.value = 'Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.'
        error('Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.')

      } else {
        // Các lỗi khác
        generalError.value = err.message || 'Có lỗi xảy ra khi đăng ký tài khoản'
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
/* Layout */
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px
}

.container {
  max-width: 1200px;
  width: 100%
}

.register-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .1);
  overflow: hidden
}

/* Left */
.register-illustration {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 60px 40px
}

.illustration-content h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px
}

.illustration-content p {
  font-size: 16px;
  opacity: .9;
  margin-bottom: 40px;
  line-height: 1.6
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 20px
}

.benefit {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px
}

.benefit i {
  font-size: 18px;
  opacity: .85
}

/* Right */
.register-card {
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* FIX: bỏ chiều cao cứng + scroll nội bộ gây thanh cuộn trong card */
}

.register-header {
  text-align: center;
  margin-bottom: 26px
}

.register-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px
}

.register-header p {
  color: #6b7280;
  font-size: 14px
}

/* Form */
.register-form {
  width: 100%
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px
}

.form-group {
  margin-bottom: 18px
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #374151;
  font-size: 14px
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  transition: all .2s ease;
  background: #f9fafb
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, .12)
}

/* Password */
.password-input {
  position: relative
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px
}

.password-strength {
  margin-top: 8px
}

.strength-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px
}

.strength-fill {
  height: 100%;
  transition: all .25s ease
}

.strength-bar.weak .strength-fill {
  background: #ef4444
}

.strength-bar.fair .strength-fill {
  background: #f59e0b
}

.strength-bar.good .strength-fill {
  background: #eab308
}

.strength-bar.strong .strength-fill {
  background: #22c55e
}

.strength-bar.very-strong .strength-fill {
  background: #16a34a
}

.strength-text {
  font-size: 12px;
  color: #6b7280
}

/* Errors */
.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px
}

/* Input error state */
input.error,
select.error {
  border-color: #ef4444 !important;
  background-color: #fef2f2 !important;
}

input.error:focus,
select.error:focus {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
}

/* Alert styles */
.alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
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

/* Checkboxes with real tick */
.form-options {
  margin: 10px 0 22px
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none
}

.checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0
}

.checkbox .box {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
  display: inline-block;
  transition: all .15s ease;
  position: relative;
  flex: 0 0 18px;
  margin-top: 2px
}

.checkbox input:focus+.box {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, .15)
}

.checkbox input:checked+.box {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox input:checked+.box::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 10px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg)
}

.checkbox .text {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.45
}

.checkbox a {
  color: #3b82f6;
  text-decoration: none
}

.checkbox a:hover {
  text-decoration: underline
}

/* Buttons */
.register-btn {
  width: 100%;
  padding: 14px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px
}

.register-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px)
}

.register-btn:disabled {
  opacity: .7;
  cursor: not-allowed
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite
}

@keyframes spin {
  to {
    transform: rotate(360deg)
  }
}

/* Others */
.divider {
  text-align: center;
  margin: 22px 0;
  position: relative
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb
}

.divider span {
  background: #fff;
  padding: 0 16px;
  color: #6b7280;
  font-size: 14px
}

.social-register {
  display: flex;
  gap: 12px;
  margin-bottom: 20px
}

.social-btn {
  flex: 1;
  padding: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px
}

.google-btn:hover {
  border-color: #ea4335;
  color: #ea4335
}

.facebook-btn:hover {
  border-color: #1877f2;
  color: #1877f2
}

.login-prompt {
  text-align: center
}

.login-prompt p {
  color: #6b7280;
  margin: 0;
  font-size: 14px
}

.login-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600
}

.login-link:hover {
  text-decoration: underline
}

/* Responsive */
@media (max-width: 992px) {
  .register-wrapper {
    grid-template-columns: 1fr
  }

  .register-illustration {
    order: -1;
    padding: 40px 24px
  }
}

@media (max-width:768px) {
  .register-card {
    padding: 36px 24px
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0
  }

  .social-register {
    flex-direction: column
  }
}
</style>
