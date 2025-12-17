import apiClient from './apiClient'

/**
 * Cart Service - Handle all cart-related API calls
 */
const cartService = {
  /**
   * Get all cart items for current user
   * @returns {Promise} Cart items
   */
  getCart() {
    return apiClient.get('/cart')
  },

  /**
   * Add item to cart
   * @param {Object} data - { product_id, product_variant_id, quantity }
   * @returns {Promise} Cart item
   */
  addToCart(data) {
    return apiClient.post('/cart', data)
  },

  /**
   * Update cart item quantity
   * @param {Number} id - Cart item ID
   * @param {Object} data - { quantity }
   * @returns {Promise} Updated cart item
   */
  updateCartItem(id, data) {
    return apiClient.put(`/cart/${id}`, data)
  },

  /**
   * Remove item from cart
   * @param {Number} id - Cart item ID
   * @returns {Promise}
   */
  removeFromCart(id) {
    return apiClient.delete(`/cart/${id}`)
  },

  /**
   * Clear all cart items
   * @returns {Promise}
   */
  clearCart() {
    return apiClient.delete('/cart')
  },

  /**
   * Validate cart before checkout
   * @returns {Promise} Validation result
   */
  validateCart() {
    return apiClient.post('/cart/validate')
  },

  /**
   * Get cart items count
   * @returns {Promise} Cart count
   */
  getCartCount() {
    return apiClient.get('/cart/count')
  },

  /**
   * Get checkout preview for selected items
   * @param {Array} cartItemIds - Array of cart item IDs
   * @returns {Promise} Checkout preview data
   */
  checkoutPreview(cartItemIds) {
    return apiClient.post('/cart/checkout/preview', {
      cart_item_ids: cartItemIds
    })
  },

  /**
   * Validate selected items before checkout
   * @param {Array} cartItemIds - Array of cart item IDs
   * @returns {Promise} Validation result
   */
  validateCheckout(cartItemIds) {
    return apiClient.post('/cart/checkout/validate', {
      cart_item_ids: cartItemIds
    })
  },

  /**
   * Prepare checkout data for selected items
   * @param {Array} cartItemIds - Array of cart item IDs
   * @returns {Promise} Full checkout data
   */
  prepareCheckout(cartItemIds) {
    return apiClient.post('/cart/checkout/prepare', {
      cart_item_ids: cartItemIds
    })
  }
}

export default cartService
