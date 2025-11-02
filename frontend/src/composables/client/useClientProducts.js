// src/composables/useClientProducts.js
import { ref, computed } from 'vue'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'

const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref(null)

// Filters
const selectedCategory = ref(null)
const selectedBrand = ref(null)
const selectedRating = ref(0)
const priceRange = ref({ min: 0, max: 50000000 })
const searchQuery = ref('')
const sortBy = ref('')

export function useClientProducts() {
  /**
   * Load products from API (only active products for client)
   */
  const loadProducts = async (filters = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const params = {
        status: 1, // Only active products
        active: true, // Additional filter
        ...filters
      }
      
      const response = await productService.getProducts(params)
      
      // Handle Laravel pagination response
      if (response.data && Array.isArray(response.data)) {
        // response.data is the products array from Laravel pagination
        products.value = response.data
      } else if (Array.isArray(response)) {
        products.value = response
      } else {
        products.value = []
      }
      
      return products.value
    } catch (err) {
      error.value = err.message || 'Không thể tải danh sách sản phẩm'
      console.error('❌ Error loading products:', err)
      products.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Load categories from API (only active categories)
   */
  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories({ status: 1 })
      
      // Handle Laravel response
      if (response.data && Array.isArray(response.data)) {
        categories.value = response.data
      } else if (Array.isArray(response)) {
        categories.value = response
      } else {
        categories.value = []
      }

      // Calculate product count for each category
      categories.value = categories.value.map(cat => ({
        ...cat,
        count: products.value.filter(p => p.category_id === cat.id).length
      }))
      
      return categories.value
    } catch (err) {
      console.error('❌ Error loading categories:', err)
      categories.value = []
      return []
    }
  }

  /**
   * Get product by slug
   */
  const getProductBySlug = async (slug) => {
    loading.value = true
    error.value = null
    
    try {
      // Try to find in loaded products first
      let product = products.value.find(p => p.slug === slug)
      
      if (!product) {
        // If not found, try to load from API
        const response = await productService.getProducts({ slug })
        if (response.data && response.data.length > 0) {
          product = response.data[0]
        }
      }
      
      return product
    } catch (err) {
      error.value = err.message || 'Không thể tải thông tin sản phẩm'
      console.error('Error getting product:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Search products
   */
  const searchProducts = async (query) => {
    searchQuery.value = query
    return await loadProducts({ search: query })
  }

  /**
   * Filter by category
   */
  const filterByCategory = (categoryId) => {
    selectedCategory.value = categoryId
  }

  /**
   * Filter by brand
   */
  const filterByBrand = (brand) => {
    selectedBrand.value = brand
  }

  /**
   * Filter by rating
   */
  const filterByRating = (rating) => {
    selectedRating.value = rating
  }

  /**
   * Filter by price range
   */
  const filterByPrice = (min, max) => {
    priceRange.value = { min, max }
  }

  /**
   * Sort products
   */
  const setSortBy = (sort) => {
    sortBy.value = sort
  }

  /**
   * Clear all filters
   */
  const clearAllFilters = () => {
    selectedCategory.value = null
    selectedBrand.value = null
    selectedRating.value = 0
    priceRange.value = { min: 0, max: 50000000 }
    searchQuery.value = ''
    sortBy.value = ''
  }

  /**
   * Filtered products based on all active filters
   */
  const filteredProducts = computed(() => {
    let filtered = [...products.value]

    // Filter by category
    if (selectedCategory.value) {
      filtered = filtered.filter(p => p.category_id === selectedCategory.value)
    }

    // Filter by brand
    if (selectedBrand.value) {
      filtered = filtered.filter(p => p.brand === selectedBrand.value)
    }

    // Filter by price range
    filtered = filtered.filter(p => {
      // Get price from price_range if exists, otherwise from price field
      let price = 0
      if (p.price_range && p.price_range.min_price) {
        price = parseFloat(p.price_range.min_price)
      } else if (p.sale_price) {
        price = parseFloat(p.sale_price)
      } else if (p.price) {
        price = parseFloat(p.price)
      }
      
      // Only filter if price is set (not 0)
      if (price === 0) return true
      const inRange = price >= priceRange.value.min && price <= priceRange.value.max
      return inRange
    })

    // Filter by rating
    if (selectedRating.value > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= selectedRating.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(p => 
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      )
    }

    return filtered
  })

  /**
   * Sorted products based on sortBy value
   */
  const sortedProducts = computed(() => {
    const sorted = [...filteredProducts.value]
    
    switch (sortBy.value) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
      case 'price-desc':
        return sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      default:
        return sorted
    }
  })

  /**
   * Get brands from products
   */
  const brands = computed(() => {
    const brandSet = new Set()
    const brandList = []
    
    products.value.forEach(product => {
      if (product.brand && !brandSet.has(product.brand)) {
        brandSet.add(product.brand)
        brandList.push({
          id: product.brand,
          name: product.brand,
          slug: product.brand.toLowerCase().replace(/\s+/g, '-'),
          count: products.value.filter(p => p.brand === product.brand).length
        })
      }
    })
    
    return brandList.sort((a, b) => b.count - a.count)
  })

  /**
   * Format currency
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount || 0)
  }

  /**
   * Calculate discount percentage
   */
  const calculateDiscount = (product) => {
    // Check if product has discount in capacities
    if (product.capacities && product.capacities.length > 0) {
      const firstCapacity = product.capacities[0]
      if (firstCapacity.discount_percentage) {
        return parseFloat(firstCapacity.discount_percentage)
      }
    }
    
    // Fallback to old calculation
    if (!product.price || !product.sale_price) return 0
    return Math.round(((product.price - product.sale_price) / product.price) * 100)
  }

  /**
   * Get current price (sale_price or price)
   */
  const getCurrentPrice = (product) => {
    // Priority: price_range.min_price > sale_price > price
    if (product.price_range && product.price_range.min_price) {
      return parseFloat(product.price_range.min_price)
    }
    return parseFloat(product.sale_price || product.price || 0)
  }

  return {
    // State
    products: computed(() => products.value),
    categories: computed(() => categories.value),
    brands,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    
    // Filters
    selectedCategory: computed({
      get: () => selectedCategory.value,
      set: (val) => selectedCategory.value = val
    }),
    selectedBrand: computed({
      get: () => selectedBrand.value,
      set: (val) => selectedBrand.value = val
    }),
    selectedRating: computed({
      get: () => selectedRating.value,
      set: (val) => selectedRating.value = val
    }),
    priceRange: computed({
      get: () => priceRange.value,
      set: (val) => priceRange.value = val
    }),
    searchQuery: computed({
      get: () => searchQuery.value,
      set: (val) => searchQuery.value = val
    }),
    sortBy: computed({
      get: () => sortBy.value,
      set: (val) => sortBy.value = val
    }),
    
    // Computed
    filteredProducts,
    sortedProducts,
    
    // Methods
    loadProducts,
    loadCategories,
    getProductBySlug,
    searchProducts,
    filterByCategory,
    filterByBrand,
    filterByRating,
    filterByPrice,
    setSortBy,
    clearAllFilters,
    formatCurrency,
    calculateDiscount,
    getCurrentPrice
  }
}
