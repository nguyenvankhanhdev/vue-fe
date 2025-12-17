import { ref, computed } from 'vue'
import cartService from '@/services/cartService'
import toast from '@/services/toast'

const cartItems = ref([])
const loading = ref(false)
const error = ref(null)

export function useCart() {
  // Constants
  const FREE_SHIPPING_THRESHOLD = 500000
  const STANDARD_SHIPPING_FEE = 30000

  /**
   * Fetch cart items from API
   */
  const fetchCart = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await cartService.getCart()
      
      // Note: apiClient interceptor already unwraps response.data
      // So response here is already the data object
      if (response.success) {
        // API returns data.cart_items array
        const items = response.data?.cart_items || []
        
        // Base URL for images
        const baseURL = 'http://127.0.0.1:8000'
        
        // Transform API data to match component structure
        cartItems.value = items.map(item => {
          // Get image URL and add base URL if it's a relative path
          let imageUrl = item.product.image || item.variant?.image_url
          if (imageUrl && !imageUrl.startsWith('http')) {
            // Laravel storage path: /storage/images/...
            imageUrl = `${baseURL}/storage/${imageUrl}`
          }
          
          // Debug: Log items without variant
          if (!item.variant || !item.variant.id) {
            console.warn('⚠️ Cart item without variant:', {
              id: item.id,
              product: item.product.name,
              variant: item.variant
            })
          }
          
          return {
            id: item.id,
            productId: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            image: imageUrl,
            category: item.product.category?.name || 'Sản phẩm',
            sku: item.product.sku,
            
            // Variant info - ONLY set if variant.id exists
            variantId: item.variant?.id || null,
            selectedSize: (item.variant?.id && item.variant?.capacity) 
              ? (item.variant.capacity.display_name || item.variant.capacity.name)
              : null,
            selectedColor: (item.variant?.id && item.variant?.color) ? {
              name: item.variant.color.name,
              value: item.variant.color.color_code
            } : null,
            
            // Pricing
            price: parseFloat(item.price),
            originalPrice: parseFloat(item.variant?.capacity?.price || item.price),
            discount: item.variant?.capacity?.discount_percentage || 0,
            
            // Quantity & stock
            quantity: item.quantity,
            stockQuantity: item.available_stock || item.variant?.stock || 0,
            
            // Selection state (for UI)
            selected: false,
            
            // Timestamps
            createdAt: item.created_at,
            updatedAt: item.updated_at
          }
        })
      }
      
      return response
    } catch (err) {
      console.error('❌ Cart fetch error:', err)
      error.value = err.message || 'Không thể tải giỏ hàng'
      await toast.error(error.value)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Add item to cart
   * @param {Object} payload - { product_id, product_variant_id, quantity }
   */
  const addToCart = async (payload) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await cartService.addToCart(payload)
      
      // Note: apiClient interceptor already unwraps response.data
      // So response here is the data object directly
      if (response.success) {
        // Show compact success toast
        await toast.success(`Đã thêm ${payload.quantity} sản phẩm vào giỏ hàng`)
        
        await fetchCart() // Refresh cart to update count
        return response
      } else {
        // If no success flag but no error thrown, still try to refresh cart
        await fetchCart()
        return response
      }
    } catch (err) {
      console.error('❌ Add to cart error:', err)
      const message = err.response?.data?.message || err.message || 'Không thể thêm sản phẩm vào giỏ hàng'
      error.value = message
      await toast.error(message)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Update cart item quantity
   * @param {Number} cartItemId - Cart item ID
   * @param {Number} quantity - New quantity
   */
  const updateQuantity = async (cartItemId, quantity) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await cartService.updateCartItem(cartItemId, { quantity })
      
      // Note: apiClient interceptor already unwraps response.data
      if (response.success) {
        // Update local state
        const item = cartItems.value.find(i => i.id === cartItemId)
        if (item) {
          item.quantity = quantity
        }
        return response
      }
    } catch (err) {
      const message = err.message || 'Không thể cập nhật số lượng'
      error.value = message
      await toast.error(message)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Remove item from cart
   * @param {Number} cartItemId - Cart item ID
   */
  const removeItem = async (cartItemId) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await cartService.removeFromCart(cartItemId)
      
      // Note: apiClient interceptor already unwraps response.data
      if (response.success) {
        // Remove from local state
        cartItems.value = cartItems.value.filter(i => i.id !== cartItemId)
        await toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
        return response
      }
    } catch (err) {
      const message = err.message || 'Không thể xóa sản phẩm'
      error.value = message
      await toast.error(message)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Clear all cart items
   */
  const clearCart = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await cartService.clearCart()
      
      // Note: apiClient interceptor already unwraps response.data
      if (response.success) {
        cartItems.value = []
        await toast.success('Đã xóa tất cả sản phẩm trong giỏ hàng')
        return response
      }
    } catch (err) {
      const message = err.message || 'Không thể xóa giỏ hàng'
      error.value = message
      await toast.error(message)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Validate cart before checkout
   */
  const validateCart = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Frontend validation: Check for items without variant
      const itemsWithoutVariant = cartItems.value.filter(item => !item.variantId)
      if (itemsWithoutVariant.length > 0) {
        const productNames = itemsWithoutVariant.map(item => item.name).join(', ')
        const message = `Các sản phẩm sau chưa có màu sắc và dung lượng: ${productNames}. Vui lòng xóa và thêm lại từ trang chi tiết sản phẩm!`
        error.value = message
        await toast.error(message)
        return { success: false, message }
      }
      
      // Call backend validation
      const response = await cartService.validateCart()
      return response
    } catch (err) {
      const message = err.message || 'Có lỗi khi kiểm tra giỏ hàng'
      error.value = message
      await toast.error(message)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Get cart count
   */
  const getCartCount = async () => {
    try {
      const response = await cartService.getCartCount()
      return response.data.data || 0
    } catch (err) {
      console.error('Error getting cart count:', err)
      return 0
    }
  }

  // Computed properties
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const selectedItems = computed(() => {
    return cartItems.value.filter(item => item.selected)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  const selectedSubtotal = computed(() => {
    return selectedItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  const selectedTotal = computed(() => {
    const shipping = selectedSubtotal.value >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE
    return selectedSubtotal.value + shipping
  })

  const isEligibleForFreeShipping = computed(() => {
    return selectedSubtotal.value >= FREE_SHIPPING_THRESHOLD
  })

  const amountForFreeShipping = computed(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - selectedSubtotal.value)
  })

  return {
    // State
    cartItems,
    loading,
    error,
    
    // Methods
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    validateCart,
    getCartCount,
    
    // Computed
    totalItems,
    selectedItems,
    subtotal,
    selectedSubtotal,
    selectedTotal,
    isEligibleForFreeShipping,
    amountForFreeShipping,
    
    // Constants
    FREE_SHIPPING_THRESHOLD,
    STANDARD_SHIPPING_FEE
  }
}
