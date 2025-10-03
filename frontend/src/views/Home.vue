<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-content">
        <div class="container">
          <div class="hero-text">
            <h1>Khám phá bộ sưu tập mới nhất</h1>
            <p>Tìm kiếm những sản phẩm chất lượng với giá cả phải chăng</p>
            <div class="hero-buttons">
              <router-link to="/products" class="btn">Mua sắm ngay</router-link>
              <router-link to="/about" class="btn btn-outline">Tìm hiểu thêm</router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" alt="Shopping" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-shipping-fast"></i>
            </div>
            <h3>Giao hàng nhanh</h3>
            <p>Giao hàng miễn phí cho đơn hàng trên 500.000đ</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Thanh toán bảo mật</h3>
            <p>Hệ thống thanh toán an toàn và bảo mật</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-undo-alt"></i>
            </div>
            <h3>Đổi trả dễ dàng</h3>
            <p>Đổi trả miễn phí trong vòng 30 ngày</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-headset"></i>
            </div>
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ hỗ trợ khách hàng chuyên nghiệp</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section py-5">
      <div class="container">
        <h2 class="section-title text-center mb-4">Danh mục sản phẩm</h2>
        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-card"
            @click="navigateToCategory(category.slug)"
          >
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
            </div>
            <div class="category-overlay">
              <h3>{{ category.name }}</h3>
              <p>{{ category.productCount }} sản phẩm</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products py-5">
      <div class="container">
        <h2 class="section-title text-center mb-5">Sản phẩm nổi bật</h2>
        <div class="products-container">
          <div class="products-grid">
            <ProductCard 
              v-for="product in featuredProducts" 
              :key="product.id"
              :product="product"
              @add-to-cart="handleAddToCart"
              @add-to-wishlist="handleAddToWishlist"
              @quick-view="handleQuickView"
            />
          </div>
        </div>
        <div class="text-center mt-5">
          <router-link to="/products" class="btn">Xem tất cả sản phẩm</router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section py-5">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h2>Đăng ký nhận tin tức</h2>
            <p>Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt</p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              type="email" 
              v-model="newsletterEmail"
              placeholder="Nhập email của bạn"
              required
            />
            <button type="submit" class="btn">Đăng ký</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/Product/ProductCard.vue'

const router = useRouter()

// Reactive data
const newsletterEmail = ref('')
const featuredProducts = ref([])
const categories = ref([])

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

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log('Newsletter subscription:', newsletterEmail.value)
    alert('Đăng ký thành công!')
    newsletterEmail.value = ''
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  min-height: 600px;
  display: flex;
  align-items: center;
}

.hero-content .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Features Section */
.features-section {
  background: #f8f9fa;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-item {
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 24px;
}

.feature-item h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.feature-item p {
  color: #666;
  line-height: 1.6;
}

/* Categories Section */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.category-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  height: 200px;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: scale(1.05);
}

.category-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  transition: background 0.3s ease;
}

.category-card:hover .category-overlay {
  background: rgba(0, 0, 0, 0.6);
}

.category-overlay h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.category-overlay p {
  font-size: 16px;
  opacity: 0.9;
}

/* Featured Products */
.featured-products {
  background: #f8f9fa;
}

.products-container {
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  align-items: stretch; /* Đảm bảo tất cả card có chiều cao đều nhau */
  justify-items: center; /* Căn giữa các card */
}

/* Responsive cho grid sản phẩm */
@media (min-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 sản phẩm mỗi hàng trên màn hình lớn */
  }
}

@media (max-width: 991px) and (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 sản phẩm mỗi hàng trên tablet */
  }
}

@media (max-width: 767px) {
  .products-grid {
    grid-template-columns: 1fr; /* 1 sản phẩm mỗi hàng trên mobile */
    gap: 20px;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #e74c3c;
}

/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.newsletter-text h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.newsletter-text p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  gap: 15px;
}

.newsletter-form input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
}

.newsletter-form .btn {
  padding: 15px 30px;
  border-radius: 30px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .hero-content .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .newsletter-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>