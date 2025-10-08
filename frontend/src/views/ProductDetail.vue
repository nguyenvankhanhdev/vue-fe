<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">Đang tải sản phẩm...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="flex items-center justify-center min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <i class="fas fa-exclamation-triangle text-5xl text-gray-400 mb-6"></i>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Sản phẩm không tồn tại</h2>
          <p class="text-gray-600 mb-8">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <router-link to="/products" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <i class="fas fa-arrow-left mr-2"></i>
            Quay lại danh sách sản phẩm
          </router-link>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else>
      <!-- Breadcrumb -->
      <section class="bg-white/60 backdrop-blur-sm border-b border-green-100 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center space-x-2 text-sm">
            <router-link to="/" class="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium">
              <i class="fas fa-home mr-1"></i>
              Trang chủ
            </router-link>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <router-link to="/products" class="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium">
              Sản phẩm
            </router-link>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span class="text-gray-800 font-semibold">{{ product.name }}</span>
          </nav>
        </div>
      </section>

      <!-- Product Details -->
      <section class="py-8 lg:py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <!-- Product Images -->
            <div class="space-y-6">
              <div class="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-2xl">
                <img :src="selectedImage" :alt="product.name" class="w-full h-full object-cover"/>
                <div class="absolute top-6 left-6 flex flex-col space-y-3">
                  <span v-if="product.isNew" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                    <i class="fas fa-star mr-1"></i>
                    Mới
                  </span>
                  <span v-if="product.discount" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                    <i class="fas fa-tag mr-1"></i>
                    -{{ product.discount }}%
                  </span>
                </div>
                <!-- Zoom indicator -->
                <div class="absolute bottom-6 right-6 bg-black/20 backdrop-blur-sm rounded-full p-3 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <i class="fas fa-search-plus text-sm"></i>
                </div>
              </div>
              <div class="flex space-x-4 overflow-x-auto pb-2">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  class="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden cursor-pointer border-3 transition-all duration-300 hover:shadow-lg"
                  :class="selectedImage === image ? 'border-green-500 shadow-lg ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'"
                  @click="selectedImage = image"
                >
                  <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover"/>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="space-y-8">
              <div>
                <div class="flex items-start justify-between mb-4">
                  <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{{ product.name }}</h1>
                  <button @click="addToWishlist" class="p-3 rounded-full border-2 transition-all duration-300 hover:shadow-lg" 
                          :class="isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-400'">
                    <i class="fas fa-heart text-lg"></i>
                  </button>
                </div>
                <div class="flex items-center space-x-6 text-sm text-gray-600">
                  <span class="flex items-center">
                    <i class="fas fa-barcode mr-2"></i>
                    SKU: {{ product.sku }}
                  </span>
                  <router-link :to="`/products?category=${product.categorySlug}`" 
                               class="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                    <i class="fas fa-tag mr-2"></i>
                    {{ product.category }}
                  </router-link>
                </div>
              </div>

              <!-- Rating -->
              <div class="flex items-center space-x-6 pb-6 border-b border-gray-100">
                <div class="flex items-center space-x-2">
                  <div class="flex space-x-1">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      class="fas fa-star text-lg"
                      :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
                    ></i>
                  </div>
                  <span class="text-lg font-semibold text-gray-900">{{ product.rating }}</span>
                </div>
                <span class="text-gray-600">({{ product.reviewCount }} đánh giá)</span>
                <a href="#reviews" class="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  Xem tất cả đánh giá
                </a>
              </div>

              <!-- Price -->
              <div class="space-y-2">
                <div class="flex items-baseline space-x-4">
                  <span class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    {{ formatPrice(currentPrice) }}đ
                  </span>
                  <span v-if="product.originalPrice" class="text-xl text-gray-500 line-through">
                    {{ formatPrice(product.originalPrice) }}đ
                  </span>
                </div>
                <div v-if="product.discount" class="flex items-center space-x-3">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white">
                    <i class="fas fa-fire mr-1"></i>
                    Tiết kiệm {{ formatPrice(product.originalPrice - currentPrice) }}đ
                  </span>
                  <span class="text-sm text-gray-600">(-{{ product.discount }}%)</span>
                </div>
              </div>

              <!-- Stock Status -->
              <div class="p-4 rounded-2xl border-2" 
                   :class="product.inStock ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <i class="fas text-xl" 
                       :class="product.inStock ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'"></i>
                  </div>
                  <div>
                    <span v-if="product.inStock" class="text-green-800 font-semibold">
                      Còn hàng
                    </span>
                    <span v-else class="text-red-800 font-semibold">
                      Hết hàng
                    </span>
                    <p v-if="product.inStock" class="text-sm text-green-600 mt-1">
                      {{ product.stockQuantity }} sản phẩm có sẵn
                    </p>
                  </div>
                </div>
              </div>

              <!-- Product Options -->
              <div class="space-y-6">
                <!-- Size Selection -->
                <div v-if="product.sizes && product.sizes.length" class="space-y-3">
                  <label class="text-lg font-semibold text-gray-900">Kích thước:</label>
                  <div class="flex flex-wrap gap-3">
                    <button 
                      v-for="size in product.sizes" 
                      :key="size"
                      @click="selectedSize = size"
                      class="px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-md"
                      :class="selectedSize === size 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 text-gray-700 hover:border-green-300'"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Color Selection -->
                <div v-if="product.colors && product.colors.length" class="space-y-3">
                  <label class="text-lg font-semibold text-gray-900">Màu sắc:</label>
                  <div class="flex flex-wrap gap-3">
                    <button 
                      v-for="color in product.colors" 
                      :key="color.name"
                      @click="selectedColor = color"
                      class="w-12 h-12 rounded-full border-4 transition-all duration-300 hover:scale-110 shadow-lg"
                      :style="{ backgroundColor: color.value }"
                      :class="selectedColor === color ? 'border-gray-800' : 'border-gray-200'"
                      :title="color.name"
                    ></button>
                  </div>
                  <p v-if="selectedColor" class="text-sm text-gray-600 ml-1">
                    Đã chọn: <span class="font-medium">{{ selectedColor.name }}</span>
                  </p>
                </div>

                <!-- Quantity -->
                <div class="space-y-3">
                  <label class="text-lg font-semibold text-gray-900">Số lượng:</label>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button @click="decreaseQuantity" 
                              :disabled="quantity <= 1"
                              class="px-4 py-3 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                        <i class="fas fa-minus text-gray-600"></i>
                      </button>
                      <input type="number" 
                             v-model="quantity" 
                             min="1" 
                             :max="product.stockQuantity"
                             class="w-20 px-4 py-3 text-center border-0 outline-none"/>
                      <button @click="increaseQuantity" 
                              :disabled="quantity >= product.stockQuantity"
                              class="px-4 py-3 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                        <i class="fas fa-plus text-gray-600"></i>
                      </button>
                    </div>
                    <span class="text-sm text-gray-500">
                      Tối đa {{ product.stockQuantity }} sản phẩm
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button 
                  @click="addToCart" 
                  :disabled="!product.inStock"
                  class="flex-1 sm:min-w-[200px] flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  :class="product.inStock 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                    : 'bg-gray-300 text-gray-500'"
                >
                  <i class="fas fa-shopping-cart mr-3"></i>
                  {{ product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng' }}
                </button>
                <button @click="buyNow" 
                        :disabled="!product.inStock" 
                        class="flex-1 sm:min-w-[150px] flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl">
                  <i class="fas fa-bolt mr-3"></i>
                  Mua ngay
                </button>
                <button @click="shareProduct" 
                        class="p-4 border-2 border-gray-200 hover:border-green-300 rounded-2xl transition-all duration-300 hover:shadow-lg text-gray-600 hover:text-green-600">
                  <i class="fas fa-share-alt text-lg"></i>
                </button>
              </div>

              <!-- Product Features -->
              <div class="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-shipping-fast text-white text-sm"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Giao hàng miễn phí</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-undo-alt text-white text-sm"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Đổi trả 30 ngày</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-shield-alt text-white text-sm"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Bảo hành chính hãng</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-headset text-white text-sm"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Details Tabs -->
      <section class="py-8 lg:py-12 bg-white/60 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div class="flex border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="flex-1 px-6 py-4 font-semibold text-center transition-all duration-300 relative overflow-hidden"
                :class="activeTab === tab.id 
                  ? 'text-green-600 bg-white shadow-md' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-white/50'"
              >
                <span class="relative z-10">{{ tab.label }}</span>
                <div v-if="activeTab === tab.id" 
                     class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              </button>
            </div>
            
            <div class="p-6 lg:p-8">
              <!-- Description Tab -->
              <div v-if="activeTab === 'description'" class="space-y-8">
                <div class="prose max-w-none">
                  <div v-html="product.description" class="text-gray-700 leading-relaxed"></div>
                </div>
                  
                <div v-if="product.specifications" class="space-y-4">
                  <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-cogs text-green-600 mr-3"></i>
                    Thông số kỹ thuật
                  </h3>
                  <div class="overflow-hidden rounded-2xl border border-gray-200">
                    <div v-for="(value, key, index) in product.specifications" 
                         :key="key"
                         class="flex border-b border-gray-100 last:border-b-0"
                         :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                      <div class="flex-1 px-6 py-4 font-semibold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-50">
                        {{ key }}
                      </div>
                      <div class="flex-1 px-6 py-4 text-gray-700">
                        {{ value }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reviews Tab -->
              <div v-if="activeTab === 'reviews'" class="space-y-8" id="reviews">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div class="flex items-center space-x-8">
                    <div class="text-center">
                      <div class="text-5xl font-bold text-green-600 mb-2">{{ product.rating }}</div>
                      <div class="flex justify-center space-x-1 mb-2">
                        <i 
                          v-for="star in 5" 
                          :key="star"
                          class="fas fa-star text-2xl"
                          :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
                        ></i>
                      </div>
                      <span class="text-gray-600">{{ product.reviewCount }} đánh giá</span>
                    </div>
                  </div>
                  
                  <button @click="showReviewForm = !showReviewForm" 
                          class="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <i class="fas fa-pen mr-2"></i>
                    Viết đánh giá
                  </button>
                </div>

                <!-- Review Form -->
                <form v-if="showReviewForm" @submit.prevent="submitReview" 
                      class="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100 space-y-6">
                  <h3 class="text-xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-edit text-green-600 mr-3"></i>
                    Viết đánh giá của bạn
                  </h3>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Đánh giá:</label>
                    <div class="flex space-x-2">
                      <button 
                        v-for="star in 5" 
                        :key="star"
                        type="button"
                        @click="reviewRating = star"
                        class="text-3xl transition-colors duration-200 hover:scale-110 transform"
                        :class="star <= reviewRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'"
                      >
                        <i class="fas fa-star"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Tiêu đề:</label>
                    <input type="text" 
                           v-model="reviewTitle" 
                           required 
                           class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors duration-200" 
                           placeholder="Nhập tiêu đề đánh giá..."/>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Nội dung:</label>
                    <textarea v-model="reviewContent" 
                              rows="4" 
                              required 
                              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors duration-200 resize-none"
                              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."></textarea>
                  </div>
                  <div class="flex space-x-4">
                    <button type="submit" 
                            class="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <i class="fas fa-paper-plane mr-2"></i>
                      Gửi đánh giá
                    </button>
                    <button type="button" 
                            @click="showReviewForm = false" 
                            class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300">
                      Hủy
                    </button>
                  </div>
                </form>

                <!-- Reviews List -->
                <div class="space-y-6">
                  <div v-for="review in product.reviews" 
                       :key="review.id" 
                       class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {{ review.userName.charAt(0) }}
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">{{ review.userName }}</h4>
                          <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
                        </div>
                      </div>
                      <div class="flex space-x-1">
                        <i 
                          v-for="star in 5" 
                          :key="star"
                          class="fas fa-star text-lg"
                          :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                        ></i>
                      </div>
                    </div>
                    <h5 class="font-semibold text-gray-900 mb-2">{{ review.title }}</h5>
                    <p class="text-gray-700 leading-relaxed">{{ review.content }}</p>
                  </div>
                </div>
              </div>

              <!-- Shipping Tab -->
              <div v-if="activeTab === 'shipping'" class="space-y-6">
                <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                  <i class="fas fa-shipping-fast text-green-600 mr-3"></i>
                  Thông tin giao hàng
                </h3>
                <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                  <div class="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-truck text-white"></i>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-bold text-green-800 mb-2">Giao hàng tiêu chuẩn</h4>
                        <p class="text-green-700 mb-1">🆓 Miễn phí cho đơn hàng trên 500.000đ</p>
                        <p class="text-green-600">⏰ Thời gian: 2-3 ngày làm việc</p>
                      </div>
                    </div>
                  </div>
                  <div class="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-rocket text-white"></i>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-bold text-blue-800 mb-2">Giao hàng nhanh</h4>
                        <p class="text-blue-700 mb-1">💰 Phí ship: 50.000đ</p>
                        <p class="text-blue-600">⚡ Thời gian: 1-2 ngày làm việc</p>
                      </div>
                    </div>
                  </div>
                  <div class="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-bolt text-white"></i>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-bold text-purple-800 mb-2">Giao hàng trong ngày</h4>
                        <p class="text-purple-700 mb-1">🏃‍♂️ Phí ship: 100.000đ (chỉ áp dụng trong nội thành)</p>
                        <p class="text-purple-600">🕐 Thời gian: Trong ngày (đặt trước 14:00)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section class="py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Sản phẩm liên quan
            </h2>
            <p class="text-gray-600 text-lg">Khám phá những sản phẩm tương tự khác</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in relatedProducts" 
              :key="product.id"
              :product="product"
              @add-to-cart="handleAddToCart"
              @add-to-wishlist="handleAddToWishlist"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/Product/ProductCard.vue'

const route = useRoute()
const router = useRouter()

// Reactive data
const loading = ref(true)
const product = ref(null)
const relatedProducts = ref([])
const selectedImage = ref('')
const selectedSize = ref('')
const selectedColor = ref(null)
const quantity = ref(1)
const isWishlisted = ref(false)
const activeTab = ref('description')
const showReviewForm = ref(false)
const reviewRating = ref(5)
const reviewTitle = ref('')
const reviewContent = ref('')

const tabs = [
  { id: 'description', label: 'Mô tả sản phẩm' },
  { id: 'reviews', label: 'Đánh giá' },
  { id: 'shipping', label: 'Vận chuyển' }
]

// Computed
const currentPrice = computed(() => {
  if (product.value?.discount && product.value?.originalPrice) {
    return product.value.originalPrice * (1 - product.value.discount / 100)
  }
  return product.value?.price || 0
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  if (quantity.value < product.value.stockQuantity) {
    quantity.value++
  }
}

const addToCart = () => {
  if (product.value.inStock) {
    console.log('Add to cart:', {
      product: product.value,
      quantity: quantity.value,
      selectedSize: selectedSize.value,
      selectedColor: selectedColor.value
    })
    // Handle add to cart logic
    alert('Đã thêm vào giỏ hàng!')
  }
}

const buyNow = () => {
  addToCart()
  router.push('/cart')
}

const addToWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  console.log('Add to wishlist:', product.value)
}

const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: product.value.name,
      text: product.value.description,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Đã copy link sản phẩm!')
  }
}

const submitReview = () => {
  const newReview = {
    id: Date.now(),
    userName: 'Người dùng',
    rating: reviewRating.value,
    title: reviewTitle.value,
    content: reviewContent.value,
    date: new Date().toISOString()
  }
  
  product.value.reviews.unshift(newReview)
  
  // Reset form
  reviewRating.value = 5
  reviewTitle.value = ''
  reviewContent.value = ''
  showReviewForm.value = false
  
  alert('Đánh giá đã được gửi!')
}

const handleAddToCart = (product) => {
  console.log('Related product add to cart:', product)
}

const handleAddToWishlist = (product) => {
  console.log('Related product add to wishlist:', product)
}

// Load product data
onMounted(async () => {
  try {
    const productId = route.params.id
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock product data
    product.value = {
      id: parseInt(productId),
      name: 'Smartphone XYZ Pro Max 256GB',
      sku: 'SPH-XYZ-256',
      category: 'Điện tử',
      categorySlug: 'dien-tu',
      price: 25990000,
      originalPrice: 29990000,
      discount: 13,
      rating: 4.8,
      reviewCount: 234,
      inStock: true,
      stockQuantity: 15,
      isNew: false,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600',
        'https://images.unsplash.com/photo-1520923648955-69022c5ab2c0?w=600',
        'https://images.unsplash.com/photo-1573438731803-ed26307c4edf?w=600'
      ],
      sizes: ['64GB', '128GB', '256GB', '512GB'],
      colors: [
        { name: 'Đen', value: '#000000' },
        { name: 'Bạc', value: '#C0C0C0' },
        { name: 'Xanh', value: '#1E3A8A' },
        { name: 'Hồng', value: '#EC4899' }
      ],
      description: `
        <p>Smartphone XYZ Pro Max với thiết kế cao cấp và hiệu năng vượt trội. Được trang bị chip xử lý mới nhất, camera chất lượng cao và pin lâu dài.</p>
        <h3>Điểm nổi bật:</h3>
        <ul>
          <li>Chip xử lý A16 Bionic mạnh mẽ</li>
          <li>Camera chính 48MP với chế độ chụp đêm</li>
          <li>Màn hình OLED 6.7 inch Super Retina XDR</li>
          <li>Pin 4500mAh với sạc nhanh 65W</li>
          <li>Kháng nước IP68</li>
        </ul>
      `,
      specifications: {
        'Màn hình': '6.7" OLED Super Retina XDR',
        'Chip xử lý': 'A16 Bionic',
        'RAM': '8GB',
        'Bộ nhớ trong': '256GB',
        'Camera sau': '48MP + 12MP + 12MP',
        'Camera trước': '12MP TrueDepth',
        'Pin': '4500mAh',
        'Hệ điều hành': 'iOS 17',
        'Kích thước': '160.7 x 77.6 x 7.85mm',
        'Trọng lượng': '240g'
      },
      reviews: [
        {
          id: 1,
          userName: 'Nguyễn Văn A',
          rating: 5,
          title: 'Sản phẩm tuyệt vời!',
          content: 'Chất lượng rất tốt, giao hàng nhanh. Camera chụp ảnh rất đẹp.',
          date: '2024-01-20T10:30:00Z'
        },
        {
          id: 2,
          userName: 'Trần Thị B',
          rating: 4,
          title: 'Đáng giá tiền',
          content: 'Sản phẩm đúng như mô tả, pin khá trâu. Chỉ có điều giá hơi cao.',
          date: '2024-01-18T14:15:00Z'
        }
      ]
    }
    
    selectedImage.value = product.value.images[0]
    
    // Load related products
    relatedProducts.value = [
      // Mock related products data
      {
        id: 101,
        name: 'Smartphone ABC Pro',
        category: 'Điện tử',
        price: 18990000,
        originalPrice: 21990000,
        discount: 14,
        image: 'https://images.unsplash.com/photo-1520923648955-69022c5ab2c0?w=400',
        rating: 4.6,
        reviewCount: 156,
        inStock: true
      },
      {
        id: 102,
        name: 'Tai nghe không dây XYZ',
        category: 'Phụ kiện',
        price: 2990000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 4.3,
        reviewCount: 89,
        inStock: true
      },
      {
        id: 103,
        name: 'Ốp lưng bảo vệ Premium',
        category: 'Phụ kiện',
        price: 299000,
        originalPrice: 399000,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400',
        rating: 4.1,
        reviewCount: 67,
        inStock: true
      },
      {
        id: 104,
        name: 'Sạc nhanh không dây',
        category: 'Phụ kiện',
        price: 890000,
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
        rating: 4.4,
        reviewCount: 123,
        inStock: true
      }
    ]
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load product:', error)
    loading.value = false
  }
})
</script>

<style scoped>
/* Custom styles that complement Tailwind */
.prose h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.prose ul {
  list-style-type: disc;
  list-style-position: inside;
  color: #374151;
}

.prose ul > li {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}

.prose p {
  margin-bottom: 1rem;
  color: #374151;
  line-height: 1.6;
}

/* Smooth transitions for interactive elements */
.transform {
  transition: transform 0.3s ease;
}

/* Custom scrollbar for thumbnail images */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background-color: #f3f4f6;
  border-radius: 9999px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #34d399;
  border-radius: 9999px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #10b981;
}

/* Ensure text wrapping for long product names */
h1 {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>