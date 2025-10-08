<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- Page Header -->
    <section class="relative py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div class="absolute top-32 right-20 w-24 h-24 bg-blue-300/20 rounded-full animate-bounce"></div>
        <div class="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-300/20 rounded-full animate-pulse"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-white mb-4 animate-fade-in">Tài khoản của tôi</h1>
        <p class="text-xl text-white/90 animate-fade-in">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar Navigation -->
          <aside class="lg:col-span-1">
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 sticky top-8">
              <!-- User Info -->
              <div class="p-6 text-center border-b border-gray-100">
                <div class="relative inline-block">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1 mx-auto mb-4">
                    <img :src="userAvatar" :alt="user.name" class="w-full h-full rounded-full object-cover bg-white" />
                  </div>
                  <button 
                    @click="showAvatarUpload = true" 
                    class="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full border-2 border-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <i class="fas fa-camera text-xs"></i>
                  </button>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">{{ user.name }}</h3>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
              </div>

              <!-- Navigation -->
              <nav class="p-4">
                <button 
                  v-for="tab in profileTabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 mb-2',
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  <i :class="tab.icon" class="w-5"></i>
                  <span class="font-medium">{{ tab.label }}</span>
                </button>
              </nav>

              <!-- Logout -->
              <div class="p-4 border-t border-gray-100">
                <button 
                  @click="logout" 
                  class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-red-600 hover:bg-red-50"
                >
                  <i class="fas fa-sign-out-alt w-5"></i>
                  <span class="font-medium">Đăng xuất</span>
                </button>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="lg:col-span-3">
            <!-- Personal Information -->
            <div v-if="activeTab === 'personal'" class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                <h2 class="text-2xl font-bold text-white mb-2">Thông tin cá nhân</h2>
                <p class="text-white/90">Quản lý thông tin cá nhân của bạn</p>
              </div>

              <div class="p-8">
                <form @submit.prevent="updatePersonalInfo" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">Họ *</label>
                      <input 
                        type="text" 
                        id="firstName"
                        v-model="personalInfo.firstName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">Tên *</label>
                      <input 
                        type="text" 
                        id="lastName"
                        v-model="personalInfo.lastName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      v-model="personalInfo.email"
                      required
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                    <input 
                      type="tel" 
                      id="phone"
                      v-model="personalInfo.phone"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="birthDate" class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
                      <input 
                        type="date" 
                        id="birthDate"
                        v-model="personalInfo.birthDate"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label for="gender" class="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
                      <select 
                        id="gender" 
                        v-model="personalInfo.gender"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      :disabled="personalLoading" 
                      class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                    >
                      <span v-if="personalLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <i v-else class="fas fa-save"></i>
                      {{ personalLoading ? 'Đang lưu...' : 'Lưu thay đổi' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Address Management -->
            <div v-if="activeTab === 'addresses'" class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 flex justify-between items-center">
                <div>
                  <h2 class="text-2xl font-bold text-white mb-2">Địa chỉ giao hàng</h2>
                  <p class="text-white/90">Quản lý địa chỉ giao hàng của bạn</p>
                </div>
                <button 
                  @click="showAddressForm = true" 
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200"
                >
                  <i class="fas fa-plus"></i>
                  Thêm địa chỉ mới
                </button>
              </div>

              <div class="p-8 space-y-4">
                <div 
                  v-for="address in addresses" 
                  :key="address.id"
                  :class="[
                    'p-6 rounded-xl border-2 transition-all duration-200',
                    address.isDefault 
                      ? 'border-gradient-to-r from-blue-500 to-purple-500 bg-gradient-to-r from-blue-50 to-purple-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  ]"
                >
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-3">
                        <h4 class="font-semibold text-gray-900">{{ address.name }}</h4>
                        <div class="flex gap-2">
                          <span v-if="address.isDefault" class="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
                            Mặc định
                          </span>
                          <span v-if="address.type === 'home'" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Nhà riêng
                          </span>
                          <span v-if="address.type === 'office'" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Văn phòng
                          </span>
                        </div>
                      </div>
                      <p class="text-gray-600 mb-2 leading-relaxed">
                        {{ address.street }}, {{ address.ward }}, 
                        {{ address.district }}, {{ address.city }}
                      </p>
                      <p class="text-gray-500 text-sm">{{ address.phone }}</p>
                    </div>
                    <div class="flex gap-2 ml-4">
                      <button 
                        @click="editAddress(address)" 
                        class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        @click="setDefaultAddress(address)"
                        :disabled="address.isDefault"
                        class="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i class="fas fa-star"></i>
                      </button>
                      <button 
                        @click="deleteAddress(address)"
                        :disabled="address.isDefault"
                        class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Security Settings -->
            <div v-if="activeTab === 'security'" class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                <h2 class="text-2xl font-bold text-white mb-2">Bảo mật tài khoản</h2>
                <p class="text-white/90">Quản lý mật khẩu và cài đặt bảo mật</p>
              </div>

              <div class="p-8 space-y-8">
                <form @submit.prevent="changePassword" class="space-y-6">
                  <div>
                    <label for="currentPassword" class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu hiện tại *</label>
                    <div class="relative">
                      <input 
                        :type="showCurrentPassword ? 'text' : 'password'"
                        id="currentPassword"
                        v-model="passwordForm.currentPassword"
                        required
                        class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button 
                        type="button"
                        @click="showCurrentPassword = !showCurrentPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                      >
                        <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label for="newPassword" class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu mới *</label>
                    <div class="relative">
                      <input 
                        :type="showNewPassword ? 'text' : 'password'"
                        id="newPassword"
                        v-model="passwordForm.newPassword"
                        required
                        class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button 
                        type="button"
                        @click="showNewPassword = !showNewPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                      >
                        <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu mới *</label>
                    <div class="relative">
                      <input 
                        :type="showConfirmPassword ? 'text' : 'password'"
                        id="confirmPassword"
                        v-model="passwordForm.confirmPassword"
                        required
                        class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button 
                        type="button"
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                      >
                        <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                    </div>
                    <div v-if="passwordForm.confirmPassword && !passwordsMatch" class="mt-2 text-sm text-red-600">
                      <i class="fas fa-exclamation-triangle mr-1"></i>
                      Mật khẩu xác nhận không khớp
                    </div>
                  </div>

                  <div class="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      :disabled="passwordLoading || !passwordsMatch"
                      class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                    >
                      <span v-if="passwordLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <i v-else class="fas fa-key"></i>
                      {{ passwordLoading ? 'Đang cập nhật...' : 'Đổi mật khẩu' }}
                    </button>
                  </div>
                </form>

                <!-- Two-Factor Authentication -->
                <div class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">Xác thực hai yếu tố</h4>
                      <p class="text-sm text-gray-600">Tăng cường bảo mật tài khoản bằng xác thực hai yếu tố</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="securitySettings.twoFactorAuth"
                        @change="toggleTwoFactor"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div v-if="activeTab === 'notifications'" class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                <h2 class="text-2xl font-bold text-white mb-2">Thông báo</h2>
                <p class="text-white/90">Quản lý cài đặt thông báo</p>
              </div>

              <div class="p-8 space-y-4">
                <div 
                  v-for="setting in notificationSettings" 
                  :key="setting.key"
                  class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">{{ setting.title }}</h4>
                      <p class="text-sm text-gray-600">{{ setting.description }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-sm font-medium text-gray-700">Email</span>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          v-model="setting.email"
                          @change="updateNotificationSettings"
                          class="sr-only peer"
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- Address Form Modal -->
    <div v-if="showAddressForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="showAddressForm = false">
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full" @click.stop>
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-white">{{ editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới' }}</h3>
            <button @click="showAddressForm = false" class="p-1 text-white/80 hover:text-white transition-colors duration-200">
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="saveAddress" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Họ tên *</label>
            <input 
              type="text" 
              v-model="addressForm.name" 
              required 
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
            <input 
              type="tel" 
              v-model="addressForm.phone" 
              required 
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ chi tiết *</label>
            <input 
              type="text" 
              v-model="addressForm.street" 
              required 
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div class="flex gap-3 pt-4">
            <button 
              type="button" 
              @click="showAddressForm = false" 
              class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
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
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
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
</style>