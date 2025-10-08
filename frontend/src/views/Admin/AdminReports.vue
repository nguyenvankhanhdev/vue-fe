<template>
  <div class="admin-reports p-6 bg-gray-50 min-h-screen">
    <!-- Enhanced Header -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center mb-2">
            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-4">
              <i class="fas fa-chart-bar text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Báo cáo và thống kê</h1>
              <p class="text-gray-600">Phân tích dữ liệu kinh doanh và hiệu suất bán hàng</p>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <!-- Period Selector -->
          <div class="relative">
            <select v-model="selectedPeriod" @change="changePeriod" class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="7 ngày qua">7 ngày qua</option>
              <option value="30 ngày qua">30 ngày qua</option>
              <option value="3 tháng qua">3 tháng qua</option>
              <option value="Năm nay">Năm nay</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <i class="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <button @click="refreshData" class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors">
            <i class="fas fa-sync-alt mr-2"></i>Làm mới
          </button>
          
          <button @click="exportReport" class="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <i class="fas fa-file-pdf mr-2"></i>Xuất báo cáo
          </button>
        </div>
      </div>
    </div>

    <!-- Revenue Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div v-for="(stat, idx) in revenueStats" :key="idx" 
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <div class="flex items-center mt-2">
              <i :class="[stat.changeIcon, 'text-xs mr-1', stat.changeClass]"></i>
              <span class="text-xs" :class="stat.changeClass">{{ stat.change }}</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center"
               :class="{
                 'bg-green-100': idx === 0,
                 'bg-blue-100': idx === 1,
                 'bg-purple-100': idx === 2,
                 'bg-yellow-100': idx === 3
               }">
            <i :class="[stat.icon, 'text-xl', {
                 'text-green-600': idx === 0,
                 'text-blue-600': idx === 1,
                 'text-purple-600': idx === 2,
                 'text-yellow-600': idx === 3
               }]"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Chart -->
      <div class="xl:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-900">Doanh thu theo thời gian</h3>
              <div class="flex rounded-lg border border-gray-200 bg-white">
                <button type="button" 
                        class="px-3 py-1 text-sm font-medium rounded-l-lg transition-colors"
                        :class="chartPeriod === 'day' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'"
                        @click="chartPeriod = 'day'">Ngày</button>
                <button type="button" 
                        class="px-3 py-1 text-sm font-medium border-l border-gray-200 transition-colors"
                        :class="chartPeriod === 'week' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'"
                        @click="chartPeriod = 'week'">Tuần</button>
                <button type="button" 
                        class="px-3 py-1 text-sm font-medium border-l border-gray-200 rounded-r-lg transition-colors"
                        :class="chartPeriod === 'month' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'"
                        @click="chartPeriod = 'month'">Tháng</button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
              <div class="text-center">
                <i class="fas fa-chart-line text-4xl text-blue-400 mb-4"></i>
                <p class="text-gray-600 font-medium">Biểu đồ doanh thu sẽ hiển thị ở đây</p>
                <p class="text-sm text-gray-500">Tích hợp Chart.js hoặc thư viện biểu đồ khác</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="xl:col-span-1">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <h3 class="text-lg font-semibold text-gray-900">Sản phẩm bán chạy</h3>
          </div>
          <div class="p-0">
            <div v-for="(product, idx) in topProducts" :key="idx" 
                 class="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
              <div class="flex-shrink-0 mr-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span class="font-bold text-white text-sm">#{{ idx + 1 }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 truncate">{{ product.name }}</div>
                <div class="text-sm text-gray-500">{{ product.sold }} đã bán</div>
              </div>
              <div class="text-right">
                <div class="font-semibold text-gray-900">₫{{ product.revenue.toLocaleString('vi-VN') }}</div>
              </div>
            </div>
            <div class="p-4 text-center">
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem tất cả sản phẩm</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Reports -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <!-- Orders Report -->
      <div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <h3 class="text-lg font-semibold text-gray-900">Báo cáo đơn hàng</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">{{ orderStats.total }}</div>
                <div class="text-sm text-gray-600">Tổng đơn hàng</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">{{ orderStats.completed }}</div>
                <div class="text-sm text-gray-600">Đã hoàn thành</div>
              </div>
              <div class="text-center p-4 bg-yellow-50 rounded-lg">
                <div class="text-2xl font-bold text-yellow-600">{{ orderStats.pending }}</div>
                <div class="text-sm text-gray-600">Đang xử lý</div>
              </div>
              <div class="text-center p-4 bg-red-50 rounded-lg">
                <div class="text-2xl font-bold text-red-600">{{ orderStats.cancelled }}</div>
                <div class="text-sm text-gray-600">Đã hủy</div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">Tỷ lệ hoàn thành</span>
                <span class="font-semibold text-gray-900">{{ Math.round((orderStats.completed / orderStats.total) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" :style="{ width: Math.round((orderStats.completed / orderStats.total) * 100) + '%' }"></div>
              </div>
              
              <div class="flex justify-between items-center pt-2">
                <span class="text-gray-700">Giá trị đơn trung bình</span>
                <span class="font-semibold text-gray-900">₫{{ orderStats.avgValue.toLocaleString('vi-VN') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Report -->
      <div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <h3 class="text-lg font-semibold text-gray-900">Báo cáo khách hàng</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-2xl font-bold text-indigo-600">{{ customerStats.total }}</div>
                <div class="text-sm text-gray-600">Tổng khách hàng</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">{{ customerStats.new }}</div>
                <div class="text-sm text-gray-600">Khách hàng mới</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">{{ customerStats.returning }}</div>
                <div class="text-sm text-gray-600">Khách quay lại</div>
              </div>
              <div class="text-center p-4 bg-yellow-50 rounded-lg">
                <div class="text-2xl font-bold text-yellow-600">{{ customerStats.active }}</div>
                <div class="text-sm text-gray-600">Đang hoạt động</div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">Tỷ lệ khách quay lại</span>
                <span class="font-semibold text-gray-900">{{ Math.round((customerStats.returning / customerStats.total) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: Math.round((customerStats.returning / customerStats.total) * 100) + '%' }"></div>
              </div>
              
              <div class="flex justify-between items-center pt-2">
                <span class="text-gray-700">Chi tiêu trung bình/khách</span>
                <span class="font-semibold text-gray-900">₫{{ customerStats.avgSpending.toLocaleString('vi-VN') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
          <button class="inline-flex items-center px-3 py-1.5 text-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
            Xem tất cả
          </button>
        </div>
      </div>
      <div class="overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="activity in recentActivities" :key="activity.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDateTime(activity.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getActivityClass(activity.type)">
                    {{ activity.type_text }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ activity.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <span v-if="activity.value" class="text-sm font-semibold text-gray-900">
                    ₫{{ activity.value.toLocaleString('vi-VN') }}
                  </span>
                  <span v-else class="text-sm text-gray-500">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const selectedPeriod = ref('30 ngày qua')
const chartPeriod = ref('day')

const revenueStats = [
  {
    icon: 'fas fa-dollar-sign',
    value: '₫128.5M',
    label: 'Doanh thu',
    change: '+12.5%',
    changeClass: 'text-green-600',
    changeIcon: 'fas fa-arrow-up'
  },
  {
    icon: 'fas fa-shopping-cart',
    value: '2,156',
    label: 'Đơn hàng',
    change: '+8.3%',
    changeClass: 'text-green-600',
    changeIcon: 'fas fa-arrow-up'
  },
  {
    icon: 'fas fa-users',
    value: '1,823',
    label: 'Khách hàng',
    change: '+15.7%',
    changeClass: 'text-green-600',
    changeIcon: 'fas fa-arrow-up'
  },
  {
    icon: 'fas fa-percentage',
    value: '3.2%',
    label: 'Tỷ lệ chuyển đổi',
    change: '-2.1%',
    changeClass: 'text-red-600',
    changeIcon: 'fas fa-arrow-down'
  }
]

const topProducts = [
  { name: 'iPhone 15 Pro Max', sold: 125, revenue: 4123750000 },
  { name: 'MacBook Air M2', sold: 89, revenue: 2313110000 },
  { name: 'AirPods Pro 2', sold: 234, revenue: 1167660000 },
  { name: 'iPad Pro 11"', sold: 67, revenue: 1339330000 },
  { name: 'Apple Watch Series 9', sold: 156, revenue: 1559220000 }
]

const orderStats = {
  total: 2156,
  completed: 1834,
  pending: 234,
  cancelled: 88,
  avgValue: 2850000
}

const customerStats = {
  total: 1823,
  new: 245,
  returning: 987,
  active: 1456,
  avgSpending: 4250000
}

const recentActivities = [
  {
    id: 1,
    type: 'order',
    type_text: 'Đơn hàng',
    description: 'Đơn hàng mới #ORD12345 từ Nguyễn Văn A',
    value: 2500000,
    created_at: '2024-10-07T14:30:00Z'
  },
  {
    id: 2,
    type: 'product',
    type_text: 'Sản phẩm',
    description: 'Thêm sản phẩm mới: iPhone 15 Pro Max',
    value: null,
    created_at: '2024-10-07T13:15:00Z'
  },
  {
    id: 3,
    type: 'customer',
    type_text: 'Khách hàng',
    description: 'Khách hàng mới đăng ký: tranthib@email.com',
    value: null,
    created_at: '2024-10-07T12:45:00Z'
  },
  {
    id: 4,
    type: 'payment',
    type_text: 'Thanh toán',
    description: 'Thanh toán thành công cho đơn hàng #ORD12340',
    value: 1850000,
    created_at: '2024-10-07T11:20:00Z'
  }
]

function changePeriod() {
  Swal.fire({ 
    icon: 'info', 
    title: `Đã chuyển sang kỳ: ${selectedPeriod.value}`, 
    timer: 1000, 
    showConfirmButton: false 
  })
}

function refreshData() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã làm mới dữ liệu', 
    timer: 1000, 
    showConfirmButton: false 
  })
}

function exportReport() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đang xuất báo cáo PDF...', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function getActivityClass(type) {
  const classes = {
    order: 'bg-blue-100 text-blue-800',
    product: 'bg-green-100 text-green-800',
    customer: 'bg-purple-100 text-purple-800',
    payment: 'bg-yellow-100 text-yellow-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Custom animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover {
  animation: slideUp 0.3s ease;
}
</style>