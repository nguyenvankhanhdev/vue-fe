<template>
  <div class="product-card bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col min-h-[480px] overflow-hidden group" :class="{ 'opacity-75': !isInStock, 'list-view': $attrs.class?.includes('list-view') }">
    <!-- Enhanced Product Image -->
    <div class="product-image relative overflow-hidden aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-2xl">
      <img 
        :src="getImageUrl(product)" 
        :alt="product.name" 
        loading="lazy" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <!-- Status Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <div v-if="product.is_featured" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
          <i class="fas fa-star mr-1 text-xs"></i>Nổi bật
        </div>
        <div v-if="!isInStock" class="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
          <i class="fas fa-ban mr-1 text-xs"></i>Hết hàng
        </div>
      </div>

      <!-- Discount Badge -->
      <div v-if="discountPercent > 0" class="absolute top-3 right-3">
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          -{{ discountPercent }}%
        </div>
      </div>

      <!-- Enhanced Action Overlay -->
      <div class="product-actions absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div class="action-buttons flex items-center space-x-3">
          <button @click="addToWishlist" class="w-12 h-12 bg-white/95 hover:bg-red-500 hover:text-white rounded-xl border-2 border-gray-200 transition-all duration-300 flex items-center justify-center text-gray-700 shadow-lg backdrop-blur-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" aria-label="Yêu thích">
            <i class="fas fa-heart" :class="{ 'text-red-500': isWishlisted }"></i>
          </button>
          <button @click="quickView" class="w-12 h-12 bg-white/95 hover:bg-blue-500 hover:text-white rounded-xl border-2 border-gray-200 transition-all duration-300 flex items-center justify-center text-gray-700 shadow-lg backdrop-blur-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Xem nhanh">
            <i class="fas fa-eye"></i>
          </button>
          <button @click="addToCart" class="w-12 h-12 bg-white/95 hover:bg-green-500 hover:text-white rounded-xl border-2 border-gray-200 transition-all duration-300 flex items-center justify-center text-gray-700 shadow-lg backdrop-blur-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!isInStock" aria-label="Thêm vào giỏ">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Product Info -->
    <div class="product-info p-6 flex flex-col flex-1">
      <!-- Category Badge -->
      <div class="mb-3">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <i class="fas fa-tag mr-1 text-xs"></i>
          {{ getCategoryName(product) }}
        </span>
      </div>

      <!-- Product Name -->
      <h3 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
        <router-link :to="`/product/${product.slug || product.id}`" class="text-inherit no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
          {{ product.name }}
        </router-link>
      </h3>

      <!-- Rating -->
      <div v-if="product.rating" class="flex items-center mb-4">
        <div class="flex items-center">
          <div class="flex">
            <i
              v-for="star in 5"
              :key="star"
              class="fas fa-star text-sm"
              :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
            ></i>
          </div>
          <span class="text-sm text-gray-600 ml-2">({{ product.reviewCount || 0 }})</span>
        </div>
      </div>

      <!-- Spacer to push price and button to bottom -->
      <div class="flex-1"></div>

      <!-- Price Section -->
      <div class="mb-4">
        <div class="flex items-baseline space-x-2">
          <span class="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
            {{ formatPrice(currentPrice) }}đ
          </span>
          <span v-if="originalPrice" class="text-sm text-gray-500 line-through">
            {{ formatPrice(originalPrice) }}đ
          </span>
        </div>
        <div v-if="discountPercent > 0" class="text-xs text-green-600 font-medium mt-1">
          Tiết kiệm {{ formatPrice(originalPrice - currentPrice) }}đ
        </div>
        <div v-else-if="product.price_range && product.price_range.has_variants" class="text-xs text-blue-600 font-medium mt-1">
          Từ {{ formatPrice(currentPrice) }}đ
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        :disabled="!isInStock"
        class="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="isInStock 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-blue-500' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300'"
      >
        <i :class="isInStock ? 'fas fa-shopping-cart' : 'fas fa-ban'"></i>
        <span>{{ isInStock ? 'Thêm vào giỏ' : 'Hết hàng' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(['add-to-cart', 'add-to-wishlist', 'quick-view'])
const isWishlisted = ref(false)

// Check if product is in stock - handle both camelCase and snake_case
const isInStock = computed(() => {
  const p = props.product
  
  // Priority 1: Check in_stock from API
  if (p.in_stock !== undefined) {
    return p.in_stock === true || p.in_stock === 1
  }
  
  // Priority 2: Check inStock (camelCase)
  if (p.inStock !== undefined) {
    return p.inStock === true || p.inStock === 1
  }
  
  // Priority 3: Check stock number
  if (p.stock !== undefined) {
    return parseInt(p.stock) > 0
  }
  
  // Default: assume in stock
  return true
})

const currentPrice = computed(() => {
  const p = props.product
  
  // Priority: price_range.min_price > sale_price > price
  if (p.price_range && p.price_range.min_price) {
    return parseFloat(p.price_range.min_price)
  }
  
  // Fallback to sale_price or price
  return parseFloat(p.sale_price || p.price || 0)
})

const originalPrice = computed(() => {
  const p = props.product
  
  // Get max price from price_range
  if (p.price_range && p.price_range.max_price) {
    const maxPrice = parseFloat(p.price_range.max_price)
    const minPrice = parseFloat(p.price_range.min_price)
    // Only show if there's a range
    if (maxPrice > minPrice) return maxPrice
  }
  
  // Fallback to original price logic
  if (p.price && p.sale_price && p.price > p.sale_price) {
    return parseFloat(p.price)
  }
  
  return null
})

const discountPercent = computed(() => {
  const p = props.product
  
  // Check capacities for discount
  if (p.capacities && p.capacities.length > 0) {
    for (const capacity of p.capacities) {
      if (capacity.discount_percentage) {
        return parseFloat(capacity.discount_percentage)
      }
    }
  }
  
  // Calculate from price
  if (originalPrice.value && currentPrice.value) {
    return Math.round(((originalPrice.value - currentPrice.value) / originalPrice.value) * 100)
  }
  
  return 0
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(Number(price || 0))
}

// Get image URL - handle both API response and local data
const getImageUrl = (product) => {
  const baseURL = 'http://localhost:8000'
  
  // Priority 1: Use image_url from API (for product listing)
  if (product.image_url) {
    // Already has /storage/ prefix
    return `${baseURL}${product.image_url}`
  }
  
  // Priority 2: Use image field
  if (product.image) {
    // If it's a full URL
    if (product.image.startsWith('http')) {
      return product.image
    }
    // Add /storage/ prefix for relative paths
    return `${baseURL}/storage/${product.image}`
  }
  
  // Priority 3: Use first product_image
  if (product.product_images && product.product_images.length > 0) {
    const firstImage = product.product_images[0].url
    return `${baseURL}${firstImage}`
  }
  
  // Default placeholder
  return '/img/no-image.png'
}

// Handle image load error
const handleImageError = (event) => {
  // Fallback to local placeholder or a simple gray background
  event.target.src = '/img/no-image.png'
  // Or use data URI for a simple gray placeholder
  event.target.onerror = null // Prevent infinite loop
  event.target.style.backgroundColor = '#f3f4f6'
}

// Get category name - handle both object and string
const getCategoryName = (product) => {
  if (!product.category) return 'Chưa phân loại'
  
  // If category is an object
  if (typeof product.category === 'object') {
    return product.category.name || 'Chưa phân loại'
  }
  
  // If category is a string
  return product.category
}

const addToCart = () => {
  if (isInStock.value) emit('add-to-cart', props.product)
}
const addToWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  emit('add-to-wishlist', props.product)
}
const quickView = () => emit('quick-view', props.product)
</script>

<style scoped>
/* Custom utilities không có trong Tailwind */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  height: 3em;
}

.text-inherit {
  color: inherit;
}

.no-underline {
  text-decoration: none;
}

/* Animation slideInUp */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: slideInUp 0.6s ease forwards;
}

/* List view responsive styles */
@media (min-width: 1024px) {
  .list-view {
    flex-direction: row;
    max-width: none;
    min-height: 0;
  }

  .list-view .product-image {
    width: 12rem;
    aspect-ratio: 1;
    border-radius: 1rem 0 0 1rem;
  }

  .list-view .product-info {
    flex: 1;
    padding: 1.5rem;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .product-card {
    min-height: 420px;
  }
  
  .product-actions {
    opacity: 1 !important;
  }
  
  .action-buttons button {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .product-image {
    aspect-ratio: 4/3;
  }
}

/* Loading skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.skeleton {
  animation: shimmer 1.2s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 468px 104px;
}
</style>
