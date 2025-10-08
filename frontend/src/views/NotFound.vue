<template>
  <div class="not-found-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="not-found-content">
        <div class="error-illustration">
          <div class="error-number">404</div>
          <div class="error-icon">
            <i class="fas fa-search"></i>
          </div>
        </div>
        
        <div class="error-text">
          <h1>Oops! Không tìm thấy trang</h1>
          <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        </div>
        
        <div class="error-actions">
          <router-link to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
            <i class="fas fa-home"></i>
            Về trang chủ
          </router-link>
          <router-link to="/products" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 btn-outline">
            <i class="fas fa-shopping-bag"></i>
            Xem sản phẩm
          </router-link>
        </div>

        <!-- Suggestions -->
        <div class="suggestions">
          <h3>Có thể bạn quan tâm:</h3>
          <div class="suggestion-links">
            <router-link to="/products" class="suggestion-item">
              <i class="fas fa-tags"></i>
              <span>Sản phẩm hot</span>
            </router-link>
            <router-link to="/categories" class="suggestion-item">
              <i class="fas fa-th-large"></i>
              <span>Danh mục</span>
            </router-link>
            <router-link to="/contact" class="suggestion-item">
              <i class="fas fa-phone"></i>
              <span>Liên hệ hỗ trợ</span>
            </router-link>
            <router-link to="/about" class="suggestion-item">
              <i class="fas fa-info-circle"></i>
              <span>Về chúng tôi</span>
            </router-link>
          </div>
        </div>

        <!-- Search Box -->
        <div class="search-section">
          <h4>Hoặc tìm kiếm sản phẩm:</h4>
          <form @submit.prevent="handleSearch" class="search-form">
            <div class="search-input-group">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Nhập tên sản phẩm bạn muốn tìm..."
                class="search-input"
              />
              <button type="submit" class="search-btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Background Animation -->
    <div class="bg-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
      <div class="floating-shape shape-5"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Products',
      query: { search: searchQuery.value }
    })
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: white;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 2;
  position: relative;
}

.not-found-content {
  text-align: center;
}

.error-illustration {
  position: relative;
  margin-bottom: 40px;
}

.error-number {
  font-size: 12rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.1);
  line-height: 1;
  margin-bottom: -60px;
}

.error-icon {
  font-size: 4rem;
  color: white;
  position: relative;
  z-index: 1;
}

.error-text h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.error-text p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: #e74c3c;
  color: white;
}

.btn-primary:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(231, 76, 60, 0.3);
}

.btn-outline {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-outline:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

.suggestions {
  margin-bottom: 50px;
}

.suggestions h3 {
  font-size: 1.5rem;
  margin-bottom: 25px;
  opacity: 0.9;
}

.suggestion-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.suggestion-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.suggestion-item i {
  font-size: 18px;
  color: #ffd700;
}

.search-section {
  max-width: 500px;
  margin: 0 auto;
}

.search-section h4 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

.search-form {
  margin-bottom: 20px;
}

.search-input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 15px 20px;
  color: white;
  font-size: 16px;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-btn {
  background: #e74c3c;
  border: none;
  color: white;
  padding: 15px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
}

.search-btn:hover {
  background: #c0392b;
  transform: scale(1.05);
}

/* Background Animation */
.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: -2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: -4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: -1s;
}

.shape-5 {
  width: 140px;
  height: 140px;
  top: 10%;
  right: 45%;
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@media (max-width: 768px) {
  .error-number {
    font-size: 8rem;
    margin-bottom: -40px;
  }
  
  .error-icon {
    font-size: 3rem;
  }
  
  .error-text h1 {
    font-size: 2rem;
  }
  
  .error-text p {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .suggestion-links {
    grid-template-columns: 1fr;
  }
  
  .search-input-group {
    flex-direction: column;
    padding: 8px;
    gap: 8px;
  }
  
  .search-input,
  .search-btn {
    padding: 12px 15px;
  }
  
  .search-btn {
    border-radius: 20px;
  }
}

@media (max-width: 480px) {
  .error-number {
    font-size: 6rem;
  }
  
  .error-text h1 {
    font-size: 1.5rem;
  }
  
  .not-found-content {
    padding: 20px 0;
  }
}
</style>