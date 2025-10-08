<template>
  <div class="cart-page bg-gray-50 min-h-screen">
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
          <span class="text-white font-medium">Giỏ hàng</span>
        </nav>
        
        <!-- Header Content -->
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Giỏ hàng của bạn
            </h1>
            <p class="text-lg text-white text-opacity-90 max-w-2xl">
              Xem lại các sản phẩm bạn đã chọn và tiến hành thanh toán một cách nhanh chóng
            </p>
          </div>
          <div class="hidden md:block">
            <div class="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <i class="fas fa-shopping-cart text-3xl text-white"></i>
            </div>
          </div>
        </div>
        
        <!-- Cart Stats -->
        <div class="mt-8 flex flex-wrap gap-6">
          <div class="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white border-opacity-20">
            <div class="flex items-center">
              <i class="fas fa-box text-white text-xl mr-3"></i>
              <div>
                <div class="text-2xl font-bold text-white">{{ totalItems }}</div>
                <div class="text-white text-opacity-80 text-sm">Sản phẩm</div>
              </div>
            </div>
          </div>
          <div class="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white border-opacity-20">
            <div class="flex items-center">
              <i class="fas fa-dollar-sign text-white text-xl mr-3"></i>
              <div>
                <div class="text-2xl font-bold text-white">${{ formatPrice(selectedTotal) }}</div>
                <div class="text-white text-opacity-80 text-sm">Đã chọn</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
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
        <div v-else class="cart-content">
          <div class="cart-layout">
            <!-- Cart Items List -->
            <div class="cart-items bg-white rounded-2xl shadow-lg border border-gray-100">
              <div class="cart-header px-8 py-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex items-center mr-4">
                      <input 
                        type="checkbox" 
                        :checked="isAllSelected"
                        @change="toggleSelectAll"
                        class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-3"
                      />
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-shopping-bag text-white text-lg"></i>
                      </div>
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold text-gray-900">Sản phẩm trong giỏ hàng</h2>
                      <p class="text-gray-500 text-sm">{{ selectedItems.length }} / {{ cartItems.length }} sản phẩm đã chọn</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button @click="selectAllItems" class="select-all-btn flex items-center px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors font-medium">
                      <i class="fas fa-check-square mr-2"></i>
                      Chọn tất cả
                    </button>
                    <button @click="clearCart" class="clear-cart-btn flex items-center px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium">
                      <i class="fas fa-trash mr-2"></i>
                      Xóa tất cả
                    </button>
                  </div>
                </div>
              </div>

              
              <div class="items-list px-8 py-6 space-y-6">
  <div
    v-for="item in cartItems"
    :key="`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`"
    class="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md
           flex flex-col gap-6
           lg:grid lg:grid-cols-[auto,1fr,auto,auto] lg:items-center lg:gap-6"
    :class="{ 'ring-2 ring-blue-500 bg-blue-50': item.selected }"
  >
    <!-- Cột 1: Checkbox + Ảnh (cố định kích thước) -->
    <div class="flex items-start gap-4 lg:col-[1]">
      <input
        type="checkbox"
        v-model="item.selected"
        @change="updateSelectedItems"
        class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
      />
      <div class="w-28 h-28 lg:w-32 lg:h-32 relative overflow-hidden rounded-xl flex-shrink-0">
        <img :src="item.image" :alt="item.name"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div v-if="item.discount"
             class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          -{{ item.discount }}%
        </div>
      </div>
    </div>

    <!-- Cột 2: Thông tin sản phẩm (chiếm hết phần co giãn) -->
    <div class="min-w-0 lg:col-[2]">
      <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
        <router-link :to="`/products/${item.id}`">{{ item.name }}</router-link>
      </h3>

      <div class="flex items-center mb-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {{ item.category }}
        </span>
      </div>

      <div v-if="item.selectedSize || item.selectedColor" class="flex flex-wrap gap-2 mb-3">
        <span v-if="item.selectedSize"
              class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
          <i class="fas fa-ruler mr-1"></i>{{ item.selectedSize }}
        </span>
        <span v-if="item.selectedColor"
              class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
          <span class="w-3 h-3 rounded-full mr-1" :style="{ backgroundColor: item.selectedColor.value }"></span>
          {{ item.selectedColor.name }}
        </span>
      </div>

      <div class="flex items-baseline gap-2">
        <span class="text-xl lg:text-2xl font-bold text-red-600">${{ formatPrice(getItemPrice(item)) }}</span>
        <span v-if="item.originalPrice && item.discount" class="text-lg text-gray-500 line-through">
          ${{ formatPrice(item.originalPrice) }}
        </span>
      </div>
    </div>

    <!-- Cột 3: Số lượng (giữ chiều rộng ổn định) -->
    <div class="flex flex-col items-center gap-2 lg:gap-3 lg:col-[3] lg:justify-self-center">
      <div class="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors
                  w-[152px]">
        <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1"
                class="w-12 h-12 flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-minus text-sm"></i>
        </button>
        <span class="px-4 py-3 font-bold text-gray-900 min-w-16 text-center select-none">{{ item.quantity }}</span>
        <button @click="increaseQuantity(item)" :disabled="item.quantity >= item.stockQuantity"
                class="w-12 h-12 flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-plus text-sm"></i>
        </button>
      </div>
      <div class="text-xs text-gray-500 text-center whitespace-nowrap">
        Còn {{ item.stockQuantity }}
      </div>
    </div>

    <!-- Cột 4: Thành tiền & actions (căn phải) -->
    <div class="flex flex-col items-end gap-3 lg:gap-4 lg:col-[4] lg:justify-self-end">
      <div class="text-right">
        <div class="text-xl lg:text-2xl font-bold text-gray-900">
          ${{ formatPrice(getItemTotal(item)) }}
        </div>
        <div class="text-sm text-gray-500">
          {{ item.quantity }} × ${{ formatPrice(getItemPrice(item)) }}
        </div>
      </div>

      <div class="flex gap-2">
        <button @click="addToWishlist(item)"
                class="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
          <i class="fas fa-heart text-sm"></i>
        </button>
        <button @click="removeItem(item)"
                class="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
          <i class="fas fa-trash text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</div>


              <!-- Continue Shopping -->
              <div class="continue-shopping px-8 py-6 border-t border-gray-100">
                <router-link to="/products" 
                             class="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:shadow-md">
                  <i class="fas fa-arrow-left mr-3"></i>
                  Tiếp tục mua sắm
                </router-link>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="order-summary space-y-6">
              <div class="summary-card bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div class="px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-receipt text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">Tổng đơn hàng</h3>
                  </div>
                </div>
                
                <div class="summary-details px-8 py-6 space-y-4">
                  <div class="summary-row flex justify-between items-center py-2">
                    <span class="text-gray-600">Tạm tính ({{ selectedItems.length }} sản phẩm đã chọn):</span>
                    <span class="font-semibold text-gray-900">${{ formatPrice(selectedSubtotal) }}</span>
                  </div>
                  
                  <div v-if="selectedDiscount > 0" class="summary-row flex justify-between items-center py-2">
                    <span class="text-gray-600">Giảm giá sản phẩm:</span>
                    <span class="font-semibold text-green-600">-${{ formatPrice(selectedDiscount) }}</span>
                  </div>
                  
                  <div v-if="appliedCoupon" class="summary-row flex justify-between items-center py-2">
                    <span class="text-gray-600">Mã giảm giá:</span>
                    <span class="font-semibold text-green-600">-${{ formatPrice(selectedCouponDiscount) }}</span>
                  </div>
                  
                  <div class="summary-row flex justify-between items-center py-2">
                    <span class="text-gray-600">Phí vận chuyển:</span>
                    <span class="font-semibold">
                      <span v-if="isSelectedEligibleForFreeShipping" class="text-green-600 flex items-center">
                        <i class="fas fa-check-circle mr-1"></i>Miễn phí
                      </span>
                      <span v-else class="text-gray-900">${{ formatPrice(selectedShippingFee) }}</span>
                    </span>
                  </div>
                  
                  <!-- Free Shipping Progress -->
                  <div v-if="!isSelectedEligibleForFreeShipping && selectedItems.length > 0" class="free-shipping-notice bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-green-700 font-medium text-sm">
                        <i class="fas fa-truck mr-1"></i>
                        Mua thêm ${{ formatPrice(selectedAmountForFreeShipping) }} để được miễn phí vận chuyển
                      </span>
                    </div>
                    <div class="w-full bg-green-200 rounded-full h-2">
                      <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500" 
                           :style="{ width: Math.min(100, (selectedAfterCouponTotal / FREE_SHIPPING_THRESHOLD) * 100) + '%' }"></div>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-200 pt-4">
                    <div class="summary-row total-row flex justify-between items-center py-2">
                      <span class="text-xl font-bold text-gray-900">Tổng cộng:</span>
                      <span class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${{ formatPrice(selectedTotal) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Coupon Code -->
                <div class="coupon-section px-8 py-6 border-t border-gray-100">
                  <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      <i class="fas fa-tag mr-2"></i>Mã giảm giá
                    </label>
                    <div class="coupon-input flex gap-3">
                      <input 
                        type="text" 
                        v-model="couponCode"
                        placeholder="Nhập mã giảm giá..."
                        :disabled="appliedCoupon"
                        class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100"
                      />
                      <button 
                        @click="applyCoupon" 
                        :disabled="!couponCode || appliedCoupon"
                        class="apply-coupon-btn px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl">
                        {{ appliedCoupon ? 'Đã áp dụng' : 'Áp dụng' }}
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="appliedCoupon" class="applied-coupon bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div class="flex items-center justify-between">
                      <div class="coupon-info flex items-center text-green-700">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <i class="fas fa-tag text-white text-sm"></i>
                        </div>
                        <div>
                          <div class="font-semibold">{{ appliedCoupon.code }}</div>
                          <div class="text-sm">Giảm {{ appliedCoupon.discount }}%</div>
                        </div>
                      </div>
                      <button @click="removeCoupon" class="remove-coupon-btn w-8 h-8 flex items-center justify-center text-green-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Popular Coupons -->
                  <div v-if="!appliedCoupon" class="mt-4">
                    <div class="text-xs text-gray-500 mb-2">Mã phổ biến:</div>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="code in ['SAVE10', 'SAVE20', 'WELCOME15']" :key="code"
                              @click="couponCode = code"
                              class="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors">
                        {{ code }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Checkout Button -->
                <div class="px-8 py-6 border-t border-gray-100">
                  <button @click="proceedToCheckout" 
                          :disabled="selectedItems.length === 0"
                          class="checkout-btn w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center">
                    <i class="fas fa-lock mr-3"></i>
                    <span v-if="selectedItems.length > 0">Thanh toán {{ selectedItems.length }} sản phẩm</span>
                    <span v-else>Chọn sản phẩm để thanh toán</span>
                    <i class="fas fa-arrow-right ml-3"></i>
                  </button>
                  
                  <!-- Security Badge -->
                  <div class="flex items-center justify-center mt-4 text-sm text-gray-500">
                    <i class="fas fa-shield-alt mr-2 text-green-500"></i>
                    Thanh toán được bảo mật với SSL 256-bit
                  </div>
                </div>

                <!-- Payment Methods -->
                <div class="payment-methods px-8 py-6 border-t border-gray-100 bg-gray-50">
                  <div class="text-center">
                    <div class="text-sm text-gray-600 mb-3">Chúng tôi chấp nhận:</div>
                    <div class="flex justify-center items-center gap-4">
                      <div class="w-12 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <i class="fab fa-cc-visa text-blue-600 text-lg"></i>
                      </div>
                      <div class="w-12 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <i class="fab fa-cc-mastercard text-red-500 text-lg"></i>
                      </div>
                      <div class="w-12 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <i class="fab fa-cc-paypal text-blue-500 text-lg"></i>
                      </div>
                      <div class="w-12 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <i class="fab fa-apple-pay text-gray-900 text-lg"></i>
                      </div>
                      <div class="w-12 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <i class="fab fa-google-pay text-gray-700 text-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Estimated Delivery -->
              <div class="delivery-info bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-shipping-fast text-white"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900">Tùy chọn giao hàng</h4>
                  </div>
                </div>
                
                <div class="delivery-options p-6 space-y-4">
                  <div class="delivery-option group cursor-pointer p-4 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                          <i class="fas fa-truck text-blue-600 text-lg"></i>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900">Giao hàng tiêu chuẩn</div>
                          <div class="text-sm text-gray-600">2-3 ngày làm việc</div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-lg">
                          <span v-if="isEligibleForFreeShipping" class="text-green-600">Miễn phí</span>
                          <span v-else class="text-gray-900">${{ formatPrice(shippingFee) }}</span>
                        </div>
                        <div class="text-xs text-gray-500">Mặc định</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="delivery-option group cursor-pointer p-4 border-2 border-gray-200 hover:border-orange-300 rounded-xl transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                          <i class="fas fa-bolt text-orange-600 text-lg"></i>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900">Giao hàng nhanh</div>
                          <div class="text-sm text-gray-600">1-2 ngày làm việc</div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-lg text-gray-900">${{ formatPrice(50000) }}</div>
                        <div class="text-xs text-gray-500">Express</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="delivery-option group cursor-pointer p-4 border-2 border-gray-200 hover:border-purple-300 rounded-xl transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center mr-4 transition-colors">
                          <i class="fas fa-clock text-purple-600 text-lg"></i>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900">Giao hàng trong ngày</div>
                          <div class="text-sm text-gray-600">Trong vòng 24h</div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-lg text-gray-900">${{ formatPrice(100000) }}</div>
                        <div class="text-xs text-gray-500">Premium</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Delivery Notice -->
                <div class="px-6 py-4 bg-blue-50 border-t border-gray-100">
                  <div class="flex items-center text-sm text-blue-700">
                    <i class="fas fa-info-circle mr-2"></i>
                    Đặt hàng trước 16:00 để được giao trong ngày làm việc tiếp theo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Viewed -->
    <section v-if="recentlyViewed.length > 0" class="recently-viewed py-5">
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

    <!-- Remove Item Modal -->
    <div v-if="showRemoveModal" class="modal-overlay" @click="showRemoveModal = false">
      <div class="bg-white rounded-lg shadow-xl" @click.stop>
        <h3>Xác nhận xóa sản phẩm</h3>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
        <div class="modal-actions">
          <button @click="showRemoveModal = false" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-gray-600 hover:bg-gray-700 text-white">Hủy</button>
          <button @click="confirmRemoveItem" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/Product/ProductCard.vue'
import Swal from 'sweetalert2'

const router = useRouter()

// Reactive data
const cartItems = ref([])
const recentlyViewed = ref([])
const couponCode = ref('')
const appliedCoupon = ref(null)
const showRemoveModal = ref(false)
const itemToRemove = ref(null)

// Constants
const FREE_SHIPPING_THRESHOLD = 500000
const STANDARD_SHIPPING_FEE = 30000

// Computed properties
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

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

const couponDiscount = computed(() => {
  if (appliedCoupon.value) {
    return subtotal.value * (appliedCoupon.value.discount / 100)
  }
  return 0
})

const afterCouponTotal = computed(() => {
  return subtotal.value - couponDiscount.value
})

const isEligibleForFreeShipping = computed(() => {
  return afterCouponTotal.value >= FREE_SHIPPING_THRESHOLD
})

const shippingFee = computed(() => {
  return isEligibleForFreeShipping.value ? 0 : STANDARD_SHIPPING_FEE
})

const amountForFreeShipping = computed(() => {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - afterCouponTotal.value)
})

const finalTotal = computed(() => {
  return afterCouponTotal.value + shippingFee.value
})

// Selected items computed properties
const selectedItems = computed(() => {
  return cartItems.value.filter(item => item.selected)
})

const selectedSubtotal = computed(() => {
  return selectedItems.value.reduce((total, item) => {
    return total + (getItemPrice(item) * item.quantity)
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

const selectedCouponDiscount = computed(() => {
  if (appliedCoupon.value) {
    return selectedSubtotal.value * (appliedCoupon.value.discount / 100)
  }
  return 0
})

const selectedAfterCouponTotal = computed(() => {
  return selectedSubtotal.value - selectedCouponDiscount.value
})

const isSelectedEligibleForFreeShipping = computed(() => {
  return selectedAfterCouponTotal.value >= FREE_SHIPPING_THRESHOLD
})

const selectedShippingFee = computed(() => {
  return isSelectedEligibleForFreeShipping.value ? 0 : STANDARD_SHIPPING_FEE
})

const selectedAmountForFreeShipping = computed(() => {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - selectedAfterCouponTotal.value)
})

const selectedTotal = computed(() => {
  return selectedAfterCouponTotal.value + selectedShippingFee.value
})

const isAllSelected = computed(() => {
  return cartItems.value.length > 0 && cartItems.value.every(item => item.selected)
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

const increaseQuantity = (item) => {
  if (item.quantity < item.stockQuantity) {
    item.quantity++
    saveCartToStorage()
  }
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    saveCartToStorage()
  }
}

const removeItem = (item) => {
  itemToRemove.value = item
  showRemoveModal.value = true
}

const confirmRemoveItem = () => {
  const index = cartItems.value.findIndex(item => 
    item.id === itemToRemove.value.id && 
    item.selectedSize === itemToRemove.value.selectedSize &&
    item.selectedColor?.name === itemToRemove.value.selectedColor?.name
  )
  
  if (index > -1) {
    cartItems.value.splice(index, 1)
    saveCartToStorage()
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
    cartItems.value = []
    appliedCoupon.value = null
    saveCartToStorage()
    
    Swal.fire({
      title: 'Đã xóa thành công!',
      text: 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-2xl'
      }
    })
  }
}

const addToWishlist = (item) => {
  console.log('Add to wishlist:', item)
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

const applyCoupon = () => {
  // Mock coupon validation
  const validCoupons = {
    'SAVE10': { code: 'SAVE10', discount: 10 },
    'SAVE20': { code: 'SAVE20', discount: 20 },
    'WELCOME15': { code: 'WELCOME15', discount: 15 }
  }
  
  const coupon = validCoupons[couponCode.value.toUpperCase()]
  
  if (coupon) {
    appliedCoupon.value = coupon
    Swal.fire({
      title: 'Thành công!',
      text: `Đã áp dụng mã giảm giá ${coupon.code} - Giảm ${coupon.discount}%`,
      icon: 'success',
      timer: 2500,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-2xl'
      }
    })
  } else {
    Swal.fire({
      title: 'Lỗi!',
      text: 'Mã giảm giá không hợp lệ',
      icon: 'error',
      timer: 2500,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-2xl'
      }
    })
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
  saveCartToStorage()
}

const proceedToCheckout = () => {
  if (selectedItems.value.length === 0) {
    Swal.fire({
      title: 'Chưa chọn sản phẩm!',
      text: 'Vui lòng chọn ít nhất một sản phẩm để thanh toán',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      customClass: {
        popup: 'rounded-2xl'
      }
    })
    return
  }
  
  // Save cart state and navigate to checkout
  saveCartToStorage()
  router.push('/checkout')
}

const handleAddToCart = (product) => {
  // Add product to cart
  const existingItem = cartItems.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1,
      selectedSize: null,
      selectedColor: null,
      stockQuantity: 10,
      selected: false
    })
  }
  
  saveCartToStorage()
  
  Swal.fire({
    title: 'Thành công!',
    text: 'Đã thêm sản phẩm vào giỏ hàng',
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: 'rounded-2xl'
    }
  })
}

const saveCartToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
  localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon.value))
}

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart')
  const savedCoupon = localStorage.getItem('appliedCoupon')
  
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
  
  if (savedCoupon && savedCoupon !== 'null') {
    appliedCoupon.value = JSON.parse(savedCoupon)
  }
}

// Load data on mount
onMounted(() => {
  loadCartFromStorage()
  
  // Mock cart items if empty (for demo)
  if (cartItems.value.length === 0) {
    cartItems.value = [
      {
        id: 1,
        name: 'Smartphone XYZ Pro',
        category: 'Điện tử',
        price: 12990000,
        originalPrice: 14990000,
        discount: 13,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        quantity: 1,
        selectedSize: '256GB',
        selectedColor: { name: 'Đen', value: '#000000' },
        stockQuantity: 5,
        selected: false
      },
      {
        id: 2,
        name: 'Áo thun Premium',
        category: 'Thời trang',
        price: 299000,
        originalPrice: 399000,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        quantity: 2,
        selectedSize: 'L',
        selectedColor: { name: 'Xanh', value: '#1E3A8A' },
        stockQuantity: 10,
        selected: false
      },
      {
        id: 3,
        name: 'Giày sneaker thể thao',
        category: 'Giày dép',
        price: 890000,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        quantity: 1,
        selectedSize: '42',
        selectedColor: { name: 'Trắng', value: '#FFFFFF' },
        stockQuantity: 3,
        selected: false
      }
    ]
  }
  
  // Mock recently viewed products
  recentlyViewed.value = [
    {
      id: 101,
      name: 'Laptop Gaming ABC',
      category: 'Điện tử',
      price: 25990000,
      originalPrice: 29990000,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      rating: 4.9,
      reviewCount: 234,
      inStock: true
    },
    {
      id: 102,
      name: 'Đồng hồ thông minh',
      category: 'Điện tử',
      price: 4990000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4.2,
      reviewCount: 156,
      inStock: true
    }
  ]
})
</script>

<style scoped>
/* Cart Layout Styles */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
  align-items: start;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr 140px 120px 80px;
  gap: 1.5rem;
  align-items: center;
}

.item-image {
  width: 120px;
  height: 120px;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .cart-layout {
    grid-template-columns: 1fr 380px;
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .order-summary {
    order: -1;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-areas: 
      "image details"
      "quantity total"  
      "actions actions";
    gap: 1rem;
  }
  
  .item-image {
    grid-area: image;
    width: 100px;
    height: 100px;
  }
  
  .item-details {
    grid-area: details;
  }
  
  .item-quantity {
    grid-area: quantity;
  }
  
  .item-total {
    grid-area: total;
  }
  
  .item-actions {
    grid-area: actions;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
}

/* Animations */
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.cart-item {
  animation: fadeInUp 0.5s ease-out;
}

.checkout-btn:hover {
  animation: pulse 0.5s ease-in-out;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay .bg-white {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-overlay h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-overlay p {
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Recently viewed section */
.recently-viewed {
  background: white;
  margin-top: 3rem;
  padding: 3rem 0;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #333;
  font-weight: 700;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>