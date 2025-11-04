<template>
  <!-- Global Loading Overlay -->
  <Transition name="loading" appear>
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <div class="loading-card bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 border border-blue-100">
        <div class="text-center">
          <!-- Modern Animated Loading Spinner -->
          <div class="relative mb-8">
            <div class="spinner-container">
              <!-- Multiple rotating rings -->
              <div class="spinner-ring ring-1"></div>
              <div class="spinner-ring ring-2"></div>
              <div class="spinner-ring ring-3"></div>
              
              <!-- Center icon with gradient -->
              <div class="spinner-center">
                <div class="icon-wrapper">
                  <i class="fas fa-shopping-bag text-3xl bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent"></i>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Loading Message with Gradient -->
          <h3 class="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {{ loadingMessage }}
          </h3>
          <p class="text-sm text-gray-500 font-medium">
            Vui lòng đợi trong giây lát...
          </p>
          
          <!-- Animated Progress Dots -->
          <div class="flex justify-center space-x-2 mt-6">
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLoading } from '@/composables'

const { isLoading, loadingMessage } = useLoading()
</script>

<style scoped>
/* Loading transition effects - Enhanced */
.loading-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.loading-leave-active {
  transition: all 0.3s ease-out;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.loading-enter-from {
  backdrop-filter: blur(0px);
}

/* Card animation */
.loading-enter-active .loading-card {
  animation: cardSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.loading-leave-active .loading-card {
  animation: cardSlideOut 0.3s ease-out;
}

@keyframes cardSlideIn {
  0% {
    transform: scale(0.5) translateY(-30px) rotate(-5deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes cardSlideOut {
  0% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  100% {
    transform: scale(0.8) translateY(20px);
    opacity: 0;
  }
}

/* Spinner Container */
.spinner-container {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto;
}

/* Rotating Rings with Gradient */
.spinner-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
}

.ring-1 {
  border-top-color: #3b82f6;
  border-right-color: #8b5cf6;
  animation: spin 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.ring-2 {
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  border-top-color: #8b5cf6;
  border-right-color: #a855f7;
  animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
}

.ring-3 {
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
  border-top-color: #a855f7;
  border-right-color: #3b82f6;
  animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Center Icon */
.spinner-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}

/* Animated Dots with Gradient */
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  animation: dotBounce 1.4s infinite ease-in-out;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.dot-1 {
  animation-delay: 0s;
}

.dot-2 {
  animation-delay: 0.2s;
}

.dot-3 {
  animation-delay: 0.4s;
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.5) translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2) translateY(-10px);
    opacity: 1;
  }
}

/* Loading Card Hover Effect */
.loading-card {
  animation: cardFloat 3s ease-in-out infinite;
}

@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Gradient text support */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

.text-transparent {
  -webkit-text-fill-color: transparent;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .spinner-container {
    width: 80px;
    height: 80px;
  }
  
  .loading-card {
    padding: 2rem;
  }
  
  h3 {
    font-size: 1.125rem;
  }
}
</style>