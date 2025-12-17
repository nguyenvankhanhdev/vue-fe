<template>
  <!-- Top Bar -->
  <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-1.5 hidden lg:block">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between text-xs">
        <div class="flex items-center space-x-6">
          <a href="tel:+84123456789" class="flex items-center space-x-2 hover:text-blue-200 transition-colors">
            <i class="fas fa-phone-alt"></i>
            <span>Hotline: 0123 456 789</span>
          </a>
          <a href="mailto:support@vueshop.vn" class="flex items-center space-x-2 hover:text-blue-200 transition-colors">
            <i class="fas fa-envelope"></i>
            <span>support@vueshop.vn</span>
          </a>
        </div>
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-2">
            <i class="fas fa-truck"></i>
            <span>Miễn phí vận chuyển đơn từ 500K</span>
          </div>
          <div class="flex items-center space-x-3">
            <a href="#" class="hover:text-blue-200 transition-colors">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="hover:text-blue-200 transition-colors">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="hover:text-blue-200 transition-colors">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Header -->
  <header 
    class="bg-white shadow-md sticky top-0 z-50 transition-all duration-300"
    :class="{ 'shadow-xl': isScrolled }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-3 lg:py-3.5">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2.5 group">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <i class="fas fa-store text-white text-lg"></i>
            </div>
            <div class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VueShop
            </h1>
            <p class="text-xs text-gray-500 font-medium -mt-0.5">Điện thoại chính hãng</p>
          </div>
        </router-link>

        <!-- Search Bar - Desktop -->
        <div class="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div class="relative w-full group">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-400 group-focus-within:text-blue-600 transition-colors text-sm"></i>
            </div>
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              class="w-full pl-10 pr-24 py-2.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 hover:border-blue-400" 
              placeholder="Tìm kiếm iPhone, Samsung, Oppo..."
            />
            <button 
              @click="handleSearch" 
              class="absolute inset-y-0 right-1 flex items-center"
            >
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-full transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg">
                <i class="fas fa-search mr-1"></i>
                Tìm kiếm
              </div>
            </button>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-2 lg:space-x-3">
          <!-- Hotline - Desktop -->
          <a href="tel:+84123456789" class="hidden xl:flex items-center space-x-2 px-2.5 py-1.5 hover:bg-gray-50 rounded-lg transition-colors group">
            <div class="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <i class="fas fa-phone-alt text-red-500 text-sm"></i>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-medium leading-tight">Hotline</p>
              <p class="text-sm font-bold text-gray-800 leading-tight">0123.456.789</p>
            </div>
          </a>

          <!-- Cart -->
          <router-link 
            to="/cart" 
            class="relative group p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200"
          >
            <i class="fas fa-shopping-cart text-lg text-gray-700 group-hover:text-blue-600 transition-colors"></i>
            <span 
              v-if="cartCount > 0" 
              class="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-bounce"
            >
              {{ cartCount > 99 ? '99+' : cartCount }}
            </span>
            <span class="hidden lg:block absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Giỏ hàng
            </span>
          </router-link>

          <!-- User Menu / Auth -->
          <div v-if="!isLoggedIn" class="hidden lg:flex items-center space-x-2">
            <router-link 
              to="/login" 
              class="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-300"
            >
              <i class="fas fa-sign-in-alt mr-1.5 text-xs"></i>
              Đăng nhập
            </router-link>
            <router-link 
              to="/register" 
              class="px-3.5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <i class="fas fa-user-plus mr-1.5 text-xs"></i>
              Đăng ký
            </router-link>
          </div>

          <!-- User Dropdown -->
          <div v-if="isLoggedIn" class="relative">
            <button 
              ref="userMenuBtn"
              @click="toggleUserMenu" 
              class="flex items-center space-x-2 px-2.5 py-1.5 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              :class="{ 'bg-blue-50': showUserMenu }"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <i class="fas fa-user text-white text-xs"></i>
              </div>
              <div class="hidden lg:block text-left">
                <p class="text-xs text-gray-500 font-medium leading-tight">Xin chào</p>
                <p class="text-sm font-bold text-gray-800 leading-tight">{{ userName || 'User' }}</p>
              </div>
              <i class="fas fa-chevron-down text-xs text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }"></i>
            </button>

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div 
                v-if="showUserMenu" 
                ref="userMenu" 
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
              >
                <div class="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                  <p class="text-sm font-bold text-gray-800">{{ userName || 'User' }}</p>
                  <p class="text-xs text-gray-500">{{ currentUser?.email }}</p>
                </div>
                
                <router-link 
                  to="/profile" 
                  @click="showUserMenu = false" 
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                >
                  <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                    <i class="fas fa-user text-blue-600"></i>
                  </div>
                  <span class="font-medium">Tài khoản của tôi</span>
                </router-link>
                
                <router-link 
                  to="/orders" 
                  @click="showUserMenu = false" 
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group"
                >
                  <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                    <i class="fas fa-shopping-bag text-purple-600"></i>
                  </div>
                  <span class="font-medium">Đơn hàng của tôi</span>
                </router-link>
                
                <router-link 
                  v-if="currentUser?.role === 'admin'" 
                  to="/admin" 
                  @click="showUserMenu = false" 
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                >
                  <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                    <i class="fas fa-cogs text-green-600"></i>
                  </div>
                  <span class="font-medium">Quản trị hệ thống</span>
                </router-link>
                
                <hr class="my-2 border-gray-100">
                
                <button 
                  @click="logout" 
                  class="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                >
                  <div class="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                    <i class="fas fa-sign-out-alt text-red-600"></i>
                  </div>
                  <span class="font-medium">Đăng xuất</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i class="fas text-lg" :class="showMobileMenu ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>
      </div>

      <!-- Navigation Bar - Desktop -->
      <nav class="hidden lg:block border-t border-gray-100">
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center space-x-1">
            <router-link 
              to="/" 
              class="group flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
            >
              <i class="fas fa-home mr-2 text-sm group-hover:scale-110 transition-transform"></i>
              Trang chủ
            </router-link>
            
            <router-link 
              to="/products" 
              class="group flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-purple-50"
              active-class="text-purple-600 bg-purple-50"
            >
              <i class="fas fa-mobile-alt mr-2 text-sm group-hover:scale-110 transition-transform"></i>
              Sản phẩm
            </router-link>
            
            <router-link 
              to="/categories" 
              class="group flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-green-50"
              active-class="text-green-600 bg-green-50"
            >
              <i class="fas fa-th-large mr-2 text-sm group-hover:scale-110 transition-transform"></i>
              Danh mục
            </router-link>
            
            <router-link 
              to="/contact" 
              class="group flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-orange-50"
              active-class="text-orange-600 bg-orange-50"
            >
              <i class="fas fa-envelope mr-2 text-sm group-hover:scale-110 transition-transform"></i>
              Liên hệ
            </router-link>
          </div>

          <!-- Promotional Banner -->
          <div class="flex items-center space-x-2 text-sm">
            <div class="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-pink-50 px-4 py-1.5 rounded-full">
              <i class="fas fa-fire text-red-500 animate-pulse"></i>
              <span class="font-bold text-red-600">HOT SALE</span>
              <span class="text-gray-600">Giảm đến 50%</span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="showMobileMenu" class="lg:hidden border-t border-gray-200 bg-white">
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <!-- Mobile Search -->
          <div class="relative">
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              class="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 bg-white placeholder-gray-400" 
              placeholder="Tìm kiếm sản phẩm..."
            />
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <!-- Mobile Navigation -->
          <div class="space-y-1">
            <router-link 
              to="/" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-semibold transition-all duration-200"
              active-class="bg-blue-50 text-blue-600"
            >
              <i class="fas fa-home w-5 mr-3"></i>
              Trang chủ
            </router-link>
            
            <router-link 
              to="/products" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl font-semibold transition-all duration-200"
              active-class="bg-purple-50 text-purple-600"
            >
              <i class="fas fa-mobile-alt w-5 mr-3"></i>
              Sản phẩm
            </router-link>
            
            <router-link 
              to="/categories" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl font-semibold transition-all duration-200"
              active-class="bg-green-50 text-green-600"
            >
              <i class="fas fa-th-large w-5 mr-3"></i>
              Danh mục
            </router-link>
            
            <router-link 
              to="/contact" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-semibold transition-all duration-200"
              active-class="bg-orange-50 text-orange-600"
            >
              <i class="fas fa-envelope w-5 mr-3"></i>
              Liên hệ
            </router-link>
          </div>

          <!-- Mobile Auth / User -->
          <div v-if="!isLoggedIn" class="flex flex-col space-y-2 pt-4 border-t border-gray-200">
            <router-link 
              to="/login" 
              @click="closeMobileMenu" 
              class="flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>
              Đăng nhập
            </router-link>
            <router-link 
              to="/register" 
              @click="closeMobileMenu" 
              class="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Đăng ký ngay
            </router-link>
          </div>

          <!-- Mobile User Menu -->
          <div v-if="isLoggedIn" class="space-y-2 pt-4 border-t border-gray-200">
            <div class="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <i class="fas fa-user text-white"></i>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800">{{ userName || 'User' }}</p>
                <p class="text-xs text-gray-500">{{ currentUser?.email }}</p>
              </div>
            </div>
            
            <router-link 
              to="/profile" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              <i class="fas fa-user-circle w-5 mr-3 text-blue-600"></i>
              <span class="font-semibold">Tài khoản của tôi</span>
            </router-link>
            
            <router-link 
              to="/orders" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-all duration-200"
            >
              <i class="fas fa-shopping-bag w-5 mr-3 text-purple-600"></i>
              <span class="font-semibold">Đơn hàng của tôi</span>
            </router-link>
            
            <router-link 
              v-if="currentUser?.role === 'admin'" 
              to="/admin" 
              @click="closeMobileMenu" 
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 rounded-xl transition-all duration-200"
            >
              <i class="fas fa-cogs w-5 mr-3 text-green-600"></i>
              <span class="font-semibold">Quản trị hệ thống</span>
            </router-link>
            
            <button 
              @click="logout" 
              class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <i class="fas fa-sign-out-alt w-5 mr-3"></i>
              <span class="font-semibold">Đăng xuất</span>
            </button>
          </div>

          <!-- Mobile Hotline -->
          <a 
            href="tel:+84123456789" 
            class="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl font-bold hover:from-red-100 hover:to-pink-100 transition-all duration-200"
          >
            <i class="fas fa-phone-alt animate-pulse"></i>
            <span>Hotline: 0123.456.789</span>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useCart } from '@/composables'
import Swal from 'sweetalert2'
import toast from '@/services/toast'

const router = useRouter()
const { isAuthenticated, userName, currentUser, logout: authLogout } = useAuth()
const { totalItems, fetchCart } = useCart()

// State
const searchQuery = ref('')
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const isScrolled = ref(false)

// Refs
const userMenuBtn = ref(null)
const userMenu = ref(null)

// Computed
const isLoggedIn = computed(() => !!isAuthenticated.value)
const cartCount = computed(() => totalItems.value)

// Methods
const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ name: 'Products', query: { search: q } })
    closeMobileMenu()
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const logout = async () => {
  try {
    const result = await Swal.fire({
      title: 'Đăng xuất',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    })

    if (result.isConfirmed) {
      try {
        const { authService } = await import('@/services/api')
        await authService.logout()
      } catch (e) {
        console.warn('Logout API error:', e)
      }
      
      authLogout()
      showUserMenu.value = false
      showMobileMenu.value = false
      
      await toast.success('Đã đăng xuất thành công')
      
      router.push('/')
    }
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Event handlers
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleClickOutside = (event) => {
  if (showUserMenu.value && 
      userMenuBtn.value && 
      userMenu.value && 
      !userMenuBtn.value.contains(event.target) && 
      !userMenu.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  
  // Fetch cart count if user is logged in
  if (isAuthenticated.value) {
    fetchCart()
  }
})

// Watch for auth changes to fetch cart
watch(isAuthenticated, (newVal) => {
  if (newVal) {
    fetchCart()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Dropdown Animation */
.dropdown-enter-active {
  animation: dropdownIn 0.2s ease-out;
}

.dropdown-leave-active {
  animation: dropdownOut 0.15s ease-in;
}

@keyframes dropdownIn {
  from {
    opacity: 0;
    transform: translateY(-12px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dropdownOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-12px) scale(0.95);
  }
}

/* Mobile Menu Animation */
.mobile-menu-enter-active {
  animation: slideDown 0.3s ease-out;
}

.mobile-menu-leave-active {
  animation: slideUp 0.25s ease-in;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }
}

/* Smooth Scrolling for Sticky Header */
header {
  will-change: transform, box-shadow;
}

/* Remove link underlines */
a {
  text-decoration: none !important;
}

a:hover,
a:focus,
a:active,
a:visited {
  text-decoration: none !important;
}

/* Cart Badge Animation */
@keyframes bounceIn {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-bounce {
  animation: bounceIn 2s infinite;
}
</style>