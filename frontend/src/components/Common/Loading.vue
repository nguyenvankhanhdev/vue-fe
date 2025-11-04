<template>
  <transition name="fade">
    <div class="loading-overlay" v-if="show">
      <div class="loading-content">
        <!-- Modern Spinner with Gradient -->
        <div class="spinner-container">
          <div class="spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-core">
              <i class="fas fa-shopping-bag text-3xl text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <!-- Loading Message -->
        <div class="loading-text">
          <p class="message">{{ message }}</p>
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Đang tải'
  }
})
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.loading-content {
  text-align: center;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Spinner Container */
.spinner-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.spinner {
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Spinner Rings with Gradient */
.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3b82f6; /* blue-500 */
  animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.spinner-ring:nth-child(1) {
  width: 100%;
  height: 100%;
  border-top-color: #3b82f6;
  border-right-color: #8b5cf6;
  animation-duration: 1.5s;
}

.spinner-ring:nth-child(2) {
  width: 75%;
  height: 75%;
  border-top-color: #8b5cf6; /* purple-600 */
  border-right-color: #a855f7;
  animation-duration: 1.2s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 50%;
  height: 50%;
  border-top-color: #a855f7; /* purple-500 */
  border-right-color: #3b82f6;
  animation-duration: 1s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Spinner Core Icon */
.spinner-core {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* Loading Text */
.loading-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.message {
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Animated Dots */
.dots {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 8px;
}

.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: inline-block;
  animation: dotFlashing 1.4s infinite linear;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotFlashing {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .spinner {
    width: 80px;
    height: 80px;
  }
  
  .message {
    font-size: 16px;
  }
}
</style>