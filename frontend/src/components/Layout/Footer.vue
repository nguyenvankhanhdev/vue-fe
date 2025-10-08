<template>
  <footer class="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <!-- Company Info -->
          <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <i class="fas fa-store text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">VueShop</h3>
                <span class="text-sm text-blue-200">Shopping Experience</span>
              </div>
            </div>
            <p class="text-gray-300 leading-relaxed">
              Cửa hàng thương mại điện tử hàng đầu với những sản phẩm chất lượng và dịch vụ tuyệt vời. 
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="group bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg">
                <i class="fab fa-facebook text-lg group-hover:animate-pulse"></i>
              </a>
              <a href="#" class="group bg-sky-500 hover:bg-sky-600 p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg">
                <i class="fab fa-twitter text-lg group-hover:animate-pulse"></i>
              </a>
              <a href="#" class="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg">
                <i class="fab fa-instagram text-lg group-hover:animate-pulse"></i>
              </a>
              <a href="#" class="group bg-red-600 hover:bg-red-700 p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg">
                <i class="fab fa-youtube text-lg group-hover:animate-pulse"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-6">
            <h4 class="text-lg font-bold text-white mb-4 flex items-center">
              <i class="fas fa-link mr-2 text-blue-400"></i>
              Liên kết nhanh
            </h4>
            <ul class="space-y-3">
              <li><router-link to="/about" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Về chúng tôi
              </router-link></li>
              <li><router-link to="/products" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Sản phẩm
              </router-link></li>
              <li><router-link to="/categories" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Danh mục
              </router-link></li>
              <li><router-link to="/contact" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Liên hệ
              </router-link></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div class="space-y-6">
            <h4 class="text-lg font-bold text-white mb-4 flex items-center">
              <i class="fas fa-headset mr-2 text-purple-400"></i>
              Chăm sóc khách hàng
            </h4>
            <ul class="space-y-3">
              <li><router-link to="/shipping" class="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Chính sách giao hàng
              </router-link></li>
              <li><router-link to="/returns" class="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Đổi trả hàng
              </router-link></li>
              <li><router-link to="/warranty" class="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Bảo hành
              </router-link></li>
              <li><router-link to="/privacy" class="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                Chính sách bảo mật
              </router-link></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="space-y-6">
            <h4 class="text-lg font-bold text-white mb-4 flex items-center">
              <i class="fas fa-envelope-open mr-2 text-green-400"></i>
              Đăng ký nhận tin
            </h4>
            <p class="text-gray-300 text-sm leading-relaxed">
              Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt qua email của bạn.
            </p>
            <form @submit.prevent="subscribeNewsletter" class="space-y-3">
              <input
                type="email"
                v-model="email"
                placeholder="email@example.com"
                required
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                <i class="fas fa-paper-plane mr-2"></i>
                Đăng ký ngay
              </button>
            </form>

            <!-- Contact Info -->
            <div class="space-y-3 pt-4 border-t border-white/20">
              <h5 class="font-semibold text-white text-sm">Thông tin liên hệ</h5>
              <div class="space-y-2 text-sm">
                <div class="flex items-center text-gray-300">
                  <i class="fas fa-map-marker-alt mr-3 text-red-400 w-4"></i>
                  <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
                </div>
                <div class="flex items-center text-gray-300">
                  <i class="fas fa-phone mr-3 text-green-400 w-4"></i>
                  <span>+84 123 456 789</span>
                </div>
                <div class="flex items-center text-gray-300">
                  <i class="fas fa-envelope mr-3 text-blue-400 w-4"></i>
                  <span>info@vueshop.com</span>
                </div>
                <div class="flex items-center text-gray-300">
                  <i class="fas fa-clock mr-3 text-yellow-400 w-4"></i>
                  <span>8:00 - 22:00 (Thứ 2 - CN)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="border-t border-white/20 bg-black/20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div class="text-center lg:text-left">
            <p class="text-gray-400 text-sm">
              &copy; 2024 <span class="font-semibold text-white">VueShop</span>. Tất cả quyền được bảo lưu.
            </p>
            <p class="text-gray-500 text-xs mt-1">
              Được phát triển với ❤️ bởi VueShop Team
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8">
            <div class="text-center">
              <span class="text-gray-400 text-sm block mb-2">Phương thức thanh toán:</span>
              <div class="flex items-center space-x-3">
                <div class="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <i class="fab fa-cc-visa text-2xl text-blue-400"></i>
                </div>
                <div class="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <i class="fab fa-cc-mastercard text-2xl text-red-400"></i>
                </div>
                <div class="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <i class="fab fa-cc-paypal text-2xl text-blue-500"></i>
                </div>
                <div class="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <i class="fab fa-apple-pay text-2xl text-gray-300"></i>
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <span class="text-gray-400 text-sm block mb-2">Chứng nhận:</span>
              <div class="flex items-center space-x-2">
                <div class="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                  <i class="fas fa-shield-check mr-1"></i>
                  SSL
                </div>
                <div class="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                  <i class="fas fa-check-circle mr-1"></i>
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to top button -->
        <div class="text-center mt-8 pt-6 border-t border-white/10">
          <button @click="scrollToTop" class="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
            <i class="fas fa-chevron-up group-hover:animate-bounce"></i>
          </button>
          <p class="text-gray-500 text-xs mt-2">Lên đầu trang</p>
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
    alert(`Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi tin tức mới nhất đến ${email.value}`)
    email.value = ''
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
/* Pure Tailwind CSS - No custom styles needed */
/* All styling handled by Tailwind utilities for consistency */
</style>