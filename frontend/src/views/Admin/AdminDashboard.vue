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
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Doanh thu tháng</p>
            <p class="text-2xl font-bold">₫128.5M</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-arrow-up text-xs mr-1"></i>
              <span class="text-xs text-blue-100">+12.5% so với tháng trước</span>
            </div>
          </div>
          <div class="bg-blue-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-dollar-sign text-2xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Đơn hàng</p>
            <p class="text-2xl font-bold">156</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-arrow-up text-xs mr-1"></i>
              <span class="text-xs text-green-100">+8.2% từ tuần trước</span>
            </div>
          </div>
          <div class="bg-green-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-shopping-cart text-2xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Khách truy cập</p>
            <p class="text-2xl font-bold">2,341</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-arrow-up text-xs mr-1"></i>
              <span class="text-xs text-purple-100">+23.1% hôm nay</span>
            </div>
          </div>
          <div class="bg-purple-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-users text-2xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg text-white p-6 transform hover:scale-105 transition-all duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">Sản phẩm</p>
            <p class="text-2xl font-bold">189</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-arrow-up text-xs mr-1"></i>
              <span class="text-xs text-orange-100">+5 sản phẩm mới</span>
            </div>
          </div>
          <div class="bg-orange-400 bg-opacity-30 rounded-lg p-3">
            <i class="fas fa-box text-2xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders & Quick Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Recent Orders -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h3>
              <p class="text-sm text-gray-500">Theo dõi các đơn hàng mới nhất</p>
            </div>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium">
              <i class="fas fa-file-export mr-2"></i>Xuất tất cả
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn hàng</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#ORD-0001</div>
                  <div class="text-sm text-gray-500">Hôm nay, 14:30</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-blue-600">NA</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">Nguyễn Văn A</div>
                      <div class="text-sm text-gray-500">nguyenvana@email.com</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">₫5,200,000</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                    Đã thanh toán
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <button class="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200">
                    <i class="fas fa-eye text-sm"></i>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#ORD-0002</div>
                  <div class="text-sm text-gray-500">Hôm nay, 12:15</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-purple-600">TB</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">Trần Thị B</div>
                      <div class="text-sm text-gray-500">tranthib@email.com</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">₫3,150,000</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></span>
                    Đang xử lý
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <button class="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200">
                    <i class="fas fa-eye text-sm"></i>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#ORD-0003</div>
                  <div class="text-sm text-gray-500">Hôm qua, 16:45</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-green-600">LC</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">Lê Văn C</div>
                      <div class="text-sm text-gray-500">levanc@email.com</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">₫1,990,000</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
                    Chờ thanh toán
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <button class="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200">
                    <i class="fas fa-eye text-sm"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-6 border-t border-gray-200 bg-gray-50">
          <div class="text-center">
            <button class="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Xem tất cả đơn hàng <i class="fas fa-arrow-right ml-1"></i>
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
            <button class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-left transition-all duration-200">
              <i class="fas fa-plus mr-3"></i>Thêm sản phẩm mới
            </button>
            <button class="w-full bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-left transition-all duration-200">
              <i class="fas fa-user-plus mr-3"></i>Thêm khách hàng
            </button>
            <button class="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-left transition-all duration-200">
              <i class="fas fa-chart-line mr-3"></i>Xem báo cáo
            </button>
            <button class="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 p-3 rounded-lg text-left transition-all duration-200">
              <i class="fas fa-cog mr-3"></i>Cài đặt hệ thống
            </button>
          </div>
        </div>

        <!-- Top Products -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Sản phẩm bán chạy</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-mobile-alt text-blue-600"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">iPhone 15 Pro</div>
                  <div class="text-xs text-gray-500">45 đã bán</div>
                </div>
              </div>
              <div class="text-sm font-semibold text-gray-900">₫32M</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-laptop text-green-600"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">MacBook Air</div>
                  <div class="text-xs text-gray-500">32 đã bán</div>
                </div>
              </div>
              <div class="text-sm font-semibold text-gray-900">₫26M</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-headphones text-purple-600"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">AirPods Pro</div>
                  <div class="text-xs text-gray-500">28 đã bán</div>
                </div>
              </div>
              <div class="text-sm font-semibold text-gray-900">₫5M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

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
