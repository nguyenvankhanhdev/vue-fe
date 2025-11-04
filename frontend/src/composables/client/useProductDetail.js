// src/composables/client/useProductDetail.js
import { ref, computed } from 'vue'
import { productService } from '@/services/productService'

export function useProductDetail() {
  const product = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // Selected options
  const selectedColor = ref(null)
  const selectedCapacity = ref(null)
  const selectedVariant = ref(null)
  const quantity = ref(1)
  const mainImage = ref('')
  const isInitialLoad = ref(true) // Flag to prevent auto image change on init

  /**
   * Helper to convert relative URL to absolute
   */
  const toAbs = (url) => url?.startsWith('http') ? url : `http://localhost:8000${url}`

  /**
   * Load product by slug
   */
  const loadProductBySlug = async (slug) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await productService.getProductBySlug(slug)
      product.value = response.data || response
      
      // If colors/capacities/variants not in main response, fetch them separately
      if (product.value && !product.value.colors) {
        try {
          const colorsResponse = await productService.getProductColors(product.value.id)
          const colorsData = colorsResponse.data?.colors || colorsResponse.colors || colorsResponse.data || colorsResponse || []
          product.value.colors = Array.isArray(colorsData) ? colorsData : []
        } catch (err) {
          console.warn('Could not load colors:', err.message)
          product.value.colors = []
        }
      }

      if (product.value && !product.value.capacities) {
        try {
          const capacitiesResponse = await productService.getProductCapacities(product.value.id)
          const capacitiesData = capacitiesResponse.data?.capacities || capacitiesResponse.capacities || capacitiesResponse.data || capacitiesResponse || []
          product.value.capacities = Array.isArray(capacitiesData) ? capacitiesData : []
        } catch (err) {
          console.warn('Could not load capacities:', err.message)
          product.value.capacities = []
        }
      }

      if (product.value && !product.value.variants) {
        try {
          const variantsResponse = await productService.getProductVariants(product.value.id)
          const variantsData = variantsResponse.data?.variants || variantsResponse.variants || variantsResponse.data || variantsResponse || []
          product.value.variants = Array.isArray(variantsData) ? variantsData : []
        } catch (err) {
          console.warn('Could not load variants:', err.message)
          product.value.variants = []
        }
      }
      
      // Set default selections
      if (product.value) {
        // Set main image FIRST before setting colors
        if (product.value.image_url) {
          mainImage.value = toAbs(product.value.image_url)
        }
        
        // Set default color WITHOUT triggering image change
        if (product.value.colors && product.value.colors.length > 0) {
          selectedColor.value = product.value.colors[0]
        }
        
        // Set default capacity
        if (product.value.capacities && product.value.capacities.length > 0) {
          selectedCapacity.value = product.value.capacities[0]
        }
        
        // Find matching variant
        updateSelectedVariant()
        
        // Mark initial load as complete
        isInitialLoad.value = false
      }
      
      return product.value
    } catch (err) {
      error.value = err.message || 'Không thể tải thông tin sản phẩm'
      console.error('Error loading product:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Update selected variant based on color and capacity
   */
  const updateSelectedVariant = () => {
    if (!product.value || !selectedColor.value || !selectedCapacity.value) {
      selectedVariant.value = null
      return
    }

    const variant = product.value.variants?.find(v => 
      v.color_id === selectedColor.value.id && 
      v.capacity_id === selectedCapacity.value.id
    )
    
    selectedVariant.value = variant || null
  }

  /**
   * Select color
   */
  const selectColor = (color) => {
    selectedColor.value = color
    updateSelectedVariant()
    
    // Only change main image if:
    // 1. Not initial load
    // 2. Color has a product image (not SVG icon)
    if (!isInitialLoad.value && color.image_url && !color.image_url.includes('.svg')) {
      changeMainImage(color.image_url)
    }
  }

  /**
   * Select capacity
   */
  const selectCapacity = (capacity) => {
    selectedCapacity.value = capacity
    updateSelectedVariant()
  }

  /**
   * Change main image
   */
  const changeMainImage = (imageUrl) => {
    mainImage.value = toAbs(imageUrl)
  }

  /**
   * Get current price
   */
  const currentPrice = computed(() => {
    // Priority 1: Selected variant price
    if (selectedVariant.value?.final_price) {
      return parseFloat(selectedVariant.value.final_price)
    }
    
    // Priority 2: Selected capacity price
    if (selectedCapacity.value?.final_price) {
      return parseFloat(selectedCapacity.value.final_price)
    }
    
    // Priority 3: Product min price
    if (product.value?.price_range?.min_price) {
      return parseFloat(product.value.price_range.min_price)
    }
    
    return 0
  })

  /**
   * Get original price (for discount display)
   */
  const originalPrice = computed(() => {
    // Check variant/capacity for original price
    if (selectedVariant.value?.price && selectedVariant.value?.discount_price) {
      return parseFloat(selectedVariant.value.price)
    }
    
    if (selectedCapacity.value?.price && selectedCapacity.value?.discount_price) {
      return parseFloat(selectedCapacity.value.price)
    }
    
    // Check price range
    if (product.value?.price_range?.max_price) {
      const maxPrice = parseFloat(product.value.price_range.max_price)
      const minPrice = parseFloat(product.value.price_range.min_price)
      if (maxPrice > minPrice) {
        return maxPrice
      }
    }
    
    return null
  })

  /**
   * Get discount percentage
   */
  const discountPercent = computed(() => {
    // Check variant/capacity discount
    if (selectedVariant.value?.discount_percentage) {
      return parseFloat(selectedVariant.value.discount_percentage)
    }
    
    if (selectedCapacity.value?.discount_percentage) {
      return parseFloat(selectedCapacity.value.discount_percentage)
    }
    
    // Calculate from prices
    if (originalPrice.value && currentPrice.value) {
      return Math.round(((originalPrice.value - currentPrice.value) / originalPrice.value) * 100)
    }
    
    return 0
  })

  /**
   * Check if product is in stock
   */
  const isInStock = computed(() => {
    // Check variant stock first
    if (selectedVariant.value) {
      return selectedVariant.value.stock > 0
    }
    
    // Check capacity stock
    if (selectedCapacity.value) {
      return selectedCapacity.value.stock > 0
    }
    
    // Check product stock
    return product.value?.stock > 0
  })

  /**
   * Get available stock
   */
  const availableStock = computed(() => {
    if (selectedVariant.value) {
      return selectedVariant.value.stock || 0
    }
    
    if (selectedCapacity.value) {
      return selectedCapacity.value.stock || 0
    }
    
    return product.value?.stock || 0
  })

  /**
   * Increase quantity
   */
  const increaseQuantity = () => {
    if (quantity.value < availableStock.value) {
      quantity.value++
    }
  }

  /**
   * Decrease quantity
   */
  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }

  /**
   * Format currency
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(Number(price || 0))
  }

  return {
    // State
    product: computed(() => product.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    selectedColor: computed(() => selectedColor.value),
    selectedCapacity: computed(() => selectedCapacity.value),
    selectedVariant: computed(() => selectedVariant.value),
    quantity: computed({
      get: () => quantity.value,
      set: (val) => {
        const num = parseInt(val)
        if (num >= 1 && num <= availableStock.value) {
          quantity.value = num
        }
      }
    }),
    mainImage: computed(() => mainImage.value),
    isInitialLoad: computed(() => isInitialLoad.value),
    
    // Computed
    currentPrice,
    originalPrice,
    discountPercent,
    isInStock,
    availableStock,
    
    // Methods
    loadProductBySlug,
    selectColor,
    selectCapacity,
    changeMainImage,
    increaseQuantity,
    decreaseQuantity,
    formatPrice,
    toAbs
  }
}
