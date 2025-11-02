<template>
  <div class="products-page bg-gray-50 min-h-screen">
    <!-- Enhanced Page Header -->
    <section class="page-header bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      <div class="absolute inset-0 bg-black bg-opacity-10"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Breadcrumb -->
        <nav class="flex items-center text-sm mb-6 text-white text-opacity-90">
          <router-link to="/" class="hover:text-white transition-colors">
            <i class="fas fa-home mr-2"></i>Trang chủ
          </router-link>
          <i class="fas fa-chevron-right mx-3 text-xs"></i>
          <span class="text-white font-medium">Sản phẩm</span>
        </nav>
        
        <!-- Header Content -->
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Tất cả sản phẩm
            </h1>
            <p class="text-lg text-white text-opacity-90 max-w-2xl">
              Khám phá bộ sưu tập đa dạng với hàng ngàn sản phẩm chất lượng cao
            </p>
          </div>
          <div class="hidden md:block">
            <div class="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <i class="fas fa-store text-3xl text-white"></i>
            </div>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="mt-8 flex flex-wrap gap-6">
          <div class="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white border-opacity-20">
            <div class="flex items-center">
              <i class="fas fa-box text-white text-xl mr-3"></i>
              <div>
                <div class="text-2xl font-bold text-white">{{ products.length }}</div>
                <div class="text-white text-opacity-80 text-sm">Sản phẩm</div>
              </div>
            </div>
          </div>
          <div class="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white border-opacity-20">
            <div class="flex items-center">
              <i class="fas fa-tags text-white text-xl mr-3"></i>
              <div>
                <div class="text-2xl font-bold text-white">{{ categories.length }}</div>
                <div class="text-white text-opacity-80 text-sm">Danh mục</div>
              </div>
            </div>
          </div>
          <div class="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white border-opacity-20">
            <div class="flex items-center">
              <i class="fas fa-filter text-white text-xl mr-3"></i>
              <div>
                <div class="text-2xl font-bold text-white">{{ filteredProducts.length }}</div>
                <div class="text-white text-opacity-80 text-sm">Đã lọc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
    </section>

    <!-- Products Content -->
    <section class="products-section py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="products-layout grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Enhanced Sidebar Filters -->
          <aside class="lg:col-span-1">
            <div class="filters-sidebar bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              <!-- Filter Header -->
              <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-filter text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">Bộ lọc</h3>
                  </div>
                  <button @click="clearAllFilters" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Xóa hết
                  </button>
                </div>
              </div>

              <div class="p-6 space-y-6">
                <!-- Categories Filter -->
                <div class="filter-section">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-th-large mr-2 text-blue-600"></i>
                    Danh mục
                  </h4>
                  <div class="space-y-2">
                    <button
                      v-for="category in categoriesWithCount" 
                      :key="category.id"
                      @click="selectCategory(category.id)"
                      :class="[
                        'w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group',
                        selectedCategory === category.id 
                          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                      ]"
                    >
                      <span class="font-medium">{{ category.name }}</span>
                      <span class="text-sm px-2 py-1 rounded-full bg-gray-200 group-hover:bg-blue-100 text-gray-600">
                        {{ category.count }}
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Price Range Filter -->
                <div class="filter-section">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-dollar-sign mr-2 text-green-600"></i>
                    Khoảng giá
                  </h4>
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-3">
                      <input 
                        type="number" 
                        v-model="priceRange.min"
                        placeholder="Từ"
                        @input="updatePriceRange"
                        class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      />
                      <input 
                        type="number" 
                        v-model="priceRange.max"
                        placeholder="Đến"
                        @input="updatePriceRange"
                        class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div class="px-2">
                      <div class="flex justify-between text-xs text-gray-500 mb-2">
                        <span>0đ</span>
                        <span>50M đ</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50000000"
                        step="100000"
                        v-model="priceRange.max"
                        @input="updatePriceRange"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>

                <!-- Rating Filter -->
                <div class="filter-section">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-star mr-2 text-yellow-500"></i>
                    Đánh giá
                  </h4>
                  <div class="space-y-2">
                    <button
                      v-for="rating in ratings" 
                      :key="rating"
                      @click="selectRating(rating)"
                      :class="[
                        'w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between',
                        selectedRating === rating 
                          ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-200' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                      ]"
                    >
                      <div class="flex items-center space-x-2">
                        <div class="flex">
                          <i 
                            v-for="star in 5" 
                            :key="star"
                            :class="[
                              'fas fa-star text-sm',
                              star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            ]"
                          ></i>
                        </div>
                        <span class="font-medium">{{ rating }}+ sao</span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Brands Filter -->
                <div class="filter-section">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-award mr-2 text-purple-600"></i>
                    Thương hiệu
                  </h4>
                  <div class="space-y-2">
                    <button
                      v-for="brand in brandsWithCount" 
                      :key="brand.id"
                      @click="selectBrand(brand.name)"
                      :class="[
                        'w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group',
                        selectedBrand === brand.name 
                          ? 'bg-purple-50 text-purple-700 border-2 border-purple-200' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                      ]"
                    >
                      <span class="font-medium">{{ brand.name }}</span>
                      <span class="text-sm px-2 py-1 rounded-full bg-gray-200 group-hover:bg-purple-100 text-gray-600">
                        {{ brand.count }}
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Clear All Filters -->
                <div class="pt-4 border-t border-gray-200">
                  <button @click="clearFilters" class="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                    <i class="fas fa-trash-alt mr-2"></i>
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <!-- Enhanced Main Content -->
          <main class="lg:col-span-3">
            <!-- Enhanced Toolbar -->
            <div class="products-toolbar bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <i class="fas fa-search text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">
                      Kết quả tìm kiếm
                    </h3>
                    <p class="text-sm text-gray-600">
                      Hiển thị {{ filteredProducts.length }} / {{ products.length }} sản phẩm
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <!-- Sort Dropdown -->
                  <div class="relative">
                    <select 
                      v-model="sortBy" 
                      @change="sortProducts"
                      class="appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 pr-8 focus:border-blue-500 focus:outline-none transition-colors font-medium text-gray-700"
                    >
                      <option value="">Sắp xếp theo</option>
                      <option value="name-asc">Tên A-Z</option>
                      <option value="name-desc">Tên Z-A</option>
                      <option value="price-asc">Giá tăng dần</option>
                      <option value="price-desc">Giá giảm dần</option>
                      <option value="rating-desc">Đánh giá cao nhất</option>
                      <option value="newest">Mới nhất</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i class="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>

                  <!-- View Toggle -->
                  <div class="flex bg-gray-100 rounded-xl overflow-hidden">
                    <button 
                      @click="viewMode = 'grid'"
                      :class="[
                        'px-4 py-3 transition-all duration-300 flex items-center justify-center',
                        viewMode === 'grid' 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-gray-600 hover:text-gray-800'
                      ]"
                    >
                      <i class="fas fa-th"></i>
                    </button>
                    <button 
                      @click="viewMode = 'list'"
                      :class="[
                        'px-4 py-3 transition-all duration-300 flex items-center justify-center',
                        viewMode === 'list' 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-gray-600 hover:text-gray-800'
                      ]"
                    >
                      <i class="fas fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Products Grid/List -->
            <div class="products-container">
              <!-- Loading State -->
              <div v-if="loading" class="loading-state bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div class="flex flex-col items-center">
                  <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Đang tải sản phẩm</h3>
                  <p class="text-gray-600">Vui lòng chờ trong giây lát...</p>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else-if="filteredProducts.length === 0" class="empty-state bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-search text-3xl text-gray-400"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h3>
                  <p class="text-gray-600 text-lg mb-8 max-w-md">
                    Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để tìm sản phẩm phù hợp hơn
                  </p>
                  <button 
                    @click="clearFilters" 
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <i class="fas fa-refresh mr-2"></i>
                    Xóa bộ lọc
                  </button>
                </div>
              </div>

              <!-- Products Grid -->
              <div v-else class="products-grid" :class="viewMode">
                <ProductCard 
                  v-for="product in paginatedProducts" 
                  :key="product.id"
                  :product="product"
                  :class="{ 'list-view': viewMode === 'list' }"
                  @add-to-cart="handleAddToCart"
                  @add-to-wishlist="handleAddToWishlist"
                  @quick-view="handleQuickView"
                />
              </div>
            </div>

            <!-- Enhanced Pagination -->
            <div class="pagination-container" v-if="totalPages > 1">
              <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
                <div class="flex items-center justify-between mb-4">
                  <div class="text-sm text-gray-600">
                    Trang {{ currentPage }} / {{ totalPages }} 
                    <span class="mx-2">•</span>
                    {{ filteredProducts.length }} sản phẩm
                  </div>
                  <div class="text-sm text-gray-600">
                    Hiển thị {{ ((currentPage - 1) * productsPerPage) + 1 }}-{{ Math.min(currentPage * productsPerPage, filteredProducts.length) }}
                  </div>
                </div>
                
                <div class="flex items-center justify-center space-x-2">
                  <button 
                    @click="currentPage = 1"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    <i class="fas fa-angle-double-left"></i>
                  </button>
                  <button 
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    <i class="fas fa-angle-left"></i>
                  </button>
                  
                  <button 
                    v-for="page in visiblePages" 
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'px-4 py-2 rounded-lg border-2 transition-all duration-300 font-semibold min-w-12',
                      currentPage === page 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-500 hover:text-blue-600'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <button 
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    <i class="fas fa-angle-right"></i>
                  </button>
                  <button 
                    @click="currentPage = totalPages"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    <i class="fas fa-angle-double-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/Product/ProductCard.vue'
import { useClientProducts } from '@/composables'

const route = useRoute()
const router = useRouter()

// Use client products composable
const {
  products,
  categories,
  brands,
  loading,
  error,
  selectedCategory,
  selectedBrand,
  selectedRating,
  priceRange,
  searchQuery,
  sortBy,
  filteredProducts,
  sortedProducts,
  loadProducts,
  loadCategories,
  filterByCategory,
  filterByBrand,
  filterByRating,
  filterByPrice,
  setSortBy,
  clearAllFilters,
  formatCurrency,
  getCurrentPrice
} = useClientProducts()

// Local state
const viewMode = ref('grid')
const currentPage = ref(1)
const productsPerPage = 12

const ratings = [4, 3, 2, 1]

// Computed properties
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  const end = start + productsPerPage
  return sortedProducts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / productsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Categories with product count
const categoriesWithCount = computed(() => {
  return categories.value.map(cat => ({
    ...cat,
    count: products.value.filter(p => p.category_id === cat.id).length
  }))
})

// Brands with product count
const brandsWithCount = computed(() => {
  return brands.value.map(brand => ({
    ...brand,
    count: products.value.filter(p => p.brand === brand.name).length
  }))
})

// Methods
const selectCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
  currentPage.value = 1
}

const selectBrand = (brandName) => {
  selectedBrand.value = selectedBrand.value === brandName ? null : brandName
  currentPage.value = 1
}

const selectRating = (rating) => {
  selectedRating.value = selectedRating.value === rating ? 0 : rating
  currentPage.value = 1
}

const updatePriceRange = () => {
  filterByPrice(priceRange.value.min, priceRange.value.max)
  currentPage.value = 1
}

const sortProducts = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  clearAllFilters()
  currentPage.value = 1
}

const handleAddToCart = (product) => {
  console.log('Add to cart:', product)
  // TODO: Implement add to cart logic
}

const handleAddToWishlist = (product) => {
  console.log('Add to wishlist:', product)
  // TODO: Implement add to wishlist logic
}

const handleQuickView = (product) => {
  console.log('Quick view:', product)
  // TODO: Implement quick view modal
}

// Watch for route changes
watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchQuery.value = newSearch
  }
  currentPage.value = 1
})

// Load data on mount
onMounted(async () => {
  try {
    // Check if there's a search query in route
    if (route.query.search) {
      searchQuery.value = route.query.search
    }
    
    // Load products and categories
    await Promise.all([
      loadProducts(),
      loadCategories()
    ])
  } catch (err) {
    console.error('Failed to load data:', err)
  }
})
</script>

<style scoped>
/* Range Slider Styles */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slider::-webkit-slider-track {
  height: 8px;
  background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  border-radius: 4px;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  cursor: pointer;
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-track {
  height: 8px;
  background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  border-radius: 4px;
  border: none;
}

/* Products Grid Layouts */
.products-grid.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.products-grid.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Responsive Grid */
@media (min-width: 1200px) {
  .products-grid.grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (max-width: 1199px) and (min-width: 768px) {
  .products-grid.grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .products-grid.grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Animation Classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.products-grid > * {
  animation: fadeInUp 0.6s ease forwards;
}

.products-grid > *:nth-child(1) { animation-delay: 0.1s; }
.products-grid > *:nth-child(2) { animation-delay: 0.2s; }
.products-grid > *:nth-child(3) { animation-delay: 0.3s; }

/* Mobile Responsive */
@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .products-section {
    padding: 1.5rem 0;
  }
  
  .products-toolbar {
    padding: 1rem;
  }
  
  .products-toolbar .flex {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>