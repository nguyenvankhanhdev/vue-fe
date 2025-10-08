<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <i class="fas fa-shopping-bag text-2xl"></i>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Đơn hàng của tôi
          </h1>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Theo dõi và quản lý các đơn hàng của bạn một cách dễ dàng
          </p>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-float"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-float-delay"></div>
      <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-float"></div>
    </section>

    <!-- Orders Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Order Filters -->
        <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm border border-blue-100/50">
          <div class="flex flex-wrap gap-3 mb-6">
            <button 
              v-for="status in orderStatuses" 
              :key="status.key"
              @click="activeFilter = status.key"
              :class="activeFilter === status.key ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'"
              class="px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
            >
              {{ status.label }}
              <span v-if="getOrderCount(status.key) > 0" 
                :class="activeFilter === status.key ? 'bg-white/20' : 'bg-blue-100 text-blue-600'"
                class="px-2 py-0.5 rounded-full text-xs font-semibold">
                {{ getOrderCount(status.key) }}
              </span>
            </button>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Tìm kiếm đơn hàng..."
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <select v-model="sortBy" class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 font-medium">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="highest">Giá trị cao nhất</option>
              <option value="lowest">Giá trị thấp nhất</option>
            </select>
          </div>
        </div>

        <!-- Orders List -->
        <div>
          <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p class="text-gray-600 font-medium">Đang tải đơn hàng...</p>
          </div>

          <div v-else-if="filteredOrders.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <i class="fas fa-shopping-bag text-3xl text-blue-600"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Không có đơn hàng nào</h3>
            <p class="text-gray-600 mb-6 max-w-md">{{ getEmptyMessage() }}</p>
            <router-link to="/products" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <i class="fas fa-shopping-cart mr-2"></i>
              Tiếp tục mua sắm
            </router-link>
          </div>

          <div v-else class="space-y-6">
            <div 
              v-for="order in filteredOrders" 
              :key="order.id"
              class="bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              :class="{
                'border-l-yellow-500': order.status === 'pending',
                'border-l-blue-500': order.status === 'confirmed',
                'border-l-purple-500': order.status === 'shipping',
                'border-l-green-500': order.status === 'delivered',
                'border-l-red-500': order.status === 'cancelled'
              }"
            >
              <!-- Order Header -->
              <div class="flex flex-col lg:flex-row lg:items-center justify-between p-6 border-b border-gray-100">
                <div class="mb-4 lg:mb-0">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">Đơn hàng #{{ order.orderNumber }}</h3>
                  <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span class="flex items-center gap-1">
                      <i class="fas fa-calendar text-blue-500"></i>
                      {{ formatDate(order.createdAt) }}
                    </span>
                    <span class="flex items-center gap-1 font-semibold text-blue-600">
                      <i class="fas fa-money-bill-wave text-blue-500"></i>
                      {{ formatPrice(order.total) }}đ
                    </span>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    :class="{
                      'bg-yellow-500': order.status === 'pending',
                      'bg-blue-500': order.status === 'confirmed', 
                      'bg-purple-500': order.status === 'shipping',
                      'bg-green-500': order.status === 'delivered',
                      'bg-red-500': order.status === 'cancelled'
                    }"
                  >
                    {{ getStatusLabel(order.status) }}
                  </span>
                  <button 
                    @click="toggleOrderDetails(order)" 
                    class="p-2 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <i :class="order.showDetails ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                  </button>
                </div>
              </div>

              <!-- Order Items Preview -->
              <div class="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-4">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <div 
                      v-for="(item, index) in order.items.slice(0, 3)" 
                      :key="item.id"
                      class="w-12 h-12 rounded-lg overflow-hidden shadow-sm"
                    >
                      <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    </div>
                    <div v-if="order.items.length > 3" class="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                      +{{ order.items.length - 3 }}
                    </div>
                  </div>
                  
                  <p class="text-sm text-gray-600 font-medium">{{ order.items.length }} sản phẩm</p>
                </div>
                
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-if="canTrackOrder(order)"
                    @click="trackOrder(order)"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <i class="fas fa-truck"></i>
                    Theo dõi
                  </button>
                  <button 
                    v-if="canReorder(order)"
                    @click="reorder(order)"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <i class="fas fa-redo"></i>
                    Mua lại
                  </button>
                  <button 
                    v-if="canCancel(order)"
                    @click="cancelOrder(order)"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <i class="fas fa-times"></i>
                    Hủy
                  </button>
                  <button 
                    v-if="canReview(order)"
                    @click="reviewOrder(order)"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <i class="fas fa-star"></i>
                    Đánh giá
                  </button>
                </div>
              </div>

              <!-- Order Details (Expanded) -->
              <div v-if="order.showDetails" class="border-t border-gray-100 bg-gray-50/50 p-6 space-y-6">
                <!-- Shipping Info -->
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-shipping-fast text-blue-600"></i>
                    Thông tin giao hàng
                  </h4>
                  <div class="bg-white rounded-xl p-4 space-y-3 shadow-sm border border-gray-100">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <p class="flex items-center gap-2">
                        <span class="font-semibold text-gray-700">Người nhận:</span> 
                        <span class="text-gray-600">{{ order.shipping.name }}</span>
                      </p>
                      <p class="flex items-center gap-2">
                        <span class="font-semibold text-gray-700">Số điện thoại:</span> 
                        <span class="text-gray-600">{{ order.shipping.phone }}</span>
                      </p>
                      <p class="flex items-start gap-2 md:col-span-2">
                        <span class="font-semibold text-gray-700">Địa chỉ:</span> 
                        <span class="text-gray-600">{{ order.shipping.address }}</span>
                      </p>
                      <p class="flex items-center gap-2">
                        <span class="font-semibold text-gray-700">Phương thức:</span> 
                        <span class="text-gray-600">{{ order.shipping.method }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Order Timeline -->
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-clock text-blue-600"></i>
                    Trạng thái đơn hàng
                  </h4>
                  <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div class="space-y-4">
                      <div 
                        v-for="(event, index) in order.timeline" 
                        :key="event.id"
                        class="relative flex gap-4"
                        :class="{ 'pb-4': index < order.timeline.length - 1 }"
                      >
                        <div class="flex flex-col items-center">
                          <div 
                            :class="event.completed ? 'bg-green-500 ring-green-200' : 'bg-gray-300 ring-gray-200'"
                            class="w-4 h-4 rounded-full ring-4 ring-offset-2"
                          ></div>
                          <div 
                            v-if="index < order.timeline.length - 1"
                            :class="event.completed ? 'bg-green-200' : 'bg-gray-200'"
                            class="w-0.5 h-full mt-2"
                          ></div>
                        </div>
                        <div class="flex-1 min-w-0 pb-4">
                          <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div class="font-semibold text-gray-800 mb-1">{{ event.title }}</div>
                            <div class="text-sm text-gray-500 mb-2">{{ formatDateTime(event.time) }}</div>
                            <div v-if="event.note" class="text-sm text-gray-600 italic">{{ event.note }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Items -->
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-box text-blue-600"></i>
                    Chi tiết sản phẩm
                  </h4>
                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    <div 
                      v-for="item in order.items" 
                      :key="item.id"
                      class="flex items-center gap-4 p-4"
                    >
                      <div class="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h5 class="font-semibold text-gray-800 mb-2">{{ item.name }}</h5>
                        <div class="flex gap-4 text-sm text-gray-600 mb-1">
                          <span v-if="item.size">Size: {{ item.size }}</span>
                          <span v-if="item.color">Màu: {{ item.color }}</span>
                        </div>
                        <div class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</div>
                      </div>
                      <div class="text-lg font-bold text-blue-600">
                        {{ formatPrice(item.price * item.quantity) }}đ
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Totals -->
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-calculator text-blue-600"></i>
                    Tổng tiền
                  </h4>
                  <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div class="flex justify-between items-center text-gray-700">
                      <span>Tạm tính:</span>
                      <span class="font-semibold">{{ formatPrice(order.subtotal) }}đ</span>
                    </div>
                    <div v-if="order.discount > 0" class="flex justify-between items-center text-green-600">
                      <span>Giảm giá:</span>
                      <span class="font-semibold">-{{ formatPrice(order.discount) }}đ</span>
                    </div>
                    <div class="flex justify-between items-center text-gray-700">
                      <span>Phí vận chuyển:</span>
                      <span class="font-semibold">{{ order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee) + 'đ' }}</span>
                    </div>
                    <div class="flex justify-between items-center pt-3 border-t-2 border-blue-600 text-lg font-bold text-blue-600">
                      <span>Tổng cộng:</span>
                      <span>{{ formatPrice(order.total) }}đ</span>
                    </div>
                  </div>
                </div>

                <!-- Payment Info -->
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-credit-card text-blue-600"></i>
                    Thông tin thanh toán
                  </h4>
                  <div class="bg-white rounded-xl p-4 space-y-3 shadow-sm border border-gray-100">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <p class="flex items-center gap-2">
                        <span class="font-semibold text-gray-700">Phương thức:</span> 
                        <span class="text-gray-600">{{ order.payment.method }}</span>
                      </p>
                      <p class="flex items-center gap-2">
                        <span class="font-semibold text-gray-700">Trạng thái:</span> 
                        <span 
                          class="px-2 py-1 rounded-full text-xs font-semibold"
                          :class="{
                            'bg-green-100 text-green-700': order.payment.status === 'paid',
                            'bg-yellow-100 text-yellow-700': order.payment.status === 'pending',
                            'bg-red-100 text-red-700': order.payment.status === 'failed',
                            'bg-blue-100 text-blue-700': order.payment.status === 'refunded'
                          }"
                        >
                          {{ getPaymentStatusLabel(order.payment.status) }}
                        </span>
                      </p>
                      <p v-if="order.payment.transactionId" class="flex items-center gap-2 md:col-span-2">
                        <span class="font-semibold text-gray-700">Mã giao dịch:</span> 
                        <span class="text-gray-600 font-mono text-xs">{{ order.payment.transactionId }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
          <button 
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            :class="currentPage === page ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'"
            class="px-4 py-2 rounded-lg border border-gray-200 font-medium transition-all duration-200 min-w-[40px]"
          >
            {{ page }}
          </button>
          
          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <i class="fas fa-angle-right"></i>
          </button>
          <button 
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const loading = ref(true)
const orders = ref([])
const activeFilter = ref('all')
const searchQuery = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const ordersPerPage = 10

const orderStatuses = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ xác nhận' },
  { key: 'confirmed', label: 'Đã xác nhận' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Đã giao' },
  { key: 'cancelled', label: 'Đã hủy' }
]

// Computed properties
const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  // Filter by status
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(order => order.status === activeFilter.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.orderNumber.toLowerCase().includes(query) ||
      order.items.some(item => item.name.toLowerCase().includes(query))
    )
  }

  // Sort orders
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'highest':
      filtered.sort((a, b) => b.total - a.total)
      break
    case 'lowest':
      filtered.sort((a, b) => a.total - b.total)
      break
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / ordersPerPage))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('vi-VN')
}

const getOrderCount = (status) => {
  if (status === 'all') return orders.value.length
  return orders.value.filter(order => order.status === status).length
}

const getStatusLabel = (status) => {
  const statusMap = {
    'pending': 'Chờ xác nhận',
    'confirmed': 'Đã xác nhận',
    'shipping': 'Đang giao',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy'
  }
  return statusMap[status] || status
}

const getPaymentStatusLabel = (status) => {
  const statusMap = {
    'pending': 'Chờ thanh toán',
    'paid': 'Đã thanh toán',
    'failed': 'Thanh toán thất bại',
    'refunded': 'Đã hoàn tiền'
  }
  return statusMap[status] || status
}

const getEmptyMessage = () => {
  const messages = {
    'all': 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!',
    'pending': 'Không có đơn hàng nào đang chờ xác nhận.',
    'confirmed': 'Không có đơn hàng nào đã được xác nhận.',
    'shipping': 'Không có đơn hàng nào đang được giao.',
    'delivered': 'Không có đơn hàng nào đã được giao.',
    'cancelled': 'Không có đơn hàng nào đã bị hủy.'
  }
  return messages[activeFilter.value] || 'Không có đơn hàng nào.'
}

const toggleOrderDetails = (order) => {
  order.showDetails = !order.showDetails
}

const canTrackOrder = (order) => {
  return ['confirmed', 'shipping'].includes(order.status)
}

const canReorder = (order) => {
  return ['delivered', 'cancelled'].includes(order.status)
}

const canCancel = (order) => {
  return ['pending', 'confirmed'].includes(order.status)
}

const canReview = (order) => {
  return order.status === 'delivered' && !order.reviewed
}

const trackOrder = (order) => {
  alert(`Theo dõi đơn hàng #${order.orderNumber}`)
  // Implement order tracking functionality
}

const reorder = (order) => {
  // Add all items from this order to cart
  console.log('Reorder:', order)
  alert('Đã thêm sản phẩm vào giỏ hàng!')
  router.push('/cart')
}

const cancelOrder = (order) => {
  if (confirm(`Bạn có chắc muốn hủy đơn hàng #${order.orderNumber}?`)) {
    order.status = 'cancelled'
    
    // Add cancelled event to timeline
    order.timeline.unshift({
      id: Date.now(),
      title: 'Đơn hàng đã bị hủy',
      time: new Date().toISOString(),
      completed: true,
      note: 'Đơn hàng đã được hủy theo yêu cầu của khách hàng'
    })
    
    alert('Đơn hàng đã được hủy thành công!')
  }
}

const reviewOrder = (order) => {
  alert(`Đánh giá đơn hàng #${order.orderNumber}`)
  // Implement review functionality
}

// Load data on mount
onMounted(async () => {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock orders data
    orders.value = [
      {
        id: 1,
        orderNumber: 'VH001234',
        status: 'delivered',
        createdAt: '2024-01-20T10:30:00Z',
        subtotal: 2590000,
        discount: 259000,
        shippingFee: 0,
        total: 2331000,
        reviewed: false,
        showDetails: false,
        shipping: {
          name: 'Nguyễn Văn A',
          phone: '0123456789',
          address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
          method: 'Giao hàng tiêu chuẩn'
        },
        payment: {
          method: 'Thanh toán khi nhận hàng',
          status: 'paid',
          transactionId: 'TXN123456789'
        },
        items: [
          {
            id: 1,
            name: 'Smartphone XYZ Pro',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100',
            price: 1299000,
            quantity: 2,
            size: '256GB',
            color: 'Đen'
          }
        ],
        timeline: [
          {
            id: 1,
            title: 'Đơn hàng đã được giao thành công',
            time: '2024-01-22T14:30:00Z',
            completed: true,
            note: 'Giao hàng thành công, khách hàng đã ký nhận'
          },
          {
            id: 2,
            title: 'Đơn hàng đang được giao',
            time: '2024-01-22T08:00:00Z',
            completed: true
          },
          {
            id: 3,
            title: 'Đơn hàng đã được xác nhận',
            time: '2024-01-20T11:00:00Z',
            completed: true
          },
          {
            id: 4,
            title: 'Đơn hàng đã được đặt',
            time: '2024-01-20T10:30:00Z',
            completed: true
          }
        ]
      },
      {
        id: 2,
        orderNumber: 'VH001235',
        status: 'shipping',
        createdAt: '2024-01-25T15:20:00Z',
        subtotal: 890000,
        discount: 0,
        shippingFee: 30000,
        total: 920000,
        reviewed: false,
        showDetails: false,
        shipping: {
          name: 'Trần Thị B',
          phone: '0987654321',
          address: '456 Đường DEF, Phường 2, Quận 3, TP.HCM',
          method: 'Giao hàng nhanh'
        },
        payment: {
          method: 'Thẻ tín dụng',
          status: 'paid'
        },
        items: [
          {
            id: 2,
            name: 'Giày sneaker thể thao',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100',
            price: 890000,
            quantity: 1,
            size: '42',
            color: 'Trắng'
          }
        ],
        timeline: [
          {
            id: 1,
            title: 'Đơn hàng đang được giao',
            time: '2024-01-26T09:00:00Z',
            completed: true,
            note: 'Đơn hàng đang trên đường giao đến địa chỉ của bạn'
          },
          {
            id: 2,
            title: 'Đơn hàng đã được xác nhận',
            time: '2024-01-25T16:00:00Z',
            completed: true
          },
          {
            id: 3,
            title: 'Đơn hàng đã được đặt',
            time: '2024-01-25T15:20:00Z',
            completed: true
          }
        ]
      },
      {
        id: 3,
        orderNumber: 'VH001236',
        status: 'pending',
        createdAt: '2024-01-26T09:15:00Z',
        subtotal: 1599000,
        discount: 0,
        shippingFee: 0,
        total: 1599000,
        reviewed: false,
        showDetails: false,
        shipping: {
          name: 'Lê Văn C',
          phone: '0369852147',
          address: '789 Đường GHI, Phường 3, Quận 7, TP.HCM',
          method: 'Giao hàng tiêu chuẩn'
        },
        payment: {
          method: 'Chuyển khoản ngân hàng',
          status: 'pending'
        },
        items: [
          {
            id: 3,
            name: 'Túi xách cao cấp',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100',
            price: 1599000,
            quantity: 1
          }
        ],
        timeline: [
          {
            id: 1,
            title: 'Đơn hàng đã được đặt',
            time: '2024-01-26T09:15:00Z',
            completed: true,
            note: 'Đơn hàng đang chờ xác nhận từ cửa hàng'
          }
        ]
      }
    ]
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load orders:', error)
    loading.value = false
  }
})
</script>

<style scoped>
/* Animation classes */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes float-delay {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 3s ease-in-out infinite 0.5s;
}
</style>