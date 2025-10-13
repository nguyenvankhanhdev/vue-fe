<template>
  <!-- Global Loading Overlay -->
  <Transition name="loading" appear>
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
        <div class="text-center">
          <!-- Animated Loading Icon -->
          <div class="relative mb-6">
            <div class="w-16 h-16 mx-auto">
              <!-- Outer ring -->
              <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <!-- Spinning ring -->
              <div class="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              <!-- Inner icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="fas fa-box text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <!-- Loading Message -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ loadingMessage }}
          </h3>
          <p class="text-sm text-gray-500">
            Vui lòng đợi trong giây lát...
          </p>
          
          <!-- Progress dots -->
          <div class="flex justify-center space-x-1 mt-4">
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLoading } from '@/composables/useLoading'

const { isLoading, loadingMessage } = useLoading()
</script>

<style scoped>
/* Loading transition effects */
.loading-enter-active, .loading-leave-active {
  transition: all 0.3s ease;
}

.loading-enter-from, .loading-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.loading-enter-active .bg-white,
.loading-leave-active .bg-white {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.loading-enter-from .bg-white,
.loading-leave-to .bg-white {
  transform: scale(0.8) translateY(-20px);
  opacity: 0;
}

/* Custom bounce animation with different delays */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out;
}
</style>