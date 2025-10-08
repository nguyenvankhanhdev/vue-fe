<template>
  <div class="checkout-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <span>/</span>
          <router-link to="/cart">Giỏ hàng</router-link>
          <span>/</span>
          <span>Thanh toán</span>
        </div>
        <h1>Thanh toán</h1>
      </div>
    </section>

    <!-- Checkout Content -->
    <section class="checkout-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="checkout-layout">
          <!-- Left Side - Forms -->
          <div class="checkout-forms">
            <!-- Shipping Information -->
            <div class="checkout-card">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2>
                  <span class="step-number">1</span>
                  Thông tin giao hàng
                </h2>
              </div>
              <form class="checkout-form">
                <div class="form-row">
                  <div class="mb-4">
                    <label for="firstName">Họ *</label>
                    <input 
                      type="text" 
                      id="firstName"
                      v-model="shippingInfo.firstName"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label for="lastName">Tên *</label>
                    <input 
                      type="text" 
                      id="lastName"
                      v-model="shippingInfo.lastName"
                      required
                    />
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="email">Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    v-model="shippingInfo.email"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="phone">Số điện thoại *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    v-model="shippingInfo.phone"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="address">Địa chỉ *</label>
                  <input 
                    type="text" 
                    id="address"
                    v-model="shippingInfo.address"
                    placeholder="Số nhà, tên đường"
                    required
                  />
                </div>
                
                <div class="form-row">
                  <div class="mb-4">
                    <label for="city">Tỉnh/Thành phố *</label>
                    <select 
                      id="city"
                      v-model="shippingInfo.city"
                      @change="loadDistricts"
                      required
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option v-for="city in cities" :key="city.code" :value="city.code">
                        {{ city.name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label for="district">Quận/Huyện *</label>
                    <select 
                      id="district"
                      v-model="shippingInfo.district"
                      @change="loadWards"
                      :disabled="!shippingInfo.city"
                      required
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option v-for="district in districts" :key="district.code" :value="district.code">
                        {{ district.name }}
                      </option>
                    </select>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="ward">Phường/Xã *</label>
                  <select 
                    id="ward"
                    v-model="shippingInfo.ward"
                    :disabled="!shippingInfo.district"
                    required
                  >
                    <option value="">Chọn phường/xã</option>
                    <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                      {{ ward.name }}
                    </option>
                  </select>
                </div>
                
                <div class="mb-4">
                  <label for="notes">Ghi chú</label>
                  <textarea 
                    id="notes"
                    v-model="shippingInfo.notes"
                    rows="3"
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                  ></textarea>
                </div>
              </form>
            </div>

            <!-- Shipping Method -->
            <div class="checkout-card">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2>
                  <span class="step-number">2</span>
                  Phương thức vận chuyển
                </h2>
              </div>
              <div class="shipping-methods">
                <label 
                  v-for="method in shippingMethods" 
                  :key="method.id"
                  class="shipping-method"
                  :class="{ active: selectedShippingMethod === method.id }"
                >
                  <input 
                    type="radio" 
                    :value="method.id"
                    v-model="selectedShippingMethod"
                    @change="calculateTotal"
                  />
                  <div class="method-info">
                    <div class="method-header">
                      <span class="method-name">{{ method.name }}</span>
                      <span class="method-price">
                        {{ method.price === 0 ? 'Miễn phí' : formatPrice(method.price) + 'đ' }}
                      </span>
                    </div>
                    <div class="method-description">
                      {{ method.description }}
                    </div>
                    <div class="method-time">
                      <i class="fas fa-clock"></i>
                      {{ method.estimatedTime }}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="checkout-card">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2>
                  <span class="step-number">3</span>
                  Phương thức thanh toán
                </h2>
              </div>
              <div class="payment-methods">
                <label 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  class="payment-method"
                  :class="{ active: selectedPaymentMethod === method.id }"
                >
                  <input 
                    type="radio" 
                    :value="method.id"
                    v-model="selectedPaymentMethod"
                  />
                  <div class="method-info">
                    <div class="method-icon">
                      <i :class="method.icon"></i>
                    </div>
                    <div class="method-details">
                      <span class="method-name">{{ method.name }}</span>
                      <span class="method-description">{{ method.description }}</span>
                    </div>
                  </div>
                </label>
              </div>

              <!-- Credit Card Form -->
              <div v-if="selectedPaymentMethod === 'credit_card'" class="credit-card-form">
                <div class="mb-4">
                  <label for="cardNumber">Số thẻ *</label>
                  <input 
                    type="text" 
                    id="cardNumber"
                    v-model="creditCard.number"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    @input="formatCardNumber"
                    required
                  />
                </div>
                <div class="form-row">
                  <div class="mb-4">
                    <label for="expiryDate">Ngày hết hạn *</label>
                    <input 
                      type="text" 
                      id="expiryDate"
                      v-model="creditCard.expiry"
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatExpiryDate"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label for="cvv">CVV *</label>
                    <input 
                      type="text" 
                      id="cvv"
                      v-model="creditCard.cvv"
                      placeholder="123"
                      maxlength="4"
                      required
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <label for="cardName">Tên trên thẻ *</label>
                  <input 
                    type="text" 
                    id="cardName"
                    v-model="creditCard.name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Order Summary -->
          <div class="order-summary">
            <div class="summary-card">
              <h3>Đơn hàng của bạn</h3>
              
              <!-- Cart Items -->
              <div class="order-items">
                <div v-for="item in cartItems" :key="item.id" class="order-item">
                  <div class="item-image">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  <div class="item-details">
                    <h4>{{ item.name }}</h4>
                    <p class="item-options">
                      <span v-if="item.selectedSize">Size: {{ item.selectedSize }}</span>
                      <span v-if="item.selectedColor">Màu: {{ item.selectedColor.name }}</span>
                    </p>
                    <p class="item-quantity">Số lượng: {{ item.quantity }}</p>
                  </div>
                  <div class="item-price">
                    {{ formatPrice(getItemTotal(item)) }}đ
                  </div>
                </div>
              </div>

              <!-- Order Totals -->
              <div class="order-totals">
                <div class="total-row">
                  <span>Tạm tính:</span>
                  <span>{{ formatPrice(subtotal) }}đ</span>
                </div>
                <div class="total-row" v-if="appliedCoupon">
                  <span>Giảm giá ({{ appliedCoupon.code }}):</span>
                  <span class="discount">-{{ formatPrice(couponDiscount) }}đ</span>
                </div>
                <div class="total-row">
                  <span>Phí vận chuyển:</span>
                  <span>
                    {{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) + 'đ' }}
                  </span>
                </div>
                <div class="total-row final-total">
                  <span>Tổng cộng:</span>
                  <span>{{ formatPrice(finalTotal) }}đ</span>
                </div>
              </div>

              <!-- Coupon Code -->
              <div class="coupon-section" v-if="!appliedCoupon">
                <div class="coupon-input">
                  <input 
                    type="text" 
                    v-model="couponCode"
                    placeholder="Mã giảm giá"
                  />
                  <button @click="applyCoupon" :disabled="!couponCode">
                    Áp dụng
                  </button>
                </div>
              </div>

              <!-- Place Order Button -->
              <button 
                @click="placeOrder" 
                :disabled="!canPlaceOrder || orderLoading"
                class="place-order-btn"
              >
                <span v-if="orderLoading" class="loading-spinner"></span>
                {{ orderLoading ? 'Đang xử lý...' : 'Đặt hàng' }}
              </button>

              <!-- Security Badge -->
              <div class="security-info">
                <div class="security-item">
                  <i class="fas fa-shield-alt"></i>
                  <span>Thanh toán bảo mật SSL</span>
                </div>
                <div class="security-item">
                  <i class="fas fa-lock"></i>
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
.checkout-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 0;
}

.breadcrumb {
  margin-bottom: 15px;
  font-size: 14px;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
}

.breadcrumb span {
  margin: 0 10px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.checkout-forms {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.checkout-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 18px;
  color: #333;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.checkout-form {
  padding: 30px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #e74c3c;
}

.form-group select:disabled {
  background: #f8f9fa;
  color: #999;
}

.shipping-methods,
.payment-methods {
  padding: 20px 30px 30px;
}

.shipping-method,
.payment-method {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shipping-method:hover,
.payment-method:hover,
.shipping-method.active,
.payment-method.active {
  border-color: #e74c3c;
  background: #fef7f7;
}

.shipping-method input,
.payment-method input {
  margin-right: 15px;
  accent-color: #e74c3c;
}

.method-info {
  flex: 1;
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.method-name {
  font-weight: 600;
  color: #333;
}

.method-price {
  font-weight: 600;
  color: #e74c3c;
}

.method-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.method-time {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 13px;
}

.method-time i {
  color: #e74c3c;
}

.method-icon {
  margin-right: 15px;
  width: 40px;
  text-align: center;
}

.method-icon i {
  font-size: 24px;
  color: #e74c3c;
}

.method-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.credit-card-form {
  padding: 0 30px 30px;
  border-top: 1px solid #eee;
  margin-top: 20px;
  padding-top: 30px;
}

.order-summary {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.summary-card h3 {
  margin-bottom: 25px;
  color: #333;
  font-size: 20px;
}

.order-items {
  margin-bottom: 25px;
}

.order-item {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.item-options,
.item-quantity {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #e74c3c;
  white-space: nowrap;
}

.order-totals {
  margin-bottom: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 15px;
}

.total-row:last-child {
  margin-bottom: 0;
}

.discount {
  color: #27ae60;
  font-weight: 600;
}

.final-total {
  font-size: 18px;
  font-weight: 700;
  padding-top: 15px;
  border-top: 2px solid #e74c3c;
  color: #e74c3c;
}

.coupon-section {
  margin-bottom: 25px;
}

.coupon-input {
  display: flex;
  gap: 10px;
}

.coupon-input input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.coupon-input button {
  padding: 12px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.coupon-input button:hover:not(:disabled) {
  background: #218838;
}

.coupon-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.place-order-btn {
  width: 100%;
  padding: 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.place-order-btn:hover:not(:disabled) {
  background: #c0392b;
}

.place-order-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.security-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 13px;
}

.security-item i {
  color: #28a745;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
    order: -1;
  }
}

@media (max-width: 768px) {
  .checkout-card {
    border-radius: 10px;
  }
  
  .card-header,
  .checkout-form,
  .shipping-methods,
  .payment-methods {
    padding: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .method-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .summary-card {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}
</style>