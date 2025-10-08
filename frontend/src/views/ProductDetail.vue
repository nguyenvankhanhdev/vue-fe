<template>
  <div class="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Đang tải sản phẩm...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="not-found-container">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="not-found-content">
          <i class="fas fa-exclamation-triangle"></i>
          <h2>Sản phẩm không tồn tại</h2>
          <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <router-link to="/products" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200">Quay lại danh sách sản phẩm</router-link>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else>
      <!-- Breadcrumb -->
      <section class="breadcrumb-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="breadcrumb">
            <router-link to="/">Trang chủ</router-link>
            <span>/</span>
            <router-link to="/products">Sản phẩm</router-link>
            <span>/</span>
            <span>{{ product.name }}</span>
          </nav>
        </div>
      </section>

      <!-- Product Details -->
      <section class="product-section py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="product-layout">
            <!-- Product Images -->
            <div class="product-images">
              <div class="main-image">
                <img :src="selectedImage" :alt="product.name" />
                <div class="image-badges">
                  <span v-if="product.isNew" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium new-badge">Mới</span>
                  <span v-if="product.discount" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium discount-badge">
                    -{{ product.discount }}%
                  </span>
                </div>
              </div>
              <div class="thumbnail-images">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  class="thumbnail"
                  :class="{ active: selectedImage === image }"
                  @click="selectedImage = image"
                >
                  <img :src="image" :alt="`${product.name} ${index + 1}`" />
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <div class="product-header">
                <h1>{{ product.name }}</h1>
                <div class="product-meta">
                  <span class="product-sku">SKU: {{ product.sku }}</span>
                  <span class="product-category">
                    <router-link :to="`/products?category=${product.categorySlug}`">
                      {{ product.category }}
                    </router-link>
                  </span>
                </div>
              </div>

              <!-- Rating -->
              <div class="product-rating">
                <div class="stars">
                  <i 
                    v-for="star in 5" 
                    :key="star"
                    class="fas fa-star"
                    :class="{ active: star <= product.rating }"
                  ></i>
                </div>
                <span class="rating-text">{{ product.rating }} ({{ product.reviewCount }} đánh giá)</span>
                <a href="#reviews" class="reviews-link">Xem đánh giá</a>
              </div>

              <!-- Price -->
              <div class="product-price">
                <span class="current-price">${{ formatPrice(currentPrice) }}</span>
                <span v-if="product.originalPrice" class="original-price">
                  ${{ formatPrice(product.originalPrice) }}
                </span>
                <span v-if="product.discount" class="savings">
                  Tiết kiệm ${{ formatPrice(product.originalPrice - currentPrice) }}
                </span>
              </div>

              <!-- Stock Status -->
              <div class="stock-status">
                <span v-if="product.inStock" class="in-stock">
                  <i class="fas fa-check-circle"></i>
                  Còn hàng ({{ product.stockQuantity }} sản phẩm)
                </span>
                <span v-else class="out-of-stock">
                  <i class="fas fa-times-circle"></i>
                  Hết hàng
                </span>
              </div>

              <!-- Product Options -->
              <div class="product-options">
                <!-- Size Selection -->
                <div v-if="product.sizes && product.sizes.length" class="option-group">
                  <label>Kích thước:</label>
                  <div class="size-options">
                    <button 
                      v-for="size in product.sizes" 
                      :key="size"
                      @click="selectedSize = size"
                      :class="{ active: selectedSize === size }"
                      class="size-btn"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Color Selection -->
                <div v-if="product.colors && product.colors.length" class="option-group">
                  <label>Màu sắc:</label>
                  <div class="color-options">
                    <button 
                      v-for="color in product.colors" 
                      :key="color.name"
                      @click="selectedColor = color"
                      :class="{ active: selectedColor === color }"
                      :style="{ backgroundColor: color.value }"
                      class="color-btn"
                      :title="color.name"
                    ></button>
                  </div>
                </div>

                <!-- Quantity -->
                <div class="option-group">
                  <label>Số lượng:</label>
                  <div class="quantity-selector">
                    <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                    <input type="number" v-model="quantity" min="1" :max="product.stockQuantity" />
                    <button @click="increaseQuantity" :disabled="quantity >= product.stockQuantity">+</button>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="product-actions">
                <button 
                  @click="addToCart" 
                  :disabled="!product.inStock"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 add-to-cart-btn"
                >
                  <i class="fas fa-shopping-cart"></i>
                  {{ product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng' }}
                </button>
                <button @click="buyNow" :disabled="!product.inStock" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 buy-now-btn">
                  Mua ngay
                </button>
                <button @click="addToWishlist" class="btn-icon wishlist-btn">
                  <i class="fas fa-heart" :class="{ active: isWishlisted }"></i>
                </button>
                <button @click="shareProduct" class="btn-icon share-btn">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>

              <!-- Product Features -->
              <div class="product-features">
                <div class="feature-item">
                  <i class="fas fa-shipping-fast"></i>
                  <span>Giao hàng miễn phí</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-undo-alt"></i>
                  <span>Đổi trả trong 30 ngày</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-shield-alt"></i>
                  <span>Bảo hành chính hãng</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-headset"></i>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Details Tabs -->
      <section class="product-tabs py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="tabs-container">
            <div class="tabs-header">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="{ active: activeTab === tab.id }"
                class="tab-btn"
              >
                {{ tab.label }}
              </button>
            </div>
            
            <div class="tabs-content">
              <!-- Description Tab -->
              <div v-if="activeTab === 'description'" class="tab-content">
                <div class="description-content">
                  <div v-html="product.description"></div>
                  
                  <div class="specifications" v-if="product.specifications">
                    <h3>Thông số kỹ thuật</h3>
                    <table class="specs-table">
                      <tr v-for="(value, key) in product.specifications" :key="key">
                        <td class="spec-name">{{ key }}</td>
                        <td class="spec-value">{{ value }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Reviews Tab -->
              <div v-if="activeTab === 'reviews'" class="tab-content" id="reviews">
                <div class="reviews-summary">
                  <div class="rating-summary">
                    <div class="overall-rating">
                      <span class="rating-number">{{ product.rating }}</span>
                      <div class="stars">
                        <i 
                          v-for="star in 5" 
                          :key="star"
                          class="fas fa-star"
                          :class="{ active: star <= product.rating }"
                        ></i>
                      </div>
                      <span class="total-reviews">{{ product.reviewCount }} đánh giá</span>
                    </div>
                  </div>
                  
                  <button @click="showReviewForm = !showReviewForm" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200">
                    Viết đánh giá
                  </button>
                </div>

                <!-- Review Form -->
                <form v-if="showReviewForm" @submit.prevent="submitReview" class="review-form">
                  <h3>Viết đánh giá của bạn</h3>
                  <div class="mb-4">
                    <label>Đánh giá:</label>
                    <div class="rating-input">
                      <button 
                        v-for="star in 5" 
                        :key="star"
                        type="button"
                        @click="reviewRating = star"
                        class="star-btn"
                        :class="{ active: star <= reviewRating }"
                      >
                        <i class="fas fa-star"></i>
                      </button>
                    </div>
                  </div>
                  <div class="mb-4">
                    <label>Tiêu đề:</label>
                    <input type="text" v-model="reviewTitle" required />
                  </div>
                  <div class="mb-4">
                    <label>Nội dung:</label>
                    <textarea v-model="reviewContent" rows="4" required></textarea>
                  </div>
                  <div class="form-actions">
                    <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200">Gửi đánh giá</button>
                    <button type="button" @click="showReviewForm = false" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-gray-600 hover:bg-gray-700 text-white">
                      Hủy
                    </button>
                  </div>
                </form>

                <!-- Reviews List -->
                <div class="reviews-list">
                  <div v-for="review in product.reviews" :key="review.id" class="review-item">
                    <div class="review-header">
                      <div class="reviewer-info">
                        <span class="reviewer-name">{{ review.userName }}</span>
                        <span class="review-date">{{ formatDate(review.date) }}</span>
                      </div>
                      <div class="review-rating">
                        <div class="stars">
                          <i 
                            v-for="star in 5" 
                            :key="star"
                            class="fas fa-star"
                            :class="{ active: star <= review.rating }"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <h4 class="review-title">{{ review.title }}</h4>
                    <p class="review-content">{{ review.content }}</p>
                  </div>
                </div>
              </div>

              <!-- Shipping Tab -->
              <div v-if="activeTab === 'shipping'" class="tab-content">
                <div class="shipping-info">
                  <h3>Thông tin giao hàng</h3>
                  <div class="shipping-options">
                    <div class="shipping-option">
                      <h4>Giao hàng tiêu chuẩn</h4>
                      <p>Miễn phí cho đơn hàng trên 500.000đ</p>
                      <p>Thời gian: 2-3 ngày làm việc</p>
                    </div>
                    <div class="shipping-option">
                      <h4>Giao hàng nhanh</h4>
                      <p>Phí ship: 50.000đ</p>
                      <p>Thời gian: 1-2 ngày làm việc</p>
                    </div>
                    <div class="shipping-option">
                      <h4>Giao hàng trong ngày</h4>
                      <p>Phí ship: 100.000đ (chỉ áp dụng trong nội thành)</p>
                      <p>Thời gian: Trong ngày (đặt trước 14:00)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section class="related-products py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="section-title">Sản phẩm liên quan</h2>
          <div class="products-grid">
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
.product-detail-page {
  min-height: 100vh;
}

.loading-container,
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e74c3c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.not-found-content i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 20px;
}

.breadcrumb-section {
  background: #f8f9fa;
  padding: 20px 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #e74c3c;
}

.breadcrumb span {
  color: #999;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  background: #f8f9fa;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-badges {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.new-badge {
  background: #27ae60;
}

.discount-badge {
  background: #e74c3c;
}

.thumbnail-images {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.thumbnail.active {
  border-color: #e74c3c;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.product-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.product-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.product-category a {
  color: #e74c3c;
  text-decoration: none;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars i {
  color: #ddd;
  font-size: 16px;
}

.stars i.active {
  color: #ffd700;
}

.rating-text {
  font-weight: 600;
}

.reviews-link {
  color: #e74c3c;
  text-decoration: none;
  font-size: 14px;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 15px;
  flex-wrap: wrap;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e74c3c;
}

.original-price {
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
}

.savings {
  background: #27ae60;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
}

.stock-status {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
}

.in-stock {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.out-of-stock {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-group label {
  font-weight: 600;
  color: #333;
}

.size-options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.size-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.size-btn:hover,
.size-btn.active {
  border-color: #e74c3c;
  background: #e74c3c;
  color: white;
}

.color-options {
  display: flex;
  gap: 10px;
}

.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-btn.active {
  border-color: #e74c3c;
  transform: scale(1.1);
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
}

.quantity-selector button {
  padding: 12px 16px;
  border: none;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.quantity-selector button:hover:not(:disabled) {
  background: #e9ecef;
}

.quantity-selector button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-selector input {
  border: none;
  padding: 12px 16px;
  width: 80px;
  text-align: center;
  font-size: 16px;
  outline: none;
}

.product-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.add-to-cart-btn {
  flex: 1;
  min-width: 200px;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: 600;
}

.buy-now-btn {
  background: #27ae60;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: 600;
}

.buy-now-btn:hover {
  background: #229954;
}

.btn-icon {
  width: 50px;
  height: 50px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}

.wishlist-btn .fa-heart.active {
  color: #e74c3c;
}

.product-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.feature-item i {
  color: #e74c3c;
  font-size: 16px;
}

.tabs-container {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.tab-btn {
  flex: 1;
  padding: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover,
.tab-btn.active {
  background: white;
  color: #e74c3c;
  border-bottom-color: #e74c3c;
}

.tab-content {
  padding: 30px;
}

.description-content {
  line-height: 1.8;
}

.description-content h3 {
  color: #333;
  margin: 25px 0 15px;
}

.description-content ul {
  margin: 15px 0;
  padding-left: 20px;
}

.description-content li {
  margin-bottom: 8px;
}

.specifications {
  margin-top: 40px;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.specs-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.spec-name {
  font-weight: 600;
  width: 40%;
  background: #f8f9fa;
}

.spec-value {
  color: #666;
}

.reviews-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.overall-rating {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rating-number {
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
}

.total-reviews {
  color: #666;
  font-size: 14px;
}

.review-form {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.review-form h3 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.rating-input {
  display: flex;
  gap: 5px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star-btn.active,
.star-btn:hover {
  color: #ffd700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #e74c3c;
}

.form-actions {
  display: flex;
  gap: 15px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.review-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.reviewer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reviewer-name {
  font-weight: 600;
  color: #333;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.review-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.review-content {
  line-height: 1.6;
  color: #666;
}

.shipping-info h3 {
  margin-bottom: 25px;
  color: #333;
}

.shipping-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.shipping-option {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #f8f9fa;
}

.shipping-option h4 {
  color: #e74c3c;
  margin-bottom: 10px;
}

.shipping-option p {
  margin-bottom: 5px;
  color: #666;
}

.related-products {
  background: #f8f9fa;
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

@media (max-width: 1024px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .product-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .current-price {
    font-size: 2rem;
  }
  
  .product-actions {
    flex-direction: column;
  }
  
  .add-to-cart-btn {
    min-width: auto;
  }
  
  .tabs-header {
    overflow-x: auto;
  }
  
  .tab-btn {
    white-space: nowrap;
    min-width: 150px;
  }
  
  .tab-content {
    padding: 20px;
  }
  
  .reviews-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>