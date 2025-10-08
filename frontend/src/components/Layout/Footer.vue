<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="footer-sections">
          <!-- Company Info -->
          <div class="footer-section">
            <h3>VueShop</h3>
            <p>Cửa hàng thương mại điện tử hàng đầu với những sản phẩm chất lượng và dịch vụ tuyệt vời.</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul class="footer-links">
              <li><router-link to="/about">Về chúng tôi</router-link></li>
              <li><router-link to="/products">Sản phẩm</router-link></li>
              <li><router-link to="/categories">Danh mục</router-link></li>
              <li><router-link to="/contact">Liên hệ</router-link></li>
              <li><router-link to="/faq">FAQ</router-link></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div class="footer-section">
            <h4>Chăm sóc khách hàng</h4>
            <ul class="footer-links">
              <li><router-link to="/shipping">Chính sách giao hàng</router-link></li>
              <li><router-link to="/returns">Đổi trả hàng</router-link></li>
              <li><router-link to="/warranty">Bảo hành</router-link></li>
              <li><router-link to="/privacy">Chính sách bảo mật</router-link></li>
              <li><router-link to="/terms">Điều khoản sử dụng</router-link></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h4>Thông tin liên hệ</h4>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>+84 123 456 789</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>info@vueshop.com</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-clock"></i>
                <span>8:00 - 22:00 (Thứ 2 - Chủ nhật)</span>
              </div>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="footer-section">
            <h4>Đăng ký nhận tin</h4>
            <p>Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input
                type="email"
                v-model="email"
                placeholder="Nhập email của bạn"
                required
                class="newsletter-input"
              />
              <button type="submit" class="newsletter-btn">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; 2024 VueShop. Tất cả quyền được bảo lưu.</p>
          </div>
          <div class="payment-methods">
            <span>Phương thức thanh toán:</span>
            <div class="payment-icons">
              <i class="fab fa-cc-visa"></i>
              <i class="fab fa-cc-mastercard"></i>
              <i class="fab fa-cc-paypal"></i>
              <i class="fab fa-cc-stripe"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribeNewsletter = () => {
  if (email.value) {
    // Handle newsletter subscription
    console.log('Subscribe:', email.value)
    // Show success message
    alert('Đăng ký thành công!')
    email.value = ''
  }
}
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  padding: 50px 0 30px;
}

.footer-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section h3 {
  color: #e74c3c;
  font-size: 24px;
  margin-bottom: 20px;
}

.footer-section h4 {
  color: #ecf0f1;
  font-size: 18px;
  margin-bottom: 20px;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 20px;
  color: #bdc3c7;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #34495e;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #e74c3c;
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #e74c3c;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #bdc3c7;
}

.contact-item i {
  width: 20px;
  color: #e74c3c;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.newsletter-input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: #34495e;
  color: white;
  outline: none;
}

.newsletter-input::placeholder {
  color: #95a5a6;
}

.newsletter-btn {
  padding: 12px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.newsletter-btn:hover {
  background: #c0392b;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding: 20px 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright p {
  margin: 0;
  color: #95a5a6;
}

.payment-methods {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #95a5a6;
}

.payment-icons {
  display: flex;
  gap: 10px;
}

.payment-icons i {
  font-size: 24px;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .footer-sections {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .payment-methods {
    flex-direction: column;
    gap: 10px;
  }
}
</style>