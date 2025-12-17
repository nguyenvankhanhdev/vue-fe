<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <i class="fas fa-shopping-bag text-2xl"></i>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            Đơn hàng của tôi
          </h1>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Theo dõi và quản lý các đơn hàng của bạn một cách dễ dàng
          </p>
        </div>
      </div>
    </section>

    <!-- Orders Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Statistics Cards -->
        <div v-if="stats" class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <p class="text-sm text-gray-600">Tổng đơn</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total_orders }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
            <p class="text-sm text-gray-600">Chờ xử lý</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats.pending_orders }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <p class="text-sm text-gray-600">Hoàn thành</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.completed_orders }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
            <p class="text-sm text-gray-600">Đã hủy</p>
            <p class="text-2xl font-bold text-red-600">{{ stats.cancelled_orders }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
            <p class="text-sm text-gray-600">Tổng chi tiêu</p>
            <p class="text-lg font-bold text-purple-600">{{ formatPrice(stats.total_spent) }}đ</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div class="flex flex-wrap gap-3">
            <button 
              @click="filterByStatus(null)"
              :class="statusFilter === null ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg font-medium transition-all">
              Tất cả
            </button>
            <button 
              @click="filterByStatus('pending')"
              :class="statusFilter === 'pending' ? 'bg-yellow-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg font-medium transition-all">
              <i class="fas fa-clock mr-2"></i>Chờ xử lý
            </button>
            <button 
              @click="filterByStatus('completed')"
              :class="statusFilter === 'completed' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg font-medium transition-all">
              <i class="fas fa-check-circle mr-2"></i>Hoàn thành
            </button>
            <button 
              @click="filterByStatus('cancelled')"
              :class="statusFilter === 'cancelled' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg font-medium transition-all">
              <i class="fas fa-times-circle mr-2"></i>Đã hủy
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="text-center">
            <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p class="text-gray-600">Đang tải đơn hàng...</p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="orders.length === 0" class="bg-white rounded-xl shadow-sm p-12 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-shopping-bag text-3xl text-gray-400"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Chưa có đơn hàng nào</h3>
          <p class="text-gray-600 mb-6">Hãy bắt đầu mua sắm ngay!</p>
          <router-link to="/products" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            <i class="fas fa-shopping-cart mr-2"></i>
            Tiếp tục mua sắm
          </router-link>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-4">
          <div 
            v-for="order in orders" 
            :key="order.id"
            class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border-l-4"
            :class="{
              'border-l-yellow-500': order.status === 'pending',
              'border-l-green-500': order.status === 'completed',
              'border-l-red-500': order.status === 'cancelled'
            }">
            <div class="p-6">
              <!-- Order Header -->
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <h3 class="text-lg font-bold text-gray-800">{{ order.order_number }}</h3>
                    <span 
                      :class="{
                        'bg-yellow-100 text-yellow-800': order.status === 'pending',
                        'bg-green-100 text-green-800': order.status === 'completed',
                        'bg-red-100 text-red-800': order.status === 'cancelled'
                      }"
                      class="px-3 py-1 rounded-full text-xs font-semibold">
                      {{ getStatusText(order.status) }}
                    </span>
                    <span 
                      :class="{
                        'bg-gray-100 text-gray-800': order.payment_status === 'pending',
                        'bg-green-100 text-green-800': order.payment_status === 'paid',
                        'bg-blue-100 text-blue-800': order.payment_status === 'refunded'
                      }"
                      class="px-3 py-1 rounded-full text-xs font-semibold">
                      {{ getPaymentStatusText(order.payment_status) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">
                    <i class="fas fa-calendar mr-1"></i>
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600 mb-1">Tổng tiền</p>
                  <p class="text-2xl font-bold text-blue-600">{{ formatPrice(order.total_price) }}đ</p>
                  <p class="text-xs text-gray-500 mt-1">
                    <i class="fas fa-box mr-1"></i>
                    {{ order.items_count }} sản phẩm
                  </p>
                </div>
              </div>

              <!-- Order Info -->
              <div class="grid md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                <div class="text-sm">
                  <p class="text-gray-600 mb-1">
                    <i class="fas fa-credit-card mr-2 text-blue-500"></i>
                    Phương thức thanh toán:
                  </p>
                  <p class="font-medium text-gray-800">{{ getPaymentMethodText(order.payment_method) }}</p>
                </div>
                <div class="text-sm">
                  <p class="text-gray-600 mb-1">
                    <i class="fas fa-money-bill-wave mr-2 text-green-500"></i>
                    Trạng thái thanh toán:
                  </p>
                  <p class="font-medium text-gray-800">{{ getPaymentStatusText(order.payment_status) }}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button 
                  @click="viewDetail(order.id)"
                  class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-sm hover:shadow-md">
                  <i class="fas fa-eye mr-2"></i>Xem chi tiết
                </button>
                <button 
                  v-if="order.can_cancel"
                  @click="confirmCancel(order)"
                  class="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-sm hover:shadow-md">
                  <i class="fas fa-times mr-2"></i>Hủy đơn
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.last_page > 1" class="mt-8 flex justify-center">
          <div class="flex gap-2">
            <button 
              v-for="page in pagination.last_page" 
              :key="page"
              @click="loadOrders(page)"
              :class="pagination.current_page === page ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'"
              class="px-4 py-2 rounded-lg border transition-all">
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrders } from '@/composables/client/useOrders'

const router = useRouter()

const {
  orders,
  stats,
  loading,
  statusFilter,
  pagination,
  loadOrders,
  loadStats,
  filterByStatus,
  cancelOrder,
  getStatusText,
  getPaymentStatusText,
  getPaymentMethodText,
  formatPrice,
  formatDate
} = useOrders()

const viewDetail = (orderId) => {
  router.push(`/orders/${orderId}`)
}

const confirmCancel = async (order) => {
  if (!confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${order.order_number}?`)) {
    return
  }
  await cancelOrder(order.id)
}

onMounted(() => {
  loadOrders()
  loadStats()
})
</script>

<style scoped>
/* Add any additional animations or styles if needed */
</style>
