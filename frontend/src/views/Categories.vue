<template>
  <div class="categories-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Danh mục sản phẩm</h1>
        <p>Khám phá các danh mục sản phẩm đa dạng của chúng tôi</p>
      </div>
    </section>

    <!-- Categories Content -->
    <section class="categories-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Category Filters -->
        <div class="category-filters">
          <div class="filter-tabs">
            <button 
              v-for="filter in categoryFilters" 
              :key="filter.key"
              @click="activeFilter = filter.key"
              :class="{ active: activeFilter === filter.key }"
              class="filter-tab"
            >
              <i :class="filter.icon"></i>
              {{ filter.label }}
            </button>
          </div>
          
          <div class="view-options">
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

        <!-- Categories Grid/List -->
        <div :class="viewMode === 'grid' ? 'categories-grid' : 'categories-list'">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
            class="category-card"
            @click="navigateToCategory(category)"
          >
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
              <div class="category-overlay">
                <div class="overlay-content">
                  <h3>{{ category.name }}</h3>
                  <p>{{ category.productCount }} sản phẩm</p>
                  <div class="category-icon">
                    <i :class="category.icon"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="category-info">
              <div class="category-header">
                <h3>{{ category.name }}</h3>
                <span class="product-count">{{ category.productCount }} SP</span>
              </div>
              <p class="category-description">{{ category.description }}</p>
              
              <div class="category-stats">
                <div class="stat-item">
                  <i class="fas fa-star"></i>
                  <span>{{ category.rating }}/5</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-fire"></i>
                  <span>{{ category.trending ? 'Hot' : 'Normal' }}</span>
                </div>
              </div>
              
              <div class="category-tags">
                <span 
                  v-for="tag in category.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div class="category-actions">
                <button @click.stop="viewProducts(category)" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
                  <i class="fas fa-eye"></i>
                  Xem sản phẩm
                </button>
                <button @click.stop="addToFavorites(category)" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 btn-outline">
                  <i :class="category.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
                  {{ category.isFavorite ? 'Đã thích' : 'Yêu thích' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Subcategories -->
        <div class="subcategories-section">
          <h2>Danh mục phụ phổ biến</h2>
          <div class="subcategories-grid">
            <div 
              v-for="subcategory in popularSubcategories" 
              :key="subcategory.id"
              class="subcategory-item"
              @click="navigateToSubcategory(subcategory)"
            >
              <div class="subcategory-icon">
                <i :class="subcategory.icon"></i>
              </div>
              <div class="subcategory-content">
                <h4>{{ subcategory.name }}</h4>
                <p>{{ subcategory.productCount }} sản phẩm</p>
              </div>
              <div class="subcategory-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Brands -->
        <div class="brands-section">
          <h2>Thương hiệu nổi bật</h2>
          <div class="brands-grid">
            <div 
              v-for="brand in featuredBrands" 
              :key="brand.id"
              class="brand-item"
              @click="navigateToBrand(brand)"
            >
              <div class="brand-logo">
                <img :src="brand.logo" :alt="brand.name" />
              </div>
              <div class="brand-info">
                <h4>{{ brand.name }}</h4>
                <p>{{ brand.productCount }} sản phẩm</p>
                <div class="brand-rating">
                  <div class="stars">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      :class="star <= brand.rating ? 'fas fa-star' : 'far fa-star'"
                    ></i>
                  </div>
                  <span>({{ brand.reviewCount }})</span>
                </div>
              </div>
              <div class="brand-badge" v-if="brand.isVerified">
                <i class="fas fa-check-circle"></i>
                Chính hãng
              </div>
            </div>
          </div>
        </div>

        <!-- Category Trends -->
        <div class="trends-section">
          <h2>Xu hướng danh mục</h2>
          <div class="trends-chart">
            <div 
              v-for="trend in categoryTrends" 
              :key="trend.id"
              class="trend-item"
            >
              <div class="trend-info">
                <h4>{{ trend.category }}</h4>
                <span class="trend-percentage">{{ trend.growth > 0 ? '+' : '' }}{{ trend.growth }}%</span>
              </div>
              <div class="trend-bar">
                <div 
                  class="trend-fill"
                  :style="{ width: `${Math.abs(trend.growth)}%`, backgroundColor: trend.growth > 0 ? '#28a745' : '#dc3545' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2>Không tìm thấy danh mục phù hợp?</h2>
        <p>Hãy liên hệ với chúng tôi để được tư vấn</p>
        <router-link to="/contact" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
          <i class="fas fa-phone"></i>
          Liên hệ tư vấn
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const activeFilter = ref('all')
const viewMode = ref('grid')

const categoryFilters = [
  { key: 'all', label: 'Tất cả', icon: 'fas fa-th-large' },
  { key: 'electronics', label: 'Điện tử', icon: 'fas fa-laptop' },
  { key: 'fashion', label: 'Thời trang', icon: 'fas fa-tshirt' },
  { key: 'home', label: 'Gia dụng', icon: 'fas fa-home' },
  { key: 'beauty', label: 'Làm đẹp', icon: 'fas fa-palette' },
  { key: 'sports', label: 'Thể thao', icon: 'fas fa-dumbbell' },
  { key: 'books', label: 'Sách', icon: 'fas fa-book' }
]

const categories = ref([
  {
    id: 1,
    name: 'Điện thoại & Tablet',
    description: 'Smartphone, máy tính bảng và phụ kiện công nghệ mới nhất',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    icon: 'fas fa-mobile-alt',
    productCount: 156,
    rating: 4.8,
    trending: true,
    isFavorite: false,
    type: 'electronics',
    tags: ['Smartphone', 'Tablet', 'Phụ kiện']
  },
  {
    id: 2,
    name: 'Laptop & Máy tính',
    description: 'Laptop, PC, linh kiện máy tính cho mọi nhu cầu',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    icon: 'fas fa-laptop',
    productCount: 89,
    rating: 4.7,
    trending: true,
    isFavorite: true,
    type: 'electronics',
    tags: ['Laptop', 'PC', 'Gaming']
  },
  {
    id: 3,
    name: 'Thời trang Nam',
    description: 'Quần áo, giày dép, phụ kiện thời trang cho nam giới',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    icon: 'fas fa-user-tie',
    productCount: 234,
    rating: 4.6,
    trending: false,
    isFavorite: false,
    type: 'fashion',
    tags: ['Áo sơ mi', 'Quần jeans', 'Giày']
  },
  {
    id: 4,
    name: 'Thời trang Nữ',
    description: 'Váy, áo, giày cao gót, túi xách và phụ kiện thời trang',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
    icon: 'fas fa-female',
    productCount: 312,
    rating: 4.9,
    trending: true,
    isFavorite: true,
    type: 'fashion',
    tags: ['Váy', 'Áo', 'Túi xách']
  },
  {
    id: 5,
    name: 'Đồ gia dụng',
    description: 'Thiết bị nhà bếp, đồ nội thất và dụng cụ gia đình',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    icon: 'fas fa-blender',
    productCount: 145,
    rating: 4.5,
    trending: false,
    isFavorite: false,
    type: 'home',
    tags: ['Nhà bếp', 'Nội thất', 'Dụng cụ']
  },
  {
    id: 6,
    name: 'Mỹ phẩm & Làm đẹp',
    description: 'Mỹ phẩm, skincare, perfume và sản phẩm chăm sóc sắc đẹp',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    icon: 'fas fa-gem',
    productCount: 201,
    rating: 4.8,
    trending: true,
    isFavorite: false,
    type: 'beauty',
    tags: ['Skincare', 'Makeup', 'Nước hoa']
  },
  {
    id: 7,
    name: 'Thể thao & Outdoor',
    description: 'Dụng cụ tập gym, thể thao ngoài trời và trang phục thể thao',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    icon: 'fas fa-running',
    productCount: 98,
    rating: 4.4,
    trending: false,
    isFavorite: true,
    type: 'sports',
    tags: ['Gym', 'Outdoor', 'Yoga']
  },
  {
    id: 8,
    name: 'Sách & Văn phòng phẩm',
    description: 'Sách, truyện, văn phòng phẩm và dụng cụ học tập',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    icon: 'fas fa-book-open',
    productCount: 167,
    rating: 4.3,
    trending: false,
    isFavorite: false,
    type: 'books',
    tags: ['Sách', 'Văn phòng phẩm', 'Học tập']
  }
])

const popularSubcategories = ref([
  { id: 1, name: 'iPhone', icon: 'fab fa-apple', productCount: 45 },
  { id: 2, name: 'Samsung Galaxy', icon: 'fas fa-mobile', productCount: 38 },
  { id: 3, name: 'Áo thun nam', icon: 'fas fa-tshirt', productCount: 67 },
  { id: 4, name: 'Giày sneaker', icon: 'fas fa-shoe-prints', productCount: 89 },
  { id: 5, name: 'Laptop gaming', icon: 'fas fa-gamepad', productCount: 23 },
  { id: 6, name: 'Son môi', icon: 'fas fa-kiss-wink-heart', productCount: 56 },
  { id: 7, name: 'Đồng hồ thông minh', icon: 'fas fa-clock', productCount: 34 },
  { id: 8, name: 'Tai nghe', icon: 'fas fa-headphones', productCount: 78 }
])

const featuredBrands = ref([
  {
    id: 1,
    name: 'Apple',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80',
    productCount: 45,
    rating: 4.9,
    reviewCount: 1234,
    isVerified: true
  },
  {
    id: 2,
    name: 'Samsung',
    logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80',
    productCount: 67,
    rating: 4.7,
    reviewCount: 987,
    isVerified: true
  },
  {
    id: 3,
    name: 'Nike',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80',
    productCount: 89,
    rating: 4.8,
    reviewCount: 2156,
    isVerified: true
  },
  {
    id: 4,
    name: 'Adidas',
    logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=80',
    productCount: 76,
    rating: 4.6,
    reviewCount: 1654,
    isVerified: true
  }
])

const categoryTrends = ref([
  { id: 1, category: 'Điện tử', growth: 25 },
  { id: 2, category: 'Thời trang', growth: 18 },
  { id: 3, category: 'Làm đẹp', growth: 32 },
  { id: 4, category: 'Gia dụng', growth: 12 },
  { id: 5, category: 'Thể thao', growth: -5 },
  { id: 6, category: 'Sách', growth: -8 }
])

// Computed properties
const filteredCategories = computed(() => {
  if (activeFilter.value === 'all') {
    return categories.value
  }
  return categories.value.filter(category => category.type === activeFilter.value)
})

// Methods
const navigateToCategory = (category) => {
  router.push(`/products?category=${category.id}`)
}

const navigateToSubcategory = (subcategory) => {
  router.push(`/products?subcategory=${subcategory.id}`)
}

const navigateToBrand = (brand) => {
  router.push(`/products?brand=${brand.id}`)
}

const viewProducts = (category) => {
  router.push(`/products?category=${category.id}`)
}

const addToFavorites = (category) => {
  category.isFavorite = !category.isFavorite
  if (category.isFavorite) {
    // Add to favorites logic
    console.log(`Added ${category.name} to favorites`)
  } else {
    // Remove from favorites logic
    console.log(`Removed ${category.name} from favorites`)
  }
}

onMounted(() => {
  // Load categories data
  console.log('Categories page loaded')
})
</script>

<style scoped>
.categories-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.category-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 20px;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-tab:hover,
.filter-tab.active {
  border-color: #e74c3c;
  background: #e74c3c;
  color: white;
}

.view-options {
  display: flex;
  gap: 5px;
}

.view-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.view-btn:hover,
.view-btn.active {
  border-color: #e74c3c;
  background: #e74c3c;
  color: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 60px;
}

.categories-list .category-card {
  display: flex;
  align-items: center;
  gap: 30px;
}

.categories-list .category-image {
  width: 200px;
  height: 150px;
  flex-shrink: 0;
}

.categories-list .category-info {
  flex: 1;
}

.category-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.category-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(231, 76, 60, 0.9), rgba(192, 57, 43, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h3 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.overlay-content p {
  margin-bottom: 20px;
  opacity: 0.9;
}

.category-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 24px;
}

.category-info {
  padding: 25px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.category-header h3 {
  color: #333;
  font-size: 1.3rem;
  margin: 0;
}

.product-count {
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.category-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 14px;
}

.category-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 14px;
}

.stat-item i {
  color: #e74c3c;
}

.category-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tag {
  background: #f8f9fa;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  border: 1px solid #e1e5e9;
}

.category-actions {
  display: flex;
  gap: 10px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.btn-primary {
  background: #e74c3c;
  color: white;
}

.btn-primary:hover {
  background: #c0392b;
}

.btn-outline {
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.btn-outline:hover {
  background: #e74c3c;
  color: white;
}

.subcategories-section,
.brands-section,
.trends-section {
  margin-bottom: 60px;
}

.subcategories-section h2,
.brands-section h2,
.trends-section h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.subcategory-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.subcategory-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.subcategory-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.subcategory-content {
  flex: 1;
}

.subcategory-content h4 {
  color: #333;
  margin-bottom: 5px;
}

.subcategory-content p {
  color: #666;
  font-size: 14px;
}

.subcategory-arrow {
  color: #ccc;
  transition: color 0.3s ease;
}

.subcategory-item:hover .subcategory-arrow {
  color: #e74c3c;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.brand-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.brand-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.brand-logo {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.brand-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-info {
  flex: 1;
}

.brand-info h4 {
  color: #333;
  margin-bottom: 5px;
}

.brand-info p {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.brand-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #ffc107;
}

.brand-rating span {
  color: #666;
  font-size: 14px;
}

.brand-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.trends-chart {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.trend-item {
  margin-bottom: 25px;
}

.trend-item:last-child {
  margin-bottom: 0;
}

.trend-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.trend-info h4 {
  color: #333;
  font-size: 16px;
}

.trend-percentage {
  font-weight: 600;
  color: #28a745;
}

.trend-bar {
  height: 8px;
  background: #f1f3f4;
  border-radius: 4px;
  overflow: hidden;
}

.trend-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-section .btn {
  background: #e74c3c;
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
}

.cta-section .btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.text-center {
  text-align: center;
}

.py-5 {
  padding: 3rem 0;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .category-filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .view-options {
    align-self: center;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-list .category-card {
    flex-direction: column;
  }
  
  .categories-list .category-image {
    width: 100%;
    height: 200px;
  }
  
  .subcategories-grid {
    grid-template-columns: 1fr;
  }
  
  .brands-grid {
    grid-template-columns: 1fr;
  }
  
  .brand-item {
    flex-direction: column;
    text-align: center;
  }
  
  .brand-badge {
    position: static;
    margin-top: 10px;
  }
}
</style>