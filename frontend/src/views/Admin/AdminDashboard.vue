<template>
  <div class="admin-dashboard p-6 bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p class="text-gray-600">Chào mừng bạn quay lại! Đây là tổng quan về hoạt động kinh doanh.</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm">
            <i class="fas fa-download mr-2"></i>Xuất báo cáo
          </button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm">
            <i class="fas fa-plus mr-2"></i>Thêm mới
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div @click="goToProducts" class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Tổng sản phẩm</p>
            <p class="text-2xl font-bold">{{ dashboardStats.totalProducts }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-box-open text-xs mr-1"></i>
              <span class="text-xs text-blue-100">{{ dashboardStats.activeProducts }} đang hoạt động</span>
            </div>
          </div>
          <div class="bg-blue-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-box text-2xl"></i>
          </div>
        </div>
      </div>

      <div @click="goToCategories" class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Danh mục</p>
            <p class="text-2xl font-bold">{{ dashboardStats.totalCategories }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-tags text-xs mr-1"></i>
              <span class="text-xs text-green-100">{{ categoryStats.active }} đang hoạt động</span>
            </div>
          </div>
          <div class="bg-green-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-folder-open text-2xl"></i>
          </div>
        </div>
      </div>

      <div @click="goToUsers" class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Người dùng</p>
            <p class="text-2xl font-bold">{{ dashboardStats.totalUsers }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-user-check text-xs mr-1"></i>
              <span class="text-xs text-purple-100">{{ dashboardStats.activeUsers }} đang hoạt động</span>
            </div>
          </div>
          <div class="bg-purple-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-users text-2xl"></i>
          </div>
        </div>
      </div>

      <div @click="goToUsers" class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">Quản trị viên</p>
            <p class="text-2xl font-bold">{{ dashboardStats.adminUsers }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-crown text-xs mr-1"></i>
              <span class="text-xs text-orange-100">Admin & Quản lý</span>
            </div>
          </div>
          <div class="bg-orange-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-user-shield text-2xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Products & Quick Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Recent Products -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Sản phẩm mới nhất</h3>
              <p class="text-sm text-gray-500">Các sản phẩm được thêm gần đây</p>
            </div>
            <button @click="goToProducts" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium">
              <i class="fas fa-plus mr-2"></i>Thêm sản phẩm
            </button>
          </div>
        </div>
        
        <div v-if="loading" class="p-8 text-center">
          <i class="fas fa-spinner fa-spin text-3xl text-blue-500"></i>
          <p class="text-gray-500 mt-2">Đang tải dữ liệu...</p>
        </div>

        <div v-else-if="recentProducts.length === 0" class="p-8 text-center">
          <i class="fas fa-box-open text-5xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">Chưa có sản phẩm nào</p>
          <button @click="goToProducts" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Thêm sản phẩm đầu tiên
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in recentProducts" :key="product.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img class="h-10 w-10 rounded-lg object-cover" :src="getProductImage(product)" :alt="product.name">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">SKU: {{ product.sku || 'N/A' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">{{ formatCurrency(product.price) }}</div>
                  <div v-if="product.sale_price" class="text-xs text-red-500 line-through">{{ formatCurrency(product.sale_price) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium" :class="product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'">
                    {{ product.stock || 0 }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="product.active ? 'bg-green-400' : 'bg-gray-400'"></span>
                    {{ product.active ? 'Hoạt động' : 'Ngừng bán' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {{ formatDate(product.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-6 border-t border-gray-200 bg-gray-50">
          <div class="text-center">
            <button @click="goToProducts" class="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Xem tất cả sản phẩm <i class="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Stats -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
          <div class="space-y-3">
            <button @click="goToProducts" class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-left transition-all duration-200 font-medium">
              <i class="fas fa-plus mr-3"></i>Thêm sản phẩm mới
            </button>
            <button @click="goToCategories" class="w-full bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-left transition-all duration-200 font-medium">
              <i class="fas fa-folder-plus mr-3"></i>Thêm danh mục
            </button>
            <button @click="goToUsers" class="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-left transition-all duration-200 font-medium">
              <i class="fas fa-user-plus mr-3"></i>Thêm người dùng
            </button>
            <button @click="goToOrders" class="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 p-3 rounded-lg text-left transition-all duration-200 font-medium">
              <i class="fas fa-shopping-cart mr-3"></i>Quản lý đơn hàng
            </button>
          </div>
        </div>

        <!-- Top Products -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Sản phẩm bán chạy</h3>
            <button @click="goToProducts" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div v-if="loading" class="text-center py-8">
            <i class="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
          </div>
          
          <div v-else-if="topProducts.length === 0" class="text-center py-8">
            <i class="fas fa-chart-line text-4xl text-gray-300 mb-2"></i>
            <p class="text-sm text-gray-500">Chưa có dữ liệu bán hàng</p>
          </div>
          
          <div v-else class="space-y-3">
            <div v-for="product in topProducts" :key="product.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div class="flex items-center flex-1 min-w-0">
                <div class="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                  <img v-if="product.image" :src="getProductImage(product)" :alt="product.name" class="w-full h-full object-cover">
                  <i v-else class="fas fa-box text-white"></i>
                </div>
                <div class="ml-3 flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</div>
                  <div class="text-xs text-gray-500">{{ product.sold_count || 0 }} đã bán</div>
                </div>
              </div>
              <div class="text-sm font-semibold text-gray-900 ml-2">{{ formatCurrency(product.price) }}</div>
            </div>
          </div>

          <div v-if="!loading && topProducts.length === 0 && products.length > 0" class="mt-4">
            <p class="text-xs text-gray-500 text-center">Hiển thị {{ Math.min(3, products.length) }} sản phẩm mới nhất</p>
            <div class="space-y-2 mt-3">
              <div v-for="product in recentProducts.slice(0, 3)" :key="product.id" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div class="flex items-center flex-1 min-w-0">
                  <div class="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <img v-if="product.image" :src="getProductImage(product)" :alt="product.name" class="w-full h-full object-cover">
                    <i v-else class="fas fa-box text-white text-xs"></i>
                  </div>
                  <div class="ml-2 flex-1 min-w-0">
                    <div class="text-xs font-medium text-gray-900 truncate">{{ product.name }}</div>
                  </div>
                </div>
                <div class="text-xs font-semibold text-gray-900 ml-2">{{ formatCurrency(product.price) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProducts, useCategories, useUsers } from '@/composables'
import { useRouter } from 'vue-router'

const router = useRouter()

// Load composables
const { products, stats: productStats, loadProducts } = useProducts()
const { categories, stats: categoryStats, loadCategories } = useCategories()
const { users, stats: userStats, loadUsers, loadStats } = useUsers()

// Loading state
const loading = ref(true)

// Computed stats for dashboard
const dashboardStats = computed(() => ({
  totalProducts: productStats.value.total || 0,
  activeProducts: productStats.value.active || 0,
  totalCategories: categoryStats.value.total || 0,
  totalUsers: userStats.value.total || 0,
  activeUsers: userStats.value.active || 0,
  adminUsers: userStats.value.admin || 0
}))

// Recent products (top 3 newest)
const recentProducts = computed(() => {
  return [...products.value]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)
})

// Top selling products (với số lượng đã bán cao nhất)
const topProducts = computed(() => {
  return [...products.value]
    .filter(p => p.sold_count > 0)
    .sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0))
    .slice(0, 3)
})

// Load all data
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      loadProducts(),
      loadCategories(),
      loadUsers(),
      loadStats()
    ])
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
})

// Navigation methods
const goToProducts = () => router.push('/admin/products')
const goToCategories = () => router.push('/admin/categories')
const goToUsers = () => router.push('/admin/users')
const goToOrders = () => router.push('/admin/orders')

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount || 0)
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Hôm nay'
  if (days === 1) return 'Hôm qua'
  if (days < 7) return `${days} ngày trước`
  
  return date.toLocaleDateString('vi-VN')
}

// Get product image URL
const getProductImage = (product) => {
  if (product.image) {
    // If image is full URL
    if (product.image.startsWith('http')) {
      return product.image
    }
    // If image is relative path
    return `http://127.0.0.1:8000${product.image.startsWith('/') ? '' : '/'}${product.image}`
  }
  // Default placeholder
  return 'https://via.placeholder.com/100?text=No+Image'
}
</script>

<style scoped>
/* Gradient animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}

/* Hover effects */
.transform:hover {
  transform: translateY(-2px);
}

/* Card shadows */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Table row hover effect */
tbody tr:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Button hover animations */
button:hover {
  transform: translateY(-1px);
}

/* Status indicators */
.bg-green-100 { background-color: #dcfce7; }
.text-green-800 { color: #166534; }
.bg-yellow-100 { background-color: #fef3c7; }
.text-yellow-800 { color: #92400e; }
.bg-gray-100 { background-color: #f3f4f6; }
.text-gray-800 { color: #1f2937; }

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
