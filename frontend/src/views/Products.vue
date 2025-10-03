<template>
  <div class="products-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <div class="breadcrumb">
            <router-link to="/">Trang chủ</router-link>
            <span>/</span>
            <span>Sản phẩm</span>
          </div>
          <h1>Tất cả sản phẩm</h1>
          <p>Khám phá bộ sưu tập đa dạng của chúng tôi</p>
        </div>
      </div>
    </section>

    <!-- Filters and Products -->
    <section class="products-section py-5">
      <div class="container">
        <div class="products-layout">
          <!-- Sidebar Filters -->
          <aside class="filters-sidebar">
            <div class="filter-section">
              <h3>Danh mục</h3>
              <ul class="filter-list">
                <li 
                  v-for="category in categories" 
                  :key="category.id"
                  @click="selectCategory(category.slug)"
                  :class="{ active: selectedCategory === category.slug }"
                >
                  {{ category.name }} ({{ category.count }})
                </li>
              </ul>
            </div>

            <div class="filter-section">
              <h3>Khoảng giá</h3>
              <div class="price-filter">
                <div class="price-inputs">
                  <input 
                    type="number" 
                    v-model="priceRange.min"
                    placeholder="Giá từ"
                    @input="filterByPrice"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    v-model="priceRange.max"
                    placeholder="Giá đến"
                    @input="filterByPrice"
                  />
                </div>
                <div class="price-range">
                  <input 
                    type="range" 
                    min="0" 
                    max="50000000"
                    step="100000"
                    v-model="priceRange.min"
                    @input="filterByPrice"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="50000000"
                    step="100000"
                    v-model="priceRange.max"
                    @input="filterByPrice"
                  />
                </div>
              </div>
            </div>

            <div class="filter-section">
              <h3>Đánh giá</h3>
              <ul class="rating-filter">
                <li 
                  v-for="rating in ratings" 
                  :key="rating"
                  @click="selectRating(rating)"
                  :class="{ active: selectedRating === rating }"
                >
                  <div class="stars">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      class="fas fa-star"
                      :class="{ active: star <= rating }"
                    ></i>
                  </div>
                  <span>{{ rating }} sao trở lên</span>
                </li>
              </ul>
            </div>

            <div class="filter-section">
              <h3>Thương hiệu</h3>
              <ul class="filter-list">
                <li 
                  v-for="brand in brands" 
                  :key="brand.id"
                  @click="selectBrand(brand.slug)"
                  :class="{ active: selectedBrand === brand.slug }"
                >
                  {{ brand.name }} ({{ brand.count }})
                </li>
              </ul>
            </div>

            <button @click="clearAllFilters" class="clear-filters-btn">
              Xóa bộ lọc
            </button>
          </aside>

          <!-- Main Content -->
          <main class="products-main">
            <!-- Toolbar -->
            <div class="products-toolbar">
              <div class="results-info">
                Hiển thị {{ filteredProducts.length }} sản phẩm
              </div>
              
              <div class="toolbar-actions">
                <div class="sort-dropdown">
                  <select v-model="sortBy" @change="sortProducts">
                    <option value="">Sắp xếp theo</option>
                    <option value="name-asc">Tên A-Z</option>
                    <option value="name-desc">Tên Z-A</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="rating-desc">Đánh giá cao nhất</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                </div>

                <div class="view-toggle">
                  <button 
                    @click="viewMode = 'grid'"
                    :class="{ active: viewMode === 'grid' }"
                    class="view-btn"
                  >
                    <i class="fas fa-th"></i>
                  </button>
                  <button 
                    @click="viewMode = 'list'"
                    :class="{ active: viewMode === 'list' }"
                    class="view-btn"
                  >
                    <i class="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Products Grid/List -->
            <div class="products-container" :class="viewMode">
              <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <p>Đang tải sản phẩm...</p>
              </div>

              <div v-else-if="filteredProducts.length === 0" class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Thử điều chỉnh bộ lọc để tìm kiếm sản phẩm khác</p>
                <button @click="clearAllFilters" class="btn">Xóa bộ lọc</button>
              </div>

              <div v-else class="products-grid">
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

            <!-- Pagination -->
            <div class="pagination" v-if="totalPages > 1">
              <button 
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="page-btn"
              >
                <i class="fas fa-angle-double-left"></i>
              </button>
              <button 
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="page-btn"
              >
                <i class="fas fa-angle-left"></i>
              </button>
              
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="currentPage = page"
                :class="{ active: currentPage === page }"
                class="page-btn"
              >
                {{ page }}
              </button>
              
              <button 
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="page-btn"
              >
                <i class="fas fa-angle-right"></i>
              </button>
              <button 
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="page-btn"
              >
                <i class="fas fa-angle-double-right"></i>
              </button>
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

const route = useRoute()
const router = useRouter()

// Reactive data
const loading = ref(true)
const products = ref([])
const categories = ref([])
const brands = ref([])
const selectedCategory = ref('')
const selectedBrand = ref('')
const selectedRating = ref(0)
const priceRange = ref({ min: 0, max: 50000000 })
const sortBy = ref('')
const viewMode = ref('grid')
const currentPage = ref(1)
const productsPerPage = 12

const ratings = [4, 3, 2, 1]

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.categorySlug === selectedCategory.value)
  }

  // Filter by brand
  if (selectedBrand.value) {
    filtered = filtered.filter(p => p.brandSlug === selectedBrand.value)
  }

  // Filter by price range
  filtered = filtered.filter(p => {
    const price = p.discount ? p.price * (1 - p.discount / 100) : p.price
    return price >= priceRange.value.min && price <= priceRange.value.max
  })

  // Filter by rating
  if (selectedRating.value > 0) {
    filtered = filtered.filter(p => p.rating >= selectedRating.value)
  }

  // Filter by search query
  if (route.query.search) {
    const query = route.query.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc':
      return sorted.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b))
    case 'price-desc':
      return sorted.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a))
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    default:
      return sorted
  }
})

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / productsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  const end = start + productsPerPage
  return sortedProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const getCurrentPrice = (product) => {
  return product.discount ? product.price * (1 - product.discount / 100) : product.price
}

const selectCategory = (slug) => {
  selectedCategory.value = selectedCategory.value === slug ? '' : slug
  currentPage.value = 1
}

const selectBrand = (slug) => {
  selectedBrand.value = selectedBrand.value === slug ? '' : slug
  currentPage.value = 1
}

const selectRating = (rating) => {
  selectedRating.value = selectedRating.value === rating ? 0 : rating
  currentPage.value = 1
}

const filterByPrice = () => {
  currentPage.value = 1
}

const sortProducts = () => {
  currentPage.value = 1
}

const clearAllFilters = () => {
  selectedCategory.value = ''
  selectedBrand.value = ''
  selectedRating.value = 0
  priceRange.value = { min: 0, max: 50000000 }
  sortBy.value = ''
  currentPage.value = 1
}

const handleAddToCart = (product) => {
  console.log('Add to cart:', product)
}

const handleAddToWishlist = (product) => {
  console.log('Add to wishlist:', product)
}

const handleQuickView = (product) => {
  console.log('Quick view:', product)
}

// Watch for route changes
watch(() => route.query, () => {
  currentPage.value = 1
})

// Load data
onMounted(async () => {
  try {
    // Mock API calls
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Load categories
    categories.value = [
      { id: 1, name: 'Thời trang Nam', slug: 'thoi-trang-nam', count: 45 },
      { id: 2, name: 'Thời trang Nữ', slug: 'thoi-trang-nu', count: 67 },
      { id: 3, name: 'Điện tử', slug: 'dien-tu', count: 23 },
      { id: 4, name: 'Gia dụng', slug: 'gia-dung', count: 34 },
      { id: 5, name: 'Thể thao', slug: 'the-thao', count: 28 }
    ]

    // Load brands
    brands.value = [
      { id: 1, name: 'Nike', slug: 'nike', count: 15 },
      { id: 2, name: 'Adidas', slug: 'adidas', count: 12 },
      { id: 3, name: 'Samsung', slug: 'samsung', count: 8 },
      { id: 4, name: 'Apple', slug: 'apple', count: 6 },
      { id: 5, name: 'Zara', slug: 'zara', count: 20 }
    ]

    // Load products (extended mock data)
    products.value = [
      {
        id: 1,
        name: 'Áo thun basic Premium',
        category: 'Thời trang Nam',
        categorySlug: 'thoi-trang-nam',
        brandSlug: 'nike',
        price: 299000,
        originalPrice: 399000,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        rating: 4.5,
        reviewCount: 128,
        isNew: true,
        inStock: true,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Smartphone XYZ Pro',
        category: 'Điện tử',
        categorySlug: 'dien-tu',
        brandSlug: 'samsung',
        price: 12990000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        rating: 4.8,
        reviewCount: 89,
        isNew: false,
        inStock: true,
        createdAt: '2024-01-10'
      },
      // Add more products...
      ...Array.from({ length: 50 }, (_, index) => ({
        id: index + 3,
        name: `Sản phẩm ${index + 3}`,
        category: ['Thời trang Nam', 'Thời trang Nữ', 'Điện tử', 'Gia dụng'][index % 4],
        categorySlug: ['thoi-trang-nam', 'thoi-trang-nu', 'dien-tu', 'gia-dung'][index % 4],
        brandSlug: ['nike', 'adidas', 'samsung', 'apple', 'zara'][index % 5],
        price: Math.floor(Math.random() * 5000000) + 100000,
        originalPrice: index % 3 === 0 ? Math.floor(Math.random() * 6000000) + 200000 : null,
        discount: index % 3 === 0 ? Math.floor(Math.random() * 50) + 10 : null,
        image: `https://picsum.photos/400/400?random=${index + 3}`,
        rating: +(Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 200) + 10,
        isNew: index % 5 === 0,
        inStock: index % 7 !== 0,
        createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString()
      }))
    ]
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load products:', error)
    loading.value = false
  }
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
}

.header-content {
  text-align: center;
}

.breadcrumb {
  margin-bottom: 20px;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
}

.breadcrumb span {
  margin: 0 10px;
}

.header-content h1 {
  font-size: 3rem;
  margin-bottom: 15px;
}

.header-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.products-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.filters-sidebar {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.filter-section:last-of-type {
  border-bottom: none;
  margin-bottom: 20px;
}

.filter-section h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.filter-list {
  list-style: none;
}

.filter-list li {
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.filter-list li:hover,
.filter-list li.active {
  color: #e74c3c;
}

.price-filter {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-inputs input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price-range input[type="range"] {
  width: 100%;
}

.rating-filter {
  list-style: none;
}

.rating-filter li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.rating-filter li:hover,
.rating-filter li.active {
  color: #e74c3c;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars i {
  color: #ddd;
  font-size: 14px;
}

.stars i.active {
  color: #ffd700;
}

.clear-filters-btn {
  width: 100%;
  padding: 12px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.clear-filters-btn:hover {
  background: #c0392b;
}

.products-main {
  min-height: 600px;
}

.products-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.results-info {
  font-weight: 600;
  color: #666;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sort-dropdown select {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.view-toggle {
  display: flex;
  background: #f8f9fa;
  border-radius: 5px;
  overflow: hidden;
}

.view-btn {
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.3s ease;
}

.view-btn.active {
  background: #e74c3c;
  color: white;
}

.products-container {
  min-height: 400px;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e74c3c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #666;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch; /* mặc định đã stretch, giúp card cao bằng nhau */
}

.products-grid.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  align-items: start;
}

/* Màn hình lớn - giữ 3 sản phẩm */
@media (min-width: 1200px) {
  .products-grid.grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

/* Tablet - 2 sản phẩm trên 1 hàng */
@media (max-width: 1199px) and (min-width: 769px) {
  .products-grid.grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

.products-grid.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
}

.page-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.page-btn.active {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: static;
    order: 2;
  }

  .products-main {
    order: 1;
  }
}

@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2rem;
  }

  .products-toolbar {
    flex-direction: column;
    gap: 15px;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .products-grid.grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .filters-sidebar {
    padding: 20px;
  }
}
</style>