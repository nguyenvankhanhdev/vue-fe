<template>
  <div class="cart-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <span>/</span>
          <span>Giỏ hàng</span>
        </div>
        <h1>Giỏ hàng của bạn</h1>
      </div>
    </section>

    <!-- Cart Content -->
    <section class="cart-section py-5">
      <div class="container">
        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-cart-content">
            <i class="fas fa-shopping-cart"></i>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <router-link to="/products" class="btn">Tiếp tục mua sắm</router-link>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-content">
          <div class="cart-layout">
            <!-- Cart Items List -->
            <div class="cart-items">
              <div class="cart-header">
                <h2>Sản phẩm trong giỏ hàng ({{ cartItems.length }})</h2>
                <button @click="clearCart" class="clear-cart-btn">
                  <i class="fas fa-trash"></i>
                  Xóa tất cả
                </button>
              </div>

              <div class="items-list">
                <div 
                  v-for="item in cartItems" 
                  :key="`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`"
                  class="cart-item"
                >
                  <div class="item-image">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  
                  <div class="item-details">
                    <div class="item-info">
                      <h3>
                        <router-link :to="`/products/${item.id}`">
                          {{ item.name }}
                        </router-link>
                      </h3>
                      <div class="item-meta">
                        <span class="item-category">{{ item.category }}</span>
                        <span v-if="item.selectedSize" class="item-option">
                          Kích thước: {{ item.selectedSize }}
                        </span>
                        <span v-if="item.selectedColor" class="item-option">
                          Màu: {{ item.selectedColor.name }}
                        </span>
                      </div>
                    </div>
                    
                    <div class="item-price">
                      <span class="current-price">${{ formatPrice(getItemPrice(item)) }}</span>
                      <span v-if="item.originalPrice && item.discount" class="original-price">
                        ${{ formatPrice(item.originalPrice) }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="item-quantity">
                    <div class="quantity-controls">
                      <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
                        <i class="fas fa-minus"></i>
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button @click="increaseQuantity(item)" :disabled="item.quantity >= item.stockQuantity">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div class="item-total">
                    <span class="total-price">
                      ${{ formatPrice(getItemTotal(item)) }}
                    </span>
                  </div>
                  
                  <div class="item-actions">
                    <button @click="removeItem(item)" class="remove-btn">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button @click="addToWishlist(item)" class="wishlist-btn">
                      <i class="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Continue Shopping -->
              <div class="continue-shopping">
                <router-link to="/products" class="btn btn-outline">
                  <i class="fas fa-arrow-left"></i>
                  Tiếp tục mua sắm
                </router-link>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="order-summary">
              <div class="summary-card">
                <h3>Tổng đơn hàng</h3>
                
                <div class="summary-details">
                  <div class="summary-row">
                    <span>Tạm tính ({{ totalItems }} sản phẩm):</span>
                    <span>${{ formatPrice(subtotal) }}</span>
                  </div>
                  
                  <div class="summary-row">
                    <span>Giảm giá:</span>
                    <span class="discount-amount">-${{ formatPrice(totalDiscount) }}</span>
                  </div>
                  
                  <div class="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>
                      <span v-if="isEligibleForFreeShipping" class="free-shipping">
                        Miễn phí
                      </span>
                      <span v-else>${{ formatPrice(shippingFee) }}</span>
                    </span>
                  </div>
                  
                  <div v-if="!isEligibleForFreeShipping" class="free-shipping-notice">
                    <i class="fas fa-info-circle"></i>
                    Mua thêm ${{ formatPrice(amountForFreeShipping) }} để được miễn phí vận chuyển
                  </div>
                  
                  <hr />
                  
                  <div class="summary-row total-row">
                    <span>Tổng cộng:</span>
                    <span class="total-amount">${{ formatPrice(finalTotal) }}</span>
                  </div>
                </div>

                <!-- Coupon Code -->
                <div class="coupon-section">
                  <div class="coupon-input">
                    <input 
                      type="text" 
                      v-model="couponCode"
                      placeholder="Nhập mã giảm giá"
                      :disabled="appliedCoupon"
                    />
                    <button 
                      @click="applyCoupon" 
                      :disabled="!couponCode || appliedCoupon"
                      class="apply-coupon-btn"
                    >
                      {{ appliedCoupon ? 'Đã áp dụng' : 'Áp dụng' }}
                    </button>
                  </div>
                  
                  <div v-if="appliedCoupon" class="applied-coupon">
                    <span class="coupon-info">
                      <i class="fas fa-tag"></i>
                      {{ appliedCoupon.code }} - Giảm {{ appliedCoupon.discount }}%
                    </span>
                    <button @click="removeCoupon" class="remove-coupon-btn">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <!-- Checkout Button -->
                <button @click="proceedToCheckout" class="checkout-btn">
                  <i class="fas fa-credit-card"></i>
                  Tiến hành thanh toán
                </button>

                <!-- Payment Methods -->
                <div class="payment-methods">
                  <span>Phương thức thanh toán:</span>
                  <div class="payment-icons">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-paypal"></i>
                    <i class="fab fa-apple-pay"></i>
                  </div>
                </div>
              </div>

              <!-- Estimated Delivery -->
              <div class="delivery-info">
                <h4>Thông tin giao hàng</h4>
                <div class="delivery-options">
                  <div class="delivery-option">
                    <div class="option-header">
                      <i class="fas fa-truck"></i>
                      <span>Giao hàng tiêu chuẩn</span>
                    </div>
                    <div class="option-details">
                      <span class="delivery-time">2-3 ngày làm việc</span>
                      <span class="delivery-cost">
                        {{ isEligibleForFreeShipping ? 'Miễn phí' : '$' + formatPrice(shippingFee) }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="delivery-option">
                    <div class="option-header">
                      <i class="fas fa-shipping-fast"></i>
                      <span>Giao hàng nhanh</span>
                    </div>
                    <div class="option-details">
                      <span class="delivery-time">1-2 ngày làm việc</span>
                      <span class="delivery-cost">${{ formatPrice(50000) }}</span>
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
    <section v-if="recentlyViewed.length > 0" class="recently-viewed py-5">
      <div class="container">
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
      <div class="modal-content" @click.stop>
        <h3>Xác nhận xóa sản phẩm</h3>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
        <div class="modal-actions">
          <button @click="showRemoveModal = false" class="btn btn-secondary">Hủy</button>
          <button @click="confirmRemoveItem" class="btn">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/Product/ProductCard.vue'

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

const clearCart = () => {
  if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
    cartItems.value = []
    appliedCoupon.value = null
    saveCartToStorage()
  }
}

const addToWishlist = (item) => {
  console.log('Add to wishlist:', item)
  // Handle add to wishlist logic
  alert('Đã thêm vào danh sách yêu thích!')
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
    alert(`Đã áp dụng mã giảm giá ${coupon.code} - Giảm ${coupon.discount}%`)
  } else {
    alert('Mã giảm giá không hợp lệ!')
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCode.value = ''
}

const proceedToCheckout = () => {
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
      stockQuantity: 10
    })
  }
  
  saveCartToStorage()
  alert('Đã thêm vào giỏ hàng!')
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
        stockQuantity: 5
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
        stockQuantity: 10
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
        stockQuantity: 3
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
.cart-page {
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

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.empty-cart-content {
  text-align: center;
  max-width: 400px;
}

.empty-cart-content i {
  font-size: 80px;
  color: #ccc;
  margin-bottom: 30px;
}

.empty-cart-content h2 {
  font-size: 2rem;
  color: #666;
  margin-bottom: 15px;
}

.empty-cart-content p {
  color: #999;
  margin-bottom: 30px;
  line-height: 1.6;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.cart-items {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.cart-header h2 {
  color: #333;
  margin: 0;
}

.clear-cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.clear-cart-btn:hover {
  background: #c82333;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 120px 120px 80px;
  gap: 20px;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  transition: border-color 0.3s ease;
}

.cart-item:hover {
  border-color: #e74c3c;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.item-info h3 a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.item-info h3 a:hover {
  color: #e74c3c;
}

.item-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.item-category {
  font-weight: 500;
}

.item-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.current-price {
  font-size: 18px;
  font-weight: 600;
  color: #e74c3c;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-controls button {
  width: 35px;
  height: 35px;
  border: none;
  background: #f8f9fa;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:hover:not(:disabled) {
  background: #e9ecef;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  padding: 0 15px;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
}

.item-total {
  text-align: right;
}

.total-price {
  font-size: 18px;
  font-weight: 700;
  color: #e74c3c;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.remove-btn,
.wishlist-btn {
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
}

.wishlist-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}

.continue-shopping {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.order-summary {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.summary-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 100px;
}

.summary-card h3 {
  margin-bottom: 25px;
  color: #333;
  font-size: 20px;
}

.summary-details {
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 15px;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.discount-amount {
  color: #27ae60;
  font-weight: 600;
}

.free-shipping {
  color: #27ae60;
  font-weight: 600;
}

.free-shipping-notice {
  background: #e8f5e8;
  color: #27ae60;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.total-row {
  font-size: 18px;
  font-weight: 700;
  padding-top: 15px;
  border-top: 2px solid #e74c3c;
}

.total-amount {
  color: #e74c3c;
  font-size: 24px;
}

.coupon-section {
  margin-bottom: 25px;
}

.coupon-input {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.coupon-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.apply-coupon-btn {
  padding: 12px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  white-space: nowrap;
}

.apply-coupon-btn:hover:not(:disabled) {
  background: #218838;
}

.apply-coupon-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.applied-coupon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #c3e6cb;
}

.coupon-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.remove-coupon-btn {
  background: none;
  border: none;
  color: #155724;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.remove-coupon-btn:hover {
  background: rgba(21, 87, 36, 0.1);
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.checkout-btn:hover {
  background: #c0392b;
}

.payment-methods {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.payment-icons i {
  font-size: 24px;
  color: #999;
}

.delivery-info {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.delivery-info h4 {
  margin-bottom: 20px;
  color: #333;
}

.delivery-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.delivery-option {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.delivery-option:hover {
  border-color: #e74c3c;
}

.option-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.option-header i {
  color: #e74c3c;
}

.option-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.delivery-time {
  color: #666;
}

.delivery-cost {
  font-weight: 600;
  color: #e74c3c;
}

.recently-viewed {
  background: white;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

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

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 15px;
  color: #333;
}

.modal-content p {
  margin-bottom: 25px;
  color: #666;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .order-summary {
    order: -1;
  }
  
  .summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    grid-template-areas: 
      "image details"
      "quantity total"
      "actions actions";
    gap: 15px;
  }
  
  .item-image {
    grid-area: image;
    width: 80px;
    height: 80px;
  }
  
  .item-details {
    grid-area: details;
  }
  
  .item-quantity {
    grid-area: quantity;
  }
  
  .item-total {
    grid-area: total;
    text-align: right;
  }
  
  .item-actions {
    grid-area: actions;
    flex-direction: row;
    justify-content: center;
  }
  
  .coupon-input {
    flex-direction: column;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .cart-items,
  .summary-card,
  .delivery-info {
    padding: 20px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>