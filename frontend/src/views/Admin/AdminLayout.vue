<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl">
      <div class="h-full px-3 py-4 overflow-y-auto">
        <!-- Logo -->
        <div class="flex items-center ps-3 mb-8 border-b border-gray-700 pb-6">
          <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3 shadow-lg">
            <i class="fas fa-store text-white text-lg"></i>
          </div>
          <div>
            <span class="text-xl font-bold text-white">E-Shop</span>
            <div class="text-xs text-gray-400">Admin Panel</div>
          </div>
        </div>

        <!-- Navigation -->
        <ul class="space-y-2 font-medium">
          <li>
            <a @click="navigateWithLoading('/admin/dashboard', 'Đang tải Dashboard...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/dashboard' }">
              <i class="fas fa-chart-line w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/dashboard' }"></i>
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/products', 'Đang tải danh sách sản phẩm...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/products' }">
              <i class="fas fa-box w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/products' }"></i>
              <span class="ms-3">Sản phẩm</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/categories', 'Đang tải danh mục...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/categories' }">
              <i class="fas fa-tags w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/categories' }"></i>
              <span class="ms-3">Danh mục</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/orders', 'Đang tải đơn hàng...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/orders' }">
              <i class="fas fa-shopping-cart w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/orders' }"></i>
              <span class="ms-3">Đơn hàng</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/users', 'Đang tải người dùng...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/users' }">
              <i class="fas fa-users w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/users' }"></i>
              <span class="ms-3">Người dùng</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/coupons', 'Đang tải mã giảm giá...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/coupons' }">
              <i class="fas fa-ticket-alt w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/coupons' }"></i>
              <span class="ms-3">Mã giảm giá</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/reports', 'Đang tải báo cáo...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/reports' }">
              <i class="fas fa-chart-bar w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/reports' }"></i>
              <span class="ms-3">Báo cáo</span>
            </a>
          </li>
          
          <li>
            <a @click="navigateWithLoading('/admin/settings', 'Đang tải cài đặt...')" 
              class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group cursor-pointer"
              :class="{ 'bg-blue-600 text-white shadow-lg': route.path === '/admin/settings' }">
              <i class="fas fa-cog w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"
                 :class="{ 'text-white': route.path === '/admin/settings' }"></i>
              <span class="ms-3">Cài đặt</span>
            </a>
          </li>
        </ul>

        <!-- Divider -->
        <div class="my-4 border-t border-gray-700"></div>

        <!-- Back to User Site Button -->
        <div class="px-3">
          <a @click="goToUserSite" 
            class="flex items-center p-3 text-green-300 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/30 rounded-lg hover:from-green-600 hover:to-emerald-600 hover:text-white hover:border-green-500 transition-all duration-200 group cursor-pointer shadow-lg">
            <i class="fas fa-home w-5 h-5 transition duration-75"></i>
            <span class="ms-3 font-semibold">Quay lại trang User</span>
            <i class="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
          </a>
        </div>

        <!-- User Section -->
        <div class="absolute bottom-4 left-3 right-3">
          <div class="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg border border-gray-600">
            <div class="flex items-center justify-between">
              <div class="flex items-center flex-1 min-w-0 mr-2">
                <div class="relative">
                  <img src="/src/assets/img/avatar.jpg" alt="User" class="w-9 h-9 rounded-full mr-2 ring-2 ring-blue-400">
                  <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-white truncate">Admin User</p>
                  <p class="text-xs text-blue-200 truncate">Quản trị viên</p>
                </div>
              </div>
              <div class="flex space-x-1.5">
                <button @click="goToProfile" class="p-2 text-gray-300 hover:text-white bg-gray-600 hover:bg-gray-500 rounded-lg transition-all duration-200" title="Hồ sơ">
                  <i class="fas fa-user-cog text-sm"></i>
                </button>
                <button @click="handleLogout" class="p-2 text-gray-300 hover:text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all duration-200" title="Đăng xuất">
                  <i class="fas fa-sign-out-alt text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="md:ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Mobile menu button & Breadcrumb -->
            <div class="flex items-center space-x-4">
              <button class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
                <i class="fas fa-bars"></i>
              </button>
              
              <!-- Breadcrumb -->
              <nav class="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <router-link to="/admin/dashboard" class="hover:text-blue-600 transition-colors">
                  <i class="fas fa-home"></i>
                </router-link>
                <i class="fas fa-chevron-right text-xs"></i>
                <span class="text-gray-900 font-medium">{{ getPageTitle() }}</span>
              </nav>
            </div>

            <!-- Search Bar -->
            <div class="hidden md:flex flex-1 max-w-md mx-8">
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-search text-gray-400"></i>
                </div>
                <input type="text" 
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-500" 
                  placeholder="Tìm kiếm sản phẩm, đơn hàng...">
              </div>
            </div>

            <!-- Header actions -->
            <div class="flex items-center space-x-3">
              <!-- Quick actions -->
              <div class="hidden lg:flex items-center space-x-2">
                <button class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200" title="Thêm sản phẩm">
                  <i class="fas fa-plus"></i>
                </button>
                <button class="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200" title="Xuất báo cáo">
                  <i class="fas fa-download"></i>
                </button>
              </div>
              
              <div class="w-px h-6 bg-gray-300"></div>

              <!-- Notifications -->
              <div class="relative">
                <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
                  <i class="fas fa-bell"></i>
                  <span class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">3</span>
                </button>
              </div>

              <!-- Messages -->
              <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <i class="fas fa-envelope"></i>
              </button>

              <!-- User menu -->
              <div class="relative">
                <button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <img class="h-8 w-8 rounded-full ring-2 ring-gray-200" src="/src/assets/img/avatar.jpg" alt="User">
                  <div class="hidden lg:block text-left">
                    <div class="text-sm font-medium text-gray-900">Admin User</div>
                    <div class="text-xs text-gray-500">Quản trị viên</div>
                  </div>
                  <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </Transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useLoading } from '@/composables'

const route = useRoute()
const router = useRouter()
const { startLoading } = useLoading()

const pageTitle = computed(() => {
  const routeName = route.name?.toString() || ''
  const titles = {
    'AdminDashboard': 'Dashboard',
    'AdminProducts': 'Quản lý sản phẩm',
    'AdminCategories': 'Danh mục sản phẩm', 
    'AdminOrders': 'Quản lý đơn hàng',
    'AdminUsers': 'Quản lý người dùng',
    'AdminCoupons': 'Quản lý mã giảm giá',
    'AdminReports': 'Báo cáo thống kê',
    'AdminSettings': 'Cài đặt hệ thống'
  }
  return titles[routeName] || 'Admin Panel'
})

function getPageTitle() {
  return pageTitle.value
}

function navigateWithLoading(path, message) {
  startLoading(message)
  router.push(path)
}

function goToUserSite() {
  startLoading('Đang chuyển về trang User...')
  router.push('/')
}

function goToProfile() {
  // Navigate to profile or show profile modal
  Swal.fire({
    title: 'Thông tin hồ sơ',
    text: 'Tính năng đang phát triển...',
    icon: 'info'
  })
}

function handleLogout() {
  Swal.fire({
    title: 'Đăng xuất',
    text: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear auth data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Show success message
      Swal.fire({
        title: 'Đăng xuất thành công!',
        text: 'Chuyển hướng về trang đăng nhập...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // Redirect to login page
        router.push('/login')
      })
    }
  })
}
</script>

<style scoped>
/* Remove underline from links */
a {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Router Link Active State */
.router-link-active {
  background-color: rgb(37 99 235);
  color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.router-link-active i {
  color: white;
}
</style>