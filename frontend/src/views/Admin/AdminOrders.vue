<template>
  <div class="admin-orders">
    <!-- Enhanced Header -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-shopping-cart text-white"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
              <p class="text-gray-500">Theo dõi và xử lý đơn hàng từ khách hàng</p>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <!-- Quick Stats -->
          <div class="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
            <i class="fas fa-chart-line text-blue-600 mr-2"></i>
            <span class="text-sm font-medium text-blue-700">{{ filteredOrders.length }} đơn hàng</span>
          </div>
          
          <!-- Action Buttons -->
          <button @click="exportOrders" 
                  class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
            <i class="fas fa-file-excel mr-2"></i>Xuất Excel
          </button>
          
          <button @click="toggleFilters" 
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors">
            <i class="fas fa-filter mr-2"></i>Bộ lọc
            <i class="fas fa-chevron-down ml-1 text-xs" :class="{ 'rotate-180': showFilters }"></i>
          </button>
        </div>
      </div>
      
      <!-- Enhanced Filters -->
      <div v-show="showFilters" class="mt-4 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <div class="relative">
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input v-model="searchQuery" 
                     type="text" 
                     class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     placeholder="Mã đơn, tên khách hàng...">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select v-model="filter.status" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đã giao hàng</option>
              <option value="delivered">Đã nhận</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
            <input v-model="filter.dateFrom" 
                   type="date" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
            <input v-model="filter.dateTo" 
                   type="date" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div v-for="(stat, idx) in stats" :key="idx" 
           class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value.toLocaleString() }}</p>
            <div class="flex items-center mt-2">
              <span class="text-sm text-green-600 flex items-center">
                <i class="fas fa-arrow-up text-xs mr-1"></i>
                +12%
              </span>
              <span class="text-sm text-gray-500 ml-2">so với tháng trước</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center"
               :class="{
                 'bg-blue-100': idx === 0,
                 'bg-yellow-100': idx === 1, 
                 'bg-cyan-100': idx === 2,
                 'bg-green-100': idx === 3
               }">
            <i :class="[stat.icon, 'text-lg', {
                 'text-blue-600': idx === 0,
                 'text-yellow-600': idx === 1,
                 'text-cyan-600': idx === 2, 
                 'text-green-600': idx === 3
               }]"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Orders Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Danh sách đơn hàng</h3>
            <p class="text-sm text-gray-500 mt-1">Quản lý và theo dõi tất cả đơn hàng</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {{ filteredOrders.length }} đơn hàng
            </span>
            <div class="flex items-center space-x-1">
              <button class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <i class="fas fa-th"></i>
              </button>
              <button class="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn hàng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id" 
                class="hover:bg-gray-50 transition-colors duration-200">
              <!-- Checkbox -->
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              </td>
              
              <!-- Order Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <i class="fas fa-receipt text-white text-sm"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">#{{ order.order_number }}</div>
                    <div class="text-sm text-gray-500">ID: {{ order.id }}</div>
                  </div>
                </div>
              </td>
              
              <!-- Customer Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-medium">{{ order.customer_name }}</div>
                <div class="text-sm text-gray-500">{{ order.customer_email }}</div>
              </td>
              
              <!-- Date -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(order.created_at) }}</div>
                <div class="text-sm text-gray-500">{{ getTimeAgo(order.created_at) }}</div>
              </td>
              
              <!-- Products -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.items_count }} sản phẩm</div>
                <div class="text-sm text-gray-500">{{ order.total_quantity }} món</div>
              </td>
              
              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-yellow-100 text-yellow-800': order.status === 'pending',
                        'bg-blue-100 text-blue-800': order.status === 'processing',
                        'bg-purple-100 text-purple-800': order.status === 'shipped',
                        'bg-green-100 text-green-800': order.status === 'delivered',
                        'bg-red-100 text-red-800': order.status === 'cancelled'
                      }">
                  <div class="w-1.5 h-1.5 rounded-full mr-1.5"
                       :class="{
                         'bg-yellow-400': order.status === 'pending',
                         'bg-blue-400': order.status === 'processing',
                         'bg-purple-400': order.status === 'shipped',
                         'bg-green-400': order.status === 'delivered',
                         'bg-red-400': order.status === 'cancelled'
                       }"></div>
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              
              <!-- Total Amount -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">
                  ₫{{ Number(order.total_amount).toLocaleString('vi-VN') }}
                </div>
                <div class="text-sm text-gray-500">{{ order.payment_method }}</div>
              </td>
              
              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="viewDetails(order)" 
                          class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Xem chi tiết">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button @click="updateStatus(order)" 
                          class="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                          title="Cập nhật trạng thái">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="printOrder(order)" 
                          class="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-colors"
                          title="In đơn hàng">
                    <i class="fas fa-print"></i>
                  </button>
                  <button @click="trackOrder(order)" 
                          class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                          title="Theo dõi đơn hàng">
                    <i class="fas fa-truck"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center text-sm text-gray-700">
            Hiển thị <span class="font-medium">1</span> đến <span class="font-medium">10</span> 
            trong tổng số <span class="font-medium">{{ filteredOrders.length }}</span> đơn hàng
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
              Trước
            </button>
            <button class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium">1</button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">2</button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">3</button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <Transition name="modal" appear>
      <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeDetailsModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full" @click.stop>
          <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h5 class="text-lg font-semibold text-gray-900">Chi tiết đơn hàng #{{ selectedOrder?.order_number }}</h5>
            <button type="button" @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="p-6" v-if="selectedOrder">
            <div class="flex flex-wrap g-4">
              <!-- Customer Info -->
              <div class="md:w-1/2">
                <h6 class="mb-3">Thông tin khách hàng</h6>
                <div class="mb-2">
                  <strong>Tên:</strong> {{ selectedOrder.customer_name }}
                </div>
                <div class="mb-2">
                  <strong>Email:</strong> {{ selectedOrder.customer_email }}
                </div>
                <div class="mb-2">
                  <strong>SĐT:</strong> {{ selectedOrder.customer_phone }}
                </div>
                <div class="mb-2">
                  <strong>Địa chỉ:</strong><br>
                  {{ selectedOrder.shipping_address }}
                </div>
              </div>

              <!-- Order Info -->
              <div class="md:w-1/2">
                <h6 class="mb-3">Thông tin đơn hàng</h6>
                <div class="mb-2">
                  <strong>Ngày đặt:</strong> {{ formatDate(selectedOrder.created_at) }}
                </div>
                <div class="mb-2">
                  <strong>Trạng thái:</strong>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ms-2" :class="getStatusClass(selectedOrder.status)">
                    {{ getStatusText(selectedOrder.status) }}
                  </span>
                </div>
                <div class="mb-2">
                  <strong>Phương thức thanh toán:</strong> {{ selectedOrder.payment_method }}
                </div>
                <div class="mb-2">
                  <strong>Ghi chú:</strong> {{ selectedOrder.note || 'Không có' }}
                </div>
              </div>

              <!-- Order Items -->
              <div class="w-full">
                <h6 class="mb-3">Sản phẩm trong đơn hàng</h6>
                <div class="overflow-x-auto">
                  <table class="w-full table-sm">
                    <thead class="table-light">
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selectedOrder.items" :key="item.id">
                        <td>{{ item.product_name }}</td>
                        <td>₫{{ Number(item.price).toLocaleString('vi-VN') }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>₫{{ Number(item.total).toLocaleString('vi-VN') }}</td>
                      </tr>
                    </tbody>
                    <tfoot class="table-light">
                      <tr>
                        <td colspan="3" class="text-end"><strong>Tổng cộng:</strong></td>
                        <td><strong>₫{{ Number(selectedOrder.total_amount).toLocaleString('vi-VN') }}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300" @click="closeDetailsModal">Đóng</button>
            <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white" @click="printOrder(selectedOrder)">
              <i class="fas fa-print me-2"></i>In đơn hàng
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Update Status Modal -->
    <Transition name="modal" appear>
      <div v-if="showStatusModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeStatusModal">
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full" @click.stop>
          <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h5 class="text-lg font-semibold text-gray-900">Cập nhật trạng thái đơn hàng</h5>
            <button type="button" @click="closeStatusModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="saveStatus">
            <div class="p-6">
              <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">Đơn hàng:</label>
                <div class="font-semibold">#{{ selectedOrder?.order_number }} - {{ selectedOrder?.customer_name }}</div>
              </div>
              <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái mới</label>
                <select v-model="statusForm.status" class="form-select" required>
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đã giao hàng</option>
                  <option value="delivered">Đã nhận</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">Ghi chú (tùy chọn)</label>
                <textarea v-model="statusForm.note" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="Thêm ghi chú về việc thay đổi trạng thái..."></textarea>
              </div>
            </div>
            <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300" @click="closeStatusModal">Hủy</button>
              <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const stats = [
  { icon:'fas fa-shopping-cart', iconClass:'text-primary', value: 156, label:'Tổng đơn hàng' },
  { icon:'fas fa-clock', iconClass:'text-warning', value: 23, label:'Chờ xử lý' },
  { icon:'fas fa-truck', iconClass:'text-info', value: 45, label:'Đang giao' },
  { icon:'fas fa-check-circle', iconClass:'text-success', value: 88, label:'Đã hoàn thành' },
]

const orders = ref([
  {
    id: 1,
    order_number: 'ORD001',
    customer_name: 'Nguyễn Văn A',
    customer_email: 'nguyenvana@email.com',
    customer_phone: '0987654321',
    shipping_address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    created_at: '2024-10-07T10:30:00Z',
    items_count: 3,
    total_quantity: 5,
    total_amount: 2500000,
    status: 'pending',
    payment_method: 'COD',
    note: 'Giao hàng vào buổi sáng',
    items: [
      { id: 1, product_name: 'iPhone 15 Pro Max', price: 32990000, quantity: 1, total: 32990000 },
      { id: 2, product_name: 'AirPods Pro 2', price: 4990000, quantity: 2, total: 9980000 },
    ]
  },
  {
    id: 2,
    order_number: 'ORD002',
    customer_name: 'Trần Thị B',
    customer_email: 'tranthib@email.com',
    customer_phone: '0912345678',
    shipping_address: '456 Đường DEF, Phường MNO, Quận 3, TP.HCM',
    created_at: '2024-10-06T14:15:00Z',
    items_count: 2,
    total_quantity: 3,
    total_amount: 1800000,
    status: 'processing',
    payment_method: 'Bank Transfer',
    note: '',
    items: [
      { id: 3, product_name: 'MacBook Air M2', price: 25990000, quantity: 1, total: 25990000 },
    ]
  },
  {
    id: 3,
    order_number: 'ORD003',
    customer_name: 'Lê Văn C',
    customer_email: 'levanc@email.com',
    customer_phone: '0934567890',
    shipping_address: '789 Đường GHI, Phường PQR, Quận 7, TP.HCM',
    created_at: '2024-10-05T09:20:00Z',
    items_count: 1,
    total_quantity: 2,
    total_amount: 950000,
    status: 'shipped',
    payment_method: 'Credit Card',
    note: 'Khách hàng VIP',
    items: [
      { id: 4, product_name: 'iPad Pro 11"', price: 19990000, quantity: 1, total: 19990000 },
    ]
  }
])

const filter = ref({
  status: '',
  dateFrom: '',
  dateTo: ''
})

const searchQuery = ref('')
const showFilters = ref(false)
const selectedOrder = ref(null)
const statusForm = ref({
  status: '',
  note: ''
})

// Modal visibility states
const showDetailsModal = ref(false)
const showStatusModal = ref(false)

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (filter.value.status && order.status !== filter.value.status) return false
    if (filter.value.dateFrom && new Date(order.created_at) < new Date(filter.value.dateFrom)) return false
    if (filter.value.dateTo && new Date(order.created_at) > new Date(filter.value.dateTo + 'T23:59:59')) return false
    return true
  })
})

function getStatusClass(status) {
  const classes = {
    pending: 'badge-soft-warning',
    processing: 'badge-soft-info', 
    shipped: 'badge-soft-primary',
    delivered: 'badge-soft-success',
    cancelled: 'badge-soft-danger'
  }
  return classes[status] || 'badge-soft-secondary'
}

function getStatusText(status) {
  const texts = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đã giao hàng', 
    delivered: 'Đã nhận',
    cancelled: 'Đã hủy'
  }
  return texts[status] || 'Không xác định'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function viewDetails(order) {
  selectedOrder.value = { ...order }
  showDetailsModal.value = true
}

function closeDetailsModal() {
  showDetailsModal.value = false
  selectedOrder.value = null
}

function updateStatus(order) {
  selectedOrder.value = { ...order }
  statusForm.value.status = order.status
  statusForm.value.note = ''
  showStatusModal.value = true
}

function closeStatusModal() {
  showStatusModal.value = false
  selectedOrder.value = null
  statusForm.value.status = ''
  statusForm.value.note = ''
}

function saveStatus() {
  const idx = orders.value.findIndex(x => x.id === selectedOrder.value.id)
  if (idx > -1) {
    orders.value[idx].status = statusForm.value.status
    Swal.fire({ 
      icon: 'success', 
      title: 'Đã cập nhật trạng thái đơn hàng', 
      timer: 1500, 
      showConfirmButton: false 
    })
  }
  closeStatusModal()
}

function printOrder(order) {
  Swal.fire({ 
    icon: 'info', 
    title: 'Đang chuẩn bị in đơn hàng...', 
    text: `Đơn hàng #${order.order_number}`,
    timer: 1500, 
    showConfirmButton: false 
  })
}

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function getTimeAgo(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Hôm nay'
  if (days === 1) return 'Hôm qua'
  if (days < 7) return `${days} ngày trước`
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`
  return `${Math.floor(days / 30)} tháng trước`
}

function trackOrder(order) {
  Swal.fire({
    icon: 'info',
    title: 'Theo dõi đơn hàng',
    text: `Đang theo dõi đơn hàng #${order.order_number}`,
    timer: 2000,
    showConfirmButton: false
  })
}

function exportOrders() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đang xuất file Excel...', 
    timer: 1500, 
    showConfirmButton: false 
  })
}
</script>

<style scoped>
.badge-soft-success {
  background-color: #d1e7dd;
  color: #0f5132;
}

.badge-soft-warning {
  background-color: #fff3cd;
  color: #664d03;
}

.badge-soft-info {
  background-color: #d1ecf1;
  color: #055160;
}

.badge-soft-primary {
  background-color: #cfe2ff;
  color: #084298;
}

.badge-soft-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.badge-soft-secondary {
  background-color: #e2e3e5;
  color: #41464b;
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>