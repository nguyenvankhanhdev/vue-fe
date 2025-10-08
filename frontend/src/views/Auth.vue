<template>
  <div class="auth-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="auth-container">
        <div class="auth-wrapper">
          <!-- Left Side - Form -->
          <div class="auth-form-section">
            <div class="auth-header">
              <router-link to="/" class="logo">
                <h2>VueShop</h2>
              </router-link>
              <div class="auth-tabs">
                <button 
                  @click="activeTab = 'login'"
                  :class="{ active: activeTab === 'login' }"
                  class="tab-btn"
                >
                  Đăng nhập
                </button>
                <button 
                  @click="activeTab = 'register'"
                  :class="{ active: activeTab === 'register' }"
                  class="tab-btn"
                >
                  Đăng ký
                </button>
              </div>
            </div>

            <!-- Login Form -->
            <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
              <h3>Chào mừng trở lại!</h3>
              <p class="form-subtitle">Đăng nhập vào tài khoản của bạn</p>

              <div class="mb-4">
                <label for="loginEmail">Email</label>
                <div class="input-group">
                  <i class="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    id="loginEmail"
                    v-model="loginForm.email"
                    placeholder="Nhập địa chỉ email"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label for="loginPassword">Mật khẩu</label>
                <div class="input-group">
                  <i class="fas fa-lock"></i>
                  <input 
                    :type="showLoginPassword ? 'text' : 'password'"
                    id="loginPassword"
                    v-model="loginForm.password"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button 
                    type="button"
                    @click="showLoginPassword = !showLoginPassword"
                    class="password-toggle"
                  >
                    <i :class="showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="loginForm.rememberMe" />
                  <span class="checkmark"></span>
                  Ghi nhớ đăng nhập
                </label>
                <router-link to="/forgot-password" class="forgot-link">
                  Quên mật khẩu?
                </router-link>
              </div>

              <button type="submit" :disabled="loginLoading" class="auth-btn">
                <span v-if="loginLoading" class="loading-spinner"></span>
                {{ loginLoading ? 'Đang xử lý...' : 'Đăng nhập' }}
              </button>

              <div class="social-login">
                <div class="divider">
                  <span>Hoặc đăng nhập với</span>
                </div>
                <div class="social-buttons">
                  <button type="button" @click="loginWithGoogle" class="social-btn google">
                    <i class="fab fa-google"></i>
                    Google
                  </button>
                  <button type="button" @click="loginWithFacebook" class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                    Facebook
                  </button>
                </div>
              </div>
            </form>

            <!-- Register Form -->
            <form v-else @submit.prevent="handleRegister" class="auth-form">
              <h3>Tạo tài khoản mới</h3>
              <p class="form-subtitle">Đăng ký để bắt đầu mua sắm</p>

              <div class="form-row">
                <div class="mb-4">
                  <label for="registerFirstName">Họ</label>
                  <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input 
                      type="text" 
                      id="registerFirstName"
                      v-model="registerForm.firstName"
                      placeholder="Nhập họ"
                      required
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <label for="registerLastName">Tên</label>
                  <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input 
                      type="text" 
                      id="registerLastName"
                      v-model="registerForm.lastName"
                      placeholder="Nhập tên"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label for="registerEmail">Email</label>
                <div class="input-group">
                  <i class="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    id="registerEmail"
                    v-model="registerForm.email"
                    placeholder="Nhập địa chỉ email"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label for="registerPhone">Số điện thoại</label>
                <div class="input-group">
                  <i class="fas fa-phone"></i>
                  <input 
                    type="tel" 
                    id="registerPhone"
                    v-model="registerForm.phone"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label for="registerPassword">Mật khẩu</label>
                <div class="input-group">
                  <i class="fas fa-lock"></i>
                  <input 
                    :type="showRegisterPassword ? 'text' : 'password'"
                    id="registerPassword"
                    v-model="registerForm.password"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button 
                    type="button"
                    @click="showRegisterPassword = !showRegisterPassword"
                    class="password-toggle"
                  >
                    <i :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="password-strength">
                  <div class="strength-bar">
                    <div 
                      class="strength-fill"
                      :class="passwordStrengthClass"
                      :style="{ width: passwordStrengthWidth }"
                    ></div>
                  </div>
                  <span class="strength-text">{{ passwordStrengthText }}</span>
                </div>
              </div>

              <div class="mb-4">
                <label for="registerConfirmPassword">Xác nhận mật khẩu</label>
                <div class="input-group">
                  <i class="fas fa-lock"></i>
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="registerConfirmPassword"
                    v-model="registerForm.confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                  <button 
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="password-toggle"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div v-if="registerForm.confirmPassword && !passwordsMatch" class="error-message">
                  Mật khẩu xác nhận không khớp
                </div>
              </div>

              <div class="mb-4">
  <label class="checkbox-label">
    <input class="checkbox" type="checkbox" v-model="registerForm.agreeToTerms" required>
    <span class="checkbox-text">
      Tôi đồng ý với
      <router-link to="/terms" class="link">Điều khoản sử dụng</router-link>
      và
      <router-link to="/privacy" class="link">Chính sách bảo mật</router-link>
    </span>
  </label>
</div>

<div class="mb-4">
  <label class="checkbox-label">
    <input class="checkbox" type="checkbox" v-model="registerForm.subscribeNewsletter">
    <span class="checkbox-text">
      Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt
    </span>
  </label>
</div>


              <button type="submit" :disabled="registerLoading || !isFormValid" class="auth-btn">
                <span v-if="registerLoading" class="loading-spinner"></span>
                {{ registerLoading ? 'Đang xử lý...' : 'Đăng ký' }}
              </button>

              <div class="social-login">
                <div class="divider">
                  <span>Hoặc đăng ký với</span>
                </div>
                <div class="social-buttons">
                  <button type="button" @click="registerWithGoogle" class="social-btn google">
                    <i class="fab fa-google"></i>
                    Google
                  </button>
                  <button type="button" @click="registerWithFacebook" class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                    Facebook
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Right Side - Image -->
          <div class="auth-image-section">
            <div class="image-content">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600" alt="Shopping" />
              <div class="image-overlay">
                <h2>Khám phá thế giới mua sắm</h2>
                <p>Tìm kiếm những sản phẩm chất lượng với giá cả phải chăng. Trải nghiệm mua sắm tuyệt vời cùng VueShop.</p>
                <div class="features-list">
                  <div class="feature">
                    <i class="fas fa-shipping-fast"></i>
                    <span>Giao hàng miễn phí</span>
                  </div>
                  <div class="feature">
                    <i class="fas fa-shield-alt"></i>
                    <span>Thanh toán bảo mật</span>
                  </div>
                  <div class="feature">
                    <i class="fas fa-undo-alt"></i>
                    <span>Đổi trả dễ dàng</span>
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const activeTab = ref('login')
const loginLoading = ref(false)
const registerLoading = ref(false)
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  subscribeNewsletter: false
})

// Computed properties
const passwordsMatch = computed(() => {
  return registerForm.value.password === registerForm.value.confirmPassword
})

const passwordStrength = computed(() => {
  const password = registerForm.value.password
  if (!password) return 0
  
  let strength = 0
  
  // Length check
  if (password.length >= 8) strength += 25
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 25
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 25
  
  // Contains number or symbol
  if (/[\d\W]/.test(password)) strength += 25
  
  return strength
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength < 25) return 'weak'
  if (strength < 50) return 'fair'
  if (strength < 75) return 'good'
  return 'strong'
})

const passwordStrengthWidth = computed(() => {
  return `${passwordStrength.value}%`
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength < 25) return 'Yếu'
  if (strength < 50) return 'Trung bình'
  if (strength < 75) return 'Tốt'
  return 'Mạnh'
})

const isFormValid = computed(() => {
  return registerForm.value.firstName &&
         registerForm.value.lastName &&
         registerForm.value.email &&
         registerForm.value.phone &&
         registerForm.value.password &&
         registerForm.value.confirmPassword &&
         passwordsMatch.value &&
         registerForm.value.agreeToTerms &&
         passwordStrength.value >= 50
})

// Methods
const handleLogin = async () => {
  loginLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock authentication
    console.log('Login:', loginForm.value)
    
    // Store user data
    const userData = {
      id: 1,
      email: loginForm.value.email,
      name: 'Người dùng',
      token: 'mock-jwt-token'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userData.token)
    
    alert('Đăng nhập thành công!')
    
    // Redirect to home or previous page
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
    
  } catch (error) {
    console.error('Login error:', error)
    alert('Đăng nhập thất bại. Vui lòng thử lại!')
  } finally {
    loginLoading.value = false
  }
}

const handleRegister = async () => {
  registerLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock registration
    console.log('Register:', registerForm.value)
    
    alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.')
    
    // Switch to login tab
    activeTab.value = 'login'
    
    // Pre-fill login email
    loginForm.value.email = registerForm.value.email
    
  } catch (error) {
    console.error('Register error:', error)
    alert('Đăng ký thất bại. Vui lòng thử lại!')
  } finally {
    registerLoading.value = false
  }
}

const loginWithGoogle = () => {
  console.log('Login with Google')
  alert('Đăng nhập với Google (chức năng demo)')
}

const loginWithFacebook = () => {
  console.log('Login with Facebook')
  alert('Đăng nhập với Facebook (chức năng demo)')
}

const registerWithGoogle = () => {
  console.log('Register with Google')
  alert('Đăng ký với Google (chức năng demo)')
}

const registerWithFacebook = () => {
  console.log('Register with Facebook')
  alert('Đăng ký với Facebook (chức năng demo)')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
}

.auth-wrapper {
  display: grid;
  grid-template-columns: 500px 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  min-height: 700px;
}

.auth-form-section {
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.auth-header {
  margin-bottom: 40px;
}

.logo h2 {
  color: #e74c3c;
  margin: 0 0 30px 0;
  font-size: 2rem;
  text-decoration: none;
}

.logo {
  text-decoration: none;
}

.auth-tabs {
  display: flex;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 4px;
}

.tab-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: #e74c3c;
  color: white;
}

.auth-form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.auth-form h3 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: #333;
}

.form-subtitle {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group i {
  position: absolute;
  left: 15px;
  color: #999;
  z-index: 1;
}

.input-group input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  outline: none;
}

.input-group input:focus {
  border-color: #e74c3c;
}

.password-toggle {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
  z-index: 1;
}

.password-toggle:hover {
  color: #666;
}

.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #e1e5e9;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background: #dc3545;
}

.strength-fill.fair {
  background: #ffc107;
}

.strength-fill.good {
  background: #17a2b8;
}

.strength-fill.strong {
  background: #28a745;
}

.strength-text {
  font-size: 12px;
  font-weight: 600;
  min-width: 60px;
}

.error-message {
  margin-top: 5px;
  color: #dc3545;
  font-size: 14px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

/* đừng ẩn checkbox nữa */
.checkbox-label { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
.checkbox-label input[type="checkbox"] { display: inline-block; } /* quan trọng: ghi đè rule cũ */

.checkbox {
  width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;
  accent-color: #e74c3c;          /* màu dấu tích */
  border-radius: 4px;              /* bo góc đẹp hơn trên trình duyệt hỗ trợ */
}

.checkbox:focus-visible {
  outline: 3px solid rgba(231,76,60,.25);
  outline-offset: 2px;
}

.checkbox-text { line-height: 1.6; }   /* giữ nội dung liền mạch, không vỡ chữ */

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #e74c3c;
  border-color: #e74c3c;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  color: #e74c3c;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

.link {
  color: #e74c3c;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.auth-btn {
  width: 100%;
  padding: 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
}

.auth-btn:hover:not(:disabled) {
  background: #c0392b;
  transform: translateY(-2px);
}

.auth-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.social-login {
  margin-top: auto;
}

.divider {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e9;
}

.divider span {
  background: white;
  padding: 0 15px;
  color: #666;
  font-size: 14px;
}

.social-buttons {
  display: flex;
  gap: 10px;
}

.social-btn {
  flex: 1;
  padding: 12px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-2px);
}

.social-btn.google {
  color: #db4437;
}

.social-btn.google:hover {
  background: #db4437;
  color: white;
  border-color: #db4437;
}

.social-btn.facebook {
  color: #4267B2;
}

.social-btn.facebook:hover {
  background: #4267B2;
  color: white;
  border-color: #4267B2;
}

.auth-image-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.image-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  color: white;
}

.image-overlay h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.image-overlay p {
  font-size: 1.1rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;
}

.features-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature i {
  font-size: 20px;
  color: #ffd700;
}

.feature span {
  font-weight: 500;
}

@media (max-width: 1024px) {
  .auth-wrapper {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .auth-image-section {
    display: none;
  }
}

@media (max-width: 768px) {
  .auth-page {
    padding: 10px;
  }
  
  .auth-form-section {
    padding: 30px 25px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .social-buttons {
    flex-direction: column;
  }
  
  .image-overlay h2 {
    font-size: 2rem;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>