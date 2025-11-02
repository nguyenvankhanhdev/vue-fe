<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0">
            <div class="absolute top-16 left-16 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
            <div class="absolute top-32 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-bounce"></div>
            <div class="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full animate-pulse"></div>
            <div class="absolute bottom-40 right-1/3 w-16 h-16 bg-purple-300/20 rounded-full animate-bounce"></div>
        </div>

        <div class="relative flex items-center justify-center min-h-screen py-12 px-4">
            <div class="max-w-5xl w-full">
                <div class="grid lg:grid-cols-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <div class="p-12 flex flex-col justify-center">
                        <div class="text-center mb-10">
                            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <i class="fas fa-user text-white text-2xl"></i>
                            </div>
                            <h2 class="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">Đăng nhập</h2>
                            <p class="text-gray-600 animate-fade-in">Chào mừng bạn quay trở lại</p>

                            <!-- General Error -->
                            <div v-if="generalError" class="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center gap-3" role="alert">
                                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                    <i class="fas fa-exclamation-triangle text-white text-sm"></i>
                                </div>
                                <span class="text-red-800 font-medium">{{ generalError }}</span>
                            </div>
                        </div>

                        <form @submit.prevent="handleLogin" class="w-full space-y-6">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-semibold text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    v-model="loginForm.email" 
                                    placeholder="Nhập email của bạn"
                                    required
                                    :class="[
                                        'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none',
                                        (hasFieldError('email') || (loginForm.email && !isValidEmail)) 
                                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                            : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                    ]"
                                    @input="clearErrors"
                                >
                                <p v-if="hasFieldError('email')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <i class="fas fa-exclamation-triangle text-xs"></i>
                                    {{ getFieldError('email') }}
                                </p>
                                <p v-else-if="loginForm.email && !isValidEmail" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <i class="fas fa-exclamation-triangle text-xs"></i>
                                    Email không đúng định dạng
                                </p>
                            </div>

                            <div>
                                <label for="password" class="block mb-2 text-sm font-semibold text-gray-700">Mật khẩu</label>
                                <div class="relative">
                                    <input 
                                        :type="showPassword ? 'text' : 'password'" 
                                        id="password"
                                        v-model="loginForm.password" 
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
                                        @click="togglePassword" 
                                        class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                                <p v-if="hasFieldError('password')" class="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <i class="fas fa-exclamation-triangle text-xs"></i>
                                    {{ getFieldError('password') }}
                                </p>
                            </div>

                            <div class="flex justify-between items-center">
                                <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <div class="relative">
                                        <input type="checkbox" v-model="rememberMe" class="sr-only peer">
                                        <div class="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 peer-checked:border-transparent transition-all duration-200 flex items-center justify-center">
                                            <i class="fas fa-check text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></i>
                                        </div>
                                    </div>
                                    Ghi nhớ đăng nhập
                                </label>
                                <router-link to="/forgot-password" class="text-blue-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200">
                                    Quên mật khẩu?
                                </router-link>
                            </div>

                            <button 
                                type="submit" 
                                :disabled="!isFormValid || loading" 
                                class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:-translate-y-0.5"
                            >
                                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <i v-else class="fas fa-sign-in-alt"></i>
                                {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
                            </button>

                            <div class="relative text-center my-6">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-200"></div>
                                </div>
                                <span class="bg-white px-4 text-gray-500 text-sm">hoặc</span>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
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
                                    Chưa có tài khoản?
                                    <router-link to="/register" class="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200 ml-1">Đăng ký ngay</router-link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex items-center justify-center relative overflow-hidden">
                        <!-- Floating Elements -->
                        <div class="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                        <div class="absolute bottom-12 right-12 w-20 h-20 bg-blue-300/20 rounded-full animate-bounce"></div>
                        <div class="absolute top-1/3 right-8 w-12 h-12 bg-purple-300/30 rounded-full animate-pulse"></div>

                        <div class="text-center text-white relative z-10">
                            <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                <i class="fas fa-shopping-bag text-4xl text-white"></i>
                            </div>
                            <h3 class="text-3xl font-bold mb-6 animate-fade-in">Khám phá thế giới mua sắm</h3>
                            <p class="text-lg text-white/90 mb-10 leading-relaxed animate-fade-in">Tham gia cộng đồng hàng triệu người dùng đang tin tưởng và lựa chọn chúng tôi</p>
                            <div class="space-y-6 animate-fade-in">
                                <div class="flex items-center gap-4 text-left">
                                    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <i class="fas fa-shipping-fast text-xl"></i>
                                    </div>
                                    <span class="text-lg font-medium">Giao hàng nhanh chóng</span>
                                </div>
                                <div class="flex items-center gap-4 text-left">
                                    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <i class="fas fa-shield-alt text-xl"></i>
                                    </div>
                                    <span class="text-lg font-medium">Bảo mật thông tin</span>
                                </div>
                                <div class="flex items-center gap-4 text-left">
                                    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <i class="fas fa-headset text-xl"></i>
                                    </div>
                                    <span class="text-lg font-medium">Hỗ trợ 24/7</span>
                                </div>
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
import { useAuth } from '@/composables'

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
        const { token, user } = await authService.login(credentials)
        setAuth(token, user)
        // Kiểm tra trạng thái xác minh thống nhất: ưu tiên email_verified_at hoặc verified boolean
        const isVerified = !!(user.email_verified_at || user.verified === true)
        if (!isVerified) {
            router.push({ name: 'VerifyEmail', query: { redirect: router.currentRoute.value.query.redirect || '/' } })
            return
        }
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