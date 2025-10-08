<template>
  <header class="bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100/50 sticky top-0 z-50 transition-all duration-300" :class="{ 'shadow-2xl': isScrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="group flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-all duration-200">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
              <i class="fas fa-store text-white text-sm"></i>
            </div>
            <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VueShop</h1>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1">
          <router-link to="/" class="group decoration-none no-underline relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50" 
            active-class="text-blue-600 bg-blue-50 font-semibold"
            style="text-decoration: none !important;">
            <i class="fas fa-home text-xs mr-1.5"></i>
            Trang chủ
          </router-link>
          <router-link to="/products" class="group decoration-none no-underline relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
            active-class="text-blue-600 bg-blue-50 font-semibold"
            style="text-decoration: none !important;">
            <i class="fas fa-shopping-bag text-xs mr-1.5"></i>
            Sản phẩm
          </router-link>
          <router-link to="/categories" class="group decoration-none no-underline relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
            active-class="text-blue-600 bg-blue-50 font-semibold"
            style="text-decoration: none !important;">
            <i class="fas fa-th-large text-xs mr-1.5"></i>
            Danh mục
          </router-link>
          <router-link to="/contact" class="group decoration-none no-underline relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
            active-class="text-blue-600 bg-blue-50 font-semibold"
            style="text-decoration: none !important;">
            <i class="fas fa-envelope text-xs mr-1.5"></i>
            Liên hệ
          </router-link>
        </nav>

        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-lg mx-6">
          <div class="relative w-full group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-400 text-sm group-focus-within:text-blue-600 transition-colors"></i>
            </div>
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              class="w-full pl-10 pr-12 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500" 
              placeholder="Tìm kiếm..."
            />
            <button @click="handleSearch" class="absolute inset-y-0 right-1 flex items-center">
              <div class="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors duration-200">
                <i class="fas fa-search text-xs"></i>
              </div>
            </button>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-2">
          <!-- Cart -->
          <router-link to="/cart" class="group relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <i class="fas fa-shopping-cart text-lg"></i>
            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </router-link>

          <!-- Auth Links (Not Logged In) -->
          <div v-if="!isLoggedIn" class="hidden lg:flex items-center space-x-2">
            <router-link to="/login" class="text-gray-700 decoration-none hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50 border border-gray-200 hover:border-blue-300"style="text-decoration: none !important;">
              <i class="fas fa-sign-in-alt mr-1.5 text-xs"></i>
              Đăng nhập
            </router-link>
            <router-link to="/register" class="bg-blue-600 decoration-none hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"style="text-decoration: none !important;">
              <i class="fas fa-user-plus mr-1.5 text-xs"></i>
              Đăng ký
            </router-link>
          </div>

          <!-- User Menu (Logged In) -->
          <div v-if="isLoggedIn" class="relative">
            <button 
              ref="userMenuBtn"
              @click="toggleUserMenu" 
              class="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors duration-200"
              :class="{ 'bg-blue-50 text-blue-600': showUserMenu }"
            >
              <div class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <i class="fas fa-user text-xs"></i>
              </div>
              <span class="hidden lg:block text-sm font-medium text-gray-700">{{ userName || 'User' }}</span>
              <i class="fas fa-chevron-down text-xs transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }"></i>
            </button>

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div v-if="showUserMenu" ref="userMenu" class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <router-link to="/profile" @click="showUserMenu = false" class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  <i class="fas fa-user-circle w-4 text-center mr-2 text-xs"></i>
                  Tài khoản
                </router-link>
                <router-link to="/orders" @click="showUserMenu = false" class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  <i class="fas fa-shopping-bag w-4 text-center mr-2 text-xs"></i>
                  Đơn hàng
                </router-link>
                <router-link v-if="currentUser?.role === 'admin'" to="/admin" @click="showUserMenu = false" class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  <i class="fas fa-cogs w-4 text-center mr-2 text-xs"></i>
                  Quản trị
                </router-link>
                <hr class="my-1 border-gray-200">
                <button @click="logout" class="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <i class="fas fa-sign-out-alt w-4 text-center mr-2 text-xs"></i>
                  Đăng xuất
                </button>
              </div>
            </Transition>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div v-if="showMobileMenu" class="lg:hidden py-4 border-t border-gray-200">
          <!-- Mobile Navigation -->
          <div class="space-y-2 mb-4">
            <router-link to="/" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200">
              Trang chủ
            </router-link>
            <router-link to="/products" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200">
              Sản phẩm
            </router-link>
            <router-link to="/categories" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200">
              Danh mục
            </router-link>
            <router-link to="/contact" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200">
              Liên hệ
            </router-link>
          </div>

          <!-- Mobile Search -->
          <div class="mb-4">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                @keyup.enter="handleSearch"
                type="text" 
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" 
                placeholder="Tìm kiếm sản phẩm..."
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <!-- Mobile Auth -->
          <div v-if="!isLoggedIn" class="flex space-x-3">
            <router-link to="/login" @click="closeMobileMenu" class="flex-1 text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
              Đăng nhập
            </router-link>
            <router-link to="/register" @click="closeMobileMenu" class="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Đăng ký
            </router-link>
          </div>

          <!-- Mobile User Menu -->
          <div v-if="isLoggedIn" class="space-y-2">
            <div class="px-3 py-2 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-900">{{ userName || 'User' }}</p>
            </div>
            <router-link to="/profile" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
              <i class="fas fa-user-circle mr-3"></i>Tài khoản
            </router-link>
            <router-link to="/orders" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
              <i class="fas fa-shopping-bag mr-3"></i>Đơn hàng
            </router-link>
            <router-link v-if="currentUser?.role === 'admin'" to="/admin" @click="closeMobileMenu" class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
              <i class="fas fa-cogs mr-3"></i>Quản trị
            </router-link>
            <button @click="logout" class="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <i class="fas fa-sign-out-alt mr-3"></i>Đăng xuất
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Swal from 'sweetalert2'

const router = useRouter()
const { isAuthenticated, userName, currentUser, logout: authLogout } = useAuth()

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
const cartCount = computed(() => 3) // TODO: replace with real cart

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
      
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Đã đăng xuất",
        showConfirmButton: false,
        timer: 2000,
      })
      
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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Remove underline from router links */
nav a,
nav router-link,
.router-link-active,
.router-link-exact-active {
  text-decoration: none !important;
}

nav a:hover,
nav a:focus,
nav a:active,
nav a:visited {
  text-decoration: none !important;
}

/* Dropdown transitions */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.dropdown-leave-active {
  transition: all 0.15s ease-in;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile menu transitions */
.mobile-menu-enter-active {
  transition: all 0.3s ease-out;
}

.mobile-menu-leave-active {
  transition: all 0.25s ease-in;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>