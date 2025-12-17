<template>
  <div class="cart-page bg-gray-50 min-h-screen">
    <!-- Compact Page Header -->
    <section class="page-header bg-gradient-to-br from-blue-500 via-purple-600 to-blue-600 relative overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center text-sm mb-4 text-white/80">
          <router-link to="/" class="hover:text-white transition-colors flex items-center">
            <i class="fas fa-home mr-1.5"></i>
            Trang chủ
          </router-link>
          <i class="fas fa-chevron-right mx-2 text-xs"></i>
          <span class="text-white font-medium">Giỏ hàng</span>
        </nav>
        
        <!-- Header Content - Compact -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <i class="fas fa-shopping-cart mr-3 text-white/80"></i>
              Giỏ hàng của bạn
            </h1>
            <p class="text-white/90 text-sm md:text-base">
              Xem lại các sản phẩm bạn đã chọn và tiến hành thanh toán một cách nhanh chóng
            </p>
          </div>
        </div>
        
        <!-- Compact Stats -->
        <div class="flex flex-wrap gap-3">
          <div class="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20 hover:bg-white/20 transition-all">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="fas fa-box text-white text-sm"></i>
              </div>
              <div>
                <div class="text-lg font-bold text-white">{{ totalItems }}</div>
                <div class="text-white/80 text-xs">Sản phẩm</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20 hover:bg-white/20 transition-all">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="fas fa-dollar-sign text-white text-sm"></i>
              </div>
              <div>
                <div class="text-lg font-bold text-white">{{ formatPrice(selectedTotal) }}₫</div>
                <div class="text-white/80 text-xs">Đã chọn</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart Content -->
    <section class="cart-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="empty-cart flex items-center justify-center min-h-96">
          <div class="empty-cart-content text-center max-w-md mx-auto p-8">
            <div class="mb-8">
              <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <i class="fas fa-shopping-cart text-5xl text-gray-400"></i>
              </div>
              <h2 class="text-3xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h2>
              <p class="text-gray-600 text-lg leading-relaxed mb-8">
                Bạn chưa có sản phẩm nào trong giỏ hàng. 
                Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
              </p>
              <router-link 
                to="/products" 
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i class="fas fa-arrow-right mr-2"></i>
                Bắt đầu mua sắm
              </router-link>
            </div>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else>
          <!-- 2 Column Layout: Products (Left) + Summary (Right) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- LEFT COLUMN: Cart Items List (2/3 width) -->
            <div class="lg:col-span-2 space-y-4">
              
              <!-- Global Warning for items without variants -->
              <div v-if="hasItemsWithoutVariant" 
                   class="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-4 shadow-md">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-exclamation-triangle text-red-600 text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-red-800 mb-1 text-lg">⚠️ Có sản phẩm chưa chọn màu sắc/dung lượng</h3>
                    <p class="text-red-700 text-sm mb-2">
                      Một số sản phẩm trong giỏ hàng của bạn chưa có thông tin về màu sắc hoặc dung lượng. 
                      Bạn cần <strong>xóa các sản phẩm này</strong> và <strong>thêm lại từ trang chi tiết sản phẩm</strong> để chọn đầy đủ thông tin trước khi thanh toán.
                    </p>
                    <div class="flex items-center gap-2 text-xs text-red-600">
                      <i class="fas fa-info-circle"></i>
                      <span>Các sản phẩm có cảnh báo màu đỏ bên dưới cần được xử lý</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Select All Bar -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all"
                    />
                    <div class="flex items-center gap-2">
                      <i class="fas fa-check-double text-blue-600 group-hover:scale-110 transition-transform"></i>
                      <span class="font-semibold text-gray-900">Chọn tất cả</span>
                      <span class="text-sm text-gray-500">
                        (<span class="font-medium text-blue-600">{{ selectedItems.length }}</span>/{{ cartItems.length }} sản phẩm)
                      </span>
                    </div>
                  </label>
                  <button 
                    v-if="selectedItems.length > 0"
                    @click="clearCart" 
                    class="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition-all group">
                    <i class="fas fa-trash-alt group-hover:scale-110 transition-transform"></i>
                    <span>Xóa {{ selectedItems.length }} SP</span>
                  </button>
                </div>
              </div>

              <!-- Product Cards -->
              <div class="space-y-3">
                <div
                  v-for="item in cartItems"
                  :key="`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`"
                  class="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                  :class="{ 'ring-2 ring-blue-500 border-blue-500 shadow-blue-100': item.selected }"
                >
                  <div class="flex gap-4">
                    <!-- Checkbox + Image -->
                    <div class="flex items-start gap-3">
                      <div class="relative pt-1">
                        <input
                          type="checkbox"
                          v-model="item.selected"
                          @change="updateSelectedItems"
                          class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all hover:scale-110"
                        />
                      </div>
                      <div class="relative w-24 h-24 overflow-hidden rounded-xl flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:shadow-lg transition-shadow">
                        <img :src="item.image" :alt="item.name"
                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div v-if="item.discount"
                             class="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                          -{{ item.discount }}%
                        </div>
                        <div v-if="item.selected" class="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center">
                          <i class="fas fa-check-circle text-blue-600 text-2xl drop-shadow-lg"></i>
                        </div>
                      </div>
                    </div>

                    <!-- Product Info -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-900 mb-1.5 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors group-hover:text-blue-600">
                        {{ item.name }}
                      </h3>

                      <!-- Variant Info with improved styling -->
                      <div class="flex flex-wrap gap-2 mb-2">
                        <span v-if="item.selectedSize"
                              class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
                          <i class="fas fa-microchip mr-1.5"></i>{{ item.selectedSize }}
                        </span>
                        <span v-if="item.selectedColor"
                              class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200">
                          <span class="w-3 h-3 rounded-full mr-1.5 border-2 border-white shadow-sm" :style="{ backgroundColor: item.selectedColor.value }"></span>
                          {{ item.selectedColor.name }}
                        </span>
                        
                        <!-- Warning when no variant selected -->
                        <div v-if="!item.variantId" 
                             class="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-1">
                          <div class="flex items-start gap-2">
                            <i class="fas fa-exclamation-triangle text-red-600 text-sm mt-0.5"></i>
                            <div class="flex-1 text-xs text-red-700">
                              <p class="font-semibold mb-0.5">⚠️ Chưa chọn màu sắc/dung lượng</p>
                              <p class="text-red-600">Vui lòng <strong>xóa sản phẩm này</strong> và thêm lại từ trang chi tiết để chọn màu sắc và dung lượng. Không thể thanh toán với sản phẩm này.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Price & Quantity -->
                      <div class="flex items-center justify-between mt-3 flex-wrap gap-3">
                        <!-- Price -->
                        <div class="flex items-baseline gap-2">
                          <span class="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            {{ formatPrice(getItemPrice(item)) }}₫
                          </span>
                          <span v-if="item.originalPrice && item.discount" class="text-sm text-gray-400 line-through">
                            {{ formatPrice(item.originalPrice) }}₫
                          </span>
                        </div>

                        <!-- Quantity Controls & Delete -->
                        <div class="flex items-center gap-3">
                          <div class="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors shadow-sm">
                            <button 
                              @click="decreaseQuantity(item)" 
                              :disabled="item.quantity <= 1"
                              class="w-8 h-8 flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95">
                              <i class="fas fa-minus text-xs text-gray-600"></i>
                            </button>
                            <span class="px-4 py-1 font-bold text-gray-900 min-w-[3rem] text-center bg-gray-50 select-none">
                              {{ item.quantity }}
                            </span>
                            <button 
                              @click="increaseQuantity(item)" 
                              :disabled="item.quantity >= item.stockQuantity"
                              class="w-8 h-8 flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95">
                              <i class="fas fa-plus text-xs text-gray-600"></i>
                            </button>
                          </div>

                          <!-- Delete Button -->
                          <button 
                            @click="removeItem(item)"
                            class="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all group/delete">
                            <i class="fas fa-trash-alt text-sm group-hover/delete:scale-110 transition-transform"></i>
                          </button>
                        </div>
                      </div>

                      <!-- Stock Warning with better styling -->
                      <div v-if="item.stockQuantity <= 10" class="mt-2.5">
                        <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                             :class="item.stockQuantity <= 5 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-orange-50 text-orange-700 border border-orange-200'">
                          <i class="fas fa-exclamation-triangle animate-pulse"></i>
                          <span>Chỉ còn <strong>{{ item.stockQuantity }}</strong> sản phẩm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Continue Shopping Button -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100 p-4 hover:shadow-md transition-all">
                <router-link 
                  to="/products" 
                  class="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                  <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                  <span>Tiếp tục mua sắm</span>
                  <i class="fas fa-shopping-bag"></i>
                </router-link>
              </div>
            </div>

            <!-- RIGHT COLUMN: Order Summary (1/3 width, Sticky) -->
            <div class="lg:col-span-1">
              <div class="sticky top-4 space-y-4">
                
                <!-- Order Summary Card -->
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4">
                    <h3 class="font-bold text-white flex items-center gap-2 text-lg">
                      <i class="fas fa-receipt"></i>
                      <span>Tổng đơn hàng</span>
                    </h3>
                  </div>
                  
                  <div class="p-5 space-y-3">
                    
                    <!-- Coupon Section - Integrated -->
                    <div class="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl border-2 border-orange-200 p-4 mb-4">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                          <i class="fas fa-ticket-alt text-white"></i>
                        </div>
                        <div>
                          <h4 class="font-bold text-gray-900 text-sm">Mã giảm giá</h4>
                          <p class="text-xs text-gray-600">Tiết kiệm thêm</p>
                        </div>
                      </div>
                      
                      <!-- Applied Coupon Display -->
                      <div v-if="appliedCoupon" class="bg-white rounded-lg p-3 border-2 border-green-300 shadow-sm">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <i class="fas fa-check-circle text-green-600"></i>
                            </div>
                            <div>
                              <p class="font-bold text-green-700 text-sm">{{ appliedCoupon.code }}</p>
                              <p class="text-xs text-green-600">Giảm {{ appliedCoupon.discount }}%</p>
                            </div>
                          </div>
                          <button 
                            @click="removeCoupon"
                            class="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-all">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                        <div class="pt-2 border-t border-green-200">
                          <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Tiết kiệm:</span>
                            <span class="font-bold text-green-600">-{{ formatPrice(selectedCouponDiscount) }}₫</span>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Coupon Input -->
                      <div v-else class="space-y-2">
                        <div class="flex gap-2">
                          <div class="relative flex-1">
                            <input 
                              v-model="couponCode"
                              type="text" 
                              placeholder="Nhập mã..."
                              class="w-full pl-9 pr-3 py-2.5 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm font-medium bg-white"
                            />
                            <i class="fas fa-tag absolute left-3 top-1/2 -translate-y-1/2 text-orange-400"></i>
                          </div>
                          <button 
                            @click="applyCoupon"
                            class="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all text-sm shadow-md hover:shadow-lg active:scale-95">
                            <i class="fas fa-check"></i>
                          </button>
                        </div>
                        
                        <!-- Popular Coupons -->
                        <div>
                          <p class="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1">
                            <i class="fas fa-fire text-orange-500 text-xs"></i>
                            <span>Phổ biến:</span>
                          </p>
                          <div class="flex flex-wrap gap-1.5">
                            <button 
                              v-for="code in ['SAVE10', 'SAVE20', 'WELCOME15']"
                              :key="code"
                              @click="couponCode = code"
                              class="px-2.5 py-1.5 bg-white text-orange-700 hover:bg-orange-100 border border-orange-300 rounded-md text-xs font-bold transition-all hover:scale-105 active:scale-95">
                              {{ code }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Subtotal -->
                    <div class="flex justify-between items-center py-2 border-b border-gray-100">
                      <span class="text-gray-600 flex items-center gap-2">
                        <i class="fas fa-box text-blue-500"></i>
                        <span>Tạm tính (<strong class="text-gray-900">{{ selectedItems.length }}</strong> SP):</span>
                      </span>
                      <span class="font-bold text-gray-900">{{ formatPrice(selectedSubtotal) }}₫</span>
                    </div>
                    
                    <!-- Discount -->
                    <div v-if="selectedDiscount > 0" class="flex justify-between items-center py-2 border-b border-gray-100">
                      <span class="text-gray-600 flex items-center gap-2">
                        <i class="fas fa-tag text-green-500"></i>
                        <span>Giảm giá:</span>
                      </span>
                      <span class="font-bold text-green-600">-{{ formatPrice(selectedDiscount) }}₫</span>
                    </div>
                    
                    <!-- Coupon Discount -->
                    <div v-if="appliedCoupon" class="flex justify-between items-center py-2 border-b border-gray-100">
                      <span class="text-gray-600 flex items-center gap-2">
                        <i class="fas fa-ticket-alt text-green-500"></i>
                        <span>Mã giảm giá:</span>
                      </span>
                      <span class="font-bold text-green-600">-{{ formatPrice(selectedCouponDiscount) }}₫</span>
                    </div>
                    
                    <!-- Shipping -->
                    <div class="flex justify-between items-center py-2 border-b border-gray-100">
                      <span class="text-gray-600 flex items-center gap-2">
                        <i class="fas fa-shipping-fast text-purple-500"></i>
                        <span>Vận chuyển:</span>
                      </span>
                      <span class="font-semibold">
                        <span v-if="isSelectedEligibleForFreeShipping" class="text-green-600 flex items-center gap-1">
                          <i class="fas fa-check-circle"></i>
                          <span>Miễn phí</span>
                        </span>
                        <span v-else class="text-gray-900">{{ formatPrice(selectedShippingFee) }}₫</span>
                      </span>
                    </div>
                    
                    <!-- Free Shipping Progress -->
                    <div v-if="!isSelectedEligibleForFreeShipping && selectedItems.length > 0" 
                         class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3 my-3">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-green-700 font-medium text-xs flex items-center gap-1.5">
                          <i class="fas fa-truck"></i>
                          <span>Mua thêm <strong class="text-sm">{{ formatPrice(selectedAmountForFreeShipping) }}₫</strong></span>
                        </span>
                      </div>
                      <div class="w-full bg-green-200 rounded-full h-2 overflow-hidden">
                        <div class="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500 shadow-sm" 
                             :style="{ width: Math.min(100, (selectedAfterCouponTotal / FREE_SHIPPING_THRESHOLD) * 100) + '%' }"></div>
                      </div>
                      <p class="text-xs text-green-600 mt-1.5 text-center font-medium">
                        để được miễn phí vận chuyển
                      </p>
                    </div>
                    
                    <!-- Total -->
                    <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mt-4 border-2 border-blue-200">
                      <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <i class="fas fa-calculator text-blue-600"></i>
                          <span>Tổng cộng:</span>
                        </span>
                        <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {{ formatPrice(selectedTotal) }}₫
                        </span>
                      </div>
                    </div>
                    
                    <!-- Checkout Button -->
                    <button 
                      @click="proceedToCheckout"
                      :disabled="selectedItems.length === 0 || hasItemsWithoutVariant"
                      class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100">
                      <i class="fas fa-lock"></i>
                      <span v-if="hasItemsWithoutVariant">⚠️ Cần xử lý sản phẩm chưa chọn variant</span>
                      <span v-else-if="selectedItems.length > 0">Thanh toán {{ selectedItems.length }} sản phẩm</span>
                      <span v-else>Chọn sản phẩm để thanh toán</span>
                      <i class="fas fa-arrow-right"></i>
                    </button>
                    
                    <!-- Security Badge -->
                    <div class="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
                      <i class="fas fa-shield-check text-green-500"></i>
                      <span>Thanh toán bảo mật SSL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Viewed -->
    <section v-if="recentlyViewed.length > 0" class="py-5 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title">Sản phẩm đã xem gần đây</h2>
        <div class="products-grid">
          <ProductCard 
            v-for="product in recentlyViewed" 
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables'
import ProductCard from '../components/Product/ProductCard.vue'
import Swal from 'sweetalert2'
import toast from '@/services/toast'

const router = useRouter()

// Use Cart Composable
const {
  cartItems,
  loading,
  fetchCart,
  updateQuantity,
  removeItem: removeFromCart,
  clearCart: clearAllCart,
  validateCart,
  totalItems,
  selectedItems,
  selectedSubtotal,
  selectedTotal,
  isEligibleForFreeShipping,
  amountForFreeShipping,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE
} = useCart()

// Local state
const recentlyViewed = ref([])
const couponCode = ref('')
const appliedCoupon = ref(null)
const showRemoveModal = ref(false)
const itemToRemove = ref(null)

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (getItemPrice(item) * item.quantity)
  }, 0)
})

const totalDiscount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    if (item.discount && item.originalPrice) {
      const discountAmount = item.originalPrice * (item.discount / 100)
      return total + (discountAmount * item.quantity)
    }
    return total
  }, 0)
})

const selectedDiscount = computed(() => {
  return selectedItems.value.reduce((total, item) => {
    if (item.discount && item.originalPrice) {
      const discountAmount = item.originalPrice * (item.discount / 100)
      return total + (discountAmount * item.quantity)
    }
    return total
  }, 0)
})

const couponDiscount = computed(() => {
  if (appliedCoupon.value) {
    return selectedSubtotal.value * (appliedCoupon.value.discount / 100)
  }
  return 0
})

const selectedCouponDiscount = computed(() => {
  return couponDiscount.value
})

const afterCouponTotal = computed(() => {
  return selectedSubtotal.value - couponDiscount.value
})

const selectedAfterCouponTotal = computed(() => {
  return afterCouponTotal.value
})

const isSelectedEligibleForFreeShipping = computed(() => {
  return isEligibleForFreeShipping.value
})

const selectedShippingFee = computed(() => {
  return isEligibleForFreeShipping.value ? 0 : STANDARD_SHIPPING_FEE
})

const selectedAmountForFreeShipping = computed(() => {
  return amountForFreeShipping.value
})

const shippingFee = computed(() => {
  return selectedShippingFee.value
})

const isAllSelected = computed(() => {
  return cartItems.value.length > 0 && cartItems.value.every(item => item.selected)
})

const hasItemsWithoutVariant = computed(() => {
  // Check variantId instead of selectedColor/selectedSize
  // Because backend requires variant_id in database
  return cartItems.value.some(item => !item.variantId)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const getItemPrice = (item) => {
  if (item.discount && item.originalPrice) {
    return item.originalPrice * (1 - item.discount / 100)
  }
  return item.price
}

const getItemTotal = (item) => {
  return getItemPrice(item) * item.quantity
}

const increaseQuantity = async (item) => {
  if (item.quantity < item.stockQuantity) {
    const newQuantity = item.quantity + 1
    await updateQuantity(item.id, newQuantity)
  }
}

const decreaseQuantity = async (item) => {
  if (item.quantity > 1) {
    const newQuantity = item.quantity - 1
    await updateQuantity(item.id, newQuantity)
  }
}

const removeItem = async (item) => {
  const result = await Swal.fire({
    title: 'Xóa sản phẩm?',
    html: `Bạn có chắc chắn muốn xóa <strong>${item.name}</strong> khỏi giỏ hàng?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Xóa sản phẩm',
    cancelButtonText: 'Hủy bỏ',
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-xl px-6 py-3 font-semibold',
      cancelButton: 'rounded-xl px-6 py-3 font-semibold'
    }
  })

  if (result.isConfirmed) {
    await removeFromCart(item.id)
  }
}

const confirmRemoveItem = async () => {
  if (itemToRemove.value) {
    await removeFromCart(itemToRemove.value.id)
  }
  
  showRemoveModal.value = false
  itemToRemove.value = null
}

const clearCart = async () => {
  const result = await Swal.fire({
    title: 'Xóa tất cả sản phẩm?',
    text: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Đồng ý xóa',
    cancelButtonText: 'Hủy bỏ',
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-xl px-6 py-3 font-semibold',
      cancelButton: 'rounded-xl px-6 py-3 font-semibold'
    }
  })

  if (result.isConfirmed) {
    await clearAllCart()
    appliedCoupon.value = null
  }
}

const addToWishlist = (item) => {
  // Handle add to wishlist logic
  Swal.fire({
    title: 'Thành công!',
    text: 'Đã thêm sản phẩm vào danh sách yêu thích',
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: 'rounded-2xl'
    }
  })
}

const applyCoupon = async () => {
  // TODO: Validate coupon with API
  // const response = await validateCoupon(couponCode.value)
  
  // Mock implementation - Replace with API call
  const validCoupons = {
    'SAVE10': { code: 'SAVE10', discount: 10 },
    'SAVE20': { code: 'SAVE20', discount: 20 },
    'WELCOME15': { code: 'WELCOME15', discount: 15 }
  }
  
  const coupon = validCoupons[couponCode.value.toUpperCase()]
  
  if (coupon) {
    appliedCoupon.value = coupon
    await toast.success(`Đã áp dụng mã ${coupon.code} - Giảm ${coupon.discount}%`)
  } else {
    await toast.error('Mã giảm giá không hợp lệ')
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCode.value = ''
}

// Selection methods
const toggleSelectAll = () => {
  const allSelected = isAllSelected.value
  cartItems.value.forEach(item => {
    item.selected = !allSelected
  })
}

const selectAllItems = () => {
  cartItems.value.forEach(item => {
    item.selected = true
  })
}

const updateSelectedItems = () => {
  // This method is called when individual checkboxes change
  // No need to save to storage anymore as cart is in database
}

const proceedToCheckout = async () => {
  if (selectedItems.value.length === 0) {
    await toast.warning('Vui lòng chọn ít nhất một sản phẩm để thanh toán')
    return
  }
  
  // Get selected cart item IDs
  const selectedIds = selectedItems.value.map(item => item.id)
  
  // Validate before checkout
  const validation = await validateCart()
  
  if (validation && validation.success) {
    // Navigate to checkout with cart item IDs as query params
    router.push({
      path: '/checkout',
      query: {
        items: selectedIds.join(',')
      }
    })
  }
}

const handleAddToCart = (product) => {
  // This is called from recently viewed products
  // Redirect to product detail page to select variant
  router.push(`/product/${product.slug}`)
}

// Load data on mount
onMounted(async () => {
  await fetchCart()
  
  // TODO: Load recently viewed products from API
  // fetchRecentlyViewedProducts()
})
</script>

<style scoped>
/* Only keep animations that Tailwind doesn't provide out of the box */
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

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
</style>