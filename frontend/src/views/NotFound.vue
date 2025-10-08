<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
      <div class="absolute top-60 right-32 w-24 h-24 bg-white/5 rounded-full animate-float-delay"></div>
      <div class="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div class="absolute bottom-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-float-delay"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <!-- 404 Number & Icon -->
      <div class="relative mb-12">
        <div class="text-[12rem] md:text-[16rem] font-black text-white/10 leading-none mb-[-4rem] md:mb-[-6rem]">
          404
        </div>
        <div class="relative z-10 w-24 h-24 md:w-32 md:h-32 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <i class="fas fa-search text-4xl md:text-5xl text-white"></i>
        </div>
      </div>
      
      <!-- Error Text -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Oops! Không tìm thấy trang
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <router-link 
          to="/" 
          class="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <i class="fas fa-home"></i>
          Về trang chủ
        </router-link>
        <router-link 
          to="/products" 
          class="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/20"
        >
          <i class="fas fa-shopping-bag"></i>
          Xem sản phẩm
        </router-link>
      </div>

      <!-- Quick Links -->
      <div class="mb-12">
        <h3 class="text-xl font-semibold text-blue-100 mb-6">Có thể bạn quan tâm:</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <router-link 
            to="/products" 
            class="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 group"
          >
            <i class="fas fa-tags text-2xl text-yellow-300 group-hover:scale-110 transition-transform duration-200"></i>
            <span class="text-sm font-medium">Sản phẩm hot</span>
          </router-link>
          <router-link 
            to="/categories" 
            class="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 group"
          >
            <i class="fas fa-th-large text-2xl text-yellow-300 group-hover:scale-110 transition-transform duration-200"></i>
            <span class="text-sm font-medium">Danh mục</span>
          </router-link>
          <router-link 
            to="/contact" 
            class="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 group"
          >
            <i class="fas fa-phone text-2xl text-yellow-300 group-hover:scale-110 transition-transform duration-200"></i>
            <span class="text-sm font-medium">Liên hệ</span>
          </router-link>
          <router-link 
            to="/about" 
            class="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 group"
          >
            <i class="fas fa-info-circle text-2xl text-yellow-300 group-hover:scale-110 transition-transform duration-200"></i>
            <span class="text-sm font-medium">Về chúng tôi</span>
          </router-link>
        </div>
      </div>

      <!-- Search Box -->
      <div class="max-w-md mx-auto">
        <h4 class="text-lg font-semibold text-blue-100 mb-4">Hoặc tìm kiếm sản phẩm:</h4>
        <form @submit.prevent="handleSearch" class="relative">
          <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Nhập tên sản phẩm bạn muốn tìm..."
              class="w-full px-6 py-4 bg-transparent text-white placeholder-white/70 outline-none text-sm"
            />
            <button 
              type="submit" 
              class="absolute right-2 top-2 bottom-2 px-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
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
/* Animation classes */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes float-delay {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(150deg); }
  66% { transform: translateY(15px) rotate(270deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 6s ease-in-out infinite -2s;
}
</style>