<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 flex items-center justify-center p-5">
        <div class="max-w-6xl w-full">
            <div class="grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
                <div class="p-12 flex flex-col justify-center">
                    <div class="text-center mb-10">
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
                        <p class="text-gray-600">Chào mừng bạn quay trở lại</p>

                        <!-- General Error -->
                        <div v-if="generalError" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 text-sm" role="alert">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                            {{ generalError }}
                        </div>
                    </div>

                    <form @submit.prevent="handleLogin" class="w-full">
                        <div class="mb-6">
                            <label for="email" class="block mb-2 font-semibold text-gray-700">Email</label>
                            <input type="email" id="email" v-model="loginForm.email" placeholder="Nhập email của bạn"
                                required
                                :class="[
                                    'w-full px-4 py-3.5 border-2 rounded-xl text-base transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none',
                                    (hasFieldError('email') || (loginForm.email && !isValidEmail)) 
                                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:shadow-red-100' 
                                        : 'border-gray-200 focus:border-blue-500 focus:shadow-blue-100'
                                ]"
                                @input="clearErrors">
                            <p v-if="hasFieldError('email')" class="text-red-500 text-xs mt-1.5">
                                {{ getFieldError('email') }}
                            </p>
                            <p v-else-if="loginForm.email && !isValidEmail" class="text-red-500 text-xs mt-1.5">
                                Email không đúng định dạng
                            </p>
                        </div>

                        <div class="mb-6">
                            <label for="password" class="block mb-2 font-semibold text-gray-700">Mật khẩu</label>
                            <div class="relative">
                                <input :type="showPassword ? 'text' : 'password'" id="password"
                                    v-model="loginForm.password" placeholder="Nhập mật khẩu" required
                                    :class="[
                                        'w-full px-4 py-3.5 pr-12 border-2 rounded-xl text-base transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none',
                                        hasFieldError('password') 
                                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:shadow-red-100' 
                                            : 'border-gray-200 focus:border-blue-500 focus:shadow-blue-100'
                                    ]" 
                                    @input="clearErrors">
                                <button type="button" @click="togglePassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1">
                                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                            <p v-if="hasFieldError('password')" class="text-red-500 text-xs mt-1.5">
                                {{ getFieldError('password') }}
                            </p>
                        </div>

                        <div class="flex justify-between items-center mb-8">
                            <label class="flex items-center text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" v-model="rememberMe" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                Ghi nhớ đăng nhập
                            </label>
                            <router-link to="/forgot-password" class="text-blue-600 text-sm font-medium hover:underline">
                                Quên mật khẩu?
                            </router-link>
                        </div>

                        <button type="submit" :disabled="!isFormValid || loading" 
                            class="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                            <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
                        </button>

                        <div class="relative text-center my-8">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-200"></div>
                            </div>
                            <span class="bg-white px-4 text-gray-500 text-sm">hoặc</span>
                        </div>

                        <div class="flex gap-3 mb-8">
                            <button type="button" class="flex-1 py-3 px-4 border-2 border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-600 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                                <i class="fab fa-google"></i>
                                Google
                            </button>
                            <button type="button" class="flex-1 py-3 px-4 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-600 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                                <i class="fab fa-facebook-f"></i>
                                Facebook
                            </button>
                        </div>

                        <div class="text-center">
                            <p class="text-gray-600">
                                Chưa có tài khoản?
                                <router-link to="/register" class="text-blue-600 font-semibold hover:underline ml-1">Đăng ký ngay</router-link>
                            </p>
                        </div>
                    </form>
                </div>

                <div class="bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-center p-12">
                    <div class="max-w-md">
                        <h3 class="text-2xl font-bold mb-4">Khám phá thế giới mua sắm</h3>
                        <p class="text-indigo-100 mb-10 leading-relaxed">Tham gia cộng đồng hàng triệu người dùng đang tin tưởng và lựa chọn chúng tôi</p>
                        <div class="space-y-5">
                            <div class="flex items-center gap-3 text-sm">
                                <i class="fas fa-shipping-fast text-lg opacity-80"></i>
                                <span>Giao hàng nhanh chóng</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm">
                                <i class="fas fa-shield-alt text-lg opacity-80"></i>
                                <span>Bảo mật thông tin</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm">
                                <i class="fas fa-headset text-lg opacity-80"></i>
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