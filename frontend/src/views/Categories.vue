<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 lg:py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/15 rounded-full blur-lg"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 class="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Danh mục sản phẩm
        </h1>
        <p class="text-xl lg:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
          Khám phá các danh mục sản phẩm đa dạng của chúng tôi
        </p>
        <div class="flex justify-center mt-8">
          <div class="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <i class="fas fa-tags text-blue-200"></i>
            <span class="text-blue-100 font-medium">{{ categories.length }} danh mục</span>
            <div class="w-px h-6 bg-blue-300/50"></div>
            <i class="fas fa-box text-blue-200"></i>
            <span class="text-blue-100 font-medium">{{ totalProducts }}+ sản phẩm</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Content -->
    <section class="py-12 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Category Filters -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-6 lg:p-8 mb-12">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="filter in categoryFilters" 
                :key="filter.key"
                @click="activeFilter = filter.key"
                class="flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                :class="activeFilter === filter.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'"
              >
                <i :class="filter.icon" class="text-sm"></i>
                <span>{{ filter.label }}</span>
              </button>
            </div>
            
            <div class="flex items-center space-x-2 bg-gray-100 rounded-2xl p-1">
              <button 
                @click="viewMode = 'grid'"
                class="p-3 rounded-xl transition-all duration-300"
                :class="viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-white hover:text-blue-600'"
              >
                <i class="fas fa-th"></i>
              </button>
              <button 
                @click="viewMode = 'list'"
                class="p-3 rounded-xl transition-all duration-300"
                :class="viewMode === 'list' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-white hover:text-blue-600'"
              >
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Categories Grid/List -->
        <div :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16' : 'space-y-6 mb-16'">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
            class="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
            :class="viewMode === 'list' ? 'flex items-center' : ''"
            @click="navigateToCategory(category)"
          >
            <div class="relative overflow-hidden" :class="viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'h-56'">
              <img :src="category.image" :alt="category.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              
              <!-- Overlay với gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute bottom-6 left-6 right-6 text-white">
                  <h3 class="text-xl font-bold mb-2">{{ category.name }}</h3>
                  <p class="text-green-200 text-sm">{{ category.productCount }} sản phẩm</p>
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mt-4 mx-auto">
                    <i :class="category.icon" class="text-2xl"></i>
                  </div>
                </div>
              </div>
              
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex flex-col space-y-2">
                <span v-if="category.trending" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                  <i class="fas fa-fire mr-1"></i>
                  Hot
                </span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                  {{ category.productCount }} SP
                </span>
              </div>
              
              <!-- Favorite Button -->
              <button @click.stop="addToFavorites(category)" 
                      class="absolute top-4 right-4 w-10 h-10 rounded-full border-2 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                      :class="category.isFavorite 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'bg-white/20 border-white/30 text-white hover:bg-red-500 hover:border-red-500'">
                <i :class="category.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>
            
            <div class="p-6 flex-1 space-y-4">
              <div class="flex justify-between items-start">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{{ category.name }}</h3>
                <div class="flex items-center space-x-1 text-yellow-400">
                  <i class="fas fa-star text-sm"></i>
                  <span class="text-sm font-semibold text-gray-700">{{ category.rating }}</span>
                </div>
              </div>
              
              <p class="text-gray-600 leading-relaxed">{{ category.description }}</p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm">
                  <div class="flex items-center space-x-1 text-blue-600">
                    <i class="fas fa-box-open"></i>
                    <span>{{ category.productCount }}</span>
                  </div>
                  <div v-if="category.trending" class="flex items-center space-x-1 text-red-500">
                    <i class="fas fa-fire"></i>
                    <span class="font-semibold">Trending</span>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in category.tags" 
                  :key="tag"
                  class="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex space-x-3 pt-2">
                <button @click.stop="viewProducts(category)" 
                        class="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 space-x-2">
                  <i class="fas fa-eye"></i>
                  <span>Xem sản phẩm</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Subcategories -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Danh mục phụ phổ biến
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">Khám phá những danh mục được yêu thích nhất</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="subcategory in popularSubcategories" 
              :key="subcategory.id"
              class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"
              @click="navigateToSubcategory(subcategory)"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                  <i :class="subcategory.icon"></i>
                </div>
                <div class="text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
              <h4 class="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{{ subcategory.name }}</h4>
              <p class="text-gray-600 text-sm">{{ subcategory.productCount }} sản phẩm</p>
            </div>
          </div>
        </div>

        <!-- Featured Brands -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Thương hiệu nổi bật
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">Các thương hiệu uy tín và chất lượng cao</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="brand in featuredBrands" 
              :key="brand.id"
              class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group relative overflow-hidden"
              @click="navigateToBrand(brand)"
            >
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div class="relative z-10">
                <div class="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 p-2 group-hover:scale-110 transition-transform duration-300">
                  <img :src="brand.logo" :alt="brand.name" class="w-full h-full object-cover rounded-xl"/>
                </div>
                
                <div class="text-center">
                  <h4 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{{ brand.name }}</h4>
                  <p class="text-gray-600 text-sm mb-3">{{ brand.productCount }} sản phẩm</p>
                  
                  <div class="flex items-center justify-center space-x-2 mb-4">
                    <div class="flex space-x-1">
                      <i 
                        v-for="star in 5" 
                        :key="star"
                        class="text-sm"
                        :class="star <= brand.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                      ></i>
                    </div>
                    <span class="text-gray-600 text-xs">({{ brand.reviewCount }})</span>
                  </div>
                  
                  <div v-if="brand.isVerified" class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <i class="fas fa-check-circle"></i>
                    <span>Chính hãng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Trends -->
        <div class="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-blue-100">
          <div class="text-center mb-10">
            <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Xu hướng danh mục
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">Thống kê tăng trưởng các danh mục sản phẩm</p>
          </div>
          
          <div class="space-y-6">
            <div 
              v-for="trend in categoryTrends" 
              :key="trend.id"
              class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-bold text-gray-900">{{ trend.category }}</h4>
                <span 
                  class="px-4 py-2 rounded-full text-sm font-bold"
                  :class="trend.growth > 0 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white'"
                >
                  {{ trend.growth > 0 ? '+' : '' }}{{ trend.growth }}%
                </span>
              </div>
              
              <div class="relative">
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-1000 ease-out"
                    :class="trend.growth > 0 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                      : 'bg-gradient-to-r from-red-400 to-red-500'"
                    :style="{ width: `${Math.min(Math.abs(trend.growth), 100)}%` }"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>{{ Math.abs(trend.growth) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 lg:py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div class="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-300/15 rounded-full blur-lg"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Không tìm thấy danh mục phù hợp?
        </h2>
        <p class="text-xl lg:text-2xl text-blue-50 mb-10 leading-relaxed">
          Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/contact" 
                       class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 space-x-3">
            <i class="fas fa-phone text-lg"></i>
            <span>Liên hệ tư vấn</span>
          </router-link>
          
          <div class="flex items-center space-x-6 text-blue-100">
            <div class="flex items-center space-x-2">
              <i class="fas fa-clock"></i>
              <span>24/7 Support</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-headset"></i>
              <span>Tư vấn miễn phí</span>
            </div>
          </div>
        </div>
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

const totalProducts = computed(() => {
  return categories.value.reduce((total, category) => total + category.productCount, 0)
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
/* Custom animations and effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, box-shadow, background-color, border-color, opacity;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Ensure text doesn't overflow */
h1, h2, h3, h4, h5 {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>