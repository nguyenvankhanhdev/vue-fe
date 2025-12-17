<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Compact Page Header -->
    <section class="bg-gradient-to-br from-blue-500 via-purple-600 to-blue-600 relative overflow-hidden">
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
          <router-link to="/cart" class="hover:text-white transition-colors">Giỏ hàng</router-link>
          <i class="fas fa-chevron-right mx-2 text-xs"></i>
          <span class="text-white font-medium">Thanh toán</span>
        </nav>

        <!-- Header Content - Compact -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <i class="fas fa-credit-card mr-3 text-white/80"></i>
              Thanh toán
            </h1>
            <p class="text-white/90 text-sm md:text-base">
              Hoàn tất đơn hàng của bạn một cách nhanh chóng và an toàn
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
                <div class="text-lg font-bold text-white">{{ cartItems.length }}</div>
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
                <div class="text-lg font-bold text-white">{{ formatPrice(finalTotal) }}₫</div>
                <div class="text-white/80 text-xs">Tổng tiền</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Checkout Content -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Loading State -->
        <div v-if="loadingCheckout" class="flex items-center justify-center min-h-96">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p class="text-gray-600 text-lg font-medium">Đang tải thông tin checkout...</p>
          </div>
        </div>
        
        <!-- Main Content -->
        <div v-else class="grid lg:grid-cols-3 gap-8">
          <!-- Left Side - Forms -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Shipping Information -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-100">
                <h2 class="flex items-center gap-4 text-lg font-bold text-gray-800">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Thông tin giao hàng
                </h2>
              </div>
              <form class="p-6 space-y-6">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">Họ *</label>
                    <input type="text" id="firstName" v-model="shippingInfo.firstName"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">Tên *</label>
                    <input type="text" id="lastName" v-model="shippingInfo.lastName"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" id="email" v-model="shippingInfo.email"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                  <input type="tel" id="phone" v-model="shippingInfo.phone"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required />
                </div>

                <div class="grid md:grid-cols-3 gap-4">
                  <!-- Tỉnh/Thành phố -->
                  <div>
                    <label for="city" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <i class="fas fa-map-marked-alt text-blue-500"></i>
                      Tỉnh/Thành phố *
                    </label>
                    <div class="relative">
                      <select id="city" v-model="shippingInfo.city"
                        :disabled="loadingProvinces"
                        class="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:border-blue-300 appearance-none"
                        required>
                        <option value="">
                          {{ loadingProvinces ? 'Đang tải...' : 'Chọn tỉnh/thành phố' }}
                        </option>
                        <option v-for="province in provinces" :key="province.id" :value="province.id">
                          {{ province.name }}
                        </option>
                      </select>
                      <!-- Icon bên trái -->
                      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <i class="fas fa-city"></i>
                      </div>
                      <!-- Loading spinner hoặc chevron -->
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <i v-if="loadingProvinces" class="fas fa-spinner fa-spin text-blue-500"></i>
                        <i v-else class="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Quận/Huyện -->
                  <div>
                    <label for="district" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <i class="fas fa-map-marker-alt text-purple-500"></i>
                      Quận/Huyện *
                    </label>
                    <div class="relative">
                      <select id="district" v-model="shippingInfo.district"
                        :disabled="!shippingInfo.city || loadingDistricts"
                        class="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:border-purple-300 appearance-none"
                        required>
                        <option value="">
                          {{ loadingDistricts ? 'Đang tải...' : (!shippingInfo.city ? 'Chọn tỉnh trước' : 'Chọn quận/huyện') }}
                        </option>
                        <option v-for="district in districts" :key="district.id" :value="district.id">
                          {{ district.name }}
                        </option>
                      </select>
                      <!-- Icon bên trái -->
                      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <i class="fas fa-building"></i>
                      </div>
                      <!-- Loading spinner hoặc chevron -->
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <i v-if="loadingDistricts" class="fas fa-spinner fa-spin text-purple-500"></i>
                        <i v-else class="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Phường/Xã -->
                  <div>
                    <label for="ward" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <i class="fas fa-location-dot text-green-500"></i>
                      Phường/Xã *
                    </label>
                    <div class="relative">
                      <select id="ward" v-model="shippingInfo.ward" 
                        :disabled="!shippingInfo.district || loadingWards"
                        class="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:border-green-300 appearance-none"
                        required>
                        <option value="">
                          {{ loadingWards ? 'Đang tải...' : (!shippingInfo.district ? 'Chọn quận trước' : 'Chọn phường/xã') }}
                        </option>
                        <option v-for="ward in wards" :key="ward.id" :value="ward.id">
                          {{ ward.name }}
                        </option>
                      </select>
                      <!-- Icon bên trái -->
                      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <i class="fas fa-home"></i>
                      </div>
                      <!-- Loading spinner hoặc chevron -->
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <i v-if="loadingWards" class="fas fa-spinner fa-spin text-green-500"></i>
                        <i v-else class="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ *</label>
                  <input type="text" id="address" v-model="shippingInfo.address" placeholder="Số nhà, tên đường"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required />
                </div>

                <div>
                  <label for="notes" class="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
                  <textarea id="notes" v-model="shippingInfo.notes" rows="3"
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"></textarea>
                </div>
              </form>
            </div>

            <!-- Shipping & Payment Methods -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-100">
                <h2 class="flex items-center gap-4 text-lg font-bold text-gray-800">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Phương thức vận chuyển & thanh toán
                </h2>
              </div>
              
              <div class="p-6">
                
                <!-- Responsive Grid: 1 column on mobile, 2 columns on desktop -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  <!-- Shipping Method Column -->
                  <div class="space-y-4">
                    <div class="flex items-center gap-2 mb-4">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-truck text-blue-600"></i>
                      </div>
                      <h3 class="text-base font-bold text-gray-800">Vận chuyển</h3>
                    </div>
                    
                    <div class="space-y-3">
                      <label 
                        v-for="method in shippingMethods" 
                        :key="method.id"
                        class="relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-md group"
                        :class="selectedShippingMethod === method.id 
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-lg ring-2 ring-blue-300' 
                          : 'border-gray-200 bg-white hover:bg-blue-50/30'">
                        
                        <!-- Radio Button -->
                        <div class="flex items-center h-5 mt-0.5">
                          <input 
                            type="radio" 
                            :value="method.id" 
                            v-model="selectedShippingMethod" 
                            @change="calculateTotal"
                            class="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all" />
                        </div>
                        
                        <!-- Content -->
                        <div class="ml-3 flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-3 mb-2">
                            <div class="flex-1">
                              <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-semibold text-gray-900">{{ method.name }}</span>
                                <span v-if="method.price === 0" 
                                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white shadow-sm">
                                  <i class="fas fa-gift mr-1"></i>
                                  FREE
                                </span>
                              </div>
                              <div class="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                                <i class="fas fa-clock text-gray-400 text-xs"></i>
                                <span>{{ method.estimatedTime }}</span>
                              </div>
                            </div>
                            
                            <span class="font-bold text-base flex-shrink-0" 
                                  :class="method.price === 0 ? 'text-green-600' : 'text-blue-600'">
                              {{ method.price === 0 ? 'Miễn phí' : formatPrice(method.price) + 'đ' }}
                            </span>
                          </div>
                        </div>
                        
                        <!-- Selected Indicator -->
                        <div v-if="selectedShippingMethod === method.id" 
                             class="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          <i class="fas fa-check text-white text-xs"></i>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Payment Method Column -->
                  <div class="space-y-4">
                    <div class="flex items-center gap-2 mb-4">
                      <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-credit-card text-purple-600"></i>
                      </div>
                      <h3 class="text-base font-bold text-gray-800">Thanh toán</h3>
                    </div>
                    
                    <div class="space-y-3">
                      <label 
                        v-for="method in paymentMethods" 
                        :key="method.id"
                        class="relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-purple-400 hover:shadow-md group"
                        :class="selectedPaymentMethod === method.id 
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-purple-100/50 shadow-lg ring-2 ring-purple-300' 
                          : 'border-gray-200 bg-white hover:bg-purple-50/30'">
                        
                        <!-- Radio Button -->
                        <div class="flex items-center h-5">
                          <input 
                            type="radio" 
                            :value="method.id" 
                            v-model="selectedPaymentMethod"
                            class="w-5 h-5 text-purple-600 border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all" />
                        </div>
                        
                        <!-- Icon -->
                        <div class="ml-3 w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                          <i :class="method.icon" class="text-purple-600 text-lg"></i>
                        </div>
                        
                        <!-- Label -->
                        <span class="ml-3 font-semibold text-gray-900 flex-1">{{ method.name }}</span>
                        
                        <!-- Selected Indicator -->
                        <div v-if="selectedPaymentMethod === method.id" 
                             class="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          <i class="fas fa-check text-white text-xs"></i>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Credit Card Form (Full Width Below) -->
                <div v-if="selectedPaymentMethod === 'credit_card'" 
                     class="mt-4 pt-4 border-t-2 border-gray-200 animate-fade-in">
                  
                  <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-4 border border-purple-200">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-shield-alt text-green-600 text-sm"></i>
                      </div>
                      <div>
                        <h4 class="text-xs font-bold text-gray-800 flex items-center gap-2">
                          <span>Bảo mật SSL 256-bit</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <!-- Card Number - Full Width -->
                    <div class="md:col-span-2">
                      <label for="cardNumber" class="block text-xs font-semibold text-gray-700 mb-1.5">
                        Số thẻ *
                      </label>
                      <div class="relative">
                        <input 
                          type="text" 
                          id="cardNumber" 
                          v-model="creditCard.number" 
                          placeholder="1234 5678 9012 3456"
                          maxlength="19" 
                          @input="formatCardNumber"
                          class="w-full pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white text-gray-900 font-mono hover:border-purple-300"
                          required />
                        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <i class="fas fa-credit-card"></i>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Card Name - Full Width -->
                    <div class="md:col-span-2">
                      <label for="cardName" class="block text-xs font-semibold text-gray-700 mb-1.5">
                        Tên trên thẻ *
                      </label>
                      <div class="relative">
                        <input 
                          type="text" 
                          id="cardName" 
                          v-model="creditCard.name" 
                          placeholder="NGUYEN VAN A"
                          class="w-full pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white text-gray-900 uppercase hover:border-purple-300"
                          required />
                        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <i class="fas fa-user"></i>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Expiry Date -->
                    <div>
                      <label for="expiryDate" class="block text-xs font-semibold text-gray-700 mb-1.5">
                        Ngày hết hạn *
                      </label>
                      <div class="relative">
                        <input 
                          type="text" 
                          id="expiryDate" 
                          v-model="creditCard.expiry" 
                          placeholder="MM/YY" 
                          maxlength="5"
                          @input="formatExpiryDate"
                          class="w-full pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white text-gray-900 font-mono hover:border-purple-300"
                          required />
                        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <i class="fas fa-calendar-alt text-sm"></i>
                        </div>
                      </div>
                    </div>
                    
                    <!-- CVV -->
                    <div>
                      <label for="cvv" class="block text-xs font-semibold text-gray-700 mb-1.5">
                        CVV / CVC *
                      </label>
                      <div class="relative">
                        <input 
                          type="text" 
                          id="cvv" 
                          v-model="creditCard.cvv" 
                          placeholder="123" 
                          maxlength="4"
                          class="w-full pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white text-gray-900 font-mono hover:border-purple-300"
                          required />
                        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <i class="fas fa-lock text-sm"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bank Transfer Options (Momo & VNPay) -->
                <div v-if="selectedPaymentMethod === 'bank_transfer'" 
                     class="mt-4 pt-4 border-t-2 border-gray-200 animate-fade-in">
                  
                  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 border border-blue-200">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-info-circle text-blue-600 text-sm"></i>
                      </div>
                      <div>
                        <h4 class="text-xs font-bold text-gray-800">
                          Chọn phương thức thanh toán
                        </h4>
                      </div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3">
                    <label 
                      v-for="option in bankTransferOptions" 
                      :key="option.id"
                      class="relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group"
                      :class="selectedBankTransferMethod === option.id 
                        ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-300' 
                        : 'border-gray-200 bg-white hover:border-blue-300'">
                      
                      <!-- Radio Button (Hidden but functional) -->
                      <input 
                        type="radio" 
                        :value="option.id" 
                        v-model="selectedBankTransferMethod"
                        class="sr-only" />
                      
                      <!-- Logo -->
                      <div class="w-full h-16 mb-2 flex items-center justify-center p-2 bg-white rounded-lg shadow-sm">
                        <img 
                          :src="option.logo" 
                          :alt="option.name"
                          class="max-w-full max-h-full object-contain"
                          @error="handleImageError" />
                      </div>
                      
                      <!-- Name -->
                      <h5 class="font-bold text-gray-900 text-sm text-center">{{ option.name }}</h5>
                      
                      <!-- Selected Indicator -->
                      <div v-if="selectedBankTransferMethod === option.id" 
                           class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <i class="fas fa-check text-white text-xs"></i>
                      </div>
                    </label>
                  </div>
                  
                  <!-- Selected Payment Info -->
                  <div v-if="selectedBankTransferMethod" class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-check-circle text-green-600 text-xs"></i>
                      </div>
                      <div>
                        <p class="text-xs font-semibold text-green-800">
                          Đã chọn: {{ bankTransferOptions.find(o => o.id === selectedBankTransferMethod)?.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-blue-100/50">
              <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i class="fas fa-shopping-bag text-white text-sm"></i>
                </div>
                Đơn hàng của bạn
              </h3>

              <!-- Cart Items -->
              <div class="space-y-4 mb-6">
                <div v-for="item in cartItems" :key="item.id" 
                     class="flex gap-3 p-3 rounded-xl"
                     :class="!item.variant?.id ? 'bg-red-50 border border-red-200' : 'bg-gray-50'">
                  <div class="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img :src="item.product_image  || '/placeholder.svg'" 
                         :alt="item.name || item.product?.name || 'Product'" 
                         class="w-full h-full object-cover"
                         @error="handleImageError" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-800 mb-1 text-sm line-clamp-2">
                      {{ item.name || item.product?.name || 'Sản phẩm' }}
                    </h4>
                    
                    <!-- Warning if no variant -->
                    <div v-if="!item.variant?.id" class="text-xs text-red-600 font-medium mb-1 flex items-center gap-1">
                      <i class="fas fa-exclamation-triangle"></i>
                      Vui lòng chọn màu sắc và dung lượng
                    </div>
                    
                    <div class="text-xs text-gray-600 space-y-1">
                      <!-- Variant info with better styling -->
                      <div v-if="item.selectedSize || item.selectedColor || item.variant" class="flex flex-wrap gap-1.5">
                        <span v-if="item.selectedSize || item.variant?.size" 
                              class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                          <i class="fas fa-microchip mr-1"></i>
                          {{ item.selectedSize || item.variant?.size }}
                        </span>
                        <span v-if="item.selectedColor || item.variant?.color" 
                              class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-700">
                          <span v-if="item.selectedColor?.value || item.variant?.color_code"
                                class="w-3 h-3 rounded-full mr-1 border border-white shadow-sm" 
                                :style="{ backgroundColor: item.selectedColor?.value || item.variant?.color_code }">
                          </span>
                          <i v-else class="fas fa-palette mr-1"></i>
                          {{ item.selectedColor?.name || item.variant?.color }}
                        </span>
                      </div>
                      <p class="flex items-center gap-1">
                        <i class="fas fa-box text-gray-400"></i>
                        Số lượng: <span class="font-semibold text-gray-800">{{ item.quantity }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="text-sm font-bold text-blue-600 self-start">
                    {{ formatPrice(getItemTotal(item)) }}đ
                  </div>
                </div>
              </div>

              <!-- Order Totals -->
              <div class="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
                <div class="flex justify-between items-center text-gray-700">
                  <span>Tạm tính:</span>
                  <span class="font-semibold">{{ formatPrice(subtotal) }}đ</span>
                </div>
                <div v-if="appliedCouponData" class="flex justify-between items-center text-green-600">
                  <span class="flex items-center gap-2">
                    <i class="fas fa-ticket-alt"></i>
                    Giảm giá ({{ appliedCouponData.coupon.code }}):
                  </span>
                  <span class="font-semibold">-{{ formatPrice(appliedCouponData.discount_amount) }}đ</span>
                </div>
                <div class="flex justify-between items-center text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span class="font-semibold">
                    {{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) + 'đ' }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center pt-3 border-t-2 border-blue-600 text-lg font-bold text-blue-600">
                  <span>Tổng cộng:</span>
                  <span>{{ formatPrice(finalTotal) }}đ</span>
                </div>
              </div>

              <!-- Coupon Selector -->
              <CouponSelector
                :order-total="subtotal"
                :user-id="user?.id"
                @coupon-applied="handleCouponApplied"
                @coupon-removed="handleCouponRemoved"
                class="mb-6"
              />

              <!-- Place Order Button -->
              <button @click="placeOrder" :disabled="!canPlaceOrder || orderLoading"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg mb-6 flex items-center justify-center gap-2">
                <span v-if="orderLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                {{ orderLoading ? 'Đang xử lý...' : 'Đặt hàng' }}
              </button>

              <!-- Security Badge -->
              <div class="space-y-3 pt-4 border-t border-gray-200">
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <i class="fas fa-shield-alt text-green-600"></i>
                  <span>Thanh toán bảo mật SSL</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <i class="fas fa-lock text-green-600"></i>
                  <span>Thông tin được mã hóa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Main Content -->
        
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCheckout } from '@/composables/client/useCheckout'
import CouponSelector from '@/components/Coupon/CouponSelector.vue'

// Use composable
const {
  // State
  orderLoading,
  cartItems,
  checkoutSummary,
  appliedCouponData,
  couponCode,
  selectedShippingMethod,
  selectedPaymentMethod,
  selectedBankTransferMethod,
  loadingCheckout,
  user,
  shippingInfo,
  creditCard,
  provinces,
  districts,
  wards,
  loadingProvinces,
  loadingDistricts,
  loadingWards,
  shippingMethods,
  paymentMethods,
  bankTransferOptions,
  
  // Computed
  selectedShipping,
  subtotal,
  shippingFee,
  discount,
  finalTotal,
  canPlaceOrder,
  
  // Methods
  formatPrice,
  loadProvinces,
  placeOrder,
  loadCheckoutData
} = useCheckout()

// Additional methods for UI
const getItemTotal = (item) => {
  const price = parseFloat(item.price)
  return price * item.quantity
}

const handleImageError = (event) => {
  if (event.target.dataset.errorHandled) {
    return
  }
  event.target.dataset.errorHandled = 'true'
  event.target.src = '/placeholder.svg'
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  if (formattedValue.length > 19) {
    formattedValue = formattedValue.substr(0, 19)
  }
  creditCard.value.number = formattedValue
}

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  creditCard.value.expiry = value
}

const handleCouponApplied = (data) => {
  appliedCouponData.value = data
}

const handleCouponRemoved = () => {
  appliedCouponData.value = null
}

const calculateTotal = () => {
  // Computed properties will automatically update
}

// Initialize bank transfer options
bankTransferOptions.value = [
  {
    id: 'momo',
    name: 'Ví MoMo',
    logo: '/MoMo_Logo.png'
  },
  {
    id: 'vnpay',
    name: 'VNPAY',
    logo: '/vnpay_logo.png'
  }
]

// Load data on mount
onMounted(() => {
  loadCheckoutData()
  loadProvinces()
})
</script>

<style scoped>
/* Animation classes */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-delay {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 3s ease-in-out infinite 0.5s;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-bounce-slow {
  animation: bounceSlow 2s ease-in-out infinite;
}

/* Custom border width */
.border-3 {
  border-width: 3px;
}
</style>