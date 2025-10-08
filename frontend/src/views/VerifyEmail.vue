<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-bounce"></div>
      <div class="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full animate-pulse"></div>
      <div class="absolute bottom-40 right-1/3 w-16 h-16 bg-purple-300/20 rounded-full animate-bounce"></div>
    </div>

    <div class="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <!-- Main Card -->
        <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in">
          <!-- Header with Icon -->
          <div class="relative p-8 text-center">
            <div class="relative inline-block">
              <!-- Animated Mail Icon -->
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <i class="fas fa-envelope-open-text text-white text-2xl"></i>
              </div>
              <!-- Floating Dots -->
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 class="text-2xl font-bold text-gray-900 mb-3">Xác minh email của bạn</h1>
            <div class="space-y-2">
              <p class="text-gray-600 leading-relaxed">
                Chúng tôi đã gửi một liên kết xác minh đến
              </p>
              <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <i class="fas fa-at text-blue-600 mr-2"></i>
                <span class="font-semibold text-gray-800">{{ userEmail }}</span>
              </div>
              <p class="text-sm text-gray-500 mt-3">
                Vui lòng kiểm tra hộp thư đến (và mục Spam/Quảng cáo nếu không thấy)
              </p>
            </div>
          </div>

          <!-- Alert Messages -->
          <div v-if="message" class="mx-6 mb-4">
            <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center gap-3">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <i class="fas fa-check text-white text-sm"></i>
              </div>
              <span class="text-green-800 font-medium">{{ message }}</span>
            </div>
          </div>

          <div v-if="errorMsg" class="mx-6 mb-4">
            <div class="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center gap-3">
              <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-white text-sm"></i>
              </div>
              <span class="text-red-800 font-medium">{{ errorMsg }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="px-6 pb-8 space-y-4">
            <button 
              @click="resend"
              :disabled="resending" 
              class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <div v-if="resending" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <i v-else class="fas fa-paper-plane"></i>
              {{ resending ? 'Đang gửi lại...' : 'Gửi lại email xác minh' }}
            </button>

            <button 
              @click="checkNow"
              :disabled="checking" 
              class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div v-if="checking" class="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
              <i v-else class="fas fa-sync-alt"></i>
              {{ checking ? 'Đang kiểm tra...' : 'Tôi đã xác minh – Kiểm tra lại' }}
            </button>

            <div class="text-center pt-4">
              <router-link 
                to="/login" 
                class="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                <i class="fas fa-arrow-left"></i>
                Quay lại đăng nhập
              </router-link>
            </div>
          </div>

          <!-- Helpful Tips -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-t border-gray-100">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mt-0.5">
                <i class="fas fa-lightbulb text-white text-xs"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-1">Mẹo hữu ích:</h4>
                <p class="text-sm text-gray-600 leading-relaxed">
                  Mở email trên thiết bị này, bấm liên kết xác minh, sau đó quay lại trang này và nhấn "Tôi đã xác minh".
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Notice -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-500 leading-relaxed">
            <i class="fas fa-shield-alt text-blue-500 mr-1"></i>
            Liên kết xác minh sẽ hết hạn sau 24 giờ vì lý do bảo mật
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService, ApiError } from '../services/api.js'
import { useToast } from '../services/toast.js'

const router = useRouter()
const { success, error: showError } = useToast()

const resending = ref(false)
const checking = ref(false)
const message = ref('')
const errorMsg = ref('')

// Lấy email an toàn: ưu tiên pendingVerifyEmail (được set sau khi register)
const safeGetEmail = () => {
  // 1) Nếu URL có ?email=... thì ưu tiên (cho phép pass email qua query khi cần)
  const qEmail = router.currentRoute.value.query?.email
  if (typeof qEmail === 'string' && qEmail.trim()) return qEmail.trim()

  // 2) Email lưu tạm lúc đăng ký
  const pending = localStorage.getItem('pendingVerifyEmail')
  if (pending && pending !== 'undefined' && pending !== 'null') return pending

  // 3) Fall back: thử từ localStorage.user (nếu trước đó có đăng nhập)
  const raw = localStorage.getItem('user')
  if (raw && raw !== 'undefined' && raw !== 'null') {
    try {
      const parsed = JSON.parse(raw)
      if (parsed?.email) return parsed.email
    } catch {}
  }
  return ''
}
const userEmail = ref(safeGetEmail())

const clearBanners = () => { message.value = ''; errorMsg.value = '' }

const resend = async () => {
  clearBanners()
  if (!userEmail.value) {
    errorMsg.value = 'Không có email để gửi lại. Vui lòng đăng ký lại.'
    showError(errorMsg.value)
    return
  }
  resending.value = true
  try {
    // Route resend KHÔNG cần đăng nhập, nhận { email }
    await authService.resendVerificationEmail(userEmail.value)
    message.value = 'Đã gửi lại email xác minh. Vui lòng kiểm tra hộp thư (kể cả Spam/Quảng cáo).'
    success(message.value, 4000)
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.status === 429) {
        errorMsg.value = 'Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau.'
      } else {
        // Trả message “mù” để tránh lộ thông tin tồn tại email
        errorMsg.value = e?.data?.message || 'Không thể gửi lại email xác minh. Thử lại sau.'
      }
    } else {
      errorMsg.value = 'Lỗi mạng. Vui lòng thử lại.'
    }
    showError(errorMsg.value)
  } finally {
    resending.value = false
  }
}

const checkNow = async () => {
  clearBanners()
  checking.value = true
  try {
    // Đầu tiên kiểm tra URL parameters
    const urlResult = authService.checkEmailVerificationStatus()
    
    if (urlResult.verified && urlResult.method === 'url_redirect') {
      message.value = 'Email đã được xác minh thành công!'
      success('Xác minh email thành công! Bạn có thể tiếp tục.', 2500)
      localStorage.removeItem('pendingVerifyEmail')
      
      // Clear URL parameters
      const url = new URL(window.location)
      const redirect = url.searchParams.get('redirect') || '/'
      url.searchParams.delete('verified')
      url.searchParams.delete('reason')
      url.searchParams.delete('already')
      url.searchParams.delete('redirect')
      window.history.replaceState({}, '', url.toString())
      
      setTimeout(() => {
        router.replace(redirect)
      }, 1500)
      return
    }
    
    // Nếu không có trong URL, kiểm tra từ server hoặc localStorage
    const serverResult = await authService.checkEmailVerificationFromServer()
    
    if (serverResult.verified) {
      message.value = 'Email đã được xác minh thành công!'
      success('Xác minh email thành công! Bạn có thể tiếp tục.', 2500)
      localStorage.removeItem('pendingVerifyEmail')
      
      setTimeout(() => {
        router.replace('/')
      }, 1500)
    } else {
      // Xử lý các trường hợp lỗi khác nhau
      if (urlResult.reason === 'invalid_hash') {
        errorMsg.value = 'Liên kết xác minh không hợp lệ hoặc đã hết hạn. Vui lòng gửi lại email xác minh.'
      } else if (serverResult.method === 'server_error') {
        errorMsg.value = 'Không thể kết nối server để kiểm tra. Hãy đảm bảo bạn đã bấm link xác minh trong email và thử lại.'
      } else if (serverResult.method === 'no_token') {
        errorMsg.value = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        errorMsg.value = 'Chưa phát hiện trạng thái đã xác minh. Hãy mở email và bấm liên kết xác minh, sau đó quay lại trang này.'
      }
      showError(errorMsg.value)
    }
  } catch (e) {
    console.error('Error checking verification:', e)
    errorMsg.value = 'Không thể kiểm tra trạng thái xác minh. Vui lòng thử lại.'
    showError(errorMsg.value)
  } finally {
    checking.value = false
  }
}

onMounted(() => {
  // Kiểm tra trạng thái xác minh khi component mount
  const result = authService.checkEmailVerificationStatus()
  
  if (result.verified) {
    if (result.method === 'url_redirect') {
      const q = router.currentRoute.value.query
      const already = q?.already === '1'
      
      if (already) {
        message.value = 'Email của bạn đã được xác minh trước đó.'
      } else {
        message.value = 'Email của bạn đã được xác minh thành công.'
        
        // Đánh dấu email đã được xác minh cho các tab khác
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user.email) {
          authService.markEmailAsVerified(user.email)
        }
      }
      
      // Dọn email tạm vì đã verify xong
      localStorage.removeItem('pendingVerifyEmail')
      
      // Clear URL và redirect sau 1.2s
      setTimeout(() => {
        const redirect = q?.redirect || '/'
        const url = new URL(window.location)
        url.searchParams.delete('verified')
        url.searchParams.delete('reason')
        url.searchParams.delete('already')
        url.searchParams.delete('redirect')
        window.history.replaceState({}, '', url.toString())
        router.replace(redirect)
      }, 1200)
    }
  } else if (result.reason === 'invalid_hash') {
    errorMsg.value = 'Liên kết xác minh không hợp lệ hoặc đã hết hạn. Vui lòng gửi lại email xác minh.'
  }
})
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

@keyframes animate-ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
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

.animate-ping {
  animation: animate-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Custom scrollbar for better aesthetics */
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