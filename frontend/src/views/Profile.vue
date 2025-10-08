<template>
  <div class="profile-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Tài khoản của tôi</h1>
        <p>Quản lý thông tin cá nhân và cài đặt tài khoản</p>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="profile-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="profile-layout">
          <!-- Sidebar Navigation -->
          <aside class="profile-sidebar">
            <div class="user-info">
              <div class="avatar">
                <img :src="userAvatar" :alt="user.name" />
                <button @click="showAvatarUpload = true" class="avatar-edit">
                  <i class="fas fa-camera"></i>
                </button>
              </div>
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
            </div>

            <nav class="profile-nav">
              <button 
                v-for="tab in profileTabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="{ active: activeTab === tab.id }"
                class="nav-item"
              >
                <i :class="tab.icon"></i>
                <span>{{ tab.label }}</span>
              </button>
            </nav>

            <div class="logout-section">
              <button @click="logout" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Đăng xuất
              </button>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="profile-main">
            <!-- Personal Information -->
            <div v-if="activeTab === 'personal'" class="profile-content">
              <div class="content-header">
                <h2>Thông tin cá nhân</h2>
                <p>Quản lý thông tin cá nhân của bạn</p>
              </div>

              <form @submit.prevent="updatePersonalInfo" class="profile-form">
                <div class="form-row">
                  <div class="mb-4">
                    <label for="firstName">Họ *</label>
                    <input 
                      type="text" 
                      id="firstName"
                      v-model="personalInfo.firstName"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label for="lastName">Tên *</label>
                    <input 
                      type="text" 
                      id="lastName"
                      v-model="personalInfo.lastName"
                      required
                    />
                  </div>
                </div>

                <div class="mb-4">
                  <label for="email">Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    v-model="personalInfo.email"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label for="phone">Số điện thoại</label>
                  <input 
                    type="tel" 
                    id="phone"
                    v-model="personalInfo.phone"
                  />
                </div>

                <div class="form-row">
                  <div class="mb-4">
                    <label for="birthDate">Ngày sinh</label>
                    <input 
                      type="date" 
                      id="birthDate"
                      v-model="personalInfo.birthDate"
                    />
                  </div>
                  <div class="mb-4">
                    <label for="gender">Giới tính</label>
                    <select id="gender" v-model="personalInfo.gender">
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" :disabled="personalLoading" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
                    <span v-if="personalLoading" class="loading-spinner"></span>
                    {{ personalLoading ? 'Đang lưu...' : 'Lưu thay đổi' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Address Management -->
            <div v-if="activeTab === 'addresses'" class="profile-content">
              <div class="content-header">
                <h2>Địa chỉ giao hàng</h2>
                <p>Quản lý địa chỉ giao hàng của bạn</p>
                <button @click="showAddressForm = true" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 btn-outline">
                  <i class="fas fa-plus"></i>
                  Thêm địa chỉ mới
                </button>
              </div>

              <div class="addresses-list">
                <div 
                  v-for="address in addresses" 
                  :key="address.id"
                  class="address-card"
                  :class="{ default: address.isDefault }"
                >
                  <div class="address-info">
                    <div class="address-header">
                      <h4>{{ address.name }}</h4>
                      <div class="address-badges">
                        <span v-if="address.isDefault" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium default-badge">
                          Mặc định
                        </span>
                        <span v-if="address.type === 'home'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium type-badge">
                          Nhà riêng
                        </span>
                        <span v-if="address.type === 'office'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium type-badge">
                          Văn phòng
                        </span>
                      </div>
                    </div>
                    <p class="address-details">
                      {{ address.street }}, {{ address.ward }}, 
                      {{ address.district }}, {{ address.city }}
                    </p>
                    <p class="address-phone">{{ address.phone }}</p>
                  </div>
                  <div class="address-actions">
                    <button @click="editAddress(address)" class="action-btn">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      @click="setDefaultAddress(address)"
                      :disabled="address.isDefault"
                      class="action-btn"
                    >
                      <i class="fas fa-star"></i>
                    </button>
                    <button 
                      @click="deleteAddress(address)"
                      :disabled="address.isDefault"
                      class="action-btn delete"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Security Settings -->
            <div v-if="activeTab === 'security'" class="profile-content">
              <div class="content-header">
                <h2>Bảo mật tài khoản</h2>
                <p>Quản lý mật khẩu và cài đặt bảo mật</p>
              </div>

              <form @submit.prevent="changePassword" class="profile-form">
                <div class="mb-4">
                  <label for="currentPassword">Mật khẩu hiện tại *</label>
                  <div class="password-input">
                    <input 
                      :type="showCurrentPassword ? 'text' : 'password'"
                      id="currentPassword"
                      v-model="passwordForm.currentPassword"
                      required
                    />
                    <button 
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="password-toggle"
                    >
                      <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="newPassword">Mật khẩu mới *</label>
                  <div class="password-input">
                    <input 
                      :type="showNewPassword ? 'text' : 'password'"
                      id="newPassword"
                      v-model="passwordForm.newPassword"
                      required
                    />
                    <button 
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="password-toggle"
                    >
                      <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="confirmPassword">Xác nhận mật khẩu mới *</label>
                  <div class="password-input">
                    <input 
                      :type="showConfirmPassword ? 'text' : 'password'"
                      id="confirmPassword"
                      v-model="passwordForm.confirmPassword"
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
                  <div v-if="passwordForm.confirmPassword && !passwordsMatch" class="error-message">
                    Mật khẩu xác nhận không khớp
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="passwordLoading || !passwordsMatch"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <span v-if="passwordLoading" class="loading-spinner"></span>
                    {{ passwordLoading ? 'Đang cập nhật...' : 'Đổi mật khẩu' }}
                  </button>
                </div>
              </form>

              <!-- Two-Factor Authentication -->
              <div class="security-option">
                <div class="option-info">
                  <h4>Xác thực hai yếu tố</h4>
                  <p>Tăng cường bảo mật tài khoản bằng xác thực hai yếu tố</p>
                </div>
                <div class="option-action">
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      v-model="securitySettings.twoFactorAuth"
                      @change="toggleTwoFactor"
                    />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div v-if="activeTab === 'notifications'" class="profile-content">
              <div class="content-header">
                <h2>Thông báo</h2>
                <p>Quản lý cài đặt thông báo</p>
              </div>

              <div class="notifications-settings">
                <div 
                  v-for="setting in notificationSettings" 
                  :key="setting.key"
                  class="notification-item"
                >
                  <div class="notification-info">
                    <h4>{{ setting.title }}</h4>
                    <p>{{ setting.description }}</p>
                  </div>
                  <div class="notification-controls">
                    <label class="toggle-switch">
                      <input 
                        type="checkbox" 
                        v-model="setting.email"
                        @change="updateNotificationSettings"
                      />
                      <span class="slider"></span>
                    </label>
                    <span class="control-label">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- Address Form Modal -->
    <div v-if="showAddressForm" class="modal-overlay" @click="showAddressForm = false">
      <div class="bg-white rounded-lg shadow-xl" @click.stop>
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3>{{ editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới' }}</h3>
          <button @click="showAddressForm = false" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="saveAddress" class="modal-form">
          <!-- Address form content -->
          <div class="mb-4">
            <label>Họ tên *</label>
            <input type="text" v-model="addressForm.name" required />
          </div>
          
          <div class="mb-4">
            <label>Số điện thoại *</label>
            <input type="tel" v-model="addressForm.phone" required />
          </div>
          
          <div class="mb-4">
            <label>Địa chỉ chi tiết *</label>
            <input type="text" v-model="addressForm.street" required />
          </div>
          
          <div class="form-actions">
            <button type="button" @click="showAddressForm = false" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-gray-600 hover:bg-gray-700 text-white">
              Hủy
            </button>
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
              {{ editingAddress ? 'Cập nhật' : 'Thêm địa chỉ' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const activeTab = ref('personal')
const personalLoading = ref(false)
const passwordLoading = ref(false)
const showAddressForm = ref(false)
const showAvatarUpload = ref(false)
const editingAddress = ref(null)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const user = ref({
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'user@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
})

const personalInfo = ref({
  firstName: 'Nguyễn',
  lastName: 'Văn A',
  email: 'user@example.com',
  phone: '0123456789',
  birthDate: '1990-01-01',
  gender: 'male'
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const addresses = ref([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    street: '123 Đường ABC',
    ward: 'Phường 1',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    type: 'home',
    isDefault: true
  }
])

const addressForm = ref({
  name: '',
  phone: '',
  street: '',
  ward: '',
  district: '',
  city: '',
  type: 'home',
  isDefault: false
})

const securitySettings = ref({
  twoFactorAuth: false
})

const notificationSettings = ref([
  {
    key: 'order_updates',
    title: 'Cập nhật đơn hàng',
    description: 'Thông báo về trạng thái đơn hàng, giao hàng',
    email: true
  },
  {
    key: 'promotions',
    title: 'Khuyến mãi & Ưu đãi',
    description: 'Thông báo về chương trình khuyến mãi, giảm giá',
    email: true
  },
  {
    key: 'new_products',
    title: 'Sản phẩm mới',
    description: 'Thông báo về sản phẩm mới, bộ sưu tập mới',
    email: false
  }
])

const profileTabs = [
  { id: 'personal', label: 'Thông tin cá nhân', icon: 'fas fa-user' },
  { id: 'addresses', label: 'Địa chỉ giao hàng', icon: 'fas fa-map-marker-alt' },
  { id: 'security', label: 'Bảo mật', icon: 'fas fa-shield-alt' },
  { id: 'notifications', label: 'Thông báo', icon: 'fas fa-bell' }
]

// Computed
const userAvatar = computed(() => {
  return user.value.avatar || 'https://via.placeholder.com/150'
})

const passwordsMatch = computed(() => {
  return passwordForm.value.newPassword === passwordForm.value.confirmPassword
})

// Methods
const updatePersonalInfo = async () => {
  personalLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    user.value.name = `${personalInfo.value.firstName} ${personalInfo.value.lastName}`
    user.value.email = personalInfo.value.email
    
    alert('Cập nhật thông tin thành công!')
  } catch (error) {
    alert('Cập nhật thông tin thất bại!')
  } finally {
    personalLoading.value = false
  }
}

const changePassword = async () => {
  passwordLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    alert('Đổi mật khẩu thành công!')
  } catch (error) {
    alert('Đổi mật khẩu thất bại!')
  } finally {
    passwordLoading.value = false
  }
}

const editAddress = (address) => {
  editingAddress.value = address
  addressForm.value = { ...address }
  showAddressForm.value = true
}

const saveAddress = () => {
  if (editingAddress.value) {
    // Update existing address
    const index = addresses.value.findIndex(a => a.id === editingAddress.value.id)
    addresses.value[index] = { ...addressForm.value }
    editingAddress.value = null
  } else {
    // Add new address
    const newAddress = {
      ...addressForm.value,
      id: Date.now()
    }
    addresses.value.push(newAddress)
  }
  
  showAddressForm.value = false
  addressForm.value = {
    name: '',
    phone: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    type: 'home',
    isDefault: false
  }
  
  alert('Lưu địa chỉ thành công!')
}

const setDefaultAddress = (address) => {
  addresses.value.forEach(a => {
    a.isDefault = a.id === address.id
  })
  alert('Đã đặt làm địa chỉ mặc định!')
}

const deleteAddress = (address) => {
  if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
    const index = addresses.value.findIndex(a => a.id === address.id)
    addresses.value.splice(index, 1)
    alert('Xóa địa chỉ thành công!')
  }
}

const toggleTwoFactor = () => {
  alert(`Xác thực hai yếu tố đã được ${securitySettings.value.twoFactorAuth ? 'bật' : 'tắt'}`)
}

const updateNotificationSettings = () => {
  alert('Cập nhật cài đặt thông báo thành công!')
}

const logout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }
}

// Load data on mount
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    const userData = JSON.parse(savedUser)
    user.value = userData
    personalInfo.value.email = userData.email
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.profile-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
}

.profile-sidebar {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e74c3c;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: #e74c3c;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.profile-nav {
  margin-bottom: 30px;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
  color: #666;
}

.nav-item:hover,
.nav-item.active {
  background: #e74c3c;
  color: white;
}

.nav-item i {
  width: 20px;
  font-size: 16px;
}

.logout-section {
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  color: #dc3545;
}

.logout-btn:hover {
  background: #dc3545;
  color: white;
}

.profile-main {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.profile-content {
  padding: 40px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.content-header h2 {
  margin: 0 0 8px 0;
  color: #333;
}

.content-header p {
  margin: 0;
  color: #666;
}

.profile-form {
  max-width: 600px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #e74c3c;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
}

.password-toggle:hover {
  color: #666;
}

.error-message {
  margin-top: 5px;
  color: #dc3545;
  font-size: 14px;
}

.form-actions {
  margin-top: 30px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #e74c3c;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #c0392b;
}

.btn-outline {
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.btn-outline:hover {
  background: #e74c3c;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.addresses-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.address-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  transition: border-color 0.3s ease;
}

.address-card.default {
  border-color: #e74c3c;
  background: #fef7f7;
}

.address-info {
  flex: 1;
}

.address-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
}

.address-header h4 {
  margin: 0;
  color: #333;
}

.address-badges {
  display: flex;
  gap: 8px;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.default-badge {
  background: #e74c3c;
  color: white;
}

.type-badge {
  background: #f8f9fa;
  color: #666;
}

.address-details {
  margin: 5px 0;
  color: #666;
  line-height: 1.5;
}

.address-phone {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.address-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn:hover:not(:disabled) {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.action-btn.delete:hover:not(:disabled) {
  background: #dc3545;
  border-color: #dc3545;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.security-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 30px;
}

.option-info h4 {
  margin: 0 0 5px 0;
  color: #333;
}

.option-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #e74c3c;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.notifications-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
}

.notification-info h4 {
  margin: 0 0 5px 0;
  color: #333;
}

.notification-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.notification-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-label {
  font-size: 14px;
  color: #666;
  min-width: 40px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 0;
  border-radius: 15px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 5px;
}

.close-btn:hover {
  color: #666;
}

.modal-form {
  padding: 30px;
}

@media (max-width: 1024px) {
  .profile-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .profile-sidebar {
    position: static;
    order: -1;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .profile-content {
    padding: 25px;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .address-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .address-actions {
    align-self: flex-end;
  }
  
  .security-option,
  .notification-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .notification-controls {
    align-self: flex-end;
  }
}
</style>