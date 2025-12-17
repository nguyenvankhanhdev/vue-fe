// src/composables/client/useOrders.js
import { ref } from 'vue'
import orderService from '@/services/orderService'
import toast from '@/services/toast'

export function useOrders() {
  const orders = ref([])
  const stats = ref(null)
  const loading = ref(false)
  const statusFilter = ref(null)
  const pagination = ref(null)

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Chờ xử lý',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy'
    }
    return statusMap[status] || status
  }

  const getPaymentStatusText = (status) => {
    const statusMap = {
      'pending': 'Chưa thanh toán',
      'paid': 'Đã thanh toán',
      'failed': 'Thất bại',
      'refunded': 'Đã hoàn tiền'
    }
    return statusMap[status] || status
  }

  const getPaymentMethodText = (method) => {
    return method === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : method
  }

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

  const loadOrders = async (page = 1) => {
    try {
      loading.value = true
      const params = {}
      
      if (statusFilter.value) {
        params.status = statusFilter.value
      }

      const response = await orderService.getOrders(params)
      
      if (response.success) {
        orders.value = response.data
        pagination.value = response.pagination || null
      }
    } catch (error) {
      console.error('Load orders error:', error)
      toast.error('Không thể tải danh sách đơn hàng')
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    try {
      const response = await orderService.getOrderStats()
      if (response.success) {
        stats.value = response.data
      }
    } catch (error) {
      console.error('Load stats error:', error)
    }
  }

  const filterByStatus = (status) => {
    statusFilter.value = status
    loadOrders()
  }

  const cancelOrder = async (orderId) => {
    try {
      const response = await orderService.cancelOrder(orderId)
      
      if (response.success) {
        toast.success('Hủy đơn hàng thành công')
        await loadOrders()
        await loadStats()
        return true
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể hủy đơn hàng')
      return false
    }
  }

  return {
    // State
    orders,
    stats,
    loading,
    statusFilter,
    pagination,

    // Methods
    loadOrders,
    loadStats,
    filterByStatus,
    cancelOrder,
    
    // Helpers
    getStatusText,
    getPaymentStatusText,
    getPaymentMethodText,
    formatPrice,
    formatDate
  }
}
