import apiClient from './apiClient'

const couponService = {
  /**
   * Get all coupons (Admin)
   * @param {Object} filters - Filter options
   * @returns {Promise}
   */
  async getAllCoupons(filters = {}) {
    try {
      const response = await apiClient.get('/coupons', { params: filters })
      return response.data
    } catch (error) {
      console.error('Get coupons error:', error)
      throw error
    }
  },

  /**
   * Get active coupons only (Public)
   * @returns {Promise}
   */
  async getActiveCoupons() {
    try {
      const response = await apiClient.get('/coupons/active')
      return response.data
    } catch (error) {
      console.error('Get active coupons error:', error)
      throw error
    }
  },

  /**
   * Get eligible coupons for current user (Auth required)
   * @param {number} orderTotal - Optional order total to check
   * @returns {Promise}
   */
  async getMyEligibleCoupons(orderTotal = null) {
    try {
      const params = orderTotal ? { order_total: orderTotal } : {}
      const response = await apiClient.get('/coupons/my-eligible', { params })
      return response.data
    } catch (error) {
      console.error('Get eligible coupons error:', error)
      throw error
    }
  },

  /**
   * Get user's coupon usage history (Auth required)
   * @returns {Promise}
   */
  async getMyHistory() {
    try {
      const response = await apiClient.get('/coupons/my-history')
      return response.data
    } catch (error) {
      console.error('Get usage history error:', error)
      throw error
    }
  },

  /**
   * Get coupon by ID (Admin)
   * @param {number} id
   * @returns {Promise}
   */
  async getCouponById(id) {
    try {
      const response = await apiClient.get(`/coupons/${id}`)
      return response.data
    } catch (error) {
      console.error('Get coupon error:', error)
      throw error
    }
  },

  /**
   * Get coupon by code (Public)
   * @param {string} code
   * @returns {Promise}
   */
  async getCouponByCode(code) {
    try {
      const response = await apiClient.get(`/coupons/code/${code}`)
      return response.data
    } catch (error) {
      console.error('Get coupon by code error:', error)
      throw error
    }
  },

  /**
   * Create new coupon (Admin)
   * @param {Object} data
   * @returns {Promise}
   */
  async createCoupon(data) {
    try {
      const response = await apiClient.post('/coupons', data)
      return response.data
    } catch (error) {
      console.error('Create coupon error:', error)
      throw error
    }
  },

  /**
   * Update coupon (Admin)
   * @param {number} id
   * @param {Object} data
   * @returns {Promise}
   */
  async updateCoupon(id, data) {
    try {
      const response = await apiClient.put(`/coupons/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Update coupon error:', error)
      throw error
    }
  },

  /**
   * Delete coupon (Admin)
   * @param {number} id
   * @returns {Promise}
   */
  async deleteCoupon(id) {
    try {
      const response = await apiClient.delete(`/coupons/${id}`)
      return response.data
    } catch (error) {
      console.error('Delete coupon error:', error)
      throw error
    }
  },

  /**
   * Toggle coupon status (Admin)
   * @param {number} id
   * @returns {Promise}
   */
  async toggleStatus(id) {
    try {
      const response = await apiClient.patch(`/coupons/${id}/toggle-status`)
      return response.data
    } catch (error) {
      console.error('Toggle status error:', error)
      throw error
    }
  },

  /**
   * Validate coupon (Public/Auth)
   * @param {string} code - Coupon code
   * @param {number} orderTotal - Order total amount
   * @param {number} userId - Optional user ID for membership validation
   * @returns {Promise}
   */
  async validateCoupon(code, orderTotal, userId = null) {
    try {
      const payload = {
        code,
        order_total: orderTotal
      }
      
      if (userId) {
        payload.user_id = userId
      }
      
      const response = await apiClient.post('/coupons/validate', payload)
      return response.data
    } catch (error) {
      console.error('Validate coupon error:', error)
      throw error
    }
  }
}

export default couponService
