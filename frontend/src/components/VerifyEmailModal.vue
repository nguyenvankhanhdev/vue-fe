<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="handleBackdropClick">
    <div class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full animate-fade-in" @click.stop>
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
            <span class="font-semibold text-gray-800">{{ email }}</span>
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

        <div class="text-center pt-2">
          <button 
            @click="handleClose" 
            class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
          >
            <i class="fas fa-times"></i>
            Đóng và tiếp tục sau
          </button>
        </div>
      </div>

      <!-- Helpful Tips -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-t border-gray-100 rounded-b-3xl">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mt-0.5">
            <i class="fas fa-lightbulb text-white text-xs"></i>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 mb-1">Hướng dẫn xác minh:</h4>
            <p class="text-sm text-gray-600 leading-relaxed">
              Mở email và bấm vào liên kết xác minh. Trang web sẽ tự động chuyển hướng về đây và hệ thống sẽ phát hiện trạng thái đã xác minh.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService, ApiError } from '../services/api.js'
import { useToast } from '../services/toast.js'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  }
})

// Emits
const emit = defineEmits(['close', 'verified'])

const router = useRouter()
const { success, error: showError } = useToast()

// Reactive data
const resending = ref(false)
const checking = ref(false)
const message = ref('')
const errorMsg = ref('')
let autoCheckInterval = null

// Methods
const clearBanners = () => { 
  message.value = '' 
  errorMsg.value = '' 
}

const resend = async () => {
  clearBanners()
  if (!props.email) {
    errorMsg.value = 'Không có email để gửi lại. Vui lòng đăng ký lại.'
    showError(errorMsg.value)
    return
  }
  
  resending.value = true
  try {
    await authService.resendVerificationEmail(props.email)
    message.value = 'Đã gửi lại email xác minh. Vui lòng kiểm tra hộp thư (kể cả Spam/Quảng cáo).'
    success(message.value, 4000)
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.status === 429) {
        errorMsg.value = 'Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau.'
      } else {
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
      success('Email đã được xác minh thành công!', 3000)
      
      // Clear URL parameters
      const url = new URL(window.location)
      url.searchParams.delete('verified')
      url.searchParams.delete('reason')
      url.searchParams.delete('already')
      window.history.replaceState({}, '', url.toString())
      
      // Emit event và đóng modal sau 1.5s
      setTimeout(() => {
        emit('verified')
        handleClose()
      }, 1500)
      return
    }
    
    // Nếu không có trong URL, kiểm tra từ server hoặc localStorage
    const serverResult = await authService.checkEmailVerificationFromServer()
    
    if (serverResult.verified) {
      message.value = 'Email đã được xác minh thành công!'
      success('Email đã được xác minh thành công!', 3000)
      
      // Emit event và đóng modal sau 1.5s
      setTimeout(() => {
        emit('verified')
        handleClose()
      }, 1500)
    } else {
      // Xử lý các trường hợp lỗi khác nhau
      if (urlResult.reason === 'invalid_hash') {
        errorMsg.value = 'Liên kết xác minh không hợp lệ hoặc đã hết hạn. Vui lòng gửi lại email xác minh.'
      } else if (serverResult.method === 'server_error') {
        errorMsg.value = 'Không thể kết nối server để kiểm tra. Hãy đảm bảo bạn đã bấm link xác minh trong email và thử lại.'
      } else if (serverResult.method === 'no_token') {
        errorMsg.value = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        // Redirect về login sau 2s
        setTimeout(() => {
          emit('close')
          router.push('/login')
        }, 2000)
      } else {
        errorMsg.value = 'Email chưa được xác minh. Vui lòng kiểm tra hộp thư và bấm vào liên kết xác minh.'
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

const handleClose = () => {
  stopAutoCheck()
  emit('close')
}

const handleBackdropClick = (event) => {
  // Chỉ đóng khi click vào backdrop, không phải modal content
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

// Listen cho storage events từ tabs khác
const handleStorageChange = (event) => {
  if (event.key === 'email_verification_status') {
    try {
      const data = JSON.parse(event.newValue || '{}')
      if (data.verified && data.email === props.email) {
        message.value = 'Email đã được xác minh thành công!'
        success('Email đã được xác minh thành công!', 3000)
        
        stopAutoCheck()
        setTimeout(() => {
          emit('verified')
          handleClose()
        }, 1500)
      }
    } catch (error) {
      console.error('Error parsing storage event:', error)
    }
  }
}

// Auto check verification status
const startAutoCheck = () => {
  if (autoCheckInterval) {
    clearInterval(autoCheckInterval)
  }
  
  let checkCount = 0
  const maxChecks = 40 // 2 phút với interval 3 giây
  
  autoCheckInterval = setInterval(async () => {
    checkCount++
    
    // Dừng auto-check sau thời gian tối đa
    if (checkCount >= maxChecks) {
      stopAutoCheck()
      return
    }
    
    try {
      // Kiểm tra URL parameters trước
      const urlResult = authService.checkEmailVerificationStatus()
      
      if (urlResult.verified && urlResult.method === 'url_redirect') {
        message.value = 'Email đã được xác minh thành công!'
        success('Email đã được xác minh thành công!', 3000)
        
        // Clear URL parameters
        const url = new URL(window.location)
        url.searchParams.delete('verified')
        url.searchParams.delete('reason')
        url.searchParams.delete('already')
        window.history.replaceState({}, '', url.toString())
        
        stopAutoCheck()
        setTimeout(() => {
          emit('verified')
          handleClose()
        }, 1500)
        return
      }
      
      // Kiểm tra từ server mỗi 10 lần (30 giây) để tránh spam API
      // Chỉ check khi không có pending verification hoặc đã qua 30s
      if (checkCount % 10 === 0) {
        try {
          const serverResult = await authService.checkEmailVerificationFromServer()
          if (serverResult.verified) {
            message.value = 'Email đã được xác minh thành công!'
            success('Email đã được xác minh thành công!', 3000)
            
            stopAutoCheck()
            setTimeout(() => {
              emit('verified')
              handleClose()
            }, 1500)
          }
        } catch (error) {
          // Bỏ qua lỗi API trong auto-check
          console.log('Server check failed in auto-check:', error)
        }
      }
    } catch (error) {
      // Bỏ qua lỗi trong auto-check để không làm phiền người dùng
      console.log('Auto-check verification failed:', error)
    }
  }, 3000) // Kiểm tra mỗi 3 giây
}

const stopAutoCheck = () => {
  if (autoCheckInterval) {
    clearInterval(autoCheckInterval)
    autoCheckInterval = null
  }
}

// Watch props.show để bắt đầu/dừng auto-check
watch(() => props.show, (newValue) => {
  if (newValue) {
    // Add storage event listener
    window.addEventListener('storage', handleStorageChange)
    startAutoCheck()
  } else {
    // Remove storage event listener
    window.removeEventListener('storage', handleStorageChange)
    stopAutoCheck()
  }
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
  stopAutoCheck()
})
</script>

<style scoped>
@keyframes animate-fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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
  animation: animate-fade-in 0.4s ease-out;
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
</style>