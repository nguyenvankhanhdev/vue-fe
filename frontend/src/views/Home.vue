<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 lg:py-28 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      
      <!-- Floating Elements -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/15 rounded-full blur-lg animate-bounce"></div>
        <div class="absolute top-1/4 right-1/4 w-16 h-16 bg-indigo-200/20 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <div class="space-y-6">
              <h1 class="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
                Khám phá bộ sưu tập 
                <span class="text-yellow-300">mới nhất</span>
              </h1>
              <p class="text-xl lg:text-2xl text-blue-50 leading-relaxed">
                Tìm kiếm những sản phẩm chất lượng với giá cả phải chăng. Trải nghiệm mua sắm tuyệt vời cùng chúng tôi!
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link 
                to="/products" 
                class="group bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <i class="fas fa-shopping-bag mr-2 group-hover:animate-bounce"></i>
                Mua sắm ngay
              </router-link>
              <router-link 
                to="/about" 
                class="group border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200 flex items-center justify-center"
              >
                <i class="fas fa-info-circle mr-2 group-hover:animate-pulse"></i>
                Tìm hiểu thêm
              </router-link>
            </div>

            <!-- Stats -->
            <div class="flex items-center space-x-8 pt-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">1000+</div>
                <div class="text-blue-200 text-sm">Sản phẩm</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">50K+</div>
                <div class="text-blue-200 text-sm">Khách hàng</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">99%</div>
                <div class="text-blue-200 text-sm">Hài lòng</div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
                alt="Shopping" 
                class="w-full h-auto rounded-2xl shadow-xl"
              />
              
              <!-- Floating Cards -->
              <div class="absolute -top-4 -left-4 bg-yellow-400 text-yellow-800 px-4 py-2 rounded-full font-semibold text-sm shadow-lg animate-bounce">
                🔥 Hot Deal
              </div>
              <div class="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg animate-pulse">
                ✨ Free Ship
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Tại sao chọn chúng tôi?
          </h2>
          <p class="text-gray-600 text-xl max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="group bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100/50">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
              <i class="fas fa-shipping-fast text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Giao hàng nhanh</h3>
            <p class="text-gray-600 leading-relaxed">Giao hàng miễn phí cho đơn hàng trên 500.000đ, nhận hàng trong 24h</p>
            <div class="mt-4 text-blue-600 font-medium">
              <i class="fas fa-clock mr-1"></i>
              Cam kết 24h
            </div>
          </div>

          <div class="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100/50">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
              <i class="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Thanh toán bảo mật</h3>
            <p class="text-gray-600 leading-relaxed">Hệ thống thanh toán an toàn với mã hóa SSL 256-bit</p>
            <div class="mt-4 text-green-600 font-medium">
              <i class="fas fa-lock mr-1"></i>
              Bảo mật 100%
            </div>
          </div>

          <div class="group bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-orange-100/50">
            <div class="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
              <i class="fas fa-undo-alt text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Đổi trả dễ dàng</h3>
            <p class="text-gray-600 leading-relaxed">Đổi trả miễn phí trong vòng 30 ngày, không cần lý do</p>
            <div class="mt-4 text-orange-600 font-medium">
              <i class="fas fa-calendar mr-1"></i>
              30 ngày đổi trả
            </div>
          </div>

          <div class="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100/50">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
              <i class="fas fa-headset text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Hỗ trợ 24/7</h3>
            <p class="text-gray-600 leading-relaxed">Đội ngũ hỗ trợ khách hàng chuyên nghiệp, luôn sẵn sàng</p>
            <div class="mt-4 text-purple-600 font-medium">
              <i class="fas fa-phone mr-1"></i>
              Hotline: 1900-xxxx
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Danh mục sản phẩm
          </h2>
          <p class="text-gray-600 text-xl max-w-3xl mx-auto">
            Khám phá các danh mục sản phẩm đa dạng, phong phú của chúng tôi
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100/50 hover:-translate-y-2"
            @click="navigateToCategory(category.slug)"
          >
            <div class="aspect-w-16 aspect-h-12 relative overflow-hidden">
              <img 
                :src="category.image" 
                :alt="category.name" 
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {{ category.name }}
                </h3>
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ category.productCount }}
                </div>
              </div>
              
              <p class="text-gray-600 text-sm mb-4">Khám phá bộ sưu tập {{ category.name.toLowerCase() }} đa dạng</p>
              
              <div class="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors">
                <span class="mr-2">Xem ngay</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>

            <!-- Floating badge -->
            <div class="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              Hot
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-12">
          <router-link 
            to="/categories" 
            class="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <i class="fas fa-th-large mr-2"></i>
            Xem tất cả danh mục
            <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Sản phẩm nổi bật
          </h2>
          <p class="text-gray-600 text-xl max-w-3xl mx-auto mb-8">
            Những sản phẩm được yêu thích nhất, được chọn lọc kỹ càng cho bạn
          </p>
          
          <!-- Filter Tabs -->
          <div class="flex justify-center mb-12">
            <div class="bg-gray-100 p-2 rounded-xl inline-flex space-x-2">
              <button 
                v-for="filter in productFilters" 
                :key="filter.key"
                @click="activeFilter = filter.key"
                :class="{
                  'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg': activeFilter === filter.key,
                  'text-gray-600 hover:text-gray-900': activeFilter !== filter.key
                }"
                class="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                <i :class="filter.icon" class="mr-2"></i>
                {{ filter.name }}
              </button>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
            @add-to-wishlist="handleAddToWishlist"
            @quick-view="handleQuickView"
            class="transform hover:-translate-y-2 transition-all duration-300"
          />
        </div>

        <div class="text-center">
          <router-link 
            to="/products" 
            class="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <i class="fas fa-store mr-2"></i>
            Xem tất cả sản phẩm
            <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      
      <!-- Floating Elements -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-16 left-16 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-16 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/15 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-6">
            <div>
              <h2 class="text-4xl lg:text-5xl font-bold mb-4">
                Đăng ký nhận tin tức
              </h2>
              <p class="text-xl text-blue-100 leading-relaxed">
                Nhận thông báo về sản phẩm mới, ưu đãi đặc biệt và các chương trình khuyến mại hấp dẫn
              </p>
            </div>
            
            <!-- Benefits -->
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="bg-white/20 p-2 rounded-full">
                  <i class="fas fa-check text-sm"></i>
                </div>
                <span class="text-blue-100">Ưu đãi độc quyền cho thành viên</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-white/20 p-2 rounded-full">
                  <i class="fas fa-bell text-sm"></i>
                </div>
                <span class="text-blue-100">Thông báo sản phẩm mới sớm nhất</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-white/20 p-2 rounded-full">
                  <i class="fas fa-gift text-sm"></i>
                </div>
                <span class="text-blue-100">Quà tặng đặc biệt dịp lễ</span>
              </div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 class="text-2xl font-bold mb-6 text-center">Nhận ưu đãi ngay!</h3>
            
            <form @submit.prevent="subscribeNewsletter" class="space-y-6">
              <div class="space-y-4">
                <div>
                  <input 
                    type="email" 
                    v-model="newsletterEmail"
                    placeholder="Nhập email của bạn"
                    required
                    class="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    v-model="subscriberName"
                    placeholder="Tên của bạn (tùy chọn)"
                    class="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                :disabled="!newsletterEmail"
                class="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <i class="fas fa-paper-plane mr-2"></i>
                Đăng ký ngay
              </button>
            </form>

            <p class="text-center text-white/70 text-sm mt-4">
              * Chúng tôi cam kết bảo mật thông tin của bạn
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Indicators -->
    <section class="py-16 bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Được tin tưởng bởi</h3>
          <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div class="text-4xl font-bold text-gray-400">BRAND1</div>
            <div class="text-4xl font-bold text-gray-400">BRAND2</div>
            <div class="text-4xl font-bold text-gray-400">BRAND3</div>
            <div class="text-4xl font-bold text-gray-400">BRAND4</div>
            <div class="text-4xl font-bold text-gray-400">BRAND5</div>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-blue-100/50">
          <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Bắt đầu mua sắm ngay hôm nay!
          </h3>
          <p class="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất thị trường
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/products" 
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <i class="fas fa-shopping-cart mr-2"></i>
              Mua sắm ngay
            </router-link>
            <router-link 
              to="/register" 
              class="border-2 border-blue-600 text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Đăng ký thành viên
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/Product/ProductCard.vue'

const router = useRouter()

// Reactive data
const newsletterEmail = ref('')
const subscriberName = ref('')
const featuredProducts = ref([])
const categories = ref([])
const activeFilter = ref('all')

// Product filters
const productFilters = ref([
  { key: 'all', name: 'Tất cả', icon: 'fas fa-th' },
  { key: 'new', name: 'Mới nhất', icon: 'fas fa-star' },
  { key: 'sale', name: 'Giảm giá', icon: 'fas fa-fire' },
  { key: 'popular', name: 'Phổ biến', icon: 'fas fa-heart' }
])

// Mock data
onMounted(() => {
  // Load categories
  categories.value = [
    {
      id: 1,
      name: 'Thời trang Nam',
      slug: 'thoi-trang-nam',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
      productCount: 120
    },
    {
      id: 2,
      name: 'Thời trang Nữ',
      slug: 'thoi-trang-nu',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      productCount: 200
    },
    {
      id: 3,
      name: 'Điện tử',
      slug: 'dien-tu',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      productCount: 80
    },
    {
      id: 4,
      name: 'Gia dụng',
      slug: 'gia-dung',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      productCount: 150
    }
  ]

  // Load featured products
  featuredProducts.value = [
    {
      id: 1,
      name: 'Áo thun basic Premium',
      category: 'Thời trang',
      price: 299000,
      originalPrice: 399000,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      inStock: true
    },
    {
      id: 2,
      name: 'Smartphone XYZ Pro',
      category: 'Điện tử',
      price: 12990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      rating: 4.8,
      reviewCount: 89,
      isNew: false,
      inStock: true
    },
    {
      id: 3,
      name: 'Giày sneaker thể thao',
      category: 'Giày dép',
      price: 890000,
      originalPrice: 1290000,
      discount: 31,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      rating: 4.3,
      reviewCount: 67,
      isNew: false,
      inStock: true
    },
    {
      id: 4,
      name: 'Túi xách cao cấp',
      category: 'Phụ kiện',
      price: 1590000,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      rating: 4.7,
      reviewCount: 45,
      isNew: true,
      inStock: false
    },
    {
      id: 5,
      name: 'Laptop Gaming ABC',
      category: 'Điện tử',
      price: 25990000,
      originalPrice: 29990000,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      rating: 4.9,
      reviewCount: 234,
      isNew: false,
      inStock: true
    },
    {
      id: 6,
      name: 'Đồng hồ thông minh',
      category: 'Điện tử',
      price: 4990000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4.2,
      reviewCount: 156,
      isNew: true,
      inStock: true
    }
  ]
})

// Methods
const navigateToCategory = (slug) => {
  router.push(`/products?category=${slug}`)
}

const handleAddToCart = (product) => {
  console.log('Add to cart:', product)
  // Handle add to cart logic
}

const handleAddToWishlist = (product) => {
  console.log('Add to wishlist:', product)
  // Handle add to wishlist logic
}

const handleQuickView = (product) => {
  console.log('Quick view:', product)
  // Handle quick view logic
}

// Computed
const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return featuredProducts.value
  if (activeFilter.value === 'new') return featuredProducts.value.filter(p => p.isNew)
  if (activeFilter.value === 'sale') return featuredProducts.value.filter(p => p.discount > 0)
  if (activeFilter.value === 'popular') return featuredProducts.value.filter(p => p.rating >= 4.5)
  return featuredProducts.value
})

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log('Newsletter subscription:', {
      email: newsletterEmail.value,
      name: subscriberName.value
    })
    alert(`Cảm ơn ${subscriberName.value || 'bạn'}! Đăng ký thành công!`)
    newsletterEmail.value = ''
    subscriberName.value = ''
  }
}
</script>

<style scoped>
/* Pure Tailwind CSS - No custom styles needed */
/* All styling handled by Tailwind utilities for consistency with other pages */
</style>