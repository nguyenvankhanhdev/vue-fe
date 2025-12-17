<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center text-sm mb-6 text-gray-600">
        <router-link to="/" class="hover:text-blue-600 transition-colors flex items-center">
          <i class="fas fa-home mr-1.5"></i>
          Trang chủ
        </router-link>
        <i class="fas fa-chevron-right mx-2 text-xs"></i>
        <router-link to="/orders" class="hover:text-blue-600 transition-colors">Đơn hàng</router-link>
        <i class="fas fa-chevron-right mx-2 text-xs"></i>
        <span class="text-gray-900 font-medium">Chi tiết</span>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <i class="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
        </div>
        <p class="text-gray-600 font-medium">Đang tải thông tin đơn hàng...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-red-500 to-pink-500 p-8 text-center">
          <i class="fas fa-exclamation-circle text-5xl text-white mb-4"></i>
          <h3 class="text-2xl font-bold text-white mb-2">Có lỗi xảy ra</h3>
          <p class="text-red-100">{{ error }}</p>
        </div>
        <div class="p-6 text-center">
          <button @click="router.push('/orders')" class="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
            <i class="fas fa-arrow-left mr-2"></i>
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </div>

      <!-- Order Detail -->
      <div v-else-if="order" class="space-y-6">
        
        <!-- Order Header Card -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <i class="fas fa-receipt text-2xl text-white"></i>
                  </div>
                  <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-white">Chi tiết đơn hàng</h1>
                    <p class="text-blue-100 text-sm mt-0.5">Theo dõi và quản lý đơn hàng của bạn</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-3 text-sm">
                  <div class="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
                    <i class="fas fa-hashtag text-white/80"></i>
                    <span class="text-white/90">Mã:</span>
                    <span class="font-bold text-white">{{ order.order_number }}</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
                    <i class="fas fa-calendar-alt text-white/80"></i>
                    <span class="text-white">{{ formatDate(order.created_at) }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span :class="getStatusBadgeClass(order.status)" class="px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg text-center whitespace-nowrap">
                  <i :class="getStatusIcon(order.status)" class="mr-2"></i>
                  {{ getStatusText(order.status) }}
                </span>
                <span :class="getPaymentStatusClass(order.payment_status)" class="px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg text-center whitespace-nowrap">
                  <i class="fas fa-money-bill-wave mr-2"></i>
                  {{ getPaymentStatusText(order.payment_status) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column: Shipping + Products -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Shipping Info -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <i class="fas fa-shipping-fast text-green-600 mr-3"></i>
                  Thông tin giao hàng
                </h2>
              </div>
              <div class="p-6 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-blue-600"></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-500 mb-0.5">Người nhận</p>
                    <p class="font-semibold text-gray-900">{{ order.shipping_info?.customer_name }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-phone text-green-600"></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-500 mb-0.5">Số điện thoại</p>
                    <p class="font-semibold text-gray-900">{{ order.shipping_info?.phone }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-map-marker-alt text-orange-600"></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-500 mb-0.5">Địa chỉ giao hàng</p>
                    <p class="font-medium text-gray-900 leading-relaxed">{{ order.shipping_info?.full_address }}</p>
                  </div>
                </div>
                <div v-if="order.note" class="flex items-start gap-3 bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-sticky-note text-yellow-600"></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-500 mb-0.5">Ghi chú</p>
                    <p class="text-sm text-gray-700 italic">{{ order.note }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <i class="fas fa-box-open text-blue-600 mr-3"></i>
                  Sản phẩm đã đặt
                  <span class="ml-auto bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    {{ order.items?.length || 0 }} sản phẩm
                  </span>
                </h2>
              </div>
              <div class="divide-y divide-gray-100">
                <div v-for="item in order.items" :key="item.id" class="p-5 hover:bg-gray-50 transition-colors">
                  <div class="flex gap-4">
                    <!-- Product Image -->
                    <div class="flex-shrink-0">
                      <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md border-2 border-white relative group">
                        <img 
                          v-if="item.product_image" 
                          :src="getImageUrl(item.product_image)" 
                          :alt="item.product_name" 
                          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          @error="handleImageError"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center">
                          <i class="fas fa-image text-3xl text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{{ item.product_name }}</h3>
                      
                      <!-- Variants -->
                      <div v-if="item.variant" class="flex flex-wrap gap-2 mb-3">
                        <span v-if="getVariantColor(item.variant)" 
                              class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200 shadow-sm">
                          <i class="fas fa-palette mr-1.5"></i>
                          {{ getVariantColor(item.variant) }}
                        </span>
                        <span v-if="getVariantCapacity(item.variant)" 
                              class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 shadow-sm">
                          <i class="fas fa-microchip mr-1.5"></i>
                          {{ getVariantCapacity(item.variant) }}
                        </span>
                      </div>
                      
                      <!-- Quantity & Price -->
                      <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-4 text-sm text-gray-600">
                          <span class="flex items-center gap-1.5">
                            <i class="fas fa-shopping-bag text-blue-500"></i>
                            <span class="font-semibold text-gray-900">x{{ item.quantity }}</span>
                          </span>
                          <span class="text-gray-400">•</span>
                          <span class="text-gray-500">{{ formatPrice(item.price) }}₫/sp</span>
                        </div>
                        <div class="text-right">
                          <p class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {{ formatPrice(item.subtotal) }}₫
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Summary & Actions -->
          <div class="lg:col-span-1 space-y-6">
            
            <!-- Payment Summary -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <i class="fas fa-receipt text-indigo-600 mr-3"></i>
                  Thanh toán
                </h2>
              </div>
              <div class="p-6 space-y-4">
                <!-- Subtotal -->
                <div class="flex justify-between items-center text-gray-700">
                  <span class="flex items-center gap-2">
                    <i class="fas fa-calculator text-sm text-gray-400"></i>
                    Tạm tính
                  </span>
                  <span class="font-semibold">{{ formatPrice(order.subtotal) }}₫</span>
                </div>
                
                <!-- Shipping -->
                <div class="flex justify-between items-center text-gray-700">
                  <span class="flex items-center gap-2">
                    <i class="fas fa-truck text-sm text-gray-400"></i>
                    Phí vận chuyển
                  </span>
                  <span class="font-semibold text-green-600">{{ formatPrice(order.shipping_fee) }}₫</span>
                </div>
                
                <!-- Discount -->
                <div v-if="order.discount_amount > 0" class="flex justify-between items-center text-gray-700">
                  <span class="flex items-center gap-2">
                    <i class="fas fa-tag text-sm text-gray-400"></i>
                    Giảm giá
                    <span v-if="order.coupon_code" class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-bold">
                      {{ order.coupon_code }}
                    </span>
                  </span>
                  <span class="font-semibold text-red-600">-{{ formatPrice(order.discount_amount) }}₫</span>
                </div>
                
                <div class="border-t border-gray-200 pt-4"></div>
                
                <!-- Total -->
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-gray-900">Tổng cộng</span>
                  <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ formatPrice(order.total_price) }}₫
                  </span>
                </div>
                
                <!-- Payment Method -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <p class="text-xs text-gray-500 mb-1">Phương thức thanh toán</p>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-money-bill-wave text-green-600"></i>
                    <span class="font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="p-6 pt-0 space-y-3">
                <button 
                  v-if="canCancel"
                  @click="cancelOrder"
                  :disabled="cancelling"
                  class="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group">
                  <i v-if="!cancelling" class="fas fa-times-circle mr-2 group-hover:rotate-90 transition-transform duration-300"></i>
                  <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                  <span v-if="!cancelling">Hủy đơn hàng</span>
                  <span v-else>Đang hủy...</span>
                </button>
                
                <router-link 
                  to="/orders"
                  class="block w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
                  <i class="fas fa-list mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
                  Xem tất cả đơn hàng
                </router-link>
                
                <router-link 
                  to="/"
                  class="block w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                  <i class="fas fa-shopping-bag mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Tiếp tục mua sắm
                </router-link>
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
import { useRouter, useRoute } from 'vue-router'
import orderService from '@/services/orderService'
import toast from '@/services/toast'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()

const order = ref(null)
const loading = ref(true)
const error = ref(null)
const cancelling = ref(false)

const canCancel = computed(() => {
  return order.value?.can_cancel === true || order.value?.status === 'pending'
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  return `http://127.0.0.1:8000/storage/${imagePath.replace(/^\/storage\//, '')}`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/200x200?text=No+Image'
}

const getVariantColor = (variant) => {
  if (!variant) return null
  if (typeof variant === 'string') {
    try {
      const parsed = JSON.parse(variant)
      return parsed.color?.name || parsed.color || null
    } catch {
      return null
    }
  }
  if (variant.color && typeof variant.color === 'object') {
    return variant.color.name || null
  }
  return variant.color || null
}

const getVariantCapacity = (variant) => {
  if (!variant) return null
  if (typeof variant === 'string') {
    try {
      const parsed = JSON.parse(variant)
      return parsed.capacity?.display_name || parsed.capacity?.name || parsed.capacity || null
    } catch {
      return null
    }
  }
  if (variant.capacity && typeof variant.capacity === 'object') {
    return variant.capacity.display_name || variant.capacity.name || null
  }
  return variant.capacity || null
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Đang xử lý',
    'processing': 'Đang chuẩn bị',
    'shipping': 'Đang giao hàng',
    'completed': 'Hoàn thành',
    'cancelled': 'Đã hủy'
  }
  return statusMap[status] || status
}

const getStatusIcon = (status) => {
  const iconMap = {
    'pending': 'fas fa-clock',
    'processing': 'fas fa-box',
    'shipping': 'fas fa-shipping-fast',
    'completed': 'fas fa-check-circle',
    'cancelled': 'fas fa-times-circle'
  }
  return iconMap[status] || 'fas fa-circle'
}

const getStatusBadgeClass = (status) => {
  const classMap = {
    'pending': 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white',
    'processing': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
    'shipping': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
    'completed': 'bg-gradient-to-r from-green-400 to-green-500 text-white',
    'cancelled': 'bg-gradient-to-r from-red-400 to-red-500 text-white'
  }
  return classMap[status] || 'bg-gray-200 text-gray-800'
}

const getPaymentStatusText = (status) => {
  const statusMap = {
    'pending': 'Chưa thanh toán',
    'paid': 'Đã thanh toán',
    'failed': 'Thanh toán thất bại',
    'refunded': 'Đã hoàn tiền'
  }
  return statusMap[status] || status
}

const getPaymentStatusClass = (status) => {
  const classMap = {
    'pending': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-2 border-yellow-300',
    'paid': 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300',
    'failed': 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-300',
    'refunded': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-300'
  }
  return classMap[status] || 'bg-gray-100 text-gray-700'
}

const loadOrderDetail = async () => {
  try {
    loading.value = true
    const response = await orderService.getOrderDetail(route.params.id)
    
    if (response.success) {
      order.value = response.data
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Không thể tải thông tin đơn hàng'
  } finally {
    loading.value = false
  }
}

const cancelOrder = async () => {
  const result = await Swal.fire({
    title: 'Hủy đơn hàng?',
    text: 'Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: '<i class="fas fa-times-circle mr-2"></i>Xác nhận hủy',
    cancelButtonText: '<i class="fas fa-arrow-left mr-2"></i>Quay lại',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl',
      title: 'text-xl font-bold',
      confirmButton: 'rounded-xl px-6 py-3 font-bold',
      cancelButton: 'rounded-xl px-6 py-3 font-bold'
    }
  })

  if (!result.isConfirmed) return

  try {
    cancelling.value = true
    const response = await orderService.cancelOrder(order.value.id)
    
    if (response.success) {
      await Swal.fire({
        title: 'Đã hủy!',
        text: 'Đơn hàng đã được hủy thành công.',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'rounded-xl px-6 py-3 font-bold'
        }
      })
      await loadOrderDetail()
    }
  } catch (err) {
    await Swal.fire({
      title: 'Lỗi!',
      text: err.response?.data?.message || 'Không thể hủy đơn hàng',
      icon: 'error',
      confirmButtonColor: '#ef4444',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl px-6 py-3 font-bold'
      }
    })
  } finally {
    cancelling.value = false
  }
}

onMounted(() => {
  loadOrderDetail()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
