<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <h1>VueShop</h1>
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="nav">
          <ul class="nav-list">
            <li><router-link to="/" class="nav-link">Trang chủ</router-link></li>
            <li><router-link to="/products" class="nav-link">Sản phẩm</router-link></li>
            <li><router-link to="/categories" class="nav-link">Danh mục</router-link></li>
            <li><router-link to="/contact" class="nav-link">Liên hệ</router-link></li>
          </ul>
        </nav>

        <!-- Search Bar -->
        <div class="search-bar">
          <input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Tìm kiếm sản phẩm..."
            class="search-input" />
          <button @click="handleSearch" class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>

        <!-- User Actions -->
        <div class="user-actions">
          <router-link to="/cart" class="cart-link">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>

          <div class="auth-links" v-if="!isLoggedIn">
            <router-link to="/login" class="auth-link">Đăng nhập</router-link>
            <router-link to="/register" class="auth-link">Đăng ký</router-link>
          </div>

          <div class="user-menu" v-if="isLoggedIn">
            <div class="user-dropdown" :class="{ open: showDropdown }">
              <button ref="btnRef" @click="toggleDropdown" class="user-btn" type="button" :aria-expanded="showDropdown">
                <i class="fas fa-user"></i>
                <span>{{ userName || 'User' }}</span>
                <i class="fas fa-chevron-down" :class="{ rotated: showDropdown }"></i>
              </button>

              <!-- Menu render trực tiếp dưới nút để tránh lỗi Teleport -->
              <div v-if="showDropdown" ref="menuRef" class="user-dropdown-menu" @click.stop>
                <router-link to="/profile" class="dropdown-item" @click="showDropdown = false">
                  <i class="fas fa-user-circle"></i>
                  Tài khoản
                </router-link>
                <router-link to="/orders" class="dropdown-item" @click="showDropdown = false">
                  <i class="fas fa-shopping-bag"></i>
                  Đơn hàng
                </router-link>
                <router-link to="/admin" class="dropdown-item" @click="showDropdown = false"
                  v-if="(currentUser && currentUser.role) === 'admin'">
                  <i class="fas fa-cogs"></i>
                  Quản trị
                </router-link>
                <hr class="dropdown-divider" />
                <button class="dropdown-item logout-btn" @click="logout">
                  <i class="fas fa-sign-out-alt"></i>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMobileMenu" class="mobile-menu-btn">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" v-show="showMobileMenu">
        <div class="mobile-nav">
          <router-link to="/" @click="closeMobileMenu">Trang chủ</router-link>
          <router-link to="/products" @click="closeMobileMenu">Sản phẩm</router-link>
          <router-link to="/categories" @click="closeMobileMenu">Danh mục</router-link>
          <router-link to="/contact" @click="closeMobileMenu">Liên hệ</router-link>
        </div>
        <div class="mobile-auth" v-if="!isLoggedIn">
          <router-link to="/login" @click="closeMobileMenu">Đăng nhập</router-link>
          <router-link to="/register" @click="closeMobileMenu">Đăng ký</router-link>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { toastService } from '@/services/toast'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth' // nhớ alias @ -> src
import Swal from 'sweetalert2'
const router = useRouter()
const { isAuthenticated, userName, currentUser, logout: authLogout } = useAuth()

// UI state
const searchQuery = ref('')
const showDropdown = ref(false)
const showMobileMenu = ref(false)

// Removed showLogoutConfirm state
// Refs menu
const btnRef = ref(null)
const menuRef = ref(null)

// Derived
const isLoggedIn = computed(() => !!isAuthenticated.value)
const cartCount = computed(() => 3) // TODO: thay bằng cart thực

// Search
const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (q) router.push({ name: 'Products', query: { search: q } })
}

const toggleDropdown = () => { showDropdown.value = !showDropdown.value }

const toggleMobileMenu = () => { showMobileMenu.value = !showMobileMenu.value }
const closeMobileMenu = () => { showMobileMenu.value = false }

// Logout using SweetAlert2 if available
const logout = async () => {
  let confirmed = true
  try {
    const Swal = (await import('sweetalert2')).default
    const result = await Swal.fire({
      title: 'Đăng xuất',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
      focusCancel: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    })
    confirmed = result.isConfirmed
  } catch (err) {
    console.warn('SweetAlert2 error:', err)

  }

  if (!confirmed) return

  try {
    const { authService } = await import('@/services/api') // tránh circular
    await authService.logout()
  } catch (e) {
    console.warn('Logout API error:', e)
  } finally {
    authLogout()
    showDropdown.value = false
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Đã đăng xuất",
      text: "Bạn đã đăng xuất thành công.",
      showConfirmButton: false,
      timer: 2000,
    })
    router.push('/')
  }
}

// Click outside: đóng khi click ngoài nút/menu
const onDocClick = (e) => {
  if (
    showDropdown.value &&
    btnRef.value && menuRef.value &&
    !btnRef.value.contains(e.target) &&
    !menuRef.value.contains(e.target)
  ) {
    showDropdown.value = false
  }
}

// Header shadow
const onScroll = () => {
  const header = document.querySelector('.header')
  if (window.scrollY > 100) header?.classList.add('scrolled')
  else header?.classList.remove('scrolled')
}
const onResize = () => { }

// Mount/unmount
onMounted(() => {
  document.addEventListener('click', onDocClick)
  window.addEventListener('scroll', onScroll, true) // true để bắt cả scroll trong container
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  window.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', onResize)
})
</script>


<style scoped>
.header {
  background: #ffffff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}



.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  overflow: visible;
}

.logo-link {
  text-decoration: none;
  color: #1f2937;
  transition: color 0.3s ease;
}

.logo-link:hover {
  color: #3b82f6;
}

.logo h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

/* Dropdown container */
.user-dropdown {
  position: relative;
}


.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3b82f6;
  background: #f8fafc;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 8px;
  width: 320px;
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  background: #ffffff;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input {
  border: none;
  background: transparent;
  padding: 10px 16px;
  flex: 1;
  outline: none;
  color: #1f2937;
  font-size: 14px;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-btn {
  background: #3b82f6;
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #2563eb;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: visible;
}

.cart-link {
  position: relative;
  color: #6b7280;
  font-size: 20px;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.cart-link:hover {
  color: #3b82f6;
  background: #f8fafc;
}

.cart-count {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
}

.auth-links {
  display: flex;
  gap: 15px;
}

.auth-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  padding: 10px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #ffffff;
}

.auth-link:hover {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.dropdown {
  position: relative;
}

.user-btn {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1f2937;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.user-btn:hover {
  background: #ffffff;
  border-color: #3b82f6;
  color: #3b82f6;
}

.user-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 5000;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  text-decoration: none;
  color: #374151;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
}

.dropdown-item:hover {
  background: #f8fafc;
  color: #3b82f6;
}

.dropdown-divider {
  height: 1px;
  margin: 8px 12px;
  overflow: hidden;
  background-color: #f3f4f6;
  border: none;
}

.logout-btn {
  color: #ef4444 !important;
  border-top: 1px solid #f3f4f6;
  margin-top: 4px;
}

.logout-btn:hover {
  background: #fef2f2 !important;
  color: #dc2626 !important;
}

.fa-chevron-down {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.fa-chevron-down.rotated {
  transform: rotate(180deg);
}

.mobile-menu-btn {
  display: none;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: #ffffff;
  border-color: #3b82f6;
  color: #3b82f6;
}

.mobile-menu {
  display: none;
  padding: 20px 0;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.mobile-nav a {
  text-decoration: none;
  color: #374151;
  padding: 12px 0;
  display: block;
  font-weight: 500;
  transition: color 0.3s ease;
}

.mobile-nav a:hover {
  color: #3b82f6;
}

.mobile-auth {
  display: flex;
  gap: 15px;
}

.mobile-auth a {
  text-decoration: none;
  color: #6b7280;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  background: #ffffff;
  transition: all 0.3s ease;
  font-weight: 500;
}

.mobile-auth a:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}

@media (max-width: 768px) {

  .nav,
  .search-bar,
  .auth-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .header-content {
    height: 70px;
    padding: 0 15px;
  }

  .logo h1 {
    font-size: 26px;
  }

  .cart-link {
    font-size: 20px;
    padding: 10px;
  }

  .container {
    padding: 0 15px;
  }
}

@media (max-width: 1024px) {
  .search-bar {
    width: 280px;
  }

  .nav-list {
    gap: 20px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1400px;
  }

  .search-bar {
    width: 400px;
  }
}
</style>