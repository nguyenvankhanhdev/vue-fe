<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">Đang tải sản phẩm...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="flex items-center justify-center min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <i class="fas fa-exclamation-triangle text-5xl text-gray-400 mb-6"></i>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Sản phẩm không tồn tại</h2>
          <p class="text-gray-600 mb-8">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <router-link to="/products" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <i class="fas fa-arrow-left mr-2"></i>
            Quay lại danh sách sản phẩm
          </router-link>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else>
      <!-- Breadcrumb -->
      <section class="bg-white/60 backdrop-blur-sm border-b border-blue-100 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center space-x-2 text-sm">
            <router-link to="/" class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
              <i class="fas fa-home mr-1"></i>
              Trang chủ
            </router-link>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <router-link to="/products" class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
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
            <!-- Product Images with Swiper -->
            <div class="space-y-4">
              <!-- Main Image with Lightbox -->
              <div class="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-2xl cursor-pointer group"
                   @click="openLightbox">
                <img 
                  :src="mainImage || (product?.image_url ? toAbs(product.image_url) : 'https://via.placeholder.com/600x600?text=No+Image')" 
                  :alt="product.name" 
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  @error="(e) => e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found'"
                />
                <div class="absolute top-6 left-6 flex flex-col space-y-3">
                  <span v-if="product.is_new" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    <i class="fas fa-star mr-1"></i>
                    Mới
                  </span>
                  <span v-if="discountPercent > 0" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                    <i class="fas fa-tag mr-1"></i>
                    -{{ discountPercent }}%
                  </span>
                </div>
                <!-- Zoom indicator -->
                <div class="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i class="fas fa-search-plus text-lg"></i>
                </div>
              </div>
              
              <!-- Swiper Gallery -->
              <div class="relative">
                <swiper
                  :modules="modules"
                  :slides-per-view="4"
                  :space-between="12"
                  :navigation="true"
                  :breakpoints="{
                    320: { slidesPerView: 3, spaceBetween: 8 },
                    640: { slidesPerView: 4, spaceBetween: 12 },
                    1024: { slidesPerView: 4, spaceBetween: 16 }
                  }"
                  class="product-gallery-swiper"
                >
                  <!-- Main product image -->
                  <swiper-slide v-if="product.image_url">
                    <div 
                      class="aspect-square rounded-xl overflow-hidden cursor-pointer border-3 transition-all duration-300 hover:shadow-lg"
                      :class="mainImage.includes(product.image_url) ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'"
                      @click="changeMainImage(product.image_url)"
                    >
                      <img :src="toAbs(product.image_url)" :alt="product.name" class="w-full h-full object-cover"/>
                    </div>
                  </swiper-slide>
                  
                  <!-- Additional product images -->
                  <swiper-slide 
                    v-for="(image, index) in product.product_images" 
                    :key="image.id || index"
                  >
                    <div 
                      class="aspect-square rounded-xl overflow-hidden cursor-pointer border-3 transition-all duration-300 hover:shadow-lg"
                      :class="mainImage.includes(image.url) ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'"
                      @click="changeMainImage(image.url)"
                    >
                      <img :src="toAbs(image.url || image.image_url)" :alt="image.alt || `${product.name} ${index + 1}`" class="w-full h-full object-cover"/>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>

            <!-- Product Info - Optimized -->
            <div class="space-y-2.5">
              <!-- Header -->
              <div>
                <div class="flex items-start justify-between mb-1.5">
                  <h1 class="text-x2 font-bold text-gray-900 leading-tight">{{ displayProductName }}</h1>
                  <button @click="addToWishlist" class="p-2 rounded-lg border-2 transition-all hover:shadow-sm focus:outline-none" 
                          :class="isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 hover:border-red-300 text-gray-400'">
                    <i class="fas fa-heart text-sm"></i>
                  </button>
                </div>
                <div class="flex items-center gap-3 text-[11px] text-gray-600">
                  <span class="flex items-center">
                    <i class="fas fa-barcode mr-1.5 text-xs"></i>
                    {{ product.sku || 'N/A' }}
                  </span>
                  <span v-if="product.category" class="flex items-center text-blue-600 font-medium">
                    <i class="fas fa-tag mr-1.5 text-xs"></i>
                    {{ product.category.name || product.category }}
                  </span>
                </div>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div class="flex items-center gap-1.5">
                  <div class="flex gap-0.5">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      class="fas fa-star text-sm"
                      :class="star <= (product.rating || 5) ? 'text-yellow-400' : 'text-gray-300'"
                    ></i>
                  </div>
                  <span class="text-sm font-bold text-gray-900">{{ product.rating || 5 }}</span>
                </div>
                <span class="text-[11px] text-gray-500">({{ product.reviews_count || 0 }})</span>
              </div>

              <!-- Price & Stock - Combined -->
              <div class="p-3 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-lg border-2 border-blue-300">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="flex items-baseline gap-2">
                      <span class="text-2xl font-black text-blue-600">{{ formatPrice(currentPrice) }}₫</span>
                      <span v-if="originalPrice && originalPrice > currentPrice" class="text-sm text-gray-400 line-through">{{ formatPrice(originalPrice) }}₫</span>
                    </div>
                    <div v-if="discountPercent > 0" class="flex items-center gap-2 mt-1">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">-{{ discountPercent }}%</span>
                      <span class="text-[10px] text-blue-700 font-medium">Tiết kiệm {{ formatPrice(originalPrice - currentPrice) }}₫</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm" 
                         :class="isInStock ? 'bg-blue-600' : 'bg-red-500'">
                      <i class="fas text-xs text-white" 
                         :class="isInStock ? 'fa-check-circle' : 'fa-times-circle'"></i>
                      <span class="text-white font-bold text-xs">
                        {{ isInStock ? 'CÒN HÀNG' : 'HẾT HÀNG' }}
                      </span>
                    </div>
                    <span class="text-xs text-gray-600 font-semibold">
                      {{ availableStock }} sản phẩm
                    </span>
                  </div>
                </div>
              </div>

              <!-- Product Options - Clean & Clear -->
              <div class="space-y-2">
                <!-- Color Selection -->
                <div v-if="product.colors && product.colors.length > 0" class="p-3 bg-white rounded-lg border-2 border-gray-200">
                  <div class="space-y-2">
                    <span class="text-xs font-semibold text-gray-700">Màu sắc:</span>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        v-for="color in product.colors" 
                        :key="color.id"
                        @click="selectColor(color)"
                        :title="color.name"
                        class="relative transition-all duration-200 focus:outline-none group"
                      >
                        <div 
                          class="w-10 h-10 rounded-full border-[3px] transition-all duration-200 flex items-center justify-center relative overflow-hidden"
                          :style="{ backgroundColor: color.color_code || '#ccc' }"
                          :class="selectedColor?.id === color.id 
                            ? 'border-blue-600 shadow-md scale-110' 
                            : 'border-gray-300 hover:border-gray-400 hover:shadow-sm hover:scale-105'"
                        >
                          <!-- Check icon overlay for selected -->
                          <div v-if="selectedColor?.id === color.id" 
                               class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <i class="fas fa-check text-white text-base drop-shadow-lg"></i>
                          </div>
                        </div>
                        <!-- Color name tooltip on hover -->
                        <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {{ color.name }}
                        </span>
                      </button>
                    </div>
                    <span v-if="selectedColor" class="text-xs font-semibold text-blue-700 block">
                      Đã chọn: {{ selectedColor.name }}
                    </span>
                  </div>
                </div>

                <!-- Capacity Selection -->
                <div v-if="product.capacities && product.capacities.length > 0" class="p-3 bg-white rounded-lg border-2 border-gray-200">
                  <div class="space-y-2">
                    <span class="text-xs font-semibold text-gray-700">Dung lượng:</span>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        v-for="capacity in product.capacities" 
                        :key="capacity.id"
                        @click="selectCapacity(capacity)"
                        :disabled="capacity.stock <= 0"
                        class="relative px-3 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                        :class="selectedCapacity?.id === capacity.id 
                          ? 'border-blue-600 bg-blue-50 shadow-sm' 
                          : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'"
                      >
                        <div class="flex items-center gap-1.5">
                          <i v-if="selectedCapacity?.id === capacity.id" class="fas fa-check-circle text-blue-600 text-xs"></i>
                          <span class="text-xs font-bold whitespace-nowrap" 
                                :class="selectedCapacity?.id === capacity.id ? 'text-blue-900' : 'text-gray-900'">
                            {{ capacity.display_name || capacity.name }}
                          </span>
                        </div>
                        <!-- Discount Badge -->
                        <div v-if="capacity.discount_percentage > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                          -{{ capacity.discount_percentage }}%
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Quantity Selector -->
                <div class="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-gray-200">
                  <span class="text-xs font-semibold text-gray-700">Số lượng:</span>
                  <div class="flex items-center gap-3">
                    <div class="flex items-center border-2 border-gray-300 rounded-lg bg-white overflow-hidden">
                      <button @click="decreaseQuantity" :disabled="quantity <= 1" 
                              class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-200 focus:outline-none">
                        <i class="fas fa-minus text-gray-700 text-xs"></i>
                      </button>
                      <input type="number" v-model="quantity" min="1" :max="availableStock" 
                             class="w-16 h-10 text-center border-0 outline-none font-bold text-base text-gray-900"/>
                      <button @click="increaseQuantity" :disabled="quantity >= availableStock" 
                              class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l border-gray-200 focus:outline-none">
                        <i class="fas fa-plus text-gray-700 text-xs"></i>
                      </button>
                    </div>
                    <span class="text-[11px] text-gray-500 whitespace-nowrap">Tối đa: {{ availableStock }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons - Compact -->
              <div class="flex gap-3">
                <button 
                  @click="addToCart" 
                  :disabled="!isInStock"
                  class="flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-bold text-base transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="isInStock 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                    : 'bg-gray-300 text-gray-500'"
                >
                  <i class="fas fa-shopping-cart mr-2 text-sm"></i>
                  {{ isInStock ? 'Thêm vào giỏ' : 'Hết hàng' }}
                </button>
                <button @click="buyNow" 
                        :disabled="!isInStock" 
                        class="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  <i class="fas fa-bolt mr-2 text-sm"></i>
                  Mua ngay
                </button>
                <button @click="shareProduct" 
                        class="px-4 py-3 border-2 border-gray-200 hover:border-blue-400 rounded-lg transition-all hover:shadow text-gray-600 hover:text-blue-600">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>

              <!-- Product Features - Compact -->
              <div class="grid grid-cols-2 gap-2.5 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div class="flex items-center gap-2">
                  <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i class="fas fa-shipping-fast text-white text-xs"></i>
                  </div>
                  <span class="text-[11px] font-medium text-gray-700">Giao miễn phí</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <i class="fas fa-undo-alt text-white text-xs"></i>
                  </div>
                  <span class="text-[11px] font-medium text-gray-700">Đổi trả 30 ngày</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i class="fas fa-shield-alt text-white text-xs"></i>
                  </div>
                  <span class="text-[11px] font-medium text-gray-700">Bảo hành chính hãng</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <i class="fas fa-headset text-white text-xs"></i>
                  </div>
                  <span class="text-[11px] font-medium text-gray-700">Hỗ trợ 24/7</span>
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
                  ? 'text-blue-600 bg-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'"
              >
                <span class="relative z-10">{{ tab.label }}</span>
                <div v-if="activeTab === tab.id" 
                     class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              </button>
            </div>
            
            <div class="p-6 lg:p-8">
              <!-- Description Tab -->
              <div v-if="activeTab === 'description'" class="space-y-8">
                <div class="prose max-w-none">
                  <div v-if="product.description" v-html="product.description" class="text-gray-700 leading-relaxed"></div>
                  <p v-else class="text-gray-500 italic">Chưa có mô tả chi tiết cho sản phẩm này.</p>
                </div>
                  
                <!-- All Capacities with Prices -->
                <div v-if="product.capacities && product.capacities.length" class="space-y-4">

                  <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-microchip text-blue-600 mr-3"></i>
                    Các tùy chọn dung lượng
                  </h3>
                  <div class="overflow-hidden rounded-2xl border border-gray-200">
                    <div v-for="(capacity, index) in product.capacities" 
                         :key="capacity.id"
                         class="flex items-center justify-between border-b border-gray-100 last:border-b-0 p-4"
                         :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                      <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                          <i class="fas fa-hdd"></i>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900">{{ capacity.name }}</div>
                          <div v-if="capacity.stock <= 0" class="text-xs text-red-500">Hết hàng</div>
                          <div v-else-if="capacity.stock < 10" class="text-xs text-orange-500">Còn {{ capacity.stock }} sản phẩm</div>
                          <div v-else class="text-xs text-blue-600">Còn hàng ({{ capacity.stock }})</div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-xl font-bold text-blue-600">{{ formatPrice(capacity.final_price || capacity.price) }}đ</div>
                        <div v-if="capacity.price && capacity.final_price && capacity.price > capacity.final_price" class="flex items-center space-x-2">
                          <span class="text-sm text-gray-400 line-through">{{ formatPrice(capacity.price) }}đ</span>
                          <span class="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">-{{ capacity.discount_percentage }}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- All Colors -->
                <div v-if="product.colors && product.colors.length" class="space-y-4">
                  <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-palette text-blue-600 mr-3"></i>
                    Các màu sắc có sẵn
                  </h3>
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="color in product.colors" 
                         :key="color.id"
                         class="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                      <div class="flex items-center space-x-3">
                        <div 
                          class="w-12 h-12 rounded-full border-2 border-gray-300 shadow-inner"
                          :style="{ backgroundColor: color.color_code || color.value }"
                        ></div>
                        <div class="flex-1">
                          <div class="font-semibold text-gray-900">{{ color.name }}</div>
                          <div class="text-xs text-gray-500">{{ color.color_code }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Specifications -->
                <div v-if="product.specifications || product.specs" class="space-y-4">
                  <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-cogs text-blue-600 mr-3"></i>
                    Thông số kỹ thuật
                  </h3>
                  <div class="overflow-hidden rounded-2xl border border-gray-200">
                    <div v-for="(value, key, index) in (product.specifications || product.specs)" 
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
                      <div class="text-5xl font-bold text-blue-600 mb-2">{{ product.rating || 5 }}</div>
                      <div class="flex justify-center space-x-1 mb-2">
                        <i 
                          v-for="star in 5" 
                          :key="star"
                          class="fas fa-star text-2xl"
                          :class="star <= (product.rating || 5) ? 'text-yellow-400' : 'text-gray-300'"
                        ></i>
                      </div>
                      <span class="text-gray-600">{{ product.reviews_count || 0 }} đánh giá</span>
                    </div>
                  </div>
                  
                  <button @click="showReviewForm = !showReviewForm" 
                          class="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <i class="fas fa-pen mr-2"></i>
                    Viết đánh giá
                  </button>
                </div>

                <!-- Review Form -->
                <form v-if="showReviewForm" @submit.prevent="submitReview" 
                      class="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 space-y-6">
                  <h3 class="text-xl font-bold text-gray-900 flex items-center">
                    <i class="fas fa-edit text-blue-600 mr-3"></i>
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
                           class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200" 
                           placeholder="Nhập tiêu đề đánh giá..."/>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Nội dung:</label>
                    <textarea v-model="reviewContent" 
                              rows="4" 
                              required 
                              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 resize-none"
                              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."></textarea>
                  </div>
                  <div class="flex space-x-4">
                    <button type="submit" 
                            class="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
                <div v-if="product.reviews && product.reviews.length" class="space-y-6">
                  <div v-for="review in product.reviews" 
                       :key="review.id" 
                       class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {{ (review.user_name || review.userName || 'U').charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900">{{ review.user_name || review.userName || 'Người dùng' }}</h4>
                          <p class="text-sm text-gray-500">{{ formatDate(review.created_at || review.date) }}</p>
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
                    <h5 v-if="review.title" class="font-semibold text-gray-900 mb-2">{{ review.title }}</h5>
                    <p class="text-gray-700 leading-relaxed">{{ review.content || review.comment }}</p>
                  </div>
                </div>
                <div v-else class="text-center py-12">
                  <i class="fas fa-comment-slash text-5xl text-gray-300 mb-4"></i>
                  <p class="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
                  <p class="text-sm text-gray-400 mt-2">Hãy là người đầu tiên đánh giá sản phẩm!</p>
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

    <!-- Image Lightbox Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLightbox" 
             class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
             @click="closeLightbox">
          <!-- Close Button -->
          <button @click="closeLightbox" 
                  class="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all z-10 group">
            <i class="fas fa-times text-white text-xl group-hover:scale-110 transition-transform"></i>
          </button>

          <!-- Image Counter -->
          <div class="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            {{ currentLightboxIndex + 1 }} / {{ allImages.length }}
          </div>

          <!-- Navigation Arrows -->
          <button v-if="currentLightboxIndex > 0"
                  @click.stop="previousImage" 
                  class="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all group">
            <i class="fas fa-chevron-left text-white text-2xl group-hover:scale-110 transition-transform"></i>
          </button>
          
          <button v-if="currentLightboxIndex < allImages.length - 1"
                  @click.stop="nextImage" 
                  class="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all group">
            <i class="fas fa-chevron-right text-white text-2xl group-hover:scale-110 transition-transform"></i>
          </button>

          <!-- Main Image -->
          <div class="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center" @click.stop>
            <img :src="allImages[currentLightboxIndex]" 
                 :alt="product.name" 
                 class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"/>
          </div>

          <!-- Thumbnails -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-2xl overflow-x-auto px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
            <button v-for="(image, index) in allImages" 
                    :key="index"
                    @click.stop="currentLightboxIndex = index"
                    class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all"
                    :class="currentLightboxIndex === index ? 'border-green-500 ring-2 ring-green-300' : 'border-white/30 hover:border-white/60'">
              <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover"/>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import ProductCard from '../components/Product/ProductCard.vue'
import { useProductDetail } from '@/composables'
import toast from '@/services/toast'

const modules = [Navigation]
const route = useRoute()
const router = useRouter()

// Use composable
const {
  product,
  loading,
  error,
  selectedColor,
  selectedCapacity,
  selectedVariant,
  quantity,
  mainImage,
  currentPrice,
  originalPrice,
  discountPercent,
  isInStock,
  availableStock,
  isInitialLoad,
  loadProductBySlug,
  selectColor,
  selectCapacity,
  changeMainImage,
  increaseQuantity,
  decreaseQuantity,
  formatPrice,
  toAbs
} = useProductDetail()

// Lightbox state
const showLightbox = ref(false)
const currentLightboxIndex = ref(0)

// Get all images for lightbox
const allImages = computed(() => {
  const images = []
  if (product.value?.image_url) {
    images.push(toAbs(product.value.image_url))
  }
  if (product.value?.product_images) {
    product.value.product_images.forEach(img => {
      images.push(toAbs(img.url || img.image_url))
    })
  }
  return images
})

// Use composable
const {
  product,
  loading,
  error,
  selectedColor,
  selectedCapacity,
  selectedVariant,
  quantity,
  mainImage,
  currentPrice,
  originalPrice,
  discountPercent,
  isInStock,
  availableStock,
  isInitialLoad,
  loadProductBySlug,
  selectColor,
  selectCapacity,
  changeMainImage,
  increaseQuantity,
  decreaseQuantity,
  formatPrice,
  toAbs
} = useProductDetail()

// Lightbox state
const showLightbox = ref(false)
const currentLightboxIndex = ref(0)

// Get all images for lightbox
const allImages = computed(() => {
  const images = []
  if (product.value?.image_url) {
    images.push(toAbs(product.value.image_url))
  }
  if (product.value?.product_images) {
    product.value.product_images.forEach(img => {
      images.push(toAbs(img.url || img.image_url))
    })
  }
  return images
})


// Additional UI state
const isWishlisted = ref(false)
const activeTab = ref('description')
const showReviewForm = ref(false)
const reviewRating = ref(5)
const reviewTitle = ref('')
const reviewContent = ref('')
const relatedProducts = ref([])

// Computed: Product name with selected capacity
const displayProductName = computed(() => {
  if (!product.value) return ''
  
  let name = product.value.name
  
  // Add selected capacity to product name
  if (selectedCapacity.value) {
    const capacityName = selectedCapacity.value.display_name || selectedCapacity.value.name
    if (capacityName) {
      name += ` ${capacityName}`
    }
  }
  
  return name
})

const tabs = [
  { id: 'description', label: 'Mô tả sản phẩm' },
  { id: 'reviews', label: 'Đánh giá' },
  { id: 'shipping', label: 'Vận chuyển' }
]

// Watch for color changes - only change image after initial load
watch(selectedColor, (val) => {
  if (!val?.image_url) return
  if (isInitialLoad.value) return
  if (val.image_url.includes('.svg')) return
  if (toAbs(val.image_url) === mainImage.value) return
  changeMainImage(val.image_url)
})

// Watch for capacity changes - no image change needed
watch(selectedCapacity, () => {
  // No-op: capacity doesn't affect main image
})

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

// Lightbox methods
const openLightbox = () => {
  // Find current image index
  const currentImageIndex = allImages.value.findIndex(img => img === mainImage.value)
  currentLightboxIndex.value = currentImageIndex >= 0 ? currentImageIndex : 0
  showLightbox.value = true
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentLightboxIndex.value < allImages.value.length - 1) {
    currentLightboxIndex.value++
  }
}

const previousImage = () => {
  if (currentLightboxIndex.value > 0) {
    currentLightboxIndex.value--
  }
}

// Keyboard navigation for lightbox
const handleKeydown = (e) => {
  if (!showLightbox.value) return
  
  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    previousImage()
  }
}

// Add keyboard listener
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

const addToCart = async () => {
  // Check if user is logged in
  const token = localStorage.getItem('token')
  if (!token) {
    await toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return
  }

  if (!selectedColor.value || !selectedCapacity.value) {
    await toast.warning('Vui lòng chọn màu sắc và dung lượng')
    return
  }

  if (!selectedVariant.value) {
    await toast.error('Không tìm thấy variant sản phẩm')
    return
  }

  if (isInStock.value) {
    try {
      // Import useCart dynamically
      const { useCart } = await import('@/composables')
      const { addToCart: apiAddToCart } = useCart()
      
      // Call API to add to cart (toast notification handled in useCart)
      const result = await apiAddToCart({
        product_id: product.value.id,
        product_variant_id: selectedVariant.value.id,
        quantity: quantity.value
      })
      
      // Don't show additional success message, useCart already handles it
      if (!result) {
        await toast.error('Không thể thêm sản phẩm vào giỏ hàng')
      }
    } catch (error) {
      await toast.error('Không thể thêm sản phẩm vào giỏ hàng')
      console.error('Add to cart error:', error)
    }
  }
}

const buyNow = async () => {
  if (!selectedColor.value || !selectedCapacity.value) {
    await toast.warning('Vui lòng chọn màu sắc và dung lượng')
    return
  }
  
  await addToCart()
  router.push('/cart')
}

const addToWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  console.log('Add to wishlist:', product.value)
  if (isWishlisted.value) {
    toast.success('Đã thêm vào danh sách yêu thích!')
  } else {
    toast.info('Đã xóa khỏi danh sách yêu thích!')
  }
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
    toast.success('Đã copy link sản phẩm!')
  }
}

const submitReview = () => {
  const newReview = {
    id: Date.now(),
    userName: 'Người dùng',
    rating: reviewRating.value,
    title: reviewTitle.value,
    content: reviewContent.value,
    date: new Date().toISOString(),
    verified: true
  }
  console.log('Submit review:', newReview)
  // TODO: Implement review submission
  toast.success('Cảm ơn bạn đã đánh giá!')
  showReviewForm.value = false
  reviewTitle.value = ''
  reviewContent.value = ''
  reviewRating.value = 5
}

const handleAddToCart = (product) => {
  console.log('Related product add to cart:', product)
}

const handleAddToWishlist = (product) => {
  console.log('Related product add to wishlist:', product)
}

// Load product data
onMounted(async () => {
  const slug = route.params.slug || route.params.id
  await loadProductBySlug(slug)
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

/* Swiper Navigation Buttons */
:deep(.product-gallery-swiper .swiper-button-next),
:deep(.product-gallery-swiper .swiper-button-prev) {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

:deep(.product-gallery-swiper .swiper-button-next:hover),
:deep(.product-gallery-swiper .swiper-button-prev:hover) {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

:deep(.product-gallery-swiper .swiper-button-next::after),
:deep(.product-gallery-swiper .swiper-button-prev::after) {
  font-size: 14px;
  font-weight: bold;
  color: #3b82f6;
}

:deep(.product-gallery-swiper .swiper-button-disabled) {
  opacity: 0.3;
}

/* Lightbox Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  background-color: #60a5fa;
  border-radius: 9999px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #3b82f6;
}

/* Ensure text wrapping for long product names */
h1 {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>