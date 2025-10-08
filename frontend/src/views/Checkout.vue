<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <!-- Breadcrumb -->
        <div class="flex items-center text-blue-100 text-sm mb-6 space-x-2">
          <router-link to="/" class="hover:text-white transition-colors duration-200">Trang chủ</router-link>
          <i class="fas fa-chevron-right text-xs"></i>
          <router-link to="/cart" class="hover:text-white transition-colors duration-200">Giỏ hàng</router-link>
          <i class="fas fa-chevron-right text-xs"></i>
          <span class="text-white font-medium">Thanh toán</span>
        </div>

        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <i class="fas fa-credit-card text-2xl"></i>
          </div>
          <h1
            class="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Thanh toán
          </h1>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Hoàn tất đơn hàng của bạn một cách nhanh chóng và an toàn
          </p>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-float"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-float-delay"></div>
      <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-float"></div>
    </section>

    <!-- Checkout Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-8">
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

                <div>
                  <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ *</label>
                  <input type="text" id="address" v-model="shippingInfo.address" placeholder="Số nhà, tên đường"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required />
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label for="city" class="block text-sm font-semibold text-gray-700 mb-2">Tỉnh/Thành phố *</label>
                    <select id="city" v-model="shippingInfo.city" @change="loadDistricts"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                      required>
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option v-for="city in cities" :key="city.code" :value="city.code">
                        {{ city.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="district" class="block text-sm font-semibold text-gray-700 mb-2">Quận/Huyện *</label>
                    <select id="district" v-model="shippingInfo.district" @change="loadWards"
                      :disabled="!shippingInfo.city"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                      required>
                      <option value="">Chọn quận/huyện</option>
                      <option v-for="district in districts" :key="district.code" :value="district.code">
                        {{ district.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="ward" class="block text-sm font-semibold text-gray-700 mb-2">Phường/Xã *</label>
                  <select id="ward" v-model="shippingInfo.ward" :disabled="!shippingInfo.district"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                    required>
                    <option value="">Chọn phường/xã</option>
                    <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                      {{ ward.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="notes" class="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
                  <textarea id="notes" v-model="shippingInfo.notes" rows="3"
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"></textarea>
                </div>
              </form>
            </div>

            <!-- Shipping Method -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-100">
                <h2 class="flex items-center gap-4 text-lg font-bold text-gray-800">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Phương thức vận chuyển
                </h2>
              </div>
              <div class="p-4 space-y-2">
                <label v-for="method in shippingMethods" :key="method.id"
                  class="flex items-center justify-between p-2 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-50"
                  :class="selectedShippingMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                  <div class="flex items-center gap-2">
                    <input type="radio" :value="method.id" v-model="selectedShippingMethod" @change="calculateTotal"
                      class="text-blue-600 focus:ring-blue-500" />
                    <div>
                      <span class="font-medium text-gray-800 text-sm">{{ method.name }}</span>
                      <span class="text-xs text-gray-500 ml-2">{{ method.estimatedTime }}</span>
                    </div>
                  </div>
                  <span class="font-bold text-blue-600 text-sm">
                    {{ method.price === 0 ? 'Miễn phí' : formatPrice(method.price) + 'đ' }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-100">
                <h2 class="flex items-center gap-4 text-lg font-bold text-gray-800">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  Phương thức thanh toán
                </h2>
              </div>
              <div class="p-4 space-y-2">
                <label v-for="method in paymentMethods" :key="method.id"
                  class="flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-50"
                  :class="selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                  <input type="radio" :value="method.id" v-model="selectedPaymentMethod"
                    class="text-blue-600 focus:ring-blue-500" />
                  <div class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <i :class="method.icon" class="text-blue-600 text-xs"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="font-medium text-gray-800 text-sm">{{ method.name }}</span>
                  </div>
                </label>
              </div>

              <!-- Credit Card Form -->
              <div v-if="selectedPaymentMethod === 'credit_card'" class="border-t border-blue-100 pt-6 mt-6 space-y-4">
                <div>
                  <label for="cardNumber" class="block text-sm font-semibold text-gray-700 mb-2">Số thẻ *</label>
                  <input type="text" id="cardNumber" v-model="creditCard.number" placeholder="1234 5678 9012 3456"
                    maxlength="19" @input="formatCardNumber"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="expiryDate" class="block text-sm font-semibold text-gray-700 mb-2">Ngày hết hạn
                      *</label>
                    <input type="text" id="expiryDate" v-model="creditCard.expiry" placeholder="MM/YY" maxlength="5"
                      @input="formatExpiryDate"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required />
                  </div>
                  <div>
                    <label for="cvv" class="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                    <input type="text" id="cvv" v-model="creditCard.cvv" placeholder="123" maxlength="4"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required />
                  </div>
                </div>
                <div>
                  <label for="cardName" class="block text-sm font-semibold text-gray-700 mb-2">Tên trên thẻ *</label>
                  <input type="text" id="cardName" v-model="creditCard.name"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required />
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
                <div v-for="item in cartItems" :key="item.id" class="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div class="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-800 mb-1 text-sm">{{ item.name }}</h4>
                    <div class="text-xs text-gray-600 space-y-1">
                      <p v-if="item.selectedSize || item.selectedColor" class="flex gap-2">
                        <span v-if="item.selectedSize">Size: {{ item.selectedSize }}</span>
                        <span v-if="item.selectedColor">Màu: {{ item.selectedColor.name }}</span>
                      </p>
                      <p>Số lượng: {{ item.quantity }}</p>
                    </div>
                  </div>
                  <div class="text-sm font-bold text-blue-600">
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
                <div v-if="appliedCoupon" class="flex justify-between items-center text-green-600">
                  <span>Giảm giá ({{ appliedCoupon.code }}):</span>
                  <span class="font-semibold">-{{ formatPrice(couponDiscount) }}đ</span>
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

              <!-- Coupon Code -->
              <div v-if="!appliedCoupon" class="mb-6">
                <div class="flex gap-2">
                  <input type="text" v-model="couponCode" placeholder="Mã giảm giá"
                    class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                  <button @click="applyCoupon" :disabled="!couponCode"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm">
                    Áp dụng
                  </button>
                </div>
              </div>

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
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const orderLoading = ref(false)
const cartItems = ref([])
const appliedCoupon = ref(null)
const couponCode = ref('')
const selectedShippingMethod = ref('standard')
const selectedPaymentMethod = ref('cod')

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  district: '',
  ward: '',
  notes: ''
})

const creditCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const cities = ref([
  { code: 'hcm', name: 'TP. Hồ Chí Minh' },
  { code: 'hn', name: 'Hà Nội' },
  { code: 'dn', name: 'Đà Nẵng' },
  { code: 'hp', name: 'Hải Phòng' }
])

const districts = ref([])
const wards = ref([])

const shippingMethods = ref([
  {
    id: 'standard',
    name: 'Giao hàng tiêu chuẩn',
    description: 'Miễn phí cho đơn hàng trên 500.000đ',
    price: 30000,
    estimatedTime: '2-3 ngày làm việc'
  },
  {
    id: 'express',
    name: 'Giao hàng nhanh',
    description: 'Giao hàng trong ngày tại nội thành',
    price: 50000,
    estimatedTime: '1-2 ngày làm việc'
  },
  {
    id: 'same_day',
    name: 'Giao hàng trong ngày',
    description: 'Chỉ áp dụng tại TP.HCM và Hà Nội',
    price: 100000,
    estimatedTime: 'Trong ngày (đặt trước 14:00)'
  }
])

const paymentMethods = ref([
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
    icon: 'fas fa-money-bill-wave'
  },
  {
    id: 'credit_card',
    name: 'Thẻ tín dụng/Ghi nợ',
    description: 'Visa, Mastercard, JCB',
    icon: 'fas fa-credit-card'
  },
  {
    id: 'bank_transfer',
    name: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản qua Internet Banking',
    icon: 'fas fa-university'
  },
  {
    id: 'e_wallet',
    name: 'Ví điện tử',
    description: 'MoMo, ZaloPay, ViettelPay',
    icon: 'fas fa-wallet'
  }
])

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (getItemPrice(item) * item.quantity)
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

const shippingFee = computed(() => {
  const method = shippingMethods.value.find(m => m.id === selectedShippingMethod.value)
  if (method && (method.id !== 'standard' || afterCouponTotal.value < 500000)) {
    return method.price
  }
  return 0
})

const finalTotal = computed(() => {
  return afterCouponTotal.value + shippingFee.value
})

const canPlaceOrder = computed(() => {
  return shippingInfo.value.firstName &&
    shippingInfo.value.lastName &&
    shippingInfo.value.email &&
    shippingInfo.value.phone &&
    shippingInfo.value.address &&
    shippingInfo.value.city &&
    shippingInfo.value.district &&
    shippingInfo.value.ward &&
    selectedShippingMethod.value &&
    selectedPaymentMethod.value &&
    (selectedPaymentMethod.value !== 'credit_card' || isCardFormValid.value)
})

const isCardFormValid = computed(() => {
  return creditCard.value.number &&
    creditCard.value.expiry &&
    creditCard.value.cvv &&
    creditCard.value.name
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

const loadDistricts = () => {
  // Mock districts data
  districts.value = [
    { code: 'q1', name: 'Quận 1' },
    { code: 'q3', name: 'Quận 3' },
    { code: 'q7', name: 'Quận 7' },
    { code: 'pn', name: 'Phú Nhuận' }
  ]
  shippingInfo.value.district = ''
  shippingInfo.value.ward = ''
}

const loadWards = () => {
  // Mock wards data
  wards.value = [
    { code: 'p1', name: 'Phường 1' },
    { code: 'p2', name: 'Phường 2' },
    { code: 'p3', name: 'Phường 3' }
  ]
  shippingInfo.value.ward = ''
}

const applyCoupon = () => {
  // Mock coupon validation
  const validCoupons = {
    'SAVE10': { code: 'SAVE10', discount: 10 },
    'SAVE20': { code: 'SAVE20', discount: 20 }
  }

  const coupon = validCoupons[couponCode.value.toUpperCase()]

  if (coupon) {
    appliedCoupon.value = coupon
    alert(`Đã áp dụng mã giảm giá ${coupon.code} - Giảm ${coupon.discount}%`)
  } else {
    alert('Mã giảm giá không hợp lệ!')
  }
}

const placeOrder = async () => {
  orderLoading.value = true

  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const orderData = {
      shippingInfo: shippingInfo.value,
      items: cartItems.value,
      shippingMethod: selectedShippingMethod.value,
      paymentMethod: selectedPaymentMethod.value,
      coupon: appliedCoupon.value,
      totals: {
        subtotal: subtotal.value,
        discount: couponDiscount.value,
        shipping: shippingFee.value,
        total: finalTotal.value
      }
    }

    console.log('Order placed:', orderData)

    // Clear cart
    localStorage.removeItem('cart')

    alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.')

    // Redirect to order confirmation or orders page
    router.push('/orders')

  } catch (error) {
    console.error('Order error:', error)
    alert('Đặt hàng thất bại. Vui lòng thử lại!')
  } finally {
    orderLoading.value = false
  }
}

// Load data on mount
onMounted(() => {
  // Load cart from storage
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }

  // Load user info if logged in
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    const user = JSON.parse(savedUser)
    shippingInfo.value.email = user.email
  }

  // Redirect if cart is empty
  if (cartItems.value.length === 0) {
    alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.')
    router.push('/cart')
  }
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 3s ease-in-out infinite 0.5s;
}
</style>