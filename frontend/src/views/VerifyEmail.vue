<template>
  <div class="verify-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-md border border-gray-200">
        <div class="icon-wrap">
          <i class="fas fa-envelope-open-text"></i>
        </div>
        <h2>Xác minh email của bạn</h2>
        <p>
          Chúng tôi đã gửi một liên kết xác minh đến <strong>{{ userEmail }}</strong>.
          Vui lòng kiểm tra hộp thư đến (và mục Spam/Quảng cáo nếu không thấy).
        </p>

        <div v-if="message" class="p-4 rounded-lg border success">
          <i class="fas fa-check-circle"></i>
          {{ message }}
        </div>
        <div v-if="errorMsg" class="p-4 rounded-lg border error">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMsg }}
        </div>

        <div class="actions">
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 primary" :disabled="resending" @click="resend">
            <span v-if="resending" class="spinner"></span>
            {{ resending ? 'Đang gửi lại...' : 'Gửi lại email xác minh' }}
          </button>
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200" :disabled="checking" @click="checkNow">
            <span v-if="checking" class="spinner"></span>
            Tôi đã xác minh – Kiểm tra lại
          </button>
          <router-link class="link" to="/login">Quay lại đăng nhập</router-link>
        </div>

        <p class="hint">
          Mẹo: Mở email trên thiết bị này, bấm liên kết xác minh, sau đó quay lại trang này và nhấn "Tôi đã xác minh".
        </p>
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
    // Flow không đăng nhập: ta không gọi /auth/me.
    // Cơ chế xác nhận dựa vào redirect từ BE về /verify-email?verified=1
    const q = router.currentRoute.value.query
    if (q?.verified === '1') {
      success('Xác minh email thành công! Bạn có thể tiếp tục.', 2500)
      // Sau khi xác minh, có thể xoá email tạm
      localStorage.removeItem('pendingVerifyEmail')
      const redirect = q?.redirect || '/' // nếu FE có truyền redirect mục tiêu
      router.replace(redirect)
    } else {
      errorMsg.value = 'Chưa phát hiện trạng thái đã xác minh. Hãy mở email và bấm liên kết xác minh, sau đó quay lại trang này.'
      showError(errorMsg.value)
    }
  } finally {
    checking.value = false
  }
}

onMounted(() => {
  // Nếu quay lại cùng tham số verified=1 từ BE → hiển thị thành công và điều hướng
  const q = router.currentRoute.value.query
  if (q?.verified === '1') {
    message.value = 'Email của bạn đã được xác minh.'
    // Dọn email tạm vì đã verify xong
    localStorage.removeItem('pendingVerifyEmail')
    // Tuỳ ý: tự động chuyển hướng nhẹ nhàng
    setTimeout(() => {
      const redirect = q?.redirect || '/'
      router.replace(redirect)
    }, 1200)
  }
})
</script>


<style scoped>
.verify-page{min-height:100vh;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;padding:20px}
.container{max-width:700px;width:100%}
.card{background:#fff;border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.1);padding:36px;text-align:center}
.icon-wrap{width:68px;height:68px;border-radius:50%;background:#eef2ff;color:#4f46e5;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:28px}
h2{margin:6px 0 8px;font-size:24px;color:#1f2937}
p{color:#6b7280}
.actions{display:flex;flex-direction:column;gap:12px;margin:22px 0}
.btn{padding:12px 14px;border-radius:10px;border:2px solid #e5e7eb;background:#fff;color:#374151;cursor:pointer;font-weight:600}
.btn.primary{background:#3b82f6;border-color:#3b82f6;color:#fff}
.btn.primary:hover{background:#2563eb}
.btn:disabled{opacity:.7;cursor:not-allowed}
.link{color:#4f46e5;text-decoration:none}
.hint{font-size:13px;color:#6b7280}
.alert{margin-top:12px;padding:10px 12px;border-radius:10px;display:flex;gap:8px;align-items:center;justify-content:center;font-size:14px}
.alert.success{background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0}
.alert.error{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}
.spinner{width:16px;height:16px;border:2px solid transparent;border-top:2px solid #fff;border-radius:50%;display:inline-block;vertical-align:middle;animation:spin 1s linear infinite;margin-right:6px}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:640px){.card{padding:24px}}
</style>