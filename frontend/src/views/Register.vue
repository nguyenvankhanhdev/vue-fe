<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
      <div class="absolute top-32 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-bounce"></div>
      <div class="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full animate-pulse"></div>
      <div class="absolute bottom-40 right-1/3 w-16 h-16 bg-purple-300/20 rounded-full animate-bounce"></div>
    </div>

    <div class="relative flex items-center justify-center min-h-screen py-8 px-4">
      <div class="max-w-6xl w-full">
        <div class="grid lg:grid-cols-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <!-- Left Illustration -->
          <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex items-center justify-center relative overflow-hidden">
            <!-- Floating Elements -->
            <div class="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
            <div class="absolute bottom-12 right-12 w-20 h-20 bg-blue-300/20 rounded-full animate-bounce"></div>
            <div class="absolute top-1/3 right-8 w-12 h-12 bg-purple-300/30 rounded-full animate-pulse"></div>
            
            <div class="text-center text-white relative z-10">
              <div class="mb-8">
                <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <i class="fas fa-shopping-cart text-4xl text-white"></i>
                </div>
                <h3 class="text-3xl font-bold mb-4 animate-fade-in">Tham gia cùng chúng tôi</h3>
                <p class="text-lg text-white/90 leading-relaxed animate-fade-in">Tạo tài khoản để trải nghiệm những ưu đãi tuyệt vời và dịch vụ chăm sóc khách hàng tốt nhất</p>
              </div>
              
              <div class="space-y-6 animate-fade-in">
                <div class="flex items-center gap-4 text-left">
                  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-gift text-xl"></i>
                  </div>
                  <span class="text-lg font-medium">Ưu đãi độc quyền</span>
                </div>
                <div class="flex items-center gap-4 text-left">
                  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-star text-xl"></i>
                  </div>
                  <span class="text-lg font-medium">Tích điểm thưởng</span>
                </div>
                <div class="flex items-center gap-4 text-left">
                  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-truck text-xl"></i>
                  </div>
                  <span class="text-lg font-medium">Miễn phí vận chuyển</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Form -->
          <div class="p-8 lg:p-12 max-h-[90vh] overflow-y-auto">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h2>
              <p class="text-gray-600">Tạo tài khoản mới để bắt đầu mua sắm</p>

              <!-- General Error -->
              <div v-if="generalError" class="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center gap-3" role="alert">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-exclamation-triangle text-white text-sm"></i>
                </div>
                <span class="text-red-800 font-medium">{{ generalError }}</span>
              </div>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-6" novalidate>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">Họ</label>
                  <input 
                    id="firstName" 
                    type="text" 
                    v-model.trim="registerForm.firstName" 
                    placeholder="Nhập họ" 
                    required
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                      hasFieldError('first_name') 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                    ]"
                    @input="clearErrors"
                  >
                  <p v-if="hasFieldError('first_name')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i class="fas fa-exclamation-triangle text-xs"></i>
                    {{ getFieldError('first_name') }}
                  </p>
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">Tên</label>
                  <input 
                    id="lastName" 
                    type="text" 
                    v-model.trim="registerForm.lastName" 
                    placeholder="Nhập tên" 
                    required
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                      hasFieldError('last_name') 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                    ]"
                    @input="clearErrors"
                  >
                  <p v-if="hasFieldError('last_name')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i class="fas fa-exclamation-triangle text-xs"></i>
                    {{ getFieldError('last_name') }}
                  </p>
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  v-model.trim="registerForm.email" 
                  placeholder="Nhập địa chỉ email" 
                  required
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                    (hasFieldError('email') || (registerForm.email && !isValidEmail))
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                  ]"
                  @input="clearErrors"
                >
                <p v-if="hasFieldError('email')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle text-xs"></i>
                  {{ getFieldError('email') }}
                </p>
                <p v-else-if="registerForm.email && !isValidEmail" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle text-xs"></i>
                  Email không hợp lệ
                </p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                <input 
                  id="phone" 
                  type="tel" 
                  v-model.trim="registerForm.phone" 
                  placeholder="Nhập số điện thoại" 
                  required
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                    (hasFieldError('phone') || (registerForm.phone && !isValidPhone))
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                  ]"
                  @input="clearErrors"
                >
                <p v-if="hasFieldError('phone')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle text-xs"></i>
                  {{ getFieldError('phone') }}
                </p>
                <p v-else-if="registerForm.phone && !isValidPhone" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle text-xs"></i>
                  Số điện thoại không hợp lệ
                </p>
              </div>

              <div>
                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
                <div class="relative">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    id="password" 
                    v-model="registerForm.password"
                    placeholder="Nhập mật khẩu" 
                    required 
                    :class="[
                      'w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                      hasFieldError('password') 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                    ]"
                    @input="clearErrors"
                  >
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200" 
                    @click="togglePassword" 
                    aria-label="Hiện/ẩn mật khẩu"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>

                <div class="mt-2" aria-live="polite">
                  <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      class="h-full rounded-full transition-all duration-300"
                      :class="{
                        'bg-red-500': passwordStrength.class === 'weak',
                        'bg-orange-500': passwordStrength.class === 'fair', 
                        'bg-yellow-500': passwordStrength.class === 'good',
                        'bg-green-500': passwordStrength.class === 'strong',
                        'bg-emerald-600': passwordStrength.class === 'very-strong'
                      }"
                      :style="{ width: passwordStrength.width }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-600 mt-1 block">{{ passwordStrength.text }}</span>
                </div>

                <p v-if="hasFieldError('password')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle text-xs"></i>
                  {{ getFieldError('password') }}
                </p>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu</label>
                <div class="relative">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    id="confirmPassword"
                    v-model="registerForm.confirmPassword" 
                    placeholder="Nhập lại mật khẩu" 
                    required
                    :class="[
                      'w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                      (registerForm.confirmPassword && !passwordsMatch)
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                    ]"
                    @input="clearErrors"
                  >
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200" 
                    @click="toggleConfirmPassword"
                    aria-label="Hiện/ẩn xác nhận mật khẩu"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <p v-if="registerForm.confirmPassword && !passwordsMatch" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle text-xs"></i>
                  Mật khẩu xác nhận không khớp
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="birthDate" class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
                  <input 
                    id="birthDate" 
                    type="date" 
                    v-model="registerForm.birthDate" 
                    required
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                      hasFieldError('birth_date') 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                    ]"
                    @change="clearErrors"
                  >
                  <p v-if="hasFieldError('birth_date')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i class="fas fa-exclamation-triangle text-xs"></i>
                    {{ getFieldError('birth_date') }}
                  </p>
                </div>
                <div>
                  <label for="gender" class="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
                  <select 
                    id="gender" 
                    v-model="registerForm.gender" 
                    required 
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                      hasFieldError('gender') 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                    ]"
                    @change="clearErrors"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                  <p v-if="hasFieldError('gender')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i class="fas fa-exclamation-triangle text-xs"></i>
                    {{ getFieldError('gender') }}
                  </p>
                </div>
              </div>

              <!-- Checkboxes -->
              <div class="space-y-4">
                <label class="flex items-start gap-3 cursor-pointer group">
                  <div class="relative flex-shrink-0 mt-1">
                    <input type="checkbox" v-model="agreeTerms" required class="sr-only peer">
                    <div class="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 peer-checked:border-transparent transition-all duration-200 flex items-center justify-center">
                      <i class="fas fa-check text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></i>
                    </div>
                  </div>
                  <span class="text-sm text-gray-700 leading-relaxed">Tôi đồng ý với
                    <a href="/terms" target="_blank" class="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200">Điều khoản sử dụng</a>
                    và
                    <a href="/privacy" target="_blank" class="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200">Chính sách bảo mật</a>
                  </span>
                </label>

                <label class="flex items-start gap-3 cursor-pointer group">
                  <div class="relative flex-shrink-0 mt-1">
                    <input type="checkbox" v-model="subscribeNewsletter" class="sr-only peer">
                    <div class="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 peer-checked:border-transparent transition-all duration-200 flex items-center justify-center">
                      <i class="fas fa-check text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></i>
                    </div>
                  </div>
                  <span class="text-sm text-gray-700 leading-relaxed">Đăng ký nhận tin khuyến mãi qua email</span>
                </label>
              </div>

              <button 
                type="submit" 
                class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:-translate-y-0.5" 
                :disabled="!isFormValid || loading"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <i v-else class="fas fa-user-plus"></i>
                {{ loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản' }}
              </button>

              <div class="relative text-center my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <span class="bg-white px-4 text-gray-500 text-sm">hoặc</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  type="button" 
                  class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-600 font-medium rounded-xl transition-all duration-200"
                >
                  <i class="fab fa-google"></i>
                  Google
                </button>
                <button 
                  type="button" 
                  class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-600 font-medium rounded-xl transition-all duration-200"
                >
                  <i class="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </div>

              <div class="text-center pt-4">
                <p class="text-gray-600">
                  Đã có tài khoản?
                  <router-link to="/login" class="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200 ml-1">Đăng nhập ngay</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Verify Email Modal -->
    <VerifyEmailModal 
      :show="showVerifyModal"
      :email="verifyEmail"
      @close="handleVerifyModalClose"
      @verified="handleEmailVerified"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService, ApiError } from '../services/api.js'
import { useToast } from '../services/toast.js'
import { useAuth } from '@/composables'
import VerifyEmailModal from '../components/VerifyEmailModal.vue'

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

// Modal state
const showVerifyModal = ref(false)
const verifyEmail = ref('')

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
      verifyEmail.value = userData.email
    }

    // setAuthState(response.token, response.user)

    // Hiển thị thông báo và hiển thị modal xác minh email
    const displayName = response?.user?.first_name || response?.user?.name || 'bạn'
    success(`Chào mừng ${displayName}! Vui lòng kiểm tra email để xác minh tài khoản.`, 6000)
    
    // Hiển thị modal thay vì chuyển hướng
    showVerifyModal.value = true

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

// Modal event handlers
const handleVerifyModalClose = () => {
  showVerifyModal.value = false
  // Có thể chuyển hướng về trang chủ hoặc login sau khi đóng modal
  router.push('/')
}

const handleEmailVerified = () => {
  showVerifyModal.value = false
  // Xử lý khi email đã được xác minh
  success('Email đã được xác minh thành công!', 3000)
  // Chuyển hướng về trang chủ hoặc dashboard
  router.push('/')
}
</script>

<style scoped>
@keyframes animate-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes animate-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes animate-bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(-15px);
  }
  90% {
    transform: translateY(-4px);
  }
}

.animate-fade-in {
  animation: animate-fade-in 0.6s ease-out;
}

.animate-pulse {
  animation: animate-pulse 3s ease-in-out infinite;
}

.animate-bounce {
  animation: animate-bounce 2s infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>
