import apiClient from './apiClient'

/**
 * Order Service - Handle all order-related API calls
 */
const orderService = {
  /**
   * Create new order from cart items (COD payment)
   * @param {Object} data - Order data
   * @returns {Promise} Created order
   */
  createOrder(data) {
    return apiClient.post('/orders', data)
  },

  /**
   * Get all orders for authenticated user
   * @param {Object} params - Query parameters (status, payment_status)
   * @returns {Promise} List of orders
   */
  getOrders(params = {}) {
    return apiClient.get('/orders', { params })
  },

  /**
   * Get order detail by ID
   * @param {Number} id - Order ID
   * @returns {Promise} Order detail
   */
  getOrderDetail(id) {
    return apiClient.get(`/orders/${id}`)
  },

  /**
   * Cancel order
   * @param {Number} id - Order ID
   * @returns {Promise} Cancellation result
   */
  cancelOrder(id) {
    return apiClient.patch(`/orders/${id}/cancel`)
  },

  /**
   * Get order statistics
   * @returns {Promise} Order stats
   */
  getOrderStats() {
    return apiClient.get('/orders/stats')
  }
}

export default orderService
